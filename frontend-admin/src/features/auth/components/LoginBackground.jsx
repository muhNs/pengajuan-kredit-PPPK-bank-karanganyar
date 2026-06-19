import React from 'react';

export default function LoginBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Big glowing orbs */}
            <div className="absolute top-[-15%] right-[-10%] w-[650px] h-[650px] bg-blue-500/20 rounded-full blur-[100px] animate-orb" />
            <div className="absolute bottom-[-20%] left-[-15%] w-[750px] h-[750px] bg-indigo-500/15 rounded-full blur-[110px] animate-orb-delay" />
            
            {/* Floating particles */}
            <div className="absolute top-[25%] left-[20%] w-2 h-2 bg-white/40 rounded-full animate-particle" />
            <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-white/30 rounded-full animate-particle delay-500" />
            <div className="absolute bottom-[35%] left-[25%] w-1.5 h-1.5 bg-white/50 rounded-full animate-particle delay-1000" />
            <div className="absolute bottom-[25%] right-[35%] w-2 h-2 bg-white/25 rounded-full animate-particle delay-700" />
        </div>
    );
}