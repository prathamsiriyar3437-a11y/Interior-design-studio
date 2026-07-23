import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Phone, MapPin, Star, ArrowRight, ArrowUp, MessageCircle, Menu, X, Moon, Sun,
  Sofa, ChefHat, BedDouble, Layers, PanelTop, Briefcase, Building2, Tv, UtensilsCrossed,
  Lightbulb, Hammer, Box, Wand2, ShieldCheck, Sparkles, CheckCircle2, Send, Clock, Instagram, Facebook,
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
      { title: "Interior Design Studio — Luxury Interiors in Mangaluru" },
      { name: "description", content: "Transform your home, villa or office with Mangaluru's premier interior design studio. Turnkey design, premium materials, on-time delivery. Rated 5.0 on Google." },
      { property: "og:title", content: "Interior Design Studio — Luxury Interiors in Mangaluru" },
      { property: "og:description", content: "Transforming spaces into timeless masterpieces. Book a free consultation today." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Interior Design Studio",
        image: "/og.jpg",
        telephone: "+91-8050805046",
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
  component: Home,
});

const PHONE = "08050805046";
const WA = "918050805046";
const ADDRESS = "Near Canara Springs, Maroli, Mangaluru, Karnataka 575005";

const NAV = [
  ["Home", "home"], ["About", "about"], ["Services", "services"],
  ["Portfolio", "portfolio"], ["Process", "process"],
  ["Testimonials", "testimonials"], ["FAQ", "faq"], ["Contact", "contact"],
] as const;

function Home() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);

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
    <div className="min-h-screen">
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] origin-left" />

      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-10 w-10 rounded-full border border-gold text-gold font-display text-xl">I</span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className={`font-display text-lg tracking-wide ${scrolled ? "text-foreground" : "text-white"}`}>Interior Design</span>
              <span className={`text-[10px] tracking-[0.3em] ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>STUDIO · MANGALURU</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(([l, id]) => (
              <a key={id} href={`#${id}`} className={`text-sm font-medium tracking-wide transition-colors relative group ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"}`}>
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleDark} aria-label="Toggle theme" className={`grid place-items-center h-10 w-10 rounded-full border transition ${scrolled ? "border-border hover:bg-secondary" : "border-white/30 text-white hover:bg-white/10"}`}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-gold text-black px-5 py-2.5 text-sm font-semibold hover:brightness-110 transition shadow-[0_10px_30px_-10px_rgba(201,162,39,0.6)]">
              Book Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <button onClick={() => setMenu(true)} className={`lg:hidden grid place-items-center h-10 w-10 rounded-full border ${scrolled ? "border-border" : "border-white/30 text-white"}`}>
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm lg:hidden" onClick={() => setMenu(false)}>
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 24 }} onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background p-8 flex flex-col">
              <button onClick={() => setMenu(false)} className="self-end grid place-items-center h-10 w-10 rounded-full border border-border"><X className="h-4 w-4" /></button>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map(([l, id]) => (
                  <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="py-3 border-b border-border font-display text-2xl hover:text-gold transition">{l}</a>
                ))}
              </nav>
              <a href="#contact" onClick={() => setMenu(false)} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold text-black px-5 py-3 font-semibold">Book Consultation</a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <Marquee />
      <About />
      <Services />
      <Portfolio />
      <WhyUs />
      <Process />
      <BeforeAfter />
      <Testimonials />
      <GoogleReviews />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />

      {/* Floating actions */}
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener" aria-label="WhatsApp" className="fixed bottom-6 right-6 z-40 grid place-items-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_20px_40px_-10px_rgba(37,211,102,0.6)] hover:scale-110 transition">
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
      </a>
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
            className="fixed bottom-6 left-6 z-40 grid place-items-center h-12 w-12 rounded-full bg-foreground text-background shadow-lg hover:scale-110 transition">
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={hero} alt="Luxury living room designed by our studio" className="h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-32 pb-20 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 text-white/90">
          <span className="h-px w-12 bg-gold" />
          <span className="text-xs tracking-[0.4em] uppercase">Luxury Interior Design · Mangaluru</span>
        </motion.div>

        <h1 className="mt-8 text-5xl sm:text-6xl lg:text-8xl font-display leading-[0.95] text-white max-w-5xl">
          Transforming Spaces Into <span className="italic gold-text">Timeless Masterpieces</span>
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 max-w-2xl text-lg text-white/80 leading-relaxed">
          Premium interior design solutions for homes, villas, apartments, offices &amp; commercial spaces — thoughtfully crafted, meticulously delivered.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-gold text-black px-8 py-4 font-semibold hover:brightness-110 transition shadow-[0_20px_50px_-15px_rgba(201,162,39,0.7)]">
            Book Free Consultation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </a>
          <a href="#portfolio" className="inline-flex items-center gap-3 rounded-full glass-dark text-white px-8 py-4 font-semibold hover:bg-white/10 transition">
            View Portfolio
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-14 flex flex-wrap items-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
            <span className="text-sm"><b>5.0</b> Google Rating</span>
          </div>
          <span className="h-4 w-px bg-white/30" />
          <span className="text-sm"><b>33+</b> Happy Clients</span>
          <span className="h-4 w-px bg-white/30 hidden sm:block" />
          <span className="text-sm hidden sm:inline">A to Z Interior Work</span>
        </motion.div>
      </motion.div>

      {/* Stat bar */}
      <div className="relative z-10 -mt-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="glass rounded-3xl p-6 lg:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]">
            <Counter to={250} suffix="+" label="Projects Completed" />
            <Counter to={12} suffix="+" label="Years Experience" />
            <Counter to={200} suffix="+" label="Happy Clients" />
            <Counter to={99} suffix="%" label="Customer Satisfaction" />
          </div>
        </div>
      </div>
    </section>
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
        const dur = 1600, start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(p * to));
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
      <div className="mt-2 text-xs lg:text-sm tracking-widest uppercase text-muted-foreground">{label}</div>
    </div>
  );
}

function Marquee() {
  const items = ["Residential", "Villas", "Modular Kitchen", "Office", "Commercial", "3D Design", "Turnkey", "Renovation"];
  return (
    <div className="py-10 border-y border-border bg-secondary/40 overflow-hidden">
      <div className="flex gap-16 animate-[scroll_30s_linear_infinite] whitespace-nowrap will-change-transform">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-2xl text-muted-foreground flex items-center gap-16">
            {t} <span className="text-gold">✦</span>
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
    <Section id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Kicker>About the Studio</Kicker>
          <h2 className="mt-4 text-4xl lg:text-6xl font-display leading-tight">
            Interiors that tell <span className="italic gold-text">your story</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            For over a decade, we've been crafting deeply personal interiors across Mangaluru — from intimate apartments to statement villas and refined offices. Every project begins with listening, and ends with a space that feels unmistakably yours.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {[
              ["Creative designs", "Concepts tailored to how you live."],
              ["Quality craftsmanship", "Executed by trusted, experienced teams."],
              ["Premium materials", "Top-brand fixtures and finishes throughout."],
              ["Attention to detail", "Every joint, edge and shadow considered."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img src={pVilla} alt="Villa interior" loading="lazy" className="rounded-3xl aspect-[3/4] object-cover w-full" />
            <div className="pt-12 space-y-4">
              <img src={pBedroom} alt="Bedroom" loading="lazy" className="rounded-3xl aspect-square object-cover w-full" />
              <img src={pKitchen} alt="Kitchen" loading="lazy" className="rounded-3xl aspect-square object-cover w-full" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-12 w-12 rounded-full bg-gold text-black font-display text-xl">5.0</div>
              <div>
                <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}</div>
                <div className="text-xs text-muted-foreground">33+ Google Reviews</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { icon: Sofa, name: "Residential Interiors", desc: "End-to-end homes designed around your lifestyle." },
  { icon: ChefHat, name: "Modular Kitchen", desc: "Ergonomic, durable kitchens with premium hardware." },
  { icon: Sofa, name: "Living Room Design", desc: "Warm, elegant living spaces that welcome you home." },
  { icon: BedDouble, name: "Bedroom Design", desc: "Restful bedrooms with layered lighting and texture." },
  { icon: Box, name: "Wardrobe Design", desc: "Custom wardrobes that maximise every inch." },
  { icon: Layers, name: "False Ceiling", desc: "Sculpted ceilings with cove and ambient lighting." },
  { icon: Briefcase, name: "Office Interiors", desc: "Workspaces that reflect your brand and culture." },
  { icon: Building2, name: "Commercial Interiors", desc: "Retail, hospitality & showroom fit-outs." },
  { icon: Tv, name: "TV Unit Design", desc: "Statement media walls with hidden storage." },
  { icon: UtensilsCrossed, name: "Dining Room Design", desc: "Dining spaces designed for memorable evenings." },
  { icon: Lightbulb, name: "Lighting Design", desc: "Layered lighting schemes that transform a room." },
  { icon: Hammer, name: "Renovation", desc: "Refresh tired spaces without moving out." },
  { icon: PanelTop, name: "3D Design & Visualization", desc: "Walk through your home before we begin." },
  { icon: Wand2, name: "Turnkey Solutions", desc: "One team, one contract, keys handed over." },
];

function Services() {
  return (
    <Section id="services" tone="secondary">
      <Header kicker="What we do" title="Services crafted with care" sub="From a single room to a full turnkey home — a curated palette of services, delivered end-to-end." />
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {SERVICES.map((s, i) => (
          <motion.div key={s.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
            className="group relative rounded-3xl border border-border bg-card p-7 hover:border-gold/60 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(201,162,39,0.4)]">
            <div className="grid place-items-center h-14 w-14 rounded-2xl bg-secondary group-hover:bg-gold group-hover:text-black transition">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-display">{s.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold">
              Learn more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- PORTFOLIO ---------------- */
const PROJECTS = [
  { img: foyerGrand, title: "Illuminated Teakwood Foyer", cat: "Luxury Villas", span: "row-span-2" },
  { img: pKitchen, title: "Onyx Modular Kitchen", cat: "Kitchens" },
  { img: bedroomMaster, title: "Walnut Master Suite", cat: "Bedrooms" },
  { img: pDining, title: "Crystal Dining Hall", cat: "Living Rooms", span: "row-span-2" },
  { img: bedroomArch, title: "Arched Floral Bedroom", cat: "Bedrooms" },
  { img: studyNook, title: "Teak Study Nook", cat: "Apartments" },
  { img: pOffice, title: "Heritage Office", cat: "Offices" },
  { img: windowSeat, title: "Sunlit Window Lounge", cat: "Apartments" },
  { img: pVilla, title: "Palm Grove Villa", cat: "Luxury Villas" },
  { img: pWardrobe, title: "Aurora Walk-in", cat: "Apartments" },
];
const CATS = ["All", "Living Rooms", "Bedrooms", "Kitchens", "Offices", "Luxury Villas", "Apartments", "Commercial Spaces"];

function Portfolio() {
  const [cat, setCat] = useState("All");
  const [lb, setLb] = useState<number | null>(null);
  const filtered = PROJECTS.filter(p => cat === "All" || p.cat === cat);
  return (
    <Section id="portfolio">
      <Header kicker="Portfolio" title="A gallery of transformations" sub="A glimpse into recent homes, villas and workplaces we've had the privilege to design." />
      <div className="mt-10 flex flex-wrap gap-2">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm border transition ${cat === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-gold hover:text-gold"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
        {filtered.map((p, i) => (
          <motion.button key={p.title} onClick={() => setLb(i)} layout initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className={`group relative overflow-hidden rounded-3xl ${p.span ?? ""}`}>
            <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
              <div className="text-xs tracking-widest uppercase text-gold">{p.cat}</div>
              <div className="mt-1 font-display text-xl">{p.title}</div>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {lb !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-lg grid place-items-center p-6" onClick={() => setLb(null)}>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={filtered[lb].img} alt={filtered[lb].title} className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain" />
            <button className="absolute top-6 right-6 grid place-items-center h-12 w-12 rounded-full glass-dark text-white"><X className="h-5 w-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  const items = [
    ["Premium Materials", Sparkles], ["Experienced Designers", Wand2], ["Affordable Luxury", ShieldCheck],
    ["On-Time Delivery", Clock], ["Customized Designs", Box], ["Transparent Pricing", CheckCircle2],
    ["End-to-End Execution", Hammer], ["Latest Design Trends", Lightbulb], ["Warranty Support", ShieldCheck],
  ] as const;
  return (
    <Section id="why" tone="dark">
      <Header light kicker="Why choose us" title="A studio built on trust" sub="Nine reasons our clients recommend us — and come back for their next home." />
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(([t, Icon], i) => (
          <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="glass-dark rounded-2xl p-6 flex items-center gap-4 text-white hover:border-gold transition">
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
  ["Site Visit", "Measurements, light study, and site conditions."],
  ["Design Concept", "Mood boards, layouts and material direction."],
  ["3D Visualization", "Walk through your future space before we build."],
  ["Material Selection", "Curated finishes from top brands."],
  ["Execution", "Skilled craftsmen bring the design to life."],
  ["Quality Check", "Detail-by-detail review before handover."],
  ["Final Handover", "Move in. Enjoy your new space."],
];
function Process() {
  return (
    <Section id="process">
      <Header kicker="Our Process" title="Eight steps to your dream home" sub="Clear, transparent and collaborative — from first idea to final handover." />
      <div className="mt-16 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent hidden lg:block" />
        <div className="space-y-10 lg:space-y-20">
          {STEPS.map(([t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-6 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
              <div className="[direction:ltr]">
                <div className="glass rounded-3xl p-8 hover:border-gold transition">
                  <div className="text-xs tracking-[0.3em] text-gold">STEP {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-3 font-display text-3xl">{t}</h3>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              </div>
              <div className="hidden lg:flex justify-center [direction:ltr]">
                <div className="relative grid place-items-center h-20 w-20 rounded-full bg-gold text-black font-display text-3xl shadow-[0_20px_40px_-10px_rgba(201,162,39,0.7)]">
                  {i + 1}
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-30 animate-ping" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- BEFORE / AFTER ---------------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <Section id="ba" tone="secondary">
      <Header kicker="Before & After" title="See the transformation" sub="Drag the slider to reveal how we transform ordinary rooms into extraordinary spaces." />
      <div className="mt-12 relative aspect-[16/9] rounded-3xl overflow-hidden select-none shadow-2xl">
        <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt="Before" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="absolute top-4 left-4 glass-dark text-white px-3 py-1 rounded-full text-xs tracking-widest">BEFORE</div>
        <div className="absolute top-4 right-4 glass-dark text-white px-3 py-1 rounded-full text-xs tracking-widest">AFTER</div>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
        <div className="absolute top-0 bottom-0 w-0.5 bg-gold pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-gold text-black grid place-items-center shadow-xl">
            <ArrowRight className="h-4 w-4 -mr-1" /><ArrowRight className="h-4 w-4 rotate-180 -ml-1" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const REVIEWS = [
  { name: "Priya Nair", text: "Their attention to detail, creativity, and professionalism are top-notch. They listened carefully to my ideas and brought them to life." },
  { name: "Rohan Shetty", text: "High-quality raw materials and top-brand fixtures have been used throughout. Extremely satisfied with the finish." },
  { name: "Ananya Kamath", text: "I strongly recommend them for A to Z interior work. On time, on budget, and beautifully executed." },
  { name: "Vikram Rao", text: "From 3D visualization to final handover — the process was smooth and transparent. Truly luxurious result." },
];
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <Section id="testimonials">
      <Header kicker="Testimonials" title="Words from our clients" sub="" />
      <div className="mt-12 relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-10 lg:p-14 text-center">
            <div className="flex justify-center gap-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-gold text-gold" />)}</div>
            <p className="mt-8 font-display text-2xl lg:text-3xl leading-snug italic">"{REVIEWS[i].text}"</p>
            <div className="mt-8 text-sm tracking-widest uppercase text-muted-foreground">— {REVIEWS[i].name}</div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-2">
          {REVIEWS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-10 bg-gold" : "w-2 bg-border"}`} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function GoogleReviews() {
  return (
    <Section id="google" tone="secondary">
      <div className="glass rounded-3xl p-10 lg:p-16 text-center max-w-3xl mx-auto">
        <div className="text-xs tracking-[0.3em] text-gold">GOOGLE REVIEWS</div>
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="font-display text-7xl lg:text-8xl gold-text">5.0</div>
          <div className="text-left">
            <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (
              <motion.div key={i} initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}>
                <Star className="h-6 w-6 fill-gold text-gold" />
              </motion.div>
            ))}</div>
            <div className="mt-2 text-muted-foreground">Based on <b className="text-foreground">33+ reviews</b></div>
          </div>
        </div>
        <p className="mt-6 text-muted-foreground">Loved by families and businesses across Mangaluru.</p>
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  ["How long does a project take?", "Typical residential projects range from 45 to 90 days depending on scope. We share a detailed timeline after the design concept is approved."],
  ["Do you offer 3D designs?", "Yes — every project includes photorealistic 3D visualisations so you can walk through your space before we begin execution."],
  ["What materials do you use?", "We use high-quality raw materials and top-brand fixtures throughout — from BWP-grade plywood to premium laminates, veneers, hardware and lighting."],
  ["Can I customize everything?", "Absolutely. Every layout, finish and detail is tailored to your lifestyle, preferences and budget."],
  ["Do you work outside Mangaluru?", "Yes — we take on select projects across Karnataka and coastal India. Get in touch to discuss your location."],
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <Header kicker="FAQ" title="Questions, answered" sub="Everything you need to know before we begin." />
      <div className="mt-12 max-w-3xl mx-auto space-y-3">
        {FAQS.map(([q, a], i) => (
          <div key={q} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
              <span className="font-display text-xl pr-4">{q}</span>
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl text-gold shrink-0">+</motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] p-12 lg:p-20 text-center"
        style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1611 60%, #2b2416 100%)" }}>
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative">
          <div className="text-xs tracking-[0.4em] text-gold">READY TO BEGIN?</div>
          <h2 className="mt-6 font-display text-4xl lg:text-6xl text-white leading-tight">Let's design your <span className="italic gold-text">dream space</span>.</h2>
          <p className="mt-6 text-white/70 max-w-xl mx-auto">Book a complimentary consultation. We'll walk through your vision, space and timeline — no obligation.</p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-gold text-black px-6 py-3.5 font-semibold hover:brightness-110 transition"><Phone className="h-4 w-4" /> Call Now</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3.5 font-semibold hover:brightness-110 transition"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass-dark text-white px-6 py-3.5 font-semibold hover:bg-white/10 transition">Book Consultation</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" tone="secondary">
      <Header kicker="Contact" title="Let's talk" sub="Reach out — we typically respond within a few hours." />
      <div className="mt-12 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <InfoCard icon={Phone} title="Call us" lines={[PHONE]} href={`tel:${PHONE}`} />
          <InfoCard icon={MapPin} title="Visit us" lines={[ADDRESS]} />
          <InfoCard icon={Clock} title="Working hours" lines={["Mon – Sat · 9:30 AM – 8:00 PM", "Sunday · By appointment"]} />
          <div className="rounded-3xl overflow-hidden border border-border h-64">
            <iframe title="Map" src="https://www.google.com/maps?q=Maroli%20Mangaluru%20Karnataka%20575005&output=embed" className="w-full h-full" loading="lazy" />
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); }}
          className="lg:col-span-3 glass rounded-3xl p-8 lg:p-10 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
          </div>
          <Field label="Email" name="email" type="email" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Project type" name="type" as="select" options={["Residential", "Villa", "Apartment", "Office", "Commercial", "Renovation"]} />
            <Field label="Budget" name="budget" as="select" options={["Under ₹5L", "₹5L – ₹10L", "₹10L – ₹25L", "₹25L+"]} />
          </div>
          <Field label="Message" name="message" as="textarea" />
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold text-black px-6 py-4 font-semibold hover:brightness-110 transition">
            {sent ? <><CheckCircle2 className="h-5 w-5" /> Thanks — we'll be in touch!</> : <>Send message <Send className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </Section>
  );
}

function InfoCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag {...(href ? { href } : {})} className="block glass rounded-2xl p-6 hover:border-gold transition">
      <div className="flex gap-4">
        <div className="grid place-items-center h-12 w-12 rounded-xl bg-gold text-black shrink-0"><Icon className="h-5 w-5" /></div>
        <div>
          <div className="text-xs tracking-widest uppercase text-muted-foreground">{title}</div>
          {lines.map(l => <div key={l} className="font-medium">{l}</div>)}
        </div>
      </div>
    </Tag>
  );
}

function Field({ label, name, type = "text", required, as, options }: { label: string; name: string; type?: string; required?: boolean; as?: "textarea" | "select"; options?: string[] }) {
  const base = "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 outline-none focus:border-gold transition";
  return (
    <label className="block">
      <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{label}{required && " *"}</div>
      {as === "textarea" ? <textarea name={name} required={required} rows={4} className={base} />
        : as === "select" ? (
          <select name={name} className={base} defaultValue="">
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
    <footer className="bg-charcoal text-white/80 pt-20 pb-8 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid place-items-center h-10 w-10 rounded-full border border-gold text-gold font-display text-xl">I</span>
            <span className="font-display text-white text-lg">Interior Design Studio</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">Crafting timeless interiors across Mangaluru with quality materials, thoughtful design and end-to-end execution.</p>
          <div className="mt-6 flex gap-3">
            <a href={`https://wa.me/${WA}`} className="grid place-items-center h-9 w-9 rounded-full border border-white/20 hover:border-gold hover:text-gold transition"><MessageCircle className="h-4 w-4" /></a>
            <a href="#" className="grid place-items-center h-9 w-9 rounded-full border border-white/20 hover:border-gold hover:text-gold transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="grid place-items-center h-9 w-9 rounded-full border border-white/20 hover:border-gold hover:text-gold transition"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <div className="font-display text-white mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm">
            {NAV.map(([l, id]) => <li key={id}><a href={`#${id}`} className="hover:text-gold transition">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="font-display text-white mb-4">Services</div>
          <ul className="space-y-2 text-sm">
            {SERVICES.slice(0, 7).map(s => <li key={s.name}><a href="#services" className="hover:text-gold transition">{s.name}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="font-display text-white mb-4">Get in touch</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" /> {PHONE}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> {ADDRESS}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <div>© {new Date().getFullYear()} Interior Design Studio. All rights reserved.</div>
        <div className="flex gap-6"><a href="#" className="hover:text-gold">Privacy Policy</a><a href="#" className="hover:text-gold">Terms</a></div>
      </div>
    </footer>
  );
}

/* ---------------- primitives ---------------- */
function Section({ id, children, tone }: { id?: string; children: React.ReactNode; tone?: "secondary" | "dark" }) {
  const bg = tone === "secondary" ? "bg-secondary/40" : tone === "dark" ? "bg-charcoal text-white" : "";
  return (
    <section id={id} className={`py-24 lg:py-32 px-6 lg:px-16 ${bg}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
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
