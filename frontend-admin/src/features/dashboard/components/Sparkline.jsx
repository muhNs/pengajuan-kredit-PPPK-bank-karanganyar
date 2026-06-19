import React from 'react';

// [PERBAIKAN] Tambahkan 'data' ke props dan berikan nilai default {}
export default function Sparkline({ color = "#3B82F6", delay = 0, data = null }) {
    
    // [PERBAIKAN] Cek apakah 'data' ada, jika tidak, cukup return null atau loader
    if (!data) return null;

    // [PERBAIKAN] Gunakan optional chaining (?.) untuk menghindari error jika color undefined
    const id = `sp-${color?.replace('#', '')}`;

    return (
        <svg viewBox="0 0 80 36" className="w-20 h-9" style={{ overflow: 'visible' }}>
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0,28 L13,18 L26,22 L39,10 L52,16 L65,6 L80,10"
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="300"
                strokeDashoffset="300"
                style={{ animation: `lineIn 1s ${delay}ms ease forwards` }}
            />
            <path
                d="M0,28 L13,18 L26,22 L39,10 L52,16 L65,6 L80,10 L80,36 L0,36 Z"
                fill={`url(#${id})`}
                style={{ opacity: 0, animation: `fadeIn 0.5s ${delay + 800}ms forwards` }}
            />
        </svg>
    );
}