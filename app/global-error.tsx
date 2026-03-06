"use client";

import { motion } from "framer-motion";

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="ru">
            <body className="min-h-screen flex items-center justify-center"
                style={{ background: "#0d0d0d", color: "#EFEFEF", fontFamily: "system-ui" }}
            >
                <div className="text-center px-6 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-8xl mb-6">💥</div>
                        <h1 style={{ fontSize: "3rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                            ПЕРЕГРУЗКА!
                        </h1>
                        <p style={{ color: "#BEBEBE", marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                            Усилитель не выдержал нагрузки…
                        </p>
                        <p style={{ color: "#BEBEBE80", fontSize: "0.875rem", marginBottom: "2rem" }}>
                            Критическая ошибка в системе. Попробуйте перезагрузить страницу.
                        </p>
                        <button
                            onClick={reset}
                            style={{
                                background: "#841010",
                                color: "#fff",
                                padding: "1rem 2rem",
                                borderRadius: "0.5rem",
                                border: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                cursor: "pointer",
                            }}
                        >
                            🔌 Перезагрузить
                        </button>
                    </motion.div>
                </div>
            </body>
        </html>
    );
}
