import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { riderService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { NGN, SHIPMENT_STATUS_LABELS } from "@/constants";

export const Route = createFileRoute("/rider/")({
  head: () => ({ meta: [{ title: "Today — Rider" }] }),
  component: RiderToday,
});

function RiderToday() {
  const [online, setOnline] = useState(true);
  const deliveries = useQuery({ queryKey: ["rider.deliveries"], queryFn: riderService.deliveries });
  const earnings = useQuery({ queryKey: ["rider.earnings"], queryFn: riderService.earnings });

  return (
    <div className="space-y-6">
      <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Status</div>
          <div className="font-display text-2xl font-semibold">{online ? "Online & accepting" : "Offline"}</div>
        </div>
        <div className="flex items-center gap-3"><span className="text-sm">Available</span><Switch checked={online} onCheckedChange={setOnline} /></div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Today's earnings</div><div className="mt-2 font-display text-3xl font-semibold">{NGN(earnings.data?.total ?? 0)}</div></Card>
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Pending payout</div><div className="mt-2 font-display text-3xl font-semibold">{NGN(earnings.data?.pending ?? 0)}</div></Card>
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Assigned</div><div className="mt-2 font-display text-3xl font-semibold">{deliveries.data?.length ?? 0}</div></Card>
      </div>
      <Card className="overflow-hidden">
        <div className="p-5 font-display text-lg font-semibold">Assigned deliveries</div>
        <ul className="divide-y">
          {(deliveries.data ?? []).map((s) => (
            <li key={s.id}>
              <Link to="/track/$id" params={{ id: s.id }} className="flex items-center justify-between p-5 hover:bg-surface">
                <div>
                  <div className="font-mono text-sm text-primary">{s.trackingCode}</div>
                  <div className="text-sm">{s.pickup.area} → {s.destination.area}</div>
                </div>
                <Badge variant="secondary" className="rounded-full">{SHIPMENT_STATUS_LABELS[s.status]}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
