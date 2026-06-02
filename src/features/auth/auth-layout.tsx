import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { AnimatedRouteMap } from "@/components/shared/animated-route-map";
import type { ReactNode } from "react";

export function AuthLayout({
  title, subtitle, children, footer,
}: { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden flex-col justify-between overflow-hidden gradient-primary p-10 text-primary-foreground lg:flex">
        <Link to="/"><Logo /></Link>
        <div className="absolute inset-0 noise opacity-10" />
        <div className="relative mt-auto">
          <h2 className="font-display text-4xl font-semibold leading-tight">
            The fastest way to move <br /> anything across Lagos.
          </h2>
          <p className="mt-4 max-w-md text-primary-foreground/85">Join 18,000+ Lagos businesses already shipping with Sendaro.</p>
          <div className="mt-8 max-w-md">
            <AnimatedRouteMap />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
          <Link to="/" className="lg:hidden"><Logo /></Link>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}
