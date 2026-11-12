import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:text-left">
      <div>
        <p className="font-semibold text-foreground">Mohit Jain</p>
        <p className="text-sm text-muted-foreground">AI/ML Engineer &amp; Full-Stack Developer</p>
      </div>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Mohit Jain. Built with React.</p>
      <div className="flex gap-2">
        <a href="https://linkedin.com/in/mohitjain-27" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary">
          <Linkedin className="h-5 w-5" />
        </a>
        <a href="https://github.com/MohitJain-git" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-md p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary">
          <Github className="h-5 w-5" />
        </a>
        <a href="mailto:mohit270900@gmail.com" aria-label="Email" className="rounded-md p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary">
          <Mail className="h-5 w-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
