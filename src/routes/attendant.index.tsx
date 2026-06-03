import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  PackagePlus, Camera, ScanLine, UserPlus, Warehouse, Send,
  Printer, AlertTriangle, Upload, RefreshCw, Image as ImageIcon,
  CheckCircle2, Clock, AlertCircle, Wifi, Bell, MessageSquare,
  Plus, ArrowUpRight, X, Receipt, Phone, Search,
} from "lucide-react";
import { NGN } from "@/constants";
import { toast } from "sonner";

export const Route = createFileRoute("/attendant/")({
  head: () => ({ meta: [{ title: "Attendant Overview — Quick Reach Logistics" }] }),
  component: AttendantOverview,
});

const STATS = [
  { label: "Created today", value: "18", delta: "↑ 4 this hour", tone: "good" as const },
  { label: "Pending", value: "7", delta: "↑ 2 overdue", tone: "warn" as const },
  { label: "Revenue collected", value: "₦84k", delta: "3 POS · 5 transfer", tone: "good" as const },
  { label: "Pending payments", value: "₦12k", delta: "4 COD outstanding", tone: "warn" as const },
];

const QUICK = [
  { label: "New waybill", icon: PackagePlus },
  { label: "Snap parcel", icon: Camera },
  { label: "Scan parcel", icon: ScanLine },
  { label: "New customer", icon: UserPlus },
  { label: "Check in parcel", icon: Warehouse },
  { label: "Assign dispatch", icon: Send },
  { label: "Print receipt", icon: Printer },
  { label: "Report issue", icon: AlertTriangle },
];

const RECENT = [
  { id: "SL-88231", who: "Emeka, Abuja",    status: "Created",   tone: "info",   pay: "Paid",     payTone: "good" },
  { id: "SL-88119", who: "Fatima, PH",      status: "Warehouse", tone: "warn",   pay: "Transfer", payTone: "info" },
  { id: "SL-88114", who: "Tunde, Kano",     status: "Delayed",   tone: "danger", pay: "COD",      payTone: "warn" },
  { id: "SL-88099", who: "Ngozi, Ibadan",   status: "Delivered", tone: "good",   pay: "POS",      payTone: "good" },
] as const;

const PAYMENTS = [
  { id: "SL-88231", amt: 3500, method: "Transfer", status: "Paid",    tone: "good" },
  { id: "SL-88114", amt: 7200, method: "COD",      status: "Pending", tone: "warn" },
  { id: "SL-88099", amt: 2800, method: "POS",      status: "Paid",    tone: "good" },
  { id: "SL-88088", amt: 5000, method: "Cash",     status: "Pending", tone: "warn" },
] as const;

const TASKS = [
  { label: "Confirm morning deliveries", state: "Done",    tone: "good" },
  { label: "Sort inbound — zone A",      state: "Done",    tone: "good" },
  { label: "Verify driver IDs",          state: "Pending", tone: "warn" },
  { label: "Escalate SL-88114",          state: "Urgent",  tone: "danger" },
  { label: "Snap intake photos × 3",     state: "Pending", tone: "warn" },
] as const;

const NOTES = [
  { id: "SL-88114", time: "8:42am", title: "Kano shipment — 6h overdue",    tone: "danger" },
  { id: "SL-88099", time: "8:10am", title: "Ibadan — confirmed delivered",  tone: "good" },
  { id: "3 parcels", time: "7:55am", title: "Awaiting intake, Zone B — not checked in", tone: "warn" },
] as const;

const PIPELINE = ["Created", "Picked up", "Warehouse", "In transit", "Delivered"] as const;

function tonePill(t: string) {
  switch (t) {
    case "good":   return "bg-emerald-500/15 text-emerald-600 border-emerald-500/20";
    case "warn":   return "bg-amber-500/15 text-amber-600 border-amber-500/20";
    case "danger": return "bg-rose-500/15 text-rose-600 border-rose-500/20";
    case "info":   return "bg-sky-500/15 text-sky-600 border-sky-500/20";
    default:       return "bg-secondary text-foreground border-border";
  }
}

function AttendantOverview() {
  const [weight, setWeight] = useState(0.5);
  const [pkg, setPkg] = useState("documents");
  const [delivery, setDelivery] = useState("standard");
  const trackingId = useMemo(
    () => `SL-${new Date().getFullYear()}-${String(Math.floor(10000 + Math.random() * 89999)).slice(0, 5)}`,
    [],
  );
  const cost = useMemo(() => {
    const base = pkg === "documents" ? 1500 : pkg === "electronics" ? 3500 : 2500;
    const w = Math.max(0, weight) * 600;
    const d = delivery === "express" ? 2500 : delivery === "same_day" ? 4200 : 0;
    return Math.round(base + w + d);
  }, [pkg, weight, delivery]);

  const [photos, setPhotos] = useState<{ id: string; url: string; label: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const onFiles = (files: FileList | null, label = "Photo") => {
    if (!files) return;
    const list = Array.from(files).slice(0, 6).map((f) => ({
      id: crypto.randomUUID(), url: URL.createObjectURL(f), label,
    }));
    setPhotos((p) => [...list, ...p].slice(0, 6));
  };

  const [stage, setStage] = useState(2);
  const [condition, setCondition] = useState("good");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-display text-2xl font-semibold">Good morning, Chioma</div>
          <div className="text-sm text-muted-foreground">Wed Jun 3 · 09:14 AM · Lagos HQ</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <Wifi className="h-3.5 w-3.5" /> Online
          </div>
          <Switch defaultChecked />
          <Button size="icon" variant="outline" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">5</span>
          </Button>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">CA</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className="mt-2 font-display text-3xl font-semibold">{s.value}</div>
            <div className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${tonePill(s.tone)}`}>
              {s.tone === "good" ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />} {s.delta}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-display text-base font-semibold">Quick actions</div>
          <Badge variant="secondary" className="rounded-full">Fast lane</Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK.map((q) => (
            <button
              key={q.label}
              onClick={() => toast.success(`${q.label} — opened`)}
              className="group flex flex-col items-start gap-3 rounded-xl border bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-glow"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <q.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{q.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-display text-lg font-semibold">Create shipment / waybill</div>
            <div className="text-xs text-muted-foreground">Capture sender, receiver, and parcel details. Tracking ID is generated automatically.</div>
          </div>
          <Badge variant="secondary" className="rounded-full font-mono">{trackingId}</Badge>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Field label="Sender name"><Input placeholder="e.g. Emeka Okafor" /></Field>
            <Field label="Sender phone"><Input placeholder="+234 801 000 0000" /></Field>
            <Field label="Sender address"><Input placeholder="Lagos Island, Lagos" /></Field>
          </div>
          <div className="space-y-4">
            <Field label="Receiver name"><Input placeholder="e.g. Fatima Yusuf" /></Field>
            <Field label="Receiver phone"><Input placeholder="+234 802 000 0000" /></Field>
            <Field label="Delivery address"><Input placeholder="Abuja, FCT" /></Field>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Package type">
            <Select value={pkg} onValueChange={setPkg}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="parcel">Parcel</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fragile">Fragile</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Weight (kg)">
            <Input type="number" min={0} step={0.1} value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} />
          </Field>
          <Field label="Delivery type">
            <Select value={delivery} onValueChange={setDelivery}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="same_day">Same day</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Description"><Textarea rows={3} placeholder="Brief description of contents…" /></Field>
          <div className="space-y-4">
            <Field label="Auto tracking ID">
              <div className="flex gap-2">
                <Input value={trackingId} readOnly className="font-mono" />
                <Button variant="outline" size="icon" onClick={() => toast("Regenerated")}><RefreshCw className="h-4 w-4" /></Button>
              </div>
            </Field>
            <Field label="Delivery cost">
              <Input value={`${NGN(cost)} (auto-calculated)`} readOnly className="font-semibold text-primary" />
            </Field>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed bg-surface p-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><Camera className="h-6 w-6" /></span>
            <div className="text-sm">
              <div className="font-medium">Snap photos of this parcel before sealing</div>
              <div className="text-xs text-muted-foreground">Required for intake proof. Front, side, and label recommended.</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <input ref={fileRef} type="file" accept="image/*" capture="environment" multiple hidden onChange={(e) => onFiles(e.target.files)} />
              <Button onClick={() => fileRef.current?.click()}><Camera className="h-4 w-4" /> Take photo</Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" /> Upload images</Button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Front", "Side", "Label", "Extra"].map((lbl, i) => {
              const p = photos[i];
              return (
                <div key={lbl} className="group relative aspect-square overflow-hidden rounded-lg border bg-background">
                  {p ? (
                    <>
                      <img src={p.url} alt={lbl} className="h-full w-full object-cover" />
                      <button onClick={() => setPhotos((ps) => ps.filter((x) => x.id !== p.id))} className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/90 opacity-0 transition-opacity group-hover:opacity-100">
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1 text-[11px] font-medium text-white">{lbl}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={() => toast.success("Waybill saved · receipt printed")}>
            <Receipt className="h-4 w-4" /> Save & generate waybill
          </Button>
          <Button variant="outline"><Printer className="h-4 w-4" /> Print label</Button>
          <Button variant="outline"><MessageSquare className="h-4 w-4" /> WhatsApp receipt</Button>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="font-display text-base font-semibold">Parcel intake / warehouse check-in</div>
          <div className="mt-1 text-xs text-muted-foreground">Confirm parcel arrival, verify condition, attach intake photo.</div>

          <div className="mt-4 flex gap-2">
            <Input placeholder="Scan or enter parcel ID…" />
            <Button><ScanLine className="h-4 w-4" /> Check in</Button>
          </div>

          <div className="mt-4">
            <Label className="text-xs">Package condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="good">Good condition</SelectItem>
                <SelectItem value="ok">Minor wear</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 rounded-xl border border-dashed bg-surface p-5 text-center">
            <div className="text-xs text-muted-foreground">Take intake photo to confirm condition</div>
            <Button variant="outline" className="mt-3" onClick={() => fileRef.current?.click()}>
              <Camera className="h-4 w-4" /> Snap condition photo
            </Button>
            <div className="mt-4 flex justify-center gap-2">
              <div className="grid h-14 w-14 place-items-center rounded-md border bg-background text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-md border bg-background text-muted-foreground">
                <Plus className="h-4 w-4" />
              </div>
            </div>
            <Badge variant="secondary" className="mt-3 rounded-full text-[11px]">Intake</Badge>
          </div>
        </Card>

        <Card className="p-6">
          <div className="font-display text-base font-semibold">Search & tracking panel</div>
          <div className="mt-1 text-xs text-muted-foreground">Find shipments by ID, phone or customer name.</div>

          <div className="mt-4 flex gap-2">
            <Input placeholder="Tracking ID, phone…" />
            <Button variant="outline"><Search className="h-4 w-4" /></Button>
          </div>

          <div className="mt-5 rounded-xl border bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-sm text-primary">SL-2026-88119</div>
                <div className="text-sm font-medium">Fatima Yusuf</div>
                <div className="text-xs text-muted-foreground">Port Harcourt · Express</div>
              </div>
              <Badge className="rounded-full">Active</Badge>
            </div>

            <div className="mt-5">
              <div className="flex items-center">
                {PIPELINE.map((p, i) => {
                  const reached = i <= stage;
                  return (
                    <div key={p} className="flex flex-1 items-center">
                      <button
                        onClick={() => setStage(i)}
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] font-bold transition-colors ${reached ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}
                      >
                        {i + 1}
                      </button>
                      {i < PIPELINE.length - 1 && (
                        <div className={`mx-1 h-0.5 flex-1 ${i < stage ? "bg-primary" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                {PIPELINE.map((p) => <span key={p} className="flex-1 text-center">{p}</span>)}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Select defaultValue="warehouse">
                <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="picked">Picked up</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="transit">In transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => toast.success("Status updated")}>Update</Button>
            </div>

            <div className="mt-4">
              <Label className="text-xs">Internal note</Label>
              <Textarea rows={3} placeholder="e.g. Customer not reachable, held at branch…" className="mt-1" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div className="font-display text-base font-semibold">Recent shipments</div>
            <Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3.5 w-3.5" /></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                <tr><Th>Tracking ID</Th><Th>Receiver</Th><Th>Status</Th><Th>Payment</Th></tr>
              </thead>
              <tbody>
                {RECENT.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-surface">
                    <Td className="font-mono text-primary">{r.id}</Td>
                    <Td>{r.who}</Td>
                    <Td><span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${tonePill(r.tone)}`}>{r.status}</span></Td>
                    <Td><span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${tonePill(r.payTone)}`}>{r.pay}</span></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-5 font-display text-base font-semibold">Payment handling</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                <tr><Th>Tracking ID</Th><Th>Amount</Th><Th>Method</Th><Th>Status</Th></tr>
              </thead>
              <tbody>
                {PAYMENTS.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-surface">
                    <Td className="font-mono text-primary">{p.id}</Td>
                    <Td className="font-medium">{NGN(p.amt)}</Td>
                    <Td>{p.method}</Td>
                    <Td><span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${tonePill(p.tone)}`}>{p.status}</span></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-2 border-t p-4">
            <Button size="sm" onClick={() => toast.success("Marked as paid")}>Mark as paid</Button>
            <Button size="sm" variant="outline">Daily cash summary</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="font-display text-base font-semibold">Today’s tasks</div>
            <Badge variant="secondary" className="rounded-full">2 / 5</Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {TASKS.map((t) => (
              <li key={t.label} className="flex items-start justify-between gap-3 rounded-lg border p-3">
                <div className="flex items-start gap-2">
                  <span className={`mt-1 h-2 w-2 rounded-full ${t.tone === "good" ? "bg-emerald-500" : t.tone === "danger" ? "bg-rose-500" : "bg-amber-500"}`} />
                  <span className="text-sm">{t.label}</span>
                </div>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${tonePill(t.tone)}`}>{t.state}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="font-display text-base font-semibold">Notifications</div>
          <ul className="mt-4 space-y-3">
            {NOTES.map((n, i) => (
              <li key={i} className="flex gap-3 rounded-lg border p-3">
                <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${tonePill(n.tone)} border`}>
                  {n.tone === "good" ? <CheckCircle2 className="h-4 w-4" /> : n.tone === "danger" ? <AlertCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-primary">{n.id}</span>
                    <span className="text-[11px] text-muted-foreground">{n.time}</span>
                  </div>
                  <div className="text-sm">{n.title}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="font-display text-base font-semibold">Shift & profile</div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-surface p-3">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Shift started</div>
              <div className="mt-1 font-display text-lg font-semibold">07:59 AM</div>
            </div>
            <div className="rounded-lg border bg-surface p-3">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Duration</div>
              <div className="mt-1 font-display text-lg font-semibold">1h 15m</div>
            </div>
            <div className="rounded-lg border bg-surface p-3">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Branch</div>
              <div className="mt-1 text-sm font-medium">Lagos HQ</div>
            </div>
            <div className="rounded-lg border bg-surface p-3">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Role</div>
              <div className="mt-1 text-sm font-medium">Attendant</div>
            </div>
          </div>
          <div className="mt-4">
            <Label className="text-xs">Notes / issue report</Label>
            <Textarea rows={3} className="mt-1" placeholder="Report damaged goods, flag suspicious…" />
            <div className="mt-3 flex gap-2">
              <Button size="sm" className="flex-1" onClick={() => toast.success("Submitted to admin")}>Submit to admin</Button>
              <Button size="sm" variant="outline"><Phone className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
function Th({ children }: any) { return <th className="px-5 py-3 text-left font-medium">{children}</th>; }
function Td({ children, className = "" }: any) { return <td className={"px-5 py-3 " + className}>{children}</td>; }
