import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { riderService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SHIPMENT_STATUS_LABELS } from "@/constants";

export const Route = createFileRoute("/rider/deliveries")({
  head: () => ({ meta: [{ title: "Deliveries — Rider" }] }),
  component: () => {
    const { data = [] } = useQuery({ queryKey: ["rider.deliveries"], queryFn: riderService.deliveries });
    return (
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-semibold">Deliveries</h1>
        <div className="grid gap-3">
          {data.map((s) => (
            <Link key={s.id} to="/track/$id" params={{ id: s.id }}>
              <Card className="flex items-center justify-between p-5 hover:bg-surface">
                <div>
                  <div className="font-mono text-sm text-primary">{s.trackingCode}</div>
                  <div className="text-sm">{s.pickup.area} → {s.destination.area}</div>
                  <div className="text-xs text-muted-foreground">{s.cargo} · {s.weightKg} kg</div>
                </div>
                <Badge variant="secondary" className="rounded-full">{SHIPMENT_STATUS_LABELS[s.status]}</Badge>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  },
});
