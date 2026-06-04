import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CheckCircle2, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/attendant/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Attendant" }] }),
  component: Notifications,
});

const ITEMS = [
  { icon: AlertTriangle, tone: "text-orange-500", title: "COD outstanding", body: "SL-2026-10228 has been pending payment for 2 days.", time: "10m" },
  { icon: CheckCircle2, tone: "text-emerald-500", title: "Shipment delivered", body: "SL-2026-10219 marked delivered by rider Emeka.", time: "32m" },
  { icon: MessageSquare, tone: "text-primary", title: "New customer message", body: "Chioma Okafor: 'Has my parcel left the warehouse?'", time: "1h" },
  { icon: Bell, tone: "text-muted-foreground", title: "Shift reminder", body: "Daily handover due at 17:00.", time: "2h" },
];

function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Branch alerts and customer messages.</p>
        </div>
        <Badge variant="secondary">5 unread</Badge>
      </div>
      <div className="space-y-3">
        {ITEMS.map((n, i) => (
          <Card key={i} className="p-4 flex gap-3">
            <n.icon className={`h-5 w-5 mt-0.5 shrink-0 ${n.tone}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium text-sm">{n.title}</div>
                <div className="text-xs text-muted-foreground shrink-0">{n.time}</div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{n.body}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
