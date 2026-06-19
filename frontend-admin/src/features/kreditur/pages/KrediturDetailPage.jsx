
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useKrediturStore } from '../store/krediturStore';
import KrediturDetailCard from '../components/KrediturDetailCard';

export default function KrediturDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { kreditur } = useKrediturStore();

    const current = kreditur.find(k => k.id === id);

    if (!current) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Data Tidak Ditemukan</h2>
                    <button onClick={() => navigate('/admin/kreditur')} className="mt-6 text-blue-600 underline">
                        ← Kembali ke Daftar Kreditur
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 px-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <button onClick={() => navigate('/admin/kreditur')} className="text-gray-500 hover:text-gray-700 flex items-center gap-2">
                        ← Kembali
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 mt-2">Detail Kreditur</h1>
                </div>
            </div>

            <KrediturDetailCard kreditur={current} showActions={true} />
        </div>
    );
}