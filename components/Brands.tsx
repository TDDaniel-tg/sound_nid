"use client";

const brands = [
    "L-Acoustics",
    "NEXO",
    "JBL",
    "Shure",
    "Sennheiser",
    "Yamaha",
    "Pioneer",
    "Behringer",
    "DPA",
    "Neumann",
    "Midas",
    "FBT",
    "Turbosound",
    "HK Audio",
    "AKG",
];

export default function Brands() {
    const topRow = brands.join("   ·   ");
    const bottomRow = [...brands].reverse().join("   ·   ");

    return (
        <section className="py-16 overflow-hidden">
            <div className="relative">
                {/* Top row — left */}
                <div className="marquee-left whitespace-nowrap font-bebas text-3xl md:text-4xl text-silver/20 tracking-[0.2em] mb-4">
                    <span>{topRow}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                    <span>{topRow}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                </div>

                {/* Bottom row — right */}
                <div className="marquee-right whitespace-nowrap font-bebas text-3xl md:text-4xl text-silver/20 tracking-[0.2em]">
                    <span>{bottomRow}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                    <span>{bottomRow}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
        </section>
    );
}
