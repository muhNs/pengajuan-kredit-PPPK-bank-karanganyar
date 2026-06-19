import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Menggunakan fisika pegas (Spring) agar kursor terasa "berat" dan premium
    const cursorX = useSpring(mousePosition.x, { stiffness: 150, damping: 15, mass: 0.5 });
    const cursorY = useSpring(mousePosition.y, { stiffness: 150, damping: 15, mass: 0.5 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            // Deteksi jika kursor berada di atas elemen interaktif
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="hidden md:block pointer-events-none z-[10000]">
            {/* Titik Utama (Dot) */}
            <motion.div
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#FFC800] rounded-full mix-blend-difference"
                animate={{
                    x: mousePosition.x - 5,
                    y: mousePosition.y - 5,
                    scale: isHovering ? 0 : 1
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />

            {/* Cincin Luar (Ring) dengan efek pegas */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-[#FFC800] rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(255,200,0,0.1)" : "transparent",
                    borderColor: isHovering ? "rgba(255,200,0,0)" : "rgba(255,200,0,0.5)"
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
}
