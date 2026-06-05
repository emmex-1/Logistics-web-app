import { MessageCircle } from "lucide-react";

export function FloatingActions() {
  const wa = `https://wa.me/2349023215226?text=${encodeURIComponent("Hi Quick Reach Logistics, I'd like to book a delivery in Lagos.")}`;
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-glow transition-transform hover:scale-105"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
