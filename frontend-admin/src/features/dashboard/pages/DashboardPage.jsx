import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";

// Komponen Variabel Kecil untuk Card Ringkasan Statistik
const StatCard = ({ title, value, colorClass, iconBg }) => (
  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="space-y-1">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <h3 className="text-3xl font-extrabold text-gray-800">{value}</h3>
    </div>
    <div className={`p-3.5 rounded-2xl ${iconBg} ${colorClass}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
  </div>
);

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data, isLoading, error, refresh } = useDashboard();

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-400 text-sm">
          Menyusun ringkasan informasi dashboard...
        </p>
      </div>
    );
  }

  if (error)
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm">
        {error}
      </div>
    );

  const { stats, recent_activities } = data;

  return (
    <div className="space-y-8 pb-10 animate-slide-up">
      {/* Header Welcome Dashboard */}
      <div>
        <h1 className="text-2xl font-black text-gray-800">Selamat datang, Admin!</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pantau perkembangan dan manajemen aplikasi pengajuan kredit Bank
          Karanganyar.
        </p>
      </div>

      {/* BARIS KARTU STATISTIK REAL DATA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard
          title="Total Masuk"
          value={stats.total_pengajuan}
          colorClass="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Menunggu Review"
          value={stats.menunggu_review}
          colorClass="text-amber-500"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Sedang Diproses"
          value={stats.sedang_diproses}
          colorClass="text-blue-500"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Disetujui"
          value={stats.disetujui}
          colorClass="text-green-500"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Ditolak"
          value={stats.ditolak}
          colorClass="text-red-500"
          iconBg="bg-red-50"
        />
      </div>

      {/* TABEL AKTIVITAS TERBARU (RECENT ACTIVITIES) */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800 text-base">
              Aktivitas Terbaru
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              5 Berkas nasabah terbaru yang masuk ke dalam sistem database.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/pengajuan")}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors active:scale-95"
          >
            Lihat Semua Tabel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="py-4 px-6">Nama Kreditur</th>
                <th className="py-4 px-6">Nama Instansi</th>
                <th className="py-4 px-6">Nominal Pengajuan</th>
                <th className="py-4 px-6">Status Berkas</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {recent_activities.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-gray-400 font-medium"
                  >
                    Belum ada pengajuan kredit nasabah yang terekam.
                  </td>
                </tr>
              ) : (
                recent_activities.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-gray-800">
                      {item.nama_kreditur}
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {item.nama_instansi}
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(item.nominal)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block
                                                ${
                                                  item.status === "Disetujui"
                                                    ? "bg-green-100 text-green-700"
                                                    : item.status === "Ditolak"
                                                      ? "bg-red-100 text-red-700"
                                                      : item.status ===
                                                          "Sedang Diproses"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-amber-100 text-amber-700"
                                                }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/pengajuan/detail/${item.id}`)
                        }
                        className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-bold rounded-xl transition-all"
                      >
                        Buka Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
