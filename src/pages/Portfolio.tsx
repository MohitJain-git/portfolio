import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Games from "@/components/sections/Games";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Games />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
