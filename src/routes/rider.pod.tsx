import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, CheckCircle2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/rider/pod")({
  head: () => ({ meta: [{ title: "Proof of Delivery — Rider" }] }),
  component: POD,
});

function POD() {
  const [pickupPhoto, setPickupPhoto] = useState<string | null>(null);
  const [deliveryPhoto, setDeliveryPhoto] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [signed, setSigned] = useState(false);

  const onFile = (cb: (s: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => cb(r.result as string); r.readAsDataURL(f);
  };

  const submit = () => {
    if (!pickupPhoto || !deliveryPhoto) return toast.error("Capture both pickup and delivery photos");
    if (otp.length !== 4) return toast.error("Enter the 4-digit OTP from customer");
    toast.success("Delivery confirmed with timestamped POD");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Proof of Delivery</h1>
        <p className="text-sm text-muted-foreground">Capture parcel evidence and verify OTP before marking delivered.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Pickup photo", value: pickupPhoto, set: setPickupPhoto, id: "pp" },
          { label: "Delivery photo", value: deliveryPhoto, set: setDeliveryPhoto, id: "dp" },
        ].map((p) => (
          <Card key={p.id} className="p-5">
            <Label className="text-sm font-semibold">{p.label}</Label>
            <div className="mt-3 aspect-video overflow-hidden rounded-lg border bg-muted">
              {p.value ? <img src={p.value} alt={p.label} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-xs text-muted-foreground"><Camera className="mb-1 h-6 w-6" />No image</div>}
            </div>
            <div className="mt-3 flex gap-2">
              <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-surface">
                <Camera className="h-4 w-4" />Capture
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile(p.set)} />
              </label>
              <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-surface">
                <Upload className="h-4 w-4" />Upload
                <input type="file" accept="image/*" className="hidden" onChange={onFile(p.set)} />
              </label>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <Label htmlFor="otp" className="text-sm font-semibold">Customer OTP verification</Label>
        <Input id="otp" maxLength={4} inputMode="numeric" placeholder="4-digit code" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="mt-2 max-w-[160px] text-center font-mono text-lg tracking-widest" />
        <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={signed} onChange={(e) => setSigned(e.target.checked)} /> Customer signed on screen</label>
      </Card>

      <Button size="lg" onClick={submit} className="w-full sm:w-auto"><CheckCircle2 className="mr-2 h-4 w-4" />Confirm delivery</Button>
    </div>
  );
}
