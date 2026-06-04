import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScanLine, Warehouse } from "lucide-react";

export const Route = createFileRoute("/attendant/intake")({
  head: () => ({ meta: [{ title: "Parcel intake — Attendant" }] }),
  component: Intake,
});

const QUEUE = [
  { id: "SL-2026-10231", from: "Walk-in", at: "09:02", bin: "A-12" },
  { id: "SL-2026-10232", from: "Rider pickup", at: "09:18", bin: "B-04" },
  { id: "SL-2026-10233", from: "Walk-in", at: "09:31", bin: "A-13" },
];

function Intake() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Parcel intake</h1>
        <p className="text-sm text-muted-foreground">Receive parcels at the counter and assign warehouse bins.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 space-y-4 lg:col-span-2">
          <div className="font-display text-sm font-semibold">Scan or enter tracking</div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <Input placeholder="SL-2026-XXXXX" className="font-mono" />
            <Button><ScanLine className="h-4 w-4 mr-2" /> Scan</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Bin</Label><Input placeholder="A-12" /></div>
            <div><Label>Condition note</Label><Input placeholder="Sealed, no damage" /></div>
          </div>
          <Button className="w-full sm:w-auto"><Warehouse className="h-4 w-4 mr-2" /> Confirm intake</Button>
        </Card>
        <Card className="p-6">
          <div className="font-display text-sm font-semibold mb-3">Today's intake</div>
          <div className="space-y-3">
            {QUEUE.map((q) => (
              <div key={q.id} className="flex items-center justify-between text-sm border-b last:border-0 pb-2 last:pb-0">
                <div>
                  <div className="font-mono text-xs text-primary">{q.id}</div>
                  <div className="text-xs text-muted-foreground">{q.from} · {q.at}</div>
                </div>
                <Badge variant="secondary">{q.bin}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
