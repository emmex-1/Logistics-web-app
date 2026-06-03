import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, Zap, Clock, MapPin, Package, ShieldCheck, Headphones } from "lucide-react";
import { useState } from "react";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { SERVICES } from "@/constants/services-catalog";
import heroImage from "/media/about-craft.webp";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Sendaro Logistics" },
      { name: "description", content: "Same-day, express, dispatch riders, e-commerce, business logistics, bulk multi-stop, scheduled pickups, document & parcel — Sendaro's full Lagos service catalogue." },
      { property: "og:title", content: "Services — Sendaro Logistics" },
      { property: "og:description", content: "Reliable delivery solutions for businesses and individuals across Lagos." },
    ],
  }),
  component: ServicesPage,
});

/* ─── SERVICE IMAGE MAP ─── */
const SERVICE_IMAGES: Record<string, string> = {
  "same-day-delivery":    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&q=80",
  "express-delivery":     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  "dispatch-rider":       "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&q=80",
  "ecommerce-delivery":   "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=700&q=80",
  "business-logistics":   "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
  "bulk-multi-stop":      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80",
  "scheduled-pickups":    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80",
  "document-parcel":      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&q=80",
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
          alt="Sendaro Logistics Services"
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
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 7vw, 88px)", letterSpacing: "-2px", lineHeight: 1.05 }}
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
            Reliable delivery solutions for businesses and individuals across Lagos.
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
   2. SERVICES GRID — image cards with black overlay + intext
═══════════════════════════════════════════ */
function ServicesGrid() {
  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            What We Offer
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px", lineHeight: 1.2 }}>
            Our Service Catalogue
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "10px auto 0" }}>
            Pick the right service for the job — from a same-day bike run to monthly enterprise contracts.
          </p>
        </div>

        {/* Grid */}
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
                {/* Background image */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
                {/* Black overlay — heavier at bottom */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.35) 100%)" }} />

                {/* Price badge — top right */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    from {s.priceFrom}
                  </span>
                </div>

                {/* Icon — top left */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center justify-center rounded-xl" style={{ width: "36px", height: "36px", background: "rgba(239,0,4,0.85)" }}>
                    <Icon size={16} color="#fff" />
                  </div>
                </div>

                {/* Text — bottom */}
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
  { icon: Zap,          title: "Fast Turnaround",      desc: "Quick pickups and timely deliveries across all 20 Lagos LGAs." },
  { icon: ShieldCheck,  title: "Professional Riders",  desc: "Experienced, vetted, and uniformed delivery personnel." },
  { icon: MapPin,       title: "Real-Time Tracking",   desc: "Track every shipment live from pickup to delivery." },
  { icon: Package,      title: "Affordable Rates",     desc: "Competitive pricing with zero hidden fees." },
  { icon: ShieldCheck,  title: "Secure Handling",      desc: "Your packages are protected and insured throughout transit." },
  { icon: Headphones,   title: "Dedicated Support",    desc: "Human support always available when you need assistance." },
];

function WhyChooseUs() {
  return (
    <section style={{ background: "#f8f8f8", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            Why Sendaro
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Why Businesses Choose Us
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "10px auto 0" }}>
            Built for Lagos. Trusted by hundreds of businesses every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl p-7 flex flex-col gap-4 transition-transform hover:-translate-y-0.5"
                style={{
                  background: i % 3 === 1 ? "#0f0f0f" : "#fff",
                  border: i % 3 === 1 ? "none" : "1px solid #eee",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: "44px", height: "44px", background: i % 3 === 1 ? "rgba(239,0,4,0.15)" : "#fef2f2" }}
                >
                  <Icon size={20} color="#ef0004" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: i % 3 === 1 ? "#fff" : "#0f0f0f", marginBottom: "6px" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "13px", lineHeight: 1.7, color: i % 3 === 1 ? "rgba(255,255,255,0.6)" : "#666" }}>
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
   4. INDUSTRIES WE SERVE
═══════════════════════════════════════════ */
const INDUSTRIES = [
  { label: "E-commerce",               emoji: "🛍️" },
  { label: "Healthcare",               emoji: "🏥" },
  { label: "Legal Firms",              emoji: "⚖️" },
  { label: "Retail Stores",            emoji: "🏪" },
  { label: "Restaurants",              emoji: "🍽️" },
  { label: "Financial Services",       emoji: "🏦" },
  { label: "Manufacturing",            emoji: "🏭" },
  { label: "Educational Institutions", emoji: "🎓" },
  { label: "Government Agencies",      emoji: "🏛️" },
];

function Industries() {
  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            Sectors
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Industries We Serve
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "460px", margin: "10px auto 0" }}>
            From fashion startups to government agencies — Sendaro powers logistics for every sector in Lagos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.label}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-all hover:-translate-y-0.5 cursor-default"
              style={{
                background: "#f5f5f5",
                border: "1px solid #e8e8e8",
                fontFamily: "'Syne', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#0f0f0f",
              }}
            >
              <span>{ind.emoji}</span>
              {ind.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. DELIVERY PROCESS
═══════════════════════════════════════════ */
const PROCESS_STEPS = [
  { step: "01", title: "Book",    desc: "Submit your delivery request in under 60 seconds via app, web, or WhatsApp." },
  { step: "02", title: "Pickup",  desc: "Our verified rider arrives at your location and collects your package securely." },
  { step: "03", title: "Track",   desc: "Monitor your shipment in real time with live GPS updates and status notifications." },
  { step: "04", title: "Deliver", desc: "Package reaches its destination safely with photo proof of delivery." },
];

function DeliveryProcess() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0d1b3e 0%, #0a1628 60%, #111827 100%)",
        padding: "80px 0",
        margin: "0 16px",
        borderRadius: "24px",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center mb-14">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#93c5fd", fontFamily: "'Syne', sans-serif" }}>
            How It Works
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Delivery Process
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", lineHeight: 1.75, maxWidth: "460px", margin: "10px auto 0" }}>
            Four simple steps from booking to delivered — every time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((p, i) => (
            <div
              key={p.step}
              className="rounded-2xl p-6 flex flex-col gap-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "28px",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.12)",
                    lineHeight: 1,
                  }}
                >
                  {p.step}
                </span>
                {i < PROCESS_STEPS.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "18px" }}>→</span>
                )}
              </div>
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  {p.title}
                </p>
                <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. FAQ
═══════════════════════════════════════════ */
const FAQS = [
  { q: "How long does delivery take?",   a: "Same-day deliveries are completed within 8 hours of booking (book before 2PM). Express deliveries are delivered in 90 minutes to 3 hours." },
  { q: "Which areas do you cover?",      a: "We cover all 20 Lagos LGAs — from Badagry to Ikorodu, Lekki to Agege, and everywhere in between." },
  { q: "How can I track my shipment?",   a: "Every delivery comes with a live tracking link sent via WhatsApp and email. You can also track from your Sendaro dashboard in real time." },
  { q: "What items can I send?",         a: "We handle most non-hazardous items — documents, parcels, fashion, electronics, food, pharmaceuticals, and more. Contact us for oversized or restricted items." },
  { q: "Do you offer business accounts?", a: "Yes — our Business Logistics plan includes a dedicated account manager, monthly invoicing, multi-user dashboard, and custom SLAs. Contact sales to get started." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            FAQ
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "460px", margin: "10px auto 0" }}>
            Everything you need to know about Sendaro's services.
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
              backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.75)" }} />
          <div className="relative flex flex-col items-center text-center gap-8" style={{ zIndex: 2 }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Need a Logistics Partner?
              </h2>
              <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
                Get a free quote today and experience reliable delivery services across Lagos.
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