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
import {
  Phone,
  Star,
  MapPin,
  Clock,
  Package,
  CheckCircle2,
  Truck,
  ChevronLeft,
  Share2,
  Navigation,
  Shield,
  AlertCircle,
} from "lucide-react";
import { SHIPMENT_STATUS_LABELS, NGN } from "@/constants";
import { AnimatedRouteMap } from "@/components/shared/animated-route-map";

export const Route = createFileRoute("/track/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Tracking ${params.id} — Quick Reach Logistics` },
      {
        name: "description",
        content: "Real-time Quick Reach Logistics shipment tracking.",
      },
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

  if (!shp) {
    return (
      <div className="min-h-screen bg-background">
        <MarketingNav />
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
          {/* Skeleton shimmer */}
          <div className="h-7 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-4">
              <div className="aspect-[16/10] animate-pulse rounded-2xl bg-muted" />
              <div className="h-52 animate-pulse rounded-2xl bg-muted" />
            </div>
            <div className="space-y-4">
              <div className="h-28 animate-pulse rounded-2xl bg-muted" />
              <div className="h-36 animate-pulse rounded-2xl bg-muted" />
              <div className="h-44 animate-pulse rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isActive =
    shp.status !== "delivered" &&
    shp.status !== "failed" &&
    shp.status !== "cancelled";

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* ── Status banner for active shipments ── */}
      {isActive && (
        <div
          className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white"
          style={{ backgroundColor: "#ef0004" }}
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white/70" />
          Your delivery is on the way · Updates every few seconds
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Page header ── */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Button asChild variant="ghost" size="sm" className="-ml-3 mb-1">
              <Link to="/track">
                <ChevronLeft className="mr-1 h-4 w-4" /> All shipments
              </Link>
            </Button>
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Tracking{" "}
              <span className="font-mono" style={{ color: "#ef0004" }}>
                {shp.trackingCode}
              </span>
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {shp.pickup.area}
              <span className="mx-1 text-slate-300">→</span>
              {shp.destination.area}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={shp.status} />
            <Button variant="outline" size="sm" className="gap-1.5">
              <Share2 className="h-3.5 w-3.5" /> Share
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* ── Left column ── */}
          <div className="space-y-5">
            {/* Map */}
            <Card className="overflow-hidden p-0 shadow-sm">
              <AnimatedRouteMap className="!aspect-[16/10]" />
            </Card>

            {/* Timeline */}
            <Card className="p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Navigation className="h-4 w-4" style={{ color: "#ef0004" }} />
                <h2 className="font-display text-base font-semibold">
                  Status Timeline
                </h2>
              </div>
              <ol className="space-y-0">
                {shp.events.map((e, i) => {
                  const isLatest = i === shp.events.length - 1;
                  return (
                    <li
                      key={e.id}
                      className="relative grid grid-cols-[28px_1fr] gap-x-4"
                    >
                      {/* Dot + line */}
                      <div className="relative flex flex-col items-center">
                        <div
                          className="z-10 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full transition-colors"
                          style={
                            isLatest
                              ? {
                                  backgroundColor: "#ef0004",
                                  color: "#fff",
                                  boxShadow: "0 0 0 4px rgba(239,0,4,0.15)",
                                }
                              : {
                                  backgroundColor: "#f0fdf4",
                                  color: "#16a34a",
                                  border: "1px solid #bbf7d0",
                                }
                          }
                        >
                          {isLatest ? (
                            <Truck className="h-3.5 w-3.5" />
                          ) : (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          )}
                        </div>
                        {i !== shp.events.length - 1 && (
                          <div className="my-1 w-px flex-1 bg-border" />
                        )}
                      </div>

                      {/* Content */}
                      <div className={`pb-5 ${i === shp.events.length - 1 ? "pb-0" : ""}`}>
                        <p
                          className="text-sm font-semibold"
                          style={isLatest ? { color: "#ef0004" } : undefined}
                        >
                          {e.title}
                        </p>
                        {e.description && (
                          <p className="text-xs text-muted-foreground">
                            {e.description}
                          </p>
                        )}
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {new Date(e.at).toLocaleString()}
                          {e.location && ` · ${e.location}`}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Card>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-4">
            {/* ETA card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                className="overflow-hidden p-0 shadow-sm"
                style={{ borderColor: "rgba(239,0,4,0.2)" }}
              >
                <div
                  className="px-5 py-4"
                  style={{ backgroundColor: "#ef0004" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-100">
                    Estimated Arrival
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold text-white">
                      {shp.etaMinutes ?? 0}
                    </span>
                    <span className="text-lg font-medium text-red-200">
                      min
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-5 py-2.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" style={{ color: "#ef0004" }} />
                  Updates every few seconds
                </div>
              </Card>
            </motion.div>

            {/* Rider card */}
            {shp.driver && (
              <Card className="p-5 shadow-sm">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Your Rider
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full font-display text-base font-bold text-white"
                    style={{ backgroundColor: "#ef0004" }}
                  >
                    {shp.driver.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{shp.driver.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {shp.driver.rating.toFixed(1)} · {shp.driver.trips} trips
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {shp.driver.vehicle.model} · {shp.driver.vehicle.plate}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="flex-shrink-0 hover:text-white"
                    style={
                      {
                        "--hover-bg": "#ef0004",
                      } as any
                    }
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Shipment details */}
            <Card className="p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Package className="h-4 w-4" style={{ color: "#ef0004" }} />
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Shipment Details
                </p>
              </div>
              <dl className="space-y-0 divide-y text-sm">
                {[
                  ["Pickup", shp.pickup.area, MapPin],
                  ["Drop", shp.destination.area, MapPin],
                  ["Cargo", shp.cargo, Package],
                  ["Distance", `${shp.pricing.distanceKm} km`, null],
                  ["Total", NGN(shp.pricing.total), null],
                ].map(([k, v, Icon]: any) => (
                  <div
                    key={k as string}
                    className="flex items-center justify-between py-2.5"
                  >
                    <span className="text-muted-foreground">{k}</span>
                    <span className="flex items-center gap-1 font-semibold">
                      {Icon && <Icon className="h-3 w-3 text-slate-400" />}
                      {v}
                    </span>
                  </div>
                ))}
              </dl>
            </Card>

            {/* Insurance */}
            {shp.insurance && (
              <Card
                className="flex items-center gap-3 p-4 shadow-sm"
                style={{ borderColor: "rgba(239,0,4,0.2)", backgroundColor: "rgba(239,0,4,0.03)" }}
              >
                <Shield className="h-5 w-5 flex-shrink-0" style={{ color: "#ef0004" }} />
                <div>
                  <p className="text-sm font-semibold">Insured delivery</p>
                  <p className="text-xs text-muted-foreground">
                    Covered up to ₦500,000
                  </p>
                </div>
              </Card>
            )}

            {/* Proof of delivery */}
            {shp.pod && (
              <Card className="p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Proof of Delivery
                  </p>
                </div>
                <p className="text-sm">
                  Received by{" "}
                  <span className="font-semibold">{shp.pod.receivedBy}</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {new Date(shp.pod.receivedAt).toLocaleString()}
                </p>
                {shp.pod.notes && (
                  <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-muted-foreground">
                    "{shp.pod.notes}"
                  </p>
                )}
              </Card>
            )}

            {/* Failed/cancelled notice */}
            {(shp.status === "failed" || shp.status === "cancelled") && (
              <Card className="flex items-start gap-3 border-destructive/30 bg-destructive/5 p-5 shadow-sm">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <p className="text-sm font-semibold text-destructive">
                    Delivery {shp.status}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Contact support or rebook this delivery.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    asChild
                  >
                    <Link to="/book">Rebook delivery</Link>
                  </Button>
                </div>
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
  const styles =
    status === "delivered"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "failed" || status === "cancelled"
        ? "bg-red-50 text-red-700 border-red-200"
        : "text-white border-transparent";

  return (
    <Badge
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
      style={
        status !== "delivered" &&
        status !== "failed" &&
        status !== "cancelled"
          ? { backgroundColor: "#ef0004" }
          : undefined
      }
    >
      {status === "in_transit" && (
        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
      )}
      {SHIPMENT_STATUS_LABELS[status]}
    </Badge>
  );
}