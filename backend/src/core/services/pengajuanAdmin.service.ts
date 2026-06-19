import { prisma } from "@/lib/prisma.js";

// Fungsi ringkasan dashboard disimpan ke dalam variabel
const getDashboardSummary = async () => {
  // Menghitung data counter status secara paralel agar performa super kencang
  const [total, menunggu, diproses, disetujui, ditolak, recentItems] = await Promise.all([
    prisma.dataPengajuanKredit.count(),
    prisma.dataPengajuanKredit.count({ where: { status: 'Menunggu Review' } }),
    prisma.dataPengajuanKredit.count({ where: { status: 'Sedang Diproses' } }),
    prisma.dataPengajuanKredit.count({ where: { status: 'Disetujui' } }),
    prisma.dataPengajuanKredit.count({ where: { status: 'Ditolak' } }),
    
    // Ambil 5 pengajuan terbaru masuk ke sistem
    prisma.dataPengajuanKredit.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        nominal: true,
        status: true,
        created_at: true,
        data_diri: { select: { nama_lengkap: true } },
        data_pekerjaan: { select: { instansi: { select: { nama_instansi: true } } } }
      }
    })
  ]);

  // Format pengajuan terbaru agar strukturnya rata (flat)
  const formattedRecent = recentItems.map(item => ({
    id: item.id,
    nama_kreditur: item.data_diri?.nama_lengkap || '-',
    nama_instansi: item.data_pekerjaan?.instansi?.nama_instansi || '-',
    nominal: item.nominal,
    status: item.status,
    tanggal: item.created_at
  }));

  return {
    stats: {
      total_pengajuan: total,
      menunggu_review: menunggu,
      sedang_diproses: diproses,
      disetujui: disetujui,
      ditolak: ditolak
    },
    recent_activities: formattedRecent
  };
};

// Daftarkan ke objek ekspor utama admin service
export const pengajuanAdminService = {
  // ... fungsi getAllPagination, getDetailById, updatePengajuanFields sebelumnya
  getDashboardSummary // (BARU)
};