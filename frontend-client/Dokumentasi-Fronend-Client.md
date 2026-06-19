# Formulir P3K Client - Frontend Documentation

## 📖 Deskripsi Proyek
**Formulir P3K Client** adalah aplikasi web frontend berbasis React yang digunakan sebagai antarmuka pengajuan kredit atau pendaftaran formulir secara digital. Aplikasi ini dirancang dengan antarmuka yang modern, dinamis, dan responsif, serta dilengkapi dengan fitur *multi-step form* untuk memudahkan pengguna dalam mengisi data secara bertahap.

## 🚀 Teknologi Utama
Proyek ini dibangun menggunakan teknologi dan pustaka modern berikut:
- **Core:** [React 19](https://react.dev/) & [Vite 8](https://vitejs.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v7)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (Tersedia untuk global state)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Animations & UX:** [Framer Motion](https://www.framer.com/motion/) & [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)

---

## 📂 Struktur Direktori

Berikut adalah struktur utama dari direktori `src`:

```text
src/
├── api/          # Konfigurasi endpoint API (misal: masterApi.js, pengajuanApi.js)
├── assets/       # Aset statis seperti gambar, ikon, atau logo
├── components/   # Komponen React yang dapat digunakan ulang (reusable)
│   ├── layout/   # Komponen tata letak utama (Navbar, MainLayout, Footer)
│   └── ui/       # Komponen antarmuka dasar (Preloader, CustomCursor)
├── hooks/        # Custom React hooks
├── layouts/      # Tata letak spesifik halaman
├── lib/          # Konfigurasi library eksternal (misal: http.js untuk Axios)
├── pages/        # Halaman utama aplikasi
│   ├── LandingPage/ # Halaman beranda utama
│   └── Pengajuan/   # Halaman multi-step form pengajuan
├── services/     # Layanan eksternal atau logika bisnis yang diabstraksi
├── store/        # Konfigurasi global state (Zustand)
├── utils/        # Fungsi utilitas / helper
├── index.css     # Entry point untuk Tailwind CSS dan styling global
├── routes.jsx    # Konfigurasi React Router DOM
└── main.jsx      # Entry point aplikasi React
```

---

## 🗺️ Routing & Navigasi
Aplikasi menggunakan **React Router DOM** dengan fungsi `createBrowserRouter` yang dikonfigurasi pada `src/routes.jsx`.

**Rute Utama:**
- `/` - **Landing Page** (`<LandingPage />`): Halaman awal informasi layanan.
- `/pengajuan` - **Form Pengajuan** (`<FormPengajuan />`): Halaman utama untuk memulai proses pengajuan formulir.

Kedua rute ini dibungkus dalam `<MainLayout />` yang menyediakan Navbar dan elemen global lainnya.

---

## 📝 Form Pengajuan (Multi-Step Form)
Fitur utama dari aplikasi ini adalah halaman `/pengajuan` yang memiliki alur formulir bertahap. Proses ini dikelola di dalam direktori `src/pages/Pengajuan/steps/`.

**Langkah-langkah Formulir:**
1. **Step 1: Data Diri** (`Step1DataDiri.jsx`) - Input identitas dasar (Nama, NIK 16 digit, Alamat, dll).
2. **Step 2: Data Suami/Istri** (`Step2DataSuamiIstri.jsx`) - Informasi pasangan (jika menikah).
3. **Step 3: Data Orang Terdekat** (`Step3DataOrangTerdekat.jsx`) - Penjamin atau kerabat yang bisa dihubungi (Wajib NIK 16 digit).
4. **Step 4: Data Pegawai & Pendapatan** (`Step4DataPegawaiPendapatan.jsx`) - Informasi pekerjaan, instansi, dan penghasilan.
5. **Step 5: Pengajuan Kredit** (`Step5PengajuanKredit.jsx`) - Detail nominal dan tujuan kredit.
6. **Step 6: Upload Berkas** (`Step6UploadBerkas.jsx`) - Unggah dokumen persyaratan (KTP, KK, Surat Nikah, Ijazah, SK, NPWP) dengan batas ukuran maksimal 5MB. Terdapat juga pencetakan dokumen seperti `TemplateCetakF4.jsx`.

*Catatan: Form ini memiliki validasi client-side yang ketat untuk NIK (harus 16 digit) dan batasan ukuran file sebelum dikirim ke API.*

---

## 🔌 API & HTTP Requests
Semua permintaan API dikelola melalui modul yang terpusat di `src/api/` dan menggunakan instance Axios dari `src/lib/http.js`.

- **`pengajuanApi.js`**: Mengelola pembentukan payload data pengajuan (menggunakan `FormData` untuk mendukung unggah file) dan mengirimkannya ke endpoint `/pengajuan/createPengajuan`. Terdapat fungsi helper seperti `buildPengajuanFormData` untuk memetakan nama label ke ID database dan memvalidasi file unggahan.
- **`masterApi.js`**: Menangani permintaan data referensi (master data) yang dibutuhkan oleh dropdown formulir.

---

## 🎨 Styling & Animasi
- **Tailwind CSS**: Digunakan sebagai framework utama untuk utilitas kelas CSS. Konfigurasi dapat disesuaikan di `tailwind.config.js`.
- **Framer Motion**: Digunakan untuk membuat transisi antar halaman atau antar langkah pada *multi-step form* agar terasa mulus dan profesional.
- **Lenis**: Digunakan untuk efek *smooth scrolling* di keseluruhan aplikasi untuk meningkatkan *User Experience*.
- **Kustomisasi UI**: Beberapa komponen antarmuka yang dibuat khusus berada di `src/components/ui/` seperti `CustomCursor.jsx` dan `Preloader.jsx`.

---

## ⚙️ Pengembangan & Perintah (Scripts)

Untuk menjalankan proyek ini di lingkungan lokal, pastikan Anda telah menginstal Node.js dan NPM.

1. **Install Dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di local environment (misal `http://localhost:5173`).

3. **Build untuk Production:**
   ```bash
   npm run build
   ```
   Akan menghasilkan direktori `dist` yang siap untuk dideploy.

---

## 🛠️ Panduan Maintenance & Pengembangan
1. **Menambah Langkah Form (Step) Baru:**
   - Buat komponen baru di `src/pages/Pengajuan/steps/`.
   - Daftarkan komponen tersebut pada *state manager* atau *wizard controller* yang ada di `FormPengajuan.jsx`.
   - Update fungsi `buildPengajuanFormData` di `pengajuanApi.js` untuk mengakomodasi payload pengiriman ke server.
2. **Validasi Form:**
   Gunakan kapabilitas dari `react-hook-form` di masing-masing komponen form (step). Untuk validasi file yang lebih spesifik, gunakan custom function `validateFile` yang tersedia.
3. **Pengaturan Layout/Desain:**
   Jika ingin mengubah desain komponen pembungkus (Navbar, Footer, dsb), ubah komponen di `src/components/layout/`. Sesuaikan dengan *styling* Tailwind yang sudah terkonfigurasi.
4. **Penambahan Fitur Rute Baru:**
   Buat folder/file baru di dalam `src/pages/`, lalu lakukan pendaftaran pada `src/routes.jsx` agar bisa diakses oleh *user*.
