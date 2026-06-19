import React from 'react';
import { getStatusStyle } from '../utils/pengajuanUtils';

export default function PengajuanDetailStatusBadge({ status }) {
    const style = getStatusStyle(status);

    return (
        <div className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold ${style.detailBg} ${style.detailText}`}>
            <span className={`w-3 h-3 rounded-full ${style.dot}`} />
            {status}
        </div>
    );
}
