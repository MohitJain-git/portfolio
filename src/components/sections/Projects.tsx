import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "DocFix - Document Processing System",
      description: "Deployed a website using Django, offering document-related features such as text summarization, sentiment analysis, keyword extraction, grammar checking, and web scraping. Integrated AI services through FastAPI.",
      technologies: ["Django", "FastAPI", "Python", "AI/ML", "NLP"],
      date: "May 2022",
      type: "Final Year Project",
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      title: "Wordle Royale",
      description: "Architected a live multiplayer Battle Royale using Vue.js, Node.js, and Socket.io for sub-millisecond, bi-directional state synchronization. Engineered complex game mechanics including circular target logic and dynamic looting.",
      technologies: ["Vue.js", "Node.js", "Socket.io", "WebSockets"],
      date: "Jan 2026",
      type: "Full Stack Game",
      links: {
        demo: "https://wordle-royale-mu.vercel.app/",
        github: "" // Update if different
      }
    },
    {
      title: "Nike Smart Bot",
      description: "Architected a LangChain agent to interpret natural language queries for personalized shoe recommendations. Built an automated ETL pipeline to sync real-time inventory and trigger instant user alerts for price drops.",
      technologies: ["LangChain", "Python", "ETL", "SQL", "Web Scraping"],
      date: "Nov 2025",
      type: "AI Agent",
      links: {
        github: "" // Update if different
      }
    },
    {
      title: "Ultimate Texas Hold'em Bot",
      description: "Engineered a probabilistic poker bot using Pyro and Monte Carlo (1M+ iterations) to maximize EV. Implemented Counterfactual Regret Minimization (CFR) to outperform human players by 2.6x in simulations.",
      technologies: ["Pyro", "Monte Carlo", "Game Theory", "Python", "CFR"],
      date: "Dec 2024",
      type: "ML & Algorithms",
      links: {
        demo: "",
        github: "https://github.com/MohitJain-git/UltimateTexasHoldem"
      }
    },
    {
      title: "Facial Recognition & Fraud Detection",
      description: "Developed and deployed CNN-based facial recognition and fraud detection systems at Jio Platforms, analyzing data from 42M users with 95%+ accuracy and fraud detection improvements.",
      technologies: ["CNN", "PyTorch", "AWS SageMaker", "Python", "Computer Vision"],
      date: "2022-2024",
      type: "Enterprise Project",
      links: {
        demo: "#"
      }
    },
    {
      title: "Computer Vision for Aesthetic Analysis",
      description: "Built an in-house computer vision model to extract facial structural ratios at Vara Beauty Inc, integrating it into mobile app onboarding flow for personalized recommendations.",
      technologies: ["Computer Vision", "Python", "Mobile Integration", "ML Models"],
      date: "2025",
      type: "Internship Project",
      links: {
        demo: "#"
      }
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my work in AI/ML, web development, and computer vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-glow-accent transition-smooth group">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-smooth">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{project.type}</Badge>
                      <span className="text-sm text-muted-foreground">{project.date}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  {project.links.demo && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </Button>
                  )}
                  {project.links.github && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-4 w-4" />
                      Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;