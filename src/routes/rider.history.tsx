import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
export const Route = createFileRoute("/rider/history")({
  head: () => ({ meta: [{ title: "History — Rider" }] }),
  component: () => <div className="space-y-6"><h1 className="font-display text-2xl font-semibold">History</h1><Card className="p-6 text-sm text-muted-foreground">Past completed deliveries appear here.</Card></div>,
});
