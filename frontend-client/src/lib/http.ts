import axios from 'axios';

// Mengambil URL dari file .env frontend, jika tidak ada pakai fallback localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 detik timeout (bagus untuk menjaga upload file besar tidak gantung)
  withCredentials: true, // WAJIB: Untuk mengirim/menerima cookie accessToken otomatis saat login & fetch user
  headers: {
    'Accept': 'application/json',
  },
});

// Interceptor opsional untuk menangani Error secara terpusat
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Menangani error global, misal token kedaluwarsa atau masalah jaringan
    if (!error.response) {
      console.error('Masalah Jaringan/Koneksi Server Gagal');
    } else if (error.response.status === 401) {
      console.warn('Sesi telah berakhir atau unauthorized, silakan login kembali.');
    }
    return Promise.reject(error);
  }
);