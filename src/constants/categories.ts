import {
  Apple, Shirt, Sparkles, Scissors, Smartphone, Tv, FileText, Stethoscope,
  Briefcase, Sofa, Gift, Boxes, type LucideIcon,
} from "lucide-react";

export interface DeliveryCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  blurb: string;
  bullets: string[];
  tint: string; // tailwind gradient classes
}

export const DELIVERY_CATEGORIES: DeliveryCategory[] = [
  { id: "food", name: "Food & Groceries", icon: Apple, blurb: "Fast delivery to keep products fresh.", bullets: ["Fresh food", "Restaurant supplies", "Supermarket items"], tint: "from-orange-400/30 to-rose-400/20" },
  { id: "fashion", name: "Fashion & Apparel", icon: Shirt, blurb: "Careful handling for boutique-ready arrivals.", bullets: ["Clothes", "Shoes", "Bags", "Accessories"], tint: "from-pink-400/30 to-fuchsia-400/20" },
  { id: "beauty", name: "Beauty Products", icon: Sparkles, blurb: "Climate-aware handling for sensitive items.", bullets: ["Cosmetics", "Makeup", "Skincare"], tint: "from-rose-300/30 to-amber-300/20" },
  { id: "hair", name: "Human Hair & Wigs", icon: Scissors, blurb: "Secure delivery for wigs, bundles, and premium hair.", bullets: ["Wigs", "Extensions", "Hair products"], tint: "from-amber-400/30 to-orange-300/20" },
  { id: "electronics", name: "Electronics", icon: Smartphone, blurb: "Safe transportation with extra protective handling.", bullets: ["Phones", "Laptops", "Gadgets"], tint: "from-sky-400/30 to-indigo-400/20" },
  { id: "appliances", name: "Home Appliances", icon: Tv, blurb: "Van & truck options for bulky items.", bullets: ["TVs", "Refrigerators", "Washing machines"], tint: "from-cyan-400/30 to-blue-400/20" },
  { id: "documents", name: "Documents", icon: FileText, blurb: "Confidential document delivery with signature confirmation.", bullets: ["Contracts", "Certificates", "Office files"], tint: "from-emerald-400/30 to-teal-400/20" },
  { id: "medical", name: "Medical Supplies", icon: Stethoscope, blurb: "Time-critical pharmacy and medical shipments.", bullets: ["Prescriptions", "Pharmacy items", "Equipment"], tint: "from-red-400/30 to-orange-400/20" },
  { id: "office", name: "Office & Business", icon: Briefcase, blurb: "Recurring stationery and inventory runs.", bullets: ["Stationery", "Business inventory", "Equipment"], tint: "from-slate-400/30 to-zinc-400/20" },
  { id: "furniture", name: "Furniture", icon: Sofa, blurb: "Mini-truck and trailer fleet for big drops.", bullets: ["Chairs", "Tables", "Office furniture"], tint: "from-amber-500/30 to-yellow-400/20" },
  { id: "gifts", name: "Gifts & Personal", icon: Gift, blurb: "White-glove care for thoughtful arrivals.", bullets: ["Birthday gifts", "Packages", "Care packages"], tint: "from-violet-400/30 to-purple-400/20" },
  { id: "bulk", name: "Bulk Goods", icon: Boxes, blurb: "Wholesale and distributor stock at scale.", bullets: ["Cartons", "Wholesale", "Distributor stock"], tint: "from-lime-400/30 to-emerald-400/20" },
];
