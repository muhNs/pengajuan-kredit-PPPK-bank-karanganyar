export const PENGAJUAN_STATUSES = [
    'Menunggu Review',
    'Sedang Diproses',
    'Disetujui',
    'Ditolak',
];

export const PENGAJUAN_TABS = ['Semua', ...PENGAJUAN_STATUSES];

export const STATUS_STYLES = {
    Disetujui: {
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        detailBg: 'bg-emerald-100',
        detailText: 'text-emerald-700',
        dot: 'bg-emerald-500',
    },
    'Sedang Diproses': {
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
        detailBg: 'bg-blue-100',
        detailText: 'text-blue-700',
        dot: 'bg-blue-500',
    },
    Ditolak: {
        badge: 'bg-rose-100 text-rose-700 border-rose-200',
        detailBg: 'bg-rose-100',
        detailText: 'text-rose-700',
        dot: 'bg-rose-500',
    },
    'Menunggu Review': {
        badge: 'bg-amber-100 text-amber-700 border-amber-200',
        detailBg: 'bg-amber-100',
        detailText: 'text-amber-700',
        dot: 'bg-amber-500',
    },
};

export const DEFAULT_STATUS_STYLE = {
    badge: 'bg-gray-100 text-gray-600 border-gray-200',
    detailBg: 'bg-gray-100',
    detailText: 'text-gray-600',
    dot: 'bg-gray-400',
};

export const STAT_STYLES = {
    indigo: 'text-indigo-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    rose: 'text-rose-600',
};
