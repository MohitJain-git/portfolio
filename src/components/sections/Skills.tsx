import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Cloud, Brain } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"]
    },
    {
      title: "AI/ML & Frameworks",
      icon: <Brain className="h-6 w-6" />,
      skills: ["PyTorch", "NumPy", "Scikit-learn", "OpenCV", "FastAPI", "Flask", "React", "Django", "Node.js"]
    },
    {
      title: "Development Tools",
      icon: <Database className="h-6 w-6" />,
      skills: ["Git", "Docker", "MySQL", "MongoDB", "Elasticsearch", "AWS SageMaker", "AWS Lambda"]
    },
    {
      title: "Cloud & Platforms",
      icon: <Cloud className="h-6 w-6" />,
      skills: ["AWS EC2", "AWS S3", "Windows", "Linux", "Ubuntu", "Amazon Linux"]
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-glow-accent transition-smooth group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent group-hover:shadow-glow-accent transition-smooth">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-smooth cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;