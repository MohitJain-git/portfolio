import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Brain, Cloud, Code, Layers } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      index: "01",
      title: "AI/ML & Computer Vision",
      subtitle: "Deep Learning, Probabilistic Modeling & Agents",
      icon: <Brain className="h-5 w-5" />,
      skills: [
        "LangChain & LangGraph",
        "vLLM, Ollama & RAG",
        "PyTorch & TensorFlow",
        "OpenCV & InsightFace",
        "Detectron2 & PyTorch FER",
        "Pyro & CFR Game Theory",
        "Scikit-learn",
        "Pandas & NumPy",
      ],
    },
    {
      index: "02",
      title: "Languages & Core Systems",
      subtitle: "High-Performance & Type-Safe Foundations",
      icon: <Code className="h-5 w-5" />,
      skills: [
        "Python",
        "TypeScript",
        "JavaScript (ES2024+)",
        "C++",
        "SQL",
        "HTML5",
        "CSS3",
        "Shell / ADB Scripting",
      ],
    },
    {
      index: "03",
      title: "Full-Stack & Realtime Web",
      subtitle: "Reactive Frontends & Async Microservices",
      icon: <Layers className="h-5 w-5" />,
      skills: [
        "React",
        "Vue.js",
        "FastAPI",
        "Django",
        "Node.js",
        "Socket.io / WebSockets",
        "Flask",
        "Tailwind CSS",
      ],
    },
    {
      index: "04",
      title: "Cloud, DevOps & Data Stores",
      subtitle: "Production Infrastructure at Scale",
      icon: <Cloud className="h-5 w-5" />,
      skills: [
        "AWS (Lambda, Step Functions, API Gateway, S3, SageMaker, EC2)",
        "PostgreSQL (Aurora)",
        "Docker & Kubernetes",
        "Redis",
        "Elasticsearch",
        "MySQL & MongoDB",
        "Linux",
        "Git & CI/CD",
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 border-t border-white/[0.06]">
      <div className="container mx-auto">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              <Code className="h-3.5 w-3.5" />
              <span>04 // Technical Stack Matrix</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Full-spectrum{" "}
              <span className="font-serif italic font-normal text-primary">
                engineering
              </span>{" "}
              arsenal.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground sm:text-base">
            From training custom convolutional vision networks to orchestrating containerized microservices on AWS.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category) => (
            <SpotlightCard key={category.index} className="p-6 sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      {category.subtitle}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-white/30">
                  //{category.index}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-xs font-medium text-white/90 transition-all hover:border-primary/50 hover:bg-primary/15 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
