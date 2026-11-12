import { useEffect } from "react";
import { CircadianProvider } from "@/context/CircadianContext";
import {
  FloatingCelestialDock,
  CircadianSkyBackdrop,
} from "@/components/ui/celestial-watch";
import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import BentoShowcase from "@/components/sections/BentoShowcase";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Games from "@/components/sections/Games";
import UsaScenery from "@/components/sections/UsaScenery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Portfolio = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsViewTimeline =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

    if (prefersReduced || supportsViewTimeline) return;

    const cards = document.querySelectorAll<HTMLElement>(".scroll-reveal-card");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translate3d(0, 0, 0) scale(1)";
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.12 }
    );

    cards.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translate3d(0, 24px, 0) scale(0.985)";
      el.style.transition =
        "opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <CircadianProvider>
      <div className="relative min-h-screen bg-background text-foreground studio-noise transition-colors duration-500">
        <CircadianSkyBackdrop />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <BentoShowcase />
          <Experience />
          <Projects />
          <Skills />
          <Games />
          <UsaScenery />
          <Contact />
        </main>
        <FloatingCelestialDock />
        <Footer />
      </div>
    </CircadianProvider>
  );
};

export default Portfolio;
