import React from 'react';

export default function BannerIllustration() {
    return (
        <div className="relative w-64 h-48 select-none">
            <div style={{ animation: 'floatY 4s ease-in-out infinite' }}>
                <svg viewBox="0 0 260 160" className="w-full h-full">
                    <defs>
                        <linearGradient id="bi-screen" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1d4ed8" />
                            <stop offset="100%" stopColor="#0c2a7a" />
                        </linearGradient>
                        <linearGradient id="bi-base" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1e3a8a" />
                            <stop offset="100%" stopColor="#0c1e50" />
                        </linearGradient>
                        <filter id="bi-glow">
                            <feGaussianBlur stdDeviation="2.5" result="b" />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <ellipse cx="130" cy="148" rx="90" ry="14" fill="#071228" opacity="0.5" />
                    <polygon points="55,130 205,130 220,142 40,142" fill="#0c1e50" />
                    <ellipse cx="130" cy="130" rx="75" ry="12" fill="url(#bi-base)" />
                    <rect x="70" y="25" width="120" height="106" rx="8" fill="url(#bi-screen)" />
                    <rect x="70" y="25" width="120" height="7" rx="4" fill="#3b82f6" opacity="0.5" />
                    {[
                        { x: 82, h: 32, c: '#FFC800' },
                        { x: 98, h: 50, c: '#3b82f6' },
                        { x: 114, h: 24, c: '#10b981' },
                        { x: 130, h: 56, c: '#FFC800' },
                        { x: 146, h: 38, c: '#8b5cf6' },
                        { x: 162, h: 44, c: '#3b82f6' },
                    ].map((bar, index) => (
                        <rect
                            key={index}
                            x={bar.x}
                            y={120 - bar.h}
                            width="11"
                            height={bar.h}
                            rx="3"
                            fill={bar.c}
                            opacity="0.95"
                            filter="url(#bi-glow)"
                            style={{
                                transformOrigin: `${bar.x + 5.5}px 120px`,
                                animation: `barUp 0.6s ${index * 80}ms cubic-bezier(.22,.68,0,1.2) both`,
                            }}
                        />
                    ))}
                    <polyline
                        points="87,88 103,70 119,80 135,58 151,70 167,62"
                        fill="none"
                        stroke="#FFC800"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="300"
                        strokeDashoffset="300"
                        style={{ animation: 'lineIn 1.2s 400ms ease forwards' }}
                    />
                    {[
                        { x: 87, y: 88 },
                        { x: 103, y: 70 },
                        { x: 119, y: 80 },
                        { x: 135, y: 58 },
                        { x: 151, y: 70 },
                        { x: 167, y: 62 },
                    ].map((point, index) => (
                        <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="3"
                            fill="#FFC800"
                            filter="url(#bi-glow)"
                            style={{ opacity: 0, animation: `fadeIn 0.3s ${700 + index * 100}ms forwards` }}
                        />
                    ))}
                    <circle cx="218" cy="35" r="7" fill="#3b82f6" opacity="0.35" style={{ animation: 'orb 5s ease-in-out infinite' }} />
                    <circle cx="228" cy="58" r="4.5" fill="#FFC800" opacity="0.45" style={{ animation: 'orb 4s 1.2s ease-in-out infinite' }} />
                    <circle cx="40" cy="50" r="5" fill="#10b981" opacity="0.3" style={{ animation: 'orb 6s 0.5s ease-in-out infinite' }} />
                </svg>
            </div>
            <div className="absolute -top-4 -right-4" style={{ animation: 'floatYR 3.5s ease-in-out infinite' }}>
                <svg viewBox="0 0 60 68" className="w-14 h-14">
                    <defs>
                        <linearGradient id="cube-t" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#FFC800" />
                        </linearGradient>
                        <linearGradient id="cube-l" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E6AA00" />
                            <stop offset="100%" stopColor="#B8860B" />
                        </linearGradient>
                        <linearGradient id="cube-r2" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#FFC800" />
                            <stop offset="100%" stopColor="#CC9900" />
                        </linearGradient>
                    </defs>
                    <polygon points="30,6 52,18 52,42 30,54 8,42 8,18" fill="url(#cube-t)" />
                    <polygon points="30,54 8,42 8,18 30,30" fill="url(#cube-l)" />
                    <polygon points="30,54 52,42 52,18 30,30" fill="url(#cube-r2)" />
                </svg>
            </div>
        </div>
    );
}
