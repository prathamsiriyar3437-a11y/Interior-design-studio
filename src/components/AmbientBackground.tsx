import { useEffect, useMemo, useRef } from "react";
import { usePerf } from "@/lib/perf";

/**
 * Fixed ambient backdrop: gradient blobs + cursor-reactive lighting + particles.
 * Zero React state during pointer movement — the cursor light is driven by
 * rAF + lerped CSS variables written directly to the DOM.
 */
export function AmbientBackground() {
  const { cursorLight, animatedBlobs, particles } = usePerf();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorLight) return;
    const el = rootRef.current;
    if (!el) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.35;
    let cx = tx;
    let cy = ty;
    let raf = 0;
    let idle = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      idle = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      // lerp toward the cursor for a soft, trailing light
      cx += (tx - cx) * 0.075;
      cy += (ty - cy) * 0.075;
      el.style.setProperty("--mx", `${(cx / window.innerWidth) * 100}%`);
      el.style.setProperty("--my", `${(cy / window.innerHeight) * 100}%`);
      const settled = Math.abs(tx - cx) < 0.5 && Math.abs(ty - cy) < 0.5;
      if (settled && ++idle > 12) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cursorLight]);

  const dots = useMemo(
    () =>
      Array.from({ length: particles }, (_, i) => ({
        left: `${(i * 37 + 11) % 96}%`,
        top: `${(i * 53 + 19) % 92}%`,
        size: 3 + ((i * 7) % 5),
        delay: `${(i * 1.37) % 9}s`,
        duration: `${14 + ((i * 3) % 10)}s`,
      })),
    [particles],
  );

  return (
    <div ref={rootRef} aria-hidden className="ambient-root" data-cursor={cursorLight ? "on" : "off"}>
      <div className="ambient-base" />
      <div className={`ambient-blob ambient-blob-1 ${animatedBlobs ? "is-animated" : ""}`} />
      <div className={`ambient-blob ambient-blob-2 ${animatedBlobs ? "is-animated" : ""}`} />
      <div className={`ambient-blob ambient-blob-3 ${animatedBlobs ? "is-animated" : ""}`} />
      {cursorLight && <div className="ambient-cursor" />}
      {dots.length > 0 && (
        <div className="ambient-particles">
          {dots.map((d, i) => (
            <span
              key={i}
              style={{
                left: d.left,
                top: d.top,
                width: d.size,
                height: d.size,
                animationDelay: d.delay,
                animationDuration: d.duration,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
