import React, { useState, useEffect } from 'react';
import { useMasterDataStore } from '../store/masterDataStore';
import DataTable from '../../../components/ui/DataTable';
import Modal from '../../../components/ui/Modal';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import MasterDataForm from './MasterDataForm';

export default function MasterDataTable({ categoryKey }) {
    const { categories, data, isLoading, error, fetchData, addItem, updateItem, deleteItem } = useMasterDataStore();
    
    const items = data[categoryKey] ?? [];
    const activeCategory = categories.find((category) => category.key === categoryKey);
    const categoryLabel = activeCategory?.label ?? 'Data';

    const [modalOpen, setModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        fetchData(categoryKey);
    }, [categoryKey, fetchData]);

    const handleOpenAdd = () => { setEditTarget(null); setModalOpen(true); };
    const handleOpenEdit = (row) => { setEditTarget(row); setModalOpen(true); };
    const handleClose = () => { setModalOpen(false); setEditTarget(null); };

    const handleSubmit = async (values) => {
        try {
            if (editTarget) {
                await updateItem(categoryKey, editTarget.id, values);
            } else {
                await addItem(categoryKey, values);
            }
            // PERBAIKAN 1: Panggil ulang data dari API untuk memastikan tabel ter-update sempurna
            fetchData(categoryKey);
            handleClose();
        } catch (err) {
            console.error("Gagal simpan data", err);
        }
    };

    const handleDelete = async () => {
        if (deleteTarget) {
            try {
                await deleteItem(categoryKey, deleteTarget.id);
                setDeleteTarget(null);
            } catch (err) {
                console.error("Gagal hapus data", err);
            }
        }
    };

    // PERBAIKAN 2: Penyesuaian Kolom Tabel (Anti-NaN dan Anti-Blank)
    const columns = [
        {
            key: 'index',
            label: '#',
            width: '60px',
            // Gunakan items.indexOf agar nomor selalu berurutan
            render: (_, row) => (
                <span className="text-xs font-mono text-gray-400 font-bold">
                    {items.indexOf(row) + 1}
                </span>
            )
        },
        {
            key: 'nama', 
            label: `NAMA ${categoryLabel.toUpperCase()}`,
            render: (_, row) => {
                // FALLBACK SUPER AMAN: Jika 'nama' kosong, cari 'kepemilikan', 'status', atau 'gender'
                const displayName = row.nama || row.label || row.kepemilikan || row.status || row.gender || '-';
                return <span className="font-semibold text-[#152042]">{displayName}</span>;
            }
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
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-xl">
                    <div className="w-8 h-8 border-4 border-[#FFC800] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-200">
                    ⚠️ {error}
                </div>
            )}

            <div className="flex items-center justify-between mb-4 master-fade-up master-delay-1">
                <span className="master-stat-pill text-xs font-bold bg-[#152042]/10 text-[#152042] px-3 py-1.5 rounded-full">
                    Total: {items.length} Data
                </span>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#FFC800] hover:bg-yellow-400 text-[#152042] font-bold text-sm rounded-xl transition-all shadow-sm shadow-[#FFC800]/30 hover:-translate-y-0.5"
                >
                    + Tambah {categoryLabel}
                </button>
            </div>

            <div className="master-scale-in master-delay-2">
                <DataTable
                    columns={columns}
                    data={items}
                    emptyMessage={`Belum ada data ${categoryLabel}. Klik 'Tambah' untuk memulai.`}
                    actions={actionButtons}
                />
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={handleClose}
                title={editTarget ? `Edit ${categoryLabel}` : `Tambah ${categoryLabel}`}
                size="sm"
            >
                <MasterDataForm
                    initialData={editTarget}
                    onSubmit={handleSubmit}
                    onCancel={handleClose}
                    categoryLabel={categoryLabel}
                />
            </Modal>

            <ConfirmDialog
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title={`Hapus ${categoryLabel}`}
                message={`Anda yakin ingin menghapus data "${deleteTarget?.nama || deleteTarget?.label || deleteTarget?.kepemilikan || deleteTarget?.status || deleteTarget?.gender}"? Data yang terhapus tidak dapat dikembalikan.`}
            />
        </div>
    );
}