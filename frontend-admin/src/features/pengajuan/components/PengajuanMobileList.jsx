import React from 'react';
import { getAvatarUrl } from '../utils/pengajuanUtils';
import PengajuanStatusBadge from './PengajuanStatusBadge';

export default function PengajuanMobileList({ items, onDetail }) {
    return (
        <div className="md:hidden p-4 space-y-4">
            {items.map((row, index) => (
                <div
                    key={row.id}
                    className="border border-gray-100 rounded-3xl p-6 bg-white animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <img src={getAvatarUrl(row.name)} className="w-14 h-14 rounded-2xl" alt="" />
                            <div>
                                <p className="font-semibold text-lg">{row.name}</p>
                                <p className="text-gray-500 text-sm">{row.instansi}</p>
                            </div>
                        </div>
                        <PengajuanStatusBadge status={row.status} size="sm" />
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-y-4 text-sm">
                        <div>
                            <span className="text-gray-500">No. Pengajuan</span>
                            <br />
                            {row.id}
                        </div>
                        <div>
                            <span className="text-gray-500">Tanggal</span>
                            <br />
                            {row.date}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => onDetail(row.id)}
                        className="mt-6 w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition"
                    >
                        Lihat Detail
                    </button>
                </div>
            ))}
        </div>
    );
}
