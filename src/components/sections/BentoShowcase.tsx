import { useState } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  Cpu,
  Gamepad2,
  Layers,
  ArrowUpRight,
  Compass,
  Zap,
  Award,
  Activity,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface SystemHighlight {
  id: string;
  tabLabel: string;
  tag: string;
  title: string;
  org: string;
  badgeClass: string;
  barGradient: string;
  summary: string;
  flowSteps: string[];
  comparison: {
    metricTitle: string;
    baselineLabel: string;
    baselineValue: string;
    baselineWidthPercent: number;
    resultLabel: string;
    resultValue: string;
    resultWidthPercent: number;
  };
  keyFacts: {
    value: string;
    label: string;
  }[];
}

const SYSTEM_HIGHLIGHTS: SystemHighlight[] = [
  {
    id: "jio-biometrics",
    tabLabel: "Jio Biometrics",
    tag: "Facial Recognition & Fraud Detection",
    title: "512D InsightFace Verification Engine",
    org: "Jio Platforms Limited · Software Engineer (SDE-I)",
    badgeClass: "border-primary/40 bg-primary/15 text-primary",
    barGradient: "from-[#FF7A59] to-amber-400",
    summary:
      "Upgraded Jio’s nationwide SIM registration verification across 42M+ users by expanding facial embeddings from 128D to 512D with InsightFace and OpenCV, preventing multimillion-dollar fraud penalties.",
    flowSteps: [
      "KYC Image Capture",
      "OpenCV Face Alignment",
      "InsightFace 512D Vector",
      "Cosine Fraud Check",
    ],
    comparison: {
      metricTitle: "SIM Verification Accuracy (42M+ Users)",
      baselineLabel: "Previous 128D Embedding Model",
      baselineValue: "75% accuracy",
      baselineWidthPercent: 75,
      resultLabel: "Upgraded 512D InsightFace Pipeline",
      resultValue: "96% accuracy (+21%)",
      resultWidthPercent: 96,
    },
    keyFacts: [
      { value: "42M+ Users", label: "Nationwide production scale" },
      { value: "128D → 512D", label: "Embedding dimension upgrade" },
      { value: "Docker + Lambda", label: "Containerized cloud rollout" },
    ],
  },
  {
    id: "jio-dam",
    tabLabel: "Jio Asset ML",
    tag: "Digital Asset Management & Search",
    title: "Detectron2 + Elasticsearch Media Pipeline",
    org: "Jio Platforms Limited · Software Engineer (SDE-I)",
    badgeClass: "border-amber-400/40 bg-amber-500/15 text-amber-500",
    barGradient: "from-amber-400 to-emerald-400",
    summary:
      "Designed end-to-end ML pipelines for Jio’s Digital Asset Management platform using Detectron2 on AWS SageMaker and PyTorch FER for emotion tagging, paired with Elasticsearch cosine similarity search.",
    flowSteps: [
      "Asset Ingestion",
      "Detectron2 + PyTorch FER",
      "Feature Vectorization",
      "Elasticsearch Cosine Index",
    ],
    comparison: {
      metricTitle: "Image Retrieval Throughput & Tagging",
      baselineLabel: "Unindexed Storage Lookup",
      baselineValue: "1× baseline speed",
      baselineWidthPercent: 20,
      resultLabel: "Elasticsearch Cosine Similarity Index",
      resultValue: "5× faster retrieval",
      resultWidthPercent: 100,
    },
    keyFacts: [
      { value: "95%+ Accuracy", label: "Automated object & emotion tags" },
      { value: "5× Faster", label: "Elasticsearch vector lookup" },
      { value: "10-Person Team", label: "Led data labeling & QA workflow" },
    ],
  },
  {
    id: "vera-cv",
    tabLabel: "Vera Beauty CV",
    tag: "Computer Vision & Full-Stack Marketplace",
    title: "Facial Ratio Onboarding & Med-Spa Platform",
    org: "Vera Beauty Inc. · Software Engineering Intern",
    badgeClass: "border-emerald-400/40 bg-emerald-500/15 text-emerald-500",
    barGradient: "from-emerald-400 to-teal-400",
    summary:
      "Built an in-house computer vision model to measure facial structural ratios during app onboarding for personalized treatment recommendations, and co-architected a nationwide Airbnb-style med-spa booking platform.",
    flowSteps: [
      "Onboarding Scan",
      "Landmark Detection",
      "Structural Ratio Math",
      "Treatment & Clinic Match",
    ],
    comparison: {
      metricTitle: "Facial Ratio Extraction Coverage",
      baselineLabel: "Manual Intake Questionnaire",
      baselineValue: "Subjective self-report",
      baselineWidthPercent: 30,
      resultLabel: "In-House Geometric CV Pipeline",
      resultValue: "Automated structural ratios",
      resultWidthPercent: 95,
    },
    keyFacts: [
      { value: "In-House CV", label: "Custom facial proportion model" },
      { value: "Live Onboarding", label: "Integrated into mobile sign-up" },
      { value: "U.S. Marketplace", label: "Airbnb-style med-spa booking" },
    ],
  },
  {
    id: "cfr-poker",
    tabLabel: "CFR Poker Bot",
    tag: "Probabilistic Game Theory & Reinforcement Learning",
    title: "Pyro + Counterfactual Regret Poker Engine",
    org: "Arizona State University · AI & Game Theory",
    badgeClass: "border-violet-400/40 bg-violet-500/15 text-violet-400",
    barGradient: "from-violet-400 to-[#FF7A59]",
    summary:
      "Engineered a probabilistic Ultimate Texas Hold’em decision agent in Python using Pyro and Counterfactual Regret Minimization (CFR) across 1,000,000+ Monte Carlo rollouts to maximize Expected Value (EV).",
    flowSteps: [
      "Hand & Board State",
      "1M+ Monte Carlo Rollouts",
      "CFR Regret Minimization",
      "Optimal EV Decision",
    ],
    comparison: {
      metricTitle: "Expected Value (EV) per Hand vs. Baseline",
      baselineLabel: "Standard Heuristic Baseline",
      baselineValue: "1.0× baseline EV",
      baselineWidthPercent: 38,
      resultLabel: "Pyro + CFR Trained Policy (1M+ Rollouts)",
      resultValue: "2.6× expected value",
      resultWidthPercent: 100,
    },
    keyFacts: [
      { value: "2.6× EV", label: "Win-rate multiplier over baseline" },
      { value: "1,000,000+", label: "Monte Carlo simulated hands" },
      { value: "Pyro + CFR", label: "Probabilistic regret minimization" },
    ],
  },
  {
    id: "card-club",
    tabLabel: "Card Club Engine",
    tag: "Real-Time Multiplayer & Polymorphic State Machine",
    title: "10-Game Unified Card Engine & Fog-of-War Sanitizer",
    org: "Card Club · React 19, TypeScript, Express 5 & Socket.IO",
    badgeClass: "border-primary/40 bg-primary/15 text-primary",
    barGradient: "from-[#FF7A59] via-amber-400 to-emerald-400",
    summary:
      "Architected a single polymorphic TypeScript state-machine engine running 10 classic Indian and international card games with per-socket fog-of-war state sanitization, combinatorial hand evaluators, and context-aware AI bots.",
    flowSteps: [
      "GameSession State Machine",
      "Combinatorial HandEvaluator",
      "Per-Socket Fog-of-War Mask",
      "React 19 Parlor UI & AI Bots",
    ],
    comparison: {
      metricTitle: "Multi-Game Engine Reuse & Anti-Cheat Security",
      baselineLabel: "Per-Game Hardcoded Servers",
      baselineValue: "1 game / isolated codebase",
      baselineWidthPercent: 20,
      resultLabel: "Unified Polymorphic Engine + Per-Socket Sanitizer",
      resultValue: "10 games · 0 leaked opponent cards",
      resultWidthPercent: 100,
    },
    keyFacts: [
      { value: "10 Card Games", label: "5 genres in 1 state machine" },
      { value: "Fog-of-War", label: "Per-socket packet sanitization" },
      { value: "60s Reconnect", label: "Grace timer & AI auto-play" },
    ],
  },
];

const STACK_TICKER = [
  { name: "Python & JavaScript", tone: "border-primary/30 text-primary bg-primary/10" },
  { name: "LangChain & LangGraph", tone: "border-amber-400/35 text-amber-500 bg-amber-500/10" },
  { name: "vLLM, Ollama & RAG", tone: "border-emerald-400/35 text-emerald-500 bg-emerald-500/10" },
  { name: "PyTorch & TensorFlow", tone: "border-violet-400/35 text-violet-400 bg-violet-500/10" },
  { name: "OpenCV & InsightFace", tone: "border-primary/30 text-primary bg-primary/10" },
  { name: "Detectron2 & Scikit-learn", tone: "border-amber-400/35 text-amber-500 bg-amber-500/10" },
  { name: "React, Vue.js & Node.js", tone: "border-emerald-400/35 text-emerald-500 bg-emerald-500/10" },
  { name: "FastAPI, Django & Flask", tone: "border-violet-400/35 text-violet-400 bg-violet-500/10" },
  { name: "AWS (SageMaker, Lambda, EC2)", tone: "border-primary/30 text-primary bg-primary/10" },
  { name: "Elasticsearch & Redis", tone: "border-amber-400/35 text-amber-500 bg-amber-500/10" },
  { name: "PostgreSQL, MySQL & MongoDB", tone: "border-emerald-400/35 text-emerald-500 bg-emerald-500/10" },
  { name: "Docker & Socket.io", tone: "border-violet-400/35 text-violet-400 bg-violet-500/10" },
];

const BentoShowcase = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>("jio-biometrics");

  const activeSystem =
    SYSTEM_HIGHLIGHTS.find((s) => s.id === selectedSystem) || SYSTEM_HIGHLIGHTS[0];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="bento" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>01 // Engineering Craft & Architecture</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Systems built for{" "}
              <span className="font-serif italic font-normal text-chromatic">
                real-world impact.
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm sm:text-base">
            Explore the computer-vision pipelines, search architectures, and
            decision engines behind my work.
          </p>
        </div>

        {/* Asymmetric Multi-Color Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Interactive System Architecture Inspector (Spans 7 cols) */}
          <SpotlightCard className="md:col-span-7 rounded-3xl p-6 sm:p-8 flex flex-col justify-between scroll-reveal-card">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-primary/15 border border-primary/30 text-primary">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Production System Blueprints
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      Select a system to view its architecture & measured results
                    </p>
                  </div>
                </div>

                {/* 4 Focused System Selector Tabs */}
                <div className="flex flex-wrap gap-1 bg-secondary/70 p-1 rounded-xl border border-border">
                  {SYSTEM_HIGHLIGHTS.map((sys, idx) => (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => setSelectedSystem(sys.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                        selectedSystem === sys.id
                          ? "bg-gradient-primary text-primary-foreground font-semibold shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      0{idx + 1} · {sys.tabLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active System Blueprint Panel */}
              <div className="rounded-2xl bg-secondary/45 border border-border p-5 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${activeSystem.badgeClass}`}
                    >
                      {activeSystem.tag}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {activeSystem.org}
                    </span>
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    {activeSystem.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                    {activeSystem.summary}
                  </p>
                </div>

                {/* Compact Single-Row System Flow */}
                <div className="rounded-xl bg-card/85 border border-border px-3.5 py-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    Architecture Flow
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {activeSystem.flowSteps.map((step, i) => (
                      <div key={step} className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/80 border border-border text-xs font-medium text-foreground">
                          <span className="font-mono text-[10px] font-bold text-primary">
                            {i + 1}.
                          </span>
                          <span>{step}</span>
                        </span>
                        {i < activeSystem.flowSteps.length - 1 && (
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sensible Side-by-Side Before vs. After Comparison Bar + 3 Key Facts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-0.5">
                  {/* Left 7 Cols: Proportional Baseline vs. Engineered Comparison */}
                  <div className="lg:col-span-7 p-3.5 rounded-xl bg-card/85 border border-border flex flex-col justify-between space-y-2.5">
                    <div className="text-xs font-semibold text-foreground">
                      {activeSystem.comparison.metricTitle}
                    </div>

                    {/* Baseline Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[11px] text-muted-foreground">
                        <span>{activeSystem.comparison.baselineLabel}</span>
                        <span>{activeSystem.comparison.baselineValue}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-muted-foreground/40 transition-all duration-500"
                          style={{
                            width: `${activeSystem.comparison.baselineWidthPercent}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Engineered Result Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-foreground font-medium">
                          {activeSystem.comparison.resultLabel}
                        </span>
                        <span className="text-primary font-bold">
                          {activeSystem.comparison.resultValue}
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${activeSystem.barGradient} transition-all duration-700`}
                          style={{
                            width: `${activeSystem.comparison.resultWidthPercent}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right 5 Cols: 3 Compact Key Fact Callouts */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-2">
                    {activeSystem.keyFacts.map((fact) => (
                      <div
                        key={fact.value}
                        className="px-3 py-2 rounded-xl bg-card/85 border border-border flex items-center justify-between gap-2"
                      >
                        <span className="font-mono text-xs font-bold text-primary whitespace-nowrap">
                          {fact.value}
                        </span>
                        <span className="text-[11px] text-muted-foreground text-right truncate">
                          {fact.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: Education & Academic Leadership (Spans 5 cols) */}
          <SpotlightCard className="md:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between scroll-reveal-card">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-mono text-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>Education & Leadership</span>
                </div>
                <span className="font-mono text-xs font-bold text-accent flex items-center gap-1 bg-accent/15 px-2.5 py-1 rounded-full border border-accent/30">
                  <Activity className="w-3.5 h-3.5" /> GPA: 4.0 / 4.0
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  M.S. in Computer Science
                </h3>
                <p className="text-sm text-primary font-medium mt-0.5">
                  Arizona State University · Tempe, AZ (May 2026 · 4.0/4.0 GPA)
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2.5 leading-relaxed">
                  Serving as{" "}
                  <span className="text-foreground font-medium">
                    Graduate Student Assistant for CSE 471 (Intro to AI)
                  </span>
                  , mentoring 120+ students on core AI concepts. Earned a{" "}
                  <span className="text-foreground font-medium">
                    B.E. in Information Technology (CGPA: 9.14/10)
                  </span>{" "}
                  from Vidyalankar Institute of Technology, Mumbai.
                </p>
              </div>

              {/* Verified Core Stack Highlights */}
              <div className="space-y-2.5 pt-1">
                {[
                  {
                    domain: "AI/ML & Computer Vision",
                    detail: "LangChain, LangGraph, vLLM, Ollama, RAG, PyTorch, OpenCV, InsightFace",
                    color: "border-l-4 border-l-[#FF7A59]",
                  },
                  {
                    domain: "Full-Stack & Cloud Infrastructure",
                    detail: "Vue.js, React, Node.js, FastAPI, Django, AWS (SageMaker, Lambda, EC2)",
                    color: "border-l-4 border-l-amber-400",
                  },
                  {
                    domain: "Academic & Community Leadership",
                    detail: "ASU CSE 471 Graduate TA (120+ students) · ACM VIT Chairperson (40-member team)",
                    color: "border-l-4 border-l-emerald-400",
                  },
                ].map((item) => (
                  <div
                    key={item.domain}
                    className={`p-3 rounded-r-xl bg-secondary/45 border border-border ${item.color}`}
                  >
                    <div className="text-xs font-semibold text-foreground">
                      {item.domain}
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-border flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Open to Full-Time SWE & AI/ML Roles
              </span>
              <button
                onClick={() => scrollTo("#experience")}
                className="font-mono text-xs text-primary hover:opacity-80 inline-flex items-center gap-1 font-semibold"
              >
                Experience
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </SpotlightCard>

          {/* Card 3: Bulls & Cows Word Arcade Teaser (Spans 6 cols) */}
          <SpotlightCard className="md:col-span-6 rounded-3xl p-6 sm:p-7 flex flex-col justify-between scroll-reveal-card group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-500">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div className="flex gap-1.5 font-mono text-xs font-bold">
                {["C", "O", "D", "E"].map((letter, i) => (
                  <span
                    key={i}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                      i === 0 || i === 3
                        ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-500"
                        : "bg-amber-500/20 border-amber-400/50 text-amber-500"
                    }`}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <div className="my-6">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                INTERACTIVE LOGIC ARCADE
              </p>
              <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                Bulls & Cows Word Game
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Crack the secret 4-letter word in 8 tries using Bull (exact
                spot) and Cow (wrong spot) clues on the mechanical QWERTY board.
              </p>
            </div>

            <button
              onClick={() => scrollTo("#games")}
              className="w-full py-2.5 px-4 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/35 text-xs font-mono uppercase tracking-wider text-primary font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <span>Play Bulls & Cows</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </SpotlightCard>

          {/* Card 4: 9-Stop Chronological Road Trip Teaser (Spans 6 cols) */}
          <SpotlightCard className="md:col-span-6 rounded-3xl p-6 sm:p-7 flex flex-col justify-between scroll-reveal-card group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-primary/15 border border-primary/30 text-primary">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-primary bg-primary/15 px-2.5 py-1 rounded-full border border-primary/30">
                AZ ➔ UT ➔ NV ➔ CA
              </span>
            </div>

            <div className="my-6">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                COLOR-GRADED PHOTOGRAPHY
              </p>
              <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                9-Stop West Coast Road Trip
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Follow the route from Arizona and Zion through Las Vegas, Death
                Valley, Sequoia, Yosemite, San Francisco, Big Sur, LA, and San Diego.
              </p>
            </div>

            <button
              onClick={() => scrollTo("#scenery")}
              className="w-full py-2.5 px-4 rounded-xl bg-secondary hover:bg-primary/20 border border-border hover:border-primary/40 text-xs font-mono uppercase tracking-wider text-foreground font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore the Route</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </SpotlightCard>

          {/* Full-Width Multi-Color Kinetic Tech Stack Marquee */}
          <div className="md:col-span-12 bento-card rounded-2xl py-4 px-6 overflow-hidden relative">
            <div className="marquee-track gap-3 items-center">
              {[...STACK_TICKER, ...STACK_TICKER].map((item, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-mono text-xs whitespace-nowrap ${item.tone}`}
                >
                  <Zap className="w-3 h-3 opacity-80" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoShowcase;
