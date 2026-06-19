import React, { useState, useEffect } from 'react';
import { useMasterDataStore } from '../store/masterDataStore';
import DataTable from '../../../components/ui/DataTable';
import Modal from '../../../components/ui/Modal';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';

const initialForm = {
    nama_instansi: '',
    alamat_instansi: '',
    nama_kepala_dinas: '',
    nip_kepala_dinas: '',
    nama_bendahara: '',
    nip_bendahara: ''
};

export default function MasterDataInstansi() {
    const categoryKey = 'instansi';
    const { data, fetchData, isLoading, error, addItem, updateItem, deleteItem } = useMasterDataStore();
    const items = data[categoryKey] ?? [];

    const [modalOpen, setModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchData(categoryKey);
    }, [fetchData]);

    const handleOpenAdd = () => {
        setEditTarget(null);
        setForm(initialForm);
        setModalOpen(true);
    };

    const handleOpenEdit = (row) => {
        setEditTarget(row);
        // PERBAIKAN 1: Mapping field dari API (GET) ke field Form (POST/PUT)
        setForm({
            nama_instansi: row.nama_instansi || '',
            // Backend GET pakai "alamat", tapi form butuh "alamat_instansi"
            alamat_instansi: row.alamat || row.alamat_instansi || '', 
            nama_kepala_dinas: row.nama_kepala_dinas || '',
            nip_kepala_dinas: row.nip_kepala_dinas || '',
            // Backend GET pakai "nama_bendahara_dinas"
            nama_bendahara: row.nama_bendahara_dinas || row.nama_bendahara || '',
            nip_bendahara: row.nip_bendahara_dinas || row.nip_bendahara || ''
        });
        setModalOpen(true);
    };

    const handleClose = () => { setModalOpen(false); setEditTarget(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editTarget) {
                await updateItem(categoryKey, editTarget.id, form);
            } else {
                await addItem(categoryKey, form);
            }
            // Refetch data agar tabel tersinkronisasi kembali dengan nama field backend
            fetchData(categoryKey); 
            handleClose();
        } catch (err) {
            console.error("Gagal menyimpan data instansi:", err);
        }
    };

    const handleDelete = async () => {
        if (deleteTarget) {
            await deleteItem(categoryKey, deleteTarget.id);
            setDeleteTarget(null);
        }
    };

    // PERBAIKAN 2: Penyesuaian Kolom Tabel
    const columns = [
        {
            key: 'index', 
            label: '#', 
            width: '50px',
            // Gunakan indexOf untuk menghindari pesan 'NaN' dari komponen DataTable
            render: (_, row) => (
                <span className="text-xs font-mono text-gray-400 font-bold">
                    {items.indexOf(row) + 1}
                </span>
            )
        },
        {
            key: 'nama_instansi', 
            label: 'Nama Instansi',
            render: (val) => <span className="font-bold text-[#152042]">{val}</span>
        },
        { 
            // Ambil dari key 'alamat' sesuai respon backend
            key: 'alamat', 
            label: 'Alamat',
            render: (val) => <span className="text-sm truncate block max-w-xs">{val || '-'}</span> 
        },
        {
            key: 'kepala_dinas', 
            label: 'Kepala Dinas',
            render: (_, row) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{row.nama_kepala_dinas || '-'}</span>
                    <span className="text-xs text-gray-500">NIP: {row.nip_kepala_dinas || '-'}</span>
                </div>
            )
        },
        {
            key: 'bendahara', 
            label: 'Bendahara',
            render: (_, row) => (
                <div className="flex flex-col">
                    {/* Sesuaikan dengan key 'nama_bendahara_dinas' dari backend */}
                    <span className="font-semibold text-sm">{row.nama_bendahara_dinas || '-'}</span>
                    <span className="text-xs text-gray-500">NIP: {row.nip_bendahara_dinas || '-'}</span>
                </div>
            )
        }
    ];

    const actionButtons = (row) => (
        <div className="flex gap-2">
            <button 
                onClick={() => handleOpenEdit(row)} 
                title="Edit"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-white hover:bg-yellow-500 hover:border-yellow-500 transition-all"
            >
                ✏️
            </button>
            <button 
                onClick={() => setDeleteTarget(row)} 
                title="Hapus"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all"
            >
                🗑️
            </button>
        </div>
    );

    return (
        <>
            <div className="flex justify-between mb-4 master-fade-up master-delay-1">
                <span className="master-stat-pill text-xs font-bold bg-[#152042]/10 text-[#152042] px-3 py-1.5 rounded-full">
                    Total: {items.length} Instansi
                </span>
                <button 
                    onClick={handleOpenAdd} 
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#FFC800] hover:bg-yellow-400 text-[#152042] font-bold text-sm rounded-xl transition-all shadow-sm shadow-[#FFC800]/30 hover:-translate-y-0.5"
                >
                    + Tambah Instansi
                </button>
            </div>

            <div className="relative master-scale-in master-delay-2">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px] rounded-xl">
                        <div className="w-8 h-8 border-4 border-[#FFC800] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {error && <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-lg font-bold text-sm border border-red-200">⚠️ {error}</div>}

                <DataTable 
                    columns={columns} 
                    data={items} 
                    actions={actionButtons} 
                    emptyMessage="Belum ada data Instansi. Klik 'Tambah Instansi' untuk memulai." 
                />
            </div>

            {/* Modal Form Instansi */}
            <Modal isOpen={modalOpen} onClose={handleClose} title={editTarget ? "Edit Instansi" : "Tambah Instansi"} size="md">
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nama Instansi <span className="text-red-500">*</span></label>
                            <input required type="text" value={form.nama_instansi} onChange={e => setForm({...form, nama_instansi: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#152042]/20 focus:border-[#152042] outline-none" placeholder="Contoh: Dinas Pendidikan" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Alamat Instansi <span className="text-red-500">*</span></label>
                            <textarea required value={form.alamat_instansi} onChange={e => setForm({...form, alamat_instansi: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#152042]/20 focus:border-[#152042] outline-none" rows="3" placeholder="Masukkan alamat lengkap..."></textarea>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Kepala Dinas <span className="text-red-500">*</span></label>
                            <input required type="text" value={form.nama_kepala_dinas} onChange={e => setForm({...form, nama_kepala_dinas: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#152042]/20 focus:border-[#152042] outline-none" placeholder="Nama Kepala Dinas" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">NIP Kepala Dinas <span className="text-red-500">*</span></label>
                            <input required type="text" value={form.nip_kepala_dinas} onChange={e => setForm({...form, nip_kepala_dinas: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#152042]/20 focus:border-[#152042] outline-none" placeholder="Nomor NIP" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Bendahara <span className="text-red-500">*</span></label>
                            <input required type="text" value={form.nama_bendahara} onChange={e => setForm({...form, nama_bendahara: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#152042]/20 focus:border-[#152042] outline-none" placeholder="Nama Bendahara" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">NIP Bendahara <span className="text-red-500">*</span></label>
                            <input required type="text" value={form.nip_bendahara} onChange={e => setForm({...form, nip_bendahara: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#152042]/20 focus:border-[#152042] outline-none" placeholder="Nomor NIP" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                        <button type="button" onClick={handleClose} className="px-5 py-2.5 text-sm font-bold border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50">Batal</button>
                        <button type="submit" className="px-5 py-2.5 text-sm font-bold bg-[#152042] text-white rounded-xl hover:bg-[#0B1171] shadow-md shadow-[#152042]/20">
                            {editTarget ? 'Simpan Perubahan' : 'Tambah Instansi'}
                        </button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog 
                isOpen={!!deleteTarget} 
                onClose={() => setDeleteTarget(null)} 
                onConfirm={handleDelete} 
                title="Hapus Instansi" 
                message={`Anda yakin ingin menghapus "${deleteTarget?.nama_instansi}"? Data yang terhapus tidak dapat dikembalikan.`} 
            />
        </>
    );
}