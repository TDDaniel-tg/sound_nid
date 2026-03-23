"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useSiteData } from "./SiteDataContext";
import SectionTitle from "./SectionTitle";

export default function Categories() {
    const { data } = useSiteData();
    const categories = data.categories;
    const [activeId, setActiveId] = useState<string | null>(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    useEffect(() => {
        const handleOpenCoverBands = () => {
            setActiveId('cover_bands');
        };
        window.addEventListener('openCoverBands', handleOpenCoverBands);
        return () => window.removeEventListener('openCoverBands', handleOpenCoverBands);
    }, []);

    const handleClick = (id: string) => {
        const map: Record<string, string | null> = {
            sound: 'equipment-sound',
            light: 'light-solutions',
            led: 'equipment-led',
            plasma: 'equipment-led',
            backline: 'equipment-sound',
            dj: 'djs',
            cover_bands: null,
        };

        const target = map[id];
        
        if (target) {
             if (target.startsWith('equipment-')) {
                 const tabId = target.replace('equipment-', '');
                 // Switch tab using custom event
                 window.dispatchEvent(new CustomEvent('changeEquipmentTab', { detail: tabId }));
                 const eqSection = document.getElementById('equipment');
                 if (eqSection) {
                     const y = eqSection.getBoundingClientRect().top + window.scrollY - 100;
                     window.scrollTo({ top: y, behavior: 'smooth' });
                 }
             } else {
                 const section = document.getElementById(target);
                 if (section) {
                     const y = section.getBoundingClientRect().top + window.scrollY - 100;
                     window.scrollTo({ top: y, behavior: 'smooth' });
                 }
             }
             setActiveId(null);
        } else {
             // For cover_bands — open accordion and scroll to it
             setActiveId(activeId === id ? null : id);
             if (activeId !== id) {
                 setTimeout(() => {
                     const accordion = document.getElementById('category-accordion');
                     if (accordion) {
                         const y = accordion.getBoundingClientRect().top + window.scrollY - 100;
                         window.scrollTo({ top: y, behavior: 'smooth' });
                     }
                 }, 100);
             }
        }
    };

    const activeCategory = categories.find((c) => c.id === activeId);

    return (
        <section id="services" className="py-24 md:py-32 px-6" ref={sectionRef}>
            <div className="max-w-7xl mx-auto">
                <SectionTitle text="У НАС ЕСТЬ" className="mb-16" />

                {/* Category grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((category, i) => (
                        <motion.button
                            key={category.id}
                            onClick={() => handleClick(category.id)}
                            className={`relative group rounded-xl overflow-hidden aspect-[4/3] cursor-pointer border-2 transition-all duration-300 ${activeId === category.id
                                    ? "border-accent shadow-lg shadow-accent/20"
                                    : "border-transparent hover:border-accent/50"
                                }`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={
                                isInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 50 }
                            }
                            transition={{
                                delay: i * 0.07,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                            }}
                        >
                            {/* Background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />

                            {/* Overlay */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-300 ${activeId === category.id
                                        ? "opacity-60"
                                        : "group-hover:opacity-60 opacity-80"
                                    }`}
                            />

                            {/* Active glow */}
                            {activeId === category.id && (
                                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(132,16,16,0.3)]" />
                            )}

                            {/* Name */}
                            <div className="absolute inset-0 flex items-end p-4">
                                <span className="font-bebas text-xl md:text-2xl text-white tracking-wider leading-tight">
                                    {category.name}
                                </span>
                            </div>

                            {/* Bottom accent underline on hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.button>
                    ))}
                </div>

                {/* Accordion content */}
                <AnimatePresence>
                    {activeCategory && (
                        <motion.div
                            key={activeCategory.id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                                opacity: { duration: 0.4, delay: 0.1 },
                            }}
                            className="overflow-hidden mt-8"
                            id="category-accordion"
                        >
                            <div className="border border-border rounded-2xl bg-surface/50 p-6 md:p-8">
                                <h3 className="font-bebas text-3xl text-text mb-6 tracking-wider">
                                    {activeCategory.name}
                                </h3>
                                <CategorySlider items={activeCategory.items} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

function CategorySlider({
    items,
}: {
    items: { id: string; name: string; description: string; image: string }[];
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
    });
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    if (items.length === 0) {
        return (
            <p className="text-silver/50 text-center py-8">
                Нет позиций в этой категории
            </p>
        );
    }

    return (
        <div className="relative">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="embla__slide w-[260px] md:w-[300px] flex-shrink-0"
                        >
                            <div className="bg-bg border border-border rounded-xl overflow-hidden group hover:border-accent/50 transition-all duration-300">
                                <div className="relative h-44 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bebas text-xl text-text tracking-wider mb-1">
                                        {item.name}
                                    </h4>
                                    <p className="text-silver text-sm">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nav buttons */}
            {canPrev && (
                <button
                    onClick={() => emblaApi?.scrollPrev()}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center text-silver hover:text-white hover:border-accent transition-all z-10"
                    aria-label="Назад"
                >
                    ‹
                </button>
            )}
            {canNext && (
                <button
                    onClick={() => emblaApi?.scrollNext()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center text-silver hover:text-white hover:border-accent transition-all z-10"
                    aria-label="Вперёд"
                >
                    ›
                </button>
            )}
        </div>
    );
}
