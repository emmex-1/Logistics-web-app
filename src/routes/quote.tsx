import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Bookmark } from "lucide-react";
import { quoteService } from "@/services/quote.service";
import { areaCoords, LAGOS_AREAS } from "@/mock/data";
import { CARGO_LABELS, NGN, URGENCY_LABELS, VEHICLE_LABELS } from "@/constants";
import type { QuoteResult } from "@/types";
import { toast } from "sonner";
import { useBookingStore } from "@/store";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a quote — Quick Reach Logistics" },
      { name: "description", content: "Instant Lagos delivery pricing in 30 seconds. Pick your tier and book." },
      { property: "og:title", content: "Get a quote — Quick Reach Logistics" },
      { property: "og:description", content: "Instant Lagos delivery pricing." },
    ],
  }),
  component: QuotePage,
});

const schema = z.object({
  pickupArea: z.string().min(1),
  destArea: z.string().min(1),
  cargo: z.enum(["documents","parcel","electronics","food","fragile","furniture","pallet","container"]),
  vehicle: z.enum(["bike","car","van","truck","trailer"]),
  urgency: z.enum(["standard","same_day","express","scheduled"]),
  weight: z.coerce.number().min(0.1),
  insurance: z.boolean(),
  declaredValue: z.coerce.number().optional(),
});
type FormData = z.infer<typeof schema>;

function QuotePage() {
  const navigate = useNavigate();
  const setDraft = useBookingStore((s) => s.setDraft);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { pickupArea: "Lekki Phase 1", destArea: "Ikeja GRA", cargo: "parcel", vehicle: "bike", urgency: "same_day", weight: 3, insurance: false },
  });

  const m = useMutation({
    mutationFn: (d: FormData) => quoteService.create({
      pickup: { area: d.pickupArea, coords: areaCoords(d.pickupArea) },
      destination: { area: d.destArea, coords: areaCoords(d.destArea) },
      cargo: d.cargo, vehicle: d.vehicle, urgency: d.urgency,
      weightKg: d.weight, insurance: d.insurance, declaredValue: d.declaredValue,
    }),
  });

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Card className="p-6 shadow-elevated">
            <Badge variant="secondary" className="rounded-full">Quote engine</Badge>
            <h1 className="mt-3 font-display text-2xl font-semibold">Instant Lagos pricing</h1>
            <p className="mt-1 text-sm text-muted-foreground">Fill it in. We'll show four pricing tiers — pick what fits.</p>
            <form onSubmit={handleSubmit((d) => m.mutate(d))} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Pickup area" error={errors.pickupArea?.message}>
                  <AreaSelect value={watch("pickupArea")} onChange={(v) => setValue("pickupArea", v, { shouldValidate: true })} />
                </Field>
                <Field label="Destination area" error={errors.destArea?.message}>
                  <AreaSelect value={watch("destArea")} onChange={(v) => setValue("destArea", v, { shouldValidate: true })} />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cargo type">
                  <Select value={watch("cargo")} onValueChange={(v) => setValue("cargo", v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(CARGO_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
                <Field label="Vehicle">
                  <Select value={watch("vehicle")} onValueChange={(v) => setValue("vehicle", v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(VEHICLE_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Urgency">
                  <Select value={watch("urgency")} onValueChange={(v) => setValue("urgency", v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(URGENCY_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
                <Field label="Weight (kg)"><Input type="number" step="0.1" {...register("weight")} /></Field>
              </div>
              <div className="flex items-center justify-between rounded-xl border bg-surface p-4">
                <div>
                  <div className="font-medium">Add insurance</div>
                  <div className="text-xs text-muted-foreground">1.5% of declared value, up to ₦500k cover.</div>
                </div>
                <Switch checked={watch("insurance")} onCheckedChange={(v) => setValue("insurance", v)} />
              </div>
              {watch("insurance") && (
                <Field label="Declared value (₦)"><Input type="number" {...register("declaredValue")} placeholder="50000" /></Field>
              )}
              <Button type="submit" size="lg" className="w-full" disabled={m.isPending}>
                {m.isPending ? "Calculating…" : "Calculate price"}
              </Button>
            </form>
          </Card>

          <div>
            {m.isPending && <SkeletonResult />}
            {m.data && <QuoteResultPanel result={m.data} onBook={(tier) => {
              setDraft({ pricing: tier.pricing, vehicle: m.data?.input.vehicle, urgency: m.data?.input.urgency, step: 1 });
              navigate({ to: "/book" });
            }} />}
            {!m.data && !m.isPending && (
              <Card className="flex h-full min-h-[420px] flex-col items-center justify-center gap-3 p-10 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold">Your pricing tiers appear here.</h3>
                <p className="max-w-sm text-sm text-muted-foreground">Fill the form on the left. We instantly calculate four options across speed and price.</p>
              </Card>
            )}
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function AreaSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder="Pick area" /></SelectTrigger>
      <SelectContent className="max-h-72">{LAGOS_AREAS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function QuoteResultPanel({ result, onBook }: { result: QuoteResult; onBook: (t: QuoteResult["tiers"][number]) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">{result.tiers[0].pricing.distanceKm} km · pick your tier</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Quote saved to your wallet.")}><Bookmark className="mr-1 h-4 w-4" />Save</Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("WhatsApp link copied.")}><MessageCircle className="mr-1 h-4 w-4" />Share</Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {result.tiers.map((t) => (
          <Card key={t.id} className={`relative p-5 ${t.recommended ? "border-primary shadow-glow" : ""}`}>
            {t.recommended && <Badge className="absolute -top-2 right-4 rounded-full">Recommended</Badge>}
            <div className="font-display text-lg font-semibold">{t.name}</div>
            <div className="mt-1 font-display text-3xl font-semibold">{NGN(t.pricing.total)}</div>
            <div className="text-xs text-muted-foreground">ETA {t.pricing.etaMinutes} min · {t.pricing.distanceKm} km</div>
            <ul className="mt-4 space-y-1.5 text-sm">
              {t.perks.map((p) => <li key={p} className="flex gap-2"><Check className="h-4 w-4 text-success" />{p}</li>)}
            </ul>
            <Button className="mt-5 w-full" variant={t.recommended ? "default" : "outline"} onClick={() => onBook(t)}>
              Book this
            </Button>
          </Card>
        ))}
      </div>
      <Card className="p-5">
        <div className="font-display text-sm font-semibold">Price breakdown (Standard)</div>
        <div className="mt-3 grid grid-cols-2 gap-y-1.5 text-sm sm:grid-cols-4">
          {Object.entries({
            Base: result.tiers[1].pricing.base, Distance: result.tiers[1].pricing.distance,
            Weight: result.tiers[1].pricing.weight, Vehicle: result.tiers[1].pricing.vehicle,
            Urgency: result.tiers[1].pricing.urgency, Insurance: result.tiers[1].pricing.insurance,
            Fuel: result.tiers[1].pricing.fuel, VAT: result.tiers[1].pricing.vat,
          }).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 sm:flex-col sm:gap-0">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium">{NGN(v)}</span>
            </div>
          ))}
        </div>
      </Card>
      <p className="text-xs text-muted-foreground">Quote valid until {new Date(result.validUntil).toLocaleTimeString()} · <Link to="/track" className="text-primary hover:underline">Track an existing shipment</Link></p>
    </motion.div>
  );
}

function SkeletonResult() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  );
}
