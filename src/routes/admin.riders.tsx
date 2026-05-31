import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Route = createFileRoute("/admin/riders")({
  head: () => ({ meta: [{ title: "Riders — Sendaro Admin" }] }),
  component: Riders,
});

function Riders() {
  const { data = [] } = useQuery({ queryKey: ["admin.drivers"], queryFn: adminService.drivers });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Riders</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((d) => (
          <Card key={d.id} className="p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary font-display text-sm font-semibold text-primary-foreground">
                {d.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="font-medium">{d.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-warning text-warning" />{d.rating.toFixed(1)} · {d.trips} trips</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{d.vehicle.model} · {d.vehicle.plate}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
