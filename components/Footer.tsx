"use client";

import { useSiteData } from "./SiteDataContext";
import SectionReveal from "./SectionReveal";

export default function Footer() {
    const { data } = useSiteData();

    return (
        <footer className="bg-surface/50 border-t border-border py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <SectionReveal>
                    <div className="text-center mb-10">
                        <a
                            href="#"
                            className="font-bebas text-5xl md:text-6xl tracking-wider text-white inline-block mb-6"
                        >
                            SOUND <span className="text-accent">NID</span>
                        </a>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10 text-silver">
                        <a
                            href={`tel:${data.contacts.phone.replace(/[^+\d]/g, "")}`}
                            className="hover:text-white transition-colors flex items-center gap-2"
                        >
                            <svg
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            {data.contacts.phone}
                        </a>
                        <a
                            href={`https://t.me/${data.contacts.telegram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors flex items-center gap-2"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.414 6.87c-.108.486-.396.603-.798.375l-2.205-1.617-1.065 1.02c-.12.12-.216.216-.444.216l.159-2.247 4.089-3.69c.18-.159-.039-.249-.276-.09L9.504 12.84l-2.172-.676c-.474-.15-.486-.474.096-.702l8.49-3.27c.396-.15.744.09.612.702l.038-.054z" />
                            </svg>
                            Telegram
                        </a>
                    </div>

                    <div className="max-w-2xl mx-auto text-center mb-10">
                        <p className="text-silver/70 text-sm leading-relaxed italic">
                            &ldquo;{data.texts.footerQuote}&rdquo;
                        </p>
                    </div>

                    <div className="border-t border-border pt-6 text-center">
                        <p className="text-silver/40 text-sm">
                            © 2026 Sound NID. Все права защищены.
                        </p>
                    </div>
                </SectionReveal>
            </div>
        </footer>
    );
}
