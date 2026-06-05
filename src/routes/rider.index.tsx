import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { riderService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { NGN, SHIPMENT_STATUS_LABELS } from "@/constants";
import { Package, Truck, Wallet, Star, Navigation, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/rider/")({
  head: () => ({ meta: [{ title: "Today — Rider" }] }),
  component: RiderToday,
});

const statusFlow = ["accepted", "en_route_pickup", "arrived_pickup", "picked_up", "in_transit", "delivered"] as const;
const statusLabels: Record<string, string> = {
  accepted: "Accepted", en_route_pickup: "En route to pickup", arrived_pickup: "Arrived at pickup",
  picked_up: "Parcel picked up", in_transit: "In transit", delivered: "Delivered",
};

function RiderToday() {
  const [online, setOnline] = useState(true);
  const deliveries = useQuery({ queryKey: ["rider.deliveries"], queryFn: riderService.deliveries });
  const earnings = useQuery({ queryKey: ["rider.earnings"], queryFn: riderService.earnings });
  const [stepIdx, setStepIdx] = useState(2);

  const list = deliveries.data ?? [];
  const pending = list.filter((s) => !["delivered", "cancelled", "failed"].includes(s.status));

  return (
    <div className="space-y-6">
      <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Status</div>
          <div className="font-display text-2xl font-semibold">{online ? "Online & accepting" : "Offline"}</div>
        </div>
        <div className="flex items-center gap-3"><span className="text-sm">Available</span><Switch checked={online} onCheckedChange={setOnline} /></div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Deliveries today", value: list.length, icon: Package },
          { label: "Earnings today", value: NGN(earnings.data?.total ?? 0), icon: Wallet },
          { label: "Pending", value: pending.length, icon: Truck },
          { label: "Distance", value: "84 km", icon: Navigation },
          { label: "Rating", value: "4.92", icon: Star },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary"><s.icon className="h-4 w-4" /></div>
            <div className="mt-4 font-display text-2xl font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between"><div className="font-display text-lg font-semibold">Active delivery</div><Badge className="rounded-full">{statusLabels[statusFlow[stepIdx]]}</Badge></div>
        <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />Lekki Phase 1 → Ikeja GRA · 21.4 km · ETA 38 min</div>
        <div className="mt-5 flex flex-wrap gap-2">
          {statusFlow.map((s, i) => (
            <button key={s} onClick={() => setStepIdx(i)} className={"rounded-full border px-3 py-1.5 text-xs " + (i <= stepIdx ? "border-primary bg-primary text-primary-foreground" : "hover:bg-surface")}>
              {statusLabels[s]}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button onClick={() => { setStepIdx((i) => Math.min(i + 1, statusFlow.length - 1)); toast.success("Status updated"); }}><CheckCircle2 className="mr-2 h-4 w-4" />Advance status</Button>
          <Button asChild variant="outline"><Link to="/rider/pod">Capture POD</Link></Button>
          <Button asChild variant="outline"><Link to="/rider/issues">Report issue</Link></Button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="p-5 font-display text-lg font-semibold">Assigned deliveries</div>
        <ul className="divide-y">
          {pending.map((s) => (
            <li key={s.id}>
              <Link to="/track/$id" params={{ id: s.id }} search={{ id: undefined }} className="flex items-center justify-between gap-3 p-5 hover:bg-surface">
                <div className="min-w-0">
                  <div className="font-mono text-sm text-primary">{s.trackingCode}</div>
                  <div className="truncate text-sm">{s.pickup.area} → {s.destination.area}</div>
                </div>
                <Badge variant="secondary" className="rounded-full shrink-0">{SHIPMENT_STATUS_LABELS[s.status]}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
