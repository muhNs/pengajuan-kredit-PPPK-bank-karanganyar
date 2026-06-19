import React from 'react';

export default function Footer() {
    return (
        // 1. BACKGROUND & BORDER ATAS
        <footer className="w-full bg-[#122B88] text-white mt-auto font-sans">
            <div className="w-full h-1.5 bg-[#FFC800]"></div>

            {/* 2. CONTAINER UTAMA */}
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-14 md:pt-16 pb-8 md:pb-10">

                {/* 3. LAYOUT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">

                    {/* =========================================================
                        KOLOM KIRI: INFORMASI BANK
                        ========================================================= */}
                    <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
                        {/* REVISI: Ukuran teks diperkecil ke 16px-18px agar elegan, font-bold (bukan extrabold) */}
                        <h2 className="text-[#FFC800] font-bold text-[16px] md:text-[18px] tracking-wide leading-[1.4] uppercase">
                            PT BPR BANK KARANGANYAR <br className="hidden sm:block" />
                            (PERSERODA)
                        </h2>

                        {/* REVISI: Teks detail diturunkan ke 13px-14px dengan font-normal */}
                        <div className="flex flex-col gap-3 text-white/90 text-[13px] md:text-[14px] font-normal tracking-wide">
                            <p>Jl. Lawu Timur No 135 Karanganyar</p>
                            <p>Telp. (0271) 495489, (0271) 494666</p>
                            <p>Email: info@bankkaranganyar.co.id</p>
                        </div>
                    </div>


                    {/* =========================================================
                        KOLOM KANAN: REGULASI & CARD LOGO
                        ========================================================= */}
                    <div className="lg:col-span-7 flex flex-col gap-3 md:gap-4">
                        {/* REVISI: Judul regulasi diperkecil ke 14px-15px */}
                        <h3 className="text-white font-bold text-[14px] md:text-[15px] tracking-widest uppercase mb-1">
                            TERDAFTAR DAN DIAWASI OLEH
                        </h3>

                        {/* REVISI: Teks penjelasan regulasi (fine-print) diperkecil ke 12px-13px */}
                        <p className="text-white/80 text-[12px] md:text-[13px] leading-[1.8] font-normal max-w-[95%]">
                            PT BPR Bank Karanganyar (Perseroda) berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK) & Bank Indonesia (BI), serta merupakan bank peserta penjaminan Lembaga Penjaminan Simpanan (LPS).
                        </p>

                        {/* 6. CARD LOGO REGULATOR (Ukuran Tetap Dipertahankan) */}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-3">

                            <div className="bg-white rounded-[12px] md:rounded-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center w-[110px] h-[60px] sm:w-[140px] sm:h-[76px] p-2.5 sm:p-4 hover:-translate-y-1 transition-transform duration-300">
                                <img src="/images/ojk.png" alt="OJK" className="w-full h-full object-contain" />
                            </div>

                            <div className="bg-white rounded-[12px] md:rounded-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center w-[110px] h-[60px] sm:w-[140px] sm:h-[76px] p-2.5 sm:p-4 hover:-translate-y-1 transition-transform duration-300">
                                <img src="/images/bi.png" alt="BI" className="w-full h-full object-contain" />
                            </div>

                            <div className="bg-white rounded-[12px] md:rounded-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center w-[110px] h-[60px] sm:w-[140px] sm:h-[76px] p-2.5 sm:p-4 hover:-translate-y-1 transition-transform duration-300">
                                <img src="/images/lps1.png" alt="LPS" className="w-full h-full object-contain" />
                            </div>

                        </div>
                    </div>

                </div>

                {/* =========================================================
                    FOOTER BOTTOM: COPYRIGHT & SYSTEM INFO
                    ========================================================= */}
                {/* REVISI: Teks copyright disesuaikan ke 11px-13px */}
                <div className="border-t border-white/20 pt-8 flex flex-col lg:flex-row justify-between items-center text-[11px] md:text-[13px] text-white/60 gap-4 text-center lg:text-left font-normal">
                    <p>© 2026 PT BPR Bank Karanganyar (Perseroda). All rights reserved.</p>
                    <p className="tracking-wide">Sistem Layanan SIKREDIT PPPK.</p>
                </div>

            </div>
        </footer>
    );
}
