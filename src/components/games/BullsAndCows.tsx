import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Delete,
  CornerDownLeft,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Trophy,
  Keyboard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameState {
  targetWord: string;
  guesses: string[];
  feedback: Array<{ bulls: number; cows: number }>;
  currentGuess: string;
  gameWon: boolean;
  gameOver: boolean;
  attempts: number;
  hintIndex: number | null;
}

interface GameStats {
  played: number;
  won: number;
  streak: number;
}

type NoteState = "none" | "eliminated" | "cow" | "bull";

const QWERTY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const MAX_ATTEMPTS = 8;

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
    hintIndex: null,
  });

  const [wordList, setWordList] = useState<string[]>([]);
  const [validWords, setValidWords] = useState<Set<string>>(new Set());
  const [letterNotes, setLetterNotes] = useState<Record<string, NoteState>>({});
  const [noteMode, setNoteMode] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem("mj_bulls_cows_stats");
      return saved ? JSON.parse(saved) : { played: 0, won: 0, streak: 0 };
    } catch {
      return { played: 0, won: 0, streak: 0 };
    }
  });

  useEffect(() => {
    const loadWordLists = async () => {
      try {
        const commonWordsResponse = await fetch("/common_4_letter_words.txt");
        const commonWordsText = await commonWordsResponse.text();
        const commonWords = commonWordsText
          .trim()
          .split("\n")
          .map((word) => word.trim().toUpperCase())
          .filter((word) => word.length === 4);

        const allWordsResponse = await fetch("/all_words.txt");
        const allWordsText = await allWordsResponse.text();
        const allWords = allWordsText
          .trim()
          .split(/\s+/)
          .map((word) => word.trim().toUpperCase())
          .filter((word) => word.length === 4);

        setWordList(commonWords);
        setValidWords(new Set(allWords));

        if (commonWords.length > 0) {
          setGameState((prev) => ({
            ...prev,
            targetWord:
              commonWords[Math.floor(Math.random() * commonWords.length)],
          }));
        }
      } catch (error) {
        console.error("Failed to load word lists:", error);
        toast({
          title: "Error",
          description: "Failed to load word lists. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    loadWordLists();
  }, [toast]);

  const saveStats = (next: GameStats) => {
    setStats(next);
    try {
      localStorage.setItem("mj_bulls_cows_stats", JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  };

  const resetGame = useCallback(() => {
    if (wordList.length === 0) return;
    setLetterNotes({});
    setGameState({
      targetWord: wordList[Math.floor(Math.random() * wordList.length)],
      guesses: [],
      feedback: [],
      currentGuess: "",
      gameWon: false,
      gameOver: false,
      attempts: 0,
      hintIndex: null,
    });
  }, [wordList]);

  const calculateFeedback = (guess: string, target: string) => {
    let bulls = 0;
    let cows = 0;

    const targetChars = target.split("");
    const guessChars = guess.split("");
    const usedTargetIndices = new Set<number>();
    const usedGuessIndices = new Set<number>();

    for (let i = 0; i < 4; i++) {
      if (guessChars[i] === targetChars[i]) {
        bulls++;
        usedTargetIndices.add(i);
        usedGuessIndices.add(i);
      }
    }

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

  const handleSubmitGuess = useCallback(() => {
    if (gameState.gameOver) return;

    if (gameState.currentGuess.length !== 4) {
      toast({
        title: "Need 4 Letters",
        description: "Enter a 4-letter English word before pressing Enter.",
        variant: "destructive",
      });
      return;
    }

    const guess = gameState.currentGuess.toUpperCase();

    if (validWords.size > 0 && !validWords.has(guess)) {
      toast({
        title: "Word Not in Dictionary",
        description: `"${guess}" is not in our 4-letter dictionary.`,
        variant: "destructive",
      });
      return;
    }

    const feedback = calculateFeedback(guess, gameState.targetWord);
    const newAttempts = gameState.attempts + 1;
    const won = feedback.bulls === 4;
    const gameOver = won || newAttempts >= MAX_ATTEMPTS;

    // Auto-eliminate letters when a guess yields 0 Bulls and 0 Cows
    if (feedback.bulls === 0 && feedback.cows === 0) {
      setLetterNotes((prev) => {
        const next = { ...prev };
        for (const ch of guess) {
          if (!next[ch] || next[ch] === "none") {
            next[ch] = "eliminated";
          }
        }
        return next;
      });
    }

    setGameState((prev) => ({
      ...prev,
      guesses: [...prev.guesses, guess],
      feedback: [...prev.feedback, feedback],
      currentGuess: "",
      gameWon: won,
      gameOver,
      attempts: newAttempts,
    }));

    if (won) {
      saveStats({
        played: stats.played + 1,
        won: stats.won + 1,
        streak: stats.streak + 1,
      });
      toast({
        title: "Bullseye! 🎉",
        description: `Cracked "${gameState.targetWord}" in ${newAttempts} ${
          newAttempts === 1 ? "attempt" : "attempts"
        }!`,
      });
    } else if (gameOver) {
      saveStats({
        played: stats.played + 1,
        won: stats.won,
        streak: 0,
      });
      toast({
        title: "Out of Attempts",
        description: `The secret word was "${gameState.targetWord}". Try another round!`,
        variant: "destructive",
      });
    }
  }, [gameState, validWords, stats, toast]);

  const handleRevealHint = () => {
    if (gameState.hintIndex !== null || gameState.gameOver || !gameState.targetWord) return;
    const idx = Math.floor(Math.random() * 4);
    const ch = gameState.targetWord[idx];
    setGameState((prev) => ({ ...prev, hintIndex: idx }));
    setLetterNotes((prev) => ({ ...prev, [ch]: "bull" }));
    toast({
      title: "Clue Unlocked 💡",
      description: `Position #${idx + 1} is "${ch}"!`,
    });
  };

  const cycleLetterNote = useCallback((letter: string) => {
    const order: NoteState[] = ["none", "eliminated", "cow", "bull"];
    setLetterNotes((prev) => {
      const current = prev[letter] || "none";
      const next = order[(order.indexOf(current) + 1) % order.length];
      return { ...prev, [letter]: next };
    });
  }, []);

  const handleLetterAction = useCallback(
    (letter: string) => {
      setPressedKey(letter);
      setTimeout(() => setPressedKey(null), 140);

      if (noteMode) {
        cycleLetterNote(letter);
        return;
      }

      if (gameState.gameOver || gameState.currentGuess.length >= 4) return;
      setGameState((prev) => ({
        ...prev,
        currentGuess: (prev.currentGuess + letter).slice(0, 4),
      }));
    },
    [noteMode, cycleLetterNote, gameState.gameOver, gameState.currentGuess.length]
  );

  const handleBackspace = useCallback(() => {
    setPressedKey("BACKSPACE");
    setTimeout(() => setPressedKey(null), 140);
    if (gameState.gameOver) return;
    setGameState((prev) => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }));
  }, [gameState.gameOver]);

  const getKeycapStyle = (letter: string, state: NoteState) => {
    const isTypedInCurrent = gameState.currentGuess.includes(letter);
    const isPressed = pressedKey === letter;

    const pressTransform = isPressed
      ? "translate-y-[2px] border-b"
      : "border-b-[3px] hover:-translate-y-[1px] active:translate-y-[2px] active:border-b";

    if (state === "bull") {
      return `${pressTransform} border-emerald-500/70 border-b-emerald-700 bg-emerald-500/25 text-emerald-300 shadow-[0_4px_14px_rgba(16,185,129,0.22)]`;
    }
    if (state === "cow") {
      return `${pressTransform} border-amber-400/70 border-b-amber-700 bg-amber-500/25 text-amber-200 shadow-[0_4px_14px_rgba(251,191,36,0.20)]`;
    }
    if (state === "eliminated") {
      return `${pressTransform} border-border/40 border-b-black/40 bg-secondary/25 text-muted-foreground/35 line-through`;
    }
    if (isTypedInCurrent) {
      return `${pressTransform} border-primary border-b-primary/80 bg-primary/25 text-foreground ring-1 ring-primary/50 shadow-sm`;
    }
    return `${pressTransform} border-border border-b-black/60 bg-secondary/85 text-foreground hover:border-primary/50 hover:bg-secondary`;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Column: Active 4-Tile Input + Tactile QWERTY Mechanical Keyboard + Stats (7 Cols) */}
      <div className="bento-card rounded-3xl p-5 sm:p-8 lg:col-span-7 flex flex-col justify-between">
        <div>
          {/* Top Header & Controls */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-border bg-secondary/80 p-1.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 font-mono text-base font-extrabold text-emerald-400">
                  B
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 font-mono text-base font-extrabold text-amber-400">
                  C
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Bulls &amp; Cows Studio
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  4-Letter Codebreaker · {gameState.attempts}/{MAX_ATTEMPTS} Attempts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRules(!showRules)}
                className="rounded-full border-border bg-secondary/50 font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                <HelpCircle className="mr-1.5 h-3.5 w-3.5 text-primary" />
                Rules
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRevealHint}
                disabled={gameState.hintIndex !== null || gameState.gameOver}
                className="rounded-full border-amber-400/40 bg-amber-400/10 font-mono text-xs text-amber-400 hover:bg-amber-400/20 disabled:opacity-40"
              >
                <Lightbulb className="mr-1.5 h-3.5 w-3.5" />
                {gameState.hintIndex !== null
                  ? `Pos #${gameState.hintIndex + 1}: ${gameState.targetWord[gameState.hintIndex]}`
                  : "1 Hint"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetGame}
                className="rounded-full border-primary/40 bg-primary/10 font-mono text-xs text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                New Word
              </Button>
            </div>
          </div>

          {/* Expandable Rules Banner */}
          {showRules && (
            <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/[0.06] p-4 text-xs leading-relaxed text-foreground/90">
              <div className="mb-1.5 font-mono font-bold uppercase tracking-wider text-primary">
                How Deduction Works:
              </div>
              <ul className="space-y-1 font-sans">
                <li>
                  • <strong className="text-emerald-400">Bull (B)</strong> = A letter in your guess is in the secret word AND in the exact right spot.
                </li>
                <li>
                  • <strong className="text-amber-400">Cow (C)</strong> = A letter in your guess is in the secret word, but in a different spot.
                </li>
                <li>
                  • <strong className="text-primary">Right-click any keycap</strong> (or toggle <strong className="text-amber-400">Mark Notes</strong>) to color-code letters as Eliminated, Cow, or Bull!
                </li>
              </ul>
            </div>
          )}

          {/* 4-Tile Kinetic Input Area */}
          {!gameState.gameOver && wordList.length > 0 && (
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-center gap-3 sm:gap-4">
                {[0, 1, 2, 3].map((slot) => {
                  const char = gameState.currentGuess[slot] || "";
                  const isActiveCursor = slot === gameState.currentGuess.length;
                  const isHintSlot = gameState.hintIndex === slot;
                  return (
                    <div
                      key={slot}
                      onClick={() => {
                        if (slot < gameState.currentGuess.length) {
                          setGameState((prev) => ({
                            ...prev,
                            currentGuess: prev.currentGuess.slice(0, slot),
                          }));
                        }
                      }}
                      className={`relative flex h-16 w-16 sm:h-20 sm:w-20 cursor-pointer select-none items-center justify-center rounded-2xl border-2 font-mono text-2xl sm:text-3xl font-bold transition-all ${
                        char
                          ? "border-primary bg-primary/15 text-foreground shadow-glow-primary animate-tile-pop"
                          : isActiveCursor
                            ? "border-primary/70 bg-secondary/70 text-foreground ring-2 ring-primary/20"
                            : isHintSlot
                              ? "border-emerald-500/45 bg-emerald-500/10 text-emerald-400/50"
                              : "border-border bg-secondary/40 text-muted-foreground"
                      }`}
                    >
                      {char || (isHintSlot ? gameState.targetWord[slot] : "")}
                      {isActiveCursor && !char && (
                        <span className="h-6 w-0.5 animate-pulse bg-primary" />
                      )}
                      <span className="absolute bottom-1.5 right-2 font-mono text-[9px] font-normal text-muted-foreground/60">
                        0{slot + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Optional Direct Keyboard Input Bar */}
              <div className="mx-auto flex max-w-sm items-center gap-2">
                <div className="relative flex-1">
                  <Keyboard className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    aria-label="Type 4-letter guess"
                    value={gameState.currentGuess}
                    onChange={(e) =>
                      setGameState((prev) => ({
                        ...prev,
                        currentGuess: e.target.value
                          .replace(/[^A-Za-z]/g, "")
                          .slice(0, 4)
                          .toUpperCase(),
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmitGuess();
                      }
                    }}
                    placeholder="Type here or tap QWERTY keys..."
                    maxLength={4}
                    className="w-full rounded-xl border border-border bg-secondary/60 pl-10 pr-4 py-2 text-center font-mono text-xs uppercase tracking-widest text-foreground placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Win / Loss Outcome Banner */}
          {gameState.gameWon && (
            <div className="mb-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-center">
              <Trophy className="mx-auto mb-2 h-8 w-8 text-emerald-400" />
              <div className="font-display text-xl font-bold text-foreground">
                Code Cracked:{" "}
                <span className="font-mono text-emerald-400">{gameState.targetWord}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-emerald-400">
                Solved in {gameState.attempts} of {MAX_ATTEMPTS} attempts!
              </p>
              <Button
                onClick={resetGame}
                size="sm"
                className="mt-4 rounded-full bg-emerald-500 px-5 font-display text-xs font-bold text-black hover:bg-emerald-400"
              >
                Play Another Round
              </Button>
            </div>
          )}

          {gameState.gameOver && !gameState.gameWon && (
            <div className="mb-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-center">
              <div className="font-display text-xl font-bold text-foreground">
                Target Word:{" "}
                <span className="font-mono text-rose-400">{gameState.targetWord}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-rose-400">
                Out of attempts — ready for a rematch?
              </p>
              <Button
                onClick={resetGame}
                size="sm"
                className="mt-4 rounded-full bg-primary px-5 font-display text-xs font-bold text-primary-foreground hover:opacity-90"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Tactile 3-Row Mechanical QWERTY Keyboard */}
          <div className="rounded-2xl border border-border bg-card/70 p-3.5 sm:p-5 shadow-inner">
            <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground">
                  {noteMode ? "🎨 Note-Marking Mode" : "⌨️ Mechanical QWERTY"}
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground">
                  {noteMode
                    ? "(Tap keys to cycle Eliminated → Cow → Bull)"
                    : "(Tap to type · Right-click any key to mark notes)"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {Object.keys(letterNotes).length > 0 && (
                  <button
                    type="button"
                    onClick={() => setLetterNotes({})}
                    className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear Marks
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setNoteMode(!noteMode)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase transition-all ${
                    noteMode
                      ? "border-amber-400/60 bg-amber-400/20 text-amber-400 shadow-sm"
                      : "border-border bg-secondary/70 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sparkles className="h-3 w-3" />
                  {noteMode ? "Mark Notes: ON" : "Mark Notes: OFF"}
                </button>
              </div>
            </div>

            {/* 3 Staggered QWERTY Rows */}
            <div className="space-y-2 select-none">
              {/* Row 1: Q W E R T Y U I O P */}
              <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
                {QWERTY_ROWS[0].map((letter) => {
                  const state = letterNotes[letter] || "none";
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => handleLetterAction(letter)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        cycleLetterNote(letter);
                      }}
                      className={`relative flex h-11 sm:h-12 items-center justify-center rounded-xl border font-mono text-xs sm:text-sm font-bold transition-all ${getKeycapStyle(
                        letter,
                        state
                      )}`}
                    >
                      {letter}
                      {state !== "none" && (
                        <span
                          className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${
                            state === "bull"
                              ? "bg-emerald-400"
                              : state === "cow"
                                ? "bg-amber-400"
                                : "bg-muted-foreground/40"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Row 2: A S D F G H J K L (Indented like a physical keyboard) */}
              <div className="px-3 sm:px-6 grid grid-cols-9 gap-1.5 sm:gap-2">
                {QWERTY_ROWS[1].map((letter) => {
                  const state = letterNotes[letter] || "none";
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => handleLetterAction(letter)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        cycleLetterNote(letter);
                      }}
                      className={`relative flex h-11 sm:h-12 items-center justify-center rounded-xl border font-mono text-xs sm:text-sm font-bold transition-all ${getKeycapStyle(
                        letter,
                        state
                      )}`}
                    >
                      {letter}
                      {state !== "none" && (
                        <span
                          className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${
                            state === "bull"
                              ? "bg-emerald-400"
                              : state === "cow"
                                ? "bg-amber-400"
                                : "bg-muted-foreground/40"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Row 3: ENTER + Z X C V B N M + BACKSPACE */}
              <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handleSubmitGuess}
                  disabled={gameState.gameOver || gameState.currentGuess.length !== 4}
                  className="col-span-2 flex h-11 sm:h-12 items-center justify-center gap-1 rounded-xl border border-primary/50 border-b-[3px] border-b-primary/80 bg-gradient-primary font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:opacity-95 active:translate-y-[2px] active:border-b disabled:opacity-40 disabled:pointer-events-none"
                >
                  <span>ENTER</span>
                  <CornerDownLeft className="h-3 w-3 hidden sm:inline" />
                </button>

                <div className="col-span-6 grid grid-cols-7 gap-1.5 sm:gap-2">
                  {QWERTY_ROWS[2].map((letter) => {
                    const state = letterNotes[letter] || "none";
                    return (
                      <button
                        key={letter}
                        type="button"
                        onClick={() => handleLetterAction(letter)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          cycleLetterNote(letter);
                        }}
                        className={`relative flex h-11 sm:h-12 items-center justify-center rounded-xl border font-mono text-xs sm:text-sm font-bold transition-all ${getKeycapStyle(
                          letter,
                          state
                        )}`}
                      >
                        {letter}
                        {state !== "none" && (
                          <span
                            className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${
                              state === "bull"
                                ? "bg-emerald-400"
                                : state === "cow"
                                  ? "bg-amber-400"
                                  : "bg-muted-foreground/40"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleBackspace}
                  disabled={gameState.gameOver || gameState.currentGuess.length === 0}
                  aria-label="Backspace"
                  className="col-span-2 flex h-11 sm:h-12 items-center justify-center gap-1 rounded-xl border border-border border-b-[3px] border-b-black/60 bg-secondary/90 font-mono text-[10px] sm:text-xs font-bold uppercase text-foreground transition-all hover:border-primary/50 active:translate-y-[2px] active:border-b disabled:opacity-40"
                >
                  <Delete className="h-4 w-4" />
                  <span className="hidden sm:inline">DEL</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center font-mono">
          <div className="rounded-xl bg-secondary/40 py-2 border border-border/60">
            <div className="text-lg font-bold text-foreground">{stats.played}</div>
            <div className="text-[10px] uppercase text-muted-foreground">Played</div>
          </div>
          <div className="rounded-xl bg-secondary/40 py-2 border border-border/60">
            <div className="text-lg font-bold text-emerald-400">
              {stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%
            </div>
            <div className="text-[10px] uppercase text-muted-foreground">Win Rate</div>
          </div>
          <div className="rounded-xl bg-secondary/40 py-2 border border-border/60">
            <div className="text-lg font-bold text-primary">{stats.streak} 🔥</div>
            <div className="text-[10px] uppercase text-muted-foreground">Streak</div>
          </div>
        </div>
      </div>

      {/* Right Column: 8-Slot Telemetry Guess Log (5 Cols) */}
      <div className="bento-card rounded-3xl p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
        <div>
          <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
            <div>
              <h4 className="font-display text-lg font-bold text-foreground">
                Deduction Telemetry Log
              </h4>
              <p className="font-mono text-xs text-muted-foreground">
                Bulls (Exact Match) · Cows (Misplaced)
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-border bg-secondary/50 font-mono text-[10px] text-foreground"
            >
              {MAX_ATTEMPTS - gameState.attempts} LEFT
            </Badge>
          </div>

          <div className="space-y-2.5">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
              const guess = gameState.guesses[index];
              const fb = gameState.feedback[index];

              if (!guess) {
                return (
                  <div
                    key={index}
                    className="flex h-12 items-center justify-between rounded-xl border border-border/50 bg-secondary/20 px-4 font-mono text-xs text-muted-foreground/45"
                  >
                    <span>ATTEMPT 0{index + 1}</span>
                    <span>— — — —</span>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className="flex h-12 items-center justify-between rounded-xl border border-border bg-secondary/65 px-4 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      0{index + 1}
                    </span>
                    <div className="flex gap-1.5">
                      {guess.split("").map((ch, idx) => (
                        <span
                          key={idx}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card font-mono text-sm font-bold text-foreground"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 font-bold ${
                        fb.bulls > 0
                          ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                          : "border-border bg-secondary text-muted-foreground"
                      }`}
                    >
                      B:{fb.bulls}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 font-bold ${
                        fb.cows > 0
                          ? "border-amber-500/40 bg-amber-500/20 text-amber-400"
                          : "border-border bg-secondary text-muted-foreground"
                      }`}
                    >
                      C:{fb.cows}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-secondary/35 p-3.5 font-mono text-[11px] text-muted-foreground">
          <strong className="text-foreground">Pro Tip:</strong> When a guess returns{" "}
          <span className="text-foreground font-semibold">B:0 C:0</span>, all 4 letters in that word are automatically crossed out on your QWERTY keyboard!
        </div>
      </div>
    </div>
  );
};

export default BullsAndCows;
