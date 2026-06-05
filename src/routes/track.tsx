import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Scan,
  ArrowUpRight,
  MapPin,
  Bell,
  Star,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { trackingService } from "@/services/shipment.service";
import { mockShipments } from "@/mock/data";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Track Package — QuickReach Logistics" },
      { name: "description", content: "Track a QuickReach Logistics shipment in real time." },
    ],
  }),
  component: TrackPage,
});

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
function HeroSection({
  code,
  setCode,
  onSubmit,
  pending,
  error,
}: {
  code: string;
  setCode: (v: string) => void;
  onSubmit: () => void;
  pending: boolean;
  error: boolean;
}) {
  return (
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[420px] lg:min-h-[540px]">

        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1600&q=80"
          alt="Track your delivery"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/82" />
        <div
          className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: "#ef0004" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end min-h-[320px] sm:min-h-[420px] lg:min-h-[540px] px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-20 sm:pt-28">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse" />
            <span
              className="text-red-500 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Live Tracking
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
              fontSize: "clamp(36px, 4vw, 74px)",
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            Where's Your<br />
            <span style={{ color: "#ef0004" }}>Package?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-white/70 max-w-md leading-relaxed mb-8"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}
          >
            Enter your tracking code for live status, rider location, and real-time ETA across Lagos.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="w-full max-w-xl"
          >
            <div
              className="flex overflow-hidden rounded-2xl"
              style={{
                background: "#fff",
                boxShadow: error
                  ? "0 0 0 2px #ef0004, 0 8px 40px rgba(0,0,0,0.3)"
                  : "0 8px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div className="relative flex-1">
                {pending ? (
                  <Loader2
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 animate-spin"
                    size={18}
                    style={{ color: "#ef0004" }}
                  />
                ) : (
                  <Scan
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                    size={18}
                    style={{ color: error ? "#ef0004" : "#94a3b8" }}
                  />
                )}
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                  placeholder="e.g. SDR9000235"
                  className="h-14 w-full bg-transparent pl-12 pr-4 text-base font-mono font-semibold tracking-wider outline-none placeholder:text-slate-300"
                  style={{ color: "#0f0f0f" }}
                />
              </div>
              <button
                onClick={onSubmit}
                disabled={pending || !code.trim()}
                className="flex items-center gap-2 px-7 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
                style={{
                  background: "#ef0004",
                  fontFamily: "'Syne', sans-serif",
                  minWidth: "120px",
                  justifyContent: "center",
                }}
              >
                {pending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Tracking…
                  </>
                ) : (
                  <>Track <ArrowRight size={16} /></>
                )}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 rounded-xl px-4 py-2.5"
                style={{ background: "rgba(239,0,4,0.12)", border: "1px solid rgba(239,0,4,0.25)" }}
              >
                <AlertCircle size={14} style={{ color: "#ef0004", flexShrink: 0 }} />
                <span className="text-xs font-medium" style={{ color: "#fff" }}>
                  Tracking code not found. Double-check it or try a sample below.
                </span>
              </motion.div>
            )}

            {/* Sample codes */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-white/40 self-center mr-1 uppercase tracking-wider">
                Try:
              </span>
              {mockShipments.slice(0, 4).map((s) => (
                <Link
                  key={s.id}
                  to="/track/$id"
                  params={{ id: s.id }} search={{ id: undefined }}
                  search={{ id: undefined }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono font-medium transition-all hover:bg-white/15"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        s.status === "delivered"
                          ? "#22c55e"
                          : s.status === "in_transit"
                          ? "#ef0004"
                          : "#64748b",
                    }}
                  />
                  {s.trackingCode}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────── */
const HOW_STEPS = [
  { icon: Package,      number: "01", title: "Book Your Delivery",   desc: "Complete your booking in a few steps — pickup, destination, package details, and payment.",            color: "#ef0004", bg: "rgba(239,0,4,0.08)"     },
  { icon: Truck,        number: "02", title: "Rider Dispatched",      desc: "Your box-bike rider is immediately assigned and dispatched to your pickup location.",                   color: "#f59e0b", bg: "rgba(245,158,11,0.08)"  },
  { icon: MapPin,       number: "03", title: "Track in Real Time",    desc: "Enter your tracking code to see live rider location, status updates, and ETA.",                         color: "#3b82f6", bg: "rgba(59,130,246,0.08)"  },
  { icon: Bell,         number: "04", title: "WhatsApp Updates",      desc: "Receive live notifications on every status change — pickup, in transit, and delivered.",                color: "#8b5cf6", bg: "rgba(139,92,246,0.08)"  },
  { icon: CheckCircle2, number: "05", title: "Delivered & Confirmed", desc: "Recipient confirms delivery. You get proof of delivery with photo and timestamp.",                      color: "#22c55e", bg: "rgba(34,197,94,0.08)"   },
];

function HowItWorks() {
  return (
    <section style={{ background: "#fff", padding: "88px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center mb-16">
          <span
            style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif",
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800, color: "#0f0f0f", letterSpacing: "-1px", marginTop: "8px", lineHeight: 1.1,
            }}
          >
            From Booking to<br />Doorstep Delivery
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.75, maxWidth: "480px", margin: "12px auto 0" }}>
            A seamless end-to-end process built for Lagos — fast, trackable, and zero stress.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <div className="relative flex items-start justify-between gap-0">
            <div
              className="absolute top-[36px] left-[10%] right-[10%] h-px"
              style={{
                background: "linear-gradient(90deg, #ef0004 0%, #f59e0b 25%, #3b82f6 50%, #8b5cf6 75%, #22c55e 100%)",
                opacity: 0.25,
              }}
            />
            {HOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative flex flex-col items-center text-center"
                  style={{ width: "18%" }}
                >
                  <span
                    className="mb-3 font-bold text-xs"
                    style={{ fontFamily: "'Syne', sans-serif", color: step.color, letterSpacing: "0.1em" }}
                  >
                    {step.number}
                  </span>
                  <div
                    className="relative flex items-center justify-center rounded-full mb-5 z-10"
                    style={{
                      width: "72px", height: "72px", background: step.bg,
                      border: `2px solid ${step.color}22`,
                      boxShadow: `0 0 0 6px ${step.color}08`,
                    }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                    {i < HOW_STEPS.length - 1 && (
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full z-20"
                        style={{ width: "10px", height: "10px", background: step.color, border: "2px solid #fff" }}
                      />
                    )}
                    {i > 0 && (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full z-20"
                        style={{ width: "10px", height: "10px", background: HOW_STEPS[i - 1].color, border: "2px solid #fff" }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "15px",
                      color: "#0f0f0f", lineHeight: 1.2, marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </p>
                  <p style={{ fontSize: "12.5px", color: "#777", lineHeight: 1.65 }}>{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden space-y-0">
          {HOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === HOW_STEPS.length - 1;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-5"
                style={{ paddingBottom: isLast ? 0 : "32px" }}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="flex items-center justify-center rounded-full z-10"
                    style={{
                      width: "56px", height: "56px", background: step.bg,
                      border: `2px solid ${step.color}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: step.color }} />
                  </div>
                  {!isLast && (
                    <div
                      className="flex-1 w-px mt-2"
                      style={{
                        background: `linear-gradient(to bottom, ${step.color}40, ${HOW_STEPS[i + 1].color}40)`,
                        minHeight: "32px",
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 pb-1 pt-1">
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif", fontSize: "10px", fontWeight: 700,
                      color: step.color, letterSpacing: "0.12em", textTransform: "uppercase",
                    }}
                  >
                    {step.number}
                  </span>
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px",
                      color: "#0f0f0f", lineHeight: 1.2, marginTop: "2px", marginBottom: "6px",
                    }}
                  >
                    {step.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#ef0004", fontFamily: "'Syne', sans-serif" }}
          >
            Book a Delivery
            <span
              className="inline-flex items-center justify-center rounded-full"
              style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.2)" }}
            >
              <ArrowUpRight size={12} color="#fff" />
            </span>
          </Link>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold border border-slate-200 text-slate-700 transition-all hover:bg-slate-50"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section style={{ background: "#f8f8f8", borderTop: "1px solid #eee", padding: "48px 0" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Clock,        label: "Real-time ETA",     desc: "Updates every few seconds" },
            { icon: Truck,        label: "Rider Location",    desc: "Live map tracking"          },
            { icon: Package,      label: "Status History",    desc: "Full event timeline"        },
            { icon: CheckCircle2, label: "Proof of Delivery", desc: "Recipient confirmation"     },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col gap-3 rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid #eee" }}
            >
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: "40px", height: "40px", background: "rgba(239,0,4,0.08)" }}
              >
                <Icon size={18} style={{ color: "#ef0004" }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "#0f0f0f" }}>
                  {label}
                </p>
                <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ background: "#f8f3f3" }}>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-10 sm:p-16"
          style={{ minHeight: "300px" }}
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
          <div className="relative flex flex-col items-center text-center gap-6" style={{ zIndex: 2 }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1,
                }}
              >
                Ready to Deliver With Confidence?
              </h2>
              <p
                className="mt-3 max-w-lg mx-auto"
                style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", lineHeight: 1.7 }}
              >
                Join hundreds of businesses across Lagos who trust QuickReach Logistics for fast,
                reliable, and professional delivery.
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-3 justify-center">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif", minWidth: "140px" }}
              >
                Book Delivery <ArrowUpRight size={15} />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold border border-white/40 text-white transition-all hover:bg-white/10 whitespace-nowrap"
                style={{ fontFamily: "'Syne', sans-serif", minWidth: "140px" }}
              >
                Get Quote
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
function TrackPage() {
  const navigate = useNavigate();
  const { id: paramId } = Route.useSearch();
  const [code, setCode] = useState(paramId ?? "");
  const [hasError, setHasError] = useState(false);

  const didAutoTrack = useRef(false);

  const m = useMutation({
    mutationFn: trackingService.byCode,
    onSuccess: (s) => {
      setHasError(false);
      navigate({
        to: "/track/$id",
        params: { id: s.id },
        search: { id: undefined },
      });
    },
    onError: () => {
      setHasError(true);
      toast.error("Tracking code not found. Try one of the sample codes.");
    },
  });

  // Fire once when arriving from homepage hero with ?id= param
  useEffect(() => {
    if (paramId && !didAutoTrack.current) {
      didAutoTrack.current = true;
      setCode(paramId);
      m.mutate(paramId);
    }
  }, [paramId]);

  const handleSubmit = () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setHasError(false);
    m.mutate(trimmed);
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <HeroSection
          code={code}
          setCode={(v) => { setCode(v); setHasError(false); }}
          onSubmit={handleSubmit}
          pending={m.isPending}
          error={hasError}
        />
        <HowItWorks />
        <FeatureStrip />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}