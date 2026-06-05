import { motion } from "framer-motion";
import { Truck, Package } from "lucide-react";

/**
 * Premium animated Lagos logistics map.
 * SVG only — no external map dep. Used in hero + coverage sections.
 */
export function AnimatedRouteMap({ className = "" }: { className?: string }) {
  return (
    <div className={"relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-card shadow-elevated " + className}>
      {/* Soft Lagos topology backdrop */}
      <div className="absolute inset-0 gradient-radial-primary" />
      <div className="absolute inset-0 dot-bg opacity-50" />
      <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.245 27)" />
            <stop offset="100%" stopColor="oklch(0.66 0.23 30)" />
          </linearGradient>
          <radialGradient id="ping">
            <stop offset="0%" stopColor="oklch(0.58 0.245 27 / 0.7)" />
            <stop offset="100%" stopColor="oklch(0.58 0.245 27 / 0)" />
          </radialGradient>
        </defs>

        {/* island outline (very stylized) */}
        <path
          d="M40 360 Q140 320 220 340 T420 320 T620 360 T780 320"
          fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="80" strokeLinecap="round"
        />

        {/* Route 1 — Lekki -> Ikeja */}
        <path
          id="r1"
          d="M120 460 C 240 380, 340 480, 460 340 S 660 220, 720 180"
          stroke="url(#route)" strokeWidth="3" fill="none" strokeDasharray="8 8"
          className="animate-route"
        />
        {/* Route 2 — VI -> Yaba */}
        <path
          d="M200 380 C 300 320, 360 300, 440 240"
          stroke="oklch(0.55 0.13 240)" strokeOpacity="0.6" strokeWidth="2" fill="none"
          strokeDasharray="6 8" className="animate-route"
        />

        {/* Nodes */}
        {[
          [120, 460, "Lekki"],
          [200, 380, "VI"],
          [460, 340, "Yaba"],
          [720, 180, "Ikeja"],
          [560, 460, "Ajah"],
        ].map(([x, y, label], i) => (
          <g key={label as string}>
            <circle cx={x as number} cy={y as number} r="22" fill="url(#ping)" className="animate-pulse-glow" style={{ animationDelay: `${i * 0.3}s` }} />
            <circle cx={x as number} cy={y as number} r="5" fill="oklch(0.58 0.245 27)" />
            <text x={(x as number) + 12} y={(y as number) - 8} className="fill-foreground text-[12px] font-medium font-display">
              {label}
            </text>
          </g>
        ))}

        {/* Moving truck along route 1 */}
        <g>
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
            <mpath href="#r1" />
          </animateMotion>
          <g transform="translate(-10 -10)">
            <rect width="20" height="14" rx="3" fill="oklch(0.18 0.02 50)" />
            <rect x="2" y="2" width="10" height="10" rx="1.5" fill="oklch(0.58 0.245 27)" />
          </g>
        </g>
      </svg>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="absolute left-5 top-5 glass-strong flex items-center gap-3 rounded-xl px-3.5 py-2.5 shadow-card"
      >
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Truck className="h-4 w-4" />
        </div>
        <div>
          <div className="font-display text-sm font-semibold leading-tight">Rider en route</div>
          <div className="text-xs text-muted-foreground">ETA 6 min · Lekki → VI</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="absolute bottom-5 right-5 glass-strong flex items-center gap-3 rounded-xl px-3.5 py-2.5 shadow-card"
      >
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-success text-success-foreground">
          <Package className="h-4 w-4" />
        </div>
        <div>
          <div className="font-display text-sm font-semibold leading-tight">Delivered — SDR9047</div>
          <div className="text-xs text-muted-foreground">Ikeja GRA · 2 min ago</div>
        </div>
      </motion.div>
    </div>
  );
}
