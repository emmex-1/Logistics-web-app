import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/shared/app-shell";
import { LayoutDashboard, Package, Wallet, History, Settings, Bell, Camera, AlertTriangle, Inbox } from "lucide-react";

const items: NavItem[] = [
  { to: "/rider", label: "Today", icon: LayoutDashboard },
  { to: "/rider/jobs", label: "Available jobs", icon: Inbox },
  { to: "/rider/deliveries", label: "Deliveries", icon: Package },
  { to: "/rider/pod", label: "Proof of delivery", icon: Camera },
  { to: "/rider/issues", label: "Report issue", icon: AlertTriangle },
  { to: "/rider/earnings", label: "Earnings", icon: Wallet },
  { to: "/rider/history", label: "History", icon: History },
  { to: "/rider/notifications", label: "Notifications", icon: Bell },
  { to: "/rider/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/rider")({
  head: () => ({ meta: [{ title: "Rider — Quick Reach Logistics" }] }),
  component: () => <AppShell items={items} accentLabel="Rider" title="Rider portal"><Outlet /></AppShell>,
});
