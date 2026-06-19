import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PengajuanDetailHeader({ onBack }) {
    return (
        <div className="">
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition shadow-sm mb-3"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Detail Pengajuan</h1>
        </div>
    );
}
