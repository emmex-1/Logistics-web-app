import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { riderService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { NGN } from "@/constants";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/rider/earnings")({
  head: () => ({ meta: [{ title: "Earnings — Rider" }] }),
  component: () => {
    const { data } = useQuery({ queryKey: ["rider.earnings"], queryFn: riderService.earnings });
    return (
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-semibold">Earnings</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">This week</div><div className="mt-2 font-display text-3xl font-semibold">{NGN(data?.total ?? 0)}</div></Card>
          <Card className="p-5"><div className="text-xs uppercase text-muted-foreground">Pending payout</div><div className="mt-2 font-display text-3xl font-semibold">{NGN(data?.pending ?? 0)}</div></Card>
        </div>
        <Card className="p-6">
          <div className="font-display text-lg font-semibold">Daily breakdown</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer><BarChart data={data?.week ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.006 80)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip />
              <Bar dataKey="amount" fill="oklch(0.58 0.245 27)" radius={[6, 6, 0, 0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </Card>
      </div>
    );
  },
});
