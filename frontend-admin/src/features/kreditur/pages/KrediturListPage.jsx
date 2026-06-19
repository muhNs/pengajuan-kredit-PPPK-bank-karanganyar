import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKrediturStore } from '../store/krediturStore';
import { useUIStore } from '../../../store/uiStore';

export default function KrediturListPage() {
    const navigate = useNavigate();
    const { kreditur } = useKrediturStore();
    const { globalSearch } = useUIStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [instansiFilter, setInstansiFilter] = useState('Semua Instansi');

    const instansiList = ['Semua Instansi', ...new Set(kreditur.map(k => k.dinas))];

    const filteredKreditur = kreditur.filter(k => {
        const search = (searchTerm || globalSearch).toLowerCase();
        return (
            (k.nama?.toLowerCase().includes(search) || 
             k.dinas?.toLowerCase().includes(search) || 
             k.id?.toLowerCase().includes(search)) &&
            (statusFilter === 'Semua Status' || k.status === statusFilter) &&
            (instansiFilter === 'Semua Instansi' || k.dinas === instansiFilter)
        );
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Disetujui': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Sedang Diproses': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Ditolak': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const handleDetail = (id) => navigate(`/admin/kreditur/detail/${id}`);

    return (
        <>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-up { animation: fadeUp 0.6s ease forwards; }
                .animate-scale-in { animation: scaleIn 0.5s ease forwards; }
            `}</style>

            <div className="space-y-8">
                {/* Header Modern */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tighter">
                            Daftar Kreditur
                        </h1>
                        <p className="text-gray-500 mt-1 text-lg">Kelola dan pantau seluruh kreditur</p>
                    </div>
                </div>

                {/* Stats Cards Modern */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Kreditur', value: kreditur.length, color: 'indigo' },
                        { label: 'Disetujui', value: kreditur.filter(k => k.status === 'Disetujui').length, color: 'emerald' },
                        { label: 'Sedang Diproses', value: kreditur.filter(k => k.status === 'Sedang Diproses').length, color: 'blue' },
                    ].map((item, i) => (
                        <div 
                            key={i}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fade-up group"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className={`inline-block px-4 py-1.5 rounded-2xl bg-${item.color}-100 text-${item.color}-600 text-xs font-bold mb-4`}>
                                {item.label}
                            </div>
                            <p className="text-5xl font-bold text-gray-800 tracking-tighter">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-scale-in">
                    {/* Filter Bar */}
                    <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Cari nama, instansi, atau ID kreditur..."
                                className="w-full pl-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-[15px] transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-5 top-4.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-6 py-4 border border-gray-200 rounded-2xl bg-white text-sm font-medium focus:border-blue-500 transition-all">
                                <option>Semua Status</option>
                                <option>Disetujui</option>
                                <option>Sedang Diproses</option>
                                <option>Ditolak</option>
                            </select>
                            <select value={instansiFilter} onChange={(e) => setInstansiFilter(e.target.value)}
                                className="px-6 py-4 border border-gray-200 rounded-2xl bg-white text-sm font-medium focus:border-blue-500 transition-all">
                                {instansiList.map(inst => <option key={inst} value={inst}>{inst}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Table + Mobile Cards */}
                    <div className="overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="px-8 py-6 text-left text-xs font-semibold text-gray-500">NO</th>
                                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">KREDITUR</th>
                                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">INSTANSI</th>
                                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">TANGGAL</th>
                                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">STATUS</th>
                                        <th className="px-8 py-6 text-center text-xs font-semibold text-gray-500">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredKreditur.map((row, i) => (
                                        <tr key={row.id} className="hover:bg-blue-50/60 transition-all duration-200 group animate-fade-up" style={{animationDelay: `${i * 40}ms`}}>
                                            <td className="px-8 py-6 text-gray-400 font-medium">{i + 1}</td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <img src={`https://ui-avatars.com/api/?name=${row.nama}&background=2563eb&color=fff`} className="w-11 h-11 rounded-2xl ring-2 ring-white" alt="" />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{row.nama}</p>
                                                        <p className="text-sm text-gray-500">{row.no_hp}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-gray-600">{row.dinas}</td>
                                            <td className="px-6 py-6 text-gray-600">{row.tgl_daftar}</td>
                                            <td className="px-6 py-6">
                                                <span className={`inline-block px-5 py-2 text-sm font-semibold rounded-2xl ${getStatusStyle(row.status)}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <button 
                                                    onClick={() => handleDetail(row.id)}
                                                    className="px-6 py-2.5 text-blue-600 hover:bg-blue-50 rounded-2xl font-medium transition-all hover:scale-105"
                                                >
                                                    Lihat Detail →
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden p-4 space-y-4">
                            {filteredKreditur.map((row, i) => (
                                <div key={row.id} className="bg-white border border-gray-100 rounded-3xl p-6 animate-fade-up" style={{animationDelay: `${i * 50}ms`}}>
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-4">
                                            <img src={`https://ui-avatars.com/api/?name=${row.nama}&background=2563eb&color=fff`} className="w-14 h-14 rounded-2xl" alt="" />
                                            <div>
                                                <p className="font-semibold text-lg">{row.nama}</p>
                                                <p className="text-gray-500">{row.dinas}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 text-sm font-semibold rounded-2xl self-start ${getStatusStyle(row.status)}`}>
                                            {row.status}
                                        </span>
                                    </div>
                                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                                        <div><span className="text-gray-500">No HP</span><br />{row.no_hp}</div>
                                        <div><span className="text-gray-500">Tanggal</span><br />{row.tgl_daftar}</div>
                                    </div>
                                    <button 
                                        onClick={() => handleDetail(row.id)}
                                        className="mt-6 w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all active:scale-95"
                                    >
                                        Lihat Detail Lengkap
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}