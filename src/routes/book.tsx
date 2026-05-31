import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { LAGOS_AREAS, areaCoords } from "@/mock/data";
import { CARGO_LABELS, NGN, URGENCY_LABELS, VEHICLE_LABELS } from "@/constants";
import { Check, ChevronLeft, ChevronRight, CreditCard, Wallet, Building2, Smartphone } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { shipmentService } from "@/services/shipment.service";
import { paymentService } from "@/services/payment.service";
import { toast } from "sonner";
import type { PaymentProvider } from "@/types";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [{ title: "Book delivery — Sendaro" }, { name: "description", content: "Book a Lagos delivery in 7 quick steps." }] }),
  component: BookingPage,
});

const STEPS = ["Shipment", "Pickup", "Receiver", "Package", "Schedule", "Review", "Payment"] as const;

interface Draft {
  pickupArea: string; pickupAddress: string; pickupName: string; pickupPhone: string;
  destArea: string; destAddress: string; destName: string; destPhone: string;
  cargo: string; weight: number; vehicle: string; urgency: string; insurance: boolean;
  scheduledFor?: string; notes?: string; provider: PaymentProvider;
}

function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Draft>({
    pickupArea: "Lekki Phase 1", pickupAddress: "", pickupName: "", pickupPhone: "",
    destArea: "Ikeja GRA", destAddress: "", destName: "", destPhone: "",
    cargo: "parcel", weight: 3, vehicle: "bike", urgency: "same_day",
    insurance: true, provider: "paystack",
  });
  const set = (p: Partial<Draft>) => setD((s) => ({ ...s, ...p }));

  const estimated = 4800 + d.weight * 120 + (d.urgency === "express" ? 2200 : 0);

  const book = useMutation({
    mutationFn: async () => {
      const shp = await shipmentService.create({
        pickup: { label: "Pickup", street: d.pickupAddress, area: d.pickupArea, city: "Lagos", state: "Lagos", coords: areaCoords(d.pickupArea), contactName: d.pickupName, contactPhone: d.pickupPhone },
        destination: { label: "Drop", street: d.destAddress, area: d.destArea, city: "Lagos", state: "Lagos", coords: areaCoords(d.destArea), contactName: d.destName, contactPhone: d.destPhone },
        cargo: d.cargo as any, weightKg: d.weight, vehicle: d.vehicle as any, urgency: d.urgency as any, insurance: d.insurance,
      } as any);
      await paymentService.createIntent({ amount: estimated, provider: d.provider, shipmentId: shp.id });
      return shp;
    },
    onSuccess: (shp) => { toast.success("Booking confirmed!"); navigate({ to: "/track/$id", params: { id: shp.id } }); },
    onError: () => toast.error("Booking failed. Try again."),
  });

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Book a delivery</h1>
        <p className="mt-1 text-sm text-muted-foreground">Step {step + 1} of {STEPS.length} · {STEPS[step]}</p>
        <Progress value={((step + 1) / STEPS.length) * 100} className="mt-4" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="p-6 shadow-elevated">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }} className="space-y-4">
                {step === 0 && <>
                  <H title="Shipment details" />
                  <Grid2>
                    <FieldGroup label="Cargo type">
                      <Select value={d.cargo} onValueChange={(v) => set({ cargo: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{Object.entries(CARGO_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
                      </Select>
                    </FieldGroup>
                    <FieldGroup label="Vehicle">
                      <Select value={d.vehicle} onValueChange={(v) => set({ vehicle: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{Object.entries(VEHICLE_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
                      </Select>
                    </FieldGroup>
                  </Grid2>
                  <FieldGroup label="Urgency">
                    <Select value={d.urgency} onValueChange={(v) => set({ urgency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.entries(URGENCY_LABELS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
                    </Select>
                  </FieldGroup>
                </>}

                {step === 1 && <>
                  <H title="Pickup location" />
                  <FieldGroup label="Area">
                    <AreaSelect value={d.pickupArea} onChange={(v) => set({ pickupArea: v })} />
                  </FieldGroup>
                  <FieldGroup label="Street address"><Input value={d.pickupAddress} onChange={(e) => set({ pickupAddress: e.target.value })} placeholder="12 Admiralty Way" /></FieldGroup>
                  <Grid2>
                    <FieldGroup label="Contact name"><Input value={d.pickupName} onChange={(e) => set({ pickupName: e.target.value })} /></FieldGroup>
                    <FieldGroup label="Contact phone"><Input value={d.pickupPhone} onChange={(e) => set({ pickupPhone: e.target.value })} placeholder="+234..." /></FieldGroup>
                  </Grid2>
                </>}

                {step === 2 && <>
                  <H title="Receiver details" />
                  <FieldGroup label="Area"><AreaSelect value={d.destArea} onChange={(v) => set({ destArea: v })} /></FieldGroup>
                  <FieldGroup label="Street address"><Input value={d.destAddress} onChange={(e) => set({ destAddress: e.target.value })} /></FieldGroup>
                  <Grid2>
                    <FieldGroup label="Receiver name"><Input value={d.destName} onChange={(e) => set({ destName: e.target.value })} /></FieldGroup>
                    <FieldGroup label="Receiver phone"><Input value={d.destPhone} onChange={(e) => set({ destPhone: e.target.value })} placeholder="+234..." /></FieldGroup>
                  </Grid2>
                </>}

                {step === 3 && <>
                  <H title="Package details" />
                  <Grid2>
                    <FieldGroup label="Weight (kg)"><Input type="number" value={d.weight} onChange={(e) => set({ weight: Number(e.target.value) })} /></FieldGroup>
                    <FieldGroup label="Insurance">
                      <div className="flex items-center justify-between rounded-md border bg-surface px-4 py-2.5">
                        <span className="text-sm">Cover up to ₦500k</span>
                        <Switch checked={d.insurance} onCheckedChange={(v) => set({ insurance: v })} />
                      </div>
                    </FieldGroup>
                  </Grid2>
                  <FieldGroup label="Notes (optional)"><Textarea rows={3} value={d.notes ?? ""} onChange={(e) => set({ notes: e.target.value })} placeholder="Leave at reception, call on arrival..." /></FieldGroup>
                </>}

                {step === 4 && <>
                  <H title="Schedule" />
                  <FieldGroup label="Pickup time"><Input type="datetime-local" value={d.scheduledFor ?? ""} onChange={(e) => set({ scheduledFor: e.target.value })} /></FieldGroup>
                  <p className="text-sm text-muted-foreground">Leave blank to dispatch immediately.</p>
                </>}

                {step === 5 && <>
                  <H title="Review your booking" />
                  <Row k="Pickup" v={`${d.pickupAddress || "—"}, ${d.pickupArea}`} />
                  <Row k="Receiver" v={`${d.destAddress || "—"}, ${d.destArea}`} />
                  <Row k="Cargo" v={`${CARGO_LABELS[d.cargo as keyof typeof CARGO_LABELS]} · ${d.weight} kg`} />
                  <Row k="Vehicle" v={VEHICLE_LABELS[d.vehicle as keyof typeof VEHICLE_LABELS]} />
                  <Row k="Urgency" v={URGENCY_LABELS[d.urgency as keyof typeof URGENCY_LABELS]} />
                  <Row k="Insurance" v={d.insurance ? "Yes" : "No"} />
                </>}

                {step === 6 && <>
                  <H title="Choose payment method" />
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      ["paystack", "Paystack", CreditCard],
                      ["flutterwave", "Flutterwave", CreditCard],
                      ["wallet", "Sendaro Wallet", Wallet],
                      ["transfer", "Bank Transfer", Building2],
                      ["ussd", "USSD", Smartphone],
                    ] as const).map(([k, label, Icon]) => (
                      <button key={k} type="button" onClick={() => set({ provider: k })}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${d.provider === k ? "border-primary bg-primary-soft shadow-glow" : "hover:bg-surface"}`}>
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </>}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={prev} disabled={step === 0}><ChevronLeft className="mr-1 h-4 w-4" />Back</Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next}>Continue<ChevronRight className="ml-1 h-4 w-4" /></Button>
              ) : (
                <Button onClick={() => book.mutate()} disabled={book.isPending}>
                  {book.isPending ? "Confirming…" : `Pay ${NGN(estimated)} & book`}
                </Button>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Estimated total</div>
              <div className="mt-1 font-display text-3xl font-semibold">{NGN(estimated)}</div>
              <div className="mt-1 text-xs text-muted-foreground">Includes VAT. Final fare locks at booking.</div>
            </Card>
            <Card className="p-5">
              <div className="font-display text-sm font-semibold">Progress</div>
              <ul className="mt-3 space-y-2 text-sm">
                {STEPS.map((s, i) => (
                  <li key={s} className={`flex items-center gap-2 ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                    <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i < step ? "bg-success text-success-foreground" : i === step ? "gradient-primary text-primary-foreground" : "border"}`}>
                      {i < step ? <Check className="h-3 w-3" /> : i + 1}
                    </span>{s}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

const H = ({ title }: { title: string }) => <h2 className="font-display text-xl font-semibold">{title}</h2>;
const FieldGroup = ({ label, children }: any) => <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
const Grid2 = ({ children }: any) => <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
const Row = ({ k, v }: { k: string; v: string }) => <div className="flex justify-between border-b py-2 text-sm last:border-b-0"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;

function AreaSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder="Pick area" /></SelectTrigger>
      <SelectContent className="max-h-72">{LAGOS_AREAS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
    </Select>
  );
}
