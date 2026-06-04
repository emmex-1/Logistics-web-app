import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/attendant/signout")({
  head: () => ({ meta: [{ title: "Sign out — Attendant" }] }),
  component: SignOut,
});

function SignOut() {
  return (
    <div className="max-w-md mx-auto mt-12">
      <Card className="p-8 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 grid place-items-center">
          <LogOut className="h-6 w-6 text-primary" />
        </div>
        <div className="font-display text-xl font-semibold">End shift?</div>
        <p className="text-sm text-muted-foreground">You'll be signed out and your daily summary will be saved.</p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" asChild><Link to="/attendant">Cancel</Link></Button>
          <Button asChild><Link to="/login">Sign out</Link></Button>
        </div>
      </Card>
    </div>
  );
}
