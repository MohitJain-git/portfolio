import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameState {
  targetWord: string;
  guesses: string[];
  feedback: Array<{ bulls: number; cows: number }>;
  currentGuess: string;
  gameWon: boolean;
  gameOver: boolean;
  attempts: number;
}

const BullsAndCows = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    targetWord: "",
    guesses: [],
    feedback: [],
    currentGuess: "",
    gameWon: false,
    gameOver: false,
    attempts: 0,
  });

  const [wordList, setWordList] = useState<string[]>([]);
  const [validWords, setValidWords] = useState<Set<string>>(new Set());

  const MAX_ATTEMPTS = 8;

  // Load word lists on component mount
  useEffect(() => {
    const loadWordLists = async () => {
      try {
        // Load common words for target selection
        const commonWordsResponse = await fetch('/common_4_letter_words.txt');
        const commonWordsText = await commonWordsResponse.text();
        const commonWords = commonWordsText.trim().split('\n').map(word => word.trim().toUpperCase()).filter(word => word.length === 4);
        
        // Load all valid words for validation
        const allWordsResponse = await fetch('/all_words.txt');
        const allWordsText = await allWordsResponse.text();
        const allWords = allWordsText.trim().split(/\s+/).filter(word => word.length === 4);
        
        setWordList(commonWords);
        setValidWords(new Set(allWords));
        
        // Initialize game with first word
        if (commonWords.length > 0) {
          setGameState(prev => ({
            ...prev,
            targetWord: commonWords[Math.floor(Math.random() * commonWords.length)]
          }));
        }
      } catch (error) {
        console.error('Failed to load word lists:', error);
        toast({
          title: "Error",
          description: "Failed to load word lists. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    loadWordLists();
  }, [toast]);

  const generateRandomWord = () => {
    if (wordList.length === 0) return "";
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  const resetGame = () => {
    setGameState({
      targetWord: generateRandomWord(),
      guesses: [],
      feedback: [],
      currentGuess: "",
      gameWon: false,
      gameOver: false,
      attempts: 0,
    });
  };

  const calculateFeedback = (guess: string, target: string) => {
    let bulls = 0;
    let cows = 0;
    
    const targetChars = target.split('');
    const guessChars = guess.split('');
    const usedTargetIndices = new Set();
    const usedGuessIndices = new Set();

    // Count bulls (correct position)
    for (let i = 0; i < 4; i++) {
      if (guessChars[i] === targetChars[i]) {
        bulls++;
        usedTargetIndices.add(i);
        usedGuessIndices.add(i);
      }
    }

    // Count cows (correct letter, wrong position)
    for (let i = 0; i < 4; i++) {
      if (!usedGuessIndices.has(i)) {
        for (let j = 0; j < 4; j++) {
          if (!usedTargetIndices.has(j) && guessChars[i] === targetChars[j]) {
            cows++;
            usedTargetIndices.add(j);
            break;
          }
        }
      }
    }

    return { bulls, cows };
  };

  const handleSubmitGuess = () => {
    if (gameState.currentGuess.length !== 4) {
      toast({
        title: "Invalid Guess",
        description: "Please enter exactly 4 letters.",
        variant: "destructive",
      });
      return;
    }

    const guess = gameState.currentGuess.toUpperCase();
    
    if (!validWords.has(guess)) {
      toast({
        title: "Invalid Word",
        description: "Please enter a valid 4-letter word.",
        variant: "destructive",
      });
      return;
    }

    const feedback = calculateFeedback(guess, gameState.targetWord);
    const newAttempts = gameState.attempts + 1;
    const won = feedback.bulls === 4;
    const gameOver = won || newAttempts >= MAX_ATTEMPTS;

    setGameState(prev => ({
      ...prev,
      guesses: [...prev.guesses, guess],
      feedback: [...prev.feedback, feedback],
      currentGuess: "",
      gameWon: won,
      gameOver,
      attempts: newAttempts,
    }));

    if (won) {
      toast({
        title: "Congratulations! 🎉",
        description: `You guessed the word "${gameState.targetWord}" in ${newAttempts} attempts!`,
      });
    } else if (gameOver) {
      toast({
        title: "Game Over",
        description: `The word was "${gameState.targetWord}". Better luck next time!`,
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitGuess();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <span className="text-3xl font-bold text-green-500">B</span>
            <span className="text-3xl font-bold text-yellow-500">C</span>
            Bulls and Cows
          </CardTitle>
          <p className="text-muted-foreground">
            Guess the 4-letter word! Bulls = correct letter & position, Cows = correct letter wrong position
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Attempts: {gameState.attempts}/{MAX_ATTEMPTS}
            </div>
            <Button 
              onClick={resetGame} 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              New Game
            </Button>
          </div>

          {!gameState.gameOver && wordList.length > 0 && (
            <div className="flex gap-2">
              <Input
                value={gameState.currentGuess}
                onChange={(e) => setGameState(prev => ({ 
                  ...prev, 
                  currentGuess: e.target.value.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() 
                }))}
                onKeyPress={handleKeyPress}
                placeholder="Enter 4 letters..."
                className="text-center text-lg font-mono"
                maxLength={4}
                disabled={gameState.gameOver}
              />
              <Button 
                onClick={handleSubmitGuess}
                disabled={gameState.currentGuess.length !== 4 || gameState.gameOver}
                className="bg-gradient-primary hover:shadow-glow-primary"
              >
                Guess
              </Button>
            </div>
          )}

          {wordList.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Loading word lists...</p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Previous Guesses:</h3>
            {gameState.guesses.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No guesses yet</p>
            ) : (
              <div className="space-y-2">
                {gameState.guesses.map((guess, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-mono text-lg font-semibold">{guess}</span>
                    <div className="flex gap-2">
                      <Badge className="bg-green-500 text-white font-bold">
                        B{gameState.feedback[index].bulls}
                      </Badge>
                      <Badge className="bg-yellow-500 text-black font-bold">
                        C{gameState.feedback[index].cows}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {gameState.gameWon && (
            <div className="text-center p-4 bg-accent/20 rounded-lg border border-accent">
              <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-accent font-semibold">
                Congratulations! You won in {gameState.attempts} attempts!
              </p>
            </div>
          )}

          {gameState.gameOver && !gameState.gameWon && (
            <div className="text-center p-4 bg-destructive/20 rounded-lg border border-destructive">
              <p className="text-destructive font-semibold">
                Game Over! The word was: <span className="font-mono">{gameState.targetWord}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BullsAndCows;