import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";

const Contact = () => {
  const email = "mohit270900@gmail.com";
  const subject = "Let's Connect - Portfolio Inquiry";
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent text-glow">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. Let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a 
                  href={mailtoLink}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-smooth"
                >
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground hover:text-primary transition-smooth">{email}</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 p-3">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground">+1 602-883-5286</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground">Tempe, Arizona, USA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a 
                  href="https://linkedin.com/in/mohitjain-27" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-smooth"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span className="text-foreground">LinkedIn Profile</span>
                </a>
                <a 
                  href="https://github.com/MohitJain-git"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-smooth"
                >
                  <Github className="h-5 w-5 text-primary" />
                  <span className="text-foreground">GitHub Profile</span>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Send Me an Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-foreground/80 mb-6">
                  Have a project in mind or want to collaborate? Feel free to reach out directly via email. I typically respond within 24 hours.
                </p>
                <Button 
                  asChild
                  className="w-full bg-gradient-primary hover:shadow-glow-primary transition-smooth"
                >
                  <a href={mailtoLink} className="flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Email
                  </a>
                </Button>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">What to Include:</h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Your name and organization</li>
                  <li>• What you'd like to discuss</li>
                  <li>• Your contact information</li>
                  <li>• Any relevant links or details</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;