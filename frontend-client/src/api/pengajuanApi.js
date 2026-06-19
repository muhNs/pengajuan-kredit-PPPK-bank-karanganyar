import { api } from '../lib/http';

const STATUS_PERNIKAH_IDS = {
  'Belum Menikah': '1',
  Menikah: '2',
};

const STATUS_RUMAH_IDS = {
  'Milik Sendiri': '1',
  'Sewa/Kontrak': '2',
};

const JENIS_KELAMIN_IDS = {
  'Laki-laki': '1',
  Perempuan: '2',
};

const INSTANSI_IDS = {
  'Pemerintah Kabupaten Karanganyar': '1',
  'Dinas Pendidikan dan Kebudayaan': '2',
  'Dinas Kesehatan': '3',
  'Kementerian Agama': '4',
  'Instansi Lainnya': '5',
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const validateFile = (file, label, required = false) => {
  if (!file) {
    if (required) throw new Error(`${label} wajib diupload.`);
    return;
  }
  if (file.size > MAX_FILE_SIZE) throw new Error(`${label} melebihi ukuran maksimal 5 MB.`);
};

const resolveId = (formData, idField, labelField, map) => {
  if (formData[idField]) return String(formData[idField]);
  const label = formData[labelField];
  if (!label) return '';
  return map[label] || '';
};

export const buildPengajuanFormData = (formData) => {
  // client-side validation for required NIK fields
  const penjaminNik = (formData.nik_kerabat || '').toString();
  if (!penjaminNik || penjaminNik.replace(/\D/g, '').length !== 16) {
    throw new Error('NIK Penjamin harus 16 digit');
  }

  const debiturNik = (formData.nik || '').toString();
  if (!debiturNik || debiturNik.replace(/\D/g, '').length !== 16) {
    throw new Error('NIK Debitur harus 16 digit');
  }

  const payload = new FormData();

  payload.append('nama_lengkap', formData.nama || '');
  payload.append('alamat', formData.alamat || '');
  payload.append('kode_pos', formData.kode_pos || '');
  payload.append('no_handphone', formData.no_telp || '');
  payload.append('email', formData.email || '');
  payload.append('nik', debiturNik);
  payload.append('npwp', formData.npwp || '');
  payload.append('nama_ibu_kandung', formData.nama_ibu || '');

  const statusPernikahanId = resolveId(formData, 'status_pernikahan_id', 'status_pernikahan', STATUS_PERNIKAH_IDS);
  const statusRumahId = resolveId(formData, 'status_rumah_id', 'status_rumah', STATUS_RUMAH_IDS);
  const jenisKelaminId = resolveId(formData, 'jenis_kelamin_id', 'jenis_kelamin', JENIS_KELAMIN_IDS);
  const instansiId = resolveId(formData, 'instansi_id', 'instansi', INSTANSI_IDS);

  payload.append('status_pernikahan_id', statusPernikahanId);
  payload.append('status_rumah_id', statusRumahId);
  payload.append('jenis_kelamin_id', jenisKelaminId);

  payload.append('pasangan_nama', formData.nama_pasangan || '');
  payload.append('pasangan_alamat', formData.alamat_pasangan || '');
  payload.append('pasangan_nik', formData.nik_pasangan || '');
  payload.append('pasangan_no_telepon', formData.telp_pasangan || '');

  payload.append('penjamin_nama', formData.nama_kerabat || '');
  payload.append('penjamin_alamat', formData.alamat_kerabat || '');
  payload.append('penjamin_nik', penjaminNik);
  payload.append('penjamin_no_telepon', formData.telp_kerabat || '');
  payload.append('penjamin_hubungan_kerabat', formData.hubungan_kerabat || '');

  payload.append('instansi_id', instansiId);
  payload.append('jabatan', formData.jabatan || '');
  payload.append('nip', formData.nip || '');
  payload.append('divisi', formData.unit_kerja || '');
  payload.append('pendapatan_tetap', formData.pendapatan_tetap || '');
  payload.append('pendapatan_tidak_tetap', formData.pendapatan_tidak_tetap || '0');

  payload.append('tujuan_kredit', formData.penggunaan_kredit || '');
  payload.append('nominal', formData.nominal_kredit || '');
  payload.append('tenor', formData.tenor_kredit || '');

  // Files
  validateFile(formData.file_ktp, 'KTP Nasabah', true);
  validateFile(formData.file_kk, 'KK', true);
  validateFile(formData.file_ktp_pasangan, 'KTP Pasangan');
  validateFile(formData.file_surat_nikah, 'Surat Nikah');
  validateFile(formData.file_ijazah, 'Ijazah Terakhir');
  validateFile(formData.file_sk, 'SK');
  validateFile(formData.file_npwp, 'NPWP');

  if (formData.file_ktp) payload.append('KTP_KREDITUR', formData.file_ktp);
  if (formData.file_kk) payload.append('KK', formData.file_kk);
  if (formData.file_ktp_pasangan) payload.append('KTP_PASANGAN', formData.file_ktp_pasangan);
  if (formData.file_surat_nikah) payload.append('SURAT_NIKAH', formData.file_surat_nikah);
  if (formData.file_ijazah) payload.append('IJASAH_TERAKHIR', formData.file_ijazah);
  if (formData.file_sk) payload.append('SK', formData.file_sk);
  if (formData.file_npwp) payload.append('SURAT_NPWP', formData.file_npwp);

  return payload;
};

export const createPengajuan = async (formData) => {
  return api.post('/pengajuan/createPengajuan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
