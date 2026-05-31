import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — Sendaro" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-display text-2xl font-semibold">Settings</h1>
      <Card className="space-y-4 p-6">
        <div className="font-display text-lg font-semibold">Profile</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue="Tunde Adebayo" /></div>
          <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="tunde@sendaro.ng" /></div>
          <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+2348101234567" /></div>
          <div className="space-y-1.5"><Label>Default pickup area</Label><Input defaultValue="Lekki Phase 1" /></div>
        </div>
        <Button className="w-fit">Save changes</Button>
      </Card>
      <Card className="space-y-4 p-6">
        <div className="font-display text-lg font-semibold">Notifications</div>
        {["Shipment updates", "Promotions", "Weekly summary", "Invoice reminders"].map((l) => (
          <div key={l} className="flex items-center justify-between border-b py-2 last:border-0">
            <span className="text-sm">{l}</span><Switch defaultChecked />
          </div>
        ))}
      </Card>
    </div>
  );
}
