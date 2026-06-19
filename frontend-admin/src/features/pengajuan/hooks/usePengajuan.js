import { useState, useCallback } from 'react';
import { pengajuanApi } from '../api/pengajuan.api';

export const usePengajuanAdmin = () => {
  // --- STATE LIST PENGAJUAN ---
  const [listData, setListData] = useState([]);
  const [metadata, setMetadata] = useState({ total_data: 0, total_halaman: 1, halaman_sekarang: 1, limit: 10 });
  const [isLoadingList, setIsLoadingList] = useState(false);

  // --- STATE DETAIL PENGAJUAN ---
  const [detailData, setDetailData] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // --- STATE GLOBAL AKSI (SUBMIT / UPDATE) ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 1. FUNGSI FETCH LIST DATA (Menggunakan useCallback agar tidak re-render tak berujung)
  const fetchList = useCallback(async (page = 1, limit = 10, search = '') => {
    setIsLoadingList(true);
    setError(null);
    try {
      const response = await pengajuanApi.getAllPengajuan(page, limit, search);
      setListData(response.data || []);
      setMetadata(response.metadata || { total_data: 0, total_halaman: 1, halaman_sekarang: page, limit });
    } catch (err) {
      console.error("Error fetch list admin:", err);
      setError(err.response?.data?.error || "Gagal memuat daftar pengajuan kredit.");
    } finally {
      setIsLoadingList(false);
    }
  }, []);

  // 2. FUNGSI FETCH DETAIL DATA
  const fetchDetail = useCallback(async (id) => {
    setIsLoadingDetail(true);
    setError(null);
    try {
      const response = await pengajuanApi.getDetailPengajuan(id);
      setDetailData(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetch detail admin:", err);
      setError(err.response?.data?.error || "Gagal memuat detail data pengajuan.");
      setDetailData(null);
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  // 3. FUNGSI EXECUTE UPDATE DATA
  const executeUpdate = async (id, payload) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await pengajuanApi.updatePengajuan(id, payload);
      // Perbarui state detail data lokal secara instan setelah berhasil disave
      setDetailData(prev => prev ? { ...prev, ...payload } : null);
      return { success: true, message: response.message };
    } catch (err) {
      console.error("Error update data admin:", err);
      
      let msg = "Gagal memperbarui data pengajuan.";
      if (err.response?.data?.error) {
        // Jika error berbentuk array (Zod Validation)
        msg = Array.isArray(err.response.data.error) 
          ? err.response.data.error[0]?.message 
          : err.response.data.error;
      }
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // List states & functions
    listData,
    metadata,
    isLoadingList,
    fetchList,

    // Detail states & functions
    detailData,
    isLoadingDetail,
    fetchDetail,

    // Global action states & functions
    isSubmitting,
    error,
    setError,
    executeUpdate
  };
};