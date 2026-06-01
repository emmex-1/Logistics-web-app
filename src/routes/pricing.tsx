import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { NGN } from "@/constants";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — Sendaro" }, { name: "description", content: "Transparent Lagos delivery pricing. No hidden fees." }] }),
  component: Pricing,
});

const tiers = [
  { name: "Saver", price: 2500, blurb: "Best for next-day, non-urgent drops.", features: ["Next-day delivery", "Bike or van", "Standard tracking", "Email receipt"] },
  { name: "Standard", price: 4800, blurb: "The Sendaro default. Same-day across Lagos.", features: ["Same-day before 6pm", "Live tracking", "₦100k insurance", "WhatsApp updates"], popular: true },
  { name: "Express", price: 7200, blurb: "Priority routing in under 3 hours.", features: ["2–3 hour delivery", "Dedicated rider", "₦250k insurance", "Photo POD"] },
  { name: "Priority", price: 12000, blurb: "Time-critical, high-value shipments.", features: ["Under 2 hours", "Senior rider", "₦500k insurance", "24/7 support"] },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="rounded-full">Pricing</Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Simple, transparent pricing.</h1>
          <p className="mt-3 text-muted-foreground">From a single envelope to a full container. Final fare locks at booking — no surprises.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <Card key={t.name} className={`relative flex flex-col p-6 ${t.popular ? "border-primary shadow-glow" : ""}`}>
              {t.popular && <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">Most popular</Badge>}
              <div className="font-display text-lg font-semibold">{t.name}</div>
              <div className="mt-3 font-display text-3xl font-semibold">{NGN(t.price)} <span className="text-sm font-normal text-muted-foreground">starting</span></div>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {t.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-success" />{f}</li>)}
              </ul>
              <Button asChild className="mt-6 w-full"><Link to="/quote">Get a quote</Link></Button>
            </Card>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
