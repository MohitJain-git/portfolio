import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Command, Download, Gamepad2, Menu, X } from "lucide-react";
import { CommandPalette } from "@/components/ui/command-palette";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { name: "Overview", href: "#hero", id: "hero" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Bulls & Cows", href: "#games", id: "games", badge: "Play" },
    { name: "Road Trip", href: "#scenery", id: "scenery" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);

      const sections = navItems.map((i) => i.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-primary shadow-glow-primary transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Primary Navigation"
            className="flex items-center justify-between rounded-full border border-[#FFE8CD]/12 bg-[#14100D]/85 px-4 py-2.5 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {/* Brand Monogram */}
            <a
              href="#hero"
              className="group flex items-center gap-3 focus:outline-none"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-xs font-bold tracking-tighter text-primary transition-transform duration-300 group-hover:scale-105">
                MJ
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#14100D] bg-accent" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-tight text-white">
                  Mohit Jain
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  AI/ML · CV · Full-Stack
                </span>
              </div>
            </a>

            {/* Desktop Pill Links */}
            <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {item.badge && (
                      <Gamepad2 className="h-3.5 w-3.5 text-accent" />
                    )}
                    {item.name}
                    {item.badge && (
                      <span className="rounded-full bg-accent/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-accent">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Actions: Command Palette + Resume */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-white"
                aria-label="Open Command Palette"
              >
                <Command className="h-3.5 w-3.5 text-primary" />
                <span className="hidden xl:inline">Command</span>
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/80">
                  ⌘K
                </kbd>
              </button>

              <Button
                size="sm"
                className="rounded-full bg-gradient-primary px-4 font-display text-xs font-semibold text-primary-foreground hover:shadow-glow-primary"
                asChild
              >
                <a href="/Mohit-Jain-Resume.pdf" download="Mohit-Jain-Resume.pdf">
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground hover:text-white"
                aria-label="Open Command Palette"
              >
                <Command className="h-4 w-4 text-primary" />
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 rounded-full p-0"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>

          {/* Mobile Drawer */}
          {isOpen && (
            <div className="mt-2 rounded-2xl border border-[#FFE8CD]/12 bg-[#14100D]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-white/5 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-accent">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
                <a
                  href="/Mohit-Jain-Resume.pdf"
                  download="Mohit-Jain-Resume.pdf"
                  className="mt-3 flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-2.5 font-display text-sm font-semibold text-primary-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
};

export default Navigation;
