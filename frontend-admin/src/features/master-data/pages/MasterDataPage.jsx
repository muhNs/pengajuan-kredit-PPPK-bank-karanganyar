import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMasterDataStore } from '../store/masterDataStore';
import MasterDataTable from '../components/MasterDataTable';
import MasterDataInstansi from '../components/MasterDataInstansi'; // Import komponen Instansi
import '../styles/masterData.css';

export default function MasterDataPage() {
    const { category: categoryParam } = useParams();
    const navigate = useNavigate();
    const { categories } = useMasterDataStore();

    // Default ke kategori pertama jika tidak ada param
    const activeCategoryKey = categoryParam || categories[0]?.key;
    const activeCategory = categories.find((category) => category.key === activeCategoryKey);

    useEffect(() => {
        if (!categoryParam && categories.length > 0) {
            navigate(`/admin/master-data/${categories[0].key}`, { replace: true });
        }
    }, [categoryParam, categories, navigate]);

    return (
        <div className="master-data-page space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 master-fade-up">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Master Data</h1>
                    <p className="text-gray-500 mt-1">Kelola data referensi sistem</p>
                </div>
                <div className="master-active-card bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm min-w-[220px]">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">Kategori Aktif</p>
                    <p className="mt-1 text-lg font-black text-[#152042]">{activeCategory?.label ?? 'Data'}</p>
                </div>
            </div>

            {/* CABANG RENDER: Jika Instansi render tabel khusus, selain itu render tabel umum */}
            {activeCategoryKey === 'instansi' ? (
                <MasterDataInstansi />
            ) : (
                <MasterDataTable key={activeCategoryKey} categoryKey={activeCategoryKey} />
            )}
        </div>
    );
}