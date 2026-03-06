"use client";

import { SiteDataProvider } from "@/components/SiteDataContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Solutions from "@/components/Solutions";
import Brands from "@/components/Brands";
import StatBar from "@/components/StatBar";
import Equipment from "@/components/Equipment";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <SiteDataProvider>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Categories />
        <SectionDivider />
        <StatBar />
        <SectionDivider />
        <Solutions />
        <SectionDivider />
        <Brands />
        <SectionDivider />
        <Equipment />
        <SectionDivider />
        <About />
        <SectionDivider />
        <ContactForm />
      </main>
      <Footer />
    </SiteDataProvider>
  );
}
