import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Button } from "@/components/ui/button";
import { trackingService } from "@/services/shipment.service";
import type { Shipment } from "@/types";
import {
  Phone, Star, MapPin, Clock, Package, CheckCircle2, Truck,
  ChevronLeft, Share2, Navigation, Shield, AlertCircle, ArrowUpRight,
  Scan, ArrowRight, Copy, Check, RefreshCw, Square, Play,
} from "lucide-react";
import { SHIPMENT_STATUS_LABELS, NGN } from "@/constants";
import { AnimatedRouteMap } from "@/components/shared/animated-route-map";
import { toast } from "sonner";

export const Route = createFileRoute("/track/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Tracking ${params.id} — QuickReach Logistics` },
      { name: "description", content: "Real-time QuickReach Logistics shipment tracking." },
    ],
  }),
  component: TrackDetail,
});

/* ─────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────── */
const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string; pulse: boolean }> = {
  pending:           { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  label: "Pending",          pulse: false },
  confirmed:         { color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  label: "Confirmed",        pulse: false },
  assigned:          { color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  label: "Assigned",         pulse: true  },
  rider_assigned:    { color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  label: "Rider Assigned",   pulse: true  },
  picked_up:         { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",  label: "Picked Up",        pulse: true  },
  in_transit:        { color: "#ef0004", bg: "rgba(239,0,4,0.1)",     label: "In Transit",       pulse: true  },
  out_for_delivery:  { color: "#ef0004", bg: "rgba(239,0,4,0.1)",     label: "Out for Delivery", pulse: true  },
  delivered:         { color: "#22c55e", bg: "rgba(34,197,94,0.1)",   label: "Delivered",        pulse: false },
  failed:            { color: "#ef4444", bg: "rgba(239,68,68,0.1)",   label: "Failed",           pulse: false },
  cancelled:         { color: "#6b7280", bg: "rgba(107,114,128,0.1)", label: "Cancelled",        pulse: false },
};

/* ─────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────── */
function StatusBadge({ status }: { status: Shipment["status"] }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}
    >
      {cfg.pulse && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ background: cfg.color }}
        />
      )}
      {SHIPMENT_STATUS_LABELS[status] ?? cfg.label}
    </span>
  );
}

/* ─────────────────────────────────────────
   STEP PROGRESS BAR
───────────────────────────────────────── */
const PROGRESS_STEPS = [
  { key: "confirmed",        label: "Confirmed"   },
  { key: "rider_assigned",   label: "Assigned"    },
  { key: "picked_up",        label: "Picked Up"   },
  { key: "in_transit",       label: "In Transit"  },
  { key: "out_for_delivery", label: "Out for Del" },
  { key: "delivered",        label: "Delivered"   },
];

function ProgressBar({ status }: { status: Shipment["status"] }) {
  const currentIdx = PROGRESS_STEPS.findIndex((s) => s.key === status);
  const isFailed = status === "failed" || status === "cancelled";

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-[14px] h-0.5" style={{ background: "#e5e5e5", zIndex: 0 }} />
        <div
          className="absolute left-0 top-[14px] h-0.5 transition-all duration-700"
          style={{
            width: isFailed
              ? "100%"
              : `${(Math.max(currentIdx, 0) / (PROGRESS_STEPS.length - 1)) * 100}%`,
            background: isFailed ? "#ef4444" : "#ef0004",
            zIndex: 1,
          }}
        />
        {PROGRESS_STEPS.map((step, i) => {
          const done = !isFailed && i <= currentIdx;
          const active = !isFailed && i === currentIdx;
          return (
            <div key={step.key} className="relative flex flex-col items-center gap-2" style={{ zIndex: 2 }}>
              <div
                className="flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: active ? "30px" : "28px",
                  height: active ? "30px" : "28px",
                  background: done ? "#ef0004" : isFailed ? "#ef4444" : "#e5e5e5",
                  border: active ? "3px solid #fff" : "none",
                  boxShadow: active ? "0 0 0 3px rgba(239,0,4,0.2)" : "none",
                }}
              >
                {done && !active && <Check size={12} color="#fff" strokeWidth={3} />}
                {active && <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />}
                {!done && !active && !isFailed && (
                  <span className="inline-block h-2 w-2 rounded-full bg-white/60" />
                )}
              </div>
              <span
                className="text-[10px] font-semibold text-center whitespace-nowrap hidden sm:block"
                style={{ color: done ? "#ef0004" : "#aaa" }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COPY BUTTON
───────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all hover:opacity-80"
      style={{ background: "rgba(239,0,4,0.08)", color: "#ef0004", border: "1px solid rgba(239,0,4,0.2)" }}
      title="Copy tracking code"
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ─────────────────────────────────────────
   LOADING SKELETON
───────────────────────────────────────── */
function TrackingSkeleton({ onCancel }: { onCancel?: () => void }) {
  return (
    <div className="min-h-screen" style={{ background: "#f8f8f8" }}>
      <MarketingNav />
      <div
        className="flex items-center justify-between gap-3 py-3 px-6 text-sm font-medium text-white"
        style={{ background: "#ef0004" }}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex gap-1">
            {[0, 0.15, 0.3].map((d, i) => (
              <span
                key={i}
                className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-bounce"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </span>
          Fetching shipment details…
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-xs font-bold bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-7 w-52 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-5 w-40 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-14 w-full animate-pulse rounded-2xl bg-slate-100" />
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <div className="aspect-[16/10] animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-52 animate-pulse rounded-2xl bg-slate-100" />
          </div>
          <div className="space-y-4">
            <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-36 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-44 animate-pulse rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NOT FOUND
───────────────────────────────────────── */
function TrackingNotFound({ id }: { id: string }) {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <div className="mx-auto max-w-lg px-4 py-32 text-center">
        <div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "rgba(239,0,4,0.08)" }}
        >
          <AlertCircle size={36} style={{ color: "#ef0004" }} />
        </div>
        <h1
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px" }}
        >
          Shipment Not Found
        </h1>
        <p className="mt-3 text-sm" style={{ color: "#777", lineHeight: 1.7 }}>
          We couldn't find a shipment for{" "}
          <span className="font-mono font-bold text-slate-800">{id}</span>.
          Double-check the tracking code or contact support.
        </p>
        <div className="mt-8 flex flex-row flex-wrap gap-3 justify-center">
          <Link
            to="/track"
            search={{ id: undefined }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
            style={{ background: "#ef0004" }}
          >
            <Scan size={15} /> Try another code
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Contact support
          </Link>
        </div>
      </div>
      <MarketingFooter />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN DETAIL PAGE
───────────────────────────────────────── */
function TrackDetail() {
  const { id } = Route.useParams();

  // undefined = loading, null = not found, Shipment = loaded
  const [shp, setShp] = useState<Shipment | null | undefined>(undefined);
  const [isTracking, setIsTracking] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const unsubRef = useRef<(() => void) | null>(null);

  const stopTracking = useCallback(() => {
    unsubRef.current?.();
    unsubRef.current = null;
    setIsTracking(false);
  }, []);

  const startTracking = useCallback(() => {
    unsubRef.current?.();
    setIsTracking(true);

    const unsub = trackingService.subscribe(id, (data) => {
      setShp(data ?? null);
      setLastUpdated(new Date());
    });

    unsubRef.current = unsub;
  }, [id]);

  useEffect(() => {
    startTracking();
    return () => {
      unsubRef.current?.();
    };
  }, [startTracking]);

  // ── Loading — only shown briefly since mock data fires instantly ──
  if (shp === undefined) {
    return (
      <TrackingSkeleton
        onCancel={() => {
          stopTracking();
          setShp(null);
        }}
      />
    );
  }

  // ── Not found ──
  if (shp === null) return <TrackingNotFound id={id} />;

  const isActive =
    shp.status !== "delivered" &&
    shp.status !== "failed" &&
    shp.status !== "cancelled";

  return (
    <div className="min-h-screen" style={{ background: "#f8f8f8" }}>
      <MarketingNav />

      {/* ── Live / Paused banner ── */}
      <AnimatePresence mode="wait">
        {isActive && isTracking ? (
          <motion.div
            key="live"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div
              className="flex items-center justify-center gap-2.5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "#ef0004" }}
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white/70" />
              Your delivery is live · Updating in real time
            </div>
          </motion.div>
        ) : !isTracking ? (
          <motion.div
            key="paused"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div
              className="flex items-center justify-center gap-2.5 py-2.5 text-sm font-semibold"
              style={{ background: "#f5f5f5", color: "#888", borderBottom: "1px solid #eee" }}
            >
              <Square size={12} />
              Live tracking paused ·
              <button
                onClick={startTracking}
                className="font-bold underline ml-1"
                style={{ color: "#ef0004" }}
              >
                Resume
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-3 text-slate-500 hover:text-slate-900">
            <Link to="/track" search={{ id: undefined }}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to tracking
            </Link>
          </Button>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px", color: "#0f0f0f" }}
                >
                  Tracking{" "}
                  <span className="font-mono" style={{ color: "#ef0004" }}>
                    {shp.trackingCode}
                  </span>
                </h1>
                <CopyButton text={shp.trackingCode} />
              </div>
              <p className="flex flex-wrap items-center gap-1.5 text-sm" style={{ color: "#777" }}>
                <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "#ef0004" }} />
                <span>{shp.pickup.area}</span>
                <ArrowRight size={12} className="shrink-0" />
                <span>{shp.destination.area}</span>
              </p>
              {lastUpdated && (
                <p className="mt-1 text-[11px]" style={{ color: "#bbb" }}>
                  Last updated {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={shp.status} />

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={startTracking}
                title="Refresh"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isTracking ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              {isTracking ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  style={{ color: "#ef4444", borderColor: "#fca5a5" }}
                  onClick={stopTracking}
                >
                  <Square className="h-3.5 w-3.5" /> Stop
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={startTracking}
                >
                  <Play className="h-3.5 w-3.5" /> Resume
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Tracking link copied!");
                }}
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </Button>
            </div>
          </div>

          {/* Progress bar card */}
          <div
            className="mt-6 rounded-2xl p-5 sm:p-6"
            style={{ background: "#fff", border: "1px solid #eee" }}
          >
            <div className="flex items-center justify-between mb-5">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#aaa", fontFamily: "'Syne', sans-serif" }}
              >
                Delivery Progress
              </span>
              <StatusBadge status={shp.status} />
            </div>
            <ProgressBar status={shp.status} />
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">

          {/* ── LEFT ── */}
          <div className="space-y-5">

            {/* Map */}
            <div
              className="overflow-hidden rounded-2xl"
              style={{ border: "1px solid #eee", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ background: "#fff", borderColor: "#f0f0f0" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center rounded-lg"
                    style={{ width: "30px", height: "30px", background: "rgba(239,0,4,0.08)" }}
                  >
                    <Navigation size={14} style={{ color: "#ef0004" }} />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "'Syne', sans-serif", color: "#0f0f0f" }}
                  >
                    Live Route Map
                  </span>
                </div>
                {isActive && isTracking && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{ background: "rgba(239,0,4,0.08)", color: "#ef0004" }}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <AnimatedRouteMap className="!aspect-[16/10]" />
            </div>

            {/* Timeline */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#fff", border: "1px solid #eee", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
            >
              <div
                className="flex items-center gap-2.5 px-5 py-4 border-b"
                style={{ borderColor: "#f0f0f0" }}
              >
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{ width: "30px", height: "30px", background: "rgba(239,0,4,0.08)" }}
                >
                  <Clock size={14} style={{ color: "#ef0004" }} />
                </div>
                <h2
                  className="text-sm font-semibold"
                  style={{ fontFamily: "'Syne', sans-serif", color: "#0f0f0f" }}
                >
                  Status Timeline
                </h2>
                <span className="ml-auto text-xs" style={{ color: "#aaa" }}>
                  {shp.events.length} event{shp.events.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="px-5 py-4">
                <ol className="space-y-0">
                  {[...shp.events].reverse().map((e, i) => {
                    const isLatest = i === 0;
                    return (
                      <li key={e.id} className="relative grid grid-cols-[32px_1fr] gap-x-4">
                        <div className="relative flex flex-col items-center">
                          <div
                            className="z-10 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full transition-all"
                            style={
                              isLatest
                                ? { backgroundColor: "#ef0004", color: "#fff", boxShadow: "0 0 0 4px rgba(239,0,4,0.12)" }
                                : { backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }
                            }
                          >
                            {isLatest ? (
                              <Truck className="h-4 w-4" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </div>
                          {i !== shp.events.length - 1 && (
                            <div className="my-1 w-px flex-1 bg-slate-100" style={{ minHeight: "20px" }} />
                          )}
                        </div>
                        <div className={`${i !== shp.events.length - 1 ? "pb-5" : "pb-0"}`}>
                          <p
                            className="text-sm font-semibold"
                            style={isLatest ? { color: "#ef0004" } : { color: "#0f0f0f" }}
                          >
                            {e.title}
                          </p>
                          {e.description && (
                            <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                              {e.description}
                            </p>
                          )}
                          <p className="mt-0.5 text-xs" style={{ color: "#bbb" }}>
                            {new Date(e.at).toLocaleString()}
                            {e.location && (
                              <> · <span style={{ color: "#999" }}>{e.location}</span></>
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="space-y-4">

            {/* ETA card */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div
                className="overflow-hidden rounded-2xl"
                style={{ border: "1px solid rgba(239,0,4,0.2)", boxShadow: "0 2px 16px rgba(239,0,4,0.06)" }}
              >
                <div className="px-5 py-5" style={{ background: "#ef0004" }}>
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Estimated Arrival
                  </p>
                  {shp.status === "delivered" ? (
                    <div className="mt-2 flex items-center gap-2">
                      <CheckCircle2 size={28} color="#fff" />
                      <span
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        Delivered!
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-baseline gap-2">
                      <span
                        className="font-bold text-white"
                        style={{ fontFamily: "'Syne', sans-serif", fontSize: "56px", lineHeight: 1 }}
                      >
                        {shp.etaMinutes ?? 0}
                      </span>
                      <span className="text-xl font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                        min
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs"
                  style={{ background: "#fff", color: "#aaa" }}
                >
                  <Clock className="h-3.5 w-3.5" style={{ color: "#ef0004" }} />
                  {shp.status === "delivered"
                    ? "Package received successfully"
                    : isTracking
                    ? "Updates every few seconds"
                    : "Tracking paused"}
                </div>
              </div>
            </motion.div>

            {/* Rider card */}
            {shp.driver && (
              <div
                className="rounded-2xl p-5"
                style={{ background: "#fff", border: "1px solid #eee" }}
              >
                <p
                  className="mb-4 text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#bbb" }}
                >
                  Your Rider
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full font-bold text-white"
                    style={{ background: "#ef0004", fontFamily: "'Syne', sans-serif", fontSize: "16px" }}
                  >
                    {shp.driver.name.split(" ").map((s: string) => s[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "#0f0f0f" }}>
                      {shp.driver.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: "#888" }}>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {shp.driver.rating.toFixed(1)} · {shp.driver.trips} trips
                    </div>
                    <p className="mt-0.5 truncate text-xs" style={{ color: "#aaa" }}>
                      {shp.driver.vehicle.model} · {shp.driver.vehicle.plate}
                    </p>
                  </div>
                  <a
                    href={`tel:${shp.driver.phone ?? ""}`}
                    className="flex-shrink-0 flex items-center justify-center rounded-full h-10 w-10 transition-all hover:opacity-80"
                    style={{ background: "#ef0004" }}
                    title="Call rider"
                  >
                    <Phone className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
            )}

            {/* Shipment details */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#fff", border: "1px solid #eee" }}
            >
              <div
                className="flex items-center gap-2.5 px-5 py-3.5 border-b"
                style={{ borderColor: "#f5f5f5" }}
              >
                <Package size={14} style={{ color: "#ef0004" }} />
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#bbb" }}>
                  Shipment Details
                </p>
              </div>
              <dl className="divide-y divide-[#f5f5f5] text-sm">
                {[
                  { k: "From",     v: shp.pickup.area,           icon: <MapPin size={12} className="text-slate-300" /> },
                  { k: "To",       v: shp.destination.area,      icon: <MapPin size={12} className="text-slate-300" /> },
                  { k: "Cargo",    v: shp.cargo,                 icon: <Package size={12} className="text-slate-300" /> },
                  { k: "Distance", v: `${shp.pricing.distanceKm} km`, icon: null },
                  { k: "Total",    v: NGN(shp.pricing.total),    icon: null },
                ].map(({ k, v, icon }) => (
                  <div key={k} className="flex items-center justify-between px-5 py-3">
                    <span style={{ color: "#999" }}>{k}</span>
                    <span
                      className="flex items-center gap-1 font-semibold text-right"
                      style={{ color: "#0f0f0f" }}
                    >
                      {icon}{v}
                    </span>
                  </div>
                ))}
              </dl>
            </div>

            {/* Insurance */}
            {shp.insurance && (
              <div
                className="flex items-center gap-3 rounded-2xl p-4"
                style={{ background: "rgba(239,0,4,0.03)", border: "1px solid rgba(239,0,4,0.15)" }}
              >
                <Shield className="h-5 w-5 flex-shrink-0" style={{ color: "#ef0004" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0f0f0f" }}>
                    Insured delivery
                  </p>
                  <p className="text-xs" style={{ color: "#888" }}>Covered up to ₦500,000</p>
                </div>
              </div>
            )}

            {/* Proof of delivery */}
            {shp.pod && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "#fff", border: "1px solid #d1fae5" }}
              >
                <div
                  className="flex items-center gap-2 px-5 py-3.5 border-b"
                  style={{ borderColor: "#d1fae5", background: "#f0fdf4" }}
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                    Proof of Delivery
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm">
                    Received by{" "}
                    <span className="font-semibold" style={{ color: "#0f0f0f" }}>
                      {shp.pod.receivedBy}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: "#aaa" }}>
                    {new Date(shp.pod.receivedAt).toLocaleString()}
                  </p>
                  {shp.pod.notes && (
                    <p
                      className="mt-3 rounded-xl px-3 py-2 text-xs italic"
                      style={{ background: "#f7f7f7", color: "#888" }}
                    >
                      "{shp.pod.notes}"
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Failed / Cancelled */}
            {(shp.status === "failed" || shp.status === "cancelled") && (
              <div
                className="flex items-start gap-3 rounded-2xl p-5"
                style={{ background: "#fff5f5", border: "1px solid rgba(239,68,68,0.25)" }}
              >
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <div>
                  <p className="text-sm font-semibold text-red-600 capitalize">
                    Delivery {shp.status}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: "#888" }}>
                    Contact support or rebook this delivery.
                  </p>
                  <Link
                    to="/book"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "#ef0004" }}
                  >
                    Rebook delivery <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}