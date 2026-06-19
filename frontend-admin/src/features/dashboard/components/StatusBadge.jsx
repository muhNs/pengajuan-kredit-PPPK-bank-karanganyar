import React from 'react';

const STATUS_CONFIG = {
    Disetujui: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
    'Sedang Diproses': { bg: '#dbeafe', color: '#1d4ed8', dot: '#3b82f6' },
    Ditolak: { bg: '#fee2e2', color: '#dc2626', dot: '#ef4444' },
};

export default function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] || { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' };

    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{ backgroundColor: cfg.bg, color: cfg.color }}
        >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.dot }} />
            {status}
        </span>
    );
}
