import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Truck, Package, Clock, Shield, MapPin, Zap, Star, ChevronRight,
  CheckCircle2, Bike, Search, Headphones, Wallet, Route as RouteIcon, Box,
  Users, Building2, Warehouse, ShoppingBag, ArrowUpRight, CalendarDays,
  MoveRight, ArrowLeftRight, ChevronDown, Utensils, Scissors, Shirt, FileText,
  Cpu, Heart, Briefcase, Archive, Tag, Percent, 
} from "lucide-react";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { AnimatedRouteMap } from "@/components/shared/animated-route-map";
import { Marquee, VerticalMarquee } from "@/components/home/marquee";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LAGOS_LGAS } from "@/constants";
import { DELIVERY_CATEGORIES } from "@/constants/categories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuickReach Logistics — Premium Logistics for Lagos" },
      { name: "description", content: "Same-day deliveries, on-demand fleet, and real-time tracking across all 20 Lagos LGAs." },
      { property: "og:title", content: "QuickReach Logistics — Premium Logistics for Lagos" },
      { property: "og:description", content: "Same-day deliveries, on-demand fleet, real-time tracking." },
    ],
  }),
  component: Home,
});

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#f4f1f1", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
    >
      <MarketingNav />
      <main>
        <Hero />
        <PartnersStrip />
        <ServicesOverview />
        <WhyChooseUs />
        <HowItWorks />
        <DeliveryRateBanner />
        <DeliveryCategories />
        <ServiceCoverageMap />
        {/* <FleetShowcase /> */}
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  const handleTrack = () => navigate({ to: "/track" });

    const heroImages = [
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1800&q=80",
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=80",
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBgIndex((i) => (i + 1) % heroImages.length), 8000);
    return () => clearInterval(t);
  }, []);


  return (
    <section
      className="relative overflow-hidden mx-1 mt-1 sm:mx-2"
      style={{ minHeight: "100vh", borderRadius: "16px" }}
    >
      {/* Rotating background images */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{
            opacity: i === bgIndex ? 1 : 0,
            background: `
              linear-gradient(to right, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.25) 100%),
              linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%),
              url('${src}') center/cover no-repeat
            `,
            borderRadius: "24px",
          }}
        />
      ))}

      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-0 hidden lg:block pointer-events-none select-none"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(80px,13vw,190px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.055)",
          letterSpacing: "-4px",
          lineHeight: 1,
        }}
      >
        QuickReach Logistics
      </div>

      <div
        className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10 flex flex-col justify-end"
        style={{ minHeight: "96vh", paddingBottom: "32px", paddingTop: "90px" }}
      >
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span
              className="inline-block rounded-full px-3.5 py-1 text-[11px] font-semibold mb-5 tracking-wide"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                color: "rgba(255,255,255,0.88)",
              }}
            >
              ● &nbsp;Unmatched Lagos-wide Reach
            </span>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(28px, 5.2vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-1.5px",
                color: "#fff",
              }}
            >
              Lagos same-day<br />delivery Fast,<br />on time and trusted.
            </h1>
            <p
              className="mt-5 max-w-md"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.7 }}
            >
              Premium dispatch, on-demand fleet, and live tracking built for the speed and scale Lagos businesses need.
            </p>
            <div className="mt-8 flex gap-2 items-center">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
                style={{ background: "#ef0004", boxShadow: "0 0 28px rgba(255,77,0,0.45)" }}
              >
                Get a Quote <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-all hover:bg-white/15 active:scale-95 whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(10px)",
                }}
              >
                Book Delivery
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="w-full"
          >
            <div
              className="overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "20px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="px-5 pt-4 pb-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.09)" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ background: "#d35c5e" }}
                  >
                    Track Shipment
                  </div>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Enter details below
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <label
                    className="block text-[10px] uppercase tracking-widest mb-1.5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Tracking Number
                  </label>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Search className="h-4 w-4 shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
                    <input
                      className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-white/30"
                      style={{ color: "#fff" }}
                      placeholder="e.g. SDR0900047"
                    />
                  </div>
                </div>
                <button
                  onClick={handleTrack}
                  className="w-full rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99]"
                  style={{ background: "#ef0004", color: "#fff" }}
                >
                  Track Shipment <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PARTNERS STRIP
───────────────────────────────────────── */
function PartnersStrip() {
  const stats = [
    { v: "600+", l: "Deliveries" },
    { v: "500+", l: "Customers" },
    { v: "20/20", l: "LGAs covered" },
    { v: "98%", l: "On-time rate" },
    { v: "30+", l: "Active riders" },
    { v: "4.9★", l: "Avg rating" },
  ];

  return (
    <section style={{ background: "#fff", color: "#0a0a0a" }}>
      <div
        className="border-b overflow-hidden py-6"
        style={{ borderColor: "#e5e5e5", background: "#f7f7f7" }}
      >
        <Marquee speed={35}>
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col px-8">
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#0a0a0a",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.v}
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.12em] mt-2"
                style={{ color: "#aaa" }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section style={{ background: "#fff", color: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-5 py-16 lg:py-24 lg:px-8">
        <div className="grid items-start gap-10 lg:gap-16 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: text */}
          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-5"
              style={{
                background: "rgba(255,77,0,0.1)",
                color: "#ef0004",
                border: "1px solid rgba(255,77,0,0.2)",
              }}
            >
              Service Overview
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(26px, 5vw, 44px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.8px",
              }}
            >
              Navigate Lagos trade with trusted delivery logistics
            </h2>
            <p
              className="mt-5"
              style={{ color: "#666", fontSize: "15px", lineHeight: 1.7 }}
            >
              Need to optimize production or deliver time-critical goods? QuickReach Logistics ensures a smoother supply chain with flexible setup, clear insights, and reliable Lagos-wide delivery.
            </p>
            <p
              className="mt-4"
              style={{ color: "#666", fontSize: "15px", lineHeight: 1.7 }}
            >
              QuickReach Logistics provides you with access to real-time data on all your delivery routes with its Allocation Portal.
            </p>
            <button
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#0a0a0a" }}
            >
              Ship now <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right: image grid */}
          <ServiceImageGrid />
        </div>
      </div>
    </section>
  );
}

function ServiceImageGrid() {
  const cards = [
    {
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      title: "Same-Day Delivery",
      desc: "Fast pickup and delivery across Lagos for urgent parcels, documents, and customer orders.",
      tag: "Express",
    },
    {
      img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
      title: "Business Logistics",
      desc: "Professional riders available for personal, business, and recurring delivery needs.",
      tag: "Rider Service",
    },
    {
      img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
      title: "E-commerce Delivery",
      desc: "Reliable last-mile delivery for online stores, Instagram vendors, and growing businesses.",
      tag: "E-commerce",
    },
    {
      img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
      title: "Multi-Stop Delivery",
      desc: "Efficient delivery routes for businesses sending packages to multiple locations in Lagos.",
      tag: "Business",
    },
  ];

  return (
    <>
      {/* Mobile: horizontal scroll strip */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 lg:hidden snap-x snap-mandatory">
        {cards.map((c) => (
          <div
            key={c.title}
            className="relative flex-shrink-0 overflow-hidden rounded-2xl snap-start"
            style={{ width: "72vw", minWidth: "260px", height: "320px" }}
          >
            <img
              src={c.img}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2"
                style={{ background: "#ef0004", color: "#fff" }}
              >
                {c.tag}
              </span>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                {c.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: original asymmetric grid */}
      <div className="hidden lg:grid grid-cols-2 gap-3">
        {/* Large card */}
        <div className="row-span-2 relative overflow-hidden rounded-2xl group" style={{ minHeight: "480px" }}>
          <img
            src={cards[0].img}
            alt={cards[0].title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.25) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2"
              style={{ background: "#ef0004", color: "#fff" }}
            >
              {cards[0].tag}
            </span>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {cards[0].title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              {cards[0].desc}
            </p>
          </div>
        </div>

        {/* Right column — 3 stacked */}
        <div className="flex flex-col gap-3">
          {cards.slice(1).map((c) => (
            <div
              key={c.title}
              className="relative overflow-hidden rounded-2xl group"
              style={{ minHeight: "150px" }}
            >
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 100%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider mb-1"
                  style={{ background: "#ef0004", color: "#fff" }}
                >
                  {c.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {c.title}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
/* ─────────────────────────────────────────
   WHY CHOOSE US
───────────────────────────────────────── */
function WhyChooseUs() {
  const items = [
    {
      // icon: Zap,
      title: "Fast Turnaround",
      desc: "Quick pickups and timely deliveries across all LGAs.",
      img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=70",
    },
    {
      // icon: Users,
      title: "Professional Riders",
      desc: "Trained, vetted, and fully tracked personnel.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
    },
    {
      // icon: MapPin,
      title: "Real-Time Tracking",
      desc: "Live map and proof-of-delivery on every shipment.",
      img: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=600&q=70",
    },
    {
      // icon: Wallet,
      title: "Affordable Rates",
      desc: "Transparent pricing, zero hidden fees.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",
    },
    {
      // icon: Shield,
      title: "Secure Handling",
      desc: "Insured cargo with signature confirmation.",
      img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=70",
    },
    {
      // icon: Headphones,
      title: "Dedicated Support",
      desc: "WhatsApp and voice support, available 24/7.",
      img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=70",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          top: "-20%",
          left: 0,
          right: 0,
          bottom: "-20%",
          backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=75')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(0, 0, 0, 0.9)", zIndex: 1 }} />
      <div className="relative mx-auto max-w-7xl px-5 py-24 pt-28 lg:px-8" style={{ zIndex: 2 }}>
        <div className="max-w-2xl mb-14 mx-auto text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4"
            style={{ background: "rgba(255,77,0,0.12)", color: "#ef0004", border: "1px solid rgba(255,77,0,0.2)" }}
          >
            Why QuickReach
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.8px",
              color: "#fff",
              lineHeight: 1.12,
            }}
          >
            A logistics service built for Lagos.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
              style={{ border: "1px solid rgba(255,255,255,0.1)", minHeight: "220px" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${it.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.4) 100%)" }}
              />
              <div className="relative flex flex-col justify-between h-full p-6" style={{ zIndex: 10, minHeight: "260px" }}>
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  // style={{ background: "rgba(255,77,0,0.25)", color: "#FF4D00", border: "1px solid rgba(255,77,0,0.3)" }}
                >
                  {/* <it.icon className="h-5 w-5" /> */}
                </div>
                <div>
                  <h3 className="text-base font-semibold" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                    {it.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {it.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Book", d: "Submit your delivery request in 30 seconds.", icon: CalendarDays },
    { n: "02", t: "Pickup", d: "Nearest rider is dispatched automatically.", icon: Bike },
    { n: "03", t: "Track", d: "Watch the journey live on the map.", icon: MapPin },
    { n: "04", t: "Deliver", d: "Photo proof-of-delivery and signature on completion.", icon: CheckCircle2 },
  ];

  return (
    <section style={{ background: "#fff", color: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4"
            style={{ background: "rgba(255,77,0,0.1)", color: "#FF4D00", border: "1px solid rgba(255,77,0,0.2)" }}
          >
            How it works
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.8px",
              lineHeight: 1.12,
            }}
          >
            From quote to delivered in four moves.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-0 gap-y-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="relative flex flex-col px-6"
            >
              <div
                className="absolute -top-4 left-4 select-none pointer-events-none"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(72px, 8vw, 112px)",
                  fontWeight: 900,
                  color: "rgba(0,0,0,0.06)",
                  lineHeight: 1,
                  letterSpacing: "-4px",
                  zIndex: 0,
                }}
              >
                {s.n}
              </div>
              <div className="relative flex items-center gap-3 mb-6" style={{ zIndex: 1 }}>
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: "rgba(255,77,0,0.1)", border: "1px solid rgba(255,77,0,0.2)", color: "#FF4D00" }}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.25)", letterSpacing: "0.08em" }}>
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block flex-1 h-px"
                    style={{
                      background: "linear-gradient(to right, rgba(255,77,0,0.4), rgba(255,77,0,0.08))",
                      marginLeft: "4px",
                      position: "absolute",
                      left: "100%",
                      right: "-24px",
                      top: "50%",
                    }}
                  />
                )}
              </div>
              <div style={{ zIndex: 1 }}>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#777" }}>{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DELIVERY RATE ANNOUNCEMENT BANNER
───────────────────────────────────────── */
function DeliveryRateBanner() {
  return (
    <section style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "#FCE7E8",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 rounded-full"
            // style={{ background: "linear-gradient(to right, transparent, #ef0004, transparent)" }}
          />
          <div
            className="absolute -top-24 left-1/4 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255, 25, 0, 0.12) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-24 right-1/4 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255, 21, 0, 0.08) 0%, transparent 70%)" }}
          />

          <div className="relative px-6 py-10 sm:px-12 sm:py-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left icon area */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div
                className="grid h-20 w-20 place-items-center rounded-2xl"
                style={{ background: "rgba(255, 0, 0, 0.15)", border: "1px solid rgba(255,77,0,0.3)" }}
              >
                <span className="text-4xl">🚚</span>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{ background: "#000000", color: "#fff" }}
              >
                Exclusive Offer
              </span>
            </div>

            {/* Center text */}
            <div className="flex-1 text-center lg:text-left">
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "rgba(255, 34, 0, 0.8)", fontWeight: 700 }}
              >
                ● Delivery Rate Announcement
              </p>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(20px, 3vw, 32px)",
                  fontWeight: 800,
                  color: "#5c5959",
                  lineHeight: 1.2,
                  letterSpacing: "-0.5px",
                }}
              >
                Ship with QuickReach Logistics and get{" "}
                <span style={{ color: "#ef0004" }}>₦1,000 OFF</span> every parcel
              </h2>
              <p
                className="mt-3 max-w-xl"
                style={{ color: "rgba(102, 98, 98, 0.6)", fontSize: "14px", lineHeight: 1.7 }}
              >
                Better service, better price. If your delivery costs{" "}
                <span style={{ color: "#4d4a4a", fontWeight: 600 }}>₦5,000 per parcel</span>, you pay only{" "}
                <span style={{ color: "#ef0004", fontWeight: 700 }}>₦40,000</span> instead of ₦50,000
                Plus <span style={{ color: "#565555", fontWeight: 600 }}>same-day delivery</span> at no extra cost.
              </p>
            </div>

            {/* Right savings badge */}
            <div className="shrink-0">
              <div
                className="relative rounded-2xl p-6 text-center"
                style={{
                  background: "rgba(255, 30, 0, 0.1)",
                  border: "2px solid rgba(255, 25, 0, 0.3)",
                  minWidth: "160px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "42px",
                    fontWeight: 900,
                    color: "#780f10",
                    lineHeight: 1,
                    letterSpacing: "-2px",
                  }}
                >
                  20%
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  OFF every 10 parcels
                </div>
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: "#780f10" }}
                >
                  SAVE MORE
                </div>
              </div>
              <Link
                to="/quote"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#780f10" }}
              >
                Claim Offer <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DELIVERY CATEGORIES — 2-col pastel cards (scrolling)
───────────────────────────────────────── */
function DeliveryCategories() {
  const categories = DELIVERY_CATEGORIES; // imported from @/constants/categories

  return (
    <section style={{ background: "#fff", color: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-start gap-10 lg:gap-16 lg:grid-cols-[1fr_1.4fr]">

          {/* ── LEFT: heading + stats ── */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-5"
                style={{ background: "rgba(255,77,0,0.1)", color: "#FF4D00", border: "1px solid rgba(255,77,0,0.2)" }}
              >
                What We Deliver
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(26px, 5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.12,
                  letterSpacing: "-0.8px",
                }}
              >
                Every category.<br />Every corner of Lagos.
              </h2>
              <p className="mt-5" style={{ color: "#666", fontSize: "15px", lineHeight: 1.7 }}>
                From a single document to bulk electronics — QuickReach handles over 20 delivery categories across all Lagos LGAs with the same care and speed.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#0a0a0a" }}
              >
                View all categories <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "20+", l: "Item categories" },
                { v: "98%", l: "Safe delivery rate" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl p-4"
                  style={{ background: "#f7f7f7", border: "1px solid #eee" }}
                >
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 700, color: "#0a0a0a", letterSpacing: "-1px" }}>
                    {s.v}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#999" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: scrolling 2-col pastel grid ── */}
          <div className="relative overflow-hidden" style={{ height: "580px" }}>
            {/* Fade top */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{ height: "72px", background: "linear-gradient(to bottom, #fff, transparent)" }}
            />
            {/* Fade bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{ height: "72px", background: "linear-gradient(to top, #fff, transparent)" }}
            />

            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="grid grid-cols-2 gap-3"
            >
              {[...categories, ...categories].map((cat, i) => (
                <CategoryCard key={i} cat={cat} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: typeof DELIVERY_CATEGORIES[0] }) {
  const iconColorMap: Record<string, string> = {
    "from-orange-400/30 to-rose-400/20":   "#f97316",
    "from-pink-400/30 to-fuchsia-400/20":  "#ec4899",
    "from-rose-300/30 to-amber-300/20":    "#f43f5e",
    "from-amber-400/30 to-orange-300/20":  "#f59e0b",
    "from-sky-400/30 to-indigo-400/20":    "#0ea5e9",
    "from-cyan-400/30 to-blue-400/20":     "#06b6d4",
    "from-emerald-400/30 to-teal-400/20":  "#10b981",
    "from-red-400/30 to-orange-400/20":    "#ef4444",
    "from-slate-400/30 to-zinc-400/20":    "#64748b",
    "from-amber-500/30 to-yellow-400/20":  "#f59e0b",
    "from-violet-400/30 to-purple-400/20": "#8b5cf6",
    "from-lime-400/30 to-emerald-400/20":  "#84cc16",
  };

  const iconColor = iconColorMap[cat.tint] ?? "#f97316";

  return (
    <motion.div
      className="relative flex flex-col justify-between overflow-hidden rounded-3xl cursor-default select-none"
      style={{ minHeight: "200px" }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${cat.img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Black overlay — lighter at top, heavier at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5" style={{ minHeight: "200px" }}>
        {/* Icon circle — top left */}
        <div
          className="grid h-12 w-12 place-items-center rounded-full"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <cat.icon className="h-5 w-5" style={{ color: "#fff" }} />
        </div>

        {/* Text — bottom left */}
        <div className="mt-auto pt-6">
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {cat.name}
          </h3>
          <p
            className="mt-1 text-xs"
            style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}
          >
            {cat.bullets[0]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
/* ─────────────────────────────────────────
   SERVICE COVERAGE MAP — Side-by-side, white/red, real Lagos map
───────────────────────────────────────── */
function ServiceCoverageMap() {
  const lgas = [
    { name: "Ikeja", x: 37, y: 29, hub: true },
    { name: "Lagos Island", x: 52, y: 72, hub: true },
    { name: "Surulere", x: 44, y: 57 },
    { name: "Apapa", x: 36, y: 65 },
    { name: "Yaba", x: 48, y: 50 },
    { name: "Ikoyi", x: 57, y: 26 },
    { name: "Ogombo", x: 26, y: 48 },
    { name: "VGC", x: 30, y: 36 },
    { name: "Orchid", x: 24, y: 30 },
    { name: "Lekki", x: 52, y: 42 },
    { name: "Sangotodo", x: 50, y: 36 },
    { name: "Ago palace ", x: 42, y: 47 },
    { name: "Festac", x: 50, y: 56 },
    { name: "Ogba", x: 72, y: 20 },
    { name: "Ajah", x: 88, y: 40 },
    { name: "Ojudu Berger ", x: 82, y: 65 },
    { name: "Eti-Osa", x: 66, y: 70 },
    { name: "Igando ", x: 30, y: 68 },
    { name: "Mile 2", x: 10, y: 75 },
    { name: "Ikotun", x: 36, y: 72 },
    { name: "Ojota", x: 30, y: 70 },
    { name: "Gbagada n", x: 16, y: 79 },
    { name: "Maryland", x: 14, y: 71 },
  ];

  const [activePin, setActivePin] = useState<string | null>(null);
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);

  const highlight = activePin || hoveredChip;

  return (
    <section style={{ background: "#fff", color: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">

        {/* Side-by-side layout */}
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.55fr]">

          {/* ── LEFT: text + LGA chips ── */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4"
                style={{
                  background: "rgba(239,0,4,0.08)",
                  color: "#ef0004",
                  border: "1px solid rgba(239,0,4,0.18)",
                }}
              >
                Coverage Map
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  fontWeight: 700,
                  letterSpacing: "-0.8px",
                  color: "#0a0a0a",
                  lineHeight: 1.1,
                }}
              >
                We deliver across<br />Lagos — everywhere.
              </h2>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "#666", maxWidth: "340px" }}
              >
                Covering all 20 Lagos LGAs — from Badagry to Epe, Ikorodu to Lagos Island. Hover any area to explore.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "20/20", l: "LGAs covered" },
                { v: "98%", l: "On-time rate" },
                { v: "10+", l: "Active riders" },
                { v: "50+", l: "Daily deliveries" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl p-4"
                  style={{ background: "#f7f7f7", border: "1px solid #eee" }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#ef0004",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {s.v}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#999" }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* LGA chips */}
            <div>
              <p
                className="text-[10px] uppercase tracking-widest mb-3 font-semibold"
                style={{ color: "#bbb" }}
              >
                All 20 LGAs
              </p>
              <div className="flex flex-wrap gap-2">
                {lgas.map((loc) => (
                  <button
                    key={loc.name}
                    onMouseEnter={() => setHoveredChip(loc.name)}
                    onMouseLeave={() => setHoveredChip(null)}
                    className="rounded-full px-3 py-1 text-xs font-semibold transition-all duration-150"
                    style={{
                      background: highlight === loc.name ? "#ef0004" : loc.hub ? "rgba(239,0,4,0.07)" : "#f3f3f3",
                      color: highlight === loc.name ? "#fff" : loc.hub ? "#ef0004" : "#555",
                      border: highlight === loc.name
                        ? "1px solid #ef0004"
                        : loc.hub
                        ? "1px solid rgba(239,0,4,0.25)"
                        : "1px solid #e5e5e5",
                      fontWeight: loc.hub ? 700 : 500,
                    }}
                  >
                    {loc.hub && <span className="mr-1">●</span>}
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90 self-start"
              style={{ background: "#ef0004" }}
            >
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* ── RIGHT: Lagos SVG map ── */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "#fafafa",
              border: "1.5px solid #eee",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* Subtle grid texture */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: 0.4 }}
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="dotgrid" width="4" height="4" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.4" fill="#ddd" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#dotgrid)" />
            </svg>

            {/* Lagos map SVG — realistic outline + water + zones */}
            <svg
              viewBox="0 0 500 420"
              className="w-full"
              style={{ display: "block", minHeight: "420px" }}
            >
              <defs>
                {/* Lagos water gradient */}
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>
                {/* Land gradient */}
                <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f9f9f9" />
                  <stop offset="100%" stopColor="#f1f1f1" />
                </linearGradient>
                {/* Active glow */}
                <filter id="pinGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ── Lagos State boundary (approximate realistic shape) ── */}
              <path
                d="
                  M 60 30
                  L 100 20 L 160 18 L 220 22 L 280 18 L 340 20
                  L 390 28 L 430 38 L 460 55 L 465 75
                  L 455 100 L 440 125 L 430 150
                  L 445 175 L 450 205 L 440 230
                  L 420 255 L 400 270 L 380 285
                  L 360 295 L 340 305 L 310 315
                  L 285 320 L 260 322 L 235 318
                  L 210 308 L 190 295 L 170 282
                  L 150 275 L 130 272 L 110 268
                  L 90 262 L 70 255 L 52 240
                  L 38 220 L 28 195 L 25 168
                  L 28 140 L 35 112 L 42 85
                  L 48 58 Z
                "
                fill="url(#landGrad)"
                stroke="#e0e0e0"
                strokeWidth="1.5"
              />

              {/* ── Lagos Lagoon ── */}
              <path
                d="
                  M 155 230 L 185 220 L 215 215 L 248 212
                  L 278 210 L 308 212 L 335 218 L 360 225
                  L 382 232 L 395 242 L 390 258
                  L 370 268 L 348 275 L 320 278
                  L 290 280 L 260 280 L 230 276
                  L 200 268 L 175 256 L 158 244 Z
                "
                fill="url(#waterGrad)"
                stroke="#93c5fd"
                strokeWidth="0.8"
                opacity="0.85"
              />
              <text x="268" y="248" textAnchor="middle" fill="#93c5fd" fontSize="9" fontStyle="italic" opacity="0.9">
                Lagos Lagoon
              </text>

              {/* ── Atlantic Ocean / Bight of Benin (bottom) ── */}
              <path
                d="
                  M 25 295 L 70 285 L 110 282 L 150 285
                  L 190 288 L 230 292 L 270 294
                  L 310 292 L 345 288 L 380 290
                  L 415 295 L 455 300
                  L 465 420 L 0 420 Z
                "
                fill="url(#waterGrad)"
                stroke="#93c5fd"
                strokeWidth="0.6"
                opacity="0.6"
              />
              <text x="240" y="360" textAnchor="middle" fill="#60a5fa" fontSize="10" fontStyle="italic" opacity="0.7">
                Bight of Benin
              </text>

              {/* ── Lagos Island (peninsula) ── */}
              <ellipse cx="258" cy="295" rx="28" ry="12"
                fill="#fee2e2" stroke="#fca5a5" strokeWidth="0.8" opacity="0.9"
              />
              <text x="258" y="299" textAnchor="middle" fill="#ef0004" fontSize="7" fontWeight="600" opacity="0.85">
                Lagos Island
              </text>

              {/* ── Victoria Island ── */}
              <ellipse cx="308" cy="292" rx="20" ry="8"
                fill="#fee2e2" stroke="#fca5a5" strokeWidth="0.7" opacity="0.8"
              />

              {/* ── Lekki Peninsula ── */}
              <path
                d="M 315 290 Q 360 285 400 275 Q 430 268 450 262 L 455 272 Q 425 282 395 288 Q 355 298 315 302 Z"
                fill="#fef2f2"
                stroke="#fca5a5"
                strokeWidth="0.7"
                opacity="0.8"
              />

              {/* ── Connection lines between pins ── */}
              {lgas.map((loc, i) =>
                lgas.slice(i + 1, i + 3).map((target) => {
                  const x1 = (loc.x / 100) * 500;
                  const y1 = (loc.y / 100) * 420;
                  const x2 = (target.x / 100) * 500;
                  const y2 = (target.y / 100) * 420;
                  return (
                    <line
                      key={`${loc.name}-${target.name}`}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={highlight === loc.name || highlight === target.name ? "#ef0004" : "#e5e5e5"}
                      strokeWidth={highlight === loc.name || highlight === target.name ? "1.2" : "0.6"}
                      strokeDasharray="3 3"
                      opacity={highlight === loc.name || highlight === target.name ? 0.6 : 0.5}
                      style={{ transition: "all 0.2s" }}
                    />
                  );
                })
              )}

              {/* ── Pins ── */}
              {lgas.map((loc) => {
                const cx = (loc.x / 100) * 500;
                const cy = (loc.y / 100) * 420;
                const isActive = highlight === loc.name;
                return (
                  <g
                    key={loc.name}
                    onMouseEnter={() => setActivePin(loc.name)}
                    onMouseLeave={() => setActivePin(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pulse ring */}
                    {isActive && (
                      <circle
                        cx={cx} cy={cy} r="14"
                        fill="none"
                        stroke="#ef0004"
                        strokeWidth="1.5"
                        opacity="0.35"
                      >
                        <animate attributeName="r" values="10;18;10" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Hub outer ring */}
                    {loc.hub && !isActive && (
                      <circle cx={cx} cy={cy} r="8" fill="rgba(239,0,4,0.12)" stroke="rgba(239,0,4,0.3)" strokeWidth="1" />
                    )}
                    {/* Main dot */}
                    <circle
                      cx={cx} cy={cy}
                      r={isActive ? 7 : loc.hub ? 6 : 4.5}
                      fill={isActive ? "#ef0004" : loc.hub ? "#ef0004" : "#f87171"}
                      stroke={isActive ? "#fff" : "#fff"}
                      strokeWidth={isActive ? 2.5 : 1.8}
                      filter={isActive ? "url(#pinGlow)" : undefined}
                      style={{ transition: "all 0.2s" }}
                    />

                    {/* Tooltip */}
                    {isActive && (
                      <g>
                        <rect
                          x={cx - 42} y={cy - 34} width="84" height="22"
                          rx="6" ry="6"
                          fill="#ef0004"
                        />
                        {/* Arrow */}
                        <polygon
                          points={`${cx - 5},${cy - 13} ${cx + 5},${cy - 13} ${cx},${cy - 6}`}
                          fill="#ef0004"
                        />
                        <text
                          x={cx} y={cy - 19}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize="9"
                          fontWeight="700"
                          fontFamily="'DM Sans', sans-serif"
                        >
                          {loc.name}
                        </text>
                      </g>
                    )}

                    {/* Label (not active) */}
                    {!isActive && (
                      <text
                        x={cx} y={cy + 15}
                        textAnchor="middle"
                        fill="#444"
                        fontSize={loc.hub ? "8.5" : "7.5"}
                        fontWeight={loc.hub ? "700" : "500"}
                        fontFamily="'DM Sans', sans-serif"
                      >
                        {loc.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* ── Compass rose ── */}
              <g transform="translate(452, 48)">
                <circle cx="0" cy="0" r="16" fill="white" stroke="#e5e5e5" strokeWidth="1" />
                <text x="0" y="-7" textAnchor="middle" fill="#ef0004" fontSize="9" fontWeight="700">N</text>
                <text x="0" y="13" textAnchor="middle" fill="#999" fontSize="7">S</text>
                <text x="10" y="3" textAnchor="middle" fill="#999" fontSize="7">E</text>
                <text x="-10" y="3" textAnchor="middle" fill="#999" fontSize="7">W</text>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#ccc" strokeWidth="0.8" />
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#ccc" strokeWidth="0.8" />
              </g>
            </svg>

            {/* Bottom badge */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid #eee",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="grid h-9 w-9 place-items-center rounded-xl shrink-0"
                style={{ background: "rgba(239,0,4,0.1)", border: "1px solid rgba(239,0,4,0.2)" }}
              >
                <MapPin className="h-4 w-4" style={{ color: "#ef0004" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#0a0a0a" }}>
                  All 20 Lagos LGAs
                </div>
                <div className="text-xs" style={{ color: "#999" }}>
                  Full state coverage
                </div>
              </div>
            </div>

            {/* Legend */}
            <div
              className="absolute top-4 left-4 flex flex-col gap-1.5 rounded-xl px-3 py-2.5"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid #eee",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#ef0004", border: "1.5px solid #fff", boxShadow: "0 0 0 1px #ef0004" }} />
                <span className="text-[10px] font-semibold" style={{ color: "#444" }}>Hub LGAs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#f87171", border: "1.5px solid #fff", boxShadow: "0 0 0 1px #f87171" }} />
                <span className="text-[10px] font-semibold" style={{ color: "#444" }}>Active zones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-5 rounded" style={{ background: "#bfdbfe" }} />
                <span className="text-[10px] font-semibold" style={{ color: "#444" }}>Water bodies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ─────────────────────────────────────────
   FLEET → renamed to Delivery Vehicles (kept as Fleet)
───────────────────────────────────────── */
function FleetShowcase() {
  const fleet = [
    { icon: Bike, name: "Motorcycle", count: "180+", desc: "Document & parcel express." },
    { icon: Package, name: "Sedan / Car", count: "60+", desc: "Mid-size urgent loads." },
    { icon: Truck, name: "Van", count: "40+", desc: "Multi-stop and bulk drops." },
    { icon: Box, name: "Mini Truck", count: "20+", desc: "Furniture and appliance moves." },
    { icon: Warehouse, name: "Trailer", count: "12+", desc: "Long-haul and container freight." },
  ];

  return (
    <section style={{ background: "#fff", color: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4"
              style={{ background: "rgba(255,77,0,0.1)", color: "#FF4D00", border: "1px solid rgba(255,77,0,0.2)" }}
            >
              Fleet
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.8px",
                lineHeight: 1.12,
              }}
            >
              The right vehicle for every shipment.
            </h2>
          </div>
          <Link
            to="/services"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "#FF4D00" }}
          >
            Explore fleet <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {fleet.map((f) => (
            <div
              key={f.name}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-0.5 cursor-default"
              style={{ background: "#f7f7f7", border: "1px solid #eee" }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: "#FF4D00", color: "#fff" }}>
                <f.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>{f.name}</div>
              <div className="mt-1 text-sm" style={{ color: "#777" }}>{f.desc}</div>
              <div
                className="mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(255,77,0,0.08)", color: "#FF4D00", border: "1px solid rgba(255,77,0,0.15)" }}
              >
                {f.count} active
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   TESTIMONIALS — centered headings, equal cards
───────────────────────────────────────── */
function Testimonials() {
  const t = [
    { name: "Aisha Bello", role: "Ops Lead, Jumia Lagos", quote: "QuickReach Logistics cut our island delivery time in half. The live POD alone is worth it.", rating: 5 },
    { name: "Tunde Okeke", role: "Founder, Lagos Eats", quote: "We dispatch 400+ meals a day on QuickReach Logistics. Zero missed drops last month.", rating: 5 },
    { name: "Ngozi Adekunle", role: "Logistics Manager, Interswitch", quote: "Finally a Lagos operator with enterprise-grade dashboards and clean APIs.", rating: 5 },
    { name: "Femi Salau", role: "Owner, Bella Hair Lagos", quote: "Our packages arrive in perfect condition every time. Customers love the tracking link.", rating: 5 },
    { name: "Chiamaka Eze", role: "Pharmacist, MedPlus", quote: "Same-day refills, even during Lagos traffic. They've never let us down.", rating: 5 },
    { name: "David Okonkwo", role: "CEO, Shop Naija", quote: "From Shopify webhook to rider in under 2 minutes. Best dispatch partner we've used.", rating: 5 },
  ];

  return (
    <section style={{ background: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        {/* Centered headings */}
        <div className="text-center mb-12">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4"
            style={{ background: "rgba(255,77,0,0.12)", color: "#ef0004", border: "1px solid rgba(255,77,0,0.2)" }}
          >
            Loved by ops teams
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.8px",
              color: "#fff",
            }}
          >
            The fastest way to deliver in Lagos.
          </h2>
        </div>

        <Marquee speed={55}>
          {t.map((q, i) => (
            <div
              key={i}
              className="w-[340px] shrink-0 rounded-2xl p-6 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                height: "220px",  // fixed height so all cards are equal
              }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: q.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4" style={{ fill: "#ff2600fb", color: "#ff1e00" }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                {q.quote}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white shrink-0"
                  style={{ background: "#ef0004", fontFamily: "'Syne', sans-serif" }}
                >
                  {q.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{q.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FAQ — image on right, accordion on left (Bytitude-style)
───────────────────────────────────────── */
function FAQ() {
  const items = [
    ["How fast is Same-Day delivery?", "Most island-to-island deliveries arrive in under 3 hours during business hours."],
    ["Which areas do you cover?", "All 20 Lagos LGAs, including Ikorodu, Badagry, and Epe."],
    ["How can I track my shipment?", "Every booking includes a tracking link with live map, driver ETA, and event timeline."],
    ["What items can I send?", "From documents and electronics to furniture and bulk goods. See our categories page."],
    ["What payment methods do you accept?", "Paystack, Flutterwave, bank transfer, USSD, and a QuickReach Logistics wallet for businesses."],
    ["Do you offer business accounts?", "Yes — corporate pricing, SLA guarantees, monthly invoicing, and account management."],
    ["Is my package insured?", "Standard cover is included; Priority shipments come with up to ₦500k declared-value insurance."],
  ];

  return (
    <section style={{ background: "#fff", color: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: Accordion */}
          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4"
              style={{ background: "rgba(255,77,0,0.1)", color: "#ef0004", border: "1px solid rgba(255,77,0,0.2)" }}
            >
              FAQ
            </span>
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 38px)",
                fontWeight: 700,
                letterSpacing: "-0.8px",
                lineHeight: 1.12,
              }}
            >
              Questions &amp; Answers
            </h2>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: "#777" }}>
              Still curious? Our team is one message away.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {items.map(([q, a], i) => (
                <AccordionItem
                  key={i}
                  value={`i-${i}`}
                  style={{ borderColor: "#eee" }}
                >
                  <AccordionTrigger
                    className="text-left text-base font-semibold"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed" style={{ color: "#666" }}>
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#0a0a0a" }}
            >
              Contact us <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Right: Image + stat badge */}
          <div className="relative hidden lg:block">
<div className="relative overflow-hidden rounded-3xl" style={{ height: "560px" }}>
  <img
    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
    alt="Delivery"
    className="w-full h-full object-cover"
  />
  <div
    className="absolute inset-0"
    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.3) 100%)" }}
  />
</div>
            {/* Stat badge */}
            <div
              className="absolute bottom-6 left-6 right-6 rounded-2xl px-5 py-4 flex items-center gap-4"
              style={{
                background: "rgba(10,10,10,0.85)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-xl shrink-0"
                style={{ background: "rgba(255,77,0,0.15)", border: "1px solid rgba(255,77,0,0.3)" }}
              >
                <Shield className="h-5 w-5" style={{ color: "#ef0004" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#fff" }}>
                  98% On-time Rate
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Across all Lagos LGAs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA — "Stay Connected" style with bg image
───────────────────────────────────────── */
function FinalCTA() {
  return (
    <section style={{ background: "#f8f3f3" }}>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-12 sm:p-16"
          style={{ minHeight: "330px" }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)" }} />

          {/* Content */}
<div className="relative flex flex-col items-center text-center gap-8" style={{ zIndex: 2 }}>
  <div>
    <h2
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(28px, 3.5vw, 44px)",
        fontWeight: 800,
        color: "#fff",
        letterSpacing: "-1px",
        lineHeight: 1.1,
      }}
    >
      Need a logistics partner?
    </h2>
    <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
      Get a free quote today and experience reliable delivery services across Lagos.
    </p>
  </div>
  <div className="flex flex-wrap gap-3 justify-center">
    <Link
      to="/quote"
      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:opacity-90"
      style={{ background: "#ef0004", color: "#fff" }}
    >
      Request quote
    </Link>
    <Link
      to="/contact"
      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold border border-white/40 text-white transition-all hover:bg-white/10"
    >
      Talk to sales
    </Link>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}