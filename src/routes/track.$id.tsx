import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackingService } from "@/services/shipment.service";
import type { Shipment } from "@/types";
import { Phone, Star, MapPin, Clock, Package, CheckCircle2, Truck, ChevronLeft, Share2 } from "lucide-react";
import { SHIPMENT_STATUS_LABELS, NGN } from "@/constants";
import { AnimatedRouteMap } from "@/components/shared/animated-route-map";

export const Route = createFileRoute("/track/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Tracking ${params.id} — Sendaro` },
      { name: "description", content: "Real-time Sendaro shipment tracking." },
    ],
  }),
  component: TrackDetail,
});

function TrackDetail() {
  const { id } = Route.useParams();
  const [shp, setShp] = useState<Shipment | null>(null);
  useEffect(() => {
    const unsub = trackingService.subscribe(id, setShp);
    return unsub;
  }, [id]);

  if (!shp) return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="h-[420px] animate-pulse rounded-2xl bg-muted" />
          <div className="space-y-4">
            <div className="h-24 animate-pulse rounded-2xl bg-muted" />
            <div className="h-48 animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Button asChild variant="ghost" size="sm" className="-ml-3"><Link to="/track"><ChevronLeft className="mr-1 h-4 w-4" />All shipments</Link></Button>
            <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight">Tracking <span className="font-mono">{shp.trackingCode}</span></h1>
            <p className="text-sm text-muted-foreground">{shp.pickup.area} → {shp.destination.area}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={shp.status} />
            <Button variant="outline" size="sm"><Share2 className="mr-1 h-4 w-4" />Share</Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <AnimatedRouteMap className="!aspect-[16/10]" />
            <Card className="p-6">
              <div className="font-display text-lg font-semibold">Status timeline</div>
              <ol className="mt-5 space-y-5">
                {shp.events.map((e, i) => (
                  <li key={e.id} className="relative grid grid-cols-[28px_1fr] gap-4">
                    <div className="relative">
                      <div className={`grid h-7 w-7 place-items-center rounded-full ${i === shp.events.length - 1 ? "gradient-primary text-primary-foreground shadow-glow" : "border bg-card text-muted-foreground"}`}>
                        {i === shp.events.length - 1 ? <Truck className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                      {i !== shp.events.length - 1 && <div className="absolute left-1/2 top-7 h-full w-px -translate-x-1/2 bg-border" />}
                    </div>
                    <div className="pb-2">
                      <div className="text-sm font-medium">{e.title}</div>
                      {e.description && <div className="text-xs text-muted-foreground">{e.description}</div>}
                      <div className="mt-1 text-xs text-muted-foreground">{new Date(e.at).toLocaleString()} {e.location && `· ${e.location}`}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">ETA</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold">{shp.etaMinutes ?? 0}</span>
                  <span className="text-sm text-muted-foreground">min</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />Updates every few seconds</div>
              </Card>
            </motion.div>

            {shp.driver && (
              <Card className="p-5">
                <div className="font-display text-sm font-semibold">Your rider</div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary font-display font-semibold text-primary-foreground">
                    {shp.driver.name.split(" ").map((s) => s[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{shp.driver.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-warning text-warning" /> {shp.driver.rating.toFixed(1)} · {shp.driver.trips} trips
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{shp.driver.vehicle.model} · {shp.driver.vehicle.plate}</div>
                  </div>
                  <Button size="icon" variant="outline"><Phone className="h-4 w-4" /></Button>
                </div>
              </Card>
            )}

            <Card className="p-5">
              <div className="font-display text-sm font-semibold">Shipment details</div>
              <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Pickup</dt><dd className="font-medium text-right flex items-center justify-end gap-1"><MapPin className="h-3 w-3" />{shp.pickup.area}</dd>
                <dt className="text-muted-foreground">Drop</dt><dd className="font-medium text-right flex items-center justify-end gap-1"><MapPin className="h-3 w-3" />{shp.destination.area}</dd>
                <dt className="text-muted-foreground">Cargo</dt><dd className="font-medium text-right flex items-center justify-end gap-1"><Package className="h-3 w-3" />{shp.cargo}</dd>
                <dt className="text-muted-foreground">Distance</dt><dd className="font-medium text-right">{shp.pricing.distanceKm} km</dd>
                <dt className="text-muted-foreground">Total</dt><dd className="font-medium text-right">{NGN(shp.pricing.total)}</dd>
              </dl>
            </Card>

            {shp.pod && (
              <Card className="p-5">
                <div className="font-display text-sm font-semibold">Proof of delivery</div>
                <div className="mt-3 text-sm">
                  Received by <span className="font-medium">{shp.pod.receivedBy}</span><br />
                  <span className="text-xs text-muted-foreground">{new Date(shp.pod.receivedAt).toLocaleString()}</span>
                </div>
                {shp.pod.notes && <p className="mt-2 text-xs text-muted-foreground">"{shp.pod.notes}"</p>}
              </Card>
            )}
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

function StatusBadge({ status }: { status: Shipment["status"] }) {
  const color = status === "delivered" ? "bg-success/15 text-success" :
    status === "failed" || status === "cancelled" ? "bg-destructive/15 text-destructive" :
    "bg-primary/15 text-primary";
  return <Badge className={`rounded-full font-medium ${color}`}>{SHIPMENT_STATUS_LABELS[status]}</Badge>;
}
