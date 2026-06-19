import { useEffect, useState } from 'react';

export default function useCounter(target, duration = 1300, delay = 0) {
    const [val, setVal] = useState(0);

    useEffect(() => {
        let frameId;

        const timer = setTimeout(() => {
            const start = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                setVal(Math.floor(eased * target));

                if (progress < 1) {
                    frameId = requestAnimationFrame(tick);
                } else {
                    setVal(target);
                }
            };

            frameId = requestAnimationFrame(tick);
        }, delay);

        return () => {
            clearTimeout(timer);
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [target, duration, delay]);

    return val;
}
