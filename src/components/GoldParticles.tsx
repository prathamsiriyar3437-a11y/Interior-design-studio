import { useEffect, useRef } from "react";

const COLORS = ["#FFD700", "#D4AF37", "#F4E2A1", "#B8860B"];

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  twinkle: number;
  tSpeed: number;
  base: number;
};

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const count = reduced ? 0 : isMobile ? 28 : 58;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const particles: P[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const isDark = () => document.documentElement.classList.contains("dark");

    const updateBlend = () => {
      canvas.style.mixBlendMode = isDark() ? "screen" : "normal";
    };
    updateBlend();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    for (let i = 0; i < count; i++) {
      const r = rand(1, 4);
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: rand(-0.12, 0.12),
        vy: rand(-0.12, 0.12),
        r,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        twinkle: Math.random() * Math.PI * 2,
        tSpeed: rand(0.004, 0.014),
        base: rand(0.25, 0.6),
      });
    }

    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    let paused = document.hidden;
    const R = 150;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (paused) return;

      ctx.clearRect(0, 0, w, h);

      const dark = isDark();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / R) * 0.045;
            p.vx += (dx / d) * f + (-dy / d) * f * 1.4;
            p.vy += (dy / d) * f + (dx / d) * f * 1.4;
          }
        }

        p.vx *= 0.975;
        p.vy *= 0.975;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp < 0.05) {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        p.twinkle += p.tSpeed;
        const alpha = p.base + Math.sin(p.twinkle) * 0.22;

        ctx.globalAlpha = Math.max(0.05, Math.min(dark ? 0.85 : 0.5, alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = dark ? p.r * 3.5 : p.r * 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const onVis = () => {
      paused = document.hidden;
    };

    let observer: MutationObserver | null = null;

    if (count > 0) {
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVis);
      observer = new MutationObserver(updateBlend);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      observer?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
