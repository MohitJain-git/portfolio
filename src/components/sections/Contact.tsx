import { useState } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const email = "mohit270900@gmail.com";
  const subject = "Let's Connect - Engineering Opportunity / Collaboration";
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({
      title: "Email Copied",
      description: `${email} is ready in your clipboard.`,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/[0.06]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Callout Banner (7 Cols) */}
          <SpotlightCard className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                <span>07 // Ready for Next Impact</span>
              </div>

              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
                Let&apos;s build{" "}
                <span className="font-serif italic font-normal text-primary">
                  production AI
                </span>{" "}
                &amp; scalable products together.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Whether you&apos;re hiring for AI/ML, Computer Vision, or Full-Stack Software Engineering roles—or want to chat about game theory and systems architecture—my inbox is always open.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                size="lg"
                className="rounded-full bg-gradient-primary px-7 font-display text-sm font-bold text-primary-foreground hover:shadow-glow-primary"
                asChild
              >
                <a href={mailtoLink}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Direct Email
                </a>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleCopyEmail}
                className="rounded-full border-white/15 bg-white/[0.03] px-5 font-mono text-xs text-white hover:border-primary/50 hover:bg-white/10"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-accent" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4 text-primary" />
                    {email}
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-primary/40 bg-primary/10 px-5 font-display text-sm text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <a href="/Mohit-Jain-Resume.pdf" download="Mohit-Jain-Resume.pdf">
                  <FileDown className="mr-2 h-4 w-4" />
                  Resume PDF
                </a>
              </Button>
            </div>
          </SpotlightCard>

          {/* Right Direct Channels Card (5 Cols) */}
          <SpotlightCard className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Direct Coordinates
              </h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                San Jose, CA · Available for Immediate Interviews
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={mailtoLink}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-primary/40 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground">
                        Email Address
                      </div>
                      <div className="font-mono text-sm font-medium text-white">
                        {email}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href="tel:+16028835286"
                  className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-primary/40 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground">
                        Phone
                      </div>
                      <div className="font-mono text-sm font-medium text-white">
                        +1 (602) 883-5286
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>

                <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground">
                        Current Location
                      </div>
                      <div className="font-display text-sm font-medium text-white">
                        San Jose, California, USA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Profiles */}
            <div className="grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-5">
              <a
                href="https://linkedin.com/in/mohitjain-27"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 font-mono text-xs text-white transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                <Linkedin className="h-4 w-4 text-primary" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
              <a
                href="https://github.com/MohitJain-git"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 font-mono text-xs text-white transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                <Github className="h-4 w-4 text-primary" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
