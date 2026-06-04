import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { NGN } from "@/constants";
import { toast } from "sonner";
import { PackagePlus, Printer } from "lucide-react";

export const Route = createFileRoute("/attendant/create")({
  head: () => ({ meta: [{ title: "Create shipment — Attendant" }] }),
  component: CreateShipment,
});

function CreateShipment() {
  const [weight, setWeight] = useState(1);
  const [category, setCategory] = useState("documents");
  const [speed, setSpeed] = useState("standard");
  const trackingId = useMemo(
    () => `SL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`,
    [],
  );
  const base = category === "electronics" ? 3500 : category === "fragile" ? 4000 : 1500;
  const speedAdd = speed === "sameday" ? 4000 : speed === "express" ? 2000 : 0;
  const total = base + weight * 600 + speedAdd;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Create shipment</h1>
          <p className="text-sm text-muted-foreground">Issue a new waybill and print receipt.</p>
        </div>
        <Badge variant="secondary" className="font-mono">{trackingId}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 space-y-6">
          <div>
            <div className="font-display text-sm font-semibold mb-3">Sender</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Full name</Label><Input placeholder="Chioma Okafor" /></div>
              <div><Label>Phone</Label><Input placeholder="+234 802 000 0000" /></div>
              <div className="sm:col-span-2"><Label>Pickup address</Label><Input placeholder="12 Allen Ave, Ikeja" /></div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="font-display text-sm font-semibold mb-3">Recipient</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Full name</Label><Input placeholder="Tunde Bello" /></div>
              <div><Label>Phone</Label><Input placeholder="+234 802 000 0000" /></div>
              <div className="sm:col-span-2"><Label>Delivery address</Label><Input placeholder="5 Adeola Odeku, VI" /></div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="font-display text-sm font-semibold mb-3">Parcel</div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fragile">Fragile</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Weight (kg)</Label>
                <Input type="number" min={0.1} step={0.1} value={weight} onChange={(e) => setWeight(Number(e.target.value) || 0)} />
              </div>
              <div>
                <Label>Speed</Label>
                <Select value={speed} onValueChange={setSpeed}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="sameday">Same day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-3"><Label>Description</Label><Textarea placeholder="Carton with sealed documents" /></div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4 h-fit">
          <div className="font-display text-lg font-semibold">Summary</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Base</span><span>{NGN(base)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Weight × {weight}kg</span><span>{NGN(weight * 600)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Speed</span><span>{NGN(speedAdd)}</span></div>
            <Separator />
            <div className="flex justify-between font-display text-lg font-semibold"><span>Total</span><span>{NGN(total)}</span></div>
          </div>
          <Button className="w-full" onClick={() => toast.success(`Shipment ${trackingId} created`)}>
            <PackagePlus className="h-4 w-4 mr-2" /> Create shipment
          </Button>
          <Button variant="outline" className="w-full"><Printer className="h-4 w-4 mr-2" /> Print receipt</Button>
        </Card>
      </div>
    </div>
  );
}
