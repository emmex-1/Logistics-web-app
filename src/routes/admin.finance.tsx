import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { NGN } from "@/constants";
import { ResponsiveContainer, Line, LineChart, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/finance")({
  head: () => ({ meta: [{ title: "Finance — Quick Reach Logistics Admin" }] }),
  component: Finance,
});

function Finance() {
  const { data = [] } = useQuery({ queryKey: ["admin.revenue"], queryFn: adminService.revenue });
  const total = data.reduce((a, b) => a + b.revenue, 0);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Finance</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">YTD revenue</div><div className="mt-2 font-display text-3xl font-semibold">{NGN(total)}</div></Card>
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Outstanding</div><div className="mt-2 font-display text-3xl font-semibold">{NGN(1_240_500)}</div></Card>
        <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Rider payouts</div><div className="mt-2 font-display text-3xl font-semibold">{NGN(4_810_300)}</div></Card>
      </div>
      <Card className="p-6">
        <div className="font-display text-lg font-semibold">Monthly revenue</div>
        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.006 80)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.006 80)" }} />
              <Line type="monotone" dataKey="revenue" stroke="oklch(0.68 0.196 42)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
