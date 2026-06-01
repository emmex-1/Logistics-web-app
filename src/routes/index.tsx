import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, Truck, Package, Clock, Shield, MapPin, Zap, Star, ChevronRight,
  CheckCircle2, Bike, Search, Headphones, Wallet, Route as RouteIcon, Box,
  Users, Building2, Warehouse, ShoppingBag,
} from "lucide-react";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { AnimatedRouteMap } from "@/components/shared/animated-route-map";
import { Marquee, VerticalMarquee } from "@/components/home/marquee";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LAGOS_LGAS } from "@/constants";
import { DELIVERY_CATEGORIES } from "@/constants/categories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sendaro — Premium Logistics for Lagos" },
      { name: "description", content: "Same-day deliveries, on-demand fleet, and real-time tracking across all 20 Lagos LGAs." },
      { property: "og:title", content: "Sendaro — Premium Logistics for Lagos" },
      { property: "og:description", content: "Same-day deliveries, on-demand fleet, real-time tracking." },
    ],
  }),
  component: Home,
});

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <Hero />
        <StatsMarquee />
        <CategoryPicker />
        <Services />
        <Coverage />
        <WhyChooseUs />
        <HowItWorks />
        <TrackPreview />
        <FleetShowcase />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 gradient-radial-primary" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -left-20 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-primary-glow/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
          <Badge variant="secondary" className="rounded-full border-primary/20 bg-primary-soft px-3 py-1 text-primary">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Live across all 20 Lagos LGAs
          </Badge>
          <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Lagos moves <br className="hidden sm:block" /> faster with <span className="gradient-text">Sendaro.</span>
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
            Premium same-day deliveries, on-demand fleet, and live tracking — built for the speed and scale Lagos businesses need.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-6 shadow-glow">
              <Link to="/quote">Get a quote <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-6">
              <Link to="/book">Book delivery</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-6">
              <Link to="/track">Track package</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {["No setup fees", "Live driver tracking", "Insurance included"].map((t) => (
              <span key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> {t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <AnimatedRouteMap />
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border bg-card/95 p-4 shadow-elevated backdrop-blur sm:block">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-primary-foreground"><Bike className="h-4 w-4" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Rider en route</div>
                <div className="text-sm font-semibold">Emeka · 6 min away</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 right-2 hidden rounded-2xl border bg-card/95 p-3 shadow-elevated backdrop-blur sm:block">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">On-time rate</div>
            <div className="font-display text-xl font-semibold">97<span className="text-primary">%</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- STATS MARQUEE ---------------- */
function StatsMarquee() {
  const items = [
    { v: "1.2M+", l: "Deliveries" },
    { v: "18,400", l: "Customers" },
    { v: "20/20", l: "LGAs covered" },
    { v: "97%", l: "On-time rate" },
    { v: "312", l: "Active riders" },
    { v: "4.9★", l: "Avg rating" },
    { v: "<3hr", l: "Avg express ETA" },
    { v: "₦500k", l: "Insurance cover" },
  ];
  return (
    <section className="border-y bg-surface py-6">
      <Marquee speed={45}>
        {items.map((s, i) => (
          <div key={i} className="flex items-baseline gap-3 px-4">
            <span className="font-display text-3xl font-semibold tracking-tight">{s.v}</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</span>
            <span className="ml-6 h-1.5 w-1.5 rounded-full bg-primary/60" />
          </div>
        ))}
      </Marquee>
      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-[11px] uppercase tracking-widest text-muted-foreground">Trusted by leading Lagos businesses</div>
        <div className="mt-4 grid grid-cols-3 items-center justify-items-center gap-6 opacity-70 md:grid-cols-6">
          {["JUMIA", "FLUTTERWAVE", "PAYSTACK", "ANDELA", "INTERSWITCH", "GTBANK"].map((n) => (
            <div key={n} className="font-display text-sm font-bold tracking-widest text-muted-foreground">{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHAT ARE YOU DELIVERING ---------------- */
function CategoryPicker() {
  const [selected, setSelected] = useState<string>(DELIVERY_CATEGORIES[4].id); // Electronics default
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();
  const active = DELIVERY_CATEGORIES.find((c) => c.id === selected)!;

  const submit = () => navigate({ to: "/quote", search: { category: selected, pickup, dest, weight } as any });

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <Badge variant="secondary" className="rounded-full">Start here</Badge>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">What would you like delivered?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Choose the category that best describes your shipment.</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {DELIVERY_CATEGORIES.map((c) => {
          const Icon = c.icon;
          const isActive = c.id === selected;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${isActive ? "border-primary shadow-glow" : "hover:-translate-y-0.5 hover:shadow-elevated"}`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.tint} opacity-60`} />
              <div className="relative">
                <div className={`grid h-10 w-10 place-items-center rounded-xl ${isActive ? "gradient-primary text-primary-foreground" : "bg-card text-primary"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-display text-sm font-semibold leading-tight">{c.name}</div>
                {isActive && <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-primary"><CheckCircle2 className="h-3 w-3" /> Selected</div>}
              </div>
            </button>
          );
        })}
      </div>

      <Card className="mt-8 overflow-hidden border-primary/20 p-0 shadow-elevated">
        <div className="grid gap-0 md:grid-cols-[1fr_1.4fr]">
          <div className={`relative bg-gradient-to-br ${active.tint} p-6`}>
            <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
              <active.icon className="h-6 w-6" />
            </div>
            <div className="mt-4 font-display text-xl font-semibold">{active.name}</div>
            <p className="mt-1 text-sm text-muted-foreground">{active.blurb}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {active.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />{b}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Pickup</label>
              <Input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="e.g. Lekki Phase 1" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Destination</label>
              <Input value={dest} onChange={(e) => setDest(e.target.value)} placeholder="e.g. Ikeja GRA" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Weight (kg)</label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="3" />
            </div>
            <div className="sm:col-span-3 md:col-span-1 lg:col-span-3">
              <Button onClick={submit} size="lg" className="w-full rounded-full shadow-glow">Get Quote <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

/* ---------------- SERVICES (vertical sliding cards) ---------------- */
function Services() {
  const services = [
    { icon: Zap, title: "Same-Day Delivery", desc: "Doorstep before 6pm across Lagos." },
    { icon: Bike, title: "Dispatch Riders", desc: "Beat traffic with motorcycle delivery." },
    { icon: ShoppingBag, title: "E-commerce Delivery", desc: "Order fulfilment for online stores." },
    { icon: Building2, title: "Business Logistics", desc: "Dedicated logistics for enterprises." },
    { icon: RouteIcon, title: "Bulk & Multi-Stop", desc: "Distribution to multiple locations." },
    { icon: Clock, title: "Scheduled Pickups", desc: "Daily, weekly, monthly contracts." },
  ];

  const colA = DELIVERY_CATEGORIES.slice(0, 6);
  const colB = DELIVERY_CATEGORIES.slice(6, 12);

  return (
    <section className="border-t bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Badge variant="secondary" className="rounded-full">Services</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">From a single envelope to a full container.</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Eight tightly engineered logistics services, one platform, one operations team.</p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.04 }}
              >
                <Card className="group h-full p-5 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-semibold">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.desc}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-8 rounded-full">
            <Link to="/services">View all services <ChevronRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        {/* Vertical sliding category visuals */}
        <div className="relative grid h-[520px] grid-cols-2 gap-4">
          <VerticalMarquee speed={26}>
            {colA.map((c) => <CategoryTile key={c.id} cat={c} />)}
          </VerticalMarquee>
          <VerticalMarquee speed={32} reverse>
            {colB.map((c) => <CategoryTile key={c.id} cat={c} />)}
          </VerticalMarquee>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
        </div>
      </div>
    </section>
  );
}

function CategoryTile({ cat }: { cat: typeof DELIVERY_CATEGORIES[number] }) {
  const Icon = cat.icon;
  return (
    <div className={`relative h-44 overflow-hidden rounded-2xl border bg-card p-5 shadow-card`}>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cat.tint}`} />
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-card/80 text-primary backdrop-blur">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-display text-sm font-semibold">{cat.name}</div>
          <div className="text-[11px] text-muted-foreground">{cat.bullets[0]}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COVERAGE ---------------- */
function Coverage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge variant="secondary" className="rounded-full">Coverage</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">All 20 Lagos LGAs. One platform.</h2>
          <p className="mt-3 text-muted-foreground">From Badagry to Epe, our riders and partner fleet operate across every Local Government Area in Lagos — with live density routing during traffic peaks.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {LAGOS_LGAS.map((l) => (
              <span key={l} className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">{l}</span>
            ))}
          </div>
        </div>
        <AnimatedRouteMap />
      </div>
    </section>
  );
}

/* ---------------- WHY CHOOSE US ---------------- */
function WhyChooseUs() {
  const items = [
    { icon: Zap, title: "Fast Turnaround", desc: "Quick pickups and timely deliveries." },
    { icon: Users, title: "Professional Riders", desc: "Trained, vetted, and tracked personnel." },
    { icon: MapPin, title: "Real-Time Tracking", desc: "Live map and POD on every shipment." },
    { icon: Wallet, title: "Affordable Rates", desc: "Transparent pricing, no hidden fees." },
    { icon: Shield, title: "Secure Handling", desc: "Insured cargo, signature confirmation." },
    { icon: Headphones, title: "Dedicated Support", desc: "WhatsApp and voice, 24/7." },
  ];
  return (
    <section className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="rounded-full">Why Sendaro</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">A logistics OS built for Lagos.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title} className="p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><it.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display text-lg font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Book", d: "Submit your delivery request in 30 seconds." },
    { n: "02", t: "Pickup", d: "Nearest rider is dispatched automatically." },
    { n: "03", t: "Track", d: "Watch the journey live on the map." },
    { n: "04", t: "Deliver", d: "Photo POD and signature on completion." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge variant="secondary" className="rounded-full">How it works</Badge>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">From quote to delivered in four moves.</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Card key={s.n} className="relative overflow-hidden p-6">
            <div className="font-display text-5xl font-semibold gradient-text">{s.n}</div>
            <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            {i < steps.length - 1 && <ArrowRight className="absolute right-4 top-6 hidden h-5 w-5 text-muted-foreground/40 lg:block" />}
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TRACK PREVIEW ---------------- */
function TrackPreview() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const go = () => {
    const c = code.trim();
    if (c) navigate({ to: "/track/$id", params: { id: c } });
    else navigate({ to: "/track" });
  };

  return (
    <section className="border-t bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Badge variant="secondary" className="rounded-full">Track shipment</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Find your package in one click.</h2>
          <p className="mt-3 text-muted-foreground">Enter a tracking code (try <span className="font-mono text-foreground">SDR0900000</span>) and we'll show live status, driver, and ETA.</p>
          <div className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Tracking number" className="pl-9 h-12" />
            </div>
            <Button onClick={go} size="lg" className="h-12 rounded-full px-6">Track</Button>
          </div>
        </div>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Tracking</div>
              <div className="font-mono text-sm">SDR0900047</div>
            </div>
            <Badge className="bg-success/15 text-success hover:bg-success/15">In transit</Badge>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["10:00 AM", "Order created"],
              ["10:30 AM", "Rider assigned · Emeka O."],
              ["11:00 AM", "Package picked up"],
              ["01:15 PM", "In transit · Third Mainland"],
            ].map(([t, d], i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1 grid h-5 w-5 place-items-center rounded-full gradient-primary text-[10px] text-primary-foreground"><CheckCircle2 className="h-3 w-3" /></div>
                <div>
                  <div className="text-sm font-medium">{d}</div>
                  <div className="text-xs text-muted-foreground">{t}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border bg-surface p-4 text-sm">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">ETA</div>
            <div className="font-display text-lg font-semibold">Today by 4:00 PM</div>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ---------------- FLEET SHOWCASE ---------------- */
function FleetShowcase() {
  const fleet = [
    { icon: Bike, name: "Motorcycle", count: "180+", desc: "Document & parcel express." },
    { icon: Package, name: "Sedan / Car", name2: "", count: "60+", desc: "Mid-size urgent loads." },
    { icon: Truck, name: "Van", count: "40+", desc: "Multi-stop and bulk drops." },
    { icon: Box, name: "Mini Truck", count: "20+", desc: "Furniture and appliance moves." },
    { icon: Warehouse, name: "Trailer", count: "12+", desc: "Long-haul and container freight." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Badge variant="secondary" className="rounded-full">Fleet</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">The right vehicle for every shipment.</h2>
        </div>
        <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/services">Explore fleet <ChevronRight className="ml-1 h-4 w-4" /></Link></Button>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {fleet.map((f) => (
          <Card key={f.name} className="group relative overflow-hidden p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground"><f.icon className="h-6 w-6" /></div>
              <div className="mt-4 font-display text-xl font-semibold">{f.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
              <div className="mt-4 inline-flex items-center gap-1 rounded-full border bg-surface px-3 py-1 text-xs font-medium">{f.count} active</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const t = [
    { name: "Aisha Bello", role: "Ops Lead, Jumia Lagos", quote: "Sendaro cut our island delivery time in half. The live POD alone is worth it.", rating: 5 },
    { name: "Tunde Okeke", role: "Founder, Lagos Eats", quote: "We dispatch 400+ meals a day on Sendaro. Zero missed drops last month.", rating: 5 },
    { name: "Ngozi Adekunle", role: "Logistics Manager, Interswitch", quote: "Finally a Lagos operator with enterprise-grade dashboards and clean APIs.", rating: 5 },
    { name: "Femi Salau", role: "Owner, Bella Hair Lagos", quote: "Our wigs arrive in perfect condition every time. Customers love the tracking link.", rating: 5 },
    { name: "Chiamaka Eze", role: "Pharmacist, MedPlus", quote: "Same-day refills, even during Lagos traffic. They've never let us down.", rating: 5 },
    { name: "David Okonkwo", role: "CEO, Shop Naija", quote: "From Shopify webhook to rider in under 2 minutes. Best dispatch partner we've used.", rating: 5 },
  ];
  return (
    <section className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Badge variant="secondary" className="rounded-full">Loved by ops teams</Badge>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">The fastest way to deliver in Lagos.</h2>
        <div className="mt-10">
          <Marquee speed={60}>
            {t.map((q, i) => (
              <Card key={i} className="w-[360px] shrink-0 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: q.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}
                </div>
                <p className="mt-4 text-pretty text-sm">{q.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary font-display text-xs font-semibold text-primary-foreground">
                    {q.name.split(" ").map((s) => s[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{q.name}</div>
                    <div className="text-xs text-muted-foreground">{q.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    ["How fast is Same-Day delivery?", "Most island-to-island deliveries arrive in under 3 hours during business hours."],
    ["Which areas do you cover?", "All 20 Lagos LGAs, including Ikorodu, Badagry, and Epe."],
    ["How can I track my shipment?", "Every booking includes a tracking link with live map, driver ETA, and event timeline."],
    ["What items can I send?", "From documents and electronics to furniture and bulk goods. See the categories above."],
    ["What payment methods do you accept?", "Paystack, Flutterwave, bank transfer, USSD, and a Sendaro wallet for businesses."],
    ["Do you offer business accounts?", "Yes — corporate pricing, SLA guarantees, monthly invoicing, and account management."],
    ["Is my package insured?", "Standard cover is included; Priority shipments come with up to ₦500k declared-value insurance."],
  ];
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div>
        <Badge variant="secondary" className="rounded-full">FAQ</Badge>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Questions, answered.</h2>
        <p className="mt-3 text-muted-foreground">Still curious? Our team is one message away.</p>
        <Button asChild className="mt-6 rounded-full"><Link to="/contact">Contact us</Link></Button>
      </div>
      <div className="lg:col-span-2">
        <Accordion type="single" collapsible className="w-full">
          {items.map(([q, a], i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-left font-display text-base">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-primary-foreground shadow-glow sm:p-14">
        <div className="absolute inset-0 noise opacity-[0.12]" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Need a logistics partner?</h2>
            <p className="mt-3 max-w-lg text-primary-foreground/85">Get a free quote today and experience reliable delivery services across Lagos.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full bg-white text-foreground hover:bg-white/90"><Link to="/quote">Request quote</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/40 bg-transparent text-primary-foreground hover:bg-white/10"><Link to="/contact">Talk to sales</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
