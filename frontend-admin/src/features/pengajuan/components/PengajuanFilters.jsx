import React from 'react';
import { Search } from 'lucide-react';

export default function PengajuanFilters({ search, onSearchChange, onReset }) {
    return (
        <div className="p-6 md:p-8 border-b flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Cari nama kreditur, instansi, atau no. pengajuan..."
                    className="w-full pl-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-blue-500 text-sm"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
            </div>
            <button
                type="button"
                onClick={onReset}
                className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
            >
                Reset Filter
            </button>
        </div>
    );
}
