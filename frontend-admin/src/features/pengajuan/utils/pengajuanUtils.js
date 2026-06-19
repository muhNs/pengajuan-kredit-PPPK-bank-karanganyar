import {
    DEFAULT_STATUS_STYLE,
    PENGAJUAN_STATUSES,
    STATUS_STYLES,
} from '../constants/pengajuanConstants';

export function getStatusStyle(status) {
    return STATUS_STYLES[status] || DEFAULT_STATUS_STYLE;
}

export function filterPengajuan(pengajuan, searchText, activeTab) {
    const search = searchText.trim().toLowerCase();

    return pengajuan.filter((item) => {
        const matchSearch = !search
            || item.name?.toLowerCase().includes(search)
            || item.instansi?.toLowerCase().includes(search)
            || item.id?.toLowerCase().includes(search);
        const matchTab = activeTab === 'Semua' || item.status === activeTab;

        return matchSearch && matchTab;
    });
}

export function buildPengajuanStats(pengajuan) {
    return [
        { label: 'Total Pengajuan', value: pengajuan.length, color: 'indigo' },
        ...PENGAJUAN_STATUSES.map((status) => ({
            label: status,
            value: pengajuan.filter((item) => item.status === status).length,
            color: {
                'Menunggu Review': 'amber',
                'Sedang Diproses': 'blue',
                Disetujui: 'emerald',
                Ditolak: 'rose',
            }[status],
        })),
    ];
}

export function buildTabCounts(pengajuan) {
    return pengajuan.reduce(
        (counts, item) => ({
            ...counts,
            Semua: counts.Semua + 1,
            [item.status]: (counts[item.status] || 0) + 1,
        }),
        { Semua: 0 }
    );
}

export function formatCurrency(value) {
    if (!value) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

export function getInitials(name) {
    return name?.split(' ').slice(0, 2).map((word) => word[0]).join('').toUpperCase() || '?';
}

export function getAvatarUrl(name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || '?')}&background=2563eb&color=fff`;
}
