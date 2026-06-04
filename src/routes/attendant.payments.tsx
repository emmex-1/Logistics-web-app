import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NGN } from "@/constants";

export const Route = createFileRoute("/attendant/payments")({
  head: () => ({ meta: [{ title: "Payments — Attendant" }] }),
  component: Payments,
});

const ROWS = [
  { id: "SL-2026-10231", method: "POS", amount: 4500, status: "Paid" },
  { id: "SL-2026-10230", method: "Transfer", amount: 3200, status: "Paid" },
  { id: "SL-2026-10228", method: "COD", amount: 2900, status: "Pending" },
  { id: "SL-2026-10226", method: "Cash", amount: 1800, status: "Paid" },
  { id: "SL-2026-10224", method: "COD", amount: 5400, status: "Pending" },
];
const methodTone: Record<string, "default" | "secondary" | "outline"> = { POS: "default", Transfer: "secondary", Cash: "outline", COD: "outline" };

function Payments() {
  const collected = ROWS.filter((r) => r.status === "Paid").reduce((s, r) => s + r.amount, 0);
  const pending = ROWS.filter((r) => r.status === "Pending").reduce((s, r) => s + r.amount, 0);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Payments</h1>
        <p className="text-sm text-muted-foreground">Record collections via POS, transfer, cash, or COD.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5"><div className="text-xs uppercase tracking-widest text-muted-foreground">Collected today</div><div className="font-display text-3xl font-semibold mt-2">{NGN(collected)}</div></Card>
        <Card className="p-5"><div className="text-xs uppercase tracking-widest text-muted-foreground">Outstanding</div><div className="font-display text-3xl font-semibold mt-2">{NGN(pending)}</div></Card>
      </div>
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs text-primary">{r.id}</TableCell>
                <TableCell><Badge variant={methodTone[r.method]}>{r.method}</Badge></TableCell>
                <TableCell className="text-right font-medium">{NGN(r.amount)}</TableCell>
                <TableCell><Badge variant={r.status === "Paid" ? "default" : "outline"}>{r.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
