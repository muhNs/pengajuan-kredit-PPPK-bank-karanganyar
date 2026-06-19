import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const SEED_KREDITUR = [
    { id: 'KRD-001', nip: '199001012020011001', nama: 'Budi Santoso', jabatan: 'Guru Utama', golongan: 'IV/a', dinas: 'Pemerintah Prov. DKI Jakarta', no_hp: '0812-3456-7890', email: 'budi.santoso@example.com', nominal: 350000000, status: 'Disetujui', tgl_daftar: '2025-05-27', time: '10:30 WIB' },
    { id: 'KRD-002', nip: '198505032019032001', nama: 'Siti Aisyah', jabatan: 'Perawat', golongan: 'III/b', dinas: 'Kementerian Keuangan', no_hp: '0813-2345-6789', email: 'siti.aisyah@example.com', nominal: 250000000, status: 'Sedang Diproses', tgl_daftar: '2025-05-26', time: '14:20 WIB' },
    { id: 'KRD-003', nip: '199207142021012001', nama: 'Andi Pratama', jabatan: 'Dokter Spesialis', golongan: 'III/a', dinas: 'Pemerintah Kota Bandung', no_hp: '0812-1111-2222', email: 'andi.p@example.com', nominal: 150000000, status: 'Disetujui', tgl_daftar: '2025-05-26', time: '09:15 WIB' },
    { id: 'KRD-004', nip: '198812202018041001', nama: 'Dewi Lestari', jabatan: 'Bidan', golongan: 'III/c', dinas: 'Pemerintah Prov. Jawa Timur', no_hp: '0813-3333-4444', email: 'dewi.l@example.com', nominal: 500000000, status: 'Ditolak', tgl_daftar: '2025-05-25', time: '11:05 WIB' },
    { id: 'KRD-005', nip: '199503172022011003', nama: 'Rizky Prabowo', jabatan: 'Penyuluh', golongan: 'II/b', dinas: 'Kementerian Pendidikan', no_hp: '0812-5555-6666', email: 'rizky.p@example.com', nominal: 200000000, status: 'Sedang Diproses', tgl_daftar: '2025-05-25', time: '08:50 WIB' },
    { id: 'KRD-006', nip: '199404122021011002', nama: 'Nadia Putri', jabatan: 'Guru', golongan: 'III/a', dinas: 'Badan Pusat Statistik', no_hp: '0813-7777-8888', email: 'nadia.p@example.com', nominal: 180000000, status: 'Disetujui', tgl_daftar: '2025-05-24', time: '16:40 WIB' },
];

export const useKrediturStore = create(
    persist(
        (set, get) => ({
            kreditur: SEED_KREDITUR,
            addKreditur: (data) => set(state => ({
                kreditur: [...state.kreditur, { ...data, id: `KRD-${Date.now()}` }]
            })),
            updateKreditur: (id, updates) => set(state => ({
                kreditur: state.kreditur.map(k => k.id === id ? { ...k, ...updates } : k)
            })),
            deleteKreditur: (id) => set(state => ({
                kreditur: state.kreditur.filter(k => k.id !== id)
            })),
        }),
        { name: 'sikredit-kreditur-final' }
    )
);
