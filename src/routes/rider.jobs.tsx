import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MapPin, Navigation, Package, Phone, Clock } from "lucide-react";
import { useState } from "react";
import { NGN } from "@/constants";
import { toast } from "sonner";

export const Route = createFileRoute("/rider/jobs")({
  head: () => ({ meta: [{ title: "Available Jobs — Rider" }] }),
  component: Jobs,
});

const seed = [
  { id: "J-9821", code: "QR-2026-00921", pickup: "Lekki Phase 1", drop: "Ikeja GRA", distance: "21.4 km", eta: "38 min", payout: 4200, type: "Documents", payment: "Prepaid", customer: "Adeola K." },
  { id: "J-9822", code: "QR-2026-00922", pickup: "Victoria Island", drop: "Yaba", distance: "14.1 km", eta: "27 min", payout: 3100, type: "Fragile", payment: "COD", customer: "Chuka E." },
  { id: "J-9823", code: "QR-2026-00923", pickup: "Surulere", drop: "Ajah", distance: "32.8 km", eta: "52 min", payout: 6400, type: "Bulk", payment: "Cash", customer: "Halima O." },
];

function Jobs() {
  const [online, setOnline] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);
  const [items, setItems] = useState(seed);

  const accept = (id: string) => { setItems((x) => x.filter((j) => j.id !== id)); toast.success("Job accepted — proceed to pickup"); };
  const decline = (id: string) => { setItems((x) => x.filter((j) => j.id !== id)); toast("Job declined"); };

  return (
    <div className="space-y-6">
      <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Availability</div>
          <div className="font-display text-xl font-semibold">{online ? "Online — receiving jobs" : "Offline"}</div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm"><Switch checked={online} onCheckedChange={setOnline} /> Online</label>
          <label className="flex items-center gap-2 text-sm"><Switch checked={autoAccept} onCheckedChange={setAutoAccept} /> Auto-accept nearby</label>
        </div>
      </Card>

      <div>
        <h1 className="font-display text-2xl font-semibold">Available delivery requests</h1>
        <p className="text-sm text-muted-foreground">{items.length} nearby jobs · auto-refresh every 30s</p>
      </div>

      <div className="grid gap-4">
        {items.map((j) => (
          <Card key={j.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-primary">{j.code}</span>
                  <Badge variant="secondary" className="rounded-full">{j.type}</Badge>
                  <Badge variant="outline" className="rounded-full">{j.payment}</Badge>
                </div>
                <div className="mt-2 text-sm font-medium">{j.customer}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-semibold text-primary">{NGN(j.payout)}</div>
                <div className="text-xs text-muted-foreground">payout</div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border p-3"><div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> Pickup</div><div className="mt-1 text-sm font-medium">{j.pickup}</div></div>
              <div className="rounded-lg border p-3"><div className="flex items-center gap-2 text-xs text-muted-foreground"><Navigation className="h-3 w-3" /> Drop-off</div><div className="mt-1 text-sm font-medium">{j.drop}</div></div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Package className="h-3 w-3" /> {j.distance}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> ETA {j.eta}</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Call enabled</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => accept(j.id)}>Accept</Button>
              <Button variant="outline" onClick={() => decline(j.id)}>Decline</Button>
              <Button variant="ghost"><Navigation className="mr-1 h-4 w-4" />Navigate</Button>
            </div>
          </Card>
        ))}
        {items.length === 0 && <Card className="p-10 text-center text-sm text-muted-foreground">No nearby jobs — stay online and we'll notify you.</Card>}
      </div>
    </div>
  );
}
