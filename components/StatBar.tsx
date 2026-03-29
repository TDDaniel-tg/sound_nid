"use client";

const stats = "ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ МЕРОПРИЯТИЙ. МОСКВА И МО.";

export default function StatBar() {
    const segment = (
        <>
            <img
                src="/telegram_assets/logo.jpg"
                alt=""
                className="inline-block h-6 md:h-7 w-auto rounded-full opacity-80 mx-3 align-middle"
            />
            <span>{stats}</span>
            <img
                src="/telegram_assets/logo.jpg"
                alt=""
                className="inline-block h-6 md:h-7 w-auto rounded-full opacity-80 mx-3 align-middle"
            />
            <span className="mx-4">·</span>
        </>
    );

    return (
        <section className="py-6 bg-accent/10 border-y border-accent/20 overflow-hidden">
            <div className="marquee-left whitespace-nowrap font-bebas text-xl md:text-2xl text-accent tracking-[0.15em]">
                <span>{segment}{segment}{segment}{segment}</span>
                <span>{segment}{segment}{segment}{segment}</span>
            </div>
        </section>
    );
}
