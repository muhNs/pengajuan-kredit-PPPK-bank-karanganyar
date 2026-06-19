import React from 'react';

export default function PengajuanNoteCard({ catatan }) {
    if (!catatan) return null;

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <p className="text-xs font-black text-[#152042] uppercase tracking-widest mb-4">Catatan / Keterangan</p>
            <p className="text-gray-700 leading-relaxed">{catatan}</p>
        </div>
    );
}
