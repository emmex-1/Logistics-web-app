import { cn } from "@/lib/utils";

export function Logo({ className, mark = false }: { className?: string; mark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 overflow-hidden rounded-lg shadow-glow">
        <img
          src="/media/qol.jpg"
          alt="Quick Reach Logistics Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {!mark && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          Quick Reach Logistics
        </span>
      )}
    </div>
  );
}