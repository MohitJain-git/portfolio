import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-gradient-hero px-4 pt-16 text-white"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center py-20 text-center">
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-accent shadow-glow-accent" />
            Open to software engineering opportunities
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-primary md:text-base">
            Mohit Jain
          </p>
          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            AI/ML Engineer &amp;{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Full-Stack Developer
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-foreground/70 md:text-xl">
            M.S. in Computer Science with 2+ years of experience building Python-based AI systems,
            production computer-vision models, and full-stack applications on AWS.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full bg-gradient-primary hover:shadow-glow-primary sm:w-auto" asChild>
              <a href="#projects">
                View Featured Projects
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-primary/60 bg-background/20 text-primary hover:bg-primary hover:text-primary-foreground sm:w-auto"
              asChild
            >
              <a href="/Mohit-Jain-Resume.pdf" download="Mohit-Jain-Resume.pdf">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="https://linkedin.com/in/mohitjain-27"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mohit Jain on LinkedIn"
              className="rounded-lg p-3 text-muted-foreground transition-smooth hover:bg-primary/10 hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/MohitJain-git"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mohit Jain on GitHub"
              className="rounded-lg p-3 text-muted-foreground transition-smooth hover:bg-primary/10 hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:mohit270900@gmail.com"
              aria-label="Email Mohit Jain"
              className="rounded-lg p-3 text-muted-foreground transition-smooth hover:bg-primary/10 hover:text-primary"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
