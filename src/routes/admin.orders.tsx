import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NGN, SHIPMENT_STATUS_LABELS } from "@/constants";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders — Quick Reach Logistics Admin" }] }),
  component: Orders,
});

function Orders() {
  const { data = [] } = useQuery({ queryKey: ["admin.orders"], queryFn: adminService.orders });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Orders</h1>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
            <tr><Th>Tracking</Th><Th>Route</Th><Th>Customer</Th><Th>Driver</Th><Th>Status</Th><Th>Total</Th></tr>
          </thead>
          <tbody>
            {data.map((s) => (
              <tr key={s.id} className="border-t hover:bg-surface">
                <Td className="font-mono text-primary">{s.trackingCode}</Td>
                <Td>{s.pickup.area} → {s.destination.area}</Td>
                <Td>{s.pickup.contactName ?? "—"}</Td>
                <Td>{s.driver?.name ?? "—"}</Td>
                <Td><Badge variant="secondary" className="rounded-full">{SHIPMENT_STATUS_LABELS[s.status]}</Badge></Td>
                <Td className="font-medium">{NGN(s.pricing.total)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
const Th = ({ children }: any) => <th className="px-6 py-3 text-left font-medium">{children}</th>;
const Td = ({ children, className = "" }: any) => <td className={"px-6 py-4 " + className}>{children}</td>;
