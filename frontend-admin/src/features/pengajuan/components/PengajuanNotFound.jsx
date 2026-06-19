import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PengajuanNotFound({ onBack }) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Pengajuan Tidak Ditemukan</h2>
                <button
                    type="button"
                    onClick={onBack}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Daftar Pengajuan
                </button>
            </div>
        </div>
    );
}
