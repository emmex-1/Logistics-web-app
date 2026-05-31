import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { shipmentService } from "@/services/shipment.service";
import { notificationService } from "@/services/admin.service";
import { Badge } from "@/components/ui/badge";
import { NGN, SHIPMENT_STATUS_LABELS } from "@/constants";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Package, TrendingUp, Wallet, Truck, ArrowUpRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — Sendaro Dashboard" }] }),
  component: Overview,
});

function Overview() {
  const shipments = useQuery({ queryKey: ["shipments"], queryFn: shipmentService.list });
  const notifs = useQuery({ queryKey: ["notifications"], queryFn: notificationService.list });
  const list = shipments.data ?? [];
  const active = list.filter((s) => !["delivered", "cancelled", "failed"].includes(s.status));
  const totalSpend = list.reduce((sum, s) => sum + s.pricing.total, 0);
  const series = Array.from({ length: 14 }).map((_, i) => ({ d: i + 1, v: 4 + Math.round(Math.sin(i / 2) * 3 + i / 2) }));

  const stats = [
    { label: "Active shipments", value: active.length.toString(), delta: "+12%", icon: Truck },
    { label: "Total deliveries", value: list.length.toString(), delta: "+8%", icon: Package },
    { label: "Spent this month", value: NGN(totalSpend), delta: "+3%", icon: Wallet },
    { label: "On-time rate", value: "97%", delta: "+1.2%", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary"><s.icon className="h-4 w-4" /></div>
              <span className="text-xs font-medium text-success">{s.delta}</span>
            </div>
            <div className="mt-4 font-display text-2xl font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-lg font-semibold">Delivery activity</div>
              <div className="text-xs text-muted-foreground">Last 14 days</div>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/dashboard/shipments">All shipments <ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.68 0.196 42)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.68 0.196 42)" stopOpacity={0} />
                </linearGradient></defs>
                <XAxis dataKey="d" tick={{ fontSize: 11 }} stroke="oklch(0.6 0.02 60)" axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.6 0.02 60)" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.006 80)" }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.68 0.196 42)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-semibold">Notifications</div>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
          <ul className="mt-4 space-y-3">
            {(notifs.data ?? []).slice(0, 5).map((n) => (
              <li key={n.id} className="rounded-lg border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{n.title}</span>
                  {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <div className="font-display text-lg font-semibold">Recent shipments</div>
          <Button asChild variant="ghost" size="sm"><Link to="/dashboard/shipments">View all</Link></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
              <tr><Th>Tracking</Th><Th>Route</Th><Th>Status</Th><Th>Total</Th><Th>Date</Th></tr>
            </thead>
            <tbody>
              {list.slice(0, 6).map((s) => (
                <tr key={s.id} className="border-t hover:bg-surface">
                  <Td><Link to="/track/$id" params={{ id: s.id }} className="font-mono text-primary hover:underline">{s.trackingCode}</Link></Td>
                  <Td>{s.pickup.area} → {s.destination.area}</Td>
                  <Td><Badge variant="secondary" className="rounded-full">{SHIPMENT_STATUS_LABELS[s.status]}</Badge></Td>
                  <Td className="font-medium">{NGN(s.pricing.total)}</Td>
                  <Td className="text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const Th = ({ children }: any) => <th className="px-6 py-3 text-left font-medium">{children}</th>;
const Td = ({ children, className = "" }: any) => <td className={"px-6 py-4 " + className}>{children}</td>;
