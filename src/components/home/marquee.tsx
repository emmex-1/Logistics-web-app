import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Horizontal infinite marquee. Children render twice for seamless loop. */
export function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max animate-marquee-x gap-10",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/** Vertical infinite marquee column — used by the services section image stacks. */
export function VerticalMarquee({
  children,
  speed = 22,
  reverse = false,
  className,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden scroll-mask-y", className)}>
      <div
        className={cn("flex w-full flex-col gap-4", reverse ? "animate-marquee-y-rev" : "animate-marquee-y")}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 flex-col gap-4">{children}</div>
        <div className="flex shrink-0 flex-col gap-4" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
