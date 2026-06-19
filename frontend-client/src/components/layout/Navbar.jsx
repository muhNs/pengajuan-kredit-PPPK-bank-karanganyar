import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleHomeClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-[#122B88] sticky top-0 z-50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300">

            {/* PERBAIKAN: Mengurangi padding di layar terkecil dari px-5 menjadi px-4 agar ruang lebih luas */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12">

                <div className="flex justify-between items-center h-[64px] md:h-[80px]">

                    <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2.5 md:gap-4 cursor-pointer group">
                        {/* PERBAIKAN: Ukuran logo disesuaikan mengecil di HP */}
                        <img
                            src="/images/logo-final.png"
                            alt="Logo Bank Karanganyar"
                            className="h-6 min-[375px]:h-8 md:h-[38px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/150x50/122B88/ffffff?text=LOGO+BANK";
                            }}
                        />

                        <div className="flex flex-col justify-center">
                            {/* PERBAIKAN: Teks disesuaikan agar mengecil (text-[11px]) di HP sempit */}
                            <h1 className="text-white font-bold text-[11px] min-[375px]:text-[13px] md:text-[16px] leading-none tracking-wide uppercase">
                                PT BPR BANK KARANGANYAR
                            </h1>
                            <p className="text-white/70 text-[7px] min-[375px]:text-[9px] md:text-[10px] font-medium tracking-[0.25em] mt-1.5 uppercase leading-none">
                                SiKredit PPPK
                            </p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
                        <Link to="/" onClick={handleHomeClick} className="text-[13px] lg:text-[14px] font-semibold text-white/80 hover:text-white uppercase tracking-widest transition-colors duration-200">
                            Home
                        </Link>

                        {/* REVISI: Mengubah 'Prosedur' menjadi 'About' dan mengarah ke id #about */}
                        <a href="/#about" className="text-[13px] lg:text-[14px] font-semibold text-white/80 hover:text-white uppercase tracking-widest transition-colors duration-200">
                            About
                        </a>

                        <a href="/#contact" className="text-[13px] lg:text-[14px] font-semibold text-white/80 hover:text-white uppercase tracking-widest transition-colors duration-200">
                            Contact Us
                        </a>
                        <a href="/pengajuan" className="text-[13px] lg:text-[14px] font-semibold text-white/80 hover:text-[#FFC800] uppercase tracking-widest transition-colors duration-200">
                            Ajukan
                        </a>
                    </div>

                    <div className="md:hidden flex items-center -mr-2">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white/80 hover:text-white focus:outline-none p-2 transition-colors">
                            {isMobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden absolute w-full bg-[#122B88] shadow-2xl border-t border-white/5">
                    <div className="px-5 py-5 flex flex-col space-y-1">
                        <Link to="/" onClick={handleHomeClick} className="block px-4 py-3.5 rounded-lg text-sm font-semibold tracking-widest text-white/90 hover:text-white hover:bg-white/5 transition-all uppercase">Home</Link>

                        {/* REVISI MOBILE MENU: Mengubah 'Prosedur' menjadi 'About' dan mengarah ke id #about */}
                        <a href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-lg text-sm font-semibold tracking-widest text-white/90 hover:text-white hover:bg-white/5 transition-all uppercase">About</a>

                        <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-lg text-sm font-semibold tracking-widest text-white/90 hover:text-white hover:bg-white/5 transition-all uppercase">Contact Us</a>
                        <a href="/pengajuan" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-lg text-sm font-semibold tracking-widest text-[#FFC800] hover:bg-white/5 transition-all uppercase">Ajukan</a>
                    </div>
                </div>
            )}
        </nav>
    );
}
