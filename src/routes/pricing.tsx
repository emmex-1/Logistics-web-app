import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Zap,
  Clock,
  Shield,
  Headphones,
  ArrowRight,
  Package,
  Truck,
  Star,
} from "lucide-react";
import { NGN } from "@/constants";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Quick Reach Logistics" },
      {
        name: "description",
        content: "Transparent Lagos delivery pricing. No hidden fees.",
      },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Saver",
    price: 2500,
    eta: "Next day",
    blurb: "Best for next-day, non-urgent drops.",
    features: [
      "Next-day delivery",
      "Bike or van",
      "Standard tracking",
      "Email receipt",
    ],
    icon: Package,
    accent: "#64748b",
    accentBg: "rgba(100,116,139,0.08)",
  },
  {
    name: "Standard",
    price: 4800,
    eta: "Same day",
    blurb: "The Quick Reach Logistics default. Same-day across Lagos.",
    features: [
      "Same-day before 6 PM",
      "Live tracking",
      "₦100k insurance",
      "WhatsApp updates",
    ],
    popular: true,
    icon: Truck,
    accent: "#ef0004",
    accentBg: "rgba(239,0,4,0.08)",
  },
  {
    name: "Express",
    price: 7200,
    eta: "2–3 hrs",
    blurb: "Priority routing in under 3 hours.",
    features: [
      "2–3 hour delivery",
      "Dedicated rider",
      "₦250k insurance",
      "Photo POD",
    ],
    icon: Zap,
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.08)",
  },
  {
    name: "Priority",
    price: 12000,
    eta: "Under 2 hrs",
    blurb: "Time-critical, high-value shipments.",
    features: [
      "Under 2 hours",
      "Senior rider",
      "₦500k insurance",
      "24/7 support",
    ],
    icon: Star,
    accent: "#7c3aed",
    accentBg: "rgba(124,58,237,0.08)",
  },
];

const faqs = [
  {
    q: "Are there hidden fees?",
    a: "No. The price we quote is the price you pay. VAT is included in all fares.",
  },
  {
    q: "What affects my final price?",
    a: "Distance, cargo type, vehicle, weight, and urgency. Use our quote engine for an exact figure.",
  },
  {
    q: "Can I get a business rate?",
    a: "Yes — volume pricing is available for businesses. Contact our team.",
  },
  {
    q: "Is insurance mandatory?",
    a: "No, but it's recommended. It costs 1.5% of your declared value with up to ₦500k cover.",
  },
];

const includedEverywhere = [
  { icon: Shield, label: "No hidden fees", desc: "Fare locks at booking" },
  { icon: Clock, label: "Real-time tracking", desc: "Live updates & ETA" },
  {
    icon: Headphones,
    label: "Support included",
    desc: "Mon–Sat, 8 AM–6 PM",
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-slate-950 pb-20 pt-16">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-80 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: "#ef0004" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge
                className="mb-4 rounded-full border-white/10 text-xs"
                style={{
                  backgroundColor: "rgba(239,0,4,0.15)",
                  borderColor: "rgba(239,0,4,0.3)",
                  color: "#fca5a5",
                }}
              >
                Pricing
              </Badge>
              <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Simple,{" "}
                <span style={{ color: "#ef0004" }}>transparent</span> pricing.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
                From a single envelope to a full container. Final fare locks at
                booking — no surprises, ever.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Always included strip ── */}
        <section className="border-b bg-slate-50 py-6">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-border">
              {includedEverywhere.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-3 px-4"
                >
                  <Icon
                    className="h-5 w-5 flex-shrink-0"
                    style={{ color: "#ef0004" }}
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <p className="text-sm font-semibold sm:hidden">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing tiers ── */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {tiers.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Card
                      className={`relative flex h-full flex-col p-6 transition-shadow hover:shadow-md ${
                        t.popular ? "shadow-md" : ""
                      }`}
                      style={
                        t.popular
                          ? {
                              borderColor: "#ef0004",
                              boxShadow:
                                "0 0 0 2px rgba(239,0,4,0.12), 0 4px 16px rgba(239,0,4,0.08)",
                            }
                          : undefined
                      }
                    >
                      {t.popular && (
                        <Badge
                          className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full text-white"
                          style={{ backgroundColor: "#ef0004" }}
                        >
                          Most Popular
                        </Badge>
                      )}

                      {/* Icon + name */}
                      <div className="flex items-center gap-3">
                        <div
                          className="grid h-9 w-9 place-items-center rounded-xl"
                          style={{ backgroundColor: t.accentBg }}
                        >
                          <Icon
                            className="h-4 w-4"
                            style={{ color: t.accent }}
                          />
                        </div>
                        <div>
                          <p className="font-display font-bold">{t.name}</p>
                          <p
                            className="text-xs font-medium"
                            style={{ color: t.accent }}
                          >
                            {t.eta}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mt-5">
                        <p
                          className="font-display text-3xl font-bold"
                          style={t.popular ? { color: "#ef0004" } : undefined}
                        >
                          {NGN(t.price)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          starting price
                        </p>
                      </div>

                      <p className="mt-3 text-sm text-muted-foreground">
                        {t.blurb}
                      </p>

                      {/* Features */}
                      <ul className="mt-5 flex-1 space-y-2 text-sm">
                        {t.features.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <Check
                              className="h-3.5 w-3.5 flex-shrink-0"
                              style={{ color: t.accent }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        className="mt-6 w-full gap-2 text-white"
                        style={
                          t.popular
                            ? { backgroundColor: "#ef0004" }
                            : undefined
                        }
                        variant={t.popular ? "default" : "outline"}
                      >
                        <Link to="/quote">
                          Get a quote <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Final fare depends on distance, weight, and cargo type.{" "}
              <Link
                to="/quote"
                className="font-medium hover:underline"
                style={{ color: "#ef0004" }}
              >
                Use our quote engine
              </Link>{" "}
              for an exact price.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t bg-slate-50 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <Badge variant="secondary" className="mb-3 rounded-full">
                FAQ
              </Badge>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Pricing questions
              </h2>
            </div>
            <div className="space-y-0 divide-y rounded-2xl border bg-white">
              {faqs.map(({ q, a }) => (
                <div key={q} className="px-6 py-5">
                  <p className="font-semibold">{q}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to ship?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Get an instant quote in under 30 seconds — no account needed.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="gap-2 text-white"
                style={{ backgroundColor: "#ef0004" }}
                asChild
              >
                <Link to="/quote">
                  Get instant quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/book">Book delivery</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}