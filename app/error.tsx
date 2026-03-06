"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Red warning glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[180px]" />

            {/* Pulsing warning circles */}
            {[1, 2, 3].map((ring) => (
                <motion.div
                    key={ring}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-accent/20 rounded-full"
                    style={{
                        width: `${ring * 200}px`,
                        height: `${ring * 200}px`,
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.05, 0.2],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: ring * 0.5,
                    }}
                />
            ))}

            <div className="relative z-10 text-center max-w-2xl">
                {/* Feedback icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <motion.div
                        className="w-32 h-32 mx-auto bg-accent/10 rounded-full flex items-center justify-center border-2 border-accent/30"
                        animate={{
                            boxShadow: [
                                "0 0 0 0 rgba(132,16,16,0)",
                                "0 0 30px 10px rgba(132,16,16,0.3)",
                                "0 0 0 0 rgba(132,16,16,0)",
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-6xl">🔊</span>
                    </motion.div>
                </motion.div>

                {/* Glitch text effect */}
                <motion.h1
                    className="font-bebas text-6xl md:text-8xl text-text tracking-wider mb-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.span
                        animate={{
                            x: [0, -3, 3, -1, 0],
                            opacity: [1, 0.8, 1],
                        }}
                        transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            repeatDelay: 4,
                        }}
                    >
                        FEEDBACK!
                    </motion.span>
                </motion.h1>

                {/* VU Meter overload visualization */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center gap-1 mb-8"
                >
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={`w-3 h-8 rounded-sm ${i < 12 ? "bg-green-500" : i < 16 ? "bg-yellow-500" : "bg-red-500"
                                }`}
                            animate={{
                                opacity: i < 18 ? [0.3, 1, 0.3] : [1, 1, 1],
                                scaleY: i < 18 ? [0.3, 1, 0.3] : [1, 1, 1],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.05,
                            }}
                        />
                    ))}
                    <div className="flex items-center ml-2">
                        <motion.span
                            className="text-red-500 font-bebas text-xl tracking-wider"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            CLIP
                        </motion.span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="font-bebas text-3xl md:text-4xl text-text tracking-wider mb-4">
                        ОБРАТНАЯ СВЯЗЬ ВЫШЛА ИЗ-ПОД КОНТРОЛЯ
                    </h2>
                    <p className="text-silver text-lg mb-2">
                        Кто-то направил микрофон прямо в мониторный клин…
                    </p>
                    <p className="text-silver/60 text-sm mb-10">
                        Произошла ошибка в системе. Попробуйте перезапустить саундчек.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={reset}
                        className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/40"
                    >
                        🔄 Перезапустить саундчек
                    </button>
                    <a
                        href="/"
                        className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 text-center"
                    >
                        🏠 На главную
                    </a>
                </motion.div>

                {/* Easter egg */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-16 text-silver/30 text-xs italic"
                >
                    &ldquo;Это не фидбэк, это фича&rdquo; — ваш звукорежиссёр, наверное
                </motion.p>
            </div>
        </div>
    );
}
