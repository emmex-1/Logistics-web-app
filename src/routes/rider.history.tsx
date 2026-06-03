import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { riderService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NGN, SHIPMENT_STATUS_LABELS } from "@/constants";
import { Star } from "lucide-react";

export const Route = createFileRoute("/rider/history")({
  head: () => ({ meta: [{ title: "History — Rider" }] }),
  component: History,
});

function History() {
  const { data = [] } = useQuery({ queryKey: ["rider.deliveries"], queryFn: riderService.deliveries });
  const completed = data.filter((d) => ["delivered", "cancelled", "failed"].includes(d.status));
  const totalEarn = completed.reduce((a, b) => a + Math.round(b.pricing.total * 0.7), 0);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Delivery history</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Completed</div><div className="mt-2 font-display text-3xl font-semibold">{completed.length}</div></Card>
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Lifetime earnings</div><div className="mt-2 font-display text-3xl font-semibold">{NGN(totalEarn)}</div></Card>
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Avg rating</div><div className="mt-2 flex items-center gap-2 font-display text-3xl font-semibold">4.9<Star className="h-5 w-5 fill-warning text-warning" /></div></Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-6 py-3 text-left">Tracking</th><th className="px-6 py-3 text-left">Route</th><th className="px-6 py-3 text-left">Status</th><th className="px-6 py-3 text-left">Payout</th><th className="px-6 py-3 text-left">Date</th></tr>
            </thead>
            <tbody>
              {completed.map((s) => (
                <tr key={s.id} className="border-t hover:bg-surface">
                  <td className="px-6 py-4"><Link to="/track/$id" params={{ id: s.id }} className="font-mono text-primary hover:underline">{s.trackingCode}</Link></td>
                  <td className="px-6 py-4">{s.pickup.area} → {s.destination.area}</td>
                  <td className="px-6 py-4"><Badge variant="secondary" className="rounded-full">{SHIPMENT_STATUS_LABELS[s.status]}</Badge></td>
                  <td className="px-6 py-4 font-medium">{NGN(Math.round(s.pricing.total * 0.7))}</td>
                  <td className="px-6 py-4 text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {completed.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No completed deliveries yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
