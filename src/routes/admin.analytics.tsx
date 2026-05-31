import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Sendaro Admin" }] }),
  component: Analytics,
});

function Analytics() {
  const { data = [] } = useQuery({ queryKey: ["admin.revenue"], queryFn: adminService.revenue });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Analytics</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="font-display text-lg font-semibold">Deliveries trend</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer><AreaChart data={data}>
              <defs><linearGradient id="a1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="oklch(0.55 0.13 240)" stopOpacity={0.4} /><stop offset="100%" stopColor="oklch(0.55 0.13 240)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.006 80)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip /><Area type="monotone" dataKey="deliveries" stroke="oklch(0.55 0.13 240)" fill="url(#a1)" strokeWidth={2} />
            </AreaChart></ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <div className="font-display text-lg font-semibold">Revenue by month</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer><BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.006 80)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip />
              <Bar dataKey="revenue" fill="oklch(0.68 0.196 42)" radius={[6,6,0,0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
