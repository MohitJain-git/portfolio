import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Gamepad2 } from "lucide-react";
import BullsAndBears from "@/components/games/BullsAndBears";

const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: "bulls-and-bears",
      title: "Bulls and Bears",
      description: "A challenging word-guessing game. Guess the 4-letter word using bulls (correct position) and bears (wrong position) as clues.",
      icon: <Target className="h-8 w-8" />,
      difficulty: "Medium",
      players: "1 Player"
    }
  ];

  return (
    <section id="games" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Interactive Games
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fun and challenging games to showcase interactive development skills
          </p>
        </div>

        {!activeGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {games.map((game) => (
              <Card key={game.id} className="bg-card border-border hover:shadow-glow-primary transition-smooth group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-primary/20 text-primary group-hover:shadow-glow-primary transition-smooth">
                    {game.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">{game.description}</p>
                  <div className="flex justify-center gap-2">
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                      {game.difficulty}
                    </span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {game.players}
                    </span>
                  </div>
                  <Button 
                    onClick={() => setActiveGame(game.id)}
                    className="w-full bg-gradient-primary hover:shadow-glow-primary transition-smooth"
                  >
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <Button 
                onClick={() => setActiveGame(null)}
                variant="outline"
                className="mb-4"
              >
                ← Back to Games
              </Button>
            </div>
            {activeGame === "bulls-and-bears" && <BullsAndBears />}
          </div>
        )}
      </div>
    </section>
  );
};

export default Games;