import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";

export const Route = createFileRoute("/attendant/dispatch")({
  head: () => ({ meta: [{ title: "Dispatch — Attendant" }] }),
  component: Dispatch,
});

const READY = [
  { id: "SL-2026-10231", dest: "Victoria Island", bin: "A-12", weight: "2.4kg" },
  { id: "SL-2026-10230", dest: "Yaba", bin: "B-04", weight: "1.1kg" },
  { id: "SL-2026-10227", dest: "Maryland", bin: "C-09", weight: "3.0kg" },
];
const RIDERS = ["Emeka R. (Lekki)", "Bola O. (Ikeja)", "Sade A. (Mainland)"];

function Dispatch() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Dispatch</h1>
        <p className="text-sm text-muted-foreground">Assign ready parcels to available riders.</p>
      </div>
      <div className="grid gap-4">
        {READY.map((p) => (
          <Card key={p.id} className="p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="font-mono">{p.id}</Badge>
              <div>
                <div className="font-medium text-sm">{p.dest}</div>
                <div className="text-xs text-muted-foreground">Bin {p.bin} · {p.weight}</div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select>
                <SelectTrigger className="w-full sm:w-56"><SelectValue placeholder="Assign rider" /></SelectTrigger>
                <SelectContent>
                  {RIDERS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button><Send className="h-4 w-4 mr-2" /> Dispatch</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
