"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px]" />

            {/* Floating musical notes */}
            {["♪", "♫", "♬", "🎵", "🔊", "🎤"].map((note, i) => (
                <motion.span
                    key={i}
                    className="absolute text-accent/20 text-4xl select-none pointer-events-none"
                    style={{
                        left: `${15 + i * 14}%`,
                        top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 15, -15, 0],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                    }}
                >
                    {note}
                </motion.span>
            ))}

            <div className="relative z-10 text-center max-w-2xl">
                {/* 404 Hz */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="font-bebas text-[12rem] md:text-[16rem] leading-none text-text tracking-wider relative">
                        4
                        <motion.span
                            className="inline-block text-accent"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            ◉
                        </motion.span>
                        4
                    </h1>
                </motion.div>

                {/* Frequency display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative -mt-8 mb-8"
                >
                    <div className="font-mono text-accent text-sm tracking-widest mb-2">
                        ▸ FREQUENCY NOT FOUND
                    </div>

                    {/* Waveform visualization */}
                    <svg
                        width="300"
                        height="60"
                        viewBox="0 0 300 60"
                        className="mx-auto"
                    >
                        {Array.from({ length: 60 }).map((_, i) => (
                            <motion.rect
                                key={i}
                                x={i * 5}
                                width="3"
                                rx="1.5"
                                fill="#841010"
                                initial={{ height: 2, y: 29 }}
                                animate={{
                                    height: [2, Math.random() * 40 + 5, 2],
                                    y: [29, 30 - (Math.random() * 20 + 2.5), 29],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.03,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </svg>
                </motion.div>

                {/* Main text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <h2 className="font-bebas text-4xl md:text-5xl text-text tracking-wider mb-4">
                        СИГНАЛ ПОТЕРЯН
                    </h2>
                    <p className="text-silver text-lg mb-2">
                        Похоже, кто-то выдернул кабель из микшера…
                    </p>
                    <p className="text-silver/60 text-sm mb-10">
                        Страница на частоте 404 Hz не обнаружена. Проверьте коммутацию.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/"
                        className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/40 text-center"
                    >
                        🎚️ На главный пульт
                    </Link>
                    <Link
                        href="/#contact"
                        className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 text-center"
                    >
                        📞 Вызвать звукорежиссёра
                    </Link>
                </motion.div>

                {/* Easter egg quote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16 text-silver/30 text-xs italic"
                >
                    &ldquo;Подключи мне в мониторы больше 404-й страницы&rdquo; — ни один музыкант никогда
                </motion.p>
            </div>
        </div>
    );
}
