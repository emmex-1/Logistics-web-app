import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shipmentService } from "@/services/shipment.service";
import { NGN, SHIPMENT_STATUS_LABELS } from "@/constants";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/shipments")({
  head: () => ({ meta: [{ title: "Shipments — Quick Reach Logistics Dashboard" }] }),
  component: ShipmentsPage,
});

function ShipmentsPage() {
  const [q, setQ] = useState("");
  const { data = [], isLoading } = useQuery({ queryKey: ["shipments"], queryFn: shipmentService.list });
  const filtered = data.filter((s) =>
    !q || s.trackingCode.toLowerCase().includes(q.toLowerCase()) || s.destination.area.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Shipments</h1>
        <Button asChild><Link to="/book">New booking</Link></Button>
      </div>
      <Card className="p-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search tracking code or destination" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
              <tr><Th>Tracking</Th><Th>From</Th><Th>To</Th><Th>Vehicle</Th><Th>Status</Th><Th>Total</Th><Th>Date</Th></tr>
            </thead>
            <tbody>
              {isLoading && Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}><td colSpan={7} className="px-6 py-4"><div className="h-5 w-full animate-pulse rounded bg-muted" /></td></tr>
              ))}
              {filtered.map((s) => (
                <tr key={s.id} className="border-t hover:bg-surface">
                  <Td><Link to="/track/$id" params={{ id: s.id }} className="font-mono text-primary hover:underline">{s.trackingCode}</Link></Td>
                  <Td>{s.pickup.area}</Td>
                  <Td>{s.destination.area}</Td>
                  <Td className="capitalize">{s.vehicle}</Td>
                  <Td><Badge variant="secondary" className="rounded-full">{SHIPMENT_STATUS_LABELS[s.status]}</Badge></Td>
                  <Td className="font-medium">{NGN(s.pricing.total)}</Td>
                  <Td className="text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</Td>
                </tr>
              ))}
              {!isLoading && filtered.length === 0 && <tr><td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">No shipments yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
const Th = ({ children }: any) => <th className="px-6 py-3 text-left font-medium">{children}</th>;
const Td = ({ children, className = "" }: any) => <td className={"px-6 py-4 " + className}>{children}</td>;
