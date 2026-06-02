import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LAGOS_LGAS } from "@/constants";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/zones")({
  head: () => ({ meta: [{ title: "Zones & Pricing — Quick Reach Logistics Admin" }] }),
  component: Zones,
});

function Zones() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Zones & pricing</h1>
      <Card className="p-6">
        <div className="font-display text-lg font-semibold">Base pricing rules</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5"><Label>Base fare (₦)</Label><Input defaultValue={1500} /></div>
          <div className="space-y-1.5"><Label>Per km (₦)</Label><Input defaultValue={240} /></div>
          <div className="space-y-1.5"><Label>Per kg (₦)</Label><Input defaultValue={55} /></div>
        </div>
        <Button className="mt-4 w-fit">Save rules</Button>
      </Card>
      <Card className="p-6">
        <div className="font-display text-lg font-semibold">Active zones</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {LAGOS_LGAS.map((l) => <Badge key={l} variant="secondary" className="rounded-full">{l}</Badge>)}
        </div>
      </Card>
    </div>
  );
}
