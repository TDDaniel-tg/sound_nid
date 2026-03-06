"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Услуги", href: "#services" },
    { label: "Оборудование", href: "#equipment" },
    { label: "О нас", href: "#about" },
    { label: "Контакты", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${scrolled
                    ? "bg-surface/80 backdrop-blur-xl border-b border-border/50 shadow-2xl"
                    : "bg-transparent"
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="font-bebas text-3xl tracking-wider text-white hover:text-accent transition-colors">
                    SOUND <span className="text-accent">NID</span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-silver hover:text-white transition-colors duration-300 text-sm uppercase tracking-widest font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
                    >
                        Связаться
                    </a>
                </div>

                {/* Mobile burger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Меню"
                >
                    <motion.span
                        className="w-6 h-0.5 bg-white block"
                        animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-white block"
                        animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-white block"
                        animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-border"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-silver hover:text-white transition-colors text-lg uppercase tracking-widest"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMobileOpen(false)}
                                className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg text-center font-semibold uppercase tracking-wider mt-2"
                            >
                                Связаться
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
