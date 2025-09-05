import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "SDE-I",
      company: "Vara Beauty Inc, USA (Remote)",
      period: "June 2025 – August 2025",
      type: "Summer Internship",
      description: "Built an in-house computer vision model to extract facial structural ratios, integrating it into the app's onboarding flow to recommend personalized aesthetic procedures.",
      skills: ["Computer Vision", "Python", "Machine Learning", "Mobile Integration"]
    },
    {
      title: "Lead Engineer and Founder Developer",
      company: "Jio Platforms Limited, Mumbai, India",
      period: "September 2022 – June 2024",
      type: "Full-time",
      description: "Worked on AI solutions for the Enterprise Development Team, focusing on image-related tasks. Developed and deployed CNN-based facial recognition and fraud detection systems, analyzing data from 42M users.",
      skills: ["AI/ML", "CNNs", "Python", "AWS", "Django", "React", "Docker"]
    },
    {
      title: "Software Tester",
      company: "Jio Platforms Limited, Mumbai, India",
      period: "June 2019 – July 2019",
      type: "Internship",
      description: "Interned as a Software Tester on Jio Fiber's Smart Home Devices team, testing apps on the new TV OS and creating test shell scripts to log errors via ADB.",
      skills: ["Software Testing", "ADB", "Shell Scripting", "QA"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
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