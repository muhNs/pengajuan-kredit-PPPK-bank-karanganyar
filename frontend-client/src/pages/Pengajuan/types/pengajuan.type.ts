// 1. Tipe Data untuk Master Data (Dropdown)
export interface MasterOption {
  id: number;
  nama?: string;
  kepemilikan?: string;
  status?: string;
  gender?: string;
}

export interface InstansiOption {
  id: number;
  nama_instansi: string;
}

export interface MasterDataOptions {
  statusRumah: MasterOption[];
  statusPernikahan: MasterOption[];
  jenisKelamin: MasterOption[];
  instansi: InstansiOption[];
}

// 2. Tipe Data untuk State Form Pengajuan (Sisi Frontend)
export interface PengajuanFormData {
  // Step 1: Data Diri
  nama: string;
  email: string;
  nik: string;
  npwp: string;
  no_telp: string;
  alamat: string;
  kode_pos: string;
  nama_ibu: string;
  status_rumah: string;
  status_pernikahan: string;
  jenis_kelamin: string;
  nama_kerabat: string; // Kerabat
  nik_kerabat: string;
  alamat_kerabat: string;
  telp_kerabat: string;

  // Step 2 & 3: Pasangan & Penjamin
  nama_pasangan: string;
  nik_pasangan: string;
  alamat_pasangan: string;
  telp_pasangan: string;
  
  nama_penjamin: string; // Penjamin
  nik_penjamin: string;
  alamat_penjamin: string;
  telp_penjamin: string;
  hubungan_penjamin: string;

  // Step 4 & 5: Pekerjaan & Pinjaman
  instansi: string;
  jabatan: string;
  nip: string;
  pendapatan_tetap: string;
  pendapatan_tidak_tetap: string;
  penggunaan_kredit: string;
  nominal_kredit: string;
  tenor_kredit: string;

  // Step 6: File Uploads (Tipe File atau null)
  file_ktp: File | null;
  file_kk: File | null;
  file_ktp_pasangan: File | null;
  file_surat_nikah: File | null;
  file_ijazah: File | null;
  file_sk: File | null;
  file_npwp: File | null;
}

// 3. Tipe Props untuk setiap komponen Step (Step 1 - Step 6)
export interface StepProps {
  formData: PengajuanFormData;
  setFormData: React.Dispatch<React.SetStateAction<PengajuanFormData>>;
  masterOptions?: MasterDataOptions; // Opsional karena tidak semua step butuh dropdown
}