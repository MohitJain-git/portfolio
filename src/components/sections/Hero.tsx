import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CelestialWatchBar } from "@/components/ui/celestial-watch";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Sparkles,
  Gamepad2,
  MapPin,
  Command,
  Compass,
  Sun,
} from "lucide-react";

type RoleLens = "all" | "ai" | "systems" | "games";

const ROLE_LENSES: Record<
  RoleLens,
  {
    badge: string;
    headlinePrefix: string;
    headlineSerif: string;
    headlineSuffix: string;
    subtext: string;
    metrics: { value: string; label: string; detail: string; tone: string }[];
  }
> = {
  all: {
    badge: "AI/ML & Full-Stack Engineer · MS CS @ ASU (4.0/4.0 GPA)",
    headlinePrefix: "Crafting",
    headlineSerif: "production AI",
    headlineSuffix: "& full-stack systems.",
    subtext:
      "I’m Mohit Jain — an M.S. in Computer Science (4.0/4.0 GPA) engineer at Arizona State University with 2+ years of experience building computer-vision pipelines, agentic LLM workflows, and high-scale full-stack applications on AWS.",
    metrics: [
      { value: "42M+", label: "Users Analyzed", detail: "Jio Platforms facial recognition", tone: "text-primary" },
      { value: "75% → 96%", label: "Verification Accuracy", detail: "128D → 512D InsightFace & OpenCV", tone: "text-amber-500" },
      { value: "5× Faster", label: "Image Retrieval", detail: "Elasticsearch & cosine similarity", tone: "text-accent" },
      { value: "4.0 / 4.0", label: "M.S. CS GPA @ ASU", detail: "Graduate TA for CSE 471 (Intro to AI)", tone: "text-violet-400" },
    ],
  },
  ai: {
    badge: "Computer Vision · Deep Learning · Agentic LLMs (vLLM & LangChain)",
    headlinePrefix: "Engineering",
    headlineSerif: "computer vision",
    headlineSuffix: "& agentic AI pipelines.",
    subtext:
      "From building Vera Beauty’s in-house facial structural ratio model for mobile onboarding to upgrading Jio’s biometric embeddings (128D → 512D) with InsightFace, Detectron2 on AWS SageMaker, and PyTorch FER.",
    metrics: [
      { value: "128D → 512D", label: "Facial Embeddings", detail: "InsightFace & OpenCV pipeline", tone: "text-primary" },
      { value: "75% → 96%", label: "Biometric Precision", detail: "Prevented SIM fraud at scale", tone: "text-amber-500" },
      { value: "95%+", label: "Auto-Tagging Accuracy", detail: "Detectron2 & PyTorch FER on AWS", tone: "text-accent" },
      { value: "vLLM + RAG", label: "Agentic Workflows", detail: "LangChain & Ollama reasoning", tone: "text-violet-400" },
    ],
  },
  systems: {
    badge: "Full-Stack Architecture · AWS Cloud · Docker & Elasticsearch",
    headlinePrefix: "Scaling",
    headlineSerif: "resilient web platforms",
    headlineSuffix: "for millions of users.",
    subtext:
      "Experienced across React, Vue.js, Node.js, FastAPI, and Django — architecting Vera Beauty’s nationwide med-spa booking platform and optimizing Jio’s Digital Asset Management retrieval by 5× on AWS.",
    metrics: [
      { value: "5× Speedup", label: "Asset Retrieval", detail: "Elasticsearch cosine similarity", tone: "text-primary" },
      { value: "42M+ Scale", label: "Enterprise Reach", detail: "Jio Platforms production infra", tone: "text-amber-500" },
      { value: "AWS Cloud", label: "SageMaker & Lambda", detail: "Dockerized model deployments", tone: "text-accent" },
      { value: "Full-Stack", label: "React · Vue · FastAPI", detail: "PostgreSQL, Redis & MongoDB", tone: "text-violet-400" },
    ],
  },
  games: {
    badge: "Probabilistic Game Theory · Real-Time Multiplayer · Logic Systems",
    headlinePrefix: "Designing",
    headlineSerif: "game-theoretic agents",
    headlineSuffix: "& multiplayer engines.",
    subtext:
      "Architected Card Club’s 10-game polymorphic card engine with per-player fog-of-war anti-cheat, an Ultimate Texas Hold’em CFR agent over 1M+ Monte Carlo rollouts, Wordle Battle Royale via Socket.io, and the playable Bulls & Cows arcade below.",
    metrics: [
      { value: "10 Games", label: "Card Club Engine", detail: "Polymorphic state machine & AI bots", tone: "text-primary" },
      { value: "2.6× EV", label: "Outperformed Baseline", detail: "Pyro + CFR Poker decision agent", tone: "text-amber-500" },
      { value: "Sub-ms", label: "Bi-Directional Sync", detail: "Socket.IO Fog-of-War & Wordle Royale", tone: "text-accent" },
      { value: "4-Letter", label: "Bulls & Cows Live", detail: "Playable deduction arcade below", tone: "text-violet-400" },
    ],
  },
};

const HERO_FRAMES = [
  {
    src: "/photos/usa/hero-horseshoe-starburst.jpg?v=2",
    title: "Horseshoe Bend Golden Sunburst",
    place: "Colorado River Canyon · Page, Arizona",
    coords: "36.8792° N, 111.5107° W",
    filmStock: "Kodachrome 64 · Warm Canyon Grade",
    accentBadge: "border-[#FF7A59]/40 bg-[#FF7A59]/15 text-[#FF9B82]",
    glowColor: "from-[#FF7A59]/30 via-amber-500/20 to-transparent",
    quote: "300 meters above the Colorado River bend at golden hour.",
  },
  {
    src: "/photos/usa/hero-yellowstone-prismatic.jpg?v=2",
    title: "Grand Prismatic Thermal Basin",
    place: "Midway Geyser Basin · Yellowstone, Wyoming",
    coords: "44.5250° N, 110.8382° W",
    filmStock: "Ektar 100 · Turquoise & Ochre Grade",
    accentBadge: "border-amber-400/40 bg-amber-500/15 text-amber-200",
    glowColor: "from-amber-500/25 via-teal-400/20 to-transparent",
    quote: "Geothermal mineral rings meeting rising morning steam.",
  },
  {
    src: "/photos/usa/hero-yellowstone-astro.jpg?v=2",
    title: "Yellowstone Milky Way Galactic Core",
    place: "Dark Sky Sanctuary · Yellowstone, Wyoming",
    coords: "44.5964° N, 110.5472° W",
    filmStock: "Cinestill 800T · Deep Astro Grade",
    accentBadge: "border-violet-400/40 bg-violet-500/15 text-violet-200",
    glowColor: "from-violet-500/30 via-indigo-500/20 to-transparent",
    quote: "Millions of stars and Milky Way dust lanes over the Yellowstone caldera.",
  },
];

const Hero = () => {
  const [activeLens, setActiveLens] = useState<RoleLens>("all");
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % HERO_FRAMES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const lens = ROLE_LENSES[activeLens];
  const currentFrame = HERO_FRAMES[activePhoto];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-20 md:pt-32 md:pb-28 flex flex-col justify-between overflow-hidden"
    >
      {/* Topographic Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 studio-grid-bg opacity-85" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Interactive Horology Watch & 24-Hour Time-of-Day Scrubber Bar */}
        <CelestialWatchBar />

        {/* Top Editorial Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-9">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card/90 border border-border backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-mono text-xs tracking-wide text-foreground">
              {lens.badge}
            </span>
          </div>

          {/* Interactive Role Lens Switcher */}
          <div
            role="tablist"
            aria-label="Switch portfolio focus lens"
            className="inline-flex items-center p-1 rounded-full bg-card/90 border border-border backdrop-blur-md"
          >
            {(
              [
                { id: "all", label: "Overview" },
                { id: "ai", label: "AI & Vision" },
                { id: "systems", label: "Cloud & Scale" },
                { id: "games", label: "Games & RL" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeLens === tab.id}
                onClick={() => setActiveLens(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeLens === tab.id
                    ? "bg-gradient-primary text-primary-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Asymmetric Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Expressive Editorial Typography + CTAs */}
          <div className="lg:col-span-7 space-y-7">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                MOHIT JAIN · AI/ML & FULL-STACK ENGINEER
              </p>

              <h1 className="font-display text-4xl sm:text-6xl xl:text-[4.35rem] font-bold tracking-tight leading-[1.04] text-foreground">
                {lens.headlinePrefix}{" "}
                <span className="font-serif italic font-normal text-chromatic px-1">
                  {lens.headlineSerif}
                </span>{" "}
                <span className="block mt-1">{lens.headlineSuffix}</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed font-normal">
              {lens.subtext}
            </p>

            {/* Primary Action Cluster */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Button
                size="lg"
                onClick={() => scrollTo("#projects")}
                className="rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 font-semibold px-7 h-12 shadow-glow-primary transition-all duration-300 group border-0"
              >
                Explore Selected Work
                <ArrowUpRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#games")}
                className="rounded-full border-primary/40 bg-primary/10 hover:bg-primary/20 text-foreground font-medium px-6 h-12 backdrop-blur-md transition-all group"
              >
                <Gamepad2 className="mr-2 w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                Play Bulls & Cows
                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono uppercase rounded bg-primary/20 text-primary border border-primary/30">
                  Live
                </span>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                onClick={() => scrollTo("#scenery")}
                className="rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 h-12 px-5 border border-transparent hover:border-border"
              >
                <Compass className="mr-2 w-4 h-4 text-accent" />
                9-Stop West Coast Route
              </Button>
            </div>

            {/* Social & Command Bar (Verified against Resume) */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/MohitJain-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/mohitjain-27"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:mohit270900@gmail.com"
                  aria-label="Send Email"
                  className="p-2.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="h-4 w-px bg-border hidden sm:block" />

              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>California</span>
              </div>

              <button
                onClick={() =>
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", metaKey: true })
                  )
                }
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-card border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <Command className="w-3 h-3 text-primary" />
                <span>Press ⌘K for Quick Jump</span>
              </button>
            </div>
          </div>

          {/* Right Column: Color-Graded Kodachrome Field Frame (100% Distinct from Road Trip) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className={`absolute -inset-3 rounded-[2rem] bg-gradient-to-tr ${currentFrame.glowColor} blur-2xl opacity-80 transition-all duration-700`}
              />

              <div className="bento-card rounded-[1.85rem] p-3.5 sm:p-4 relative overflow-hidden flex flex-col gap-3">
                {/* Top Header (Single Clean Line, No Film Stock Text) */}
                <div className="flex items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                    <span className="ml-1 font-mono text-[11px] text-muted-foreground truncate">
                      {currentFrame.coords}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border border-primary/40 bg-primary/15 text-primary shrink-0">
                    Shot by Mohit
                  </span>
                </div>

                {/* High-Priority Landscape Frame (Unobstructed) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#120F0D] border border-border">
                  <img
                    src={currentFrame.src}
                    alt={`${currentFrame.title} — ${currentFrame.place}`}
                    fetchPriority="high"
                    width={1600}
                    height={900}
                    className="w-full h-full object-cover object-center transition-all duration-700 scale-[1.01] hover:scale-105"
                  />
                </div>

                {/* Clean Caption Strip Below Image (No Overlap) */}
                <div className="px-3.5 py-2.5 rounded-xl bg-secondary/45 border border-border">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    {currentFrame.place}
                  </p>
                  <h2 className="font-display text-sm sm:text-base font-semibold text-foreground mt-0.5">
                    {currentFrame.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {currentFrame.quote}
                  </p>
                </div>

                {/* Interactive Filmstrip Selector below the frame */}
                <div className="grid grid-cols-3 gap-2.5">
                  {HERO_FRAMES.map((frame, i) => (
                    <button
                      key={frame.src}
                      onClick={() => setActivePhoto(i)}
                      className={`group relative overflow-hidden rounded-xl border text-left p-1.5 transition-all ${
                        activePhoto === i
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border bg-secondary/40 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="aspect-[16/9] w-full rounded-lg overflow-hidden mb-1.5">
                        <img
                          src={frame.src}
                          alt={frame.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-mono text-[10px] text-foreground truncate px-0.5">
                        0{i + 1} · {frame.title.split(" ")[0]} {frame.title.split(" ")[1]}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Telemetry Strip */}
        <div className="mt-14 pt-8 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {lens.metrics.map((m, idx) => (
            <div
              key={idx}
              className="group p-4 rounded-2xl bg-card/80 border border-border hover:border-primary/40 transition-all duration-300"
            >
              <div className={`font-display text-2xl sm:text-3xl font-bold tracking-tight ${m.tone} transition-colors`}>
                {m.value}
              </div>
              <div className="text-sm font-medium text-foreground mt-1">
                {m.label}
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-0.5">
                {m.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
