import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ChevronDown, ChevronUp,
  Zap, Clock, MapPin, Package, ShieldCheck, Headphones,
  // Industry icons
  ShoppingBag, HeartPulse, Scale, Store, UtensilsCrossed,
  Landmark, Factory, GraduationCap, Building2,
  // Process step icons
  ClipboardList, UserCheck, Navigation, PackageCheck,
} from "lucide-react";
import { useState } from "react";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { SERVICES } from "@/constants/services-catalog";
import heroImage from "/media/bk.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Quick Reach Logistics" },
      { name: "description", content: "Same-day, express, dispatch riders, e-commerce, business logistics, bulk multi-stop, scheduled pickups, document & parcel — Quick Reach Logistics full Lagos service catalogue." },
      { property: "og:title", content: "Services — Quick Reach Logistics" },
      { property: "og:description", content: "Reliable delivery solutions for businesses and individuals across Lagos." },
    ],
  }),
  component: ServicesPage,
});

const SERVICE_IMAGES: Record<string, string> = {
  "same-day-delivery":  "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&q=80",
  "express-delivery":   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  "dispatch-rider":     "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&q=80",
  "ecommerce-delivery": "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=700&q=80",
  "business-logistics": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
  "scheduled-pickups":  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80",
  "document-parcel":    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&q=80",
};

/* ═══════════════════════════════════════════
   1. HERO
═══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[360px] lg:min-h-[480px]">
        <img
          src={heroImage}
          alt="Quick Reach Logistics Services"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)",
          }}
        />
        <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[360px] lg:min-h-[480px] px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            <span className="text-red-500 text-xs font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Our Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white font-bold leading-tight mb-3"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 7vw, 58px)", letterSpacing: "-2px", lineHeight: 1.05 }}
          >
            Our Logistics<br />Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/70 max-w-md leading-relaxed mb-8"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}
          >
            Fast bike deliveries within Lagos — from Lekki to Ikeja, Surulere to Victoria Island and everywhere in between.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
            >
              Request a Quote
              <span className="inline-flex items-center justify-center rounded-full" style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.25)" }}>
                <ArrowUpRight size={12} color="#fff" />
              </span>
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold border border-white/30 text-white transition-all hover:bg-white/10"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Book Delivery
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. SERVICES GRID
═══════════════════════════════════════════ */
function ServicesGrid() {
  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            What We Offer
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px", lineHeight: 1.2 }}>
            Our Service Catalogue
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "10px auto 0" }}>
            Every service is built for Lagos — fast bike riders covering all 20 LGAs, from a single parcel to bulk enterprise runs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const img = SERVICE_IMAGES[s.slug] ?? SERVICE_IMAGES["same-day-delivery"];
            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative rounded-2xl overflow-hidden block"
                style={{ minHeight: i % 5 === 0 ? "380px" : "320px" }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.35) 100%)" }} />

                <div className="absolute top-4 right-4 z-10">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    from {s.priceFrom}
                  </span>
                </div>

                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center justify-center rounded-xl" style={{ width: "36px", height: "36px", background: "rgba(239,0,4,0.85)" }}>
                    <Icon size={16} color="#fff" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "6px" }}>
                    {s.title}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", lineHeight: 1.6, marginBottom: "10px" }}>
                    {s.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: "#ef0004" }}>
                    Learn more
                    <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. WHY BUSINESSES CHOOSE US
═══════════════════════════════════════════ */
const WHY_US = [
  { icon: Zap,         title: "Fast Turnaround",     desc: "Quick pickups and timely deliveries across all 20 Lagos LGAs via our professional bike fleet." },
  { icon: ShieldCheck, title: "Professional Riders", desc: "Experienced, vetted, and uniformed delivery riders — safe, reliable, and always on time." },
  { icon: MapPin,      title: "Real-Time Tracking",  desc: "Track every shipment live from pickup to delivery with instant status notifications." },
  { icon: Package,     title: "Affordable Rates",    desc: "Competitive flat pricing with zero hidden fees — quality logistics that fits your budget." },
  { icon: Clock,       title: "Same-Day Delivery",   desc: "Book before 3PM and your package lands today — no delays, no excuses, within Lagos." },
  { icon: Headphones,  title: "Dedicated Support",   desc: "Human support always on standby via WhatsApp and phone whenever you need assistance." },
];

function WhyChooseUs() {
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            Why Quick Reach Logistics
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Why Businesses Choose Us
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "10px auto 0" }}>
            Built for Lagos. Trusted by hundreds of businesses every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl p-7 flex flex-col gap-4 transition-transform hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: "44px", height: "44px", background: "rgba(239,0,4,0.15)", border: "1px solid rgba(239,0,4,0.25)" }}
                >
                  <Icon size={20} color="#ef0004" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "6px" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. INDUSTRIES WE SERVE — FIXED RESPONSIVE
═══════════════════════════════════════════ */
const INDUSTRIES = [
  { label: "E-commerce",               Icon: ShoppingBag,   color: "#ef0004" },
  { label: "Healthcare",               Icon: HeartPulse,    color: "#3b82f6" },
  { label: "Legal Firms",              Icon: Scale,         color: "#8b5cf6" },
  { label: "Retail Stores",            Icon: Store,         color: "#f59e0b" },
  { label: "Restaurants",              Icon: UtensilsCrossed, color: "#10b981" },
  { label: "Financial Services",       Icon: Landmark,      color: "#0ea5e9" },
  { label: "Manufacturing",            Icon: Factory,       color: "#6b7280" },
  { label: "Educational Institutions", Icon: GraduationCap, color: "#f97316" },
  { label: "Government Agencies",      Icon: Building2,     color: "#22c55e" },
];

function Industries() {
  return (
    <section style={{ background: "#f8f8f8", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            Sectors
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Industries We Serve
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "460px", margin: "10px auto 0" }}>
            From fashion startups to government agencies — Quick Reach powers logistics for every sector in Lagos.
          </p>
        </div>

        {/* FIX: Changed to 1 col on mobile, 2 on sm, 3 on lg.
            Icon is flex-shrink-0 and has a fixed min-width.
            Label uses min-w-0 + break-words so it wraps instead of overflowing. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.Icon;
            return (
              <div
                key={ind.label}
                className="group flex items-center gap-4 rounded-2xl px-5 py-5 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-default"
                style={{
                  background: "#fff",
                  border: "1px solid #eaeaea",
                  minWidth: 0, // prevent grid blowout
                }}
              >
                {/* Icon circle — fixed size, never shrinks */}
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: "46px",
                    height: "46px",
                    minWidth: "46px",
                    background: `${ind.color}14`,
                    border: `1.5px solid ${ind.color}30`,
                  }}
                >
                  <Icon size={20} color={ind.color} strokeWidth={1.8} />
                </div>

                {/* Label — min-w-0 allows text to wrap within flex container */}
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#0f0f0f",
                    lineHeight: 1.3,
                    minWidth: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {ind.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. HOW IT WORKS
═══════════════════════════════════════════ */
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Book",
    desc: "Submit your delivery request in under 60 seconds via app, web, or WhatsApp.",
    Icon: ClipboardList,
    active: false,
  },
  {
    step: "02",
    title: "Pickup",
    desc: "Our verified rider arrives at your location and securely collects your package.",
    Icon: UserCheck,
    active: false,
  },
  {
    step: "03",
    title: "Track",
    desc: "Monitor your shipment in real time with live GPS updates and status alerts.",
    Icon: Navigation,
    active: true,
  },
  {
    step: "04",
    title: "Delivered",
    desc: "Package reaches its destination safely with photo proof of delivery.",
    Icon: PackageCheck,
    active: false,
  },
];

function DeliveryProcess() {
  return (
    <section style={{ background: "#fff", padding: "80px 0 96px" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header */}
        <div className="mb-4">
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#ef0004",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            How we work
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              color: "#0f0f0f",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: "600px",
            }}
          >
            A process built<br />for results.
          </h2>
          <p style={{ color: "#777", fontSize: "15px", lineHeight: 1.7, maxWidth: "340px" }}>
            Four simple steps from booking to delivered — every time, across all of Lagos.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {PROCESS_STEPS.map((p, i) => {
            const Icon = p.Icon;
            const isActive = p.active;
            const isLast = i === PROCESS_STEPS.length - 1;

            return (
              <div key={p.step} className="relative flex flex-col">

                {/* Ghost number watermark */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "8px",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(80px, 10vw, 120px)",
                    fontWeight: 900,
                    color: isActive ? "rgba(239,0,4,0.08)" : "rgba(0,0,0,0.04)",
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                >
                  {p.step}
                </div>

                {/* Icon row with connector line */}
                <div className="flex items-center relative z-10" style={{ marginBottom: "20px" }}>
                  {/* Icon box */}
                  <div
                    className="flex items-center justify-center rounded-2xl flex-shrink-0 relative"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: isActive ? "#ef0004" : "#f3f3f3",
                      border: isActive ? "none" : "1.5px solid #e5e5e5",
                      transition: "all 0.2s",
                    }}
                  >
                    <Icon size={22} color={isActive ? "#fff" : "#555"} strokeWidth={1.8} />

                    {/* Step badge */}
                    <span
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        fontSize: "9px",
                        fontWeight: 800,
                        fontFamily: "'Syne', sans-serif",
                        color: isActive ? "#fff" : "#999",
                        background: isActive ? "#0f0f0f" : "#ebebeb",
                        borderRadius: "999px",
                        padding: "2px 5px",
                        lineHeight: 1.4,
                        border: "1.5px solid #fff",
                      }}
                    >
                      {p.step}
                    </span>
                  </div>

                  {/* Connector line to next step */}
                  {!isLast && (
                    <div
                      style={{
                        flex: 1,
                        height: "1.5px",
                        marginLeft: "12px",
                        marginRight: "0",
                        background: i < PROCESS_STEPS.findIndex((s) => s.active)
                          ? "#ef0004"
                          : "repeating-linear-gradient(90deg, #d4d4d4 0px, #d4d4d4 6px, transparent 6px, transparent 12px)",
                      }}
                    />
                  )}
                </div>

                {/* Text content */}
                <div className="relative z-10 pr-6">
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "18px",
                      fontWeight: 800,
                      color: isActive ? "#ef0004" : "#0f0f0f",
                      marginBottom: "8px",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {p.title}
                  </p>
                  <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#666" }}>
                    {p.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. FAQ
═══════════════════════════════════════════ */
const FAQS = [
  { q: "How long does delivery take?",    a: "Same-day deliveries are completed within 8 hours of booking (book before 3PM). Express deliveries are completed in 90 minutes to 3 hours within Lagos." },
  { q: "Which areas do you cover?",       a: "We cover all 20 Lagos LGAs — from Badagry to Ikorodu, Lekki to Agege, and everywhere in between. All deliveries are within Lagos." },
  { q: "How can I track my shipment?",    a: "Every delivery comes with a live tracking link sent via WhatsApp and email. You can also track from your Quick Reach Logistics dashboard in real time." },
  { q: "What items can I send?",          a: "We handle most non-hazardous items via bike — documents, parcels, fashion, electronics, food, pharmaceuticals, and more. Contact us for oversized items." },
  { q: "Do you offer business accounts?", a: "Yes — our Business Logistics plan includes a dedicated account manager, monthly invoicing, multi-user dashboard, and custom SLAs. Contact sales to get started." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background: "#f8f8f8", padding: "80px 0" }}>
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            FAQ
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "460px", margin: "10px auto 0" }}>
            Everything you need to know about Quick Reach Logistics services in Lagos.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all"
              style={{ border: "1px solid #eee", background: open === i ? "#0f0f0f" : "#fff" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: open === i ? "#fff" : "#0f0f0f",
                  }}
                >
                  {faq.q}
                </span>
                {open === i
                  ? <ChevronUp size={18} color="#ef0004" />
                  : <ChevronDown size={18} color="#999" />
                }
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", lineHeight: 1.75 }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   7. FINAL CTA
═══════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section style={{ background: "#f8f3f3" }}>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-12 sm:p-16"
          style={{ minHeight: "330px" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/media/huge.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.75)" }} />
          <div className="relative flex flex-col items-center text-center gap-8" style={{ zIndex: 2 }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Need a Logistics Partner in Lagos?
              </h2>
              <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
                Get a free quote today and experience reliable bike delivery services across all of Lagos.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
              >
                Request Quote
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold border border-white/40 text-white transition-all hover:bg-white/10"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════ */
function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <HeroSection />
        <ServicesGrid />
        <WhyChooseUs />
        <Industries />
        <DeliveryProcess />
        <FAQ />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}