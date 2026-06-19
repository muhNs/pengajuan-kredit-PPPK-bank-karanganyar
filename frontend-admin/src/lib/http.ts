import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

// Ekstensi konfigurasi Axios untuk menambahkan flag '_retry' agar tidak terjadi infinite loop
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Tipe untuk antrean request yang tertahan selama proses refresh token
interface FailedQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}

// 2. INISIALISASI AXIOS

export const api = axios.create({
  // Gunakan Environment Variable, fallback ke localhost jika tidak ada
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 3. STATE KONTROL REFRESH TOKEN
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

// Fungsi untuk memproses (melanjutkan/menggagalkan) semua request yang antre
const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

// 4. REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Penyesuaian Dinamis untuk Upload File (Modul Attachment)
    // Jika data yang dikirim adalah FormData, hapus header 'application/json'
    // Biarkan browser yang secara otomatis mengatur 'multipart/form-data' beserta boundary-nya
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 5. RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // Jika response sukses (HTTP Status 200-299), langsung kembalikan datanya
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // GUARD: Cegah loop jika yang gagal / 401 adalah endpoint refresh atau login itu sendiri
    if (
      originalRequest.url?.includes("/auth/refresh-token") ||
      originalRequest.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    // Tangkap error 401 (Unauthorized) yang belum pernah di-retry sebelumnya
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Jika SEDANG PROSES refresh token, masukkan request ini ke dalam Antrean
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Setelah token baru berhasil didapat, jalankan ulang request yang antre ini
            // Browser akan otomatis membawa Cookie yang baru.
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Jika BELUM proses refresh, tandai sebagai retry dan kunci prosesnya
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Tembak endpoint refresh token di backend.
        // Backend akan mengirimkan header 'Set-Cookie' yang otomatis menimpa cookie lama di browser.
        await api.post("/auth/refresh-token");

        // Buka antrean dan beri tahu bahwa proses refresh berhasil (tanpa error)
        processQueue(null);

        // Jalankan ulang request aslinya yang tadi memicu error 401
        return api(originalRequest);
      } catch (refreshError) {
        // Jika endpoint refresh token juga gagal (misal: refresh token expired/di-revoke)
        // Gagalkan semua antrean
        processQueue(refreshError as AxiosError);

        // Aksi Global: Redirect user ke halaman login secara paksa
        console.error("Sesi telah berakhir. Silakan login kembali.");
        if (window.location.pathname !== "/auth/login") {
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      } finally {
        // Pastikan status selalu dikembalikan ke false agar request selanjutnya tidak terkunci
        isRefreshing = false;
      }
    }

    // Jika error bukan 401 (misal 400 Bad Request, 404 Not Found, 500 Server Error)
    return Promise.reject(error);
  },
);

export default api;
