import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone } from "lucide-react";
import { BRAND } from "@/constants";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Quick Reach Logistics Logistics" },
      { name: "description", content: "Talk to Quick Reach Logistics about deliveries, fleet, or enterprise integrations." },
      { property: "og:title", content: "Contact Quick Reach Logistics" },
      { property: "og:description", content: "We're one message away." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <Badge variant="secondary" className="rounded-full">Contact</Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Let's get you moving.</h1>
          <p className="mt-4 max-w-md text-muted-foreground">Drop us a line — sales, support, partnerships, or just to say hi. We reply within an hour during business hours.</p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" />{BRAND.phone}</div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" />{BRAND.email}</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" />{BRAND.address}</div>
          </div>
        </div>
        <Card className="p-6 shadow-elevated">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Thanks! We'll be in touch shortly."); (e.target as HTMLFormElement).reset(); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Full name</Label><Input required placeholder="Tunde Adebayo" /></div>
              <div className="space-y-1.5"><Label>Company</Label><Input placeholder="Acme Logistics" /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" required placeholder="you@company.com" /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input required placeholder="+234..." /></div>
            </div>
            <div className="space-y-1.5"><Label>Message</Label><Textarea required rows={5} placeholder="Tell us about your delivery needs..." /></div>
            <Button type="submit" className="w-full">Send message</Button>
          </form>
        </Card>
      </main>
      <MarketingFooter />
    </div>
  );
}
