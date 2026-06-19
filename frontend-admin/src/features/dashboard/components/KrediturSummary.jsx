import React from 'react';
import StatCard from './StatCard';
// HAPUS import data dummy dari sini, misalnya: import { dummyData } from '../constants/dashboardData'

export default function KrediturSummary({ stats }) {
    // Jika data stats belum siap, hindari error render
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* Mapping data riil ke properti StatCard yang sudah Anda desain sebelumnya */}
            <StatCard 
                title="Total Masuk" 
                value={stats.total_pengajuan} 
                colorClass="text-indigo-600" 
                iconBg="bg-indigo-50" 
            />
            <StatCard 
                title="Menunggu Review" 
                value={stats.menunggu_review} 
                colorClass="text-amber-500" 
                iconBg="bg-amber-50" 
            />
            <StatCard 
                title="Sedang Diproses" 
                value={stats.sedang_diproses} 
                colorClass="text-blue-500" 
                iconBg="bg-blue-50" 
            />
            <StatCard 
                title="Disetujui" 
                value={stats.disetujui} 
                colorClass="text-green-500" 
                iconBg="bg-green-50" 
            />
            <StatCard 
                title="Ditolak" 
                value={stats.ditolak} 
                colorClass="text-red-500" 
                iconBg="bg-red-50" 
            />
        </div>
    );
}