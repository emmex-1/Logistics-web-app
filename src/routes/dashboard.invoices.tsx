import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NGN } from "@/constants";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/invoices")({
  head: () => ({ meta: [{ title: "Invoices — Sendaro" }] }),
  component: Invoices,
});

function Invoices() {
  const { data = [] } = useQuery({ queryKey: ["invoices"], queryFn: paymentService.invoices });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Invoices</h1>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
            <tr><Th>Number</Th><Th>Issued</Th><Th>Due</Th><Th>Amount</Th><Th>Status</Th><Th /></tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id} className="border-t hover:bg-surface">
                <Td className="font-mono">{i.number}</Td>
                <Td>{new Date(i.issuedAt).toLocaleDateString()}</Td>
                <Td>{new Date(i.dueAt).toLocaleDateString()}</Td>
                <Td className="font-medium">{NGN(i.amount)}</Td>
                <Td><Badge variant="secondary" className={`rounded-full ${i.status === "paid" ? "bg-success/15 text-success" : i.status === "overdue" ? "bg-destructive/15 text-destructive" : "bg-warning/15"}`}>{i.status}</Badge></Td>
                <Td><Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
const Th = ({ children }: any) => <th className="px-6 py-3 text-left font-medium">{children}</th>;
const Td = ({ children, className = "" }: any) => <td className={"px-6 py-4 " + className}>{children}</td>;
