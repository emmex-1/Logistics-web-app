import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/attendant/summary")({
  head: () => ({ meta: [{ title: "Daily summary — Attendant" }] }),
  component: Summary,
});

const DATA = [
  { h: "08", v: 2 }, { h: "09", v: 6 }, { h: "10", v: 4 }, { h: "11", v: 8 },
  { h: "12", v: 5 }, { h: "13", v: 3 }, { h: "14", v: 7 }, { h: "15", v: 9 },
];

function Summary() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Daily summary</h1>
          <p className="text-sm text-muted-foreground">End-of-shift report for handover.</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export PDF</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Shipments created", "44"],
          ["Revenue collected", "₦184,250"],
          ["Pending payments", "₦12,300"],
        ].map(([l, v]) => (
          <Card key={l} className="p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            <div className="font-display text-3xl font-semibold mt-2">{v}</div>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <div className="font-display text-sm font-semibold mb-4">Hourly volume</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA}>
              <XAxis dataKey="h" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="oklch(0.68 0.196 42)" fill="oklch(0.68 0.196 42 / 0.18)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
