import React, { useState } from 'react';
import { useKrediturStore } from '../store/krediturStore';
import DataTable from '../../../components/ui/DataTable';
import Modal from '../../../components/ui/Modal';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import KrediturForm from './KrediturForm';
import KrediturDetailCard from './KrediturDetailCard';

const STATUS_BADGE = {
    'Disetujui': 'bg-green-100 text-green-700 border-green-200',
    'Diproses': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Ditolak': 'bg-red-100 text-red-700 border-red-200',
    'Menunggu Dokumen': 'bg-blue-100 text-blue-700 border-blue-200',
};

const formatRupiah = (val) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val ?? 0);

export default function KrediturTable() {
    const { kreditur, addKreditur, updateKreditur, deleteKreditur } = useKrediturStore();

    const [formModal, setFormModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [viewTarget, setViewTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');

    const filtered = filterStatus ? kreditur.filter(k => k.status === filterStatus) : kreditur;

    const handleOpenAdd = () => { setEditTarget(null); setFormModal(true); };
    const handleOpenEdit = (row) => { setEditTarget(row); setFormModal(true); };
    const handleOpenDetail = (row) => { setViewTarget(row); setDetailModal(true); };

    const handleSubmitForm = (values) => {
        if (editTarget) updateKreditur(editTarget.id, values);
        else addKreditur(values);
        setFormModal(false);
        setEditTarget(null);
    };

    const handleDelete = () => {
        if (deleteTarget) deleteKreditur(deleteTarget.id);
    };

    const columns = [
        {
            key: 'nip',
            label: 'NIP',
            render: (val) => <span className="font-mono text-xs text-gray-500">{val}</span>,
        },
        {
            key: 'nama',
            label: 'Nama Kreditur',
            render: (val, row) => (
                <div>
                    <p className="font-bold text-[#152042]">{val}</p>
                    <p className="text-xs text-gray-400">{row.jabatan} • {row.golongan}</p>
                </div>
            )
        },
        {
            key: 'dinas',
            label: 'Dinas',
            render: (val) => <span className="text-sm text-gray-600">{val}</span>,
        },
        {
            key: 'tenor',
            label: 'Tenor',
            render: (val) => <span className="text-sm text-gray-600">{val} bln</span>,
        },
        {
            key: 'status',
            label: 'Status',
            sortable: false,
            render: (val) => (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_BADGE[val] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    {val}
                </span>
            ),
        },
        {
            key: 'tgl_daftar',
            label: 'Tgl Daftar',
            render: (val) => (
                <span className="text-xs text-gray-400">
                    {val ? new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                </span>
            ),
        },
    ];

    const actionButtons = (row) => (
        <>
            <button onClick={() => handleOpenDetail(row)} title="Lihat Detail"
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-[#152042] hover:bg-[#152042]/5 hover:border-[#152042]/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
            </button>
            <button onClick={() => handleOpenEdit(row)} title="Edit"
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-[#152042] hover:bg-[#152042]/5 hover:border-[#152042]/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"/></svg>
            </button>
            <button onClick={() => setDeleteTarget(row)} title="Hapus"
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
            </button>
        </>
    );

    const STATUS_OPTIONS = ['Diproses', 'Disetujui', 'Ditolak', 'Menunggu Dokumen'];

    return (
        <>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between mb-4">
                {/* Filter Status */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilterStatus('')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${!filterStatus ? 'bg-[#152042] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        Semua ({kreditur.length})
                    </button>
                    {STATUS_OPTIONS.map(s => {
                        const count = kreditur.filter(k => k.status === s).length;
                        return (
                            <button key={s}
                                onClick={() => setFilterStatus(s === filterStatus ? '' : s)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${filterStatus === s ? 'bg-[#152042] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                {s} ({count})
                            </button>
                        );
                    })}
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filtered}
                emptyMessage="Tidak ada data kreditur yang ditemukan."
                actions={actionButtons}
            />

            {/* Form Modal */}
            <Modal isOpen={formModal} onClose={() => setFormModal(false)}
                title={editTarget ? `Edit Kreditur: ${editTarget.nama}` : 'Tambah Kreditur Baru'}
                size="lg">
                <KrediturForm initialData={editTarget} onSubmit={handleSubmitForm} onCancel={() => setFormModal(false)} />
            </Modal>

            {/* Detail Modal */}
            <Modal isOpen={detailModal} onClose={() => setDetailModal(false)}
                title="Detail Kreditur" size="lg">
                <KrediturDetailCard kreditur={viewTarget} />
            </Modal>

            {/* Confirm Hapus */}
            <ConfirmDialog
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Hapus Data Kreditur"
                message={`Anda akan menghapus data kreditur "${deleteTarget?.nama}". Data ini tidak dapat dikembalikan.`}
            />
        </>
    );
}
