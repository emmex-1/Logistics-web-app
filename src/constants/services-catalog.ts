import {
  Bike, Zap, UserCheck, ShoppingBag, Building2, Layers, CalendarClock, FileText,
  type LucideIcon,
} from "lucide-react";

export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  priceFrom: string;
  eta: string;
  tint: string; // tailwind gradient classes
  highlights: string[];
  features: { title: string; desc: string }[];
  useCases: string[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "same-day-delivery",
    title: "Same-Day Delivery",
    tagline: "Picked up this morning. Delivered before close of business.",
    description:
      "Door-to-door same-day delivery across all 20 Lagos LGAs. Book before 2pm and we drop before 6pm — guaranteed, or your delivery fee back.",
    icon: Bike,
    priceFrom: "₦2,500",
    eta: "Under 8 hours",
    tint: "from-orange-500/15 to-amber-400/5",
    highlights: ["Drop before 6pm", "Live GPS tracking", "₦100,000 insurance included", "Photo proof of delivery"],
    features: [
      { title: "Citywide coverage", desc: "Every LGA from Badagry to Ikorodu, Lekki to Agege." },
      { title: "Real-time updates", desc: "WhatsApp + in-app notifications at every status change." },
      { title: "Cash on delivery", desc: "Collect from your recipient on your behalf, settled next day." },
      { title: "Flexible payment", desc: "Pay with card, transfer, USSD, or wallet balance." },
    ],
    useCases: [
      "E-commerce orders that need to ship today",
      "Restaurant and grocery batch deliveries",
      "Urgent personal items between family",
      "Replacement parts across the city",
    ],
    process: [
      { step: "Book", desc: "Enter pickup, drop-off and item details in under 60 seconds." },
      { step: "Match", desc: "We assign the closest verified rider in under 5 minutes." },
      { step: "Pickup", desc: "Rider arrives, photo-verifies the parcel, and heads out." },
      { step: "Deliver", desc: "Recipient signs / OTP confirms. You get the POD instantly." },
    ],
    faqs: [
      { q: "What's the cut-off time?", a: "Book by 2pm for guaranteed same-day. After 2pm we'll attempt same-day; otherwise it ships first thing the next morning at no extra charge." },
      { q: "What if my package is damaged?", a: "Every same-day delivery includes ₦100,000 of free insurance. Claims are processed in 48 hours." },
    ],
  },
  {
    slug: "express-delivery",
    title: "Express Delivery",
    tagline: "Time-critical drops in under 3 hours, anywhere in Lagos.",
    description:
      "When same-day isn't fast enough. A dedicated rider routes directly from pickup to drop-off — no consolidations, no detours.",
    icon: Zap,
    priceFrom: "₦7,200",
    eta: "90 min – 3 hours",
    tint: "from-rose-500/15 to-orange-400/5",
    highlights: ["Dedicated rider", "Direct routing", "Priority dispatch", "₦250,000 insurance"],
    features: [
      { title: "Sub-3-hour SLA", desc: "Strict service-level agreement with money-back guarantee." },
      { title: "Senior fleet", desc: "Only riders with 500+ completed deliveries handle express jobs." },
      { title: "Live ETA", desc: "Watch the rider's exact position from pickup to drop-off." },
      { title: "White-glove handling", desc: "Sealed pouches, signature-required handoff." },
    ],
    useCases: [
      "Last-minute contracts and legal documents",
      "Forgotten passports and travel papers",
      "Spare keys, medical prescriptions",
      "High-value retail to walk-in customers",
    ],
    process: [
      { step: "Request", desc: "Tap Express in the booking flow." },
      { step: "Dispatch", desc: "Senior rider assigned within 90 seconds." },
      { step: "Direct route", desc: "No stops in between — straight there." },
      { step: "Confirm", desc: "OTP-verified handoff with instant receipt." },
    ],
    faqs: [
      { q: "How fast is express really?", a: "Median delivery time on express orders is 2 hours 12 minutes across Lagos mainland and island." },
      { q: "Can I track the rider live?", a: "Yes — express orders show second-by-second GPS in your dashboard." },
    ],
  },
  {
    slug: "dispatch-rider",
    title: "Dispatch Rider Services",
    tagline: "Your own dispatch rider, on call — without the HR overhead.",
    description:
      "Dedicated bike riders by the hour, day, or month. Perfect for businesses that need consistent same-day capacity without hiring full-time.",
    icon: UserCheck,
    priceFrom: "₦18,000/day",
    eta: "Same-day onboarding",
    tint: "from-blue-500/15 to-cyan-400/5",
    highlights: ["Hourly, daily, monthly", "Same rider, every day", "Branded uniform optional", "Replaced in 30 min if absent"],
    features: [
      { title: "Consistent rider", desc: "Same person every day so they learn your routes and customers." },
      { title: "Backup guaranteed", desc: "If your rider is unavailable, we swap in a vetted replacement in 30 minutes." },
      { title: "Branded option", desc: "Co-branded jackets and bike boxes available for monthly plans." },
      { title: "Daily reporting", desc: "End-of-day summary: trips, distance, expenses, customer feedback." },
    ],
    useCases: [
      "Pharmacy and clinic prescription runs",
      "Bank and POS cash pickups",
      "Office errands and inter-branch mail",
      "Restaurants without in-house delivery",
    ],
    process: [
      { step: "Pick a plan", desc: "Hourly (4hr min), daily, or monthly." },
      { step: "Brief us", desc: "Tell us your typical routes and rider preferences." },
      { step: "Rider matched", desc: "Onboarded and ready within 24 hours." },
      { step: "Run your ops", desc: "Manage the rider through your dashboard." },
    ],
    faqs: [
      { q: "Can I keep the same rider long-term?", a: "Yes — monthly plans assign one named rider with a contractual replacement guarantee." },
      { q: "What if I only need 2 hours?", a: "Hourly bookings start at a 4-hour minimum to ensure rider income stability." },
    ],
  },
  {
    slug: "ecommerce-delivery",
    title: "E-commerce Delivery",
    tagline: "Built for online stores that ship 10 to 10,000 orders a day.",
    description:
      "API-first delivery for Shopify, WooCommerce, Selar and custom storefronts. Bulk dispatch, COD reconciliation, branded tracking pages.",
    icon: ShoppingBag,
    priceFrom: "₦1,800/order",
    eta: "Same-day or next-day",
    tint: "from-purple-500/15 to-pink-400/5",
    highlights: ["Shopify + WooCommerce plugins", "Bulk CSV upload", "COD with next-day settlement", "Branded tracking page"],
    features: [
      { title: "One-click integration", desc: "Plug into Shopify, WooCommerce, Paystack Storefront in under 10 minutes." },
      { title: "Bulk dispatch", desc: "Upload a CSV of 500 orders, we batch them by zone automatically." },
      { title: "COD reconciliation", desc: "Cash collected by riders settles to your account every 24 hours." },
      { title: "Return logistics", desc: "Failed deliveries auto-routed back; you pay nothing for the round trip." },
    ],
    useCases: [
      "DTC fashion and beauty brands",
      "Marketplaces and aggregators",
      "Social commerce sellers (Instagram, TikTok shops)",
      "Subscription box services",
    ],
    process: [
      { step: "Connect", desc: "Install plugin or upload your first CSV." },
      { step: "Print labels", desc: "Auto-generated waybills and tracking codes." },
      { step: "We pick up", desc: "Daily scheduled pickup from your warehouse." },
      { step: "Customers track", desc: "Branded tracking page with your logo and colours." },
    ],
    faqs: [
      { q: "Do you handle COD?", a: "Yes — riders collect cash or transfer, we reconcile and settle to your bank next business day." },
      { q: "What's the failed-delivery rate?", a: "Industry-leading 3.1% across Lagos thanks to OTP verification and pre-delivery WhatsApp confirmation." },
    ],
  },
  {
    slug: "business-logistics",
    title: "Business Logistics",
    tagline: "Enterprise-grade logistics for SMEs and corporates.",
    description:
      "Dedicated account manager, custom SLAs, monthly invoicing, multi-user access. Built for businesses moving freight at scale.",
    icon: Building2,
    priceFrom: "Custom",
    eta: "SLA-defined",
    tint: "from-emerald-500/15 to-teal-400/5",
    highlights: ["Dedicated account manager", "Monthly invoicing", "Multi-user dashboard", "Custom SLAs"],
    features: [
      { title: "Account manager", desc: "Named human who knows your business, on WhatsApp during business hours." },
      { title: "Net-30 invoicing", desc: "Consolidated monthly invoices, no per-trip prepayment required." },
      { title: "Team accounts", desc: "Unlimited users with role-based permissions and spend caps." },
      { title: "API access", desc: "REST + webhooks for full automation into your ERP / OMS." },
    ],
    useCases: [
      "FMCG distributors",
      "Pharma and medical supplies",
      "Manufacturing and B2B parts",
      "Construction and project logistics",
    ],
    process: [
      { step: "Discovery call", desc: "We map your routes, volumes and SLAs." },
      { step: "Proposal", desc: "Custom rate card and contract within 48 hours." },
      { step: "Onboarding", desc: "Team trained, dashboard provisioned, API keys issued." },
      { step: "Go live", desc: "Account manager monitors first 30 days closely." },
    ],
    faqs: [
      { q: "What's the minimum volume?", a: "Enterprise plans start at 200 deliveries / month or ₦500,000 monthly spend." },
      { q: "Can you handle inter-state?", a: "Yes — we partner with vetted long-haul carriers for Lagos–Ibadan, Lagos–Abuja, and PH corridors." },
    ],
  },
  {
    slug: "bulk-multi-stop",
    title: "Bulk & Multi-Stop",
    tagline: "One pickup, many drops. Optimised routing built in.",
    description:
      "Plan deliveries to 5, 50, or 500 destinations from a single pickup. Our routing engine sequences stops for minimum time and cost.",
    icon: Layers,
    priceFrom: "₦8,500",
    eta: "Same-day to 48 hours",
    tint: "from-yellow-500/15 to-orange-400/5",
    highlights: ["Up to 500 stops", "Auto-route optimisation", "Per-stop POD", "Live stop tracker"],
    features: [
      { title: "Route optimisation", desc: "Our engine cuts total distance by an average of 28% vs naive sequencing." },
      { title: "Per-stop status", desc: "Each recipient gets their own tracking link with live ETA." },
      { title: "Mixed cargo", desc: "Combine bikes for small parcels with vans for bulkier stops on one run." },
      { title: "Failed-stop handling", desc: "Auto-retry, return, or hold-at-hub policies you control." },
    ],
    useCases: [
      "Event giveaways and brand activations",
      "HR and admin gift distribution",
      "Multi-branch document circulation",
      "Wholesale distribution to retailers",
    ],
    process: [
      { step: "Upload stops", desc: "CSV, paste, or pin on map." },
      { step: "Optimise", desc: "Engine sequences route and quotes total." },
      { step: "Dispatch", desc: "One or many riders deployed by capacity." },
      { step: "Track all", desc: "Watch every stop complete in one view." },
    ],
    faqs: [
      { q: "How many stops can one rider handle?", a: "Bikes: up to 15 small-parcel stops per shift. Vans: up to 40 stops." },
      { q: "Can I add stops after dispatch?", a: "Yes — add stops mid-route and we'll re-optimise on the fly." },
    ],
  },
  {
    slug: "scheduled-pickups",
    title: "Scheduled Pickups",
    tagline: "Set it once. We show up — daily, weekly, monthly.",
    description:
      "Recurring pickups at the same time, same place. Perfect for businesses with predictable outbound volume.",
    icon: CalendarClock,
    priceFrom: "₦45,000/mo",
    eta: "Scheduled window",
    tint: "from-indigo-500/15 to-blue-400/5",
    highlights: ["Recurring schedules", "30-min pickup window", "Same rider weekly", "Pause anytime"],
    features: [
      { title: "Flexible cadence", desc: "Daily, weekday-only, weekly, or custom days of month." },
      { title: "Tight windows", desc: "30-minute pickup windows so you can plan packing." },
      { title: "Pause & resume", desc: "Holidays or low-volume weeks? Pause from the dashboard in one click." },
      { title: "Volume discount", desc: "Effective rates 20-35% lower than ad-hoc same-day." },
    ],
    useCases: [
      "Daily warehouse outbound for online stores",
      "Weekly document collection for accountants",
      "Restaurant supply runs",
      "Monthly inter-branch transfers",
    ],
    process: [
      { step: "Set schedule", desc: "Pick days, times, and addresses." },
      { step: "We confirm", desc: "Rider auto-assigned, you get a calendar invite." },
      { step: "Recurring", desc: "Pickups happen on autopilot." },
      { step: "Invoice monthly", desc: "One consolidated bill at month-end." },
    ],
    faqs: [
      { q: "Is there a minimum commitment?", a: "Monthly plans run month-to-month with 7-day cancellation. No annual lock-in." },
      { q: "What if my pickup volume changes?", a: "Adjust frequency or vehicle size any time from the dashboard." },
    ],
  },
  {
    slug: "document-parcel",
    title: "Document & Parcel",
    tagline: "Small, sensitive, urgent. Handled with care.",
    description:
      "Specialised handling for documents, contracts, IDs and small parcels — sealed pouches, signature required, full chain of custody.",
    icon: FileText,
    priceFrom: "₦1,500",
    eta: "Under 90 minutes",
    tint: "from-slate-500/15 to-zinc-400/5",
    highlights: ["Sealed tamper-evident pouches", "Signature required", "Chain-of-custody log", "Discreet handling"],
    features: [
      { title: "Tamper-evident pouches", desc: "Sealed at pickup, opened only by recipient — full audit trail." },
      { title: "Signature + ID check", desc: "Recipient signs and shows photo ID on sensitive documents." },
      { title: "Chain of custody", desc: "Every handoff timestamped and photographed in your dashboard." },
      { title: "Embassy & legal", desc: "Experience with visa packets, court filings, and bank documents." },
    ],
    useCases: [
      "Contracts and signed agreements",
      "Visa applications and travel documents",
      "Bank cards, chequebooks, ID cards",
      "Legal filings and court documents",
    ],
    process: [
      { step: "Book", desc: "Select Document & Parcel and add recipient details." },
      { step: "Sealed pickup", desc: "Rider seals your document in a tamper-evident pouch on site." },
      { step: "Secure transit", desc: "GPS-tracked, no consolidations, direct route." },
      { step: "Verified handoff", desc: "Recipient signs, IDs, and unseals on camera." },
    ],
    faqs: [
      { q: "Can you deliver to embassies?", a: "Yes — we handle most Lagos embassies and have experience with visa application drop-offs and pickups." },
      { q: "What's the max value covered?", a: "Standard cover is ₦100,000. Upgrade to ₦5,000,000 for an extra ₦2,500 per shipment." },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
