import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  MessageCircle,
  MapPin,
  Package,
  Zap,
  ArrowRight,
  Calculator,
  Clock,
  ArrowUpRight,
  ChevronDown,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Bike,
  Shield,
  X,
  // How It Works icons
  ClipboardList,
  Zap as ZapIcon,
  CheckSquare,
  Bike as BikeIcon,
} from "lucide-react";
import { BRAND, NGN } from "@/constants";
import { useBookingStore } from "@/store";
import { toast } from "sonner";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Quick Reach Logistics" },
      {
        name: "description",
        content:
          "Instant Lagos delivery pricing in 30 seconds. Pick your tier and book.",
      },
    ],
  }),
  component: QuotePage,
});

/* ─────────────────────────────────────────
   CONSTANTS & HELPERS
───────────────────────────────────────── */
const LAGOS_AREAS = [
  "Ajah", "Alimosho", "Apapa", "Badagry", "Festac", "Gbagada",
  "Ikeja", "Ikeja GRA", "Ikoyi", "Ikorodu", "Isale Eko", "Lagos Island",
  "Lekki Phase 1", "Lekki Phase 2", "Maryland", "Mile 2", "Mushin",
  "Ojota", "Ojudu Berger", "Ojo", "Orile", "Oshodi", "Shomolu",
  "Surulere", "Sangotodo", "Chevron", "Orchid", "VGC", "Ogombo",
  "V.I", "Victoria Island", "Yaba", "Ago Palace", "Ogba",
  "Ikotun", "Igando", "Iyana Ipaja", "Egbeda", "Magodo",
];

const CARGO_CATEGORIES = [
  "Documents / Envelopes",
  "Small Parcel (fits in box)",
  "Electronics",
  "Food & Beverages",
  "Clothing & Fashion",
  "Pharmacy / Medicine",
  "Books & Stationery",
  "Cosmetics & Beauty",
  "Gifts & Packages",
  "E-commerce Orders",
  "Fragile Items",
  "Furniture",
  "Bulky / Oversized",
  "Multiple Drop-offs",
  "Other",
];

const CUSTOM_QUOTE_TRIGGERS = new Set([
  "Furniture",
  "Bulky / Oversized",
  "Multiple Drop-offs",
]);

type Zone = 1 | 2 | 3 | 4 | 5;
const AREA_ZONE: Record<string, Zone> = {
  "Ajah": 1, "Sangotodo": 1, "Chevron": 1, "Orchid": 1, "VGC": 1, "Ogombo": 1,
  "Lekki Phase 1": 2, "Lekki Phase 2": 2,
  "V.I": 2, "Victoria Island": 2, "Ikoyi": 2,
  "Lagos Island": 3, "Isale Eko": 3, "Apapa": 3,
  "Surulere": 3, "Yaba": 3, "Festac": 3, "Mile 2": 3, "Orile": 3,
  "Gbagada": 3, "Ojota": 3, "Maryland": 3, "Shomolu": 3, "Mushin": 3,
  "Ikeja": 4, "Ikeja GRA": 4, "Ago Palace": 4, "Ogba": 4, "Ojudu Berger": 4,
  "Oshodi": 4, "Badagry": 4, "Iyana Ipaja": 4, "Egbeda": 4, "Magodo": 4,
  "Ikotun": 4, "Igando": 4,
  "Ikorodu": 5, "Alimosho": 5, "Ojo": 5,
};

const ZONE_BASE_PRICE: Record<number, number> = {
  0: 1500, 1: 2000, 2: 2500, 3: 3500, 4: 4500, 5: 6000,
};

function getZone(area: string): Zone {
  return AREA_ZONE[area] ?? 3;
}

function calcBasePrice(pickup: string, dest: string): number {
  const z1 = getZone(pickup);
  const z2 = getZone(dest);
  const diff = Math.abs(z1 - z2);
  return ZONE_BASE_PRICE[diff] ?? 3500;
}

const WEIGHT_SURCHARGE = (kg: number) => {
  if (kg <= 5) return 0;
  if (kg <= 15) return 500;
  if (kg <= 30) return 1200;
  return 2500;
};

const URGENCY_MULTIPLIER: Record<string, number> = {
  standard: 1,
  same_day: 1.2,
  express: 1.6,
  scheduled: 1,
};

const URGENCY_ETA: Record<string, string> = {
  standard: "Next day",
  same_day: "Same day before 6 PM",
  express: "2–3 hours",
  scheduled: "Your chosen time",
};

interface QuoteResult {
  base: number;
  weightSurcharge: number;
  urgencyFee: number;
  insurance: number;
  total: number;
  eta: string;
  canAutoPrice: boolean;
}

function calculateQuote(
  pickup: string,
  dest: string,
  cargo: string,
  weight: number,
  urgency: string,
  insured: boolean,
  declaredValue: number,
): QuoteResult | null {
  if (!pickup || !dest) return null;

  const isCustom =
    CUSTOM_QUOTE_TRIGGERS.has(cargo) ||
    weight > 50 ||
    cargo === "Fragile Items";

  if (isCustom) {
    return { base: 0, weightSurcharge: 0, urgencyFee: 0, insurance: 0, total: 0, eta: "", canAutoPrice: false };
  }

  const base = calcBasePrice(pickup, dest);
  const weightSurcharge = WEIGHT_SURCHARGE(weight);
  const urgencyFee = Math.round(base * (URGENCY_MULTIPLIER[urgency] - 1));
  const subtotal = base + weightSurcharge + urgencyFee;
  const insuranceFee = insured ? Math.round(declaredValue * 0.015) : 0;
  const vat = Math.round(subtotal * 0.075);
  const total = subtotal + insuranceFee + vat;
  const eta = URGENCY_ETA[urgency] ?? "Next day";

  return { base, weightSurcharge, urgencyFee, insurance: insuranceFee, total, eta, canAutoPrice: true };
}

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[360px] lg:min-h-[480px]">
        <img
          src="/media/rceo.png"
          alt="QuickReach Logistics Delivery"
  className="absolute inset-0 w-full h-full object-cover"
  style={{ objectPosition: "center 33%" }}
        />
        <div className="absolute inset-0 bg-black/80" />
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
              Quote Engine
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
            Get Your<br />Instant Quote.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-white/70 max-w-md leading-relaxed mb-8"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}
          >
            Instant Lagos delivery pricing in 30 seconds. Fill in your details and we'll calculate the cost or route you straight to WhatsApp for custom requests.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
            >
              Calculate Now
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.25)" }}
              >
                <ArrowUpRight size={12} color="#fff" />
              </span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold border border-white/30 text-white transition-all hover:bg-white/10"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   COMBOBOX — type or pick from list
───────────────────────────────────────── */
function Combobox({
  value,
  onChange,
  options,
  placeholder,
  allowCustom = true,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  allowCustom?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        if (allowCustom && query && !options.includes(query)) {
          onChange(query);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [query, options, allowCustom, onChange]);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (allowCustom) onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="pr-8"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          onClick={() => setOpen((o) => !o)}
          tabIndex={-1}
        >
          <ChevronDown size={14} />
        </button>
      </div>
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-white shadow-lg overflow-hidden"
            style={{ maxHeight: "220px", overflowY: "auto" }}
          >
            {allowCustom && query && !options.includes(query) && (
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-slate-50 border-b border-border text-muted-foreground"
                onMouseDown={() => { onChange(query); setOpen(false); }}
              >
                <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Custom:</span>
                {query}
              </button>
            )}
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-slate-50 ${value === opt ? "bg-red-50 text-[#ef0004] font-medium" : ""}`}
                onMouseDown={() => {
                  onChange(opt);
                  setQuery(opt);
                  setOpen(false);
                }}
              >
                {value === opt && <Check size={12} className="flex-shrink-0" style={{ color: "#ef0004" }} />}
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN QUOTE PAGE
───────────────────────────────────────── */
function QuotePage() {
  const navigate = useNavigate();
  const setDraft = useBookingStore((s) => s.setDraft);

  // Form state
  const [pickupArea, setPickupArea] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [destArea, setDestArea] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [cargo, setCargo] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState<number>(1);
  const [urgency, setUrgency] = useState<"standard" | "same_day" | "express" | "scheduled">("same_day");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [insured, setInsured] = useState(false);
  const [declaredValue, setDeclaredValue] = useState<number>(0);
  const [additionalDetails, setAdditionalDetails] = useState("");

  // Result
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    if (!pickupArea || !destArea) {
      toast.error("Please enter both pickup and delivery areas.");
      return;
    }
    if (!cargo) {
      toast.error("Please select or enter an item category.");
      return;
    }
    const r = calculateQuote(pickupArea, destArea, cargo, weight, urgency, insured, declaredValue);
    setResult(r);
    setCalculated(true);
    setTimeout(() => {
      document.getElementById("quote-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const buildWhatsAppURL = () => {
    const phone = (BRAND.phone ?? "2348000000000").replace(/\D/g, "");
    const msg = `Hello,

I would like to request a custom delivery quote.

Pickup Area: ${pickupArea || "(not provided)"}
Pickup Address: ${pickupAddress || "(not provided)"}
Delivery Area: ${destArea || "(not provided)"}
Delivery Address: ${destAddress || "(not provided)"}
Item Category: ${cargo || "(not provided)"}
Item Description: ${description || "(not provided)"}
Estimated Weight: ${weight ? `${weight} kg` : "(not provided)"}
Delivery Type: ${urgency === "scheduled" ? `Scheduled — ${scheduleDate} ${scheduleTime}` : urgency.replace("_", " ")}
Additional Details: ${additionalDetails || "(none)"}

Thank you.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const handleBook = () => {
    setDraft({
      pricing: {
        total: result?.total ?? 0,
        base: result?.base ?? 0,
        distanceKm: 0,
        etaMinutes: 0,
        distance: 0, weight: 0, vehicle: 0, urgency: 0, insurance: result?.insurance ?? 0, fuel: 0, vat: 0, currency: "NGN",
      },
      vehicle: "bike",
      urgency,
      step: 1,
    });
    navigate({ to: "/book" });
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <HeroSection />

        {/* ── FORM SECTION ── */}
        <section id="quote-form" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[520px_1fr]">

              {/* LEFT — Form */}
              <div>
                <div className="mb-6">
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
                    Shipment Details
                  </span>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "6px" }}>
                    Tell us about your delivery
                  </h2>
                  <p style={{ color: "#666", fontSize: "14px", marginTop: "6px" }}>
                    Enter the area and full street address for both pickup and delivery.
                  </p>
                </div>

                <Card className="overflow-hidden p-0 shadow-sm">
                  {/* Bike notice */}
                  <div
                    className="flex items-center gap-3 px-5 py-3 border-b"
                    style={{ background: "#fafafa" }}
                  >
                    <div
                      className="flex items-center justify-center rounded-lg"
                      style={{ width: "36px", height: "36px", background: "#0f0f0f", flexShrink: 0 }}
                    >
                      <Bike size={18} color="#fff" />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "#0f0f0f" }}>
                        Box Bike Delivery
                      </p>
                      <p style={{ fontSize: "11px", color: "#888" }}>
                        We deliver using secure box bikes across all Lagos areas
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 p-6">

                    {/* ── ROUTE — area + exact address for both ── */}
                    <div className="space-y-4">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" style={{ color: "#ef0004" }} />
                        Pickup Location
                      </p>

                      {/* Pickup */}
                      <div className="rounded-xl border border-border p-4 space-y-3" style={{ background: "#fafafa" }}>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">Pickup Area</Label>
                          <Combobox
                            value={pickupArea}
                            onChange={setPickupArea}
                            options={LAGOS_AREAS}
                            placeholder="Select or type area…"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">Pickup Street Address</Label>
                          <Input
                            value={pickupAddress}
                            onChange={(e) => setPickupAddress(e.target.value)}
                            placeholder="e.g. 12 Admiralty Way, Lekki Phase 1"
                          />
                          <p className="text-xs text-muted-foreground">
                            Full address helps the rider locate you quickly
                          </p>
                        </div>
                      </div>

                      {/* Delivery */}
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-2">
                        <MapPin className="h-3.5 w-3.5" style={{ color: "#22c55e" }} />
                        Delivery Location
                      </p>
                      <div className="rounded-xl border border-border p-4 space-y-3" style={{ background: "#fafafa" }}>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">Delivery Area</Label>
                          <Combobox
                            value={destArea}
                            onChange={setDestArea}
                            options={LAGOS_AREAS}
                            placeholder="Select or type area…"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">Delivery Street Address</Label>
                          <Input
                            value={destAddress}
                            onChange={(e) => setDestAddress(e.target.value)}
                            placeholder="e.g. 45 Allen Avenue, Ikeja"
                          />
                          <p className="text-xs text-muted-foreground">
                            Full address ensures accurate delivery to the receiver
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item */}
                    <div className="space-y-3">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        <Package className="h-3.5 w-3.5" style={{ color: "#ef0004" }} />
                        Item Details
                      </p>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Item Category</Label>
                        <Combobox
                          value={cargo}
                          onChange={setCargo}
                          options={CARGO_CATEGORIES}
                          placeholder="Type or pick category…"
                        />
                        {CUSTOM_QUOTE_TRIGGERS.has(cargo) && (
                          <p className="flex items-center gap-1.5 text-xs text-amber-600 mt-1">
                            <AlertTriangle size={12} />
                            This item type requires a custom quote
                          </p>
                        )}
                        {cargo === "Fragile Items" && (
                          <p className="flex items-center gap-1.5 text-xs text-amber-600 mt-1">
                            <AlertTriangle size={12} />
                            Fragile items require special handling — custom quote needed
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Item Description</Label>
                        <Input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="e.g. iPhone 15, 2 cartons of books, birthday cake…"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Estimated Weight (kg)</Label>
                        <Input
                          type="number"
                          min={0.1}
                          step={0.5}
                          value={weight}
                          onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                          placeholder="e.g. 2"
                        />
                        {weight > 50 && (
                          <p className="flex items-center gap-1.5 text-xs text-amber-600 mt-1">
                            <AlertTriangle size={12} />
                            Items over 50 kg require a custom quote
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Delivery type */}
                    <div className="space-y-3">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        <Zap className="h-3.5 w-3.5" style={{ color: "#ef0004" }} />
                        Delivery Type
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {([
                          { key: "standard", label: "Standard", sub: "Next day" },
                          { key: "same_day", label: "Same Day", sub: "Before 6 PM" },
                          { key: "express", label: "Express", sub: "2–3 hrs" },
                          { key: "scheduled", label: "Scheduled", sub: "Pick time" },
                        ] as const).map(({ key, label, sub }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setUrgency(key)}
                            className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                              urgency === key
                                ? "border-[#ef0004] bg-red-50 text-[#ef0004]"
                                : "hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <p className="font-semibold">{label}</p>
                            <p className="text-xs opacity-70">{sub}</p>
                          </button>
                        ))}
                      </div>

                      {/* Schedule date/time picker */}
                      <AnimatePresence>
                        {urgency === "scheduled" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="rounded-xl border p-4 space-y-3"
                              style={{ background: "rgba(239,0,4,0.03)", borderColor: "rgba(239,0,4,0.2)" }}
                            >
                              <p className="flex items-center gap-1.5 text-xs font-semibold text-[#ef0004]">
                                <Calendar size={12} />
                                Choose your schedule
                              </p>
                              <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                  <Label className="text-xs font-medium text-muted-foreground">Date</Label>
                                  <Input
                                    type="date"
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <Label className="text-xs font-medium text-muted-foreground">Time</Label>
                                  <Input
                                    type="time"
                                    value={scheduleTime}
                                    onChange={(e) => setScheduleTime(e.target.value)}
                                    min="08:00"
                                    max="18:00"
                                  />
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Scheduling available Mon–Sat, 8 AM – 6 PM
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Insurance */}
                    <div
                      className={`rounded-xl border p-4 transition-colors ${insured ? "border-[#ef0004]/30 bg-red-50" : "bg-surface"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold">Add Insurance</p>
                          <p className="text-xs text-muted-foreground">
                            1.5% of declared value · up to ₦500k cover
                          </p>
                        </div>
                        <Switch
                          checked={insured}
                          onCheckedChange={(v) => setInsured(v)}
                        />
                      </div>
                      <AnimatePresence>
                        {insured && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 overflow-hidden"
                          >
                            <div className="space-y-1.5">
                              <Label className="text-sm font-medium">Declared Value (₦)</Label>
                              <Input
                                type="number"
                                value={declaredValue || ""}
                                onChange={(e) => setDeclaredValue(parseFloat(e.target.value) || 0)}
                                placeholder="e.g. 50000"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Additional details */}
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">Additional Details (optional)</Label>
                      <Textarea
                        rows={3}
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        placeholder="Any special instructions, access codes, fragile handling notes…"
                      />
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full gap-2 text-white"
                      style={{ backgroundColor: "#ef0004" }}
                      onClick={handleCalculate}
                    >
                      <Calculator className="h-4 w-4" />
                      Calculate My Price
                    </Button>
                  </div>
                </Card>

                {/* Custom quote CTA */}
                <div
                  className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-5 py-4"
                  style={{ background: "#0f0f0f" }}
                >
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: "#fff" }}>
                      Can't find your specification?
                    </p>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "2px" }}>
                      Unusual size, multiple stops, or custom logistics? We'll handle it.
                    </p>
                  </div>
                  <a
                    href={buildWhatsAppURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:opacity-90 whitespace-nowrap"
                    style={{ background: "#25D366", color: "#fff", fontFamily: "'Syne', sans-serif" }}
                  >
                    <MessageCircle size={14} />
                    Request Custom Quote
                  </a>
                </div>
              </div>

              {/* RIGHT — Result panel */}
              <div id="quote-result">
                <AnimatePresence mode="wait">
                  {!calculated ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full min-h-[500px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-slate-50 p-10 text-center"
                    >
                      <div
                        className="grid h-16 w-16 place-items-center rounded-2xl"
                        style={{ backgroundColor: "rgba(239,0,4,0.1)" }}
                      >
                        <Calculator className="h-8 w-8" style={{ color: "#ef0004" }} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "18px" }}>
                          Your price appears here
                        </h3>
                        <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
                          Fill in your shipment details and click "Calculate My Price" for an instant result.
                        </p>
                      </div>
                      <div className="mt-2 grid w-full max-w-sm grid-cols-2 gap-2">
                        {["Standard", "Express", "Same Day", "Scheduled"].map((t) => (
                          <div key={t} className="rounded-xl border bg-white px-4 py-3 text-left opacity-40">
                            <p className="text-xs font-semibold text-muted-foreground">{t}</p>
                            <p className="mt-1 font-bold text-lg text-slate-300">₦ ——</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : result?.canAutoPrice ? (
                    <AutoPriceResult
                      result={result}
                      pickupArea={pickupArea}
                      pickupAddress={pickupAddress}
                      destArea={destArea}
                      destAddress={destAddress}
                      urgency={urgency}
                      insured={insured}
                      onBook={handleBook}
                      onWhatsApp={buildWhatsAppURL()}
                    />
                  ) : (
                    <CustomQuoteResult
                      whatsAppURL={buildWhatsAppURL()}
                      cargo={cargo}
                      weight={weight}
                    />
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <HowItWorks />

        {/* ── FINAL CTA ── */}
        <FinalCTA whatsAppURL={buildWhatsAppURL()} />
      </main>
      <MarketingFooter />
    </div>
  );
}

/* ─────────────────────────────────────────
   AUTO PRICE RESULT
───────────────────────────────────────── */
function AutoPriceResult({
  result,
  pickupArea,
  pickupAddress,
  destArea,
  destAddress,
  urgency,
  insured,
  onBook,
  onWhatsApp,
}: {
  result: QuoteResult;
  pickupArea: string;
  pickupAddress: string;
  destArea: string;
  destAddress: string;
  urgency: string;
  insured: boolean;
  onBook: () => void;
  onWhatsApp: string;
}) {
  const pickupLabel = pickupAddress ? `${pickupAddress}, ${pickupArea}` : pickupArea;
  const destLabel = destAddress ? `${destAddress}, ${destArea}` : destArea;

  return (
    <motion.div
      key="auto"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-5"
    >
      {/* Summary header */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
              Estimated Delivery Cost
            </p>
            <p
              className="font-bold leading-none mt-2"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 5vw, 60px)", color: "#ef0004" }}
            >
              {NGN(result.total)}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Clock size={13} color="rgba(255,255,255,0.5)" />
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
                {result.eta}
              </span>
            </div>
            <div className="flex items-start gap-2 mt-1.5">
              <MapPin size={13} color="rgba(255,255,255,0.5)" className="flex-shrink-0 mt-0.5" />
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", wordBreak: "break-word" }}>
                {pickupLabel} → {destLabel}
              </span>
            </div>
          </div>
          <div
            className="flex items-center justify-center rounded-2xl flex-shrink-0"
            style={{ width: "56px", height: "56px", background: "rgba(239,0,4,0.15)" }}
          >
            <CheckCircle2 size={28} style={{ color: "#ef0004" }} />
          </div>
        </div>
      </div>

      {/* Breakdown card */}
      <Card className="p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Price Breakdown
        </p>
        <div className="space-y-2.5">
          {[
            { label: "Base fare", value: result.base },
            { label: "Weight surcharge", value: result.weightSurcharge },
            { label: "Urgency fee", value: result.urgencyFee },
            ...(insured ? [{ label: "Insurance", value: result.insurance }] : []),
            { label: "VAT (7.5%)", value: Math.round((result.base + result.weightSurcharge + result.urgencyFee) * 0.075) },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className={value === 0 ? "text-muted-foreground" : "font-semibold"}>
                {value === 0 ? "—" : NGN(value)}
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-2.5 flex items-center justify-between">
            <span className="font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Total</span>
            <span className="font-bold text-lg" style={{ color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
              {NGN(result.total)}
            </span>
          </div>
        </div>
      </Card>

      {/* What's included */}
      <Card className="p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
          What's Included
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Professional box-bike rider",
            "Real-time tracking",
            "WhatsApp delivery updates",
            "Proof of delivery",
            ...(insured ? ["Package insurance"] : []),
          ].map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-sm">
              <Check size={13} style={{ color: "#22c55e", flexShrink: 0 }} />
              {perk}
            </div>
          ))}
        </div>
      </Card>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="flex-1 gap-2 text-white font-bold"
          style={{ backgroundColor: "#ef0004" }}
          onClick={onBook}
        >
          Book This Delivery <ArrowRight className="h-4 w-4" />
        </Button>
        <a
          href={onWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-all hover:bg-slate-50"
        >
          <MessageCircle size={16} style={{ color: "#25D366" }} />
          Confirm via WhatsApp
        </a>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Price valid for 30 minutes · Final fare confirmed at booking
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   CUSTOM QUOTE RESULT
───────────────────────────────────────── */
function CustomQuoteResult({
  whatsAppURL,
  cargo,
  weight,
}: {
  whatsAppURL: string;
  cargo: string;
  weight: number;
}) {
  return (
    <motion.div
      key="custom"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-5"
    >
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: "linear-gradient(135deg, #78350f 0%, #92400e 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: "48px", height: "48px", background: "rgba(245,158,11,0.2)" }}
          >
            <AlertTriangle size={24} color="#f59e0b" />
          </div>
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff" }}>
              Custom Quote Required
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "2px" }}>
              We can't auto-price this delivery — but we'll sort it for you.
            </p>
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", lineHeight: 1.6 }}>
          {cargo === "Furniture" || cargo === "Bulky / Oversized"
            ? "Furniture and bulky items require special handling, vehicle sizing, and custom routing."
            : cargo === "Multiple Drop-offs"
            ? "Multi-stop deliveries need manual scheduling and route planning."
            : cargo === "Fragile Items"
            ? "Fragile goods require special handling instructions and packing confirmation."
            : weight > 50
            ? `A ${weight} kg shipment exceeds our standard weight limit and needs manual assessment.`
            : "Your request has special requirements that need manual review."}
        </p>
      </div>

      <Card className="p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          What Happens Next
        </p>
        <div className="space-y-3">
          {[
            { step: "01", text: "Click the button below to open WhatsApp" },
            { step: "02", text: "Your details are pre-filled — just send the message" },
            { step: "03", text: "Our team responds with a custom price within minutes" },
            { step: "04", text: "Confirm and we dispatch your rider" },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 font-bold text-xs"
                style={{ fontFamily: "'Syne', sans-serif", color: "#ef0004", width: "28px" }}
              >
                {step}
              </span>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Card>

      <a
        href={whatsAppURL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-bold text-white transition-all hover:opacity-90"
        style={{ background: "#25D366" }}
      >
        <MessageCircle size={20} />
        Request Custom Quote on WhatsApp
        <ArrowRight size={16} />
      </a>

      <p className="text-xs text-muted-foreground text-center">
        Your form details will be pre-filled in the WhatsApp message · Typical response: under 5 minutes
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   HOW IT WORKS — ICONS INSTEAD OF EMOJIS
───────────────────────────────────────── */
const HOW_IT_WORKS_STEPS = [
  {
    Icon: ClipboardList,
    title: "Enter Details",
    step: "01.",
    desc: "Type your pickup area, full street address, delivery location, item details, and preferred speed.",
  },
  {
    Icon: Calculator,
    title: "Get Instant Price",
    step: "02.",
    desc: "Our system calculates your exact fare in real time — no waiting, no calls.",
  },
  {
    Icon: CheckCircle2,
    title: "Book Delivery",
    step: "03.",
    desc: "Hit 'Book This Delivery' to confirm. Special requests go straight to WhatsApp.",
  },
  {
    Icon: Bike,
    title: "Rider Dispatched",
    step: "04.",
    desc: "Your box-bike rider is dispatched and you track every km in real time.",
  },
];

function HowItWorks() {
  return (
    <section style={{ background: "#f8f8f8", padding: "80px 0" }}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
            How It Works
          </span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "8px" }}>
            From Quote to Delivery
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS_STEPS.map((v) => {
            const Icon = v.Icon;
            return (
              <div
                key={v.step}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: "#fff", border: "1px solid #eee" }}
              >
                <div className="flex items-center gap-3">
                  {/* Icon box */}
                  <div
                    className="flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{ width: "40px", height: "40px", background: "rgba(239,0,4,0.08)", border: "1px solid rgba(239,0,4,0.15)" }}
                  >
                    <Icon size={20} color="#ef0004" strokeWidth={1.8} />
                  </div>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700, color: "#ef0004" }}>
                    {v.step}
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#0f0f0f", marginBottom: "6px" }}>
                    {v.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────── */
function FinalCTA({ whatsAppURL }: { whatsAppURL: string }) {
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
                Need Something Special?
              </h2>
              <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
                Furniture, multiple stops, fragile goods, or bulk orders? Our team handles every special request — just drop us a message.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={whatsAppURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#25D366", color: "#fff", fontFamily: "'Syne', sans-serif" }}
              >
                <MessageCircle size={16} />
                Request Custom Quote
                <span
                  className="inline-flex items-center justify-center rounded-full"
                  style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.2)" }}
                >
                  <ArrowUpRight size={12} color="#fff" />
                </span>
              </a>
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