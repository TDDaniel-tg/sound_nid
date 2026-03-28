"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSiteData } from "./SiteDataContext";

const wordAnimation = {
    hidden: {
        opacity: 0,
        scale: 0.3,
        filter: "blur(20px)",
        y: 80,
    },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            delay: 0.3 + i * 0.12,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    }),
};

export default function Hero() {
    const { data } = useSiteData();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-screen bg-bg" />;

    const heroWords = data.texts.heroTitle.split(" ").filter(Boolean);
    const totalWordDelay = 0.3 + heroWords.length * 0.12 + 0.3;
    const subtitleDelay = totalWordDelay + 0.2;
    const buttonsDelay = subtitleDelay + 0.4;

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background gradient + red glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/15 rounded-full blur-[150px]" />
            <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[120px]" />

            {/* Watermark logo */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                <img
                    src="/telegram_assets/logo.jpg"
                    alt=""
                    className="w-[60vw] max-w-[500px] h-auto opacity-[0.06] rounded-full"
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl">
                {/* Main title — fly-in words */}
                <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none mb-6">
                    {heroWords.map((word, i) => (
                        <motion.span
                            key={i}
                            className="inline-block mx-1 sm:mx-2"
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={wordAnimation}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                {/* SVG Line */}
                <svg
                    className="mx-auto mb-8 w-full max-w-md"
                    height="2"
                    viewBox="0 0 400 2"
                    fill="none"
                >
                    <line
                        x1="0"
                        y1="1"
                        x2="400"
                        y2="1"
                        stroke="#841010"
                        strokeWidth="2"
                        className="hero-line"
                    />
                </svg>

                {/* Subtitle */}
                <motion.p
                    className="text-silver text-lg sm:text-xl md:text-2xl font-light mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: subtitleDelay,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                >
                    {data.texts.heroSubtitle}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: buttonsDelay,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                >
                    <a
                        href="#services"
                        className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/40 text-center"
                    >
                        Посмотреть услуги
                    </a>
                    <a
                        href="#contact"
                        className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 text-center"
                    >
                        Связаться
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: buttonsDelay + 0.5 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-silver/30 rounded-full flex items-start justify-center p-2"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-2 bg-accent rounded-full"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
