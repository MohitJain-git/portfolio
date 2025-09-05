import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Games from "@/components/sections/Games";
import Contact from "@/components/sections/Contact";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Games />
      <Contact />
    </div>
  );
};

export default Portfolio;