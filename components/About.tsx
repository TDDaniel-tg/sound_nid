"use client";

import { useSiteData } from "./SiteDataContext";
import SectionReveal from "./SectionReveal";

export default function About() {
    const { data } = useSiteData();

    return (
        <section id="about" className="py-24 md:py-32 px-6 relative overflow-hidden">
            {/* Giant watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="font-bebas text-[25vw] text-white/[0.03] whitespace-nowrap">
                    2018
                </span>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <SectionReveal>
                    <h2 className="font-bebas text-5xl md:text-7xl text-center tracking-wider text-text mb-12">
                        О КОМПАНИИ
                    </h2>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                    <p className="text-silver text-lg md:text-xl leading-relaxed mb-8">
                        {data.texts.aboutText1}
                    </p>
                </SectionReveal>

                <SectionReveal delay={0.4}>
                    <p className="text-silver text-lg md:text-xl leading-relaxed">
                        {data.texts.aboutText2}
                    </p>
                </SectionReveal>
            </div>
        </section>
    );
}
