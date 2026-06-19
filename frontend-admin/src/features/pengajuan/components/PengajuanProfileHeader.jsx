import React from 'react';
import { getInitials } from '../utils/pengajuanUtils';
import PengajuanDetailStatusBadge from './PengajuanDetailStatusBadge';

export default function PengajuanProfileHeader({ pengajuan }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 bg-gradient-to-br from-[#152042] to-[#0B1171] rounded-3xl text-white shadow-xl">
            <div className="w-24 h-24 rounded-3xl bg-[#FFC800] flex items-center justify-center font-black text-[#152042] text-4xl shadow-inner shrink-0">
                {getInitials(pengajuan.name)}
            </div>

            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold tracking-tight">{pengajuan.name}</h2>
                <p className="text-blue-200 mt-1">{pengajuan.instansi}</p>
                <p className="text-blue-300 font-mono text-sm mt-1">{pengajuan.id}</p>
            </div>

            <PengajuanDetailStatusBadge status={pengajuan.status} />
        </div>
    );
}
