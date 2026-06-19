import React from 'react';
import PengajuanInfoRow from './PengajuanInfoRow';

export default function PengajuanInfoCard({ title, rows }) {
    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <p className="text-xs font-black text-[#152042] uppercase tracking-widest mb-6">{title}</p>
            <div className="space-y-5">
                {rows.filter((row) => row.value !== undefined && row.value !== null && row.value !== '').map((row) => (
                    <PengajuanInfoRow key={row.label} label={row.label} value={row.value} />
                ))}
            </div>
        </div>
    );
}
