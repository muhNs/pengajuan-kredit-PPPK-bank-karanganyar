import { api } from "../../../lib/http.ts"; // Sesuaikan path dengan instance axios Anda
import type { MasterDataOptions } from "../types/pengajuan.type.ts";

export const pengajuanApi = {
    // 1. Fungsi Mengirim Data Pengajuan (Termasuk File)
    submitPengajuan: async (formData: FormData) => {
        // Sesuai dokumen API, endpoint-nya adalah /pengajuan/createPengajuan
        const response = await api.post(
            "/pengajuan/createPengajuan",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        return response.data;
    },

    // 2. Fungsi Mengambil Master Data secara Paralel
    getMasterDataForForm: async (): Promise<MasterDataOptions> => {
        try {
            const [rumah, nikah, gender, hubunganPenjamin, instansi] = await Promise.all([
                api.get("/master/status-rumah"),
                api.get("/master/status-pernikahan"),
                api.get("/master/jenis-kelamin"),
                api.get("/master/hubungan-penjamin"),
                api.get("/instansi/getAllInstansi"),
            ]);

            return {
                statusRumah: rumah.data.data || rumah.data || [],
                statusPernikahan: nikah.data.data || nikah.data || [],
                jenisKelamin: gender.data.data || gender.data || [],
                hubunganPenjamin: hubunganPenjamin.data.data || hubunganPenjamin.data || [],
                instansi: instansi.data.data || instansi.data || [],
            };
        } catch (error) {
            console.error("Gagal mengambil data master untuk formulir:", error);
            // Fallback agar aplikasi tidak crash
            return {
                statusRumah: [],
                statusPernikahan: [],
                jenisKelamin: [],
                hubunganPenjamin: [],
                instansi: [],
            };
        }
    },
};
