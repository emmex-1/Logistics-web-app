import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, Download } from "lucide-react";

export const Route = createFileRoute("/attendant/receipts")({
  head: () => ({ meta: [{ title: "Receipts — Attendant" }] }),
  component: Receipts,
});

const ROWS = [
  { id: "RC-001823", track: "SL-2026-10231", amount: "₦4,500", method: "POS", time: "09:14" },
  { id: "RC-001822", track: "SL-2026-10230", amount: "₦3,200", method: "Transfer", time: "08:58" },
  { id: "RC-001821", track: "SL-2026-10229", amount: "₦5,800", method: "Cash", time: "08:41" },
];

function Receipts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Receipts</h1>
        <p className="text-sm text-muted-foreground">Reprint or export receipts issued today.</p>
      </div>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Receipt</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Time</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.id}</TableCell>
                <TableCell className="font-mono text-xs text-primary">{r.track}</TableCell>
                <TableCell>{r.method}</TableCell>
                <TableCell className="text-right font-medium">{r.amount}</TableCell>
                <TableCell className="text-muted-foreground">{r.time}</TableCell>
                <TableCell>
                  <div className="flex gap-1 justify-end">
                    <Button size="icon" variant="ghost"><Printer className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
