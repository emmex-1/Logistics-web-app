import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Copy, KeyRound, Webhook } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Admin Settings — Quick Reach Logistics" }] }),
  component: AdminSettings,
});

const apiKeys = [
  { label: "Production", token: "qr_live_8f4a••••••••••a02b", created: "Mar 14, 2025" },
  { label: "Sandbox", token: "qr_test_22c1••••••••••f88e", created: "Jan 02, 2025" },
];

const webhooks = [
  { url: "https://acme.com/hooks/quickreach", events: "shipment.*", status: "Active" },
  { url: "https://ops.partner.io/qr", events: "payment.succeeded", status: "Active" },
];

function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="font-display text-2xl font-semibold">Workspace settings</h1>

      <Card className="space-y-4 p-6">
        <div className="font-display text-lg font-semibold">Organisation</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Legal name</Label><Input defaultValue="Quick Reach Logistics Ltd" /></div>
          <div className="space-y-1.5"><Label>Support email</Label><Input defaultValue="ops@quickreachlogistics.ng" /></div>
          <div className="space-y-1.5"><Label>Operating hours</Label><Input defaultValue="24 / 7" /></div>
          <div className="space-y-1.5"><Label>Base currency</Label><Input defaultValue="NGN (Nigerian Naira)" /></div>
        </div>
        <Button className="w-fit">Save</Button>
      </Card>

      <Card className="space-y-3 p-6">
        <div className="flex items-center justify-between">
          <div className="font-display text-lg font-semibold flex items-center gap-2"><KeyRound className="h-4 w-4" /> API keys</div>
          <Button size="sm" variant="outline">Generate key</Button>
        </div>
        {apiKeys.map((k) => (
          <div key={k.label} className="flex items-center justify-between border-b py-3 text-sm last:border-0">
            <div>
              <div className="font-medium">{k.label}</div>
              <div className="font-mono text-xs text-muted-foreground">{k.token}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Created {k.created}</span>
              <Button size="sm" variant="ghost" onClick={() => { void navigator.clipboard.writeText(k.token); toast.success("Copied"); }}><Copy className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </Card>

      <Card className="space-y-3 p-6">
        <div className="flex items-center justify-between">
          <div className="font-display text-lg font-semibold flex items-center gap-2"><Webhook className="h-4 w-4" /> Webhooks</div>
          <Button size="sm" variant="outline">Add endpoint</Button>
        </div>
        {webhooks.map((w) => (
          <div key={w.url} className="flex items-center justify-between border-b py-3 text-sm last:border-0">
            <div>
              <div className="font-mono text-xs">{w.url}</div>
              <div className="text-xs text-muted-foreground">{w.events}</div>
            </div>
            <Badge variant="secondary" className="rounded-full bg-success/15 text-success">{w.status}</Badge>
          </div>
        ))}
      </Card>

      <Card className="space-y-4 p-6">
        <div className="font-display text-lg font-semibold">Operational toggles</div>
        {[
          { label: "Auto-dispatch new orders", desc: "Push new orders to the nearest available rider automatically." },
          { label: "Surge pricing", desc: "Enable dynamic pricing during high-demand windows." },
          { label: "SMS notifications", desc: "Send pickup and delivery SMS updates to customers." },
        ].map((t, i) => (
          <div key={t.label} className="flex items-center justify-between border-b py-3 last:border-0">
            <div>
              <div className="text-sm font-medium">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.desc}</div>
            </div>
            <Switch defaultChecked={i !== 1} />
          </div>
        ))}
      </Card>
    </div>
  );
}
