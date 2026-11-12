import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, CalendarIcon, CheckCircle2, MapPinIcon } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      index: "01",
      title: "AWS Cloud Developer Intern",
      company: "MindSpark (LEAP Consultants LLC)",
      location: "Remote, USA",
      period: "October 2026 – Present",
      type: "Cloud Engineering Internship",
      description:
        "Architected serverless pipelines using AWS Lambda, Step Functions, API Gateway, and S3, and optimized Aurora PostgreSQL data models, indexing, and connection pooling for low-latency queries. Delivering production-ready cloud services with structured error handling, pre-deployment validation, and comprehensive AWS architecture documentation.",
      highlights: [
        { metric: "Serverless Pipelines", detail: "AWS Lambda, Step Functions, API Gateway & S3" },
        { metric: "Aurora PostgreSQL", detail: "Data models, indexing & connection pooling" },
        { metric: "Low-Latency Cloud", detail: "Production-ready AWS architecture & SES" },
      ],
      skills: [
        "AWS Lambda",
        "AWS Step Functions",
        "Amazon API Gateway",
        "Aurora PostgreSQL",
        "Amazon S3",
        "Amazon SES",
        "Serverless",
        "Cloud Architecture",
      ],
    },
    {
      index: "02",
      title: "Software Engineering Intern (AI/ML)",
      company: "Vera Beauty Inc.",
      location: "Tempe, AZ / Remote",
      period: "June 2025 – August 2025",
      type: "Summer Internship",
      description:
        "Engineered an in-house computer vision model to extract facial structural ratios and integrated it into the onboarding flow to drive personalized aesthetic procedure recommendations. Collaborated with the Lead Engineer to architect an Airbnb-style platform enabling users to research and book med-spa treatments across the U.S.",
      highlights: [
        { metric: "In-House CV", detail: "Facial structural ratio extraction" },
        { metric: "Onboarding AI", detail: "Personalized procedure matching" },
        { metric: "Airbnb-Style", detail: "Nationwide med-spa booking platform" },
      ],
      skills: ["Computer Vision", "Python", "Machine Learning", "Full-Stack", "Mobile Integration"],
    },
    {
      index: "03",
      title: "Graduate Student Assistant (Intro to AI — CSE 471)",
      company: "Arizona State University",
      location: "Tempe, AZ",
      period: "January 2025 – May 2026",
      type: "Academic Leadership · 4.0/4.0 GPA",
      description:
        "Supporting 120+ undergraduate and graduate students in CSE 471 (Introduction to Artificial Intelligence), simplifying complex probabilistic reasoning, search, and machine learning concepts through mentoring and office hours.",
      highlights: [
        { metric: "120+ Students", detail: "CSE 471 Intro to AI mentorship" },
        { metric: "4.0 / 4.0 GPA", detail: "M.S. in Computer Science" },
        { metric: "AI Curriculum", detail: "Search, RL & probabilistic ML" },
      ],
      skills: ["Artificial Intelligence", "Probabilistic ML", "Reinforcement Learning", "Python", "Mentorship"],
    },
    {
      index: "04",
      title: "Software Engineer (SDE-I)",
      company: "Jio Platforms Limited",
      location: "Mumbai, India",
      period: "September 2022 – June 2024",
      type: "Full-Time · 2 Years",
      description:
        "Developed and deployed large-scale facial recognition and fraud detection systems analyzing data from 42M+ users. Boosted verification accuracy from 75% to 96% by enhancing facial embeddings (128D → 512D) using InsightFace and OpenCV. Designed end-to-end ML pipelines for Digital Asset Management using Detectron2 on AWS SageMaker and PyTorch FER, and optimized image retrieval speed by 5× using Elasticsearch and cosine similarity.",
      highlights: [
        { metric: "42M+ Users", detail: "Nationwide facial recognition & fraud ML" },
        { metric: "75% → 96%", detail: "128D → 512D InsightFace & OpenCV" },
        { metric: "5× Faster", detail: "Elasticsearch retrieval · 95%+ tagging" },
      ],
      skills: ["Python", "InsightFace", "OpenCV", "Detectron2", "PyTorch FER", "AWS SageMaker", "Elasticsearch", "Docker", "AWS Lambda"],
    },
    {
      index: "05",
      title: "Software Tester Intern",
      company: "Jio Platforms Limited",
      location: "Mumbai, India",
      period: "June 2019 – July 2019",
      type: "Internship",
      description:
        "Interned as a Software Tester on Jio Fiber's Smart Home Devices team, testing applications on the custom TV OS and creating automated diagnostic shell scripts to capture and log system errors via ADB.",
      highlights: [
        { metric: "ADB Automation", detail: "Shell-based error telemetry logging" },
        { metric: "Smart-Home OS", detail: "Jio Fiber TV OS app validation" },
        { metric: "QA Pipelines", detail: "Automated pre-release diagnostics" },
      ],
      skills: ["Software Testing", "ADB", "Shell Scripting", "Linux", "QA"],
    },
  ];

  return (
    <section id="experience" className="relative py-24 border-t border-border">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              <Briefcase className="h-3.5 w-3.5" />
              <span>02 // Career Trajectory</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Production{" "}
              <span className="font-serif italic font-normal text-chromatic">
                engineering
              </span>{" "}
              experience.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground sm:text-base">
            From serverless AWS cloud development at LEAP Consultants (MindSpark) and computer-vision onboarding at Vera Beauty to nationwide biometric platforms serving 42M+ users at Jio.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="relative space-y-6">
          {experiences.map((exp) => (
            <SpotlightCard key={exp.index} className="p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Left Metadata Column (4 cols) */}
                <div className="flex flex-col justify-between border-b border-border pb-5 lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">
                        ROLE // {exp.index}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-border bg-secondary/50 font-mono text-[10px] text-foreground"
                      >
                        {exp.type}
                      </Badge>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                      {exp.title}
                    </h3>
                    <div className="mt-1.5 font-display text-base font-medium text-primary">
                      {exp.company}
                    </div>
                  </div>

                  <div className="mt-5 space-y-1.5 font-mono text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-3.5 w-3.5 text-primary/80" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-3.5 w-3.5 text-accent/80" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right Impact & Stack Column (8 cols) */}
                <div className="flex flex-col justify-between lg:col-span-8 lg:pl-2">
                  <div>
                    <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                      {exp.description}
                    </p>

                    {/* Key Metrics Grid */}
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {exp.highlights.map((h) => (
                        <div
                          key={h.metric}
                          className="rounded-xl border border-border bg-secondary/35 p-3.5"
                        >
                          <div className="flex items-center gap-1.5 font-display text-base font-bold text-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                            <span>{h.metric}</span>
                          </div>
                          <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                            {h.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
