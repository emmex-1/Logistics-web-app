import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — QuickReach Logistics" },
      { name: "description", content: "Your trusted logistics partner delivering across Lagos with speed, reliability, and professionalism." },
      { property: "og:title", content: "About QuickReach" },
      { property: "og:description", content: "Your trusted logistics partner in Lagos." },
    ],
  }),
  component: About,
});

// import heroImage from "../media/about-craft.webp";
// import qrcac from "../media/qrcac.jpg";

/* ─────────────────────────────────────────
   HERO SECTION
   Structure taken from contact hero example:
   - bg-white wrapper with px-2 pt-2
   - inner rounded-3xl overflow-hidden div
   - <img> absolutely positioned behind black/80 overlay
   - subtle diagonal stripe texture overlay
   - content flex-col justify-end, animates in with framer-motion
   - NO breadcrumb, NO decorative vertical bars
───────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[360px] lg:min-h-[480px]">

        {/* Background image */}
        <img
          src="/media/about-craft.webp"
          alt="QuickReach Logistics"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Subtle diagonal stripe texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 60px)",
          }}
        />

        {/* Content — flex-col justify-end, left-aligned */}
        <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[360px] lg:min-h-[480px] px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-20 sm:pt-28">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            <span
              className="text-red-500 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Welcome to QuickReach Logistics
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white font-bold leading-tight mb-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(38px, 5vw, 78px)",
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            Your Trusted<br />Logistics Partner
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/70 max-w-md leading-relaxed mb-8"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}
          >
            Delivering across Lagos with speed, reliability, and professionalism — every single time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
            >
              Book Delivery
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.25)" }}
              >
                <ArrowUpRight size={12} color="#fff" />
              </span>
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold border border-white/30 text-white transition-all hover:bg-white/10"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Get Quote
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   OAL-STYLE INTRO SECTION
   Image card LEFT (with floating badge overlay) — text RIGHT
   Mirrors the OAL homepage layout exactly
───────────────────────────────────────── */
function IntroSection() {
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* LEFT — image with floating badge */}
          <div className="lg:w-[45%] relative">
            {/* Dotted grid decoration — top right */}
            <div
              className="absolute top-0 right-0 w-24 h-24 opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, #ccc 1px, transparent 1px)",
                backgroundSize: "10px 10px",
                zIndex: 0,
              }}
            />
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/5", zIndex: 1, boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80"
                alt="QuickReach Logistics operations"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge — bottom right of image */}
            <div
              className="absolute flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                bottom: "24px",
                right: "-8px",
                background: "#fff",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                zIndex: 3,
                minWidth: "160px",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl text-white text-lg"
                style={{ width: "44px", height: "44px", background: "#ef0004", flexShrink: 0 }}
              >
                🛵
              </div>
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px", color: "#0f0f0f", lineHeight: 1 }}>3+ Years</p>
                <p style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>Logistics Excellence</p>
              </div>
            </div>
          </div>

          {/* RIGHT — text content */}
          <div className="lg:w-[55%] flex flex-col gap-5">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#ef0004" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
                About QuickReach Logistics
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 900,
                color: "#0f0f0f",
                lineHeight: 1.1,
                letterSpacing: "-1px",
              }}
            >
              QuickReach Logistics
            </h2>

            <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.8 }}>
              QuickReach Logistics is one of Lagos's most reliable and fast-growing delivery companies. With a foundation built
              on integrity, speed, and an unwavering commitment to customer satisfaction, we deliver comprehensive
              logistics solutions across a broad range of industries.
            </p>
            <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.8 }}>
              We serve individuals, SMEs, corporations, and government agencies with the same dedication — combining
              professional rider teams with smart logistics technology tailored for Nigeria's unique urban environment.
            </p>

            {/* Checkpoints */}
            <div className="flex flex-col gap-3 mt-2">
              {[
                "Ranked among Lagos's top-tier logistics providers",
                "Professional team spanning all 20 LGAs",
                "Trusted by Fortune 500 companies and government institutions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#ef0004" strokeWidth="1.5" />
                    <path d="M8 12l3 3 5-5" stroke="#ef0004" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: "#333", fontSize: "14px" }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#0f0f0f", color: "#fff" }}
              >
                Read More
                <span
                  className="inline-flex items-center justify-center rounded-full"
                  style={{ width: "22px", height: "22px", background: "#ef0004" }}
                >
                  <ArrowUpRight size={12} color="#fff" />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   MISSION & VISION
───────────────────────────────────────── */
function MissionVision() {
  return (
    <section style={{ background: "#f8f8f8", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            Who We Are
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", lineHeight: 1.2, letterSpacing: "-0.5px", marginTop: "8px" }}>
            Empowering Lagos Commerce<br />with Reliable Logistics
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "560px", margin: "12px auto 0" }}>
            Take control of your delivery needs with effortless solutions that ensure reliability and growth. Focus on what matters most — growing your business.
          </p>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Story image card */}
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "300px" }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
            <div className="absolute bottom-0 left-0 p-7" style={{ zIndex: 2 }}>
              <p className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>Our Story</p>
              <p className="text-white/75 text-sm mt-1 max-w-xs leading-relaxed">
                QuickReach Logistics started in 2023 to solve Lagos's last-mile delivery chaos — built by riders, for businesses.
              </p>
            </div>
          </div>

          {/* Mission + Vision stacked */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-7 flex-1" style={{ background: "#fff", border: "1px solid #eee" }}>
              <p className="font-bold text-base mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "#0f0f0f" }}>Our Mission</p>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.7 }}>
                To provide fast, secure, and affordable delivery services that empower businesses and individuals across Lagos.
              </p>
            </div>
            <div className="rounded-2xl p-7 flex-1" style={{ background: "#0f0f0f" }}>
              <p className="font-bold text-base mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>Our Vision</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", lineHeight: 1.7 }}>
                To become the most trusted logistics platform in West Africa — connecting every business to every customer, seamlessly.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CORE VALUES
   Style: Synthorix dark navy — eyebrow + headline top-left,
   divider top-right, 4 numbered step cards, bottom trust bar
───────────────────────────────────────── */
const VALUES = [
  { step: "01.", title: "Reliability", desc: "We show up every time. Our riders deliver on schedule, rain or shine, across every corner of Lagos." },
  { step: "02.", title: "Speed", desc: "Same-day and express options mean your packages never wait. Fast pickups, faster drop-offs." },
  { step: "03.", title: "Customer First", desc: "Every decision starts with one question: is this best for our customer? Your satisfaction drives us." },
  { step: "04.", title: "Transparency", desc: "Real-time tracking, honest pricing, and clear communication at every step of your journey." },
];

const AVATAR_COLORS = ["#ef0004", "#1e3a5f", "#2d4a1e", "#4a2d1e"];

function CoreValues() {
  return (
    <div style={{ paddingTop: "80px", paddingBottom: "0" }}>
      {/* ── Section title header — sits above the dark card on white bg ── */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center mb-10">
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
          What We Stand For
        </span>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 800,
            color: "#0f0f0f",
            letterSpacing: "-0.5px",
            marginTop: "8px",
            lineHeight: 1.2,
          }}
        >
          Our Core Values
        </h2>
        <p
          style={{
            color: "#666",
            fontSize: "15px",
            lineHeight: 1.75,
            maxWidth: "480px",
            margin: "10px auto 0",
          }}
        >
          Four principles that guide every pick-up, every route, and every delivery we make across Lagos.
        </p>
      </div>

    <section
      style={{
        background: "linear-gradient(135deg, #101011 0%, #111112 60%, #111827 100%)",
        padding: "64px 0 0 0",
        borderRadius: "24px",
        margin: "0 16px 40px 16px",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 mb-10">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#181819" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#93c5fd", fontFamily: "'Syne', sans-serif" }}>
                4 Core Values
              </span>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
              Our Principles,<br />Your Confidence
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px", maxWidth: "380px" }}>
              Every delivery we make is guided by these four principles — built into every rider, every route, every handoff.
            </p>
          </div>
          <div className="hidden lg:flex lg:w-1/2 items-start pt-10">
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v) => (
            <div
              key={v.step}
              className="rounded-2xl p-6 flex flex-col gap-8 transition-transform hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", minHeight: "210px" }}
            >
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "4px" }}>{v.step}</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{v.title}</p>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginTop: "auto" }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 rounded-2xl px-6 py-4"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATAR_COLORS.map((c, i) => (
                <div key={i} className="rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: "32px", height: "32px", background: c, border: "2px solid #0d1b3e", zIndex: AVATAR_COLORS.length - i }}>
                  {["A","C","T","F"][i]}
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
              Trusted by businesses that{" "}
              <span style={{ color: "#fff", fontWeight: 700 }}>Choose QuickReach Logistics</span>
            </p>
          </div>
          <Link to="/book"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "#3b82f6", color: "#fff", whiteSpace: "nowrap" }}>
            Start Now
            <span className="inline-flex items-center justify-center rounded-full" style={{ width: "20px", height: "20px", background: "rgba(255,255,255,0.2)" }}>→</span>
          </Link>
        </div>
      </div>
      <div style={{ height: "48px" }} />
    </section>
    </div>
  );
}

/* ─────────────────────────────────────────
   WHY CHOOSE US — 4-image card grid with black overlay text
───────────────────────────────────────── */
const WHY_US = [
  { title: "Same-day Delivery", desc: "Order before 3PM and we'll deliver it today — guaranteed across all Lagos LGAs.", img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&q=80" },
  { title: "Professional Riders", desc: "Vetted, uniformed, and trained riders who handle your packages with care and respect.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
  { title: "Real-time Tracking", desc: "Know exactly where your package is at every moment with live GPS updates.", img: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=700&q=80" },
  { title: "Affordable Pricing", desc: "Transparent flat rates and no hidden fees. Quality logistics that doesn't break the bank.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80" },
];

function WhyChooseUs() {
  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            Why QuickReach Logistics
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Why Choose Us
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "10px auto 0" }}>
            We've built our service around what Lagos businesses actually need — speed, trust, and zero drama.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map((item) => (
            <div
              key={item.title}
              className="relative rounded-2xl overflow-hidden group"
              style={{ minHeight: "320px" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.25) 100%)" }} />
              <div className="absolute bottom-0 left-0 p-6" style={{ zIndex: 2 }}>
                <p className="font-bold text-white text-base mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</p>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "13px", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   VALIDATION / TRUST SECTION
───────────────────────────────────────── */
function Validation() {
  return (
    <section style={{ background: "#0a0a0a", padding: "100px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* LEFT — text content */}
          <div className="lg:w-1/2 flex flex-col gap-6">
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
              Legal &amp; Compliance
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 3.5vw, 48px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-1px",
              }}
            >
              Registered &amp; Verified
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.75, maxWidth: "440px" }}>
              QuickReach Logistics is a legally registered company in Nigeria, ensuring full transparency,
              accountability, and trust in every delivery and business dealing.
            </p>

            {/* Verification items */}
            <div className="flex flex-col gap-4 mt-2">
              {[
                { label: "Business Name Reg. No.", value: "7214893" },
                { label: "Registered Name", value: " QUICK REACH LOGISTICS LIMITED" },
                { label: "Regulatory Body", value: "Corporate Affairs Commission (CAC)" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  {/* Shield icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginTop: "1px", flexShrink: 0 }}>
                    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" fill="none" stroke="#ef0004" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke="#ef0004" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700 }}>{item.label}:</span>{" "}
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — document card */}
          <div className="lg:w-1/2 w-full">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "24px",
              }}
            >
              {/* Document image frame */}
              <div
                className="rounded-xl overflow-hidden flex items-center justify-center"
                style={{
                  background: "#fff",
                  minHeight: "340px",
                  padding: "24px",
                }}
              >
                {/* Simulated certificate document */}
                <div className="w-full max-w-xs text-center" style={{ fontFamily: "serif" }}>
                  <div className="flex justify-center mb-3">
                    {/* Eagle/crest placeholder */}
                    <div
                      className="rounded-full flex items-center justify-center text-2xl"
                      style={{ width: "56px", height: "56px", background: "#f0f4f0", border: "2px solid #22c55e" }}
                    >
                      🦅
                    </div>
                  </div>
                  <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", color: "#555", marginBottom: "2px" }}>FEDERAL REPUBLIC OF NIGERIA</p>
                  <p style={{ fontSize: "11px", fontWeight: 900, color: "#111", marginBottom: "2px" }}>CERTIFICATE OF REGISTRATION</p>
                  <p style={{ fontSize: "9px", color: "#555", marginBottom: "12px" }}>BUSINESS NAME REGISTRATION NO. 7214893</p>
                  <div style={{ height: "1px", background: "#22c55e", marginBottom: "12px" }} />
                  <p style={{ fontSize: "9px", color: "#555", marginBottom: "4px" }}>THE REGISTRAR-GENERAL OF CORPORATE AFFAIRS COMMISSION</p>
                  <p style={{ fontSize: "9px", color: "#555", marginBottom: "8px", fontStyle: "italic" }}>hereby certifies that</p>
                  <p style={{ fontSize: "13px", fontWeight: 900, color: "#ef0004", marginBottom: "8px", letterSpacing: "0.05em" }}>QUICKREACH LOGISTICS</p>
                  <p style={{ fontSize: "8px", color: "#555", lineHeight: 1.6, marginBottom: "8px" }}>
                    is this day registered as a business name under the<br />
                    COMPANIES AND ALLIED MATTERS ACT 2020
                  </p>
                  <p style={{ fontSize: "8px", color: "#555", lineHeight: 1.6, marginBottom: "16px" }}>
                    The general nature of business is:<br />
                    <strong>LOGISTICS, LAST-MILE DELIVERY AND COURIER SERVICES</strong>
                  </p>
                  <div style={{ height: "1px", background: "#ddd", marginBottom: "12px" }} />
                  <div className="flex items-center justify-center gap-2">
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e8f5e9", border: "1.5px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>CAC</div>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p
                className="text-center mt-3"
                style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}
              >
                Certificate of Incorporation — Corporate Affairs Commission
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   MEET OUR TEAM
   Style: exact match to TeamSection example — real image cards,
   aspect-ratio 3/4, gradient overlay, name/role/bio at bottom,
   ArrowUpRight hover icon top-right
───────────────────────────────────────── */
const TEAM = [
  {
    name: "Adebayo Okonkwo",
    role: "Founder & CEO",
    img: "/media/team-1.jpg",
    bio: "Visionary behind QuickReach Logistics. Built Lagos's most reliable last-mile delivery network from the ground up.",
  },
  {
    name: "Chidinma Eze",
    role: "Head of Operations",
    img: "/media/team-2.jpg",
    bio: "Manages 300+ riders and ensures every delivery runs like clockwork across all 20 LGAs.",
  },
  {
    name: "Tunde Adeyemi",
    role: "Tech Lead",
    img: "/media/team-3.jpg",
    bio: "Builds the tracking systems and customer-facing tools that power our real-time logistics platform.",
  },
  {
    name: "Fatima Bello",
    role: "Customer Success Lead",
    img: "/media/team-4.jpg",
    bio: "Ensures every client feels valued. Resolves issues fast and keeps satisfaction scores sky-high.",
  },
];

function MeetTeam() {
  return (
    <section style={{ background: "#f0f4ee", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10">
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#22c55e", marginBottom: "8px" }}>
            Team
          </p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-1px" }}>
            Meet the senior squad.
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "10px auto 0" }}>
            The people behind every on-time delivery and every satisfied customer.
          </p>
        </div>

        {/* 4-col image card grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="group relative overflow-hidden rounded-2xl cursor-pointer border border-transparent"
              style={{ border: "1px solid rgba(0,0,0,0.07)" }}
            >
              {/* Image fills card at 3/4 aspect ratio */}
              <div className="relative overflow-hidden bg-gray-200" style={{ aspectRatio: "3/4" }}>
                <img
                  src={m.img}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    // neutral placeholder on missing image
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.style.background = "#1a1a2e";
                      parent.style.display = "flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      const initials = m.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2);
                      parent.innerHTML += `<span style="font-size:40px;font-weight:800;color:rgba(255,255,255,0.3);font-family:'Syne',sans-serif;position:absolute">${initials}</span>`;
                    }
                  }}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.35) 70%, transparent 100%)" }} />

                {/* Arrow icon — top right, appears on hover */}
                <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>

                {/* Name / role / bio — bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "17px", fontWeight: 700, lineHeight: 1.2 }}>{m.name}</p>
                  <p style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{m.role}</p>
                  <p style={{ fontSize: "12px", lineHeight: 1.65, color: "rgba(255,255,255,0.8)", marginTop: "8px" }}>{m.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────── */
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
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)" }} />
          <div className="relative flex flex-col items-center text-center gap-8" style={{ zIndex: 2 }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Ready to Deliver With Confidence?
              </h2>
              <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
                Join hundreds of businesses across Lagos who trust QuickReach Logistics for fast, reliable, and professional delivery.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/quote"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#ef0004", color: "#fff" }}>
                Get Quote
              </Link>
              <Link to="/book"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold border border-white/40 text-white transition-all hover:bg-white/10">
                Book Delivery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
function About() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <HeroSection />
        <IntroSection />
        <MissionVision />
        <CoreValues />
        <WhyChooseUs />
        <Validation />
        <MeetTeam />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}
