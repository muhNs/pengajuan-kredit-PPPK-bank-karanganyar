import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 1. Pastikan folder uploads tersedia
const uploadDir = path.join(process.cwd(), 'public/uploads/dokumen');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Simpan ke folder public/uploads/dokumen
  },
  filename: function (req, file, cb) {
    // Buat nama file menjadi unik (Timestamp + Nama Field + Nama Asli)
    // Contoh: 168420123-KTP_KREDITUR-ktp_alan.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanFileName = file.originalname.replace(/\s+/g, '_'); // Hapus spasi
    cb(null, `${uniqueSuffix}-${file.fieldname}-${cleanFileName}`);
  }
});

// 3. Filter jenis file (Hanya boleh Gambar & PDF)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak valid. Hanya menerima JPG, PNG, dan PDF.'));
  }
};

// 4. Inisialisasi Multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimal 5MB per file
  },
  fileFilter: fileFilter
});

// 5. Middleware khusus untuk menangkap 7 jenis file sesuai skema Anda
export const uploadBerkasPendukung = upload.fields([
  { name: 'KTP_KREDITUR', maxCount: 1 },
  { name: 'KTP_PASANGAN', maxCount: 1 },
  { name: 'KK', maxCount: 1 },
  { name: 'SURAT_NIKAH', maxCount: 1 },
  { name: 'IJASAH_TERAKHIR', maxCount: 1 },
  { name: 'SK', maxCount: 1 },
  { name: 'SURAT_NPWP', maxCount: 1 },
]);