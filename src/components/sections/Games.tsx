import { Gamepad2 } from "lucide-react";
import BullsAndCows from "@/components/games/BullsAndCows";

const Games = () => {
  return (
    <section id="games" className="relative py-24 border-t border-[#FFE8CD]/10">
      <div id="playground" className="container mx-auto">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              <Gamepad2 className="h-3.5 w-3.5" />
              <span>05 // Interactive Logic Arcade</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Play{" "}
              <span className="font-serif italic font-normal text-accent">
                Bulls &amp; Cows
              </span>{" "}
              live.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground sm:text-base">
            A hands-on look at how I turn deduction algorithms and state machines into tactile, responsive web experiences.
          </p>
        </div>

        <BullsAndCows />
      </div>
    </section>
  );
};

export default Games;
