"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Solution } from "@/data/solutions";
import { useSiteData } from "./SiteDataContext";
import SectionTitle from "./SectionTitle";
import Modal from "./Modal";

export default function LightSolutions() {
  const { data } = useSiteData();
  const solutions = data.lightSolutions;
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
    null
  );
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (isInView) {
      setTimestamp(`?t=${Date.now()}`);
    }
  }, [isInView]);

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

  if (!solutions || solutions.length === 0) return null;

  return (
    <section className="py-24 md:py-32 px-6 bg-surface/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle text="СВЕТОВЫЕ КОМПЛЕКТЫ" className="mb-16" />

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
              {solutions.map((solution, i) => (
                <div
                  key={solution.id}
                  className="embla__slide w-[280px] md:w-[340px] flex-shrink-0"
                >
                  <div className="bg-surface border border-border rounded-2xl overflow-hidden group hover:border-accent/50 transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-black/10">
                      {solution.image.endsWith(".mp4") ? (
                        <video
                          src={solution.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <img
                          src={
                            solution.image.endsWith(".gif") && timestamp
                              ? `${solution.image}${timestamp}`
                              : solution.image
                          }
                          alt={solution.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/30 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bebas text-2xl text-text tracking-wider mb-2">
                        {solution.name}
                      </h3>
                      <p className="text-silver text-sm mb-6 flex-1">
                        {solution.description}
                      </p>
                      <button
                        onClick={() => setSelectedSolution(solution)}
                        className="w-full bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-white px-4 py-2.5 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {solutions.length > 1 && (
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
        isOpen={!!selectedSolution}
        onClose={() => setSelectedSolution(null)}
      >
        {selectedSolution && (
          <div>
            <h3 className="font-bebas text-4xl text-text tracking-wider mb-4">
              {selectedSolution.name}
            </h3>
            <p className="text-silver mb-6">{selectedSolution.description}</p>
            <h4 className="font-bebas text-xl text-text tracking-wider mb-3">
              Состав комплекта
            </h4>
            <ul className="space-y-2 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {(selectedSolution.items || []).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-silver">
                  <span className="text-accent mt-1 text-xs">●</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-silver text-sm">Стоимость:</span>
                <span className="font-bebas text-3xl text-accent tracking-wider">
                  {selectedSolution.price}
                </span>
              </div>
            </div>
            <a
              href="#contact"
              onClick={() => setSelectedSolution(null)}
              className="mt-6 block w-full bg-accent hover:bg-accent-hover text-white text-center py-3 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Заказать
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
}
