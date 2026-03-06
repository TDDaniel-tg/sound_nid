"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const ringX = useSpring(0, springConfig);
    const ringY = useSpring(0, springConfig);

    useEffect(() => {
        // Only show on devices with a pointer (not touch)
        const mql = window.matchMedia("(pointer: fine)");
        if (!mql.matches) return;

        const onMove = (e: MouseEvent) => {
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            }
            ringX.set(e.clientX - 20);
            ringY.set(e.clientY - 20);
        };

        document.addEventListener("mousemove", onMove, { passive: true });

        // Show cursor elements
        if (dotRef.current) dotRef.current.style.opacity = "1";

        return () => document.removeEventListener("mousemove", onMove);
    }, [ringX, ringY]);

    // Check if we're on a touch or non-pointer device
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
        return null;
    }

    return (
        <>
            <div
                ref={dotRef}
                className="custom-cursor-dot hidden md:block"
                style={{ opacity: 0 }}
            />
            <motion.div
                className="custom-cursor-ring hidden md:block"
                style={{ x: ringX, y: ringY }}
            />
        </>
    );
}
