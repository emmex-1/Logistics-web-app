import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export const Route = createFileRoute("/attendant/track")({
  head: () => ({ meta: [{ title: "Search & track — Attendant" }] }),
  component: Track,
});

const STEPS = ["Created", "Picked up", "Warehouse", "In transit", "Delivered"];

function Track() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Search & track</h1>
        <p className="text-sm text-muted-foreground">Look up any shipment by tracking ID or recipient phone.</p>
      </div>
      <Card className="p-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9 font-mono" placeholder="SL-2026-XXXXX or phone" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Button onClick={() => setActive(2)}>Search</Button>
      </Card>
      {active !== null && (
        <Card className="p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-mono text-sm text-primary">SL-2026-10231</div>
              <div className="text-sm">Ikeja → Victoria Island</div>
            </div>
            <Badge variant="secondary">{STEPS[active]}</Badge>
          </div>
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <button key={s} onClick={() => setActive(i)} className="flex-1 min-w-[100px] text-center">
                <div className={`mx-auto h-2 w-full rounded-full ${i <= active ? "bg-primary" : "bg-muted"}`} />
                <div className={`mt-2 text-xs ${i === active ? "font-semibold" : "text-muted-foreground"}`}>{s}</div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
