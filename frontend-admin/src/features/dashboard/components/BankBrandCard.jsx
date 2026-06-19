import React from 'react';
import bankLogo from '../../../assets/logo-final.png';

export default function BankBrandCard() {
    return (
        <div
            className="mx-4 mb-4 mt-2 rounded-2xl p-5 text-center"
            style={{ background: 'linear-gradient(135deg,#060f28,#0c1e4a)' }}
        >
            <img
                src={bankLogo}
                alt="Logo Bank Karanganyar"
                className="h-12 w-auto object-contain mx-auto mb-3"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.5))' }}
            />
            <div
                className="w-2/3 h-px mx-auto mb-3"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,200,0,.5),transparent)' }}
            />
            <p className="text-white text-sm font-extrabold">Bank Karanganyar</p>
            <p className="text-gray-500 text-[11px] italic mt-1">
                Melayani dengan Hati,
                <br />
                Membangun Negeri
            </p>
        </div>
    );
}
