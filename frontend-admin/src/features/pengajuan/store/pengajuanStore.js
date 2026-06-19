import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SEED_PENGAJUAN } from '../constants/seedPengajuan';

export const usePengajuanStore = create(
    persist(
        (set) => ({
            pengajuan: SEED_PENGAJUAN,
            updateStatus: (id, status) => set(state => ({
                pengajuan: state.pengajuan.map(p => p.id === id ? { ...p, status } : p)
            })),
            deletePengajuan: (id) => set(state => ({
                pengajuan: state.pengajuan.filter(p => p.id !== id)
            })),
        }),
        { name: 'sikredit-pengajuan-final' }
    )
);
