"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "./SiteDataContext";
import SectionReveal from "./SectionReveal";

function CategoryDropdown({ category, index, forceOpen }: { category: { title: string; items: string[] }; index: number; forceOpen?: boolean }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (forceOpen) setOpen(true);
    }, [forceOpen]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="border-b border-border/40"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-4 group"
            >
                <h3 className="font-bebas text-2xl md:text-3xl text-accent tracking-wider text-left">
                    {category.title}
                </h3>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent text-xl"
                >
                    ▾
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden space-y-2 pb-4"
                    >
                        {category.items.map((item, j) => (
                            <li
                                key={j}
                                className="text-silver text-sm md:text-base flex items-start gap-3"
                            >
                                <span className="text-accent/60 mt-1.5 text-[8px]">
                                    ◆
                                </span>
                                {item}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function Equipment() {
    const { data } = useSiteData();
    const equipmentTabs = data.equipmentTabs;
    const [activeTab, setActiveTab] = useState("sound");
    const [expandAll, setExpandAll] = useState(false);
    const currentTab = equipmentTabs.find((t) => t.id === activeTab) || equipmentTabs[0];

    useEffect(() => {
        const handleCustomEvent = (e: Event) => {
            const tabId = (e as CustomEvent).detail;
            if (equipmentTabs.find(t => t.id === tabId)) {
                setActiveTab(tabId);
                setExpandAll(true);
                // Reset after animation
                setTimeout(() => setExpandAll(false), 500);
            }
        };
        window.addEventListener('changeEquipmentTab', handleCustomEvent);
        return () => window.removeEventListener('changeEquipmentTab', handleCustomEvent);
    }, [equipmentTabs]);

    return (
        <section id="equipment" className="py-24 md:py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center mb-16">
                    <img
                        src="/telegram_assets/logo.jpg"
                        alt="Sound NID"
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full opacity-40"
                    />
                </div>

                <SectionReveal>
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {equipmentTabs.filter(t => !t.placeholder).map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`font-bebas text-xl md:text-2xl px-8 py-3 rounded-lg tracking-wider transition-all duration-300 ${activeTab === tab.id
                                        ? "bg-accent text-white shadow-lg shadow-accent/30"
                                        : "bg-surface text-silver hover:text-white border border-border hover:border-accent/50"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                const section = document.getElementById('light-solutions');
                                if (section) {
                                    const y = section.getBoundingClientRect().top + window.scrollY - 20;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                            }}
                            className="font-bebas text-xl md:text-2xl px-8 py-3 rounded-lg tracking-wider transition-all duration-300 bg-surface text-silver hover:text-white border border-border hover:border-accent/50"
                        >
                            СВЕТ
                        </button>
                        <button
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('openCoverBands'));
                                const servicesSection = document.getElementById('services');
                                if (servicesSection) {
                                    const y = servicesSection.getBoundingClientRect().top + window.scrollY - 100;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                            }}
                            className="font-bebas text-xl md:text-2xl px-8 py-3 rounded-lg tracking-wider transition-all duration-300 bg-surface text-silver hover:text-white border border-border hover:border-accent/50"
                        >
                            Кавер группы
                        </button>
                    </div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        >
                            {currentTab?.placeholder ? (
                                <div className="text-center py-20 border border-border rounded-2xl bg-surface/30">
                                    <div className="font-bebas text-4xl text-silver/50 tracking-wider mb-4">
                                        Раздел в разработке
                                    </div>
                                    <p className="text-silver/40">
                                        Скоро здесь появится список оборудования
                                    </p>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-x-12">
                                    {currentTab?.categories.map((category, i) => (
                                        <CategoryDropdown
                                            key={`${activeTab}-${category.title}`}
                                            category={category}
                                            index={i}
                                            forceOpen={expandAll}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </SectionReveal>
            </div>
        </section>
    );
}
