import React from 'react';

export default function PengajuanInfoRow({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-1 border-b border-gray-100 last:border-0">
            <span className="text-xs text-gray-500 w-40 shrink-0 font-medium">{label}</span>
            <span className="text-sm font-semibold text-[#152042] flex-1">{value || '-'}</span>
        </div>
    );
}
