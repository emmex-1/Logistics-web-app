import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
export const Route = createFileRoute("/rider/settings")({
  head: () => ({ meta: [{ title: "Rider Settings" }] }),
  component: () => <div className="space-y-6"><h1 className="font-display text-2xl font-semibold">Settings</h1><Card className="p-6 text-sm text-muted-foreground">Vehicle, bank account, and document upload settings.</Card></div>,
});
