import { useState, useEffect, useCallback } from "react";
import { pengajuanApi } from "../api/pengajuan.api.ts";
import type { MasterDataOptions } from "../types/pengajuan.type.ts";

export const usePengajuan = () => {
    // State untuk Master Data
    const [masterOptions, setMasterOptions] = useState<MasterDataOptions>({
        statusRumah: [],
        statusPernikahan: [],
        jenisKelamin: [],
        instansi: [],
    });
    const [isLoadingMaster, setIsLoadingMaster] = useState<boolean>(true);

    // State untuk Proses Submit
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fungsi memanggil master data saat form pertama kali dimuat
    const fetchMasterData = useCallback(async () => {
        setIsLoadingMaster(true);
        try {
            const data = await pengajuanApi.getMasterDataForForm();
            setMasterOptions(data);
        } catch (err) {
            setError("Gagal memuat opsi formulir. Silakan muat ulang halaman.");
        } finally {
            setIsLoadingMaster(false);
        }
    }, []);

    useEffect(() => {
        fetchMasterData();
    }, [fetchMasterData]);

    // Fungsi eksekusi submit ke backend
    const submitData = async (payload: FormData): Promise<boolean> => {
        setIsSubmitting(true);
        setError(null);
        try {
            await pengajuanApi.submitPengajuan(payload);
            return true; // Sukses
        } catch (err: any) {
            console.error("Submit error:", err);
            // Tangkap pesan error dari backend - bisa string, array, atau object
            const responseData = err.response?.data;
            let errorMessage = "Gagal mengirim pengajuan. Periksa kembali data Anda.";

            if (responseData) {
                if (typeof responseData.error === 'string') {
                    // Format: { error: "pesan" }
                    errorMessage = responseData.error;
                } else if (typeof responseData.message === 'string') {
                    // Format: { message: "pesan" }
                    errorMessage = responseData.message;
                } else if (Array.isArray(responseData)) {
                    // Format: [ { message: "...", path: [...] } ]
                    errorMessage = responseData.map((e: any) => e.message || JSON.stringify(e)).join(', ');
                } else if (typeof responseData === 'string') {
                    errorMessage = responseData;
                } else if (responseData.errors && Array.isArray(responseData.errors)) {
                    // Format: { errors: [ { message: "..." } ] }
                    errorMessage = responseData.errors.map((e: any) => e.message || JSON.stringify(e)).join(', ');
                }
            } else if (typeof err.message === 'string') {
                errorMessage = err.message;
            }

            setError(errorMessage);
            return false; // Gagal
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        masterOptions,
        isLoadingMaster,
        isSubmitting,
        error,
        submitData,
    };
};
