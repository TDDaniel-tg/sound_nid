"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionTitleProps {
    text: string;
    className?: string;
}

export default function SectionTitle({ text, className = "" }: SectionTitleProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const chars = text.split("");

    return (
        <h2
            ref={ref}
            className={`font-bebas text-5xl md:text-7xl text-center tracking-wider text-text ${className}`}
        >
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                    animate={
                        isInView
                            ? { opacity: 1, y: 0, filter: "blur(0px)" }
                            : { opacity: 0, y: 30, filter: "blur(4px)" }
                    }
                    transition={{
                        duration: 0.5,
                        delay: i * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </h2>
    );
}
