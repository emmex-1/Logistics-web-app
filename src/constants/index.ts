export const BRAND = {
  name: "Sendaro",
  tagline: "Lagos moves faster with Sendaro.",
  description:
    "Premium logistics for Lagos — same-day deliveries, fleet on demand, and real-time tracking across all 20 LGAs.",
  phone: "+234 700 SENDARO",
  email: "hello@sendaro.ng",
  address: "12B Admiralty Way, Lekki Phase 1, Lagos",
  social: {
    twitter: "https://twitter.com/sendaro",
    instagram: "https://instagram.com/sendaro",
    linkedin: "https://linkedin.com/company/sendaro",
  },
} as const;

export const LAGOS_LGAS = [
  "Ikeja", "Lekki", "Victoria Island", "Ikoyi", "Yaba", "Surulere",
  "Apapa", "Ajah", "Mushin", "Oshodi", "Agege", "Alimosho",
  "Amuwo Odofin", "Badagry", "Epe", "Ibeju", "Ifako-Ijaiye",
  "Kosofe", "Mainland", "Ojo",
] as const;

export const VEHICLE_LABELS = {
  bike: "Motorbike",
  car: "Car / Sedan",
  van: "Van",
  truck: "Mini Truck",
  trailer: "Long Haul Trailer",
} as const;

export const URGENCY_LABELS = {
  standard: "Standard (next day)",
  same_day: "Same Day",
  express: "Express (2-4hrs)",
  scheduled: "Scheduled",
} as const;

export const CARGO_LABELS = {
  documents: "Documents",
  parcel: "Parcel",
  electronics: "Electronics",
  food: "Food & Perishables",
  fragile: "Fragile",
  furniture: "Furniture",
  pallet: "Pallet",
  container: "Container",
} as const;

export const SHIPMENT_STATUS_LABELS = {
  draft: "Draft",
  pending_payment: "Pending Payment",
  confirmed: "Confirmed",
  rider_assigned: "Rider Assigned",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  failed: "Failed",
  cancelled: "Cancelled",
  returned: "Returned",
} as const;

export const NGN = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
