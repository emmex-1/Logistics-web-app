import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FileCheck2, Upload } from "lucide-react";

export const Route = createFileRoute("/rider/settings")({
  head: () => ({ meta: [{ title: "Rider Settings — Quick Reach Logistics" }] }),
  component: RiderSettings,
});

function RiderSettings() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-display text-2xl font-semibold">Rider settings</h1>

      <Card className="space-y-4 p-6">
        <div className="font-display text-lg font-semibold">Profile</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue="Emeka Okafor" /></div>
          <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+2348109876543" /></div>
          <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="emeka@quickreachlogistics.ng" /></div>
          <div className="space-y-1.5"><Label>Operating zone</Label><Input defaultValue="Lekki / VI / Ikoyi" /></div>
        </div>
        <Button className="w-fit">Save profile</Button>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="font-display text-lg font-semibold">Vehicle</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Type</Label><Input defaultValue="Motorcycle" /></div>
          <div className="space-y-1.5"><Label>Make & model</Label><Input defaultValue="Bajaj Boxer 150" /></div>
          <div className="space-y-1.5"><Label>Plate number</Label><Input defaultValue="LSR-482-KJA" /></div>
          <div className="space-y-1.5"><Label>Color</Label><Input defaultValue="Orange / Black" /></div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="font-display text-lg font-semibold">Bank payout</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Bank</Label><Input defaultValue="Guaranty Trust Bank" /></div>
          <div className="space-y-1.5"><Label>Account number</Label><Input defaultValue="0123456789" /></div>
          <div className="space-y-1.5"><Label>Account name</Label><Input defaultValue="Emeka Okafor" /></div>
          <div className="space-y-1.5"><Label>Payout schedule</Label><Input defaultValue="Weekly (Friday)" /></div>
        </div>
      </Card>

      <Card className="space-y-3 p-6">
        <div className="font-display text-lg font-semibold">Documents</div>
        {[
          { name: "Driver's license", verified: true },
          { name: "Vehicle registration", verified: true },
          { name: "Insurance certificate", verified: true },
          { name: "Guarantor form", verified: false },
        ].map((d) => (
          <div key={d.name} className="flex items-center justify-between border-b py-3 text-sm last:border-0">
            <span className="flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-primary" />{d.name}</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={`rounded-full ${d.verified ? "bg-success/15 text-success" : "bg-warning/15"}`}>{d.verified ? "Verified" : "Pending"}</Badge>
              <Button size="sm" variant="ghost"><Upload className="mr-1 h-3.5 w-3.5" />Replace</Button>
            </div>
          </div>
        ))}
      </Card>

      <Card className="flex items-center justify-between p-6">
        <div>
          <div className="font-display text-lg font-semibold">Auto-accept nearby orders</div>
          <div className="text-sm text-muted-foreground">Automatically accept dispatches within 1km of your location.</div>
        </div>
        <Switch />
      </Card>
    </div>
  );
}
