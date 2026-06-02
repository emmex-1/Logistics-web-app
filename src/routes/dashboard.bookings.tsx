import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

export const Route = createFileRoute("/dashboard/bookings")({
  head: () => ({ meta: [{ title: "Bookings — Quick Reach Logistics" }] }),
  component: Bookings,
});

function Bookings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Saved bookings & drafts</h1>
        <Button asChild><Link to="/book">New booking</Link></Button>
      </div>
      <Card className="flex flex-col items-center justify-center gap-3 p-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow"><Bookmark className="h-6 w-6" /></div>
        <h3 className="font-display text-lg font-semibold">No saved bookings yet</h3>
        <p className="max-w-sm text-sm text-muted-foreground">Save frequent routes from the booking flow and reuse them in seconds.</p>
        <Button asChild className="mt-2"><Link to="/book">Create a booking</Link></Button>
      </Card>
    </div>
  );
}
