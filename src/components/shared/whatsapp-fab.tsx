import { MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/constants";

export function FloatingActions() {
  const wa = `https://wa.me/2347007363276?text=${encodeURIComponent("Hi Quick Reach Logistics, I'd like to book a delivery in Lagos.")}`;
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
        aria-label="Call Quick Reach Logistics"
        className="grid h-12 w-12 place-items-center rounded-full border bg-card text-foreground shadow-elevated transition-transform hover:scale-105"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-glow transition-transform hover:scale-105"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-bold">1</span>
      </a>
    </div>
  );
}
