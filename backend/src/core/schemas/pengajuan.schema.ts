import { z } from "zod";

export const createPengajuanSchema = z.object({
  // --- DATA DIRI ---
  nama_lengkap: z.string().min(3),
  alamat: z.string().min(5),
  kode_pos: z.string().min(4),
  no_handphone: z.string().min(10),
  email: z.string().email(),
  nik: z.string().length(16, "NIK harus 16 digit"),
  npwp: z.string().optional(),
  nama_ibu_kandung: z.string().min(3),
  nama_kerabat: z.string().min(3).optional(),
  alamat_kerabat: z.string().min(5).optional(),
  no_handphone_kerabat: z.string().min(10).optional(),
  nik_kerabat: z.string().length(16, "NIK Kerabat harus 16 digit").optional(),

  // Karena multipart/form-data mengirim string, kita gunakan z.coerce.number()
  status_pernikahan_id: z.coerce.number(),
  status_rumah_id: z.coerce.number(),
  jenis_kelamin_id: z.coerce.number(),

  // --- DATA PASANGAN (Opsional, karena belum tentu menikah) ---
  pasangan_nama: z.string().optional(),
  pasangan_alamat: z.string().optional(),
  pasangan_nik: z.string().optional(),
  pasangan_no_telepon: z.string().optional(),

  // --- DATA PENJAMIN ---
  penjamin_nama: z.string().min(3),
  penjamin_alamat: z.string().min(5),
  penjamin_nik: z.string().length(16, "NIK Penjamin harus 16 digit"),
  penjamin_no_telepon: z.string().min(10),
  penjamin_hubungan_kerabat: z.string().min(2),
  penjamin_nama_pasangan: z.string().min(3).optional(),
  penjamin_alamat_pasangan: z.string().min(5).optional(),
  penjamin_nik_pasangan: z.string().length(16, "NIK Pasangan Penjamin harus 16 digit").optional(),
  penjamin_no_telepon_pasangan: z.string().min(10).optional(),

  // --- DATA PEKERJAAN ---
  instansi_id: z.coerce.number(),
  jabatan: z.string().min(2),
  nip: z.string().min(5),
  divisi: z.string().optional(),
  pendapatan_tetap: z.coerce.number(),
  pendapatan_tidak_tetap: z.coerce.number().default(0),

  // --- CORE PENGAJUAN ---
  tujuan_kredit: z.string().min(3),
  nominal: z.coerce.number(),
  tenor: z.coerce.number(),

  // untuk admin, status pengajuan bisa diubah, tapi untuk user biasa tidak bisa
  status: z.string().optional(),
});

export const updatePengajuanSchema = createPengajuanSchema.partial();

export const pengajuanIdParamSchema = z.object({
  id: z.coerce.number().int().positive("ID Pengajuan tidak valid"),
});

// Menjamin Query Parameter untuk tabel list pengajuan aman
export const getQueryParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  search: z.string().optional(), // Cari nama/NIK
  status: z.string().optional(), // Jika ada filter status
});

// Schema untuk validasi document type
export const documentTypeSchema = z.enum([
  "KTP_KREDITUR",
  "KTP_PASANGAN",
  "KK",
  "SURAT_NIKAH",
  "IJASAH_TERAKHIR",
  "SK",
  "SURAT_NPWP",
]);

export type CreatePengajuanInput = z.infer<typeof createPengajuanSchema>;
export type DocumentType = z.infer<typeof documentTypeSchema>;
