import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supportService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/support")({
  head: () => ({ meta: [{ title: "Support — Quick Reach Logistics Admin" }] }),
  component: Support,
});

function Support() {
  const { data = [] } = useQuery({ queryKey: ["tickets"], queryFn: supportService.tickets });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Support queue</h1>
      <div className="grid gap-3">
        {data.map((t) => (
          <Card key={t.id} className="flex items-center justify-between p-5">
            <div>
              <div className="font-display text-base font-semibold">{t.subject}</div>
              <div className="text-xs text-muted-foreground">Opened {new Date(t.createdAt).toLocaleDateString()}</div>
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
