import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Scan,
} from "lucide-react";
import { trackingService } from "@/services/shipment.service";
import { mockShipments } from "@/mock/data";
import { SHIPMENT_STATUS_LABELS } from "@/constants";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Package — Quick Reach Logistics" },
      {
        name: "description",
        content: "Track a Quick Reach Logistics shipment in real time.",
      },
    ],
  }),
  component: TrackPage,
});

const STEPS_PREVIEW = [
  { icon: Package, label: "Booked", desc: "Order confirmed" },
  { icon: Truck, label: "In Transit", desc: "Rider on the way" },
  { icon: CheckCircle2, label: "Delivered", desc: "Package received" },
];

function TrackPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const m = useMutation({
    mutationFn: trackingService.byCode,
    onSuccess: (s) => navigate({ to: "/track/$id", params: { id: s.id } }),
    onError: () =>
      toast.error("Tracking code not found. Try one of the examples below."),
  });

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-slate-950 pb-24 pt-20">
          {/* Red glow blob */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: "#ef0004" }}
          />
          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Badge
                className="mb-5 rounded-full border-white/10 bg-white/8 text-white"
                style={{ backgroundColor: "rgba(239,0,4,0.15)", borderColor: "rgba(239,0,4,0.3)", color: "#fca5a5" }}
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#ef0004]" />
                Live Tracking
              </Badge>

              <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Where's your{" "}
                <span style={{ color: "#ef0004" }}>package?</span>
              </h1>
              <p className="mx-auto mt-5 max-w-md text-lg text-slate-400">
                Enter your tracking code for live status, rider location, and
                real-time ETA across Lagos.
              </p>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-10"
            >
              <Card className="overflow-hidden border-0 bg-white p-2 shadow-2xl">
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (code) m.mutate(code);
                  }}
                >
                  <div className="relative flex-1">
                    <Scan className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="e.g. SDR9000235"
                      className="h-13 border-0 bg-transparent pl-11 text-base font-mono font-semibold tracking-wider shadow-none focus-visible:ring-0"
                    />
                  </div>
                  <Button
                    size="lg"
                    type="submit"
                    disabled={m.isPending}
                    className="h-13 gap-2 px-6 text-white"
                    style={{ backgroundColor: "#ef0004" }}
                  >
                    {m.isPending ? (
                      "Looking…"
                    ) : (
                      <>
                        Track <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Sample codes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-6"
            >
              <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">
                Try a sample code
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {mockShipments.slice(0, 6).map((s) => (
                  <Link
                    key={s.id}
                    to="/track/$id"
                    params={{ id: s.id }}
                    className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-300 transition-all hover:border-[#ef0004]/40 hover:bg-[#ef0004]/10 hover:text-white"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
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
                    <span className="text-slate-500 group-hover:text-slate-400">
                      ·{" "}
                      {SHIPMENT_STATUS_LABELS[
                        s.status as keyof typeof SHIPMENT_STATUS_LABELS
                      ] ?? s.status}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── How tracking works ── */}
        <section className="border-t bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
              How it works
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {STEPS_PREVIEW.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div
                    className="grid h-14 w-14 place-items-center rounded-2xl"
                    style={{
                      backgroundColor:
                        i === 0
                          ? "rgba(239,0,4,0.08)"
                          : i === 1
                            ? "rgba(239,0,4,0.12)"
                            : "rgba(34,197,94,0.1)",
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: i < 2 ? "#ef0004" : "#22c55e" }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden sm:block absolute translate-x-[130px] translate-y-[-36px]" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature strip ── */}
        <section className="border-t py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Clock, label: "Real-time ETA", desc: "Updates every few seconds" },
                { icon: Truck, label: "Rider Location", desc: "Live map tracking" },
                { icon: Package, label: "Status History", desc: "Full event timeline" },
                { icon: CheckCircle2, label: "Proof of Delivery", desc: "Recipient confirmation" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex flex-col gap-2 rounded-xl border bg-card p-4">
                  <Icon className="h-5 w-5" style={{ color: "#ef0004" }} />
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}