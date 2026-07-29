import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type PerfTier = "high" | "balanced" | "performance";

export type PerfProfile = {
  tier: PerfTier;
  reducedMotion: boolean;
  /** number of floating particles to render */
  particles: number;
  /** whether cursor-reactive lighting should run */
  cursorLight: boolean;
  /** whether animated gradient blobs should move */
  animatedBlobs: boolean;
  /** whether parallax transforms should be applied */
  parallax: boolean;
  /** multiplier for framer-motion durations */
  motionScale: number;
};

const DEFAULT: PerfProfile = {
  tier: "balanced",
  reducedMotion: false,
  particles: 8,
  cursorLight: false,
  animatedBlobs: true,
  parallax: true,
  motionScale: 1,
};

const PerfContext = createContext<PerfProfile>(DEFAULT);

export const usePerf = () => useContext(PerfContext);

function profileFor(tier: PerfTier, reducedMotion: boolean): PerfProfile {
  if (reducedMotion) {
    return { tier: "performance", reducedMotion: true, particles: 0, cursorLight: false, animatedBlobs: false, parallax: false, motionScale: 0.01 };
  }
  if (tier === "high") {
    return { tier, reducedMotion, particles: 14, cursorLight: true, animatedBlobs: true, parallax: true, motionScale: 1 };
  }
  if (tier === "balanced") {
    return { tier, reducedMotion, particles: 6, cursorLight: true, animatedBlobs: true, parallax: true, motionScale: 0.85 };
  }
  return { tier, reducedMotion, particles: 0, cursorLight: false, animatedBlobs: false, parallax: false, motionScale: 0.6 };
}

function detectTier(): PerfTier {
  if (typeof window === "undefined") return "balanced";
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return "performance";
  const mem = nav.deviceMemory ?? 4;
  const cores = nav.hardwareConcurrency ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;

  if (mem <= 2 || cores <= 2) return "performance";
  if (coarse || small) return mem >= 8 && cores >= 8 ? "balanced" : "performance";
  if (mem >= 8 && cores >= 8) return "high";
  return "balanced";
}

export function PerfProvider({ children }: { children: ReactNode }) {
  // SSR-stable first render, then upgrade/downgrade after hydration.
  const [tier, setTier] = useState<PerfTier>("balanced");
  const [reducedMotion, setReducedMotion] = useState(false);
  const downgraded = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onRM = () => setReducedMotion(mq.matches);
    onRM();
    mq.addEventListener("change", onRM);
    setTier(detectTier());
    return () => mq.removeEventListener("change", onRM);
  }, []);

  // Runtime FPS watchdog: sustained low frame rate downgrades one level.
  useEffect(() => {
    if (reducedMotion || downgraded.current) return;
    let raf = 0;
    let frames = 0;
    let start = performance.now();
    let slowWindows = 0;

    const tick = (t: number) => {
      frames++;
      const dt = t - start;
      if (dt >= 1000) {
        const fps = (frames * 1000) / dt;
        frames = 0;
        start = t;
        if (fps < 45) slowWindows++;
        else slowWindows = Math.max(0, slowWindows - 1);
        if (slowWindows >= 3) {
          downgraded.current = true;
          setTier((p) => (p === "high" ? "balanced" : "performance"));
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tier, reducedMotion]);

  const profile = useMemo(() => profileFor(tier, reducedMotion), [tier, reducedMotion]);

  useEffect(() => {
    document.documentElement.dataset.perf = profile.tier;
    document.documentElement.dataset.motion = profile.reducedMotion ? "reduced" : "full";
  }, [profile.tier, profile.reducedMotion]);

  return <PerfContext.Provider value={profile}>{children}</PerfContext.Provider>;
}
