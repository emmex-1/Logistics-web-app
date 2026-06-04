import { cn } from "@/lib/utils";

export function Logo({ className, mark = false }: { className?: string; mark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg gradient-primary shadow-glow">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17h14M5 12h9M5 7h6" />
          <path d="M14 12l4-5 5 7-3 3" />
        </svg>
      </div>
      {!mark && <span className="font-display text-lg font-semibold tracking-tight text-white">Quick Reach Logistics</span>}
    </div>
  );
}
