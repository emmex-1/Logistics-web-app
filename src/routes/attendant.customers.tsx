import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Phone } from "lucide-react";

export const Route = createFileRoute("/attendant/customers")({
  head: () => ({ meta: [{ title: "Customers — Attendant" }] }),
  component: Customers,
});

const ROWS = [
  { name: "Chioma Okafor", phone: "+234 802 111 0001", shipments: 12, last: "Today", tag: "VIP" },
  { name: "Tunde Bello", phone: "+234 803 222 0002", shipments: 4, last: "Yesterday", tag: "Regular" },
  { name: "Amaka Eze", phone: "+234 805 333 0003", shipments: 27, last: "2d ago", tag: "VIP" },
  { name: "Femi Adeyemi", phone: "+234 807 444 0004", shipments: 1, last: "Today", tag: "New" },
  { name: "Blessing Udo", phone: "+234 809 555 0005", shipments: 9, last: "3d ago", tag: "Regular" },
];

function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-muted-foreground">Look up profiles, shipment history, and contact details.</p>
        </div>
        <Button><UserPlus className="h-4 w-4 mr-2" /> Add customer</Button>
      </div>
      <Card className="p-4">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by name or phone…" />
        </div>
      </Card>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Shipments</TableHead>
              <TableHead>Last activity</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow key={r.phone}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell className="font-mono text-xs">{r.phone}</TableCell>
                <TableCell className="text-right">{r.shipments}</TableCell>
                <TableCell className="text-muted-foreground">{r.last}</TableCell>
                <TableCell><Badge variant="secondary">{r.tag}</Badge></TableCell>
                <TableCell><Button size="icon" variant="ghost"><Phone className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
