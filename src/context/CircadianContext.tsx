import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export type CircadianPhase = "sunrise" | "day" | "sunset" | "night";

export interface CircadianState {
  /** Minutes from 00:00 (0 to 1439) */
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  isAutoPlaying: boolean;
  setIsAutoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isSyncedToRealTime: boolean;
  syncToRealTime: () => void;
  phase: CircadianPhase;
  phaseLabel: string;
  phaseSubLabel: string;
  formattedTime12: string;
  formattedTime24: string;
  solarAltitudeDeg: number;
  /** 0..360 rotation angle where 12:00 noon puts Sun at top (0 deg) and 00:00 midnight puts Moon at top (180 deg) */
  celestialRotationDeg: number;
  /** Continuous circular trajectory coordinates (0% to 100%) for the sky gradient orb */
  orbXPercent: number;
  orbYPercent: number;
  /** Continuous starfield visibility (0 to 1) */
  starFieldOpacity: number;
}

const CircadianContext = createContext<CircadianState | null>(null);

function getRealLocalMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function getPhaseFromMinutes(mins: number): CircadianPhase {
  const m = ((mins % 1440) + 1440) % 1440;
  // 05:30 (330) to 09:00 (540) -> Sunrise
  if (m >= 330 && m < 540) return "sunrise";
  // 09:00 (540) to 16:45 (1005) -> Bright Daylight
  if (m >= 540 && m < 1005) return "day";
  // 16:45 (1005) to 20:15 (1215) -> Golden Sunset
  if (m >= 1005 && m < 1215) return "sunset";
  // 20:15 to 05:30 -> Night
  return "night";
}

const PHASE_META: Record<
  CircadianPhase,
  {
    label: string;
    subLabel: string;
    cssVars: Record<string, string>;
    colorScheme: "dark" | "light";
  }
> = {
  sunrise: {
    label: "Golden Sunrise",
    subLabel: "Eastern Horizon · Dawn Coral & Warm Amber",
    colorScheme: "dark",
    cssVars: {
      "--background": "16 26% 6.5%",
      "--foreground": "36 45% 96%",
      "--card": "16 22% 10%",
      "--card-foreground": "36 45% 96%",
      "--popover": "16 24% 8.5%",
      "--popover-foreground": "36 45% 96%",
      "--primary": "18 92% 62%",
      "--primary-foreground": "16 28% 6%",
      "--secondary": "18 20% 15%",
      "--secondary-foreground": "36 45% 96%",
      "--muted": "18 18% 13.5%",
      "--muted-foreground": "24 18% 70%",
      "--accent": "38 96% 60%",
      "--accent-foreground": "16 28% 6%",
      "--border": "20 22% 18%",
      "--input": "20 22% 18%",
      "--ring": "18 92% 62%",
      "--brand-accent": "#FF7A59",
      "--gradient-primary":
        "linear-gradient(135deg, hsl(350 88% 65%), hsl(22 95% 60%), hsl(42 96% 58%))",
      "--glow-primary": "0 0 44px hsl(22 95% 60% / 0.30)",
      "--glow-accent": "0 0 44px hsl(38 96% 60% / 0.28)",
      "--sky-aura-1": "rgba(251, 113, 133, 0.20)",
      "--sky-aura-2": "rgba(251, 146, 60, 0.22)",
      "--sky-aura-3": "rgba(250, 204, 21, 0.14)",
      "--chromatic-grad": "linear-gradient(120deg, #FB7185 0%, #FB923C 50%, #FACC15 100%)",
    },
  },
  day: {
    label: "Solar Daylight",
    subLabel: "Zenith Sun · Warm Alabaster & Sandstone",
    colorScheme: "light",
    cssVars: {
      "--background": "38 44% 94%",
      "--foreground": "24 32% 10%",
      "--card": "40 50% 98%",
      "--card-foreground": "24 32% 10%",
      "--popover": "40 50% 98%",
      "--popover-foreground": "24 32% 10%",
      "--primary": "14 86% 50%",
      "--primary-foreground": "40 50% 98%",
      "--secondary": "36 30% 88%",
      "--secondary-foreground": "24 32% 12%",
      "--muted": "36 28% 89%",
      "--muted-foreground": "24 16% 36%",
      "--accent": "160 72% 34%",
      "--accent-foreground": "40 50% 98%",
      "--border": "32 24% 82%",
      "--input": "32 24% 82%",
      "--ring": "14 86% 50%",
      "--brand-accent": "#E85535",
      "--gradient-primary":
        "linear-gradient(135deg, hsl(14 86% 50%), hsl(36 92% 48%), hsl(160 72% 36%))",
      "--glow-primary": "0 12px 36px hsl(14 86% 50% / 0.22)",
      "--glow-accent": "0 12px 36px hsl(160 72% 34% / 0.20)",
      "--sky-aura-1": "rgba(251, 191, 36, 0.26)",
      "--sky-aura-2": "rgba(56, 189, 248, 0.18)",
      "--sky-aura-3": "rgba(249, 115, 22, 0.16)",
      "--chromatic-grad": "linear-gradient(120deg, #D9381E 0%, #D97706 48%, #059669 100%)",
    },
  },
  sunset: {
    label: "Kodachrome Sunset",
    subLabel: "Western Horizon · Canyon Terracotta & Gold",
    colorScheme: "dark",
    cssVars: {
      "--background": "24 18% 5.5%",
      "--foreground": "38 38% 96%",
      "--card": "24 16% 8.5%",
      "--card-foreground": "38 38% 96%",
      "--popover": "24 18% 7.5%",
      "--popover-foreground": "38 38% 96%",
      "--primary": "14 90% 60%",
      "--primary-foreground": "24 20% 6%",
      "--secondary": "26 16% 13.5%",
      "--secondary-foreground": "38 38% 96%",
      "--muted": "25 14% 12.5%",
      "--muted-foreground": "32 14% 68%",
      "--accent": "158 64% 48%",
      "--accent-foreground": "24 20% 6%",
      "--border": "28 16% 16%",
      "--input": "28 16% 16%",
      "--ring": "14 90% 60%",
      "--brand-accent": "#FF7A59",
      "--gradient-primary":
        "linear-gradient(135deg, hsl(14 90% 60%), hsl(38 96% 58%), hsl(158 64% 48%))",
      "--glow-primary": "0 0 44px hsl(14 90% 60% / 0.28)",
      "--glow-accent": "0 0 44px hsl(158 64% 48% / 0.26)",
      "--sky-aura-1": "rgba(245, 94, 61, 0.22)",
      "--sky-aura-2": "rgba(251, 169, 44, 0.18)",
      "--sky-aura-3": "rgba(44, 201, 141, 0.11)",
      "--chromatic-grad": "linear-gradient(120deg, #FF7A59 0%, #FBBF24 46%, #34D399 100%)",
    },
  },
  night: {
    label: "Astral Midnight",
    subLabel: "Starlit Cosmos · Lunar Violet & Aurora Mint",
    colorScheme: "dark",
    cssVars: {
      "--background": "252 28% 4.5%",
      "--foreground": "240 30% 96%",
      "--card": "252 24% 7.5%",
      "--card-foreground": "240 30% 96%",
      "--popover": "252 26% 6.5%",
      "--popover-foreground": "240 30% 96%",
      "--primary": "262 86% 74%",
      "--primary-foreground": "252 30% 6%",
      "--secondary": "252 20% 13%",
      "--secondary-foreground": "240 30% 96%",
      "--muted": "252 18% 12%",
      "--muted-foreground": "248 14% 68%",
      "--accent": "168 76% 48%",
      "--accent-foreground": "252 30% 6%",
      "--border": "252 20% 16%",
      "--input": "252 20% 16%",
      "--ring": "262 86% 74%",
      "--brand-accent": "#A78BFA",
      "--gradient-primary":
        "linear-gradient(135deg, hsl(262 86% 74%), hsl(198 90% 60%), hsl(168 76% 48%))",
      "--glow-primary": "0 0 44px hsl(262 86% 74% / 0.28)",
      "--glow-accent": "0 0 44px hsl(168 76% 48% / 0.26)",
      "--sky-aura-1": "rgba(167, 139, 250, 0.18)",
      "--sky-aura-2": "rgba(56, 189, 248, 0.13)",
      "--sky-aura-3": "rgba(45, 212, 191, 0.11)",
      "--chromatic-grad": "linear-gradient(120deg, #C084FC 0%, #60A5FA 48%, #2DD4BF 100%)",
    },
  },
};

export const CircadianProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [minutes, setMinutesState] = useState<number>(() => getRealLocalMinutes());
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isSyncedToRealTime, setIsSyncedToRealTime] = useState<boolean>(true);

  const setMinutes: React.Dispatch<React.SetStateAction<number>> = (val) => {
    setIsSyncedToRealTime(false);
    setMinutesState((prev) => {
      const next = typeof val === "function" ? val(prev) : val;
      return ((Math.round(next) % 1440) + 1440) % 1440;
    });
  };

  const syncToRealTime = () => {
    setIsAutoPlaying(false);
    setIsSyncedToRealTime(true);
    setMinutesState(getRealLocalMinutes());
  };

  useEffect(() => {
    if (!isSyncedToRealTime || isAutoPlaying) return;
    const id = setInterval(() => {
      setMinutesState(getRealLocalMinutes());
    }, 30000);
    return () => clearInterval(id);
  }, [isSyncedToRealTime, isAutoPlaying]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    setIsSyncedToRealTime(false);
    const id = setInterval(() => {
      setMinutesState((prev) => (prev + 6) % 1440);
    }, 45);
    return () => clearInterval(id);
  }, [isAutoPlaying]);

  const phase = useMemo(() => getPhaseFromMinutes(minutes), [minutes]);
  const meta = PHASE_META[phase];

  const {
    formattedTime12,
    formattedTime24,
    solarAltitudeDeg,
    celestialRotationDeg,
    orbXPercent,
    orbYPercent,
    starFieldOpacity,
  } = useMemo(() => {
    const m = ((minutes % 1440) + 1440) % 1440;
    const hrs = Math.floor(m / 60);
    const mins = m % 60;
    const period = hrs >= 12 ? "PM" : "AM";
    const hrs12 = hrs % 12 === 0 ? 12 : hrs % 12;

    const f24 = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    const f12 = `${String(hrs12).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${period}`;

    // Full 360° circular orbit:
    // At 06:00 (360m, Sunrise): angle = PI (left side, x = 12%, y = 38%)
    // At 12:00 (720m, Noon): angle = PI/2 (top center, x = 50%, y = 6%)
    // At 18:00 (1080m, Sunset): angle = 0 (right side, x = 88%, y = 38%)
    // At 00:00 (0m, Midnight): angle = -PI/2 (bottom center, x = 50%, y = 72%)
    const theta = Math.PI - ((m - 360) / 1440) * Math.PI * 2;
    const orbX = Math.round((50 + 40 * Math.cos(theta)) * 10) / 10;
    const orbY = Math.round((40 - 34 * Math.sin(theta)) * 10) / 10;

    const alt = Math.round(Math.sin(theta) * 68);
    const rot = ((m - 720) / 1440) * 360;

    // Starfield opacity: 1.0 deep night, ~0.25 twilight (sunrise/sunset), 0.0 during bright day
    let stars = 0;
    if (phase === "night") {
      stars = 0.95;
    } else if (phase === "sunrise" || phase === "sunset") {
      stars = 0.22;
    } else {
      stars = 0;
    }

    return {
      formattedTime12: f12,
      formattedTime24: f24,
      solarAltitudeDeg: alt,
      celestialRotationDeg: rot,
      orbXPercent: orbX,
      orbYPercent: orbY,
      starFieldOpacity: stars,
    };
  }, [minutes, phase]);

  // Apply CSS variables and dynamic circular orb position to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-phase", phase);
    root.style.colorScheme = meta.colorScheme;
    Object.entries(meta.cssVars).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });
    root.style.setProperty("--orb-x", `${orbXPercent}%`);
    root.style.setProperty("--orb-y", `${orbYPercent}%`);
  }, [phase, meta, orbXPercent, orbYPercent]);

  return (
    <CircadianContext.Provider
      value={{
        minutes,
        setMinutes,
        isAutoPlaying,
        setIsAutoPlaying,
        isSyncedToRealTime,
        syncToRealTime,
        phase,
        phaseLabel: meta.label,
        phaseSubLabel: meta.subLabel,
        formattedTime12,
        formattedTime24,
        solarAltitudeDeg,
        celestialRotationDeg,
        orbXPercent,
        orbYPercent,
        starFieldOpacity,
      }}
    >
      {children}
    </CircadianContext.Provider>
  );
};

export const useCircadian = () => {
  const ctx = useContext(CircadianContext);
  if (!ctx) {
    throw new Error("useCircadian must be used within a CircadianProvider");
  }
  return ctx;
};
