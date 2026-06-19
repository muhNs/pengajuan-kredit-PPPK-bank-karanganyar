import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PengajuanDetailHeader({ onBack }) {
    return (
        <div className="">
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-700 transition mb-2"
            >
                <ArrowLeft className="w-6 h-4" />
                Kembali
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Detail Pengajuan</h1>
        </div>
    );
}
