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
    const words = text.split(" ");
    
    let globalCharIndex = 0;

    return (
        <h2
            ref={ref}
            className={`font-bebas text-5xl md:text-7xl text-center tracking-wider text-text flex flex-wrap justify-center gap-x-3 gap-y-2 ${className}`}
        >
            {words.map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cIndex) => {
                        const delayIndex = globalCharIndex++;
                        return (
                            <motion.span
                                key={cIndex}
                                className="inline-block"
                                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                                animate={
                                    isInView
                                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                                        : { opacity: 0, y: 30, filter: "blur(4px)" }
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: delayIndex * 0.03,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </span>
            ))}
        </h2>
    );
}
