import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/attendant/notes")({
  head: () => ({ meta: [{ title: "Notes & issues — Attendant" }] }),
  component: Notes,
});

const SEED = [
  { id: 1, text: "Customer requested same-day reroute for SL-2026-10227.", tag: "Reroute", time: "08:22" },
  { id: 2, text: "POS terminal #2 declining cards intermittently — escalated.", tag: "Hardware", time: "Yesterday" },
  { id: 3, text: "Damaged carton received for SL-2026-10210; photos attached.", tag: "Damage", time: "2d ago" },
];

function Notes() {
  const [items, setItems] = useState(SEED);
  const [draft, setDraft] = useState("");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Notes & issues</h1>
        <p className="text-sm text-muted-foreground">Log incidents and shift handover notes.</p>
      </div>
      <Card className="p-4 space-y-3">
        <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Describe the issue or note…" />
        <div className="flex justify-end">
          <Button onClick={() => { if (!draft.trim()) return; setItems([{ id: Date.now(), text: draft, tag: "Note", time: "Now" }, ...items]); setDraft(""); }}>
            <Plus className="h-4 w-4 mr-2" /> Add note
          </Button>
        </div>
      </Card>
      <div className="space-y-3">
        {items.map((n) => (
          <Card key={n.id} className="p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge variant="secondary">{n.tag}</Badge>
              <div className="text-xs text-muted-foreground">{n.time}</div>
            </div>
            <div className="text-sm">{n.text}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
