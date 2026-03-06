"use client";

const stats = "7 ЛЕТ НА РЫНКЕ   ·   500+ МЕРОПРИЯТИЙ   ·   МОСКВА   ·   24/7";

export default function StatBar() {
    const doubled = `${stats}   ·   ${stats}   ·   `;

    return (
        <section className="py-6 bg-accent/10 border-y border-accent/20 overflow-hidden">
            <div className="marquee-left whitespace-nowrap font-bebas text-xl md:text-2xl text-accent tracking-[0.15em]">
                <span>{doubled}</span>
                <span>{doubled}</span>
            </div>
        </section>
    );
}
