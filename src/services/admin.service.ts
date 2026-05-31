import { apiRequest } from "@/lib/api-client";
import type { AdminMetric, Driver, FleetVehicle, Shipment, User } from "@/types";

export const adminService = {
  metrics: () => apiRequest<AdminMetric[]>("/admin/metrics"),
  revenue: () => apiRequest<{ month: string; revenue: number; deliveries: number }[]>("/admin/revenue"),
  zones: () => apiRequest<{ zone: string; value: number }[]>("/admin/zones"),
  orders: () => apiRequest<Shipment[]>("/admin/orders"),
  drivers: () => apiRequest<Driver[]>("/admin/drivers"),
  fleet: () => apiRequest<FleetVehicle[]>("/admin/fleet"),
  users: () => apiRequest<User[]>("/admin/users"),
};

export const riderService = {
  me: () => apiRequest<User>("/rider/me"),
  deliveries: () => apiRequest<Shipment[]>("/rider/deliveries"),
  earnings: () => apiRequest<{
    week: { day: string; amount: number; trips: number }[];
    total: number; pending: number;
  }>("/rider/earnings"),
};

export const notificationService = {
  list: () => apiRequest<import("@/types").Notification[]>("/notifications"),
};

export const supportService = {
  tickets: () => apiRequest<import("@/types").SupportTicket[]>("/support/tickets"),
};
