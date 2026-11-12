import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Briefcase,
  Camera,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FolderGit2,
  Gamepad2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ROAD_TRIP_STOPS } from "@/data/usaScenery";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const jumpTo = (hash: string) => {
    onOpenChange(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("mohit270900@gmail.com");
    onOpenChange(false);
    toast({
      title: "Email Copied",
      description: "mohit270900@gmail.com copied to your clipboard.",
    });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Jump to section, play Bulls & Cows, view USA scenery, or run action..." />
      <CommandList>
        <CommandEmpty>No matching studio command found.</CommandEmpty>

        <CommandGroup heading="Studio Navigation">
          <CommandItem onSelect={() => jumpTo("#hero")}>
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span>Hero &amp; CV Telemetry Studio</span>
            <CommandShortcut>01</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("#bento")}>
            <Code2 className="mr-2 h-4 w-4 text-primary" />
            <span>Engineering Architecture &amp; AI Agent</span>
            <CommandShortcut>02</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("#experience")}>
            <Briefcase className="mr-2 h-4 w-4 text-primary" />
            <span>Experience (Vera Beauty, Jio Platforms)</span>
            <CommandShortcut>03</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("#projects")}>
            <FolderGit2 className="mr-2 h-4 w-4 text-primary" />
            <span>Featured Projects (Wordle Royale, Poker CFR, Shoe La La)</span>
            <CommandShortcut>04</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("#playground")}>
            <Gamepad2 className="mr-2 h-4 w-4 text-accent" />
            <span>Play Bulls &amp; Cows Word Arcade</span>
            <CommandShortcut>GAME</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("#scenery")}>
            <Camera className="mr-2 h-4 w-4 text-primary" />
            <span>Through My Lens: Coast-to-Coast USA Scenery</span>
            <CommandShortcut>USA</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("#contact")}>
            <Mail className="mr-2 h-4 w-4 text-primary" />
            <span>Contact &amp; Collaboration</span>
            <CommandShortcut>07</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions & Links">
          <CommandItem onSelect={copyEmail}>
            <Copy className="mr-2 h-4 w-4 text-accent" />
            <span>Copy Email (mohit270900@gmail.com)</span>
            <CommandShortcut>COPY</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              const link = document.createElement("a");
              link.href = "/Mohit-Jain-Resume.pdf";
              link.download = "Mohit-Jain-Resume.pdf";
              link.click();
            }}
          >
            <Download className="mr-2 h-4 w-4 text-primary" />
            <span>Download Resume PDF</span>
            <CommandShortcut>PDF</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              window.open("https://github.com/MohitJain-git", "_blank", "noopener,noreferrer");
            }}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>Open GitHub (@MohitJain-git)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              window.open("https://linkedin.com/in/mohitjain-27", "_blank", "noopener,noreferrer");
            }}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            <span>Open LinkedIn (mohitjain-27)</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="9-Stop West Coast Road Trip">
          {ROAD_TRIP_STOPS.map((stop, idx) => (
            <CommandItem
              key={stop.id}
              onSelect={() => {
                jumpTo("#scenery");
                window.dispatchEvent(
                  new CustomEvent("select-road-trip-stop", { detail: idx })
                );
              }}
            >
              <MapPin className="mr-2 h-4 w-4 text-primary/80" />
              <span>
                Leg {stop.legNumber}: {stop.stopName} —{" "}
                <span className="text-muted-foreground">{stop.routeTransition}</span>
              </span>
              <CommandShortcut>{stop.stateCode}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
