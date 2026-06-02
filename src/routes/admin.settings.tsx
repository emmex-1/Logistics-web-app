import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Admin Settings — Quick Reach Logistics" }] }),
  component: () => (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Workspace settings</h1>
      <Card className="p-6 text-sm text-muted-foreground">Operations team controls, API keys, and webhook endpoints live here.</Card>
    </div>
  ),
});
