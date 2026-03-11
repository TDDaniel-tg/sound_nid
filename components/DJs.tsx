"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DJ } from "@/data/djs";
import { useSiteData } from "./SiteDataContext";
import SectionTitle from "./SectionTitle";
import Modal from "./Modal";

export default function DJs() {
  const { data } = useSiteData();
  const djs = data.djs;
  const [selectedDj, setSelectedDj] = useState<DJ | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  if (!djs || djs.length === 0) return null;

  return (
    <section id="djs" className="py-24 md:py-32 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle text="НАШИ ДИДЖЕИ" className="mb-16" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-6">
              {djs.map((dj) => (
                <div
                  key={dj.id}
                  className="embla__slide w-[280px] md:w-[320px] flex-shrink-0"
                >
                  <div className="bg-surface border border-border rounded-2xl overflow-hidden group hover:border-accent/50 transition-all duration-300 h-full flex flex-col relative">
                    <div className="relative h-64 overflow-hidden bg-bg">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${dj.image})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                    </div>
                    
                    {/* Tags floating over image */}
                    <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                      {dj.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="p-6 flex flex-col flex-1 relative z-10 -mt-6">
                      <h3 className="font-bebas text-2xl text-text tracking-wider mb-2 drop-shadow-md">
                        {dj.name}
                      </h3>
                      <p className="text-silver text-sm mb-6 flex-1 line-clamp-3">
                        {dj.description}
                      </p>
                      <button
                        onClick={() => setSelectedDj(dj)}
                        className="w-full bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-white px-4 py-2.5 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
                      >
                        Анкета диджея
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {djs.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-silver hover:text-white hover:border-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xl"
                aria-label="Назад"
              >
                ‹
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-silver hover:text-white hover:border-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xl"
                aria-label="Вперёд"
              >
                ›
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <Modal
        isOpen={!!selectedDj}
        onClose={() => setSelectedDj(null)}
      >
        {selectedDj && (
          <div>
            <div className="flex items-center gap-6 mb-6">
              <div 
                className="w-24 h-24 rounded-full bg-cover bg-center flex-shrink-0 border-2 border-accent"
                style={{ backgroundImage: `url(${selectedDj.image})` }}
              />
              <div>
                <h3 className="font-bebas text-4xl text-text tracking-wider mb-2 leading-none">
                  {selectedDj.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDj.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-bold uppercase tracking-wider bg-accent/20 text-accent px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bebas text-xl text-text tracking-wider mb-2">
                  Опыт и резиденство
                </h4>
                <p className="text-silver text-sm leading-relaxed">
                  {selectedDj.experience}
                </p>
              </div>

              <div>
                <h4 className="font-bebas text-xl text-text tracking-wider mb-2">
                  О диджее
                </h4>
                <p className="text-silver text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedDj.description}
                </p>
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => setSelectedDj(null)}
              className="mt-8 block w-full bg-accent hover:bg-accent-hover text-white text-center py-3 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Забронировать дату
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
}
