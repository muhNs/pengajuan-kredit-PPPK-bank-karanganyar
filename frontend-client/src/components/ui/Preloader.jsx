import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    // Mengatur durasi preloader menjadi 1.5 detik
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    // Layar ditarik ke atas saat selesai (Curtain reveal effect)
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[99999] bg-[#122B88] flex flex-col items-center justify-center origin-top"
                >
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            filter: { repeat: Infinity, duration: 1.5 }
                        }}
                        src="/images/logo-final.png"
                        alt="Loading Bank Karanganyar..."
                        className="h-16 md:h-20 mb-6 object-contain"
                        onError={(e) => e.currentTarget.src = "https://placehold.co/150x50/122B88/ffffff?text=LOGO"}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-white/80 font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-3">
                            Mempersiapkan Sistem
                        </div>
                        {/* Garis Loading Estetik */}
                        <div className="w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="h-full bg-[#FFC800]"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
