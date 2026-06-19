import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

// Import komponen UI global
import Preloader from '../ui/Preloader';
import CustomCursor from '../ui/CustomCursor';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
    const location = useLocation();

    // Deteksi scroll untuk Progress Bar Kuning di atas
    const { scrollYProgress } = useScroll();

    return (
        <ReactLenis root options={{ lerp: 0.07, smoothWheel: true }}>

            {/* 1. Root Container dengan background solid untuk mencegah celah putih */}
            <div className="flex flex-col min-h-screen bg-[#FAFAFA] relative">

                {/* UTILITY GLOBAL */}
                <Preloader />
                <CustomCursor />

                {/* 2. ANIMASI PROGRESS BAR KUNING (Fixed di paling atas tanpa celah) */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-[4px] md:h-[6px] bg-[#FFC800] z-[99999] origin-left shadow-[0_2px_10px_rgba(255,200,0,0.5)]"
                    style={{ scaleX: scrollYProgress }}
                />

                {/* 3. FIXED NAVBAR: Selalu solid dan mengikuti scroll */}
                <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                </div>

                {/* 4. MAIN CONTENT AREA */}
                {/* pt-20 memastikan konten tidak tertutup oleh Navbar yang fixed.
                    Menghapus rounded-b agar rapat dengan footer */}
                <main className="flex-grow relative z-10 flex flex-col w-full pt-[64px] md:pt-[80px]">

                    {/* SEAMLESS PAGE TRANSITION */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full flex-grow flex flex-col"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* 5. FOOTER STANDAR: Menempel sempurna tanpa celah putih */}
                <div className="relative w-full z-20">
                    <Footer />
                </div>

            </div>
        </ReactLenis>
    );
}
