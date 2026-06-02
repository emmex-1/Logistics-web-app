import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { NGN } from "@/constants";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Overview — Quick Reach Logistics" }] }),
  component: AdminOverview,
});

const COLORS = ["oklch(0.68 0.196 42)", "oklch(0.55 0.13 240)", "oklch(0.7 0.14 160)", "oklch(0.78 0.14 80)", "oklch(0.55 0.18 320)"];

function AdminOverview() {
  const metrics = useQuery({ queryKey: ["admin.metrics"], queryFn: adminService.metrics });
  const revenue = useQuery({ queryKey: ["admin.revenue"], queryFn: adminService.revenue });
  const zones = useQuery({ queryKey: ["admin.zones"], queryFn: adminService.zones });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(metrics.data ?? []).map((m) => (
          <Card key={m.label} className="p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.label}</div>
            <div className="mt-2 font-display text-3xl font-semibold">
              {m.format === "currency" ? NGN(m.value) : m.format === "percent" ? `${m.value}%` : m.value.toLocaleString()}
            </div>
            <div className={`mt-1 text-xs font-medium ${m.delta >= 0 ? "text-success" : "text-destructive"}`}>
              {m.delta >= 0 ? "+" : ""}{m.delta}% vs last period
            </div>
            {m.spark && (
              <div className="mt-3 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={m.spark.map((v, i) => ({ i, v }))}>
                    <Area type="monotone" dataKey="v" stroke="oklch(0.68 0.196 42)" fill="oklch(0.68 0.196 42 / 0.18)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="font-display text-lg font-semibold">Revenue & deliveries</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue.data ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.006 80)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.006 80)" }} />
                <Bar dataKey="revenue" fill="oklch(0.68 0.196 42)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <div className="font-display text-lg font-semibold">Volume by zone</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={zones.data ?? []} dataKey="value" nameKey="zone" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {(zones.data ?? []).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1 text-xs">
            {(zones.data ?? []).map((z, i) => (
              <li key={z.zone} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{z.zone}</span>
                <span className="font-medium">{z.value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
