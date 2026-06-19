import { api } from '../../../lib/http'; // Mengarah ke instance axios murni Anda

// 1. Fungsi untuk mengambil semua data pengajuan (Tabel Utama)
const getAllPengajuan = async (page = 1, limit = 10, search = '') => {
  const response = await api.get('/pengajuan/listPengajuanAdmin', {
    params: { page, limit, search }
  });
  return response.data;
};

// 2. Fungsi untuk mengambil detail super lengkap berdasarkan ID Pengajuan
const getDetailPengajuan = async (id) => {
  const response = await api.get(`/pengajuan/detailPengajuanAdmin/${id}`);
  return response.data;
};

// 3. Fungsi untuk melakukan full/partial update data pengajuan
const updatePengajuan = async (id, updatedData) => {
  const response = await api.put(`/pengajuan/updatePengajuanAdmin/${id}`, updatedData);
  return response.data;
};

const uploadDokumen = async (id, documentType, file) => {
  // Menggunakan FormData karena kita mengirim file fisik
  const formData = new FormData();
  
  // documentType ini akan bernilai seperti 'KTP_KREDITUR', 'KK', dll sesuai enum 
  // dan ini HARUS SAMA dengan parameter 'name' yang ada di konfigurasi Multer backend Anda.
  formData.append(documentType, file); 

  // Sesuaikan URL-nya dengan route backend Anda
  const response = await api.put(`/pengajuan/uploadBerkasPendukung/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Wajib untuk upload file di Axios
    },
  });
  
  return response.data;
};

// 4. [BARU] Fungsi untuk mengambil Master Data (Dropdown Form Edit)
const getMasterDataForForm = async () => {
  try {
    // Mengeksekusi 4 request API sekaligus secara paralel agar super cepat
    const [rumahRes, nikahRes, genderRes, instansiRes] = await Promise.all([
      api.get('/master/status-rumah'),
      api.get('/master/status-pernikahan'),
      api.get('/master/jenis-kelamin'),
      api.get('/instansi/getAllInstansi')
    ]);

    // Mengembalikan objek yang terstruktur rapi sesuai format state di Modal
    return {
      statusRumah: rumahRes.data?.data || [],
      statusPernikahan: nikahRes.data?.data || [],
      jenisKelamin: genderRes.data?.data || [],
      // Handle format response instansi (karena di dokumentasi Anda data langsung ada di array utama atau properti data)
      instansi: instansiRes.data?.data || instansiRes.data || [] 
    };
  } catch (error) {
    console.error("Gagal sinkronisasi data master untuk dropdown:", error);
    // Jika gagal, kembalikan array kosong agar aplikasi tidak crash
    return { statusRumah: [], statusPernikahan: [], jenisKelamin: [], instansi: [] };
  }
};

// Ekspor seluruh fungsi dalam satu objek utama variabel
export const pengajuanApi = {
  getAllPengajuan,
  getDetailPengajuan,
  updatePengajuan,
  uploadDokumen,
  getMasterDataForForm 
};