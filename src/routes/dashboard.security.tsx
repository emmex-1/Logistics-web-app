import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/dashboard/security")({
  head: () => ({ meta: [{ title: "Security — Sendaro" }] }),
  component: Security,
});

function Security() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-display text-2xl font-semibold">Security</h1>
      <Card className="space-y-4 p-6">
        <div className="font-display text-lg font-semibold">Change password</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Current</Label><Input type="password" /></div>
          <div className="space-y-1.5"><Label>New</Label><Input type="password" /></div>
        </div>
        <Button className="w-fit">Update password</Button>
      </Card>
      <Card className="flex items-center justify-between p-6">
        <div>
          <div className="font-display text-lg font-semibold">Two-factor authentication</div>
          <div className="text-sm text-muted-foreground">Use an authenticator app for an extra layer of security.</div>
        </div>
        <Switch defaultChecked />
      </Card>
      <Card className="space-y-3 p-6">
        <div className="font-display text-lg font-semibold">Active sessions</div>
        {["MacBook Pro · Lagos · Active now", "iPhone 14 · Lagos · 2 hours ago", "Chrome · Abuja · 3 days ago"].map((s) => (
          <div key={s} className="flex items-center justify-between border-b py-3 text-sm last:border-0">
            <span>{s}</span><Button size="sm" variant="ghost">Sign out</Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
