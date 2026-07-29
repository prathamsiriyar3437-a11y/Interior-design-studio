import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PerfProvider, usePerf } from "@/lib/perf";
import { AmbientBackground } from "@/components/AmbientBackground";
import {
  Phone, MapPin, Star, ArrowRight, ArrowLeft, ArrowUp, MessageCircle, Menu, X, Moon, Sun,
  Sofa, Briefcase, Building2, Layers, Lightbulb, Hammer, Box, Wand2, ShieldCheck, Sparkles,
  CheckCircle2, Send, Clock, Instagram, Facebook, Navigation, CalendarDays, Ruler, PenTool,
} from "lucide-react";

import hero from "@/assets/hero-living.jpg";
import pKitchen from "@/assets/p-kitchen.jpg";
import pBedroom from "@/assets/p-bedroom.jpg";
import pVilla from "@/assets/p-villa.jpg";
import pOffice from "@/assets/p-office.jpg";
import pDining from "@/assets/p-dining.jpg";
import pWardrobe from "@/assets/p-wardrobe.jpg";
import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";
import bedroomMasterAsset from "@/assets/bedroom-master.png.asset.json";
import bedroomArchAsset from "@/assets/bedroom-arch.png.asset.json";
import foyerGrandAsset from "@/assets/foyer-grand.png.asset.json";
import studyNookAsset from "@/assets/study-nook.png.asset.json";
import windowSeatAsset from "@/assets/window-seat.png.asset.json";
const bedroomMaster = bedroomMasterAsset.url;
const bedroomArch = bedroomArchAsset.url;
const foyerGrand = foyerGrandAsset.url;
const studyNook = studyNookAsset.url;
const windowSeat = windowSeatAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interior Design Studio Mangalore — Spaces Designed to Inspire" },
      { name: "description", content: "Premium interior design studio & products showroom in Mangalore. Residential, commercial and custom interiors, materials and consultation. Visit our studio." },
      { property: "og:title", content: "Interior Design Studio Mangalore — Spaces Designed to Inspire" },
      { property: "og:description", content: "Distinctive interiors in Mangalore where architecture, craftsmanship and timeless design come together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "InteriorDesigner",
        name: "Interior Design Studio",
        telephone: "+91-8050805046",
        areaServed: "Mangalore, Karnataka",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Near Canara Springs, Maroli",
          addressLocality: "Mangaluru",
          addressRegion: "Karnataka",
          postalCode: "575005",
          addressCountry: "IN",
        },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "33" },
      }),
    }],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <PerfProvider>
      <Home />
    </PerfProvider>
  );
}

const PHONE = "08050805046";
const WA = "918050805046";
const ADDRESS = "Near Canara Springs, Maroli, Mangaluru, Karnataka 575005";
const MAPS = "https://www.google.com/maps?q=Maroli+Mangaluru+Karnataka+575005";
const EASE = [0.22, 1, 0.36, 1] as const;

const NAV = [
  ["Home", "home"], ["About", "about"], ["Services", "services"], ["Portfolio", "portfolio"],
  ["Products", "products"], ["Consultation", "consultation"], ["Contact", "contact"],
] as const;

function Home() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = (id: string) => {
    setMenu(false);
    setTransitioning(true);
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: "auto" });
      }
      window.setTimeout(() => setTransitioning(false), 380);
    }, 260);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") { document.documentElement.classList.add("dark"); setDark(true); }
  }, []);
  useEffect(() => {
    const on = () => { setScrolled(window.scrollY > 40); setShowTop(window.scrollY > 600); };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const toggleDark = () => {
    const next = !dark; setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  return (
    <div className="min-h-screen relative">
      <AmbientBackground />
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] origin-left" />

      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 glass ${scrolled ? "shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)]" : "bg-transparent border-transparent backdrop-blur-md"}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-20">
          <button onClick={() => goTo("home")} className="flex items-center gap-3 group">
            <span className="grid place-items-center h-10 w-10 rounded-full border border-gold text-gold font-display text-xl">I</span>
            <span className="hidden sm:flex flex-col leading-tight text-left">
              <span className={`font-display text-lg tracking-wide ${scrolled ? "text-foreground" : "text-white"}`}>Interior Design</span>
              <span className={`text-[10px] tracking-[0.3em] ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>STUDIO · MANGALORE</span>
            </span>
          </button>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map(([l, id]) => (
              <button key={id} onClick={() => goTo(id)} className={`text-sm font-medium tracking-wide transition-colors relative group ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"}`}>
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700 ease-out" />
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleDark} aria-label="Toggle theme" className={`grid place-items-center h-10 w-10 rounded-full border transition ${scrolled ? "border-border hover:bg-secondary" : "border-white/30 text-white hover:bg-white/10"}`}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => goTo("consultation")} className="hidden md:inline-flex items-center gap-2 rounded-full liquid-glass text-foreground px-5 py-2.5 text-sm font-semibold">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => setMenu(true)} aria-label="Open menu" className={`lg:hidden grid place-items-center h-10 w-10 rounded-full border ${scrolled ? "border-border" : "border-white/30 text-white"}`}>
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md lg:hidden" onClick={() => setMenu(false)}>
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 26 }} onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] arch-glass bg-background/90 p-8 flex flex-col">
              <button onClick={() => setMenu(false)} aria-label="Close menu" className="self-end grid place-items-center h-10 w-10 rounded-full border border-border"><X className="h-4 w-4" /></button>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map(([l, id]) => (
                  <button key={id} onClick={() => goTo(id)} className="py-3 border-b border-border font-display text-2xl hover:text-gold transition text-left">{l}</button>
                ))}
              </nav>
              <button onClick={() => goTo("consultation")} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold text-black px-5 py-3 font-semibold">Book a Consultation</button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glass transition veil */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[65] pointer-events-none bg-white/10 dark:bg-black/20 border-y border-white/10"
          >
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.5, ease: EASE }}
              className="absolute top-0 left-0 h-[2px] w-full bg-gold origin-left" />
          </motion.div>
        )}
      </AnimatePresence>

      <Hero goTo={goTo} />
      <Marquee />
      <About />
      <Services />
      <Portfolio />
      <Showroom />
      <BeforeAfter />
      <Products />
      <WhyUs />
      <Process />
      <Testimonials />
      <Consultation />
      <Presence />
      <Contact />
      <Footer />

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 frosted border-t border-border flex gap-2">
        <a href={`tel:${PHONE}`} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold"><Phone className="h-4 w-4" /> Call</a>
        <button onClick={() => goTo("consultation")} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold text-black py-3 text-sm font-semibold">Book Consultation</button>
      </div>

      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener" aria-label="WhatsApp" className="fixed bottom-24 lg:bottom-6 right-6 z-40 grid place-items-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_20px_40px_-10px_rgba(37,211,102,0.6)] hover:scale-105 transition-transform duration-500">
        <MessageCircle className="h-6 w-6" />
      </a>
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
            className="fixed bottom-24 lg:bottom-6 left-6 z-40 grid place-items-center h-12 w-12 rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition-transform duration-500">
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ goTo }: { goTo: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { parallax } = usePerf();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const y = parallax ? yRaw : undefined;
  const opacity = parallax ? opacityRaw : undefined;

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={hero} alt="Luxury living room interior designed in Mangalore" fetchPriority="high" decoding="async" className="h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, color-mix(in oklab, var(--color-espresso) 72%, transparent), color-mix(in oklab, var(--color-forest) 42%, transparent) 55%, rgba(0,0,0,0.78))" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-32 pb-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.15 }} className="flex items-center gap-3 text-white/90">
          <span className="h-px w-12 bg-gold" />
          <span className="text-xs tracking-[0.4em] uppercase">Interior Studio &amp; Showroom · Mangalore</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
          className="mt-8 text-5xl sm:text-6xl lg:text-8xl font-display leading-[0.95] text-white max-w-5xl">
          Spaces Designed <span className="italic gold-text">to Inspire.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease: EASE, delay: 0.5 }} className="mt-8 max-w-2xl text-lg text-white/80 leading-relaxed">
          Creating distinctive interiors in Mangalore where architecture, functionality, craftsmanship and timeless design come together.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.65 }} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <button onClick={() => goTo("portfolio")} className="group inline-flex items-center gap-3 rounded-full bg-gold text-black px-8 py-4 font-semibold hover:brightness-110 transition shadow-[0_24px_50px_-18px_rgba(201,162,39,0.75)]">
              Explore Our Portfolio <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </button>
          </Magnetic>
          <Magnetic>
            <button onClick={() => goTo("consultation")} className="inline-flex items-center gap-3 rounded-full liquid-glass text-white px-8 py-4 font-semibold">
              Book a Consultation
            </button>
          </Magnetic>
        </motion.div>

        {/* Floating glass card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.85 }}
          className="mt-16 max-w-xl arch-glass rounded-3xl p-7 text-white">
          <div className="text-[11px] tracking-[0.35em] uppercase text-gold">Interior Design • Consultation • Craftsmanship</div>
          <p className="mt-3 font-display text-2xl leading-snug">Transforming ideas into extraordinary spaces.</p>
          <div className="mt-5 flex items-center gap-4 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-gold text-gold" /> 5.0 Google Rating</span>
            <span className="h-4 w-px bg-white/25" />
            <span>Studio in Maroli, Mangalore</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 -mt-6 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="arch-glass rounded-3xl p-6 lg:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Counter to={250} suffix="+" label="Projects Delivered" />
            <Counter to={12} suffix="+" label="Years of Experience" />
            <Counter to={200} suffix="+" label="Happy Clients" />
            <Counter to={99} suffix="%" label="Client Satisfaction" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { tier, reducedMotion } = usePerf();
  const state = useRef({ tx: 0, ty: 0, x: 0, y: 0, raf: 0 });
  const enabled = !reducedMotion && tier !== "performance";

  const loop = useCallback(() => {
    const s = state.current;
    s.x += (s.tx - s.x) * 0.16;
    s.y += (s.ty - s.y) * 0.16;
    if (ref.current) ref.current.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
    if (Math.abs(s.tx - s.x) > 0.15 || Math.abs(s.ty - s.y) > 0.15) s.raf = requestAnimationFrame(loop);
    else s.raf = 0;
  }, []);

  const start = useCallback(() => {
    if (!state.current.raf) state.current.raf = requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => () => { if (state.current.raf) cancelAnimationFrame(state.current.raf); }, []);

  if (!enabled) return <span className="inline-block">{children}</span>;

  return (
    <span
      ref={ref}
      className="inline-block gpu"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        state.current.tx = (e.clientX - r.left - r.width / 2) * 0.18;
        state.current.ty = (e.clientY - r.top - r.height / 2) * 0.25;
        start();
      }}
      onPointerLeave={() => { state.current.tx = 0; state.current.ty = 0; start(); }}
    >
      {children}
    </span>
  );
}

function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let started = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const dur = 1800, start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl lg:text-5xl gold-text">{n}{suffix}</div>
      <div className="mt-2 text-xs lg:text-sm tracking-widest uppercase text-white/70">{label}</div>
    </div>
  );
}

function Marquee() {
  const items = ["Residential Interiors", "Commercial Interiors", "Custom Design", "Furniture", "Lighting", "Materials", "Turnkey Execution", "Consultation"];
  return (
    <div className="py-8 border-y border-border/60 frosted overflow-hidden">
      <div className="flex gap-16 animate-[scroll_42s_linear_infinite] whitespace-nowrap will-change-transform">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-2xl text-muted-foreground flex items-center gap-16">
            {t} <span className="text-copper">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <Section id="about" tone="warm">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}>
          <Kicker>About the Studio</Kicker>
          <h2 className="mt-4 text-4xl lg:text-6xl font-display leading-tight">
            Designing Spaces <span className="italic" style={{ color: "var(--color-terracotta)" }}>With Purpose.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We are an interior design studio and interior products vendor rooted in Mangalore, Karnataka. Our work sits at the meeting point of architecture and everyday life — considered layouts, honest materials and craftsmanship that ages beautifully.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {[
              ["Design philosophy", "Proportion, light and restraint before decoration."],
              ["Material expertise", "Wood, stone, veneer, metal and textile, chosen with care."],
              ["Craftsmanship", "Executed by trusted, long-standing local teams."],
              ["Personalised consultation", "A designer with you from first sketch to handover."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-3">
                <span className="mt-1 h-5 w-5 shrink-0 rounded-full border border-copper grid place-items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                </span>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[["12+", "Years"], ["250+", "Projects"], ["200+", "Clients"]].map(([n, l]) => (
              <div key={l} className="soft-morph rounded-2xl p-4 text-center">
                <div className="font-display text-3xl" style={{ color: "var(--color-emerald)" }}>{n}</div>
                <div className="text-[11px] tracking-widest uppercase text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img src={pVilla} alt="Villa interior in Mangalore" loading="lazy" decoding="async" className="rounded-3xl aspect-[3/4] object-cover w-full" />
            <div className="pt-12 space-y-4">
              <img src={bedroomMaster} alt="Master bedroom interior" loading="lazy" decoding="async" className="rounded-3xl aspect-square object-cover w-full" />
              <img src={pKitchen} alt="Modular kitchen interior" loading="lazy" decoding="async" className="rounded-3xl aspect-square object-cover w-full" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-2 sm:-left-6 rounded-2xl p-5 text-white shadow-xl tinted-emerald">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Rooted in Mangalore</div>
            <div className="mt-2 font-display text-2xl">A studio you can visit.</div>
            <div className="mt-1 text-xs text-white/70">Maroli · Mangaluru, Karnataka</div>
          </div>
          <span className="absolute -top-4 -right-2 h-24 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { icon: Sofa, name: "Residential Interiors", desc: "Homes, apartments and villas designed around how you live.", img: pBedroom, tint: "var(--color-emerald)" },
  { icon: Building2, name: "Commercial Interiors", desc: "Offices, retail, showrooms and hospitality fit-outs.", img: pOffice, tint: "var(--color-navy)" },
  { icon: PenTool, name: "Custom Interior Design", desc: "Bespoke joinery, feature walls and one-off furniture.", img: studyNook, tint: "var(--color-terracotta)" },
  { icon: Ruler, name: "Interior Consultation", desc: "Layouts, palettes and material direction, on your site.", img: windowSeat, tint: "var(--color-teal)" },
  { icon: Box, name: "Furniture & Products", desc: "Curated furniture, lighting, décor and finishes.", img: pWardrobe, tint: "var(--color-copper)" },
  { icon: Wand2, name: "Complete Interior Solutions", desc: "Turnkey delivery — one team, one contract, keys handed over.", img: pDining, tint: "var(--color-burgundy)" },
];

function Services() {
  return (
    <Section id="services" tone="pearl">
      <Header kicker="What we do" title="Services crafted with care" sub="From a single room to a full turnkey space — delivered end to end by one accountable team." />
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <motion.article key={s.name}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 1, ease: EASE }}
            className="group relative overflow-hidden rounded-3xl min-h-[340px] flex flex-col justify-end">
            <img src={s.img} alt={s.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]" />
            <div className="absolute inset-0 transition-opacity duration-700" style={{ background: `linear-gradient(to top, ${s.tint} 88%, transparent 100%)`, opacity: 0.82 }} />
            <div className="relative p-7 text-white">
              <div className="grid place-items-center h-12 w-12 rounded-2xl frosted-dark">
                <s.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-2xl">{s.name}</h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold">
                Discuss this <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition duration-500" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- PORTFOLIO DATA ---------------- */
type Project = {
  title: string;
  cat: string;
  location: string;
  desc: string;
  concept: string;
  services: string[];
  materials: string[];
  completed?: string;
  cover: string;
  gallery: string[];
  before?: string;
  after?: string;
  span?: string;
};

const CATS = ["All Projects", "Our Showroom", "Residential Interiors", "Commercial Interiors", "Custom Designs", "Products & Materials"];

const PROJECTS: Project[] = [
  {
    title: "Illuminated Teakwood Foyer",
    cat: "Residential Interiors",
    location: "Mangalore, Karnataka",
    desc: "A grand double-stair foyer in solid teak with layered cove lighting.",
    concept: "Arched teak portals frame the stair, while warm concealed lighting turns the joinery itself into the ornament.",
    services: ["Design concept", "Custom joinery", "Lighting design", "Turnkey execution"],
    materials: ["Solid teak", "Veneer panelling", "Italian marble", "Antique brass"],
    completed: "2025",
    cover: foyerGrand,
    gallery: [foyerGrand, pDining, pVilla, pWardrobe],
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Walnut Master Suite",
    cat: "Residential Interiors",
    location: "Kadri, Mangalore",
    desc: "A tufted headboard suite with backlit fluted panelling.",
    concept: "Deep walnut tones grounded by a soft ivory bed, with a tropical wallpaper accent for depth.",
    services: ["Bedroom design", "Custom bed & wardrobe", "Lighting"],
    materials: ["Walnut veneer", "Velvet upholstery", "Textured wallpaper"],
    completed: "2025",
    cover: bedroomMaster,
    gallery: [bedroomMaster, bedroomArch, pBedroom],
    before, after,
  },
  {
    title: "Onyx Modular Kitchen",
    cat: "Custom Designs",
    location: "Bejai, Mangalore",
    desc: "A handleless modular kitchen with stone counters and tall storage.",
    concept: "A quiet, hardworking kitchen: matte fronts, warm stone and under-cabinet light.",
    services: ["Modular kitchen", "Hardware selection", "Installation"],
    materials: ["BWP ply", "Acrylic fronts", "Quartz counter", "Soft-close hardware"],
    cover: pKitchen,
    gallery: [pKitchen, pDining, pWardrobe],
  },
  {
    title: "Arched Floral Bedroom",
    cat: "Custom Designs",
    location: "Mangalore, Karnataka",
    desc: "A teal velvet headboard set against an arched wallpaper niche.",
    concept: "One deep-colour gesture and one arch — enough to give a compact bedroom a centre.",
    services: ["Custom headboard", "Wall design", "Accent lighting"],
    materials: ["Teal velvet", "Floral wallpaper", "Brass spotlight"],
    cover: bedroomArch,
    gallery: [bedroomArch, bedroomMaster, windowSeat],
    span: "lg:row-span-2",
  },
  {
    title: "Heritage Office",
    cat: "Commercial Interiors",
    location: "Hampankatta, Mangalore",
    desc: "A boutique office with warm wood, glass cabins and layered lighting.",
    concept: "Professional but not corporate — timber, muted green and clean sightlines.",
    services: ["Space planning", "Workstations", "Cabin joinery", "Turnkey"],
    materials: ["Laminated ply", "Toughened glass", "Acoustic fabric"],
    cover: pOffice,
    gallery: [pOffice, pDining, pVilla],
  },
  {
    title: "Teak Study Nook",
    cat: "Custom Designs",
    location: "Mangalore, Karnataka",
    desc: "A compact study with integrated shelving and warm accent light.",
    concept: "Every centimetre used: desk, shelf and light designed as one piece.",
    services: ["Custom furniture", "Lighting"],
    materials: ["Teak veneer", "Warm LED profile"],
    cover: studyNook,
    gallery: [studyNook, windowSeat, pWardrobe],
  },
  {
    title: "Sunlit Window Lounge",
    cat: "Residential Interiors",
    location: "Surathkal, Mangalore",
    desc: "A bright bedroom corner with a slatted blind and upholstered bench.",
    concept: "Daylight first: soft blue, natural timber and a place to sit with a book.",
    services: ["Bedroom design", "Custom seating"],
    materials: ["Ash timber", "Cotton upholstery"],
    cover: windowSeat,
    gallery: [windowSeat, pBedroom, studyNook],
  },
  {
    title: "Palm Grove Villa",
    cat: "Residential Interiors",
    location: "Ullal, Mangalore",
    desc: "A full-villa turnkey interior across three levels.",
    concept: "Coastal light, deep green joinery and stone floors that stay cool year-round.",
    services: ["Full turnkey", "3D visualisation", "Furniture"],
    materials: ["Kota stone", "Green lacquer", "Rattan"],
    cover: pVilla,
    gallery: [pVilla, pDining, pKitchen, pBedroom],
    span: "lg:col-span-2",
  },
  {
    title: "Crystal Dining Hall",
    cat: "Commercial Interiors",
    location: "Mangalore, Karnataka",
    desc: "A hospitality dining hall with a sculptural lighting installation.",
    concept: "A single chandelier gesture over a quiet, warm-toned room.",
    services: ["Concept design", "Lighting", "Furniture"],
    materials: ["Crystal glass", "Oak", "Brushed brass"],
    cover: pDining,
    gallery: [pDining, pOffice, pVilla],
  },
  {
    title: "Aurora Walk-in Wardrobe",
    cat: "Products & Materials",
    location: "Showroom Display",
    desc: "A walk-in wardrobe system displayed in our Mangalore showroom.",
    concept: "Profile-lit shelving, glass shutters and a full-height mirror module.",
    services: ["Wardrobe systems", "Hardware"],
    materials: ["Aluminium profile", "Smoked glass", "Suede-finish laminate"],
    cover: pWardrobe,
    gallery: [pWardrobe, pKitchen, studyNook],
  },
  {
    title: "Our Studio & Showroom",
    cat: "Our Showroom",
    location: "Maroli, Mangalore",
    desc: "Materials library, product displays and consultation lounge.",
    concept: "A working showroom where clients can touch every finish before choosing it.",
    services: ["Walk-in consultation", "Material selection"],
    materials: ["Veneers", "Laminates", "Stone samples", "Lighting"],
    cover: hero,
    gallery: [hero, pWardrobe, pDining, pKitchen],
    span: "lg:col-span-2",
  },
  {
    title: "Consultation Lounge",
    cat: "Our Showroom",
    location: "Maroli, Mangalore",
    desc: "Where projects begin — drawings, samples and a long table.",
    concept: "A calm, well-lit room designed for long conversations about your home.",
    services: ["Design consultation"],
    materials: ["Oak table", "Linen", "Brass"],
    cover: pBedroom,
    gallery: [pBedroom, hero, pOffice],
  },
];

/* ---------------- PORTFOLIO ---------------- */
function Portfolio() {
  const [cat, setCat] = useState(CATS[0]);
  const [open, setOpen] = useState<Project | null>(null);
  const filtered = PROJECTS.filter(p => cat === CATS[0] || p.cat === cat);

  return (
    <Section id="portfolio" tone="dark">
      <Header light kicker="Portfolio" title="Our work, in detail" sub="Homes, workplaces, custom pieces and our own showroom — a growing record of what we build in Mangalore." />

      <div className="mt-10 flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm border transition duration-500 ${cat === c ? "bg-gold text-black border-gold" : "frosted-dark text-white/80 hover:text-white hover:border-gold/60"}`}>
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[240px] gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.button key={p.title} layout onClick={() => setOpen(p)}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: i * 0.05, duration: 0.9, ease: EASE }}
              className={`group relative overflow-hidden rounded-3xl text-left ${p.span ?? ""}`}>
              <img src={p.cover} alt={p.title} loading="lazy" decoding="async"
                className="h-full w-full object-cover saturate-[0.95] transition-all duration-[1500ms] ease-out group-hover:scale-[1.06] group-hover:saturate-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-white/0 group-hover:border-white/25 transition-all duration-700" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold">{p.cat}</div>
                <div className="mt-1 font-display text-xl lg:text-2xl">{p.title}</div>
                <div className="mt-2 flex items-center gap-2 text-xs text-white/0 group-hover:text-white/85 translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                  View Project <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectDetail project={open} onClose={() => setOpen(null)} onOpen={setOpen} />
    </Section>
  );
}

function ProjectDetail({ project, onClose, onOpen }: { project: Project | null; onClose: () => void; onOpen: (p: Project) => void }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [project]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-xl overflow-y-auto">
          <button onClick={onClose} aria-label="Close project" className="fixed top-5 right-5 z-10 grid place-items-center h-12 w-12 rounded-full frosted-dark text-white"><X className="h-5 w-5" /></button>

          <motion.article initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.7, ease: EASE }}
            className="max-w-6xl mx-auto px-5 py-16 text-white">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10]">
              <AnimatePresence mode="wait">
                <motion.img key={idx} src={project.gallery[idx]} alt={`${project.title} — image ${idx + 1}`}
                  initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover" />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
              {project.gallery.length > 1 && (
                <>
                  <button aria-label="Previous image" onClick={() => setIdx(i => (i - 1 + project.gallery.length) % project.gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full frosted-dark"><ArrowLeft className="h-4 w-4" /></button>
                  <button aria-label="Next image" onClick={() => setIdx(i => (i + 1) % project.gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full frosted-dark"><ArrowRight className="h-4 w-4" /></button>
                </>
              )}
            </div>

            {project.gallery.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
                {project.gallery.map((g, i) => (
                  <button key={i} onClick={() => setIdx(i)} className={`shrink-0 h-20 w-28 rounded-xl overflow-hidden border transition ${i === idx ? "border-gold" : "border-white/15 opacity-70 hover:opacity-100"}`}>
                    <img src={g} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-10 grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="text-[11px] tracking-[0.35em] uppercase text-gold">{project.cat}</div>
                <h3 className="mt-3 font-display text-4xl lg:text-5xl">{project.title}</h3>
                <p className="mt-4 text-white/70 flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-gold" /> {project.location}{project.completed && ` · Completed ${project.completed}`}</p>
                <p className="mt-6 text-lg text-white/85 leading-relaxed">{project.desc}</p>
                <h4 className="mt-8 font-display text-2xl">Design concept</h4>
                <p className="mt-2 text-white/75 leading-relaxed">{project.concept}</p>
              </div>
              <aside className="frosted-dark rounded-3xl p-6 h-fit">
                <div className="text-[11px] tracking-[0.3em] uppercase text-gold">Services provided</div>
                <ul className="mt-3 space-y-1.5 text-sm text-white/85">{project.services.map(s => <li key={s}>· {s}</li>)}</ul>
                <div className="mt-6 text-[11px] tracking-[0.3em] uppercase text-gold">Materials &amp; finishes</div>
                <ul className="mt-3 space-y-1.5 text-sm text-white/85">{project.materials.map(m => <li key={m}>· {m}</li>)}</ul>
              </aside>
            </div>

            {project.before && project.after && (
              <div className="mt-12">
                <h4 className="font-display text-2xl mb-4">Before &amp; after</h4>
                <Slider beforeImg={project.before} afterImg={project.after} />
              </div>
            )}

            <div className="mt-14">
              <h4 className="font-display text-2xl">Related projects</h4>
              <div className="mt-4 grid sm:grid-cols-3 gap-4">
                {PROJECTS.filter(p => p.title !== project.title && p.cat === project.cat).slice(0, 3).map(p => (
                  <button key={p.title} onClick={() => onOpen(p)} className="group relative rounded-2xl overflow-hidden aspect-[4/3] text-left">
                    <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                    <div className="absolute bottom-3 left-4 font-display text-lg">{p.title}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-14 rounded-3xl p-10 text-center tinted-emerald">
              <h4 className="font-display text-3xl lg:text-4xl">Have a space like this?</h4>
              <p className="mt-3 text-white/75">Tell us about it — we'll walk you through what's possible.</p>
              <a href="#consultation" onClick={onClose} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold text-black px-7 py-3.5 font-semibold">Book a Consultation <ArrowRight className="h-4 w-4" /></a>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- SHOWROOM ---------------- */
function Showroom() {
  return (
    <section id="showroom" className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl min-h-[620px] flex items-end">
        <img src={hero} alt="Our interior design studio and showroom in Mangalore" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in oklab, var(--color-espresso) 90%, transparent), transparent 75%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }}
          className="relative w-full p-6 sm:p-10 lg:p-14">
          <div className="max-w-2xl arch-glass rounded-3xl p-8 text-white">
            <Kicker>Experience Our Space</Kicker>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl">Visit Our Studio</h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              Explore unique interior solutions and discover materials, products and design possibilities in person — veneers, laminates, stone, lighting and full furniture displays.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={MAPS} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-gold text-black px-6 py-3.5 font-semibold"><Navigation className="h-4 w-4" /> Get Directions</a>
              <a href="#consultation" className="inline-flex items-center gap-2 rounded-full liquid-glass text-white px-6 py-3.5 font-semibold"><CalendarDays className="h-4 w-4" /> Book a Visit</a>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[pWardrobe, pDining, pKitchen, pOffice].map((img, i) => (
              <motion.img key={i} src={img} alt="Showroom detail" loading="lazy" decoding="async"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.9, ease: EASE }}
                className="rounded-2xl aspect-[4/3] object-cover w-full" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- BEFORE / AFTER ---------------- */
function Slider({ beforeImg, afterImg }: { beforeImg: string; afterImg: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const next = useRef(50);

  // High-frequency drag updates go straight to a CSS variable via rAF — no re-renders.
  const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    next.current = +e.target.value;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      wrap.current?.style.setProperty("--pos", `${next.current}%`);
    });
  }, []);

  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current); }, []);

  return (
    <div ref={wrap} style={{ ["--pos" as string]: "50%" }}
      className="relative aspect-[16/9] rounded-3xl overflow-hidden select-none shadow-2xl">
      <img src={afterImg} alt="After the interior transformation" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}>
        <img src={beforeImg} alt="Before the interior transformation" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="absolute top-4 left-4 frosted-dark text-white px-3 py-1 rounded-full text-xs tracking-widest">BEFORE</div>
      <div className="absolute top-4 right-4 frosted-dark text-white px-3 py-1 rounded-full text-xs tracking-widest">AFTER</div>
      <input aria-label="Reveal before and after" type="range" min={0} max={100} defaultValue={50} onChange={onInput} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
      <div className="gpu absolute inset-0 pointer-events-none" style={{ transform: "translate3d(var(--pos), 0, 0)" }}>
        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gold">
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-gold text-black grid place-items-center shadow-xl">
            <ArrowLeft className="h-3.5 w-3.5 -mr-0.5" /><ArrowRight className="h-3.5 w-3.5 -ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BeforeAfter() {
  return (
    <Section id="ba" tone="warm">
      <Header kicker="Before &amp; After" title="See the transformation" sub="Drag the handle to reveal how an ordinary room becomes an extraordinary space." />
      <div className="mt-12"><Slider beforeImg={before} afterImg={after} /></div>
    </Section>
  );
}

/* ---------------- PRODUCTS ---------------- */
const PRODUCTS = [
  { name: "Lounge Seating", img: pBedroom, tag: "Furniture" },
  { name: "Sculptural Lighting", img: pDining, tag: "Lighting" },
  { name: "Wardrobe Systems", img: pWardrobe, tag: "Storage" },
  { name: "Kitchen Hardware", img: pKitchen, tag: "Fittings" },
  { name: "Veneers & Laminates", img: studyNook, tag: "Materials" },
  { name: "Wall Décor & Panelling", img: bedroomArch, tag: "Décor" },
  { name: "Workspace Furniture", img: pOffice, tag: "Commercial" },
];

function Products() {
  const scroller = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) => scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  return (
    <Section id="products" tone="terra">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Header kicker="Products & Showroom" title="Curated Details. Extraordinary Spaces." sub="Furniture, lighting, wall décor, materials and interior accessories — selected the way we'd specify them for our own projects." />
        <div className="hidden sm:flex gap-2">
          <button aria-label="Scroll left" onClick={() => nudge(-1)} className="grid place-items-center h-11 w-11 rounded-full soft-morph"><ArrowLeft className="h-4 w-4" /></button>
          <button aria-label="Scroll right" onClick={() => nudge(1)} className="grid place-items-center h-11 w-11 rounded-full soft-morph"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div ref={scroller} className="mt-12 flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-2 px-2">
        {PRODUCTS.map((p, i) => (
          <motion.article key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.9, ease: EASE }}
            className="group snap-start shrink-0 w-[280px] sm:w-[320px]">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
              <img src={p.img} alt={p.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-70" />
              <div className="absolute top-4 left-4 frosted-dark text-white text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full">{p.tag}</div>
            </div>
            <h3 className="mt-4 font-display text-xl">{p.name}</h3>
          </motion.article>
        ))}
      </div>

      <a href="#consultation" className="mt-10 inline-flex items-center gap-2 font-medium" style={{ color: "var(--color-rust)" }}>
        Explore Our Collection <ArrowRight className="h-4 w-4" />
      </a>
    </Section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  const items = [
    ["Premium Materials", Sparkles], ["Experienced Designers", Wand2], ["Honest Pricing", ShieldCheck],
    ["On-Time Delivery", Clock], ["Fully Customised", Box], ["End-to-End Execution", Hammer],
    ["Latest Design Thinking", Lightbulb], ["Warranty Support", ShieldCheck], ["Local to Mangalore", MapPin],
  ] as const;
  return (
    <Section id="why" tone="navy">
      <Header light kicker="Why choose us" title="A studio built on trust" sub="Nine reasons clients recommend us — and come back for their next space." />
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(([t, Icon], i) => (
          <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.9, ease: EASE }}
            className="frosted-dark rounded-2xl p-6 flex items-center gap-4 text-white hover:border-gold transition duration-700">
            <div className="grid place-items-center h-12 w-12 rounded-xl bg-gold text-black shrink-0"><Icon className="h-5 w-5" /></div>
            <div className="font-display text-xl">{t}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- PROCESS ---------------- */
const STEPS = [
  ["Consultation", "We listen — to your vision, needs and lifestyle."],
  ["Site Visit", "Measurements, light study and site conditions."],
  ["Design Concept", "Mood boards, layouts and material direction."],
  ["3D Visualisation", "Walk through your future space before we build."],
  ["Material Selection", "Curated finishes, chosen in our showroom."],
  ["Execution", "Skilled craftsmen bring the design to life."],
  ["Quality Check", "Detail-by-detail review before handover."],
  ["Final Handover", "Move in. Enjoy your new space."],
];
function Process() {
  return (
    <Section id="process" tone="pearl">
      <Header kicker="Our Process" title="Eight steps to your space" sub="Clear, transparent and collaborative — from first idea to final handover." />
      <div className="mt-16 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent hidden lg:block" />
        <div className="space-y-8 lg:space-y-16">
          {STEPS.map(([t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }}
              className={`grid lg:grid-cols-2 gap-6 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
              <div className="[direction:ltr]">
                <div className="frosted rounded-3xl p-8 hover:border-gold transition duration-700">
                  <div className="text-xs tracking-[0.3em] text-copper">STEP {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-3 font-display text-3xl">{t}</h3>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              </div>
              <div className="hidden lg:flex justify-center [direction:ltr]">
                <div className="grid place-items-center h-20 w-20 rounded-full bg-gold text-black font-display text-3xl shadow-[0_20px_40px_-14px_rgba(201,162,39,0.7)]">{i + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const REVIEWS = [
  { name: "Priya Nair", text: "Their attention to detail, creativity and professionalism are top-notch. They listened carefully to my ideas and brought them to life." },
  { name: "Rohan Shetty", text: "High-quality raw materials and top-brand fixtures throughout. Extremely satisfied with the finish." },
  { name: "Ananya Kamath", text: "I strongly recommend them for A to Z interior work. On time, on budget and beautifully executed." },
  { name: "Vikram Rao", text: "From 3D visualisation to final handover the process was smooth and transparent. Truly luxurious result." },
];
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <Section id="testimonials" tone="warm">
      <Header kicker="Testimonials" title="Words from our clients" />
      <div className="mt-12 relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7, ease: EASE }}
            className="frosted rounded-3xl p-10 lg:p-14 text-center">
            <div className="flex justify-center gap-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-gold text-gold" />)}</div>
            <p className="mt-8 font-display text-2xl lg:text-3xl leading-snug italic">"{REVIEWS[i].text}"</p>
            <div className="mt-8 text-sm tracking-widest uppercase text-muted-foreground">— {REVIEWS[i].name}</div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-2">
          {REVIEWS.map((_, k) => (
            <button key={k} aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all duration-700 ${k === i ? "w-10 bg-gold" : "w-2 bg-border"}`} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 soft-morph rounded-3xl p-8">
          <div className="font-display text-6xl gold-text">5.0</div>
          <div>
            <div className="flex gap-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-gold text-gold" />)}</div>
            <div className="mt-1 text-sm text-muted-foreground">Based on <b className="text-foreground">33+ Google reviews</b></div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- CONSULTATION ---------------- */
function Consultation() {
  const [sent, setSent] = useState(false);
  return (
    <section id="consultation" className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-16 tinted-emerald">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl" style={{ background: "color-mix(in oklab, var(--color-gold) 35%, transparent)" }} />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full blur-3xl" style={{ background: "color-mix(in oklab, var(--color-teal) 30%, transparent)" }} />
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <Kicker>Design Consultation</Kicker>
            <h2 className="mt-4 font-display text-4xl lg:text-6xl leading-tight">Let's Design Something <span className="italic gold-text">Extraordinary.</span></h2>
            <p className="mt-6 text-white/75 leading-relaxed max-w-lg">
              Share a few details about your space. We'll come back with a considered starting point — layout thinking, material direction and an honest budget range.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full liquid-glass text-white px-6 py-3.5 font-semibold"><Phone className="h-4 w-4" /> {PHONE}</a>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full liquid-glass text-white px-6 py-3.5 font-semibold"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); }}
            className="arch-glass rounded-3xl p-7 lg:p-9 space-y-4 text-white">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email" name="email" type="email" />
              <Field label="Location" name="location" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Project type" name="type" as="select" options={["Residential", "Villa", "Apartment", "Office", "Commercial", "Renovation", "Custom furniture"]} />
              <Field label="Budget range" name="budget" as="select" options={["Under ₹5L", "₹5L – ₹10L", "₹10L – ₹25L", "₹25L+"]} />
            </div>
            <Field label="Message" name="message" as="textarea" />
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold text-black px-6 py-4 font-semibold hover:brightness-110 transition">
              {sent ? <><CheckCircle2 className="h-5 w-5" /> Thank you — we'll be in touch!</> : <>Request a Consultation <Send className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MANGALORE PRESENCE ---------------- */
function Presence() {
  return (
    <Section id="presence" tone="pearl">
      <Header kicker="Our City" title="Rooted in Mangalore. Designed for You." sub="A physical studio, local craftsmen and material suppliers we've worked with for years." />
      <div className="mt-12 grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="frosted rounded-3xl p-7">
            <div className="text-[11px] tracking-[0.3em] uppercase text-copper">Areas we serve</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Mangalore City", "Kadri", "Bejai", "Surathkal", "Ullal", "Mulki", "Udupi", "Manipal", "Karkala", "Puttur"].map(a => (
                <span key={a} className="soft-morph rounded-full px-3.5 py-1.5 text-sm">{a}</span>
              ))}
            </div>
          </div>
          <InfoCard icon={MapPin} title="Studio address" lines={[ADDRESS]} />
          <InfoCard icon={Clock} title="Working hours" lines={["Mon – Sat · 9:30 AM – 8:00 PM", "Sunday · By appointment"]} />
          <a href={MAPS} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-gold text-black px-6 py-3.5 font-semibold"><Navigation className="h-4 w-4" /> Visit Our Studio</a>
        </div>
        <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-border min-h-[420px]">
          <iframe title="Studio location on Google Maps" src="https://www.google.com/maps?q=Maroli%20Mangaluru%20Karnataka%20575005&output=embed" className="absolute inset-0 w-full h-full" loading="lazy" decoding="async" />
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs arch-glass rounded-2xl p-5">
            <div className="text-[10px] tracking-[0.3em] uppercase text-copper">Our Studio</div>
            <div className="mt-2 font-display text-xl">Interior Design Studio</div>
            <div className="mt-1 text-sm text-muted-foreground">{ADDRESS}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <Section id="contact" tone="warm">
      <Header kicker="Contact" title="Let's talk" sub="Reach out — we typically respond within a few hours." />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard icon={Phone} title="Call us" lines={[PHONE]} href={`tel:${PHONE}`} />
        <InfoCard icon={MessageCircle} title="WhatsApp" lines={["Chat with a designer"]} href={`https://wa.me/${WA}`} />
        <InfoCard icon={MapPin} title="Visit us" lines={[ADDRESS]} href={MAPS} />
        <InfoCard icon={Briefcase} title="Work with us" lines={["Residential · Commercial"]} href="#consultation" />
      </div>
    </Section>
  );
}

function InfoCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const Tag: any = href ? "a" : "div";
  return (
    <Tag {...(href ? { href, ...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {}) } : {})} className="block frosted rounded-2xl p-6 hover:border-gold transition duration-700">
      <div className="flex gap-4">
        <div className="grid place-items-center h-12 w-12 rounded-xl bg-gold text-black shrink-0"><Icon className="h-5 w-5" /></div>
        <div>
          <div className="text-xs tracking-widest uppercase text-muted-foreground">{title}</div>
          {lines.map(l => <div key={l} className="font-medium leading-snug">{l}</div>)}
        </div>
      </div>
    </Tag>
  );
}

function Field({ label, name, type = "text", required, as, options }: { label: string; name: string; type?: string; required?: boolean; as?: "textarea" | "select"; options?: string[] }) {
  const base = "w-full rounded-2xl border border-white/20 bg-white/10 text-inherit px-4 py-3 outline-none focus:border-gold transition duration-500 placeholder:text-current/50";
  return (
    <label className="block">
      <div className="text-xs tracking-widest uppercase opacity-70 mb-2">{label}{required && " *"}</div>
      {as === "textarea" ? <textarea name={name} required={required} rows={4} className={base} />
        : as === "select" ? (
          <select name={name} className={`${base} [&>option]:text-black`} defaultValue="">
            <option value="" disabled>Choose…</option>
            {options?.map(o => <option key={o}>{o}</option>)}
          </select>
        ) : <input name={name} type={type} required={required} className={base} />}
    </label>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-espresso text-white/80 pt-20 pb-28 lg:pb-8 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid place-items-center h-10 w-10 rounded-full border border-gold text-gold font-display text-xl">I</span>
            <span className="font-display text-white text-lg">Interior Design Studio</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">We don't just design interiors. We create spaces that tell your story — from our studio in Mangalore.</p>
          <div className="mt-6 flex gap-3">
            <a href={`https://wa.me/${WA}`} aria-label="WhatsApp" className="grid place-items-center h-9 w-9 rounded-full border border-white/20 hover:border-gold hover:text-gold transition"><MessageCircle className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="grid place-items-center h-9 w-9 rounded-full border border-white/20 hover:border-gold hover:text-gold transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="grid place-items-center h-9 w-9 rounded-full border border-white/20 hover:border-gold hover:text-gold transition"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <div className="font-display text-white mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            {NAV.map(([l, id]) => <li key={id}><a href={`#${id}`} className="hover:text-gold transition">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="font-display text-white mb-4">Services</div>
          <ul className="space-y-2 text-sm">
            {SERVICES.map(s => <li key={s.name}><a href="#services" className="hover:text-gold transition">{s.name}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="font-display text-white mb-4">Get in touch</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" /> {PHONE}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> {ADDRESS}</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" /> Mon – Sat · 9:30 AM – 8:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <div>© {new Date().getFullYear()} Interior Design Studio, Mangalore. All rights reserved.</div>
        <div className="flex gap-6"><a href="#" className="hover:text-gold">Privacy Policy</a><a href="#" className="hover:text-gold">Terms</a></div>
      </div>
    </footer>
  );
}

/* ---------------- primitives ---------------- */
function Section({ id, children, tone = "pearl" }: { id?: string; children: React.ReactNode; tone?: "pearl" | "warm" | "terra" | "dark" | "navy" }) {
  const map: Record<string, string> = {
    pearl: "arch-glass",
    warm: "arch-glass",
    terra: "arch-glass",
    dark: "text-white",
    navy: "text-white",
  };
  const style: Record<string, React.CSSProperties> = {
    pearl: { background: "linear-gradient(160deg, color-mix(in oklab, var(--color-ivory) 88%, transparent), color-mix(in oklab, var(--color-sage) 18%, transparent))" },
    warm: { background: "linear-gradient(160deg, color-mix(in oklab, var(--color-sand) 85%, transparent), color-mix(in oklab, var(--color-terracotta) 12%, transparent))" },
    terra: { background: "linear-gradient(160deg, color-mix(in oklab, var(--color-ivory) 85%, transparent), color-mix(in oklab, var(--color-copper) 16%, transparent))" },
    dark: { background: "linear-gradient(160deg, color-mix(in oklab, var(--color-espresso) 96%, transparent), color-mix(in oklab, var(--color-burgundy) 55%, black))" },
    navy: { background: "linear-gradient(160deg, color-mix(in oklab, var(--color-navy) 95%, black), color-mix(in oklab, var(--color-forest) 65%, black))" },
  };
  return (
    <section id={id} className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-10">
      <div style={style[tone]} className={`max-w-7xl mx-auto rounded-3xl px-6 py-16 sm:px-10 lg:px-14 lg:py-24 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.6)] ${map[tone]}`}>
        {children}
      </div>
    </section>
  );
}
function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-gold"><span className="h-px w-8 bg-gold" />{children}</div>;
}
function Header({ kicker, title, sub, light }: { kicker: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <Kicker>{kicker}</Kicker>
      <h2 className={`mt-4 text-4xl lg:text-6xl font-display leading-tight ${light ? "text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-5 text-lg ${light ? "text-white/70" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}
