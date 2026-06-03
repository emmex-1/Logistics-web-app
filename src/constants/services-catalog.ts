// /constants/services-catalog.ts
import {
  Zap,
  Package,
  Truck,
  Clock,
  ShoppingBag,
  Building2,
  Thermometer,
  Archive,
  type LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CoverageArea {
  zone: string;
  areas: string[];
  eta: string;
}

export interface PricingTier {
  label: string;
  price: string;
  description: string;
  popular?: boolean;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  tint: string; // Tailwind gradient classes for hero bg
  eta: string;
  priceFrom: string;
  highlights: string[];
  features: { title: string; desc: string }[];
  bestFor: { label: string; desc: string }[];
  coverageAreas: CoverageArea[];
  pricing: PricingTier[];
  useCases: string[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

// ─── Catalog ──────────────────────────────────────────────────────────────────

export const SERVICES: ServiceDetail[] = [
  {
    slug: "express-delivery",
    title: "Express Delivery",
    tagline: "Same-day delivery across Lagos in as little as 2 hours.",
    description:
      "When it absolutely must arrive today, our Express Delivery service dispatches a dedicated rider the moment you confirm your booking. Real-time GPS tracking, proof of delivery, and full insurance on every parcel.",
    icon: Zap,
    tint: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20",
    eta: "2 – 4 hrs",
    priceFrom: "₦1,500",
    highlights: [
      "Dedicated rider assigned instantly",
      "Live GPS tracking link shared via SMS & WhatsApp",
      "Photo proof of delivery",
      "Up to ₦100,000 parcel insurance included",
      "Priority customer support line",
      "Available 7 days a week, 7 AM – 10 PM",
    ],
    features: [
      {
        title: "Instant Dispatch",
        desc: "A rider is assigned within 5 minutes of booking confirmation, cutting wait time to the bare minimum.",
      },
      {
        title: "Real-Time Tracking",
        desc: "Share a live map link with your recipient so they know exactly when to expect the knock.",
      },
      {
        title: "Insured Parcels",
        desc: "Every express delivery is covered up to ₦100k at no extra cost — peace of mind is standard.",
      },
      {
        title: "Digital POD",
        desc: "Timestamped photo and signature captured on delivery, emailed to you automatically.",
      },
    ],
    bestFor: [
      {
        label: "E-commerce Merchants",
        desc: "Fulfill same-day promises and watch 5-star reviews roll in.",
      },
      {
        label: "Healthcare & Pharmacies",
        desc: "Urgently dispatch prescriptions, samples, or medical supplies.",
      },
      {
        label: "Corporate Offices",
        desc: "Send contracts, devices, or gifts across town before close of business.",
      },
      {
        label: "Personal Errands",
        desc: "Birthday gifts, forgotten items, surprise deliveries — sorted.",
      },
    ],
    coverageAreas: [
      {
        zone: "Lagos Island & Environs",
        areas: ["Victoria Island", "Lekki Phase 1 & 2", "Ajah", "Ikoyi", "Lagos Island", "Onikan"],
        eta: "1 – 2 hrs",
      },
      {
        zone: "Lagos Mainland",
        areas: ["Yaba", "Surulere", "Ikeja", "Ojota", "Maryland", "Gbagada"],
        eta: "2 – 3 hrs",
      },
      {
        zone: "Outer Lagos",
        areas: ["Badagry", "Ikorodu", "Epe", "Agbara", "Sagamu Road corridor"],
        eta: "3 – 4 hrs",
      },
    ],
    pricing: [
      {
        label: "Standard",
        price: "₦1,500",
        description: "Up to 5 kg within same zone. Ideal for documents and small parcels.",
      },
      {
        label: "Pro",
        price: "₦2,500",
        description: "Up to 15 kg, cross-zone. Perfect for larger packages and e-commerce orders.",
        popular: true,
      },
      {
        label: "Bulk",
        price: "Custom",
        description: "10+ shipments per day. Volume pricing, account management & API integration.",
      },
    ],
    useCases: [
      "Last-minute birthday or anniversary gifts",
      "Urgent document signing between offices",
      "Replacement parts for a stalled production line",
      "Same-day e-commerce fulfillment promises",
      "Hospital specimen or sample transfers",
    ],
    process: [
      { step: "Book in 60 seconds", desc: "Enter pickup, drop-off, and parcel details on our app or website." },
      { step: "Rider assigned instantly", desc: "We match you with the nearest available rider within 5 minutes." },
      { step: "Live tracking begins", desc: "A shareable map link is sent to you and your recipient via WhatsApp/SMS." },
      { step: "Delivery & POD", desc: "Rider delivers, captures photo proof, and you receive a delivery receipt." },
    ],
    faqs: [
      {
        q: "What's the maximum parcel weight for Express Delivery?",
        a: "Our standard express service handles parcels up to 15 kg. For heavier items, our Heavy Haulage or Bulk Freight services are better suited.",
      },
      {
        q: "Can I schedule an express pickup in advance?",
        a: "Yes — you can schedule up to 7 days in advance. Your rider will be assigned 15 minutes before the scheduled pickup time.",
      },
      {
        q: "What if the recipient is unavailable?",
        a: "The rider will attempt delivery twice. If unsuccessful, the parcel is held at our nearest hub for 24 hours at no charge.",
      },
      {
        q: "Is cash on delivery (COD) available?",
        a: "Yes. We collect COD on your behalf and remit within 24 hours via bank transfer.",
      },
      {
        q: "Do you deliver on public holidays?",
        a: "We operate 365 days a year. A small public-holiday surcharge of ₦300 applies.",
      },
    ],
  },

  {
    slug: "scheduled-delivery",
    title: "Scheduled Delivery",
    tagline: "Pre-book your pickups. We show up exactly when you need us.",
    description:
      "Plan ahead with confidence. Scheduled Delivery lets you lock in a pickup window up to 30 days out — perfect for recurring shipments, subscription boxes, or predictable business logistics.",
    icon: Clock,
    tint: "from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20",
    eta: "On your schedule",
    priceFrom: "₦1,200",
    highlights: [
      "Book up to 30 days in advance",
      "Recurring schedule support (daily, weekly, monthly)",
      "Automated reminders 1 hour before pickup",
      "Route-optimised for punctuality",
      "Dedicated account manager for 10+ shipments/week",
      "Flexible rescheduling up to 2 hours before pickup",
    ],
    features: [
      {
        title: "Flexible Windows",
        desc: "Choose morning (7 – 11 AM), afternoon (12 – 4 PM), or evening (5 – 9 PM) slots.",
      },
      {
        title: "Recurring Runs",
        desc: "Set a repeating schedule once and we'll show up automatically — no re-booking needed.",
      },
      {
        title: "SMS Reminders",
        desc: "Both sender and recipient get an automated heads-up 60 minutes before the pickup window.",
      },
      {
        title: "Route Optimisation",
        desc: "Our dispatch algorithm groups nearby pickups for on-time arrival, even on busy days.",
      },
    ],
    bestFor: [
      { label: "Subscription Box Brands", desc: "Automate weekly or monthly dispatch without lifting a finger." },
      { label: "Corporate Mail Rooms", desc: "Reliable daily pickups for inter-office and client deliveries." },
      { label: "Pharmacies & Clinics", desc: "Regular supply chain runs that must never miss a slot." },
      { label: "Event Planners", desc: "Time-sensitive deliveries leading up to an event, perfectly sequenced." },
    ],
    coverageAreas: [
      {
        zone: "Lagos Island & Environs",
        areas: ["Victoria Island", "Lekki", "Ikoyi", "Lagos Island", "Ajah"],
        eta: "Exact window booked",
      },
      {
        zone: "Lagos Mainland",
        areas: ["Ikeja", "Yaba", "Surulere", "Gbagada", "Maryland"],
        eta: "Exact window booked",
      },
      {
        zone: "Ogun State Corridor",
        areas: ["Sagamu", "Abeokuta", "Ijebu-Ode", "Mowe-Ofada"],
        eta: "Next-day windows",
      },
    ],
    pricing: [
      { label: "One-off", price: "₦1,200", description: "Single scheduled pickup, up to 5 kg." },
      { label: "Weekly Pack", price: "₦8,500", description: "5 scheduled pickups per week. Save 30%.", popular: true },
      { label: "Monthly Plan", price: "₦28,000", description: "Up to 30 pickups per month, priority slots guaranteed." },
    ],
    useCases: [
      "Weekly e-commerce batch fulfilment runs",
      "Monthly supplier collection from a factory",
      "Recurring clinic specimen pickups",
      "Pre-planned event logistics over multiple days",
      "Subscription box dispatch on a fixed calendar",
    ],
    process: [
      { step: "Choose your date & window", desc: "Pick a date up to 30 days ahead and select a morning, afternoon, or evening slot." },
      { step: "Confirm parcel details", desc: "Tell us weight, dimensions, and any special handling instructions." },
      { step: "Receive your booking code", desc: "A unique code and calendar invite are sent immediately to your email." },
      { step: "We show up, on time", desc: "Our rider arrives in your window. No chasing, no waiting." },
    ],
    faqs: [
      {
        q: "How far in advance can I book?",
        a: "Up to 30 days ahead. Recurring schedules can be set with no end date.",
      },
      {
        q: "Can I change the time after booking?",
        a: "Yes, rescheduling is free up to 2 hours before the start of your pickup window.",
      },
      {
        q: "What if I need to cancel?",
        a: "Cancellations made 2+ hours before the window are fully refunded. Late cancellations incur a ₦500 fee.",
      },
      {
        q: "Do you offer API integration for scheduled runs?",
        a: "Yes — our REST API lets your platform create and manage scheduled deliveries programmatically. Available on Bulk plans.",
      },
    ],
  },

  {
    slug: "bulk-freight",
    title: "Bulk Freight",
    tagline: "Move large volumes across Nigeria with one call.",
    description:
      "From pallets to full truck loads, Quick Reach Logistics operates a fleet of vans, trucks, and articulated lorries to move your inventory wherever it needs to go — on time, undamaged, and fully documented.",
    icon: Truck,
    tint: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20",
    eta: "24 – 72 hrs",
    priceFrom: "₦15,000",
    highlights: [
      "Vans (1 ton) to articulated trucks (30 tons)",
      "Nationwide coverage: Lagos to Abuja, PH, Kano & more",
      "Dedicated fleet coordinator per shipment",
      "Real-time fleet tracking via dashboard",
      "Cargo insurance up to ₦10 million",
      "Loading & off-loading crew available on request",
    ],
    features: [
      { title: "Fleet Variety", desc: "Right-size your shipment — pick from motorcycles, vans, 5-ton trucks, or 30-ton artics." },
      { title: "Nationwide Routes", desc: "Pre-cleared routes to 18 major Nigerian cities with known ETAs and toll costs included." },
      { title: "Cargo Insurance", desc: "Protect up to ₦10M of goods per trip. Claims processed within 5 business days." },
      { title: "Live Dashboard", desc: "Your logistics manager sees every vehicle's location on a live web dashboard." },
    ],
    bestFor: [
      { label: "Manufacturers & FMCG", desc: "Move finished goods from factory to distribution centres reliably." },
      { label: "Importers & Exporters", desc: "First- and last-mile from ports and bonded warehouses." },
      { label: "Retailers & Wholesalers", desc: "Restock branches across Nigeria on a predictable schedule." },
      { label: "Construction Companies", desc: "Transport materials, equipment, and site supplies to project sites." },
    ],
    coverageAreas: [
      { zone: "South West", areas: ["Lagos", "Ibadan", "Abeokuta", "Osogbo", "Ado-Ekiti"], eta: "24 hrs" },
      { zone: "South South & South East", areas: ["Port Harcourt", "Benin City", "Warri", "Enugu", "Owerri"], eta: "48 hrs" },
      { zone: "North", areas: ["Abuja", "Kano", "Kaduna", "Zaria", "Maiduguri"], eta: "48 – 72 hrs" },
    ],
    pricing: [
      { label: "Van Load", price: "From ₦15,000", description: "Up to 1 ton. Ideal for smaller bulk shipments within a region." },
      { label: "Truck Load", price: "From ₦45,000", description: "5 – 10 ton capacity. Most popular for inter-city freight.", popular: true },
      { label: "Full Artic", price: "From ₦120,000", description: "Up to 30 tons. Full truck load, nationwide, with coordinator." },
    ],
    useCases: [
      "Factory-to-distributor FMCG runs",
      "Port clearance and bonded warehouse transfers",
      "Cross-country retail restocking",
      "Agricultural produce transportation",
      "Construction material delivery to remote sites",
    ],
    process: [
      { step: "Request a quote", desc: "Tell us origin, destination, cargo type, weight, and preferred date." },
      { step: "Fleet matching", desc: "We assign the right vehicle(s) and confirm a fixed price within 2 hours." },
      { step: "Loading & documentation", desc: "Our crew handles loading and issues a waybill with full cargo manifest." },
      { step: "Live tracking to destination", desc: "Track your fleet on our dashboard. We call you at every major waypoint." },
    ],
    faqs: [
      {
        q: "Do you handle customs and port documentation?",
        a: "We partner with licensed customs agents and can manage full port-to-door documentation on request.",
      },
      {
        q: "What cargo do you NOT transport?",
        a: "Hazardous chemicals, live ammunition, narcotics, and perishables requiring strict cold chain (use our Cold Chain service instead).",
      },
      {
        q: "Can I split a truck with another shipper?",
        a: "Yes — our LTL (Less-than-Truckload) service consolidates cargo from multiple shippers on shared routes.",
      },
      {
        q: "How is the freight price calculated?",
        a: "Based on weight, volume (whichever is greater), route distance, and vehicle type. We provide a fixed quote upfront — no surprises.",
      },
    ],
  },

  {
    slug: "cold-chain",
    title: "Cold Chain",
    tagline: "Temperature-controlled delivery for perishables and pharma.",
    description:
      "Pharmaceuticals, fresh produce, dairy, and frozen foods demand an unbroken cold chain. Our refrigerated vans and data-logged temperature sensors ensure your goods arrive at exactly the right temperature.",
    icon: Thermometer,
    tint: "from-cyan-50 to-indigo-50 dark:from-cyan-950/30 dark:to-indigo-950/20",
    eta: "4 – 48 hrs",
    priceFrom: "₦4,500",
    highlights: [
      "Refrigerated vans: 2°C to 8°C and -18°C to -22°C zones",
      "Continuous IoT temperature logging",
      "NAFDAC-compliant pharmaceutical transport",
      "Temperature excursion alerts in real time",
      "Insulated packaging available on request",
      "Certificate of temperature compliance on delivery",
    ],
    features: [
      { title: "Dual Temp Zones", desc: "Chilled (2–8°C) and frozen (-18 to -22°C) available in the same vehicle with partition." },
      { title: "IoT Data Loggers", desc: "Sensor readings every 5 minutes; exportable PDF report provided on delivery." },
      { title: "NAFDAC Compliant", desc: "All pharmaceutical runs follow GDP (Good Distribution Practice) guidelines." },
      { title: "Excursion Alerts", desc: "If temperature deviates from range, you and our ops team are alerted immediately." },
    ],
    bestFor: [
      { label: "Pharmaceutical Companies", desc: "Move vaccines, insulin, and biologics safely across the supply chain." },
      { label: "Supermarkets & Food Retail", desc: "Replenish chilled and frozen aisles without breaking the cold chain." },
      { label: "Restaurants & Hotels", desc: "Receive fresh produce and seafood that arrives as good as it left." },
      { label: "Laboratories", desc: "Transport blood samples, cultures, and reagents under strict temperature control." },
    ],
    coverageAreas: [
      { zone: "Lagos Metro", areas: ["All Lagos zones"], eta: "4 – 8 hrs" },
      { zone: "South West Corridor", areas: ["Ibadan", "Abeokuta", "Sagamu"], eta: "8 – 16 hrs" },
      { zone: "Abuja & FCT", areas: ["Central Abuja", "Gwagwalada", "Kubwa"], eta: "24 – 48 hrs" },
    ],
    pricing: [
      { label: "Chilled", price: "From ₦4,500", description: "2–8°C. Documents, pharma, dairy, fresh produce up to 50 kg." },
      { label: "Frozen", price: "From ₦6,500", description: "-18 to -22°C. Ice cream, frozen meat, and sensitive biologics.", popular: true },
      { label: "GDP Pharma", price: "Custom", description: "Full NAFDAC-compliant documentation, dedicated vehicle, and compliance report." },
    ],
    useCases: [
      "Hospital-to-hospital vaccine redistribution",
      "Restaurant daily fresh seafood delivery",
      "Supermarket frozen aisle restocking",
      "Laboratory specimen inter-facility transport",
      "Bakery cake and dessert delivery for events",
    ],
    process: [
      { step: "Specify your temperature range", desc: "Tell us chilled or frozen, cargo type, and volume." },
      { step: "Vehicle preparation", desc: "Our team pre-cools the van 30 minutes before pickup to ensure it's at target temp." },
      { step: "Sensor-monitored transit", desc: "IoT loggers record temperature every 5 minutes throughout the journey." },
      { step: "Delivery + compliance cert", desc: "Goods delivered in-range; a signed temperature certificate is emailed to you." },
    ],
    faqs: [
      {
        q: "What happens if there's a temperature excursion?",
        a: "You're notified immediately via SMS and WhatsApp. If the excursion is our fault, we cover replacement costs per our SLA.",
      },
      {
        q: "Can I see the temperature log after delivery?",
        a: "Yes — a full PDF report with a time-stamped chart is automatically emailed to you within 30 minutes of delivery.",
      },
      {
        q: "Do you supply insulated packaging?",
        a: "We supply validated insulated boxes and gel packs at cost. Alternatively, we can pick up in your own packaging.",
      },
      {
        q: "Are your vehicles NAFDAC-registered?",
        a: "Yes, our pharmaceutical-grade fleet holds current NAFDAC Good Distribution Practice (GDP) certification.",
      },
    ],
  },

  {
    slug: "ecommerce-fulfilment",
    title: "E-Commerce Fulfilment",
    tagline: "Pick, pack, and ship — we handle the whole last mile.",
    description:
      "From Shopify to Paystack storefronts, plug Quick Reach Logistics directly into your checkout flow. We pick up from your warehouse (or store at ours), pack to your brand standards, and deliver to your customers across Nigeria.",
    icon: ShoppingBag,
    tint: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20",
    eta: "Same day – 3 days",
    priceFrom: "₦900 / order",
    highlights: [
      "Shopify, WooCommerce & Paystack integrations",
      "Branded packing available (your tape, tissue, inserts)",
      "Automated tracking SMS sent to your customers",
      "Returns management included",
      "COD collection & next-day remittance",
      "Dedicated e-commerce dashboard with analytics",
    ],
    features: [
      { title: "Store Integrations", desc: "Connect your Shopify or WooCommerce store in under 10 minutes. Orders flow in automatically." },
      { title: "Branded Packaging", desc: "Supply your packaging materials and we'll use them — your customer, your brand experience." },
      { title: "COD Management", desc: "We collect cash on delivery and remit to your account within 24 hours." },
      { title: "Returns Portal", desc: "Customers initiate returns via a branded link; we pick up and deliver back to your warehouse." },
    ],
    bestFor: [
      { label: "Fashion & Apparel Brands", desc: "Fast, branded delivery that matches your premium product experience." },
      { label: "Beauty & Personal Care", desc: "Fragile items delivered with care and your branded unboxing intact." },
      { label: "Electronics Sellers", desc: "Insured, tamper-evident deliveries with digital proof for every order." },
      { label: "Food & Grocery D2C", desc: "Same-day grocery fulfilment with temperature-aware routing." },
    ],
    coverageAreas: [
      { zone: "Lagos (Full Coverage)", areas: ["All 20 LGAs"], eta: "Same day" },
      { zone: "Ogun, Oyo & Osun", areas: ["Abeokuta", "Ibadan", "Osogbo"], eta: "Next day" },
      { zone: "FCT & Other States", areas: ["Abuja", "Port Harcourt", "Enugu", "Kano"], eta: "2 – 3 days" },
    ],
    pricing: [
      { label: "Starter", price: "₦900 / order", description: "Up to 2 kg. Lagos metro only. Best for small item sellers." },
      { label: "Growth", price: "₦1,400 / order", description: "Up to 5 kg. Lagos + South West. COD and returns included.", popular: true },
      { label: "Enterprise", price: "Custom", description: "Nationwide. Volume pricing, SLA guarantees, API & dashboard access." },
    ],
    useCases: [
      "Shopify store daily order fulfilment",
      "Instagram & WhatsApp commerce dispatch",
      "Subscription product monthly dispatch",
      "Flash sale surge handling",
      "B2B order delivery to retail stockists",
    ],
    process: [
      { step: "Connect your store", desc: "Integrate via our plugin or API. Orders sync in real time." },
      { step: "We pick up or receive stock", desc: "Drop stock at our hub or we collect from your warehouse daily." },
      { step: "Pick, pack & label", desc: "Orders picked, packed to your standards, and labelled automatically." },
      { step: "Deliver + report", desc: "Customer receives a tracking link. You see real-time status in your dashboard." },
    ],
    faqs: [
      {
        q: "Can I use my own branded packaging?",
        a: "Absolutely. Send us your boxes, tape, tissue, and inserts and we'll pack every order to your spec.",
      },
      {
        q: "How does COD remittance work?",
        a: "Cash collected is reconciled daily and transferred to your bank account the following business morning.",
      },
      {
        q: "What's your failed delivery rate?",
        a: "Our first-attempt delivery success rate is 94%. We attempt delivery twice before returning to sender.",
      },
      {
        q: "Do you integrate with Paystack or Flutterwave?",
        a: "We support Shopify, WooCommerce, and custom integrations via REST API. Native Paystack checkout integration is coming Q3 2025.",
      },
    ],
  },

  {
    slug: "corporate-logistics",
    title: "Corporate Logistics",
    tagline: "A dedicated logistics partner for businesses that can't afford delays.",
    description:
      "Monthly retainer or pay-as-you-go — Quick Reach Logistics embeds into your operations as a reliable, white-glove logistics arm. From inter-office mail to nationwide distribution, we scale with you.",
    icon: Building2,
    tint: "from-slate-50 to-zinc-100 dark:from-slate-950/30 dark:to-zinc-900/20",
    eta: "SLA-defined",
    priceFrom: "₦50,000 / mo",
    highlights: [
      "Dedicated account manager & ops coordinator",
      "Custom SLA with financial penalties for breaches",
      "Branded vehicles available on request",
      "Monthly performance reports & analytics",
      "Invoice billing (30-day NET terms available)",
      "API & ERP integration for automated dispatch",
    ],
    features: [
      { title: "SLA Contracts", desc: "Define your own KPIs — on-time rate, response time, damage rate — backed by penalties." },
      { title: "Branded Fleet", desc: "Vehicles wrapped in your livery for a seamless brand experience at delivery." },
      { title: "ERP Integration", desc: "Connect SAP, Oracle, or any ERP via our REST API for fully automated dispatch." },
      { title: "Monthly Reporting", desc: "Detailed analytics: delivery success rates, average ETAs, cost-per-shipment breakdown." },
    ],
    bestFor: [
      { label: "Banks & Financial Institutions", desc: "Secure, auditable document and card delivery across branch networks." },
      { label: "FMCG & Retail Chains", desc: "Managed distribution to hundreds of outlets on a predictable schedule." },
      { label: "Telcos & Tech Companies", desc: "SIM card, device, and equipment distribution at scale." },
      { label: "NGOs & Development Organisations", desc: "Last-mile delivery of materials to field locations across Nigeria." },
    ],
    coverageAreas: [
      { zone: "Lagos Operations Hub", areas: ["All Lagos zones — primary base"], eta: "Same day" },
      { zone: "South West Region", areas: ["Ibadan", "Abeokuta", "Akure", "Ado-Ekiti", "Oshogbo"], eta: "24 hrs" },
      { zone: "Nationwide Network", areas: ["36 states + FCT via partner hubs"], eta: "Per SLA" },
    ],
    pricing: [
      { label: "SME Retainer", price: "₦50,000 / mo", description: "Up to 100 deliveries/month. Account manager, monthly report." },
      { label: "Business Retainer", price: "₦150,000 / mo", description: "Up to 400 deliveries. SLA contract, branded ops, API access.", popular: true },
      { label: "Enterprise", price: "Custom", description: "Unlimited volume. Dedicated fleet, ERP integration, full white-glove service." },
    ],
    useCases: [
      "Bank card and document delivery to customers",
      "FMCG nationwide distributor replenishment",
      "Inter-office mail and parcel management",
      "Telecoms SIM and device last-mile distribution",
      "Pharmaceutical supply chain management",
    ],
    process: [
      { step: "Discovery call", desc: "We map your logistics needs, volume, coverage, and current pain points." },
      { step: "SLA proposal", desc: "We draft a custom SLA with KPIs, penalties, and pricing within 48 hours." },
      { step: "Onboarding & integration", desc: "Account manager assigned; API or portal access configured in 3 – 5 days." },
      { step: "Go live & optimise", desc: "We begin operations and share a performance review after the first 30 days." },
    ],
    faqs: [
      {
        q: "What's the minimum contract term?",
        a: "Our SME Retainer starts with a 3-month minimum. Enterprise contracts are typically 12 months with a 60-day exit clause.",
      },
      {
        q: "Can we have our logo on the delivery vehicles?",
        a: "Yes — vehicle branding (full or partial wrap) is available on Business and Enterprise plans at a one-time setup cost.",
      },
      {
        q: "How do you handle volume spikes?",
        a: "We maintain a 30% surge capacity reserve. For planned spikes (sales events, product launches), notify us 72 hours ahead.",
      },
      {
        q: "What ERP systems do you integrate with?",
        a: "Our API is RESTful and works with SAP, Oracle NetSuite, Odoo, and any system that can make HTTP requests.",
      },
    ],
  },

  {
    slug: "warehouse-storage",
    title: "Warehouse & Storage",
    tagline: "Flexible storage in strategic Lagos locations, by the pallet.",
    description:
      "Don't tie up capital in owned warehouse space. Quick Reach Logistics offers short-term and long-term storage in secure, CCTV-monitored facilities across Lagos — with same-day dispatch on stored inventory.",
    icon: Archive,
    tint: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/20",
    eta: "Dispatch same day",
    priceFrom: "₦5,000 / pallet/mo",
    highlights: [
      "3 strategic Lagos warehouse locations",
      "Flexible billing: per pallet, per shelf, or per sqm",
      "CCTV monitored 24/7 with security personnel",
      "Stock management system with live inventory view",
      "Same-day dispatch of stored goods",
      "Goods-in-storage insurance included",
    ],
    features: [
      { title: "3 Locations", desc: "Apapa, Ojota, and Lekki warehouses — store close to where your customers are." },
      { title: "Flexible Terms", desc: "Weekly, monthly, or annual terms. Scale space up or down with 7 days' notice." },
      { title: "Live Inventory", desc: "Log in to our WMS portal to see stock levels, movement history, and dispatch status." },
      { title: "Same-Day Dispatch", desc: "Raise a dispatch order by 11 AM and your goods go out the same day." },
    ],
    bestFor: [
      { label: "E-commerce Brands", desc: "Hold stock in Lagos for faster same-day fulfilment without owning a warehouse." },
      { label: "Importers", desc: "Store cleared goods after port without rushing to find space." },
      { label: "Seasonal Businesses", desc: "Scale storage up during peak season and down in the off-season." },
      { label: "Manufacturers", desc: "Buffer stock between production runs and distribution." },
    ],
    coverageAreas: [
      { zone: "Apapa Facility", areas: ["Close to Tin Can & Apapa ports", "5,000 sqm, ground floor"], eta: "Dispatch same day" },
      { zone: "Ojota Facility", areas: ["Mainland central", "Easy access to Ikorodu Rd & 3rd Mainland"], eta: "Dispatch same day" },
      { zone: "Lekki Facility", areas: ["Lekki Phase 2", "Serves Island and Ajah corridor"], eta: "Dispatch same day" },
    ],
    pricing: [
      { label: "Shelf Storage", price: "₦2,500 / shelf/mo", description: "Small items. Ideal for beauty, electronics accessories, and FMCG." },
      { label: "Pallet Storage", price: "₦5,000 / pallet/mo", description: "Standard EUR pallet. Most popular for e-commerce brands.", popular: true },
      { label: "Dedicated Bay", price: "Custom", description: "Reserved floor space from 50 sqm. Annual term, full exclusivity." },
    ],
    useCases: [
      "E-commerce stock held for same-day fulfilment",
      "Import clearance overflow storage",
      "Seasonal peak inventory buffer",
      "Last-mile hub for corporate distribution clients",
      "Product launch staging and pre-distribution holding",
    ],
    process: [
      { step: "Choose a facility & size", desc: "Visit or call to inspect; select pallet count, shelf space, or sqm as needed." },
      { step: "Goods in", desc: "Deliver your stock; our team counts, scans, and logs every SKU into our WMS." },
      { step: "Manage via portal", desc: "Log in to view live stock levels, raise dispatch orders, or request a stock report." },
      { step: "Goods out", desc: "Dispatch orders raised before 11 AM go out same day with full tracking." },
    ],
    faqs: [
      {
        q: "Is there a minimum storage term?",
        a: "Our minimum term is 1 week. Monthly billing is our most popular option.",
      },
      {
        q: "What goods cannot be stored?",
        a: "Hazardous materials, illegal goods, live animals, and items requiring pharmaceutical-grade cold storage.",
      },
      {
        q: "How secure are the facilities?",
        a: "All three warehouses have 24/7 CCTV, access-controlled entry, and on-site security personnel. Goods are insured against fire and theft.",
      },
      {
        q: "Can I visit to do a stock count myself?",
        a: "Yes — book a stock audit visit during business hours (Mon–Sat, 8 AM – 5 PM) with 24 hours' notice.",
      },
    ],
  },

  {
    slug: "package-pickup",
    title: "Package Pickup",
    tagline: "We collect from anywhere so you don't have to move.",
    description:
      "Sending something but can't get to a drop-off point? Our dedicated pickup riders collect from any address in Lagos and feed your parcel into the right delivery stream — express, scheduled, or inter-state freight.",
    icon: Package,
    tint: "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20",
    eta: "Within 1 hr",
    priceFrom: "₦800",
    highlights: [
      "Rider at your location within 1 hour",
      "Available 7 AM – 10 PM daily",
      "Feeds into any delivery service seamlessly",
      "Packaging materials supplied on request",
      "Digital receipt issued at pickup",
      "Track from pickup to final delivery",
    ],
    features: [
      { title: "1-Hour Response", desc: "A rider is dispatched within 5 minutes of booking and reaches you in under 60 minutes." },
      { title: "Packaging Support", desc: "Need a box, bubble wrap, or tape? We bring basic packing materials at cost." },
      { title: "Digital Receipt", desc: "A timestamped pickup receipt is sent to your phone the moment the rider collects." },
      { title: "End-to-End Tracking", desc: "One tracking number follows your parcel from pickup to final delivery." },
    ],
    bestFor: [
      { label: "Busy Professionals", desc: "Can't leave the office? We come to you." },
      { label: "Online Sellers", desc: "List on Jiji or Jumia and let us handle collections without a drop-off trip." },
      { label: "Elderly & Mobility-Limited", desc: "Send parcels without the stress of finding a courier office." },
      { label: "Businesses with High Send Volume", desc: "Schedule a daily pickup so nothing waits on your desk." },
    ],
    coverageAreas: [
      { zone: "Lagos Island", areas: ["Victoria Island", "Ikoyi", "Lekki", "Ajah", "Lagos Island"], eta: "30 – 60 min" },
      { zone: "Lagos Mainland", areas: ["Ikeja", "Yaba", "Surulere", "Gbagada", "Agege"], eta: "45 – 60 min" },
      { zone: "Outer Lagos", areas: ["Ikorodu", "Badagry", "Epe corridor"], eta: "60 – 90 min" },
    ],
    pricing: [
      { label: "Single Pickup", price: "₦800", description: "One-off collection, any location within Lagos metro." },
      { label: "Daily Pickup", price: "₦3,500 / week", description: "One pickup per day, Mon–Sat. Ideal for online sellers.", popular: true },
      { label: "Multi-Parcel", price: "₦1,200", description: "Collect up to 5 separate parcels in one visit. Save on individual pickups." },
    ],
    useCases: [
      "Online marketplace seller daily collections",
      "Sending gifts without visiting a courier office",
      "Business daily outbound mail management",
      "Return items collected from home",
      "Urgent document pickup for same-day delivery",
    ],
    process: [
      { step: "Book pickup", desc: "Enter your address and parcel details — takes under 60 seconds." },
      { step: "Rider dispatched", desc: "A nearby rider is assigned instantly and heads to your location." },
      { step: "Handover & receipt", desc: "Hand over the parcel; a digital receipt arrives on your phone immediately." },
      { step: "Tracking begins", desc: "Your parcel enters our network. Track it all the way to delivery." },
    ],
    faqs: [
      {
        q: "What if my parcel isn't ready when the rider arrives?",
        a: "Riders will wait up to 10 minutes. If not ready, the pickup is rescheduled for the next available slot at no extra charge.",
      },
      {
        q: "Can I book a pickup for someone else's address?",
        a: "Yes — enter the pickup address during booking. The rider will call the contact number you provide.",
      },
      {
        q: "Do you supply packaging materials?",
        a: "Basic boxes (A5, A4, shoe-box size), bubble wrap, and tape are available for purchase. Order in advance when booking.",
      },
      {
        q: "Can I combine pickup with express delivery?",
        a: "Absolutely. Choose Express Delivery as your service and add a pickup — the rider collects and delivers in one seamless run.",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getService(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}