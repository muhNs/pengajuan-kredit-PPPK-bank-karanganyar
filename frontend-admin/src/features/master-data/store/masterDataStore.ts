import { create } from 'zustand';
import {
    fetchMasterDataApi,
    createMasterDataApi,
    updateMasterDataApi,
    deleteMasterDataApi
} from '../api/masterData.api';

// Kita pertahankan konfigurasi menu ini karena sangat rapi
const CATEGORIES = [
    { key: 'instansi', label: 'Instansi', icon: '🏢' },
    // { key: 'jabatan', label: 'Jabatan', icon: '👔' },
    // { key: 'unit-kerja', label: 'Unit Kerja', icon: '📁' },
    // { key: 'golongan', label: 'Golongan', icon: '🎖️' },
    // { key: 'sumber-dana', label: 'Sumber Dana', icon: '💳' },
    { key: 'hubungan-penjamin', label: 'Hubungan Penjamin', icon: '👨‍👩‍' },
    { key: 'status-rumah', label: 'Status Rumah', icon: '🏠' },
    { key: 'status-pernikahan', label: 'Status Pernikahan', icon: '💍' },
    { key: 'jenis-kelamin', label: 'Jenis Kelamin', icon: '🚻' },
];

const normalizeItem = (item: any, category: string) => {
    if (category === 'instansi') return item;

    // Ambil nilai dari properti manapun yang dikirim backend
    const value = item.kepemilikan || item.status || item.gender || item.nama;
    
    return {
        ...item,
        nama: value,   // Digunakan oleh kolom tabel DataTable
        label: value   // Digunakan oleh komponen MasterDataForm
    };
};

export const useMasterDataStore = create((set, get) => ({
    categories: CATEGORIES,
    data: {}, // Sekarang kosong karena akan diisi oleh API
    isLoading: false,
    error: null,

    // Mengambil data dari Backend
    fetchData: async (category: string) => {
        set({ isLoading: true, error: null });
        try {
            const result = await fetchMasterDataApi(category);
            const normalizedResult = Array.isArray(result) ? result.map((item: any) => normalizeItem(item, category)) : result;
            set((state: any) => ({
                data: {
                    ...state.data,
                    [category]: normalizedResult, // Simpan data ke key kategori (misal: data['jenis-kelamin'])
                },
                isLoading: false
            }));
        } catch (error: any) {
            set({ 
                error: error?.response?.data?.error || "Gagal mengambil data", 
                isLoading: false 
            });
        }
    },

    addItem: async (category: string, payload: any) => {
        set({ isLoading: true, error: null });
        try {
            // Kita sesuaikan payload frontend ke format backend yang minta { nama: ... }
            // Kecuali instansi, payloadnya utuh
            const dataToSend = category === 'instansi' ? payload : { nama: payload.label };
            
            const newItem = await createMasterDataApi(category, dataToSend);
            const normalizedNewItem = normalizeItem(newItem, category);
            
            // Update state lokal agar tabel langsung re-render tanpa perlu refresh API
            set((state: any) => {
                const currentData = state.data[category] || [];
                return {
                    data: {
                        ...state.data,
                        [category]: [normalizedNewItem, ...currentData],
                    },
                    isLoading: false
                };
            });
        } catch (error: any) {
            set({ error: "Gagal menambah data", isLoading: false });
            throw error; // Lempar error agar bisa ditangkap oleh komponen UI (misal untuk toast notifikasi)
        }
    },

    updateItem: async (category: string, id: string, payload: any) => {
        set({ isLoading: true, error: null });
        try {
            const dataToSend = category === 'instansi' ? payload : { nama: payload.label };
            const updatedItem = await updateMasterDataApi(category, id, dataToSend);
            const normalizedUpdatedItem = normalizeItem(updatedItem, category);

            set((state: any) => ({
                data: {
                    ...state.data,
                    [category]: state.data[category].map((item: any) => 
                        item.id === id ? normalizedUpdatedItem : item
                    ),
                },
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: "Gagal memperbarui data", isLoading: false });
            throw error;
        }
    },

    deleteItem: async (category: string, id: string) => {
        set({ isLoading: true, error: null });
        try {
            await deleteMasterDataApi(category, id);
            set((state: any) => ({
                data: {
                    ...state.data,
                    [category]: (state.data[category] || []).filter((item: any) => item.id !== id),
                },
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: "Gagal menghapus data", isLoading: false });
            throw error;
        }
    },
}));