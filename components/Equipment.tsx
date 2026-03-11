"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "./SiteDataContext";
import SectionTitle from "./SectionTitle";
import SectionReveal from "./SectionReveal";

export default function Equipment() {
    const { data } = useSiteData();
    const equipmentTabs = data.equipmentTabs;
    const [activeTab, setActiveTab] = useState("sound");
    const currentTab = equipmentTabs.find((t) => t.id === activeTab) || equipmentTabs[0];

    useEffect(() => {
        const handleCustomEvent = (e: Event) => {
            const tabId = (e as CustomEvent).detail;
            if (equipmentTabs.find(t => t.id === tabId)) {
                setActiveTab(tabId);
            }
        };
        window.addEventListener('changeEquipmentTab', handleCustomEvent);
        return () => window.removeEventListener('changeEquipmentTab', handleCustomEvent);
    }, [equipmentTabs]);

    return (
        <section id="equipment" className="py-24 md:py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <SectionTitle text="НАШЕ ОБОРУДОВАНИЕ" className="mb-16" />

                <SectionReveal>
                    {/* Tabs */}
                    <div className="flex justify-center gap-2 mb-12">
                        {equipmentTabs.map((tab) => (
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
                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                                    {currentTab?.categories.map((category, i) => (
                                        <motion.div
                                            key={category.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: i * 0.05,
                                                duration: 0.5,
                                                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                                            }}
                                        >
                                            <h3 className="font-bebas text-2xl md:text-3xl text-accent tracking-wider mb-4">
                                                {category.title}
                                            </h3>
                                            <ul className="space-y-2">
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
                                            </ul>
                                        </motion.div>
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
