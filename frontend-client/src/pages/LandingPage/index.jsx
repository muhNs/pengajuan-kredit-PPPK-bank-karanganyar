import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ======================================================================
// 1. DATA STATIS & KONFIGURASI ANIMASI
// ======================================================================
const CORE_VALUES = [
    {
        title: "Digitalisasi Tanpa Batas",
        subtitle: "Paperless & Seamless",
        desc: "Mulai dari pengisian data diri, informasi kepegawaian, hingga unggah dokumen pendukung (KTP, SK, Slip Gaji), seluruh alur dilakukan secara online. Sistem kami secara cerdas merangkum data tersebut menjadi dokumen PDF berstandar legal perbankan yang otomatis dan siap cetak.",
        icon: (
            <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        )
    },
    {
        title: "Proses Cepat dengan SLA Terukur",
        subtitle: "Efisiensi Waktu",
        desc: "Waktu Anda sangat berharga. SiKredit memangkas waktu administratif sehingga tahapan verifikasi dan analisa oleh tim Bank Karanganyar dapat dilakukan jauh lebih cepat, akurat, dan efisien.",
        icon: (
            <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "Notifikasi Hasil Otomatis",
        subtitle: "Proactive Notification",
        desc: "Anda tidak perlu repot bolak-balik menanyakan status. Setelah proses peninjauan oleh pihak bank selesai, sistem akan secara proaktif dan eksklusif mengirimkan informasi hasil persetujuan langsung ke nomor WhatsApp atau Email pribadi Anda yang terdaftar.",
        icon: (
            <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
            </svg>
        )
    },
    {
        title: "Keamanan Data Tingkat Tinggi",
        subtitle: "Privasi Nasabah",
        desc: "Privasi nasabah adalah prioritas mutlak. Seluruh data dan dokumen yang masuk dienkripsi dan dikelola secara terpusat melalui Dashboard Admin internal Bank Karanganyar dengan standar keamanan perbankan yang ketat.",
        icon: (
            <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        )
    }
];

const CONTACT_INFO = [
    { title: "Address", content: "Jl. Lawu Timur No.135, Karanganyar, Jawa Tengah 57714", icon: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></> },
    { title: "Phone", content: "(0271) 495489", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/> },
    { title: "Email", content: "info@bankkaranganyar.co.id", icon: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></> }
];

const ANIMATIONS = {
    stagger: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } },
    word: { hidden: { opacity: 0, y: 20, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 100, damping: 15 } } },
    fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } }
};

const TEXT_LINE_1 = "Solusi Kredit Cepat &".split(" ");
const TEXT_LINE_3 = "Karanganyar.".split(" ");

// ======================================================================
// 2. KOMPONEN UTAMA (LANDING PAGE)
// ======================================================================
export default function LandingPage() {
    const { scrollY } = useScroll();
    const yBackground = useTransform(scrollY, [0, 1000], [0, 200]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleHeroMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - left, y: e.clientY - top });
    };

    return (
        <div className="w-full font-sans bg-[#FAFAFA]">

            {/* HERO SECTION */}
            <section className="relative w-full h-[520px] sm:h-[600px] md:h-[85vh] md:min-h-[550px] overflow-hidden bg-[#0B1171] group" id="home" onMouseMove={handleHeroMouseMove}>
                <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
                     style={{ background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 200, 0, 0.08), transparent 80%)` }} />

                <motion.img
                    style={{ y: yBackground, willChange: "transform" }}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="/images/logo1.png" alt="Ilustrasi Bank Karanganyar"
                    className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-[90%_center] md:object-right z-0"
                />

                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B1171]/80 via-[#0B1171]/40 to-transparent md:w-[80%] pointer-events-none"></div>

                <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
                    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 w-full">
                        <div className="w-[75%] sm:w-[60%] md:w-1/2 flex flex-col items-start pointer-events-auto mt-10 md:mt-0">
                            <motion.h1
                                className="font-extrabold text-[#F3F4F6] mb-2 md:mb-4 leading-[1.15] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] flex flex-wrap"
                                style={{ fontSize: 'clamp(1.2rem, 4.5vw + 0.1rem, 3.5rem)' }}
                                variants={ANIMATIONS.stagger} initial="hidden" animate="visible"
                            >
                                <div className="w-full">{TEXT_LINE_1.map((word, i) => <motion.span key={i} variants={ANIMATIONS.word} className="inline-block mr-[0.25em]">{word}</motion.span>)}</div>
                                <div className="w-full">
                                    <motion.span variants={ANIMATIONS.word} className="text-[#FFC800] italic inline-block mr-[0.25em] drop-shadow-sm">Mudah</motion.span>
                                    <motion.span variants={ANIMATIONS.word} className="text-[#FFC800] italic inline-block mr-[0.25em] drop-shadow-sm">Khusus</motion.span>
                                    <motion.span variants={ANIMATIONS.word} className="text-[#FFC800] italic inline-block mr-[0.25em] drop-shadow-sm">PPPK</motion.span>
                                </div>
                                <div className="w-full">{TEXT_LINE_3.map((word, i) => <motion.span key={i} variants={ANIMATIONS.word} className="inline-block mr-[0.25em]">{word}</motion.span>)}</div>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, filter: 'blur(5px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.8 }}
                                className="text-[#E5E7EB] font-medium leading-[1.5] md:leading-[1.7] mb-5 md:mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                                style={{ fontSize: 'clamp(0.7rem, 1.5vw + 0.2rem, 1.125rem)' }}
                            >
                                Ajukan pinjaman tanpa ribet, proses transparan, dan difasilitasi penuh oleh Bank Karanganyar dalam kolaborasi strategis dengan instansi pemerintah daerah.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, delay: 1 }}
                                className="flex flex-col min-[420px]:flex-row gap-2.5 sm:gap-4 w-full min-[420px]:w-auto"
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05, y: -3, transition: { type: "spring", stiffness: 400 } }} whileTap={{ scale: 0.95 }}
                                    href="/pengajuan" className="w-full min-[420px]:w-auto px-4 py-2.5 md:px-8 md:py-4 bg-[#FFC800] text-[#0B1171] font-extrabold rounded-[10px] md:rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.2)] flex items-center justify-center gap-1.5"
                                    style={{ fontSize: 'clamp(0.7rem, 1.5vw + 0.2rem, 1.125rem)' }}
                                >
                                    Ajukan Sekarang <span className="text-[#F53649]">⚡</span>
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.05, y: -3, backgroundColor: "rgba(255,255,255,0.15)", transition: { type: "spring", stiffness: 400 } }} whileTap={{ scale: 0.95 }}
                                    href="#about" className="w-full min-[420px]:w-auto px-4 py-2.5 md:px-8 md:py-4 bg-white/10 text-white font-bold rounded-[10px] md:rounded-xl border border-white/40 shadow-[0_4px_10px_rgba(0,0,0,0.1)] backdrop-blur-sm flex justify-center items-center"
                                    style={{ fontSize: 'clamp(0.7rem, 1.5vw + 0.2rem, 1.125rem)' }}
                                >
                                    Tentang Platform
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================================
                SECTION: TENTANG KAMI / CORE VALUES (Desain Grid Responsif Proporsional)
                ===================================================================== */}
            <section className="pt-16 pb-28 md:pt-28 md:pb-40 bg-white overflow-hidden" id="about">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

                    {/* Header & Paragraf Pengantar */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={ANIMATIONS.fadeUp} className="text-center mb-10 md:mb-20">
                        <h2 className="text-[18px] sm:text-2xl md:text-4xl font-extrabold text-[#0B1171] mb-2 md:mb-4 tracking-tight">Tentang SiKredit PPPK</h2>
                        <div className="w-8 sm:w-12 md:w-16 h-[3px] md:h-1.5 bg-[#FFC800] mx-auto rounded-full mb-6 md:mb-12"></div>

                        {/* Teks Pengantar dengan scaling responsive */}
                        <div className="max-w-4xl mx-auto text-[#4B5563] text-[10px] sm:text-[13px] md:text-lg leading-relaxed md:leading-relaxed space-y-3 md:space-y-6 text-center px-2">
                            <p>
                                Di era mobilitas tinggi, waktu adalah aset berharga bagi para aparatur negara. <strong className="text-[#0B1171] font-bold">SiKredit PPPK</strong> hadir sebagai wujud nyata komitmen PT BPR Bank Karanganyar dalam memberikan layanan finansial yang memprioritaskan kemudahan, kecepatan, dan keamanan bagi para Pegawai Pemerintah dengan Perjanjian Kerja (PPPK).
                            </p>
                            <p>
                                Platform digital ini dirancang untuk mendobrak batasan proses pengajuan kredit konvensional yang identik dengan tumpukan kertas dan antrean panjang. Dengan antarmuka yang sangat ramah pengguna (<i className="italic">user-friendly</i>) dan sistem yang terintegrasi penuh, SiKredit memberikan pengalaman perbankan kelas premium bagi setiap nasabahnya.
                            </p>
                        </div>
                    </motion.div>

                    {/* Core Values Grid (Tetap 2 Kolom di Mobile, di-skala proporsional layaknya miniatur) */}
                    <div className="max-w-5xl mx-auto">
                        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={ANIMATIONS.fadeUp} className="text-[14px] sm:text-xl md:text-2xl font-bold text-[#0B1171] text-center mb-6 md:mb-12">
                            Nilai Utama <span className="text-[#FFC800]">(Core Values)</span> Platform Kami
                        </motion.h3>

                        {/* REVISI KUNCI: grid-cols-2 diterapkan secara paksa di semua ukuran layar */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
                            {CORE_VALUES.map((value, idx) => (
                                <motion.div
                                    key={idx}
                                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1 } } }}
                                    className="bg-[#FAFAFA] border border-gray-100 rounded-[12px] sm:rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-8 hover:bg-white hover:shadow-[0_8px_30px_rgba(11,17,113,0.06)] transition-all duration-300 group flex flex-col justify-start h-full"
                                >
                                    <div className="flex items-start gap-2 sm:gap-4 md:gap-5">
                                        {/* Ikon Container (Skala Mengecil di HP) */}
                                        <div className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-[8px] sm:rounded-xl md:rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <div className="scale-[0.45] sm:scale-75 md:scale-100 flex items-center justify-center">
                                                {value.icon}
                                            </div>
                                        </div>

                                        {/* Teks Container (Skala Mengecil di HP) */}
                                        <div>
                                            <h4 className="text-[9px] sm:text-xs md:text-lg font-bold text-[#0B1171] leading-tight mb-0.5 sm:mb-1 md:mb-2">{value.title}</h4>
                                            <span className="inline-block text-[6px] sm:text-[8px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 sm:mb-2 md:mb-3">{value.subtitle}</span>
                                            <p className="text-gray-500 text-[7px] sm:text-[10px] md:text-sm leading-[1.4] sm:leading-relaxed md:leading-relaxed">{value.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* CONTACT US SECTION */}
            <section id="contact" className="w-full bg-[#0B1171] pt-16 pb-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t-4 border-[#FFC800] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={ANIMATIONS.fadeUp} className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight">Hubungi Kami</h2>
                        <p className="text-blue-200 text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">Kunjungi kantor operasional kami atau hubungi layanan pelanggan untuk mendapatkan bantuan lebih lanjut terkait pengajuan Anda.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 60, damping: 20 }} viewport={{ once: true, margin: "-50px" }} className="space-y-6 sm:space-y-8 flex flex-col justify-center order-2 lg:order-1">
                            {CONTACT_INFO.map((item, i) => (
                                <motion.div key={i} whileHover={{ x: 10, scale: 1.02, transition: { type: "spring", stiffness: 400 } }} className="flex items-start gap-4 sm:gap-5 group cursor-pointer">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 group-hover:bg-[#FFC800] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 border border-white/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#0B1171] transition-colors">{item.icon}</svg>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-blue-300 font-bold mb-1 text-[11px] sm:text-xs uppercase tracking-widest">{item.title}</h4>
                                        <p className="text-white font-medium text-[13px] sm:text-[15px] leading-relaxed break-all">{item.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }} viewport={{ once: true, margin: "-50px" }} className="w-full h-[280px] sm:h-[400px] bg-white p-2 sm:p-3 rounded-3xl shadow-2xl order-1 lg:order-2" style={{ willChange: "transform, opacity" }}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31638.73535936511!2d110.9543149!3d-7.5921784!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a189d83abdfc7%3A0xb82ba8b6cb56b0d!2sPT%20BPR%20BANK%20Karanganyar%20(Perseroda)!5e0!3m2!1sid!2sid!4v1776045658886!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-2xl shadow-inner w-full h-full" title="Lokasi PT BPR Bank Karanganyar"></iframe>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
