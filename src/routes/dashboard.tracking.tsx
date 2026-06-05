import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { AnimatedRouteMap } from "@/components/shared/animated-route-map";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/shipment.service";
import { Badge } from "@/components/ui/badge";
import { SHIPMENT_STATUS_LABELS } from "@/constants";

export const Route = createFileRoute("/dashboard/tracking")({
  head: () => ({ meta: [{ title: "Live tracking — Quick Reach Logistics" }] }),
  component: LiveTracking,
});

function LiveTracking() {
  const { data = [] } = useQuery({ queryKey: ["shipments"], queryFn: shipmentService.list });
  const active = data.filter((s) => !["delivered", "cancelled"].includes(s.status));
  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <AnimatedRouteMap className="!aspect-[16/10]" />
      <Card className="overflow-hidden">
        <div className="p-5 font-display text-lg font-semibold">Active deliveries</div>
        <ul className="max-h-[520px] divide-y overflow-y-auto">
          {active.map((s) => (
            <li key={s.id} className="p-4 hover:bg-surface">
              <Link to="/track/$id" params={{ id: s.id }} search={{ id: undefined }} className="block">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-primary">{s.trackingCode}</span>
                  <Badge variant="secondary" className="rounded-full text-[10px]">{SHIPMENT_STATUS_LABELS[s.status]}</Badge>
                </div>
                <div className="mt-1 text-sm">{s.pickup.area} → {s.destination.area}</div>
                <div className="mt-1 text-xs text-muted-foreground">ETA {s.etaMinutes} min · {s.driver?.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
