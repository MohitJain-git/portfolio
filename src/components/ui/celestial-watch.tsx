import React, { useState } from "react";
import { useCircadian, CircadianPhase } from "@/context/CircadianContext";
import {
  Sunrise,
  Sun,
  Sunset,
  MoonStar,
  Play,
  Pause,
  RotateCcw,
  Clock,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const PRESETS: {
  id: CircadianPhase;
  label: string;
  timeLabel: string;
  minutes: number;
  icon: React.ReactNode;
}[] = [
  {
    id: "sunrise",
    label: "Sunrise",
    timeLabel: "06:45 AM",
    minutes: 6 * 60 + 45,
    icon: <Sunrise className="w-3.5 h-3.5" />,
  },
  {
    id: "day",
    label: "Daylight",
    timeLabel: "01:00 PM",
    minutes: 13 * 60,
    icon: <Sun className="w-3.5 h-3.5" />,
  },
  {
    id: "sunset",
    label: "Sunset",
    timeLabel: "06:30 PM",
    minutes: 18 * 60 + 30,
    icon: <Sunset className="w-3.5 h-3.5" />,
  },
  {
    id: "night",
    label: "Night",
    timeLabel: "11:15 PM",
    minutes: 23 * 60 + 15,
    icon: <MoonStar className="w-3.5 h-3.5" />,
  },
];

export const CelestialWatchBar: React.FC = () => {
  const {
    minutes,
    setMinutes,
    isAutoPlaying,
    setIsAutoPlaying,
    isSyncedToRealTime,
    syncToRealTime,
    phase,
    phaseLabel,
    phaseSubLabel,
    formattedTime12,
    formattedTime24,
    solarAltitudeDeg,
    celestialRotationDeg,
  } = useCircadian();

  // Compute mechanical watch hand angles
  const minuteHandDeg = (minutes % 60) * 6;
  const hourHandDeg = ((minutes % 720) / 720) * 360;

  // Dynamic sky dome gradient inside the watch face
  const domeGradient =
    phase === "sunrise"
      ? "linear-gradient(180deg, #3B1D38 0%, #C85A53 52%, #F6AD55 100%)"
      : phase === "day"
        ? "linear-gradient(180deg, #1E88E5 0%, #64B5F6 58%, #FFF3C4 100%)"
        : phase === "sunset"
          ? "linear-gradient(180deg, #1F1429 0%, #B83B2B 48%, #F59E0B 100%)"
          : "linear-gradient(180deg, #070714 0%, #151432 60%, #271E4A 100%)";

  return (
    <div className="bento-card rounded-3xl p-4 sm:p-5 mb-9 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left 4 Cols: Mechanical Celestial Sun/Moon Watch Complication */}
        <div className="lg:col-span-4 flex items-center gap-4">
          <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-full p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.45)] border border-primary/35"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(255,122,89,0.28), rgba(251,191,36,0.35), rgba(167,139,250,0.28), rgba(255,122,89,0.28))",
            }}
          >
            {/* Inner Horology Case */}
            <div
              className="relative w-full h-full rounded-full overflow-hidden border border-white/20"
              style={{
                background: domeGradient,
                transition: "background 0.6s ease",
              }}
            >
              {/* Twinkling Stars Layer (Strongest at Night & Sunset/Sunrise) */}
              <div
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                style={{
                  opacity:
                    phase === "night"
                      ? 0.95
                      : phase === "day"
                        ? 0
                        : 0.45,
                }}
              >
                <span className="absolute top-3 left-5 w-1 h-1 rounded-full bg-white animate-pulse" />
                <span className="absolute top-5 right-6 w-1 h-1 rounded-full bg-amber-200 animate-ping" />
                <span className="absolute top-8 left-8 w-0.5 h-0.5 rounded-full bg-white" />
                <span className="absolute top-4 left-1/2 w-1 h-1 rounded-full bg-violet-200" />
              </div>

              {/* Rotating Celestial Disc (Sun & Moon 180° Apart) */}
              <div
                className="absolute inset-1 rounded-full pointer-events-none"
                style={{
                  transform: `rotate(${celestialRotationDeg}deg)`,
                  transition: isAutoPlaying
                    ? "transform 45ms linear"
                    : "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {/* Sun at 12 o'clock of disc */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-7 h-7 rounded-full bg-amber-300/50 blur-[6px] animate-pulse" />
                    <svg
                      viewBox="0 0 32 32"
                      className="w-6 h-6 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                    >
                      <circle cx="16" cy="16" r="7" fill="#FDE047" />
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                        (deg) => (
                          <line
                            key={deg}
                            x1="16"
                            y1="2.5"
                            x2="16"
                            y2="6"
                            stroke="#FACC15"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            transform={`rotate(${deg} 16 16)`}
                          />
                        )
                      )}
                    </svg>
                  </div>
                </div>

                {/* Moon at 6 o'clock of disc (rotates to top at midnight) */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rotate-180 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-6 h-6 rounded-full bg-indigo-300/40 blur-[5px]" />
                    <svg
                      viewBox="0 0 28 28"
                      className="w-5 h-5 drop-shadow-[0_0_6px_rgba(199,210,254,0.9)]"
                    >
                      <path
                        d="M18.5 4.2A9.5 9.5 0 1 0 23.8 18a7.8 7.8 0 0 1-5.3-13.8Z"
                        fill="#E0E7FF"
                      />
                      <circle cx="12" cy="14" r="1.1" fill="#A5B4FC" opacity="0.6" />
                      <circle cx="15" cy="18" r="0.8" fill="#A5B4FC" opacity="0.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Lower Horizon Silhouette & Mechanical Watch Hands */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* 24-hour chapter ring ticks */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = i * 15;
                  const isMajor = i % 6 === 0;
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1={isMajor ? "2" : "3"}
                      x2="50"
                      y2={isMajor ? "7" : "5.5"}
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth={isMajor ? "1.4" : "0.7"}
                      transform={`rotate(${angle} 50 50)`}
                    />
                  );
                })}

                {/* Sculpted Mountain Horizon Mask in lower third */}
                <path
                  d="M 0 68 Q 22 57 42 66 T 78 60 L 100 68 L 100 100 L 0 100 Z"
                  fill="rgba(12, 10, 14, 0.86)"
                />
                <path
                  d="M 0 68 Q 22 57 42 66 T 78 60 L 100 68"
                  fill="none"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="0.9"
                />

                {/* Mechanical Hour Hand */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="30"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  transform={`rotate(${hourHandDeg} 50 50)`}
                />
                {/* Mechanical Minute Hand */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="20"
                  stroke="#FBBF24"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  transform={`rotate(${minuteHandDeg} 50 50)`}
                />
                {/* Center Pinion Jewel */}
                <circle cx="50" cy="50" r="3" fill="#FF7A59" stroke="#FFF" strokeWidth="1" />

                {/* Digital Sub-dial Readout inside lower bezel */}
                <text
                  x="50"
                  y="84"
                  textAnchor="middle"
                  fill="#FAF6F0"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  {formattedTime24}
                </text>
              </svg>
            </div>
          </div>

          {/* Horology Telemetry Text */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 font-mono text-[10px] uppercase tracking-wider text-primary">
              <Clock className="w-3 h-3" />
              <span>{ isSyncedToRealTime ? "Live Local Sky" : "Interactive Sky Lab" }</span>
            </div>
            <div className="font-display text-lg sm:text-xl font-bold text-foreground flex items-baseline gap-2">
              <span>{phaseLabel}</span>
              <span className="font-mono text-xs font-semibold text-primary">
                {formattedTime12}
              </span>
            </div>
            <p className="font-mono text-[11px] text-muted-foreground">
              {phaseSubLabel} · Sun Alt:{" "}
              <span className="text-foreground font-semibold">
                {solarAltitudeDeg > 0 ? `+${solarAltitudeDeg}°` : `${solarAltitudeDeg}°`}
              </span>
            </p>
          </div>
        </div>

        {/* Right 8 Cols: Interactive 24-Hour Gradient Scrubber Bar & Presets */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="circadian-time-scrubber"
              className="font-mono text-xs text-muted-foreground flex items-center gap-2"
            >
              <span className="uppercase tracking-wider font-semibold text-foreground">
                Drag Time-of-Day Bar to Test Atmosphere:
              </span>
              <span className="hidden sm:inline text-[11px]">
                (Shifts site gradients from Sunrise → Bright Day → Sunset → Night)
              </span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoPlaying((p) => !p)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs border transition-all ${
                  isAutoPlaying
                    ? "bg-primary text-primary-foreground border-primary font-semibold shadow-sm"
                    : "bg-secondary/70 text-foreground border-border hover:border-primary/50"
                }`}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause 24h Flow</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-primary" />
                    <span>Auto-Flow 24h</span>
                  </>
                )}
              </button>

              {!isSyncedToRealTime && (
                <button
                  type="button"
                  onClick={syncToRealTime}
                  title="Reset to your current wall-clock time"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border font-mono text-[11px] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Live Clock</span>
                </button>
              )}
            </div>
          </div>

          {/* 24-Hour Full-Spectrum Horizon Scrubber Bar */}
          <div className="relative py-1.5">
            <div
              className="h-3.5 w-full rounded-full p-[2px] shadow-inner border border-border/80"
              style={{
                background:
                  "linear-gradient(90deg, #0D0B26 0%, #2B193D 18%, #FB7185 28%, #FBBF24 42%, #38BDF8 54%, #FDE047 64%, #FF7A59 76%, #A855F7 88%, #0D0B26 100%)",
              }}
            >
              <input
                id="circadian-time-scrubber"
                type="range"
                min={0}
                max={1439}
                step={5}
                value={minutes}
                aria-label="Time of day gradient scrubber (00:00 to 23:59)"
                onChange={(e) => {
                  setIsAutoPlaying(false);
                  setMinutes(Number(e.target.value));
                }}
                className="circadian-range-slider w-full h-full appearance-none bg-transparent cursor-pointer"
              />
            </div>

            {/* Hour Ruler Ticks Below Slider */}
            <div className="flex justify-between font-mono text-[10px] text-muted-foreground mt-1 px-1 select-none">
              <span>00:00 Night</span>
              <span>06:30 Sunrise</span>
              <span>12:00 Bright Day</span>
              <span>18:30 Sunset</span>
              <span>23:59</span>
            </div>
          </div>

          {/* 4 Quick Phase Jump Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
            {PRESETS.map((preset) => {
              const isActive = phase === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setMinutes(preset.minutes);
                  }}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-xl border font-mono text-xs transition-all ${
                    isActive
                      ? "bg-primary/15 border-primary text-foreground font-semibold shadow-sm"
                      : "bg-secondary/45 border-border/70 text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className={isActive ? "text-primary" : ""}>
                      {preset.icon}
                    </span>
                    <span>{preset.label}</span>
                  </span>
                  <span className="text-[10px] opacity-80">{preset.timeLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Floating Mini Celestial Watch Controller so the user can test the gradient flow
 * while scrolling anywhere on the portfolio.
 */
export const FloatingCelestialDock: React.FC = () => {
  const {
    minutes,
    setMinutes,
    isAutoPlaying,
    setIsAutoPlaying,
    phase,
    phaseLabel,
    formattedTime12,
    celestialRotationDeg,
  } = useCircadian();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="bento-card rounded-2xl border border-primary/35 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300">
        {expanded ? (
          <div className="p-3.5 w-72 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full border border-primary/40 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background:
                      phase === "day"
                        ? "linear-gradient(180deg,#38BDF8,#FDE047)"
                        : phase === "sunset"
                          ? "linear-gradient(180deg,#1F1429,#FF7A59)"
                          : phase === "sunrise"
                            ? "linear-gradient(180deg,#3B1D38,#FB7185)"
                            : "linear-gradient(180deg,#070714,#312E81)",
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ transform: `rotate(${celestialRotationDeg}deg)` }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_6px_#FDE047]" />
                  </div>
                </div>
                <div>
                  <div className="font-display text-xs font-bold text-foreground">
                    {phaseLabel}
                  </div>
                  <div className="font-mono text-[10px] text-primary">
                    {formattedTime12}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((p) => !p)}
                  className="p-1.5 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 transition-colors"
                  title={isAutoPlaying ? "Pause 24h flow" : "Auto-play 24h flow"}
                >
                  {isAutoPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"
                  aria-label="Minimize sky controller"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="h-2.5 w-full rounded-full p-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, #0D0B26 0%, #FB7185 28%, #38BDF8 52%, #FF7A59 76%, #0D0B26 100%)",
              }}
            >
              <input
                type="range"
                min={0}
                max={1439}
                step={5}
                value={minutes}
                aria-label="Scrub time of day"
                onChange={(e) => {
                  setIsAutoPlaying(false);
                  setMinutes(Number(e.target.value));
                }}
                className="circadian-range-slider w-full h-full appearance-none bg-transparent cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-4 gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setMinutes(p.minutes);
                  }}
                  className={`py-1 px-1.5 rounded-lg font-mono text-[10px] border transition-all ${
                    phase === p.id
                      ? "bg-primary text-primary-foreground border-primary font-semibold"
                      : "bg-secondary/60 text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-primary/10 transition-colors"
            aria-label="Open time-of-day gradient controller"
          >
            <span className="text-primary">
              {phase === "day" ? (
                <Sun className="w-4 h-4" />
              ) : phase === "sunrise" ? (
                <Sunrise className="w-4 h-4" />
              ) : phase === "sunset" ? (
                <Sunset className="w-4 h-4" />
              ) : (
                <MoonStar className="w-4 h-4" />
              )}
            </span>
            <span className="font-mono text-xs text-foreground font-semibold">
              {formattedTime12}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
              · {phaseLabel}
            </span>
            <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

// Deterministic delicate starfield coordinates (48 tiny stars across the night sky)
const NIGHT_STARS = Array.from({ length: 48 }, (_, i) => {
  const x = ((i * 73 + 19) % 96) + 2;
  const y = ((i * 41 + 11) % 88) + 3;
  const size = i % 7 === 0 ? 2.4 : i % 3 === 0 ? 1.8 : 1.2;
  const delay = ((i * 0.37) % 4).toFixed(2);
  const color =
    i % 6 === 0
      ? "#FDE68A" // warm starlight gold
      : i % 4 === 0
        ? "#C4B5FD" // soft lavender star
        : i % 5 === 0
          ? "#BAE6FD" // ice blue star
          : "#FAF6F0"; // crisp white star
  return { id: i, x, y, size, delay, color };
});

/**
 * Global Circadian Sky Backdrop:
 * 1. Moves the glowing Sunrise/Day/Sunset Orange-Gold gradient orb in a full 360° circle
 *    from Left (Sunrise) -> Top-Center (Noon) -> Right (Sunset) -> Bottom (Night).
 * 2. Renders a delicate bunch of twinkling stars in the background during Nighttime.
 */
export const CircadianSkyBackdrop: React.FC = () => {
  const {
    phase,
    orbXPercent,
    orbYPercent,
    starFieldOpacity,
    isAutoPlaying,
  } = useCircadian();

  const orbGradient =
    phase === "sunrise"
      ? "radial-gradient(circle, rgba(255, 122, 89, 0.42) 0%, rgba(251, 146, 60, 0.26) 38%, rgba(251, 113, 133, 0.12) 65%, transparent 100%)"
      : phase === "day"
        ? "radial-gradient(circle, rgba(251, 191, 36, 0.38) 0%, rgba(249, 115, 22, 0.20) 40%, rgba(56, 189, 248, 0.12) 68%, transparent 100%)"
        : phase === "sunset"
          ? "radial-gradient(circle, rgba(255, 107, 74, 0.44) 0%, rgba(245, 158, 11, 0.26) 40%, rgba(244, 63, 94, 0.12) 68%, transparent 100%)"
          : "radial-gradient(circle, rgba(167, 139, 250, 0.30) 0%, rgba(56, 189, 248, 0.16) 45%, rgba(45, 212, 191, 0.08) 70%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle 360° Circular Orbital Path Guide */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-20"
      >
        <ellipse
          cx="500"
          cy="400"
          rx="400"
          ry="340"
          fill="none"
          stroke={phase === "day" ? "rgba(217, 119, 6, 0.25)" : "rgba(255, 180, 140, 0.18)"}
          strokeWidth="1.2"
          strokeDasharray="5 9"
        />
      </svg>

      {/* Moving Circular Solar / Sunset / Lunar Gradient Blob (Left -> Top -> Right -> Bottom) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] sm:w-[740px] sm:h-[740px] rounded-full blur-[95px]"
        style={{
          left: `${orbXPercent}%`,
          top: `${orbYPercent}%`,
          background: orbGradient,
          transition: isAutoPlaying
            ? "left 45ms linear, top 45ms linear, background 0.4s ease"
            : "left 320ms cubic-bezier(0.22, 1, 0.36, 1), top 320ms cubic-bezier(0.22, 1, 0.36, 1), background 0.5s ease",
        }}
      />

      {/* Inner Concentrated Sun / Sunset Core that travels along the exact same circle */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-60 sm:h-60 rounded-full blur-[48px]"
        style={{
          left: `${orbXPercent}%`,
          top: `${orbYPercent}%`,
          background:
            phase === "night"
              ? "radial-gradient(circle, rgba(224, 231, 255, 0.22) 0%, transparent 75%)"
              : "radial-gradient(circle, rgba(255, 160, 70, 0.38) 0%, rgba(255, 107, 74, 0.18) 55%, transparent 80%)",
          transition: isAutoPlaying
            ? "left 45ms linear, top 45ms linear"
            : "left 320ms cubic-bezier(0.22, 1, 0.36, 1), top 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Delicate Nighttime Starfield */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: starFieldOpacity }}
      >
        {NIGHT_STARS.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow:
                star.size > 2
                  ? `0 0 6px ${star.color}`
                  : `0 0 3px ${star.color}`,
              animationDuration: `${2.4 + (star.id % 4) * 0.8}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
