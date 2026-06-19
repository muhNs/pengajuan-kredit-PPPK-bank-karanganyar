import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Printer } from "lucide-react";

// Komponen Pendukung
import PengajuanDetailHeader from "../components/PengajuanDetailHeader";
import PengajuanDocument from "../components/PengajuanDocument";
import PengajuanEditModal from "../components/PengajuanEditModal";
import PengajuanDokumentLampiran from "../components/PengajuanDokumentLampiran";
import PengajuanNotFound from "../components/PengajuanNotFound";

// Template Cetak PDF
import TemplateCetakF4 from "../components/TemplateCetakF4";

// Hooks & API
import { usePengajuanAdmin } from "../hooks/usePengajuan";
import { pengajuanApi } from "../api/pengajuan.api";

export default function PengajuanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Gunakan Custom Hook Admin untuk Fetch Detail & Update
  const {
    detailData,
    isLoadingDetail,
    isSubmitting,
    error,
    fetchDetail,
    executeUpdate,
  } = usePengajuanAdmin();

  const [showEdit, setShowEdit] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // State untuk menyimpan Master Data (Instansi dll) untuk template PDF
  const [masterOptions, setMasterOptions] = useState({ instansi: [] });

  // 2. Efek untuk memuat detail data dari backend berdasarkan ID di URL
  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id, fetchDetail]);

  // 3. Efek untuk memuat Master Data agar pimpinan instansi terbaca di PDF
  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const data = await pengajuanApi.getMasterDataForForm();
        setMasterOptions(data);
      } catch (error) {
        console.error("Gagal mengambil master data", error);
      }
    };
    fetchMaster();
  }, []);

  const handleBack = () => navigate("/admin/pengajuan");

  // Fungsi Aksi saat Admin klik tombol "Simpan Perubahan" di Modal
  const handleSave = async (updatedData) => {
    if (!id) return;
    const result = await executeUpdate(id, updatedData);
    if (result.success) {
      setShowEdit(false);
      alert("Data berhasil diperbarui!");
    } else {
      alert(result.message || "Gagal menyimpan perubahan");
    }
  };

  // Fungsi Aksi saat Admin upload dokumen
  const handleUploadDokumen = async (file, type) => {
    if (!id) return;
    setIsUploading(true);
    try {
      await pengajuanApi.uploadDokumen(id, type, file);
      alert(`Dokumen ${type} berhasil diunggah!`);
      fetchDetail(id); // Refresh data untuk mendapatkan lampiran terbaru
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal mengunggah dokumen. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
    }
  };

  // Fungsi Cetak / Download PDF
  const handlePrint = () => {
    window.print();
  };

  const safeData = detailData?.data ? detailData.data : detailData || {};

  const mappedFormData = detailData
    ? {
        // --- DATA PRIBADI PEMOHON ---
        nama: detailData.data_diri?.nama_lengkap || "",
        alamat: detailData.data_diri?.alamat || "",
        kode_pos: detailData.data_diri?.kode_pos || "",
        no_telp: detailData.data_diri?.no_handphone || "",
        nik: detailData.data_diri?.nik || "",
        npwp: detailData.data_diri?.npwp || "",
        nama_ibu: detailData.data_diri?.nama_ibu_kandung || "",

        // Status (mengambil dari properti objek)
        status_pernikahan:
          detailData.data_diri?.status_pernikahan?.status || "",
        status_rumah: detailData.data_diri?.status_rumah?.kepemilikan || "",
        jenis_kelamin: detailData.data_diri?.jenis_kelamin?.gender || "",

        // --- DATA KREDIT ---
        penggunaan_kredit: detailData.tujuan_kredit || "",
        nominal_kredit: detailData.nominal || 0,
        tenor_kredit: detailData.tenor || 0,

        // --- DATA INSTANSI & PEKERJAAN ---
        // Mengambil ID instansi untuk lookup ke Master Data agar Nama Kepala & Bendahara muncul
        instansi:
          detailData.data_pekerjaan?.instansi?.id ||
          detailData.data_pekerjaan?.instansi_id ||
          "",
        alamat_instansi: detailData.data_pekerjaan?.instansi?.alamat || "",
        jabatan: detailData.data_pekerjaan?.jabatan || "",
        nip: detailData.data_pekerjaan?.nip || detailData.data_diri?.nip || "",
        pendapatan_tetap: detailData.data_pekerjaan?.pendapatan_tetap || 0,
        pendapatan_tidak_tetap:
          detailData.data_pekerjaan?.pendapatan_tidak_tetap || 0,

        // --- DATA PASANGAN ---
        nama_pasangan: detailData.data_pasangan?.nama || "",
        nik_pasangan: detailData.data_pasangan?.nik || "",
        alamat_pasangan: detailData.data_pasangan?.alamat || "",

        // --- DATA PENJAMIN (Juga dipakai untuk "Nama Kerabat Terdekat") ---
        nama_penjamin: detailData.data_penjamin?.nama || "",
        nama_kerabat: detailData.data_penjamin?.nama || "",
        nik_penjamin: detailData.data_penjamin?.nik || "",
        alamat_penjamin: detailData.data_penjamin?.alamat || "",

        // --- DATA PASANGAN PENJAMIN ---
        // Perhatikan: di file document Anda tertulis 'no_ktp_pasangan_penjamin', bukan 'nik'
        nama_pasangan_penjamin: detailData.nama_pasangan_penjamin || "",
        nik_pasangan_penjamin: detailData.no_ktp_pasangan_penjamin || "",
        alamat_pasangan_penjamin: detailData.alamat_pasangan_penjamin || "",

        // --- LOGIKA DINAMIS CETAK ---
        // Cek apakah statusnya mengandung kata "Belum" atau "Lajang"
        is_belum_menikah:
          detailData.data_diri?.status_pernikahan?.status === "Belum Menikah" ||
          detailData.data_diri?.status_pernikahan?.status === "Lajang",
      }
    : {};

  // UI Loading & Not Found
  if (isLoadingDetail) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mr-3"></div>
        Memuat detail pengajuan...
      </div>
    );
  }

  if (!detailData && !isLoadingDetail) return <PengajuanNotFound />;

  return (
    <>
      {/* [PENTING] Class 'print:hidden' 
        Berfungsi untuk menyembunyikan semua elemen dashboard admin saat di-print/cetak PDF
      */}
      <div className="print:hidden space-y-6">
        {/* HEADER AREA */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <PengajuanDetailHeader pengajuan={detailData} />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Kembali
            </button>

            {/* Tombol Cetak Dokumen / Download PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              <Printer size={16} />
              Cetak PDF
            </button>

            <button
              onClick={() => setShowEdit(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Data
            </button>
          </div>
        </div>

        {/* Konten Dokumen Utama (Tabel Data Nasabah, Pekerjaan, dll) */}
        <div id="pengajuan-document-content">
          <PengajuanDocument pengajuan={detailData} />
        </div>

        {/* Dokumen Pendukung */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
          <PengajuanDokumentLampiran
            berkas={detailData.berkas_pendukung || []}
            onUploadDokumen={handleUploadDokumen}
          />
          {/* Overlay transparan jika sedang upload agar kartu tidak bisa diklik dobel */}
          {isUploading && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <span className="bg-white px-4 py-2 rounded-lg shadow font-medium text-sm text-blue-600">
                Mengunggah...
              </span>
            </div>
          )}
        </div>

        {/* Modal Edit */}
        {showEdit && (
          <PengajuanEditModal
            onClose={() => setShowEdit(false)}
            onSave={handleSave}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* [PENTING] Komponen Cetak */}
      {detailData && (
        <TemplateCetakF4
          formData={mappedFormData}
          masterOptions={masterOptions}
        />
      )}
    </>
  );
}
