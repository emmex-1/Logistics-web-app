import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, PackageX, MapPinOff, UserX, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/rider/issues")({
  head: () => ({ meta: [{ title: "Delivery Issues — Rider" }] }),
  component: Issues,
});

const reasons = [
  { id: "unavailable", label: "Customer unavailable", icon: UserX },
  { id: "damage", label: "Parcel damaged", icon: PackageX },
  { id: "mismatch", label: "Location mismatch", icon: MapPinOff },
  { id: "failed", label: "Failed delivery", icon: AlertTriangle },
  { id: "other", label: "Other / escalate", icon: ShieldAlert },
];

function Issues() {
  const [reason, setReason] = useState<string>("unavailable");
  const [note, setNote] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Report a delivery issue</h1>
        <p className="text-sm text-muted-foreground">Flag issues so support and the customer are notified instantly.</p>
      </div>

      <Card className="p-5">
        <Label className="text-sm font-semibold">Reason</Label>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <button key={r.id} type="button" onClick={() => setReason(r.id)}
              className={"flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition " + (reason === r.id ? "border-primary bg-primary-soft" : "hover:bg-surface")}>
              <r.icon className="h-4 w-4 text-primary" />{r.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <Label htmlFor="note" className="text-sm font-semibold">Add details</Label>
        <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What happened?" className="mt-2" rows={5} />
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Issue submitted to support")}>Submit report</Button>
        <Button variant="outline" onClick={() => toast("Escalated to admin")}>Escalate to admin</Button>
      </div>
    </div>
  );
}
