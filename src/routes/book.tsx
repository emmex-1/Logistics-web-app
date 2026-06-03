import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LAGOS_AREAS, areaCoords } from "@/mock/data";
import { CARGO_LABELS, NGN, URGENCY_LABELS, VEHICLE_LABELS } from "@/constants";
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
  Truck,
  Shield,
  Zap,
  Clock,
  ArrowRight,
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
      {
        name: "description",
        content: "Book a Lagos delivery in 7 quick steps.",
      },
    ],
  }),
  component: BookingPage,
});

const STEPS = [
  {
    label: "Shipment",
    icon: Package,
    desc: "What are you sending?",
  },
  {
    label: "Pickup",
    icon: MapPin,
    desc: "Where are we collecting from?",
  },
  {
    label: "Receiver",
    icon: User,
    desc: "Who's receiving the package?",
  },
  {
    label: "Package",
    icon: Shield,
    desc: "Weight, insurance & notes",
  },
  {
    label: "Schedule",
    icon: CalendarClock,
    desc: "When should we dispatch?",
  },
  {
    label: "Review",
    icon: ClipboardList,
    desc: "Confirm your booking details",
  },
  {
    label: "Payment",
    icon: Banknote,
    desc: "Choose how to pay",
  },
] as const;

interface Draft {
  pickupArea: string;
  pickupAddress: string;
  pickupName: string;
  pickupPhone: string;
  destArea: string;
  destAddress: string;
  destName: string;
  destPhone: string;
  cargo: string;
  weight: number;
  vehicle: string;
  urgency: string;
  insurance: boolean;
  scheduledFor?: string;
  notes?: string;
  provider: PaymentProvider;
}

const PAYMENT_OPTIONS = [
  ["paystack", "Paystack", CreditCard, "Card & bank transfer"],
  ["flutterwave", "Flutterwave", CreditCard, "Card, USSD & more"],
  ["wallet", "QRL Wallet", Wallet, "Use your balance"],
  ["transfer", "Bank Transfer", Building2, "Direct to our account"],
  ["ussd", "USSD", Smartphone, "No internet needed"],
] as const;

function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Draft>({
    pickupArea: "Lekki Phase 1",
    pickupAddress: "",
    pickupName: "",
    pickupPhone: "",
    destArea: "Ikeja GRA",
    destAddress: "",
    destName: "",
    destPhone: "",
    cargo: "parcel",
    weight: 3,
    vehicle: "bike",
    urgency: "same_day",
    insurance: true,
    provider: "paystack",
  });
  const set = (p: Partial<Draft>) => setD((s) => ({ ...s, ...p }));

  const baseFare = 4800 + d.weight * 120;
  const urgencySurcharge = d.urgency === "express" ? 2200 : 0;
  const estimated = baseFare + urgencySurcharge;

  const book = useMutation({
    mutationFn: async () => {
      const shp = await shipmentService.create({
        pickup: {
          label: "Pickup",
          street: d.pickupAddress,
          area: d.pickupArea,
          city: "Lagos",
          state: "Lagos",
          coords: areaCoords(d.pickupArea),
          contactName: d.pickupName,
          contactPhone: d.pickupPhone,
        },
        destination: {
          label: "Drop",
          street: d.destAddress,
          area: d.destArea,
          city: "Lagos",
          state: "Lagos",
          coords: areaCoords(d.destArea),
          contactName: d.destName,
          contactPhone: d.destPhone,
        },
        cargo: d.cargo as any,
        weightKg: d.weight,
        vehicle: d.vehicle as any,
        urgency: d.urgency as any,
        insurance: d.insurance,
      } as any);
      await paymentService.createIntent({
        amount: estimated,
        provider: d.provider,
        shipmentId: shp.id,
      });
      return shp;
    },
    onSuccess: (shp) => {
      toast.success("Booking confirmed!");
      navigate({ to: "/track/$id", params: { id: shp.id } });
    },
    onError: () => toast.error("Booking failed. Try again."),
  });

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const progressPct = ((step + 1) / STEPS.length) * 100;

  const CurrentIcon = STEPS[step].icon;

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <Badge
              variant="secondary"
              className="mb-2 rounded-full text-xs font-medium uppercase tracking-widest"
            >
              New Booking
            </Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Book a Delivery
            </h1>
            <p className="mt-1 text-muted-foreground">
              Complete {STEPS.length} quick steps to dispatch across Lagos.
            </p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Estimated Total
            </p>
            <p className="font-display text-3xl font-bold text-amber-500">
              {NGN(estimated)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              inc. VAT · finalised at booking
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* ── Left: Step Timeline ── */}
          <div className="space-y-3">
            <Card className="overflow-hidden p-0 shadow-sm">
              {/* dark header */}
              <div className="bg-slate-900 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Your Progress
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
                  <motion.div
                    className="h-full rounded-full bg-amber-400"
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400">
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
                      className={`flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors ${
                        active
                          ? "bg-amber-50"
                          : done
                            ? "cursor-pointer hover:bg-slate-50"
                            : "cursor-default opacity-50"
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                          done
                            ? "bg-emerald-500 text-white"
                            : active
                              ? "bg-amber-400 text-slate-900"
                              : "border-2 border-border text-muted-foreground"
                        }`}
                      >
                        {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                      </span>
                      <div>
                        <p
                          className={`text-sm font-semibold ${active ? "text-amber-700" : done ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Fare breakdown */}
            <Card className="p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Fare Breakdown
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base fare</span>
                  <span className="font-medium">{NGN(4800)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Weight ({d.weight} kg)
                  </span>
                  <span className="font-medium">
                    {NGN(d.weight * 120)}
                  </span>
                </div>
                {urgencySurcharge > 0 && (
                  <div className="flex justify-between text-amber-600">
                    <span>Express surcharge</span>
                    <span className="font-medium">
                      {NGN(urgencySurcharge)}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex justify-between border-t pt-2 font-bold">
                  <span>Total</span>
                  <span className="text-amber-500">{NGN(estimated)}</span>
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
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-xl border bg-card px-2 py-3"
                >
                  <Icon className="h-4 w-4 text-amber-500" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Step Content ── */}
          <div className="flex flex-col">
            <Card className="flex-1 overflow-hidden shadow-sm">
              {/* Step header bar */}
              <div className="flex items-center gap-4 border-b bg-slate-900 px-6 py-5">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-amber-400">
                  <CurrentIcon className="h-5 w-5 text-slate-900" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white">
                    {STEPS[step].label}
                  </h2>
                  <p className="text-sm text-slate-400">{STEPS[step].desc}</p>
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
                    {/* Step 0 — Shipment */}
                    {step === 0 && (
                      <>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <FieldGroup label="Cargo Type">
                            <Select
                              value={d.cargo}
                              onValueChange={(v) => set({ cargo: v })}
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
                          </FieldGroup>
                          <FieldGroup label="Vehicle">
                            <Select
                              value={d.vehicle}
                              onValueChange={(v) => set({ vehicle: v })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(VEHICLE_LABELS).map(
                                  ([k, l]) => (
                                    <SelectItem key={k} value={k}>
                                      {l}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FieldGroup>
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
                                    ? "border-amber-400 bg-amber-50 text-amber-700 shadow-sm"
                                    : "hover:border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                {k === "express" && (
                                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                                )}
                                {k === "same_day" && (
                                  <Clock className="h-3.5 w-3.5 text-blue-500" />
                                )}
                                {k !== "express" && k !== "same_day" && (
                                  <Truck className="h-3.5 w-3.5 text-slate-400" />
                                )}
                                {l}
                              </button>
                            ))}
                          </div>
                        </FieldGroup>
                      </>
                    )}

                    {/* Step 1 — Pickup */}
                    {step === 1 && (
                      <>
                        <FieldGroup label="Area">
                          <AreaSelect
                            value={d.pickupArea}
                            onChange={(v) => set({ pickupArea: v })}
                          />
                        </FieldGroup>
                        <FieldGroup label="Street Address">
                          <Input
                            value={d.pickupAddress}
                            onChange={(e) =>
                              set({ pickupAddress: e.target.value })
                            }
                            placeholder="12 Admiralty Way, Lekki Phase 1"
                          />
                        </FieldGroup>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FieldGroup label="Contact Name">
                            <Input
                              value={d.pickupName}
                              onChange={(e) =>
                                set({ pickupName: e.target.value })
                              }
                              placeholder="Sender's name"
                            />
                          </FieldGroup>
                          <FieldGroup label="Contact Phone">
                            <Input
                              value={d.pickupPhone}
                              onChange={(e) =>
                                set({ pickupPhone: e.target.value })
                              }
                              placeholder="+234 800 000 0000"
                            />
                          </FieldGroup>
                        </div>
                      </>
                    )}

                    {/* Step 2 — Receiver */}
                    {step === 2 && (
                      <>
                        <FieldGroup label="Area">
                          <AreaSelect
                            value={d.destArea}
                            onChange={(v) => set({ destArea: v })}
                          />
                        </FieldGroup>
                        <FieldGroup label="Street Address">
                          <Input
                            value={d.destAddress}
                            onChange={(e) =>
                              set({ destAddress: e.target.value })
                            }
                            placeholder="45 Allen Avenue, Ikeja"
                          />
                        </FieldGroup>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FieldGroup label="Receiver Name">
                            <Input
                              value={d.destName}
                              onChange={(e) =>
                                set({ destName: e.target.value })
                              }
                              placeholder="Receiver's full name"
                            />
                          </FieldGroup>
                          <FieldGroup label="Receiver Phone">
                            <Input
                              value={d.destPhone}
                              onChange={(e) =>
                                set({ destPhone: e.target.value })
                              }
                              placeholder="+234 800 000 0000"
                            />
                          </FieldGroup>
                        </div>
                      </>
                    )}

                    {/* Step 3 — Package */}
                    {step === 3 && (
                      <>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FieldGroup label="Weight (kg)">
                            <Input
                              type="number"
                              min={0.1}
                              step={0.5}
                              value={d.weight}
                              onChange={(e) =>
                                set({ weight: Number(e.target.value) })
                              }
                            />
                          </FieldGroup>
                          <FieldGroup label="Insurance">
                            <div
                              className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-colors ${d.insurance ? "border-emerald-300 bg-emerald-50" : "bg-surface"}`}
                              onClick={() =>
                                set({ insurance: !d.insurance })
                              }
                            >
                              <div>
                                <p className="text-sm font-medium">
                                  Cover up to ₦500k
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Recommended
                                </p>
                              </div>
                              <Switch
                                checked={d.insurance}
                                onCheckedChange={(v) =>
                                  set({ insurance: v })
                                }
                              />
                            </div>
                          </FieldGroup>
                        </div>
                        <FieldGroup label="Delivery Notes (optional)">
                          <Textarea
                            rows={4}
                            value={d.notes ?? ""}
                            onChange={(e) => set({ notes: e.target.value })}
                            placeholder="Leave at reception, call on arrival, handle with care…"
                          />
                        </FieldGroup>
                      </>
                    )}

                    {/* Step 4 — Schedule */}
                    {step === 4 && (
                      <>
                        <FieldGroup label="Preferred Pickup Time">
                          <Input
                            type="datetime-local"
                            value={d.scheduledFor ?? ""}
                            onChange={(e) =>
                              set({ scheduledFor: e.target.value })
                            }
                          />
                        </FieldGroup>
                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                          <p className="flex items-start gap-2 text-sm text-blue-700">
                            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                            Leave blank to dispatch immediately. Same-day
                            delivery available for bookings placed before 2 PM.
                          </p>
                        </div>
                      </>
                    )}

                    {/* Step 5 — Review */}
                    {step === 5 && (
                      <div className="space-y-0 divide-y divide-border rounded-xl border">
                        {[
                          [
                            "Pickup",
                            `${d.pickupAddress || "—"}, ${d.pickupArea}`,
                          ],
                          [
                            "Receiver",
                            `${d.destAddress || "—"}, ${d.destArea}`,
                          ],
                          [
                            "Cargo",
                            `${CARGO_LABELS[d.cargo as keyof typeof CARGO_LABELS]} · ${d.weight} kg`,
                          ],
                          [
                            "Vehicle",
                            VEHICLE_LABELS[
                              d.vehicle as keyof typeof VEHICLE_LABELS
                            ],
                          ],
                          [
                            "Urgency",
                            URGENCY_LABELS[
                              d.urgency as keyof typeof URGENCY_LABELS
                            ],
                          ],
                          ["Insurance", d.insurance ? "✓ Covered" : "Not covered"],
                          [
                            "Schedule",
                            d.scheduledFor
                              ? new Date(d.scheduledFor).toLocaleString(
                                  "en-NG"
                                )
                              : "Dispatch immediately",
                          ],
                          ["Estimated fare", NGN(estimated)],
                        ].map(([k, v]) => (
                          <div
                            key={k}
                            className="flex items-center justify-between px-4 py-3.5"
                          >
                            <span className="text-sm text-muted-foreground">
                              {k}
                            </span>
                            <span
                              className={`text-sm font-semibold ${k === "Estimated fare" ? "text-amber-500" : ""}`}
                            >
                              {v}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Step 6 — Payment */}
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
                                  ? "border-amber-400 bg-amber-50 shadow-sm"
                                  : "hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div
                                className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg ${d.provider === k ? "bg-amber-400" : "bg-slate-100"}`}
                              >
                                <Icon
                                  className={`h-4 w-4 ${d.provider === k ? "text-slate-900" : "text-slate-600"}`}
                                />
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{label}</p>
                                <p className="text-xs text-muted-foreground">
                                  {sub}
                                </p>
                              </div>
                              {d.provider === k && (
                                <Check className="ml-auto h-4 w-4 text-amber-500" />
                              )}
                            </button>
                          ))}
                        </div>
                        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                          <p className="text-sm font-medium text-amber-800">
                            You'll pay{" "}
                            <span className="text-amber-600">
                              {NGN(estimated)}
                            </span>{" "}
                            via{" "}
                            {
                              PAYMENT_OPTIONS.find(
                                ([k]) => k === d.provider
                              )?.[1]
                            }
                            .
                          </p>
                          <p className="mt-0.5 text-xs text-amber-700">
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
                <Button
                  variant="ghost"
                  onClick={prev}
                  disabled={step === 0}
                  className="gap-1.5"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>

                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === step
                          ? "w-6 bg-amber-400"
                          : i < step
                            ? "w-1.5 bg-emerald-400"
                            : "w-1.5 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {step < STEPS.length - 1 ? (
                  <Button onClick={next} className="gap-1.5">
                    Continue <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => book.mutate()}
                    disabled={book.isPending}
                    className="gap-2 bg-amber-500 text-white hover:bg-amber-600"
                  >
                    {book.isPending ? (
                      "Confirming…"
                    ) : (
                      <>
                        Pay {NGN(estimated)} & Book{" "}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────── */

const FieldGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium">{label}</Label>
    {children}
  </div>
);

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