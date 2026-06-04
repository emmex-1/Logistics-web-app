import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Star,
  ClipboardList,
  UserCheck,
  Navigation,
  PackageCheck,
  Package, 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  getService,
  SERVICES_SAFE,
  SERVICE_ICON_MAP,
  type ServiceDetailSafe,
} from "@/constants/services-catalog";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/services/$slug")({
loader: ({ params }): { service: ServiceDetailSafe } => {
  const service = getService(params.slug);
  if (!service) throw notFound();
  return { service };
},
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s
      ? `${s.title} — Quick Reach Logistics`
      : "Service — Quick Reach Logistics";
    const desc =
      s?.description ??
      "Premium Lagos logistics services by Quick Reach Logistics.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto max-w-3xl px-6 py-32 text-center">
        <Badge variant="secondary">404</Badge>
        <h1 className="mt-4 font-display text-3xl font-semibold">
          Service not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The service you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-6">
          <Link to="/services">Browse all services</Link>
        </Button>
      </main>
      <MarketingFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Something went wrong</p>
        <p className="mt-1 text-base">{String(error?.message ?? error)}</p>
      </div>
    </div>
  ),
  component: ServicePage,
});

// ─── Slideshow images per service ─────────────────────────────────────────────

const SERVICE_SLIDES: Record<string, string[]> = {
  "express-delivery": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=80",
    "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80",
  ],
  "scheduled-delivery": [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=80",
  ],
  "bulk-freight": [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80",
    "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80",
  ],
  "ecommerce-fulfilment": [
    "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  ],
  "corporate-logistics": [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=80",
    "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80",
  ],
  "warehouse-storage": [
    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=80",
  ],
  "package-pickup": [
    "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  ],
};

const SERVICE_IMAGES: Record<string, string> = {
  "express-delivery": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  "scheduled-delivery": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80",
  "bulk-freight": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
  "ecommerce-fulfilment": "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=700&q=80",
  "corporate-logistics": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
  "warehouse-storage": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&q=80",
  "package-pickup": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=700&q=80",
};

// ─── Slideshow Component ──────────────────────────────────────────────────────

function HeroSlideshow({ slug }: { slug: string }) {
  const slides = SERVICE_SLIDES[slug] ?? SERVICE_SLIDES["express-delivery"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.62)" }} />
        </div>
      ))}

      {/* Highlights overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          What's included
        </h3>
        <ul className="flex flex-col gap-3">
          {(slides.length > 0
            ? []
            : []
          )}
        </ul>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: i === current ? "#ef0004" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ServicePage() {
const { service } = Route.useLoaderData() as { service: ServiceDetailSafe };
const Icon = SERVICE_ICON_MAP[service.slug] ?? Package;
const others = SERVICES_SAFE.filter((s) => s.slug !== service.slug).slice(0, 4);

  const slides = SERVICE_SLIDES[service.slug] ?? SERVICE_SLIDES["express-delivery"];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>

        {/* ── 1. Hero ── */}
      <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
          <div
            className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${service.tint}`}
            style={{ minHeight: "520px" }}
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-20 items-center"
              style={{ minHeight: "520px", paddingTop: "90px"}}
            >
              {/* LEFT — text */}
              <div className="flex flex-col">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                  <Link
                    to="/services"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#ef0004",
                      textDecoration: "none",
                    }}
                  >
                    Services
                  </Link>
                  <span style={{ color: "#999", fontSize: "11px" }}>/</span>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#666",
                    }}
                  >
                    {service.title}
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(36px, 5vw, 58px)",
                    color: "#0f0f0f",
                    letterSpacing: "-2px",
                    lineHeight: 1.05,
                    marginBottom: "16px",
                  }}
                >
                  {service.title}
                </h1>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(15px, 1.8vw, 18px)",
                    color: "#444",
                    lineHeight: 1.6,
                    marginBottom: "12px",
                    maxWidth: "480px",
                  }}
                >
                  {service.tagline}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: 1.75,
                    maxWidth: "460px",
                    marginBottom: "28px",
                  }}
                >
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
                  >
                    Book Delivery
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.22)" }}
                    >
                      <ArrowUpRight size={12} color="#fff" />
                    </span>
                  </Link>
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold border transition-all hover:bg-black/5"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      border: "1.5px solid #d0d0d0",
                      color: "#0f0f0f",
                    }}
                  >
                    Get a Quote <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* RIGHT — slideshow */}
              <div className="relative" style={{ height: "420px" }}>
                {slides.map((src, i) => (
                  <div
                    key={src}
                    className="absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-1000"
                    style={{ opacity: i === currentSlide ? 1 : 0 }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.62)" }} />
                  </div>
                ))}

                {/* What's included overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 rounded-2xl">
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#fff",
                      marginBottom: "14px",
                    }}
                  >
                    What's included
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                        <Check size={15} style={{ color: "#4ade80", marginTop: "2px", flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Slide dots */}
                <div className="absolute bottom-4 right-6 flex gap-2 z-20">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      style={{
                        width: i === currentSlide ? "22px" : "7px",
                        height: "7px",
                        borderRadius: "999px",
                        background: i === currentSlide ? "#ef0004" : "rgba(255,255,255,0.35)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Best For ── */}
        <section style={{ background: "#0a0a0a", padding: "80px 0" }}>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center mb-12">
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#ef0004",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Best For
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                  marginTop: "8px",
                  lineHeight: 1.2,
                }}
              >
                Built for who you are.
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  maxWidth: "460px",
                  margin: "10px auto 0",
                }}
              >
                Whether you're a solo entrepreneur or running logistics for a national brand, this service is designed around your constraints.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.bestFor.map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col gap-3 p-7 rounded-2xl transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Star size={15} color="#ef0004" />
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#fff",
                      }}
                    >
                      {b.label}
                    </h3>
                  </div>
                  <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Coverage Areas ── */}
        <section style={{ background: "#0f0f0f", padding: "80px 0" }}>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center mb-12">
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#ef0004",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Coverage Areas
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                  marginTop: "8px",
                  lineHeight: 1.2,
                }}
              >
                Where we operate.
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  maxWidth: "460px",
                  margin: "10px auto 0",
                }}
              >
                Our network is concentrated where it matters most — with clear ETAs per zone.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.coverageAreas.map((zone) => (
                <div
                  key={zone.zone}
                  className="p-6 rounded-2xl transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={15} color="#ef0004" />
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 700,
                          fontSize: "15px",
                          color: "#fff",
                        }}
                      >
                        {zone.zone}
                      </h3>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#ef0004",
                        background: "rgba(239,0,4,0.12)",
                        border: "1px solid rgba(239,0,4,0.25)",
                        borderRadius: "999px",
                        padding: "3px 10px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {zone.eta}
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {zone.areas.map((area) => (
                      <li
                        key={area}
                        style={{
                          borderRadius: "999px",
                          background: "rgba(255,255,255,0.08)",
                          padding: "4px 12px",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Pricing ── */}
        <section style={{ background: "#f8f8f8", padding: "80px 0" }}>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center mb-12">
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#ef0004",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Pricing
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 800,
                  color: "#0f0f0f",
                  letterSpacing: "-0.5px",
                  marginTop: "8px",
                }}
              >
                Transparent pricing. No surprises.
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  maxWidth: "460px",
                  margin: "10px auto 0",
                }}
              >
                Fixed rates calculated upfront. Pay only for what you use.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
              {service.pricing.map((tier) => (
                <div
                  key={tier.label}
                  className="relative flex flex-col p-7 rounded-2xl transition-all hover:-translate-y-0.5"
                  style={{
                    background: tier.popular ? "#0f0f0f" : "#fff",
                    border: tier.popular ? "none" : "1px solid #eaeaea",
                    boxShadow: tier.popular ? "0 20px 60px rgba(0,0,0,0.2)" : "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  {tier.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#ef0004",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 800,
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        borderRadius: "999px",
                        padding: "4px 14px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Most popular
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: tier.popular ? "rgba(255,255,255,0.5)" : "#999",
                      marginBottom: "8px",
                    }}
                  >
                    {tier.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(24px, 3vw, 32px)",
                      fontWeight: 800,
                      color: tier.popular ? "#fff" : "#0f0f0f",
                      letterSpacing: "-0.5px",
                      marginBottom: "12px",
                    }}
                  >
                    {tier.price}
                  </div>
                  <p
                    style={{
                      flex: 1,
                      fontSize: "13px",
                      lineHeight: 1.7,
                      color: tier.popular ? "rgba(255,255,255,0.6)" : "#666",
                      marginBottom: "24px",
                    }}
                  >
                    {tier.description}
                  </p>
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:opacity-90"
                    style={{
                      background: tier.popular ? "#ef0004" : "#0f0f0f",
                      color: "#fff",
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    Get started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Use Cases + How It Works ── */}
        <section style={{ background: "#fff", padding: "80px 0 96px" }}>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-4">
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#ef0004",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Use Cases & Process
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 900,
                  color: "#0f0f0f",
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                  maxWidth: "600px",
                }}
              >
                Built for situations<br />like these.
              </h2>
              <p style={{ color: "#777", fontSize: "15px", lineHeight: 1.7, maxWidth: "340px" }}>
                From everyday errands to enterprise-level logistics — here's how Quick Reach Logistics fits your workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Use Cases */}
              <div>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "18px",
                    color: "#0f0f0f",
                    marginBottom: "20px",
                  }}
                >
                  Common use cases
                </p>
                <ul className="flex flex-col gap-4">
                  {service.useCases.map((u, i) => (
                    <li key={u} className="flex items-start gap-4">
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          minWidth: "28px",
                          borderRadius: "999px",
                          background: "#ef0004",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: 800,
                          fontFamily: "'Syne', sans-serif",
                          marginTop: "1px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span style={{ fontSize: "14px", lineHeight: 1.7, color: "#444", paddingTop: "4px" }}>
                        {u}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              <div>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "18px",
                    color: "#0f0f0f",
                    marginBottom: "20px",
                  }}
                >
                  How it works
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 relative">
                  {service.process.map((p, i) => {
                    const ProcessIcons = [ClipboardList, UserCheck, Navigation, PackageCheck];
                    const PIcon = ProcessIcons[i] ?? ClipboardList;
                    const isLast = i === service.process.length - 1;

                    return (
                      <div key={p.step} className="relative flex flex-col" style={{ paddingBottom: "28px", paddingRight: "16px" }}>
                        {/* Ghost number */}
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: "-10px",
                            left: "4px",
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "80px",
                            fontWeight: 900,
                            color: "rgba(0,0,0,0.04)",
                            lineHeight: 1,
                            userSelect: "none",
                            pointerEvents: "none",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>

                        {/* Icon */}
                        <div className="flex items-center gap-3 relative z-10 mb-3">
                          <div
                            style={{
                              width: "44px",
                              height: "44px",
                              minWidth: "44px",
                              borderRadius: "12px",
                              background: i === 2 ? "#ef0004" : "#f3f3f3",
                              border: i === 2 ? "none" : "1.5px solid #e5e5e5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <PIcon size={20} color={i === 2 ? "#fff" : "#555"} strokeWidth={1.8} />
                          </div>
                          <span
                            style={{
                              fontSize: "9px",
                              fontWeight: 800,
                              fontFamily: "'Syne', sans-serif",
                              color: "#999",
                              background: "#ebebeb",
                              borderRadius: "999px",
                              padding: "2px 7px",
                            }}
                          >
                            Step {i + 1}
                          </span>
                        </div>

                        {/* Text */}
                        <div className="relative z-10">
                          <p
                            style={{
                              fontFamily: "'Syne', sans-serif",
                              fontSize: "14px",
                              fontWeight: 800,
                              color: i === 2 ? "#ef0004" : "#0f0f0f",
                              marginBottom: "6px",
                            }}
                          >
                            {p.step}
                          </p>
                          <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. FAQ ── */}
        <section style={{ background: "#f8f8f8", padding: "80px 0" }}>
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <div className="text-center mb-12">
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#ef0004",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                FAQ
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 800,
                  color: "#0f0f0f",
                  letterSpacing: "-0.5px",
                  marginTop: "8px",
                }}
              >
                Common questions.
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-8">
              {service.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── 7. CTA (styled like about page) ── */}
        <section style={{ background: "#f8f3f3" }}>
          <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
            <div
              className="relative overflow-hidden rounded-3xl p-12 sm:p-16"
              style={{ minHeight: "330px" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/media/huge.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.75)" }} />
              <div
                className="relative flex flex-col items-center text-center gap-8"
                style={{ zIndex: 2 }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(28px, 3.5vw, 44px)",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "-1px",
                      lineHeight: 1.1,
                    }}
                  >
                    Need a delivery today?
                  </h2>
                  <p
                    className="mt-3 max-w-lg mx-auto text-base"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    Book in 60 seconds. Track in real time. Pay only when you're happy.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
                  >
                    Book Delivery
                  </Link>
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold border border-white/40 text-white transition-all hover:bg-white/10"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Get Quote
                  </Link>
                </div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                  No account needed to book. Pay securely via card or transfer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Other Services ── */}
        <section style={{ background: "#0a0a0a", padding: "64px 0" }}>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(22px, 2.5vw, 30px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}
              >
                Other services
              </h2>
              <Link
                to="/services"
                className="text-sm font-medium hover:underline inline-flex items-center gap-1"
                style={{ color: "#ef0004", fontFamily: "'Syne', sans-serif" }}
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => {
                const OIcon = SERVICE_ICON_MAP[o.slug] ?? Package;
                const img = SERVICE_IMAGES[o.slug] ?? "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&q=80";
                return (
                  <Link
                    key={o.slug}
                    to="/services/$slug"
                    params={{ slug: o.slug }}
                    className="group relative rounded-2xl overflow-hidden block"
                    style={{ minHeight: "280px" }}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${img}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    {/* Black overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.4) 100%)",
                      }}
                    />

                    {/* Icon */}
                    <div className="absolute top-4 left-4 z-10">
                      <div
                        className="flex items-center justify-center rounded-xl"
                        style={{ width: "36px", height: "36px", background: "rgba(239,0,4,0.85)" }}
                      >
                        <OIcon size={16} color="#fff" />
                      </div>
                    </div>

                    {/* Price badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        style={{
                          display: "inline-block",
                          borderRadius: "999px",
                          padding: "4px 10px",
                          fontSize: "11px",
                          fontWeight: 700,
                          background: "rgba(255,255,255,0.12)",
                          backdropFilter: "blur(8px)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        from {o.priceFrom}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                      <p
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#fff",
                          lineHeight: 1.2,
                          marginBottom: "6px",
                        }}
                      >
                        {o.title}
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "12px",
                          lineHeight: 1.6,
                          marginBottom: "10px",
                        }}
                      >
                        {o.tagline}
                      </p>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-bold transition-transform duration-200 group-hover:translate-x-0.5"
                        style={{ color: "#ef0004" }}
                      >
                        Explore
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <MarketingFooter />
    </div>
  );
}