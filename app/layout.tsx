import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sound NID — Аренда звукового и светового оборудования",
  description:
    "Аренда профессионального звукового и светового оборудования в Москве. Звук, свет, LED-экраны, спецэффекты для мероприятий любого масштаба.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${manrope.variable} font-manrope antialiased bg-bg text-text`}
      >
        {children}
      </body>
    </html>
  );
}
