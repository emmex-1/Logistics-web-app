import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/admin/fleet")({
  head: () => ({ meta: [{ title: "Fleet — Sendaro Admin" }] }),
  component: Fleet,
});

function Fleet() {
  const { data = [] } = useQuery({ queryKey: ["admin.fleet"], queryFn: adminService.fleet });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Fleet</h1>
      <div className="grid gap-3 lg:grid-cols-2">
        {data.map((v) => (
          <Card key={v.id} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-base font-semibold">{v.model}</div>
                <div className="text-xs text-muted-foreground font-mono">{v.plate} · {v.type}</div>
              </div>
              <Badge variant="secondary" className={`rounded-full capitalize ${v.status === "active" ? "bg-success/15 text-success" : v.status === "maintenance" ? "bg-warning/15" : ""}`}>{v.status}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground">Odometer</div><div className="font-medium">{v.odometerKm.toLocaleString()} km</div></div>
              <div><div className="text-xs text-muted-foreground">Last service</div><div className="font-medium">{new Date(v.lastService).toLocaleDateString()}</div></div>
              <div><div className="text-xs text-muted-foreground">Fuel</div><Progress value={v.fuelLevel} className="mt-2 h-2" /></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
