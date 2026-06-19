import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PengajuanListCard from "../components/PengajuanListCard";
import PengajuanPageHeader from "../components/PengajuanPageHeader";
import { usePengajuanAdmin } from "../hooks/usePengajuan";
import { useUIStore } from "../../../store/uiStore";
import "../styles/pengajuan.css";

export default function PengajuanPage() {
  const navigate = useNavigate();
  
  // 1. Ambil state global search dari UI Store (jika ada search bar global di navbar)
  const { globalSearch } = useUIStore();

  // 2. Gunakan Custom Hook Admin Backend yang baru dibuat
  const { listData, metadata, isLoadingList, error, fetchList } = usePengajuanAdmin();

  // 3. State Lokal untuk Pagination & Search input
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearch, setLocalSearch] = useState("");

  // Menentukan kata kunci search yang aktif (prioritas local input, lalu global input)
  const effectiveSearch = localSearch || globalSearch || "";

  // 4. Efek untuk menembak API Backend setiap kali Halaman atau Kata Kunci berubah
  useEffect(() => {
    // Reset kembali ke halaman 1 jika admin sedang mengetik pencarian baru
    fetchList(currentPage, 10, effectiveSearch);
  }, [currentPage, effectiveSearch, fetchList]);

  // 5. Fungsi Aksi dari UI Component
  const handleReset = () => {
    setLocalSearch("");
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setLocalSearch(value);
    setCurrentPage(1); // Balik ke page 1 setiap kali mencari kata kunci baru
  };

  const handleDetail = (id) => {
    navigate(`/admin/pengajuan/detail/${id}`);
  };

  // 6. Menyusun counts statis atau dinamis sederhana (karena tab dinamis ditiadakan sementara di backend)
  const tabCounts = useMemo(() => {
    return {
      Semua: metadata.total_data || listData.length,
    };
  }, [metadata.total_data, listData.length]);

  return (
    <div className="space-y-8">
      <PengajuanPageHeader />

      {/* STATE ERROR HANDLING */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* COMPONENT LIST UTAMA */}
      <PengajuanListCard
        activeTab="Semua" // Mengunci tab pada "Semua" sesuai kebutuhan service backend Poin 1
        counts={tabCounts}
        items={listData} // Data riil dari backend [{ id, nama_kreditur, nama_instansi, tanggal_pengajuan }]
        search={localSearch}
        isLoading={isLoadingList} // Berikan indikator loading jika komponen PengajuanListCard mendukungnya
        onDetail={handleDetail}
        onReset={handleReset}
        onSearchChange={handleSearchChange}
        // Properti tambahan di bawah ini opsional untuk menghidupkan pagination UI di dalam list card
        currentPage={currentPage}
        totalPage={metadata.total_halaman}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}