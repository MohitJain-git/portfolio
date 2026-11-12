import { useState } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Cpu,
  ExternalLink,
  FolderGit2,
  Github,
  Layers,
  Network,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface ProjectItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: "AI & ML" | "Full-Stack";
  description: string;
  architectureNote: string;
  metrics: string[];
  technologies: string[];
  date: string;
  type: string;
  links: {
    demo?: string;
    github?: string;
  };
}

const PROJECTS: ProjectItem[] = [
  {
    id: "card-club",
    index: "01",
    title: "Card Club — Multiplayer Card Platform",
    tagline: "Polymorphic State Machine & Real-Time Multiplayer Engine",
    category: "Full-Stack",
    description:
      "Built a real-time, low-latency multiplayer web platform for 10 classic Indian and international card games—powered by a unified TypeScript state-machine engine, per-player fog-of-war state sanitization, context-aware AI bots, and a tactile parlor UI.",
    architectureNote:
      "React 19 Parlor UI ↔ Socket.IO Fog-of-War Sanitizer ↔ Polymorphic State Machine",
    metrics: [
      "10 Games · 1 Engine",
      "Fog-of-War Anti-Cheat",
      "AI Bots & 60s Reconnect",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express 5",
      "Socket.IO",
      "Tailwind CSS v4",
    ],
    date: "Nov 2026",
    type: "Realtime Multiplayer",
    links: {
      demo: "https://card-game-rho-weld.vercel.app/",
      github: "https://github.com/MohitJain-git/CardGame",
    },
  },
  {
    id: "wordle-royale",
    index: "02",
    title: "Wordle Royale",
    tagline: "Real-Time Multiplayer Battle Royale Game",
    category: "Full-Stack",
    description:
      "Built a live 99-player word Battle Royale using Vue.js, Node.js, and Socket.io with bi-directional state synchronization, circular target routing, and real-time lobby matchmaking.",
    architectureNote: "Vue.js Client ↔ Socket.io WebSocket Rooms ↔ Circular Target Engine",
    metrics: ["<15ms State Sync", "Live Matchmaking", "Deployed on Vercel"],
    technologies: ["Vue.js", "Node.js", "Socket.io", "WebSockets", "Game State Engine"],
    date: "Jan 2026",
    type: "Realtime Multiplayer",
    links: {
      demo: "https://wordle-royale-mu.vercel.app/",
      github: "https://github.com/MohitJain-git/wordle-royale",
    },
  },
  {
    id: "shoe-la-la",
    index: "03",
    title: "Nike Bot (Shoe La La) — Agentic AI",
    tagline: "LangChain, vLLM & Ollama Retail Reasoning",
    category: "AI & ML",
    description:
      "Built an agentic sneaker shopping assistant with LangChain, vLLM, and Ollama for multi-step natural language reasoning, backed by an automated SQL ETL pipeline for live inventory and price-drop alerts.",
    architectureNote: "User Query → LangChain + vLLM/Ollama → SQL Inventory & Price ETL",
    metrics: ["vLLM & Ollama", "Multi-Step Agent", "Live Price-Drop ETL"],
    technologies: ["LangChain", "vLLM", "Ollama", "Python", "SQL", "ETL Pipelines"],
    date: "Nov 2025",
    type: "Agentic AI",
    links: {
      github: "https://github.com/dnanava1/shoe-la-la",
    },
  },
  {
    id: "poker-bot",
    index: "04",
    title: "Ultimate Texas Hold'em CFR Bot",
    tagline: "Probabilistic Game Theory & Monte Carlo Engine",
    category: "AI & ML",
    description:
      "Engineered a probabilistic poker decision agent in Pyro using 1,000,000+ Monte Carlo rollouts and Counterfactual Regret Minimization (CFR), outperforming human baseline strategies by 2.6×.",
    architectureNote: "Hand State → 1M+ Pyro Monte Carlo Rollouts → CFR Regret Minimization",
    metrics: ["2.6× Baseline EV", "1M+ Rollouts", "Nash Approximation"],
    technologies: ["Pyro", "Monte Carlo", "CFR", "Game Theory", "Python"],
    date: "Dec 2024",
    type: "ML & Game Theory",
    links: {
      github: "https://github.com/MohitJain-git/UltimateTexasHoldem",
    },
  },
  {
    id: "docfix",
    index: "05",
    title: "DocFix — Intelligent Document Suite",
    tagline: "NLP Summarization, Sentiment & Extraction Platform",
    category: "AI & ML",
    description:
      "Developed a full-stack document processing platform pairing a Django web application with asynchronous FastAPI NLP microservices for summarization, sentiment analysis, keyword extraction, and grammar correction.",
    architectureNote: "Django Web App ↔ FastAPI Async Workers ↔ 5 NLP Inference Pipelines",
    metrics: ["5 NLP Pipelines", "FastAPI Async Workers", "Document Scraping"],
    technologies: ["Django", "FastAPI", "Python", "NLP", "Microservices"],
    date: "May 2022",
    type: "NLP Platform",
    links: {
      github: "https://github.com/MohitJain-git/DocFix",
    },
  },
];

const Projects = () => {
  const [filter, setFilter] = useState<"ALL" | "AI & ML" | "Full-Stack">("ALL");

  const handleFilterChange = (next: "ALL" | "AI & ML" | "Full-Stack") => {
    const docWithVT = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (typeof docWithVT.startViewTransition === "function") {
      docWithVT.startViewTransition(() => {
        setFilter(next);
      });
    } else {
      setFilter(next);
    }
  };

  const visibleProjects =
    filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 border-t border-border">
      <div className="container mx-auto">
        {/* Section Header + Category Filter */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>03 // Selected Engineering Works</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Featured{" "}
              <span className="font-serif italic font-normal text-primary">
                studio projects
              </span>
              .
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-secondary/40 p-1.5 md:self-auto">
            {(["ALL", "AI & ML", "Full-Stack"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleFilterChange(tab)}
                className={`rounded-full px-4 py-1.5 font-mono text-xs transition-all ${
                  filter === tab
                    ? "bg-primary text-primary-foreground font-semibold shadow-glow-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-vt flex"
              style={
                {
                  viewTransitionName: `project-${project.id}`,
                } as React.CSSProperties
              }
            >
              <SpotlightCard className="group flex w-full flex-col justify-between p-6 sm:p-8">
                <div>
                  {/* Top Index & Category Row */}
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-xs font-bold text-primary">
                        {project.index}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-border bg-secondary/50 font-mono text-[10px] text-foreground/85"
                      >
                        {project.type}
                      </Badge>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.date}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-accent">
                    {project.tagline}
                  </p>

                  {/* Compact Architecture Flow Strip */}
                  <div className="my-4 flex flex-wrap items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3.5 py-2.5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                      <Network className="h-3 w-3" />
                      Flow
                    </span>
                    <span className="text-foreground/25">·</span>
                    <span className="font-mono text-xs text-foreground/85">
                      {project.architectureNote}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="max-w-[65ch] text-sm leading-relaxed text-foreground/85 sm:text-base">
                    {project.description}
                  </p>

                  {/* Key Outcome Pills */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m}
                        className="rounded-lg border border-primary/20 bg-primary/[0.06] px-2.5 py-2 text-center font-mono text-[11px] font-medium text-primary"
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Tech Badges + Links */}
                <div className="mt-6 border-t border-border pt-5">
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-secondary/45 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.links.demo && (
                      <Button
                        size="sm"
                        className="rounded-full bg-gradient-primary px-4 font-display text-xs font-semibold text-primary-foreground hover:shadow-glow-primary"
                        asChild
                      >
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Launch Live Demo
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-border bg-secondary/40 px-4 font-mono text-xs text-foreground hover:border-primary/50 hover:bg-secondary"
                        asChild
                      >
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-1.5 h-3.5 w-3.5" />
                          Source Code
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
