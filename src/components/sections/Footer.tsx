import { Github, Linkedin, Mail, Command } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-[#FFE8CD]/10 bg-[#100D0A] py-12">
    <div className="container mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-xs font-bold text-primary">
          MJ
        </div>
        <div>
          <p className="font-display text-sm font-bold text-white">Mohit Jain</p>
          <p className="font-mono text-xs text-muted-foreground">
            AI/ML Engineer · Computer Vision · Full-Stack Architect
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Command className="h-3.5 w-3.5 text-primary" />
        <span>Press ⌘K anytime to navigate</span>
        <span className="text-white/20">·</span>
        <span>© {new Date().getFullYear()} Mohit Jain</span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://linkedin.com/in/mohitjain-27"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="rounded-full border border-white/10 bg-white/[0.03] p-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href="https://github.com/MohitJain-git"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="rounded-full border border-white/10 bg-white/[0.03] p-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="mailto:mohit270900@gmail.com"
          aria-label="Email"
          className="rounded-full border border-white/10 bg-white/[0.03] p-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Mail className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
