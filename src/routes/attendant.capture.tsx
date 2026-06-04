import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/attendant/capture")({
  head: () => ({ meta: [{ title: "Parcel capture — Attendant" }] }),
  component: Capture,
});

function Slot({ label }: { label: string }) {
  const [img, setImg] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-display text-sm font-semibold">{label}</div>
        {img && <Button size="icon" variant="ghost" onClick={() => setImg(null)}><X className="h-4 w-4" /></Button>}
      </div>
      <div className="aspect-[4/3] rounded-lg border-2 border-dashed bg-muted/40 grid place-items-center overflow-hidden">
        {img ? <img src={img} alt={label} className="h-full w-full object-cover" /> : <Camera className="h-8 w-8 text-muted-foreground" />}
      </div>
      <input ref={ref} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) setImg(URL.createObjectURL(f)); }} />
      <Button variant="outline" className="w-full" onClick={() => ref.current?.click()}>
        <Upload className="h-4 w-4 mr-2" /> Capture / upload
      </Button>
    </Card>
  );
}

function Capture() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Parcel capture</h1>
        <p className="text-sm text-muted-foreground">Photo evidence attached to each shipment for proof and dispute resolution.</p>
      </div>
      <Card className="p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 max-w-md">
          <div><Label>Tracking ID</Label><Input placeholder="SL-2026-12345" /></div>
          <div><Label>Customer</Label><Input placeholder="Chioma Okafor" /></div>
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Slot label="Front view" />
        <Slot label="Side view" />
        <Slot label="Label / barcode" />
      </div>
    </div>
  );
}
