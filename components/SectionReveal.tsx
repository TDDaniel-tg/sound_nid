"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function SectionReveal({
    children,
    className = "",
    delay = 0,
}: SectionRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 40, filter: "blur(6px)" }
            }
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
