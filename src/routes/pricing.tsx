import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Zap, Clock, Shield, Headphones, ArrowRight, Package, Truck, Star } from "lucide-react";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NGN } from "@/constants";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Quick Reach Logistics" },
      { name: "description", content: "Transparent Lagos delivery pricing. No hidden fees." },
    ],
  }),
  component: Pricing,
});

/* ─────────────────────────────────────────
   HERO SECTION — matches About/Services style
───────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[360px] lg:min-h-[480px]">

        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80"
          alt="QuickReach Logistics Pricing"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[360px] lg:min-h-[480px] px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-20 sm:pt-28">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            <span
              className="text-red-500 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Pricing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-white font-bold leading-tight mb-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(38px, 4vw, 78px)",
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            Simple,<br />Transparent Pricing.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-white/70 max-w-md leading-relaxed mb-8"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}
          >
            From a single envelope to a full container. Final fare locks at booking — no surprises, ever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
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
   ALWAYS INCLUDED STRIP
───────────────────────────────────────── */
const includedEverywhere = [
  { icon: Shield, label: "No hidden fees", desc: "Fare locks at booking" },
  { icon: Clock, label: "Real-time tracking", desc: "Live updates & ETA" },
  { icon: Headphones, label: "Support included", desc: "Mon–Sat, 8 AM–6 PM" },
];

function IncludedStrip() {
  return (
    <section className="border-b bg-slate-50 py-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 divide-x divide-border">
          {includedEverywhere.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center justify-center gap-3 px-4">
              <Icon className="h-5 w-5 flex-shrink-0" style={{ color: "#ef0004" }} />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <p className="text-sm font-semibold sm:hidden">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PRICING TIERS
───────────────────────────────────────── */
const tiers = [
  {
    name: "Saver",
    price: 2500,
    eta: "Next day",
    blurb: "Best for next-day, non-urgent drops.",
    features: ["Next-day delivery", "Bike or van", "Standard tracking", "Email receipt"],
    icon: Package,
    accent: "#64748b",
    accentBg: "rgba(100,116,139,0.08)",
  },
  {
    name: "Standard",
    price: 4800,
    eta: "Same day",
    blurb: "The Quick Reach Logistics default. Same-day across Lagos.",
    features: ["Same-day before 6 PM", "Live tracking", "₦100k insurance", "WhatsApp updates"],
    popular: true,
    icon: Truck,
    accent: "#ef0004",
    accentBg: "rgba(239,0,4,0.08)",
  },
  {
    name: "Express",
    price: 7200,
    eta: "2–3 hrs",
    blurb: "Priority routing in under 3 hours.",
    features: ["2–3 hour delivery", "Dedicated rider", "₦250k insurance", "Photo POD"],
    icon: Zap,
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.08)",
  },
  {
    name: "Priority",
    price: 12000,
    eta: "Under 2 hrs",
    blurb: "Time-critical, high-value shipments.",
    features: ["Under 2 hours", "Senior rider", "₦500k insurance", "24/7 support"],
    icon: Star,
    accent: "#7c3aed",
    accentBg: "rgba(124,58,237,0.08)",
  },
];

function PricingTiers() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            Service Tiers
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Choose Your Speed
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "10px auto 0" }}>
            Every tier includes real-time tracking, professional riders, and zero hidden fees.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card
                  className={`relative flex h-full flex-col p-6 transition-shadow hover:shadow-md ${t.popular ? "shadow-md" : ""}`}
                  style={t.popular ? { borderColor: "#ef0004", boxShadow: "0 0 0 2px rgba(239,0,4,0.12), 0 4px 16px rgba(239,0,4,0.08)" } : undefined}
                >
                  {t.popular && (
                    <Badge
                      className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full text-white"
                      style={{ backgroundColor: "#ef0004" }}
                    >
                      Most Popular
                    </Badge>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundColor: t.accentBg }}>
                      <Icon className="h-4 w-4" style={{ color: t.accent }} />
                    </div>
                    <div>
                      <p className="font-display font-bold">{t.name}</p>
                      <p className="text-xs font-medium" style={{ color: t.accent }}>{t.eta}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="font-display text-3xl font-bold" style={t.popular ? { color: "#ef0004" } : undefined}>
                      {NGN(t.price)}
                    </p>
                    <p className="text-xs text-muted-foreground">starting price</p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{t.blurb}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: t.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-6 w-full gap-2 text-white"
                    style={t.popular ? { backgroundColor: "#ef0004" } : undefined}
                    variant={t.popular ? "default" : "outline"}
                  >
                    <Link to="/quote">Get a quote <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Final fare depends on distance, weight, and cargo type.{" "}
          <Link to="/quote" className="font-medium hover:underline" style={{ color: "#ef0004" }}>
            Use our quote engine
          </Link>{" "}
          for an exact price.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ROUTE PRICE LIST — from actual price image
───────────────────────────────────────── */
const ROUTE_PRICES: Record<string, { from: string; to: string; price: number }[]> = {
  "From Ajah": [
    { from: "Ajah", to: "Ajah", price: 2500 },
    { from: "Ajah", to: "Sangotodo", price: 2500 },
    { from: "Ajah", to: "Chevron", price: 2500 },
    { from: "Ajah", to: "Orchid", price: 2500 },
    { from: "Ajah", to: "VGC", price: 2500 },
    { from: "Ajah", to: "Ogombo", price: 2500 },
    { from: "Ajah", to: "Lekki", price: 3000 },
    { from: "Ajah", to: "V.I", price: 3500 },
    { from: "Ajah", to: "Ikoyi", price: 3500 },
    { from: "Ajah", to: "Lagos Island", price: 4000 },
    { from: "Ajah", to: "Surulere", price: 4500 },
    { from: "Ajah", to: "Yaba", price: 4500 },
    { from: "Ajah", to: "Ojota", price: 5000 },
    { from: "Ajah", to: "Ogudu", price: 5000 },
    { from: "Ajah", to: "Ikeja", price: 5000 },
    { from: "Ajah", to: "Apapa", price: 5000 },
    { from: "Ajah", to: "Gbagada", price: 5000 },
    { from: "Ajah", to: "Maryland", price: 5000 },
    { from: "Ajah", to: "Ago Palace", price: 5500 },
    { from: "Ajah", to: "Festac", price: 5500 },
    { from: "Ajah", to: "Ogba", price: 5500 },
    { from: "Ajah", to: "Ogudu", price: 5500 },
    { from: "Ajah", to: "Ojudu Berger", price: 6000 },
    { from: "Ajah", to: "Mile 2", price: 6000 },
    { from: "Ajah", to: "Igando", price: 6000 },
    { from: "Ajah", to: "Ikotun", price: 6000 },
    { from: "Ajah", to: "Ikorodu", price: 8000 },
  ],
};

function RoutePriceList() {
  return (
    <section style={{ background: "#f8f8f8", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            Route Pricing
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            Exact Prices by Route
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "10px auto 0" }}>
            Clear, upfront pricing for every Lagos route. No haggling, no surprises. 10% discount on all bulk orders.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {Object.entries(ROUTE_PRICES).map(([zone, routes]) => (
            <div key={zone}>
              {/* Zone header */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-white"
                  style={{ background: "#ef0004", fontFamily: "'Syne', sans-serif" }}
                >
                  {zone}
                </span>
                <div style={{ flex: 1, height: "1px", background: "#e5e5e5" }} />
                <span style={{ fontSize: "12px", color: "#888", whiteSpace: "nowrap" }}>
                  {routes.length} routes
                </span>
              </div>

              {/* Price grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {routes.map((route) => (
                  <div
                    key={`${route.from}-${route.to}`}
                    className="flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:shadow-sm"
                    style={{
                      background: "#fff",
                      border: "1px solid #eee",
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span style={{ fontSize: "10px", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}>
                        {route.from}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="#ef0004" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f0f0f", fontFamily: "'Syne', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {route.to}
                      </span>
                    </div>
                    <span
                      className="ml-3 flex-shrink-0 font-bold"
                      style={{ color: "#ef0004", fontFamily: "'Syne', sans-serif", fontSize: "14px" }}
                    >
                      ₦{route.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bulk discount callout */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-5"
          style={{ background: "#0f0f0f" }}
        >
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", fontSize: "16px" }}>
              10% Discount on All Bulk Orders
            </p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "4px" }}>
              Running regular deliveries? Contact us to set up a volume account with discounted rates.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
          >
            Contact Us
            <span className="inline-flex items-center justify-center rounded-full" style={{ width: "20px", height: "20px", background: "rgba(255,255,255,0.2)" }}>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FAQ
───────────────────────────────────────── */
const faqs = [
  { q: "Are there hidden fees?", a: "No. The price we quote is the price you pay. VAT is included in all fares." },
  { q: "What affects my final price?", a: "Distance, cargo type, vehicle, weight, and urgency. Use our quote engine for an exact figure." },
  { q: "Can I get a business rate?", a: "Yes — volume pricing is available for businesses. Contact our team." },
  { q: "Is insurance mandatory?", a: "No, but it's recommended. It costs 1.5% of your declared value with up to ₦500k cover." },
];

function FAQ() {
  return (
    <section className="border-t bg-slate-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Badge variant="secondary" className="mb-3 rounded-full">FAQ</Badge>
          <h2 className="font-display text-2xl font-bold tracking-tight">Pricing questions</h2>
        </div>
        <div className="space-y-0 divide-y rounded-2xl border bg-white">
          {faqs.map(({ q, a }) => (
            <div key={q} className="px-6 py-5">
              <p className="font-semibold">{q}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA — matches About page style
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
              backgroundImage: "url('/media/huge.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)" }} />
          <div className="relative flex flex-col items-center text-center gap-8" style={{ zIndex: 2 }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Ready to Ship Across Lagos?
              </h2>
              <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
                Get an instant quote in under 30 seconds — no account needed. Join hundreds of businesses who trust QuickReach.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
              >
                Get Instant Quote
                <span
                  className="inline-flex items-center justify-center rounded-full"
                  style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.25)" }}
                >
                  <ArrowUpRight size={12} color="#fff" />
                </span>
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold border border-white/40 text-white transition-all hover:bg-white/10"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
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
function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <HeroSection />
        <IncludedStrip />
        {/* <PricingTiers /> */}
        <RoutePriceList />
        <FAQ />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}