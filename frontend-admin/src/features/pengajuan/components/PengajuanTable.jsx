// src/features/pengajuan/components/PengajuanTable.jsx
import React from 'react';

export default function PengajuanTable({ items = [], onDetail }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // [BARU] Fungsi helper untuk warna badge status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Disetujui': return 'bg-green-100 text-green-700 border-green-200';
            case 'Ditolak': return 'bg-red-100 text-red-700 border-red-200';
            case 'Sedang Diproses': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-amber-100 text-amber-700 border-amber-200'; // Menunggu Review
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="w-12 px-6 py-5 text-left text-xs font-semibold text-gray-500">NO</th>
                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500">KREDITUR</th>
                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500">INSTANSI</th>
                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500">TANGGAL</th>
                        {/* [BARU] Header Status */}
                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500">STATUS</th>
                        <th className="w-32 px-6 py-5 text-center text-xs font-semibold text-gray-500">AKSI</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {items.map((item, index) => (
                        <tr
                            key={item.id || index}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-5 text-center font-medium text-gray-500">
                                {index + 1}
                            </td>
                            <td className="px-6 py-5 text-gray-800 font-medium">
                                {item.name || item.nama_kreditur}
                            </td>
                            <td className="px-6 py-5 text-gray-600">
                                {item.nama_instansi}
                            </td>
                            <td className="px-6 py-5 text-gray-600 font-medium">
                                {formatDate(item.tanggal_pengajuan || item.date)}
                            </td>
                            
                            {/* [BARU] Isi Kolom Status */}
                            <td className="px-6 py-5">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)}`}>
                                    {item.status || 'Menunggu Review'}
                                </span>
                            </td>

                            <td className="px-6 py-5 text-center">
                                <button
                                    onClick={() => onDetail(item.id)}
                                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5 16.477 5 20.268 7.943 21.542 12 20.268 16.057 16.477 19 12 19 7.523 19 3.732 16.057 2.458 12z" />
                                    </svg>
                                    Detail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}