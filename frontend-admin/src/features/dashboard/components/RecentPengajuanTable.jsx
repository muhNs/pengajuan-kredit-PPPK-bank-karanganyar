import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge'; 
// HAPUS import data dummy dari sini

export default function RecentPengajuanTable({ activities = [] }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-gray-800 text-base">Aktivitas Pengajuan Terbaru</h3>
                    <p className="text-xs text-gray-400 mt-0.5">5 data nasabah terakhir yang masuk ke sistem.</p>
                </div>
                <button 
                    onClick={() => navigate('/admin/pengajuan')}
                    className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-colors active:scale-95 shadow-sm"
                >
                    Lihat Semua
                </button>
            </div>

            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-bold uppercase tracking-wider border-b border-gray-100">
                            <th className="py-4 px-6 whitespace-nowrap">Nama Kreditur</th>
                            <th className="py-4 px-6 whitespace-nowrap">Instansi</th>
                            <th className="py-4 px-6 whitespace-nowrap">Nominal</th>
                            <th className="py-4 px-6 whitespace-nowrap">Status</th>
                            <th className="py-4 px-6 text-center whitespace-nowrap">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                        {activities.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-400 font-medium">
                                    Belum ada aktivitas pengajuan terekam.
                                </td>
                            </tr>
                        ) : (
                            activities.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6 font-bold text-gray-800 truncate max-w-[150px]">
                                        {item.nama_kreditur}
                                    </td>
                                    <td className="py-4 px-6 text-gray-500 text-xs truncate max-w-[150px]">
                                        {item.nama_instansi}
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-900">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.nominal)}
                                    </td>
                                    <td className="py-4 px-6">
                                        {/* Menggunakan komponen StatusBadge yang sudah ada di proyek Anda */}
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button 
                                            onClick={() => navigate(`/admin/pengajuan/detail/${item.id}`)}
                                            className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-bold rounded-xl transition-all"
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}