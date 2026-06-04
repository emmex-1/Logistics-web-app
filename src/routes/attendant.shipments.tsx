import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

export const Route = createFileRoute("/attendant/shipments")({
  head: () => ({ meta: [{ title: "Shipments — Attendant" }] }),
  component: Shipments,
});

const ROWS = [
  { id: "SL-2026-10231", customer: "Chioma O.", route: "Ikeja → VI", status: "In transit", amount: "₦4,500" },
  { id: "SL-2026-10230", customer: "Tunde B.", route: "Lekki → Yaba", status: "Picked up", amount: "₦3,200" },
  { id: "SL-2026-10229", customer: "Amaka E.", route: "Ajah → Ikoyi", status: "Delivered", amount: "₦5,800" },
  { id: "SL-2026-10228", customer: "Femi A.", route: "Surulere → Apapa", status: "Created", amount: "₦2,900" },
  { id: "SL-2026-10227", customer: "Blessing U.", route: "Ikorodu → Maryland", status: "Warehouse", amount: "₦3,750" },
];
const tone = (s: string) => s === "Delivered" ? "default" : s === "In transit" ? "secondary" : "outline";

function Shipments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Shipments</h1>
        <p className="text-sm text-muted-foreground">All shipments handled by this terminal.</p>
      </div>
      <Card className="p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search tracking ID, customer…" />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </Card>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs text-primary">{r.id}</TableCell>
                <TableCell>{r.customer}</TableCell>
                <TableCell>{r.route}</TableCell>
                <TableCell><Badge variant={tone(r.status) as never}>{r.status}</Badge></TableCell>
                <TableCell className="text-right font-medium">{r.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
