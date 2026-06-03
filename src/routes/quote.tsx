import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  MessageCircle,
  Bookmark,
  MapPin,
  Package,
  Zap,
  ArrowRight,
  Calculator,
  Truck,
  Clock,
} from "lucide-react";
import { quoteService } from "@/services/quote.service";
import { areaCoords, LAGOS_AREAS } from "@/mock/data";
import { CARGO_LABELS, NGN, URGENCY_LABELS, VEHICLE_LABELS } from "@/constants";
import type { QuoteResult } from "@/types";
import { toast } from "sonner";
import { useBookingStore } from "@/store";

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

const schema = z.object({
  pickupArea: z.string().min(1),
  destArea: z.string().min(1),
  cargo: z.enum([
    "documents",
    "parcel",
    "electronics",
    "food",
    "fragile",
    "furniture",
    "pallet",
    "container",
  ]),
  vehicle: z.enum(["bike", "car", "van", "truck", "trailer"]),
  urgency: z.enum(["standard", "same_day", "express", "scheduled"]),
  weight: z.coerce.number().min(0.1),
  insurance: z.boolean(),
  declaredValue: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

function QuotePage() {
  const navigate = useNavigate();
  const setDraft = useBookingStore((s) => s.setDraft);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      pickupArea: "Lekki Phase 1",
      destArea: "Ikeja GRA",
      cargo: "parcel",
      vehicle: "bike",
      urgency: "same_day",
      weight: 3,
      insurance: false,
    },
  });

  const m = useMutation({
    mutationFn: (d: FormData) =>
      quoteService.create({
        pickup: { area: d.pickupArea, coords: areaCoords(d.pickupArea) },
        destination: {
          area: d.destArea,
          coords: areaCoords(d.destArea),
        },
        cargo: d.cargo,
        vehicle: d.vehicle,
        urgency: d.urgency,
        weightKg: d.weight,
        insurance: d.insurance,
        declaredValue: d.declaredValue,
      }),
  });

  const insurance = watch("insurance");

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* Hero strip */}
      <div className="border-b bg-slate-950 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge
            className="mb-3 rounded-full border-white/10 text-xs font-semibold"
            style={{
              backgroundColor: "rgba(239,0,4,0.15)",
              borderColor: "rgba(239,0,4,0.3)",
              color: "#fca5a5",
            }}
          >
            <Calculator className="mr-1.5 h-3 w-3" /> Quote Engine
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Instant Lagos{" "}
            <span style={{ color: "#ef0004" }}>Delivery Pricing</span>
          </h1>
          <p className="mt-2 text-slate-400">
            Fill in the details — we'll show four pricing tiers in seconds. Pick
            what fits and book instantly.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[480px_1fr]">
          {/* ── Form card ── */}
          <div>
            <Card className="overflow-hidden p-0 shadow-sm">
              {/* Card header */}
              <div className="border-b bg-slate-50 px-6 py-4">
                <h2 className="font-display text-base font-semibold">
                  Shipment Details
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  All fields are used to calculate your fare accurately.
                </p>
              </div>

              <form
                onSubmit={handleSubmit((d) => m.mutate(d))}
                className="space-y-5 p-6"
              >
                {/* Route */}
                <div className="space-y-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" style={{ color: "#ef0004" }} />
                    Route
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Pickup Area"
                      error={errors.pickupArea?.message}
                    >
                      <AreaSelect
                        value={watch("pickupArea")}
                        onChange={(v) =>
                          setValue("pickupArea", v, { shouldValidate: true })
                        }
                      />
                    </Field>
                    <Field
                      label="Destination Area"
                      error={errors.destArea?.message}
                    >
                      <AreaSelect
                        value={watch("destArea")}
                        onChange={(v) =>
                          setValue("destArea", v, { shouldValidate: true })
                        }
                      />
                    </Field>
                  </div>
                </div>

                {/* Cargo */}
                <div className="space-y-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <Package className="h-3.5 w-3.5" style={{ color: "#ef0004" }} />
                    Cargo & Vehicle
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Cargo Type">
                      <Select
                        value={watch("cargo")}
                        onValueChange={(v) => setValue("cargo", v as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(CARGO_LABELS).map(([k, l]) => (
                            <SelectItem key={k} value={k}>
                              {l}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Vehicle">
                      <Select
                        value={watch("vehicle")}
                        onValueChange={(v) => setValue("vehicle", v as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(VEHICLE_LABELS).map(([k, l]) => (
                            <SelectItem key={k} value={k}>
                              {l}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </div>

                {/* Speed & weight */}
                <div className="space-y-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <Zap className="h-3.5 w-3.5" style={{ color: "#ef0004" }} />
                    Speed & Weight
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Urgency">
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(URGENCY_LABELS).map(([k, l]) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => setValue("urgency", k as any)}
                            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                              watch("urgency") === k
                                ? "border-[#ef0004] bg-red-50 text-[#ef0004]"
                                : "hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </Field>
                    <Field label="Weight (kg)">
                      <Input
                        type="number"
                        step="0.1"
                        {...register("weight")}
                      />
                    </Field>
                  </div>
                </div>

                {/* Insurance */}
                <div
                  className={`rounded-xl border p-4 transition-colors ${insurance ? "border-[#ef0004]/30 bg-red-50" : "bg-surface"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Add Insurance</p>
                      <p className="text-xs text-muted-foreground">
                        1.5% of declared value · up to ₦500k cover
                      </p>
                    </div>
                    <Switch
                      checked={insurance}
                      onCheckedChange={(v) => setValue("insurance", v)}
                      style={
                        insurance
                          ? ({ "--switch-bg": "#ef0004" } as any)
                          : undefined
                      }
                    />
                  </div>
                  <AnimatePresence>
                    {insurance && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 overflow-hidden"
                      >
                        <Field label="Declared Value (₦)">
                          <Input
                            type="number"
                            {...register("declaredValue")}
                            placeholder="50000"
                          />
                        </Field>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 text-white"
                  style={{ backgroundColor: "#ef0004" }}
                  disabled={m.isPending}
                >
                  {m.isPending ? (
                    "Calculating…"
                  ) : (
                    <>
                      Calculate Price{" "}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* ── Results panel ── */}
          <div>
            {m.isPending && <SkeletonResult />}
            {m.data && (
              <QuoteResultPanel
                result={m.data}
                onBook={(tier) => {
                  setDraft({
                    pricing: tier.pricing,
                    vehicle: m.data?.input.vehicle,
                    urgency: m.data?.input.urgency,
                    step: 1,
                  });
                  navigate({ to: "/book" });
                }}
              />
            )}
            {!m.data && !m.isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full min-h-[500px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-slate-50 p-10 text-center"
              >
                <div
                  className="grid h-16 w-16 place-items-center rounded-2xl"
                  style={{ backgroundColor: "rgba(239,0,4,0.1)" }}
                >
                  <Calculator
                    className="h-8 w-8"
                    style={{ color: "#ef0004" }}
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    Your pricing tiers appear here
                  </h3>
                  <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
                    Fill the form and we'll instantly calculate four options
                    across speed and price.
                  </p>
                </div>
                <div className="mt-2 grid w-full max-w-xs grid-cols-2 gap-2">
                  {["Saver", "Standard", "Express", "Priority"].map((t, i) => (
                    <div
                      key={t}
                      className="rounded-xl border bg-white px-4 py-3 text-left opacity-40"
                    >
                      <p className="text-xs font-semibold text-muted-foreground">
                        {t}
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-slate-300">
                        ₦ ——
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

/* ── Quote result panel ── */
function QuoteResultPanel({
  result,
  onBook,
}: {
  result: QuoteResult;
  onBook: (t: QuoteResult["tiers"][number]) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold">
            {result.tiers[0].pricing.distanceKm} km ·{" "}
            <span style={{ color: "#ef0004" }}>4 pricing tiers</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Pick what fits your budget and urgency.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Quote saved.")}
          >
            <Bookmark className="mr-1.5 h-3.5 w-3.5" /> Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("WhatsApp link copied.")}
          >
            <MessageCircle className="mr-1.5 h-3.5 w-3.5" /> Share
          </Button>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {result.tiers.map((t) => (
          <Card
            key={t.id}
            className={`relative flex flex-col p-5 transition-shadow ${
              t.recommended
                ? "shadow-md"
                : "hover:shadow-sm"
            }`}
            style={
              t.recommended
                ? { borderColor: "#ef0004", boxShadow: "0 0 0 2px rgba(239,0,4,0.15)" }
                : undefined
            }
          >
            {t.recommended && (
              <Badge
                className="absolute -top-2.5 right-4 rounded-full text-white"
                style={{ backgroundColor: "#ef0004" }}
              >
                Recommended
              </Badge>
            )}
            <div className="flex items-start justify-between">
              <p className="font-display text-base font-bold">{t.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {t.pricing.etaMinutes} min
              </div>
            </div>
            <p
              className="mt-2 font-display text-3xl font-bold"
              style={t.recommended ? { color: "#ef0004" } : undefined}
            >
              {NGN(t.pricing.total)}
            </p>
            <p className="text-xs text-muted-foreground">
              {t.pricing.distanceKm} km
            </p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {t.perks.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check
                    className="h-3.5 w-3.5 flex-shrink-0"
                    style={{ color: t.recommended ? "#ef0004" : "#22c55e" }}
                  />
                  {p}
                </li>
              ))}
            </ul>
            <Button
              className="mt-5 w-full gap-2 text-white"
              style={
                t.recommended
                  ? { backgroundColor: "#ef0004" }
                  : undefined
              }
              variant={t.recommended ? "default" : "outline"}
              onClick={() => onBook(t)}
            >
              Book this <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Breakdown */}
      <Card className="p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Truck className="h-4 w-4" style={{ color: "#ef0004" }} />
          <p className="font-display text-sm font-semibold">
            Price Breakdown · Standard tier
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
          {Object.entries({
            Base: result.tiers[1].pricing.base,
            Distance: result.tiers[1].pricing.distance,
            Weight: result.tiers[1].pricing.weight,
            Vehicle: result.tiers[1].pricing.vehicle,
            Urgency: result.tiers[1].pricing.urgency,
            Insurance: result.tiers[1].pricing.insurance,
            Fuel: result.tiers[1].pricing.fuel,
            VAT: result.tiers[1].pricing.vat,
          }).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2 sm:flex-col sm:gap-0">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-semibold">{NGN(v)}</span>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">
        Quote valid until{" "}
        {new Date(result.validUntil).toLocaleTimeString()} ·{" "}
        <Link
          to="/track"
          className="font-medium hover:underline"
          style={{ color: "#ef0004" }}
        >
          Track an existing shipment
        </Link>
      </p>
    </motion.div>
  );
}

/* ── Skeleton ── */
function SkeletonResult() {
  return (
    <div className="space-y-3">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-52 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
      <div className="h-36 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}

/* ── Helpers ── */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function AreaSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Pick area" />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {LAGOS_AREAS.map((a) => (
          <SelectItem key={a} value={a}>
            {a}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}