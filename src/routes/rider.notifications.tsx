import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Package, Wallet, MessageSquare, Megaphone } from "lucide-react";

export const Route = createFileRoute("/rider/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Rider" }] }),
  component: Notifs,
});

const items = [
  { icon: Package, title: "New job nearby", body: "Lekki → Ikeja · ₦4,200", time: "2m", tone: "default" },
  { icon: Wallet, title: "Payout received", body: "₦18,400 sent to GTB ****1023", time: "1h", tone: "success" },
  { icon: MessageSquare, title: "Customer message", body: "Adeola: Please call when you arrive.", time: "3h", tone: "default" },
  { icon: Megaphone, title: "System announcement", body: "Surge active in VI — 1.4x payouts.", time: "5h", tone: "warning" },
  { icon: Bell, title: "Assigned delivery", body: "QR-2026-00921 marked en route", time: "1d", tone: "default" },
];

function Notifs() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Notifications</h1>
      <div className="grid gap-3">
        {items.map((n, i) => (
          <Card key={i} className="flex items-start gap-3 p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><n.icon className="h-4 w-4" /></div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2"><div className="text-sm font-medium">{n.title}</div><Badge variant="secondary" className="rounded-full">{n.time}</Badge></div>
              <div className="text-xs text-muted-foreground">{n.body}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
