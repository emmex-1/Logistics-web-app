import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/attendant/profile")({
  head: () => ({ meta: [{ title: "My profile — Attendant" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">My profile</h1>
        <p className="text-sm text-muted-foreground">Personal details, branch, and preferences.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="font-display text-sm font-semibold">Personal</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Full name</Label><Input defaultValue="Chioma Adesanya" /></div>
            <div><Label>Email</Label><Input defaultValue="chioma@quickreach.ng" /></div>
            <div><Label>Phone</Label><Input defaultValue="+234 802 000 0001" /></div>
            <div><Label>Branch</Label><Input defaultValue="Lagos HQ" disabled /></div>
          </div>
          <Button>Save changes</Button>
        </Card>
        <Card className="p-6 space-y-4">
          <div className="font-display text-sm font-semibold">Security</div>
          <div className="grid gap-3">
            <div><Label>Current password</Label><Input type="password" /></div>
            <div><Label>New password</Label><Input type="password" /></div>
          </div>
          <Button variant="outline">Update password</Button>
          <Separator />
          <div className="font-display text-sm font-semibold">Preferences</div>
          {[
            ["Desktop notifications", true],
            ["Sound alerts for new shipments", true],
            ["Weekly performance email", false],
          ].map(([l, v]) => (
            <div key={l as string} className="flex items-center justify-between text-sm">
              <span>{l as string}</span>
              <Switch defaultChecked={v as boolean} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
