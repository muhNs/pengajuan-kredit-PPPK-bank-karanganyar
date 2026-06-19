import React from 'react';
import { CalendarDays, Clock, Hand } from 'lucide-react';
import BannerIllustration from './BannerIllustration';

function InfoPill({ icon, label, sub }) {
    return (
        <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}
        >
            <span style={{ color: '#FFC800' }}>{icon}</span>
            <div>
                <p className="text-xs font-bold text-white leading-none">{label}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{sub}</p>
            </div>
        </div>
    );
}

export default function DashboardBanner({ dateStr, timeStr }) {
    return (
        <div
            className="relative overflow-hidden rounded-3xl text-white"
            style={{
                background: 'linear-gradient(130deg, #060f28 0%, #0b1e4a 50%, #091630 100%)',
                minHeight: 195,
                animation: 'scaleIn 0.55s cubic-bezier(.22,.68,0,1.2) both',
            }}
        >
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-10 py-8 gap-6">
                <div className="space-y-5" style={{ animation: 'slideRight 0.65s 0.05s both' }}>
                    <div className="flex items-start gap-4">
                        <span className="mt-1" style={{ color: '#FFC800', animation: 'floatY 3s ease-in-out infinite' }}>
                            <Hand className="w-10 h-10" />
                        </span>
                        <div>
                            <h1 className="text-3xl font-extrabold leading-snug">
                                Selamat datang, <span style={{ color: '#FFC800' }}>Admin Utama!</span>
                            </h1>
                            <p className="text-gray-400 text-sm mt-1 max-w-sm">
                                Kelola data kreditur, master data dan pengajuan dengan mudah.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <InfoPill icon={<CalendarDays className="w-4 h-4" />} label={dateStr} sub="Tanggal" />
                        <InfoPill icon={<Clock className="w-4 h-4" />} label={timeStr} sub="Waktu" />
                    </div>
                </div>
                <div className="hidden lg:block flex-shrink-0" style={{ animation: 'fadeIn 0.8s 0.25s both' }}>
                    <BannerIllustration />
                </div>
            </div>
        </div>
    );
}
