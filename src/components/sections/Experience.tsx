import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "AI/ML Engineer Intern",
      company: "Vera Beauty Inc, USA (Remote)",
      period: "June 2025 – August 2025",
      type: "Summer Internship",
      description: "Built an in-house computer vision model to extract facial structural ratios, integrating it into the app's onboarding flow to recommend personalized aesthetic procedures.",
      highlights: ["Production computer vision", "Mobile onboarding integration"],
      skills: ["Computer Vision", "Python", "Machine Learning", "Mobile Integration"]
    },
    {
      title: "SDE I",
      company: "Jio Platforms Limited, Mumbai, India",
      period: "September 2022 – June 2024",
      type: "Full-time",
      description: "Developed and deployed facial-recognition and fraud-detection systems for Jio's enterprise platform, improving verification quality and image retrieval at nationwide scale.",
      highlights: ["42M+ users", "75% → 96% accuracy", "5× faster retrieval"],
      skills: ["AI/ML", "CNNs", "Python", "AWS", "Django", "React", "Docker"]
    },
    {
      title: "Software Tester",
      company: "Jio Platforms Limited, Mumbai, India",
      period: "June 2019 – July 2019",
      type: "Internship",
      description: "Interned as a Software Tester on Jio Fiber's Smart Home Devices team, testing apps on the new TV OS and creating test shell scripts to log errors via ADB.",
      highlights: ["Automated ADB logging", "Smart-home device QA"],
      skills: ["Software Testing", "ADB", "Shell Scripting", "QA"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent text-glow">
            Professional Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My journey in AI/ML engineering and software development
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-glow-primary transition-smooth">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-foreground">{exp.title}</CardTitle>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <MapPinIcon className="h-4 w-4" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      {exp.period}
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {exp.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">{exp.description}</p>
                <div className="mb-5 grid gap-3 sm:grid-cols-3">
                  {exp.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-center text-sm font-semibold text-primary"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
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

export default Experience;
