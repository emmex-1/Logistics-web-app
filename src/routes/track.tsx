import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { trackingService } from "@/services/shipment.service";
import { mockShipments } from "@/mock/data";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track package — Quick Reach Logistics" }, { name: "description", content: "Track a Quick Reach Logistics shipment in real time." }] }),
  component: TrackPage,
});

function TrackPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const m = useMutation({
    mutationFn: trackingService.byCode,
    onSuccess: (s) => navigate({ to: "/track/$id", params: { id: s.id } }),
    onError: () => toast.error("Tracking code not found. Try one of the examples."),
  });
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <Badge variant="secondary" className="rounded-full">Live tracking</Badge>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Where's my package?</h1>
        <p className="mt-3 text-muted-foreground">Enter your tracking code to see live status, driver, and ETA.</p>
        <Card className="mt-8 p-2 shadow-elevated">
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (code) m.mutate(code); }}>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. SDR9000235" className="h-12 pl-10" />
            </div>
            <Button size="lg" type="submit" disabled={m.isPending}>{m.isPending ? "Looking…" : "Track"}</Button>
          </form>
        </Card>
        <div className="mt-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Try one of these</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {mockShipments.slice(0, 6).map((s) => (
              <Link key={s.id} to="/track/$id" params={{ id: s.id }} className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary">
                {s.trackingCode}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
