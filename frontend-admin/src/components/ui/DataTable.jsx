import React, { useState, useMemo } from 'react';

/**
 * Reusable DataTable Component
 * Props:
 *  - columns: [{ key, label, render?, sortable?, width? }]
 *  - data: array of objects
 *  - loading: boolean
 *  - emptyMessage: string
 *  - actions?: (row) => ReactNode
 */
export default function DataTable({
    columns = [],
    data = [],
    loading = false,
    emptyMessage = 'Data tidak ditemukan.',
    actions,
    rowClassName,
    rowStyle,
}) {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // --- SEARCH FILTER ---
    const filtered = useMemo(() => {
        if (!search.trim()) return data;
        const q = search.toLowerCase();
        return data.filter(row =>
            columns.some(col => {
                const val = row[col.key];
                return val != null && String(val).toLowerCase().includes(q);
            })
        );
    }, [data, search, columns]);

    // --- SORTING ---
    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        return [...filtered].sort((a, b) => {
            const valA = a[sortKey] ?? '';
            const valB = b[sortKey] ?? '';
            const result = String(valA).localeCompare(String(valB), 'id', { numeric: true });
            return sortDir === 'asc' ? result : -result;
        });
    }, [filtered, sortKey, sortDir]);

    // --- PAGINATION ---
    const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
    const paginated = sorted.slice((page - 1) * perPage, page * perPage);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
        setPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    // Loading Skeleton Rows
    const SkeletonRow = () => (
        <tr className="animate-pulse">
            {columns.map((col, i) => (
                <td key={i} className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                </td>
            ))}
            {actions && <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded-md w-1/2" /></td>}
        </tr>
    );

    return (
        <div className="flex flex-col gap-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Cari data..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152042]/20 focus:border-[#152042] transition-all"
                    />
                </div>

                {/* Per Page + Count */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                        {filtered.length} data
                    </span>
                    <select
                        value={perPage}
                        onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
                        className="text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#152042]/20 bg-white cursor-pointer"
                    >
                        {[5, 10, 25, 50].map(n => (
                            <option key={n} value={n}>{n} / halaman</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-gray-200 bg-[#152042]/5">
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className={`px-4 py-3 font-bold text-xs uppercase tracking-wider text-[#152042] select-none ${col.sortable !== false ? 'cursor-pointer hover:bg-[#152042]/10 transition-colors' : ''}`}
                                    style={col.width ? { width: col.width } : {}}
                                    onClick={() => col.sortable !== false && handleSort(col.key)}
                                >
                                    <span className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable !== false && (
                                            <span className={`text-[10px] transition-opacity ${sortKey === col.key ? 'opacity-100 text-[#FFC800]' : 'opacity-30'}`}>
                                                {sortKey === col.key && sortDir === 'desc' ? '▼' : '▲'}
                                            </span>
                                        )}
                                    </span>
                                </th>
                            ))}
                            {actions && (
                                <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-[#152042] text-center">
                                    Aksi
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            Array.from({ length: perPage }).map((_, i) => <SkeletonRow key={i} />)
                        ) : paginated.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="py-16 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0H4" /></svg>
                                        <span className="text-sm font-medium">{emptyMessage}</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginated.map((row, rowIdx) => (
                                <tr
                                    key={row.id ?? rowIdx}
                                    className={`hover:bg-[#152042]/[0.03] transition-colors group ${rowClassName ? rowClassName(row, rowIdx) : ''}`}
                                    style={rowStyle ? rowStyle(row, rowIdx) : undefined}
                                >
                                    {columns.map(col => (
                                        <td key={col.key} className="px-4 py-3 text-gray-700">
                                            {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '-')}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                                {actions(row)}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!loading && sorted.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
                    <span>
                        Menampilkan {((page - 1) * perPage) + 1}–{Math.min(page * perPage, sorted.length)} dari {sorted.length} data
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(1)}
                            disabled={page === 1}
                            className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold"
                        >«</button>
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >‹</button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let p;
                            if (totalPages <= 5) p = i + 1;
                            else if (page <= 3) p = i + 1;
                            else if (page >= totalPages - 2) p = totalPages - 4 + i;
                            else p = page - 2 + i;
                            return (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`px-3 py-1 rounded border transition-all font-medium ${page === p ? 'bg-[#152042] text-white border-[#152042]' : 'border-gray-200 hover:bg-gray-100'}`}
                                >{p}</button>
                            );
                        })}

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >›</button>
                        <button
                            onClick={() => setPage(totalPages)}
                            disabled={page === totalPages}
                            className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold"
                        >»</button>
                    </div>
                </div>
            )}
        </div>
    );
}
