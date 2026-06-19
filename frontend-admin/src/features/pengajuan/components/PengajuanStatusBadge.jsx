import React from 'react';
import { getStatusStyle } from '../utils/pengajuanUtils';

export default function PengajuanStatusBadge({ status, size = 'md' }) {
    const style = getStatusStyle(status);
    const spacing = size === 'sm' ? 'px-4 py-1 text-xs' : 'px-5 py-2 text-sm';

    return (
        <span className={`${spacing} font-semibold rounded-2xl border ${style.badge}`}>
            {status}
        </span>
    );
}
