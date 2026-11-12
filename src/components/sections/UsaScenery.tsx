import { useState, useEffect } from "react";
import { ROAD_TRIP_STOPS, SceneryPhoto } from "@/data/usaScenery";
import {
  Camera,
  MapPin,
  Compass,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Mountain,
  Route,
  Sparkles,
} from "lucide-react";

const UsaScenery = () => {
  const [activeStopIdx, setActiveStopIdx] = useState<number>(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [isAutoDriving, setIsAutoDriving] = useState<boolean>(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<SceneryPhoto | null>(null);

  const currentStop = ROAD_TRIP_STOPS[activeStopIdx];
  const currentPhoto =
    currentStop.photos[activePhotoIdx] || currentStop.photos[0];

  const selectStop = (index: number) => {
    setActiveStopIdx(index);
    setActivePhotoIdx(0);
  };

  const stepRoute = (dir: -1 | 1) => {
    const nextIdx =
      (activeStopIdx + dir + ROAD_TRIP_STOPS.length) % ROAD_TRIP_STOPS.length;
    selectStop(nextIdx);
  };

  useEffect(() => {
    const handleSelectStop = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      if (typeof idx === "number" && idx >= 0 && idx < ROAD_TRIP_STOPS.length) {
        setActiveStopIdx(idx);
        setActivePhotoIdx(0);
      }
    };
    window.addEventListener("select-road-trip-stop", handleSelectStop);
    return () => window.removeEventListener("select-road-trip-stop", handleSelectStop);
  }, []);

  useEffect(() => {
    if (!isAutoDriving) return;
    const timer = setInterval(() => {
      setActiveStopIdx((prev) => (prev + 1) % ROAD_TRIP_STOPS.length);
      setActivePhotoIdx(0);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoDriving]);

  const progressPercent =
    ((activeStopIdx + 1) / ROAD_TRIP_STOPS.length) * 100;

  return (
    <section
      id="scenery"
      className="py-24 md:py-32 relative overflow-hidden border-t border-border"
    >
      {/* Dynamic Landscape-Matched Ambient Aura */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[580px] rounded-full blur-[150px] transition-all duration-1000 opacity-60"
        style={{ background: currentStop.glowStyle }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
              <Route className="w-3.5 h-3.5" />
              <span>06 // Chronological West Coast Road Trip</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Arizona to San Diego{" "}
              <span className="font-serif italic font-normal text-chromatic">
                in 9 stops.
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base mt-2.5 leading-relaxed">
              Every frame below was shot on my road trip from{" "}
              <span className="text-foreground font-medium">
                Arizona ➔ Zion ➔ Las Vegas ➔ Death Valley ➔ Sequoia ➔ Yosemite ➔ San Francisco ➔ Big Sur & LA ➔ San Diego
              </span>{" "}
              and custom color-graded with warm film curves. Click any stop along
              the route to drive through the journey.
            </p>
          </div>

          {/* Auto-Drive & Prev/Next Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAutoDriving((v) => !v)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs transition-all border ${
                isAutoDriving
                  ? "bg-gradient-primary text-primary-foreground font-semibold border-transparent shadow-md"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
            >
              {isAutoDriving ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Auto-Drive</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-primary" />
                  <span>Auto-Drive Route</span>
                </>
              )}
            </button>

            <div className="inline-flex items-center rounded-full bg-card border border-border p-1">
              <button
                onClick={() => stepRoute(-1)}
                aria-label="Previous stop"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 font-mono text-xs font-semibold text-foreground">
                Leg {currentStop.legNumber} / 09
              </span>
              <button
                onClick={() => stepRoute(1)}
                aria-label="Next stop"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive 9-Stop Highway Route Stepper */}
        <div className="bento-card rounded-3xl p-4 sm:p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-3">
            <span className="flex items-center gap-1.5 text-foreground font-semibold">
              <Compass className="w-3.5 h-3.5 text-primary" />
              {currentStop.routeTransition}
            </span>
            <span>
              Cumulative Distance:{" "}
              <strong className="text-foreground">
                {currentStop.milesCumulative}
              </strong>{" "}
              · Elevation:{" "}
              <strong className="text-foreground">{currentStop.elevation}</strong>
            </span>
          </div>

          {/* Highway Progress Line */}
          <div className="relative h-2 w-full rounded-full bg-secondary overflow-hidden mb-4 border border-border/60">
            <div
              className="h-full rounded-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 9 Interactive Stop Nodes */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {ROAD_TRIP_STOPS.map((stop, idx) => {
              const isCurrent = idx === activeStopIdx;
              const isVisited = idx <= activeStopIdx;
              return (
                <button
                  key={stop.id}
                  onClick={() => selectStop(idx)}
                  className={`group text-left p-2.5 rounded-2xl border transition-all duration-200 ${
                    isCurrent
                      ? "bg-primary/15 border-primary ring-1 ring-primary/30 shadow-sm"
                      : isVisited
                        ? "bg-secondary/75 border-border hover:border-primary/40"
                        : "bg-secondary/35 border-border/60 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        isCurrent ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {stop.legNumber} · {stop.stateCode}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-transform ${
                        isCurrent
                          ? "scale-125 bg-primary"
                          : isVisited
                            ? "bg-foreground/60"
                            : "bg-muted-foreground/30"
                      }`}
                    />
                  </div>
                  <div className="font-display text-xs font-semibold text-foreground truncate">
                    {stop.shortLabel}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground truncate">
                    {stop.milesCumulative}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Stop Showcase Theater */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          {/* Left 8 Cols: Adaptive Color-Graded Film Viewer */}
          <div className="lg:col-span-8 bento-card rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between">
            {/* Top Film Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 px-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold border border-primary/40 bg-primary/15 text-primary">
                  Leg {currentStop.legNumber} · {currentStop.routeTransition}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  {currentPhoto.gradeProfile}
                </span>
              </div>

              <button
                onClick={() => setLightboxPhoto(currentPhoto)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 hover:bg-secondary border border-border font-mono text-xs text-foreground transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-primary" />
                <span>Full-Res Lightbox</span>
              </button>
            </div>

            {/* Adaptive Stage: Never chops vertical photos! Uses blurred film backdrop for portraits */}
            <div
              onClick={() => setLightboxPhoto(currentPhoto)}
              className="relative w-full h-[380px] sm:h-[490px] rounded-2xl overflow-hidden bg-[#0E0C0A] border border-border cursor-pointer group flex items-center justify-center"
            >
              {/* Ambient Blurred Color-Matched Backdrop */}
              <img
                src={currentPhoto.src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-45 brightness-75 pointer-events-none"
              />

              {/* Crisp Full-Composition Foreground Image */}
              <img
                src={currentPhoto.src}
                alt={`${currentPhoto.title} — ${currentPhoto.location}`}
                className={`relative z-10 transition-transform duration-700 group-hover:scale-[1.02] ${
                  currentPhoto.orientation === "landscape"
                    ? "w-full h-full object-cover"
                    : "h-full w-auto max-w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.85)] rounded-lg"
                }`}
              />

              {/* Translucent See-Through Caption Bar */}
              <div className="absolute inset-x-3 bottom-3 z-20 px-4 py-2.5 rounded-2xl bg-black/25 backdrop-blur-[5px] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A59]" />
                    <span>{currentPhoto.location}</span>
                    <span className="text-white/50">·</span>
                    <span style={{ color: "#FAF6F0" }}>{currentPhoto.coordinates}</span>
                  </div>
                  <h3
                    className="font-display text-lg sm:text-xl font-bold mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                    style={{ color: "#FAF6F0" }}
                  >
                    {currentPhoto.title}
                  </h3>
                </div>

                {currentStop.photos.length > 1 && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/15 shrink-0"
                  >
                    {currentStop.photos.map((p, pIdx) => (
                      <button
                        key={p.id}
                        onClick={() => setActivePhotoIdx(pIdx)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all ${
                          activePhotoIdx === pIdx
                            ? "bg-gradient-to-r from-[#FF7A59] to-amber-400 text-[#14100D] font-semibold"
                            : "hover:opacity-100 opacity-85"
                        }`}
                        style={
                          activePhotoIdx === pIdx
                            ? undefined
                            : { color: "#FAF6F0" }
                        }
                      >
                        Shot 0{pIdx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Stop Story, Telemetry & Secondary Angle Switcher */}
          <div className="lg:col-span-4 bento-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    STOP {currentStop.legNumber} OF 09
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-0.5">
                    {currentStop.stopName}
                  </h3>
                </div>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-sm font-bold border border-primary/35 bg-primary/15 text-primary">
                  {currentStop.stateCode}
                </div>
              </div>

              {/* Field Log Narrative */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold mb-1.5">
                  ROAD TRIP LOG
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentStop.story}
                </p>
              </div>

              {/* Active Frame Notes */}
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-primary font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-primary" />
                    FRAME NOTES
                  </span>
                  <span>{currentPhoto.dateLabel}</span>
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed">
                  {currentPhoto.caption}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Elevation: {currentStop.elevation}</span>
                  <span>Odometer: {currentStop.milesCumulative}</span>
                </div>
              </div>

              {/* Stop Thumbnails */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  FRAMES AT THIS STOP ({currentStop.photos.length})
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {currentStop.photos.map((photo, pIdx) => (
                    <button
                      key={photo.id}
                      onClick={() => setActivePhotoIdx(pIdx)}
                      className={`group relative rounded-xl overflow-hidden border p-1.5 text-left transition-all ${
                        activePhotoIdx === pIdx
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border bg-secondary/40 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="aspect-[16/10] w-full rounded-lg overflow-hidden mb-1.5 bg-[#0E0C0A]">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-mono text-[10px] text-foreground truncate">
                        0{pIdx + 1} · {photo.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Next Stop Button */}
            <div className="pt-5 mt-5 border-t border-border flex items-center justify-between gap-3">
              <button
                onClick={() => stepRoute(-1)}
                className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border font-mono text-xs text-foreground transition-colors"
              >
                ← Prev
              </button>
              <button
                onClick={() => stepRoute(1)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold font-mono text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-opacity"
              >
                <span>
                  Next:{" "}
                  {
                    ROAD_TRIP_STOPS[
                      (activeStopIdx + 1) % ROAD_TRIP_STOPS.length
                    ].shortLabel
                  }
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* All 9 Stops Visual Postcard Strip */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Mountain className="w-3.5 h-3.5 text-primary" />
              <span>COMPLETE 9-LEG POSTCARD ARCHIVE (CLICK ANY STOP TO JUMP)</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {ROAD_TRIP_STOPS.map((stop, idx) => {
              const cover = stop.photos[0];
              const isSelected = idx === activeStopIdx;
              return (
                <button
                  key={stop.id}
                  onClick={() => selectStop(idx)}
                  className={`group relative rounded-2xl overflow-hidden border text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/40 -translate-y-1"
                      : "border-border opacity-85 hover:opacity-100 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="aspect-[3/4] w-full bg-[#120F0C] relative overflow-hidden">
                    <img
                      src={cover.src}
                      alt={stop.stopName}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/55 backdrop-blur-md border border-white/20 font-mono text-[10px]"
                      style={{ color: "#FDE68A" }}
                    >
                      {stop.legNumber} · {stop.stateCode}
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p
                        className="font-display text-xs font-bold leading-tight"
                        style={{ color: "#FAF6F0" }}
                      >
                        {stop.shortLabel}
                      </p>
                      <p
                        className="font-mono text-[9px] mt-0.5 truncate"
                        style={{ color: "#D5CBBF" }}
                      >
                        {cover.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bento-card rounded-3xl overflow-hidden border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-card/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 bg-[#090706] flex items-center justify-center max-h-[75vh] overflow-hidden relative">
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.title}
                  className="w-full h-full max-h-[75vh] object-contain"
                />
              </div>

              <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-card text-foreground">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-mono text-xs font-semibold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{lightboxPhoto.dateLabel}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {lightboxPhoto.title}
                  </h3>

                  <div className="flex items-center gap-2 font-mono text-xs text-primary">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{lightboxPhoto.location}</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border">
                    {lightboxPhoto.caption}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border space-y-2 font-mono text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>GPS Coordinates</span>
                    <span className="text-foreground font-semibold">
                      {lightboxPhoto.coordinates}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Color Grade</span>
                    <span className="text-primary font-semibold">
                      {lightboxPhoto.gradeProfile}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UsaScenery;
