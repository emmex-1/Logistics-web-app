import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supportService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/support")({
  head: () => ({ meta: [{ title: "Support — Sendaro" }] }),
  component: Support,
});

function Support() {
  const { data = [] } = useQuery({ queryKey: ["tickets"], queryFn: supportService.tickets });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Support tickets</h1>
        <Button>New ticket</Button>
      </div>
      <div className="grid gap-3">
        {data.map((t) => (
          <Card key={t.id} className="flex items-center justify-between p-5">
            <div>
              <div className="font-display text-base font-semibold">{t.subject}</div>
              <div className="text-xs text-muted-foreground">Last update {new Date(t.lastMessageAt).toLocaleString()}</div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="rounded-full capitalize">{t.priority}</Badge>
              <Badge className="rounded-full capitalize">{t.status.replace("_", " ")}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
