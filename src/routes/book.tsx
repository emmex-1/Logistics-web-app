import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LAGOS_AREAS, areaCoords } from "@/mock/data";
import { CARGO_LABELS, NGN, URGENCY_LABELS } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  MapPin,
  User,
  Package,
  CalendarClock,
  ClipboardList,
  Banknote,
  Shield,
  Zap,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Upload,
  X,
  ImagePlus,
  Truck,
  CheckCircle2,
  PartyPopper,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { shipmentService } from "@/services/shipment.service";
import { paymentService } from "@/services/payment.service";
import { toast } from "sonner";
import type { PaymentProvider } from "@/types";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Delivery — Quick Reach Logistics" },
      { name: "description", content: "Book a Lagos delivery in quick steps." },
    ],
  }),
  component: BookingPage,
});

/* ─────────────────────────────────────────
   STEPS CONFIG
───────────────────────────────────────── */
const STEPS = [
  { label: "Shipment",  icon: Package,     desc: "What are you sending?" },
  { label: "Pickup",    icon: MapPin,      desc: "Where are we collecting from?" },
  { label: "Receiver",  icon: User,        desc: "Who's receiving the package?" },
  { label: "Package",   icon: Shield,      desc: "Weight, photos, insurance & notes" },
  { label: "Schedule",  icon: CalendarClock, desc: "When should we dispatch?" },
  { label: "Review",    icon: ClipboardList, desc: "Confirm your booking details" },
  { label: "Payment",   icon: Banknote,    desc: "Choose how to pay" },
] as const;

const PAYMENT_OPTIONS = [
  ["paystack",    "Paystack",      CreditCard,  "Card & bank transfer"],
  ["flutterwave", "Flutterwave",   CreditCard,  "Card, USSD & more"],
  ["wallet",      "QRL Wallet",    Wallet,      "Use your balance"],
  ["transfer",    "Bank Transfer", Building2,   "Direct to our account"],
  ["ussd",        "USSD",          Smartphone,  "No internet needed"],
] as const;

/* ─────────────────────────────────────────
   DRAFT TYPE
───────────────────────────────────────── */
interface PackagePhoto { id: string; url: string; name: string; size: number }
interface Draft {
  pickupArea: string; pickupAddress: string; pickupName: string; pickupPhone: string;
  destArea: string; destAddress: string; destName: string; destPhone: string;
  cargo: string; weight: number; urgency: string;
  insurance: boolean; scheduledFor?: string; notes?: string;
  packagePhotos: PackagePhoto[];
  provider: PaymentProvider;
}

/* ─────────────────────────────────────────
   HERO — matches About/Services style
───────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[240px] sm:min-h-[320px] lg:min-h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80"
          alt="Book a delivery with QuickReach Logistics"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 flex flex-col justify-end min-h-[240px] sm:min-h-[320px] lg:min-h-[420px] px-6 sm:px-10 lg:px-16 pb-10 sm:pb-12 pt-16 sm:pt-24">
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
              Book a Delivery
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-white font-bold leading-tight mb-3"
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 68px)", letterSpacing: "-2px", lineHeight: 1.05,
            }}
          >
            Dispatch Across<br />Lagos Today.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-white/70 max-w-md leading-relaxed mb-6"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)" }}
          >
            Complete a few quick steps, upload photos of your package, and your box-bike rider gets dispatched.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#booking-form"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
            >
              Start Booking
              <span className="inline-flex items-center justify-center rounded-full" style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.25)" }}>
                <ArrowUpRight size={12} color="#fff" />
              </span>
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold border border-white/30 text-white transition-all hover:bg-white/10"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Get a Quote First
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PHOTO UPLOAD COMPONENT
───────────────────────────────────────── */
function PackagePhotoUpload({
  photos,
  onChange,
}: {
  photos: PackagePhoto[];
  onChange: (photos: PackagePhoto[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newPhotos: PackagePhoto[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      if (photos.length + newPhotos.length >= 5) return;
      const url = URL.createObjectURL(file);
      newPhotos.push({
        id: `${Date.now()}-${Math.random()}`,
        url,
        name: file.name,
        size: file.size,
      });
    });
    onChange([...photos, ...newPhotos]);
  }, [photos, onChange]);

  const removePhoto = (id: string) => {
    onChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Package Photos (up to 5)</Label>
      <p className="text-xs text-muted-foreground -mt-1">
        Upload or snap photos of your package. This helps riders identify and handle it correctly.
      </p>

      {/* Drop zone */}
      <div
        className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          dragging ? "border-[#ef0004] bg-red-50" : "border-border hover:border-slate-400 hover:bg-slate-50"
        }`}
        style={{ padding: photos.length === 0 ? "32px 24px" : "16px" }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
      >
        {photos.length === 0 ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{ width: "56px", height: "56px", background: "rgba(239,0,4,0.08)" }}
            >
              <ImagePlus size={24} style={{ color: "#ef0004" }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
                Drop photos here or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, WEBP · up to 5 images
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {photos.map((p) => (
              <div key={p.id} className="relative group aspect-square rounded-xl overflow-hidden border border-border">
                <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removePhoto(p.id); }}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full bg-black/70"
                  style={{ width: "22px", height: "22px" }}
                >
                  <X size={11} color="#fff" />
                </button>
              </div>
            ))}
            {photos.length < 5 && (
              <div
                className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center hover:border-slate-400 transition-colors"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                <ImagePlus size={20} className="text-muted-foreground" />
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 flex-1"
          onClick={() => fileInputRef.current?.click()}
          disabled={photos.length >= 5}
        >
          <Upload size={14} /> Upload Photos
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 flex-1"
          onClick={() => cameraInputRef.current?.click()}
          disabled={photos.length >= 5}
        >
          <Camera size={14} /> Take Photo
        </Button>
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {photos.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {photos.length} of 5 photos added · {photos.length >= 5 && "Maximum reached"}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   SUCCESS SCREEN
───────────────────────────────────────── */
function SuccessScreen({ shipmentId, estimated }: { shipmentId: string; estimated: number }) {
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(shipmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-background flex flex-col"
    >
      <MarketingNav />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">

          {/* Success card */}
          <Card className="overflow-hidden shadow-xl">
            {/* Top — dark celebration header */}
            <div
              className="relative overflow-hidden px-8 py-12 text-center"
              style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)" }}
            >
              {/* Decorative rings */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-64 w-64 rounded-full border border-white/5" />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 rounded-full border border-white/5" />
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mx-auto mb-5 flex items-center justify-center rounded-full"
                style={{ width: "80px", height: "80px", background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.3)" }}
              >
                <CheckCircle2 size={40} style={{ color: "#22c55e" }} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "28px", color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
                  Booking Confirmed!
                </p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", marginTop: "8px" }}>
                  Your rider is being assigned. You'll get a WhatsApp update shortly.
                </p>
              </motion.div>

              {/* Amount */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-6 inline-flex items-baseline gap-1"
              >
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "36px", color: "#ef0004" }}>
                  {NGN(estimated)}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>total paid</span>
              </motion.div>
            </div>

            {/* Shipment ID */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ background: "#fafafa" }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tracking ID</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", color: "#0f0f0f", letterSpacing: "0.05em" }}>
                  {shipmentId}
                </p>
              </div>
              <button
                onClick={copyId}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-all hover:bg-slate-100"
              >
                {copied ? <Check size={12} style={{ color: "#22c55e" }} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </motion.div>

            {/* What happens next */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="px-6 py-5 space-y-3"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">What Happens Next</p>
              {[
                { icon: "🛵", text: "A box-bike rider is being assigned to your pickup" },
                { icon: "📱", text: "You'll receive a WhatsApp confirmation with rider details" },
                { icon: "📍", text: "Track your delivery in real time using your tracking ID" },
                { icon: "✅", text: "Proof of delivery sent once your package is received" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 leading-none mt-0.5">{icon}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col gap-3 px-6 pb-6"
            >
              <Link
                to="/track/$id"
                params={{ id: shipmentId }}
                // params={{ id: s.id }}
                  search={{ id: undefined }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#ef0004", fontFamily: "'Syne', sans-serif" }}
              >
                <ExternalLink size={16} />
                Track My Shipment
                <span className="inline-flex items-center justify-center rounded-full" style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.2)" }}>
                  <ArrowRight size={12} color="#fff" />
                </span>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/book"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-all hover:bg-slate-50"
                >
                  + New Booking
                </Link>
                <Link
                  to="/"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-all hover:bg-slate-50"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </Card>

          {/* Support nudge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="text-center text-xs text-muted-foreground mt-4"
          >
            Need help? WhatsApp us at{" "}
            <a
              href="https://wa.me/2349023215226"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2"
            >
              0902 321 5226
            </a>
          </motion.p>
        </div>
      </main>
      <MarketingFooter />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   AREA SELECT (dropdown)
───────────────────────────────────────── */
function AreaSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Pick area" />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {LAGOS_AREAS.map((a) => (
          <SelectItem key={a} value={a}>{a}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* ─────────────────────────────────────────
   FIELD GROUP
───────────────────────────────────────── */
const FieldGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium">{label}</Label>
    {children}
  </div>
);

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
function BookingPage() {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedShipmentId, setConfirmedShipmentId] = useState("");

  const [d, setD] = useState<Draft>({
    pickupArea: "Lekki Phase 1", pickupAddress: "", pickupName: "", pickupPhone: "",
    destArea: "Ikeja GRA", destAddress: "", destName: "", destPhone: "",
    cargo: "parcel", weight: 3, urgency: "same_day",
    insurance: true, packagePhotos: [], provider: "paystack",
  });
  const set = (p: Partial<Draft>) => setD((s) => ({ ...s, ...p }));

  const baseFare = 4800 + d.weight * 120;
  const urgencySurcharge = d.urgency === "express" ? 2200 : 0;
  const estimated = baseFare + urgencySurcharge;

  const book = useMutation({
    mutationFn: async () => {
      const shp = await shipmentService.create({
        pickup: {
          label: "Pickup", street: d.pickupAddress, area: d.pickupArea,
          city: "Lagos", state: "Lagos", coords: areaCoords(d.pickupArea),
          contactName: d.pickupName, contactPhone: d.pickupPhone,
        },
        destination: {
          label: "Drop", street: d.destAddress, area: d.destArea,
          city: "Lagos", state: "Lagos", coords: areaCoords(d.destArea),
          contactName: d.destName, contactPhone: d.destPhone,
        },
        cargo: d.cargo as any, weightKg: d.weight, vehicle: "bike" as any,
        urgency: d.urgency as any, insurance: d.insurance,
      } as any);
      await paymentService.createIntent({ amount: estimated, provider: d.provider, shipmentId: shp.id });
      return shp;
    },
    onSuccess: (shp) => {
      setConfirmedShipmentId(shp.id);
      setConfirmed(true);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => toast.error("Booking failed. Please try again."),
  });

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const progressPct = ((step + 1) / STEPS.length) * 100;
  const CurrentIcon = STEPS[step].icon;

  // Show success screen
  if (confirmed) {
    return <SuccessScreen shipmentId={confirmedShipmentId} estimated={estimated} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <HeroSection />

        {/* Booking form section */}
        <section id="booking-form" className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            {/* Sub-header */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ef0004", fontFamily: "'Syne', sans-serif" }}>
                  New Booking
                </span>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.5px", marginTop: "4px" }}>
                  Complete your booking
                </h2>
                <p style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>
                  {STEPS.length} quick steps to dispatch your package across Lagos.
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Estimated Total</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "28px", color: "#ef0004" }}>
                  {NGN(estimated)}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">inc. VAT · finalised at booking</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[260px_1fr]">

              {/* ── LEFT: Step Timeline ── */}
              <div className="space-y-3">
                <Card className="overflow-hidden p-0 shadow-sm">
                  {/* Progress header */}
                  <div style={{ background: "#0f0f0f", padding: "16px 20px" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Your Progress
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "#ef0004" }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                    </div>
                    <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Step {step + 1} of {STEPS.length}
                    </p>
                  </div>

                  {/* Steps list */}
                  <div className="divide-y divide-border">
                    {STEPS.map(({ label, icon: Icon }, i) => {
                      const done = i < step;
                      const active = i === step;
                      return (
                        <button
                          key={label}
                          onClick={() => i < step && setStep(i)}
                          disabled={i > step}
                          className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${
                            active ? "bg-red-50" : done ? "cursor-pointer hover:bg-slate-50" : "cursor-default opacity-40"
                          }`}
                        >
                          <span
                            className="grid flex-shrink-0 place-items-center rounded-full text-xs font-bold transition-colors"
                            style={{
                              width: "28px", height: "28px",
                              background: done ? "#22c55e" : active ? "#ef0004" : "transparent",
                              border: done || active ? "none" : "2px solid #e5e5e5",
                              color: done || active ? "#fff" : "#999",
                            }}
                          >
                            {done ? <Check className="h-3 w-3" /> : <Icon className="h-3.5 w-3.5" />}
                          </span>
                          <p className={`text-sm font-semibold ${active ? "text-[#ef0004]" : done ? "text-foreground" : "text-muted-foreground"}`}>
                            {label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Fare breakdown */}
                <Card className="p-4 shadow-sm">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Fare Breakdown</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base fare</span>
                      <span className="font-medium">{NGN(4800)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight ({d.weight} kg)</span>
                      <span className="font-medium">{NGN(d.weight * 120)}</span>
                    </div>
                    {urgencySurcharge > 0 && (
                      <div className="flex justify-between" style={{ color: "#ef0004" }}>
                        <span>Express surcharge</span>
                        <span className="font-medium">{NGN(urgencySurcharge)}</span>
                      </div>
                    )}
                    <div className="mt-2 flex justify-between border-t pt-2 font-bold">
                      <span>Total</span>
                      <span style={{ color: "#ef0004" }}>{NGN(estimated)}</span>
                    </div>
                  </div>
                </Card>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: Zap, label: "Fast" },
                    { icon: Shield, label: "Insured" },
                    { icon: Clock, label: "On-time" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1 rounded-xl border bg-card px-2 py-3">
                      <Icon className="h-4 w-4" style={{ color: "#ef0004" }} />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Step Content ── */}
              <div className="flex flex-col">
                <Card className="flex-1 overflow-hidden shadow-sm">
                  {/* Step header */}
                  <div className="flex items-center gap-4 border-b px-6 py-5" style={{ background: "#0f0f0f" }}>
                    <div
                      className="grid flex-shrink-0 place-items-center rounded-xl"
                      style={{ width: "40px", height: "40px", background: "#ef0004" }}
                    >
                      <CurrentIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff" }}>
                        {STEPS[step].label}
                      </h2>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{STEPS[step].desc}</p>
                    </div>
                  </div>

                  {/* Step body */}
                  <div className="p-6 sm:p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="space-y-5"
                      >

                        {/* ── Step 0: Shipment ── */}
                        {step === 0 && (
                          <>
                            <FieldGroup label="Cargo Type">
                              <Select value={d.cargo} onValueChange={(v) => set({ cargo: v })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {Object.entries(CARGO_LABELS).map(([k, l]) => (
                                    <SelectItem key={k} value={k}>{l}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FieldGroup>

                            {/* Vehicle info (bike only) */}
                            <div
                              className="flex items-center gap-3 rounded-xl px-4 py-3"
                              style={{ background: "rgba(239,0,4,0.04)", border: "1px solid rgba(239,0,4,0.15)" }}
                            >
                              <div
                                className="flex items-center justify-center rounded-lg flex-shrink-0"
                                style={{ width: "36px", height: "36px", background: "#0f0f0f" }}
                              >
                                <Truck size={16} color="#fff" />
                              </div>
                              <div>
                                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "#0f0f0f" }}>
                                  Box Bike Delivery
                                </p>
                                <p style={{ fontSize: "11px", color: "#888" }}>
                                  We use secure box bikes across all Lagos areas
                                </p>
                              </div>
                              <Badge
                                className="ml-auto rounded-full text-white text-xs"
                                style={{ background: "#22c55e" }}
                              >
                                Available
                              </Badge>
                            </div>

                            <FieldGroup label="Urgency">
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {Object.entries(URGENCY_LABELS).map(([k, l]) => (
                                  <button
                                    key={k}
                                    type="button"
                                    onClick={() => set({ urgency: k })}
                                    className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                                      d.urgency === k
                                        ? "border-[#ef0004] bg-red-50 text-[#ef0004] shadow-sm"
                                        : "hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                                  >
                                    {k === "express" && <Zap className="h-3.5 w-3.5" style={{ color: d.urgency === k ? "#ef0004" : "#94a3b8" }} />}
                                    {k === "same_day" && <Clock className="h-3.5 w-3.5" style={{ color: d.urgency === k ? "#ef0004" : "#94a3b8" }} />}
                                    {k !== "express" && k !== "same_day" && <Truck className="h-3.5 w-3.5" style={{ color: "#94a3b8" }} />}
                                    {l}
                                  </button>
                                ))}
                              </div>
                            </FieldGroup>
                          </>
                        )}

                        {/* ── Step 1: Pickup ── */}
                        {step === 1 && (
                          <>
                            <FieldGroup label="Area">
                              <AreaSelect value={d.pickupArea} onChange={(v) => set({ pickupArea: v })} />
                            </FieldGroup>
                            <FieldGroup label="Street Address">
                              <Input
                                value={d.pickupAddress}
                                onChange={(e) => set({ pickupAddress: e.target.value })}
                                placeholder="12 Admiralty Way, Lekki Phase 1"
                              />
                            </FieldGroup>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <FieldGroup label="Contact Name">
                                <Input value={d.pickupName} onChange={(e) => set({ pickupName: e.target.value })} placeholder="Sender's name" />
                              </FieldGroup>
                              <FieldGroup label="Contact Phone">
                                <Input value={d.pickupPhone} onChange={(e) => set({ pickupPhone: e.target.value })} placeholder="+234 800 000 0000" />
                              </FieldGroup>
                            </div>
                          </>
                        )}

                        {/* ── Step 2: Receiver ── */}
                        {step === 2 && (
                          <>
                            <FieldGroup label="Area">
                              <AreaSelect value={d.destArea} onChange={(v) => set({ destArea: v })} />
                            </FieldGroup>
                            <FieldGroup label="Street Address">
                              <Input
                                value={d.destAddress}
                                onChange={(e) => set({ destAddress: e.target.value })}
                                placeholder="45 Allen Avenue, Ikeja"
                              />
                            </FieldGroup>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <FieldGroup label="Receiver Name">
                                <Input value={d.destName} onChange={(e) => set({ destName: e.target.value })} placeholder="Receiver's full name" />
                              </FieldGroup>
                              <FieldGroup label="Receiver Phone">
                                <Input value={d.destPhone} onChange={(e) => set({ destPhone: e.target.value })} placeholder="+234 800 000 0000" />
                              </FieldGroup>
                            </div>
                          </>
                        )}

                        {/* ── Step 3: Package (with photos) ── */}
                        {step === 3 && (
                          <>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <FieldGroup label="Weight (kg)">
                                <Input
                                  type="number" min={0.1} step={0.5}
                                  value={d.weight}
                                  onChange={(e) => set({ weight: Number(e.target.value) })}
                                />
                              </FieldGroup>
                              <FieldGroup label="Insurance">
                                <div
                                  className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-colors ${d.insurance ? "border-green-300 bg-green-50" : "bg-surface"}`}
                                  onClick={() => set({ insurance: !d.insurance })}
                                >
                                  <div>
                                    <p className="text-sm font-medium">Cover up to ₦500k</p>
                                    <p className="text-xs text-muted-foreground">Recommended</p>
                                  </div>
                                  <Switch checked={d.insurance} onCheckedChange={(v) => set({ insurance: v })} />
                                </div>
                              </FieldGroup>
                            </div>

                            {/* Photo upload */}
                            <PackagePhotoUpload
                              photos={d.packagePhotos}
                              onChange={(photos) => set({ packagePhotos: photos })}
                            />

                            <FieldGroup label="Delivery Notes (optional)">
                              <Textarea
                                rows={3}
                                value={d.notes ?? ""}
                                onChange={(e) => set({ notes: e.target.value })}
                                placeholder="Leave at reception, call on arrival, handle with care…"
                              />
                            </FieldGroup>
                          </>
                        )}

                        {/* ── Step 4: Schedule ── */}
                        {step === 4 && (
                          <>
                            <FieldGroup label="Preferred Pickup Time">
                              <Input
                                type="datetime-local"
                                value={d.scheduledFor ?? ""}
                                onChange={(e) => set({ scheduledFor: e.target.value })}
                              />
                            </FieldGroup>
                            <div
                              className="rounded-xl p-4"
                              style={{ background: "rgba(239,0,4,0.04)", border: "1px solid rgba(239,0,4,0.12)" }}
                            >
                              <p className="flex items-start gap-2 text-sm" style={{ color: "#c0392b" }}>
                                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#ef0004" }} />
                                Leave blank to dispatch immediately. Same-day delivery available for bookings placed before 2 PM.
                              </p>
                            </div>
                          </>
                        )}

                        {/* ── Step 5: Review ── */}
                        {step === 5 && (
                          <div className="space-y-0 divide-y divide-border rounded-xl border overflow-hidden">
                            {[
                              ["Pickup", `${d.pickupAddress || "—"}, ${d.pickupArea}`],
                              ["Receiver", `${d.destAddress || "—"}, ${d.destArea}`],
                              ["Cargo", `${CARGO_LABELS[d.cargo as keyof typeof CARGO_LABELS]} · ${d.weight} kg`],
                              ["Vehicle", "Box Bike"],
                              ["Urgency", URGENCY_LABELS[d.urgency as keyof typeof URGENCY_LABELS]],
                              ["Insurance", d.insurance ? "✓ Covered up to ₦500k" : "Not covered"],
                              ["Package Photos", d.packagePhotos.length > 0 ? `${d.packagePhotos.length} photo${d.packagePhotos.length > 1 ? "s" : ""} attached` : "None attached"],
                              ["Schedule", d.scheduledFor ? new Date(d.scheduledFor).toLocaleString("en-NG") : "Dispatch immediately"],
                              ["Estimated fare", NGN(estimated)],
                            ].map(([k, v]) => (
                              <div key={k} className="flex items-center justify-between px-4 py-3.5">
                                <span className="text-sm text-muted-foreground">{k}</span>
                                <span className={`text-sm font-semibold ${k === "Estimated fare" ? "text-[#ef0004]" : ""}`}>
                                  {v}
                                </span>
                              </div>
                            ))}
                            {/* Photo previews in review */}
                            {d.packagePhotos.length > 0 && (
                              <div className="px-4 py-3.5">
                                <p className="text-sm text-muted-foreground mb-2">Package Photos</p>
                                <div className="flex gap-2 flex-wrap">
                                  {d.packagePhotos.map((p) => (
                                    <div key={p.id} className="w-14 h-14 rounded-lg overflow-hidden border border-border">
                                      <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* ── Step 6: Payment ── */}
                        {step === 6 && (
                          <>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {PAYMENT_OPTIONS.map(([k, label, Icon, sub]) => (
                                <button
                                  key={k}
                                  type="button"
                                  onClick={() => set({ provider: k })}
                                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                                    d.provider === k
                                      ? "border-[#ef0004] bg-red-50 shadow-sm"
                                      : "hover:border-slate-300 hover:bg-slate-50"
                                  }`}
                                >
                                  <div
                                    className="grid flex-shrink-0 place-items-center rounded-lg"
                                    style={{
                                      width: "36px", height: "36px",
                                      background: d.provider === k ? "#ef0004" : "#f1f5f9",
                                    }}
                                  >
                                    <Icon className="h-4 w-4" style={{ color: d.provider === k ? "#fff" : "#64748b" }} />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold">{label}</p>
                                    <p className="text-xs text-muted-foreground">{sub}</p>
                                  </div>
                                  {d.provider === k && <Check className="ml-auto h-4 w-4" style={{ color: "#ef0004" }} />}
                                </button>
                              ))}
                            </div>
                            <div
                              className="rounded-xl px-4 py-3"
                              style={{ background: "rgba(239,0,4,0.04)", border: "1px solid rgba(239,0,4,0.15)" }}
                            >
                              <p className="text-sm font-medium" style={{ color: "#c0392b" }}>
                                You'll pay{" "}
                                <span style={{ fontWeight: 800, color: "#ef0004" }}>{NGN(estimated)}</span>{" "}
                                via {PAYMENT_OPTIONS.find(([k]) => k === d.provider)?.[1]}.
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                Your fare is locked once you confirm below.
                              </p>
                            </div>
                          </>
                        )}

                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation footer */}
                  <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4">
                    <Button variant="ghost" onClick={prev} disabled={step === 0} className="gap-1.5">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>

                    {/* Dot indicators */}
                    <div className="flex gap-1.5">
                      {STEPS.map((_, i) => (
                        <span
                          key={i}
                          className="rounded-full transition-all duration-300"
                          style={{
                            height: "6px",
                            width: i === step ? "24px" : "6px",
                            background: i === step ? "#ef0004" : i < step ? "#22c55e" : "#e2e8f0",
                          }}
                        />
                      ))}
                    </div>

                    {step < STEPS.length - 1 ? (
                      <Button onClick={next} className="gap-1.5" style={{ background: "#0f0f0f", color: "#fff" }}>
                        Continue <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => book.mutate()}
                        disabled={book.isPending}
                        className="gap-2 text-white"
                        style={{ background: "#ef0004" }}
                      >
                        {book.isPending ? "Confirming…" : (
                          <>Pay {NGN(estimated)} & Book <ArrowRight className="h-4 w-4" /></>
                        )}
                      </Button>
                    )}
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}