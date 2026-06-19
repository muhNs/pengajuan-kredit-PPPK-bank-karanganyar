// import React from 'react';

// const formatRupiah = (val) =>
//     new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val ?? 0);

// const STATUS_STYLE = {
//     'Disetujui': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
//     'Diproses': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
//     'Ditolak': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
//     'Menunggu Dokumen': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
// };

// const InfoRow = ({ label, value }) => (
//     <div className="flex gap-2">
//         <span className="text-xs text-gray-400 w-36 shrink-0 font-medium">{label}</span>
//         <span className="text-sm font-semibold text-[#152042] flex-1">{value || '-'}</span>
//     </div>
// );

// export default function KrediturDetailCard({ kreditur }) {
//     if (!kreditur) return null;

//     const statusStyle = STATUS_STYLE[kreditur.status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };
//     const initials = kreditur.nama?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() ?? '?';

//     return (
//         <div className="space-y-5">
//             {/* Profile Header */}
//             <div className="flex items-center gap-5 p-5 bg-gradient-to-br from-[#152042] to-[#0B1171] rounded-xl text-white">
//                 <div className="w-16 h-16 rounded-full bg-[#FFC800] flex items-center justify-center font-black text-[#152042] text-2xl shadow-lg shrink-0">
//                     {initials}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                     <p className="text-lg font-black truncate">{kreditur.nama}</p>
//                     <p className="text-sm text-blue-200">{kreditur.jabatan} • {kreditur.golongan}</p>
//                     <p className="text-xs text-blue-300 mt-0.5 font-mono">{kreditur.nip}</p>
//                 </div>
//                 <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}>
//                     <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
//                     {kreditur.status}
//                 </div>
//             </div>

//             {/* Data Identitas */}
//             <div className="bg-gray-50 rounded-xl p-4 space-y-3">
//                 <p className="text-xs font-black text-[#152042] uppercase tracking-widest mb-3">Data Identitas</p>
//                 <InfoRow label="Dinas / SKPD" value={kreditur.dinas} />
//                 <InfoRow label="Agama" value={kreditur.agama} />
//                 <InfoRow label="No. HP" value={kreditur.no_hp} />
//                 <InfoRow label="Email" value={kreditur.email} />
//                 <InfoRow label="Alamat" value={kreditur.alamat} />
//                 <InfoRow label="Tgl. Daftar" value={
//                     kreditur.tgl_daftar
//                         ? new Date(kreditur.tgl_daftar).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
//                         : '-'
//                 } />
//             </div>

//             {/* Data Kredit */}
//             <div className="bg-[#152042]/5 rounded-xl p-4 space-y-3 border border-[#152042]/10">
//                 <p className="text-xs font-black text-[#152042] uppercase tracking-widest mb-3">Data Kredit</p>
//                 <InfoRow label="Jenis Kredit" value={kreditur.jenis_kredit} />
//                 <InfoRow label="Tenor" value={`${kreditur.tenor} bulan`} />
//             </div>
//         </div>
//     );
// }
import React from 'react';

const formatRupiah = (val) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val ?? 0);

const STATUS_STYLE = {
    'Disetujui': { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    'Diproses': { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    'Ditolak': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
    'Menunggu Dokumen': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
};

const InfoRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-1">
        <span className="text-xs text-gray-500 w-40 shrink-0 font-medium">{label}</span>
        <span className="text-sm font-semibold text-[#152042] flex-1 break-words">{value || '-'}</span>
    </div>
);

export default function KrediturDetailCard({ kreditur, showActions = false }) {
    if (!kreditur) return null;

    const statusStyle = STATUS_STYLE[kreditur.status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };
    const initials = kreditur.nama?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() ?? '?';

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 bg-gradient-to-br from-[#152042] to-[#0B1171] rounded-3xl text-white shadow-xl">
                <div className="w-24 h-24 rounded-3xl bg-[#FFC800] flex items-center justify-center font-black text-[#152042] text-4xl shadow-inner shrink-0">
                    {initials}
                </div>
                
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold tracking-tight">{kreditur.nama}</h2>
                    <p className="text-blue-200 mt-1">{kreditur.jabatan} • {kreditur.golongan}</p>
                    <p className="text-blue-300 font-mono text-sm mt-1">{kreditur.nip}</p>
                </div>

                <div className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold ${statusStyle.bg} ${statusStyle.text}`}>
                    <span className={`w-3 h-3 rounded-full ${statusStyle.dot}`} />
                    {kreditur.status}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Data Identitas */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <p className="text-xs font-black text-[#152042] uppercase tracking-widest mb-6">Data Identitas</p>
                    <div className="space-y-4">
                        <InfoRow label="Dinas / SKPD" value={kreditur.dinas} />
                        <InfoRow label="Agama" value={kreditur.agama} />
                        <InfoRow label="No. HP" value={kreditur.no_hp} />
                        <InfoRow label="Email" value={kreditur.email} />
                        <InfoRow label="Alamat" value={kreditur.alamat} />
                        <InfoRow label="Tanggal Daftar" value={
                            kreditur.tgl_daftar
                                ? new Date(kreditur.tgl_daftar).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                                : '-'
                        } />
                    </div>
                </div>

                {/* Data Kredit */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <p className="text-xs font-black text-[#152042] uppercase tracking-widest mb-6">Data Kredit</p>
                    <div className="space-y-4">
                        <InfoRow label="Jenis Kredit" value={kreditur.jenis_kredit} />
                        <InfoRow label="Tenor" value={`${kreditur.tenor} bulan`} />
                        {kreditur.nominal && (
                            <InfoRow label="Nominal" value={formatRupiah(kreditur.nominal)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}