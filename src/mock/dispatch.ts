/**
 * Mock dispatcher — pretends to be the future Express backend.
 * Each route matcher returns realistic JSON. When the real API is ready,
 * replace usages of this with `realRequest` in `api-client.ts` (one switch).
 */
import type { RequestOptions } from "@/lib/api-client";
import { ApiClientError } from "@/lib/api-client";
import {
  mockShipments, mockUser, mockAdmin, mockRiderUser, mockNotifications,
  mockInvoices, mockTickets, mockFleet, mockDrivers, mockAdminMetrics,
  mockRevenueSeries, mockZoneBreakdown, areaCoords,
} from "./data";
import type {
  Session, Shipment, QuoteInput, QuoteResult, PaymentIntent, PaymentProvider,
} from "@/types";

const sessionFor = (user = mockUser): Session => ({
  token: "mock.jwt." + Math.random().toString(36).slice(2),
  refreshToken: "mock.refresh." + Math.random().toString(36).slice(2),
  expiresAt: new Date(Date.now() + 3600_000).toISOString(),
  user,
});

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function buildQuote(input: QuoteInput): QuoteResult {
  const distanceKm = Math.max(3, Math.round(haversineKm(input.pickup.coords, input.destination.coords) * 10) / 10);
  const vehicleMult = { bike: 1, car: 1.2, van: 1.6, truck: 2.4, trailer: 3.8 }[input.vehicle];
  const urgencyMult = { standard: 1, same_day: 1.25, express: 1.6, scheduled: 1.05 }[input.urgency];
  const weight = Math.max(0, input.weightKg);

  const mk = (mult: number, name: any, perks: string[], recommended = false) => {
    const base = 1500;
    const distance = Math.round(distanceKm * 240 * vehicleMult);
    const weightFee = Math.round(weight * 55);
    const urgency = Math.round(base * (urgencyMult - 1) * mult);
    const insurance = input.insurance ? Math.round((input.declaredValue ?? 50000) * 0.015) : 0;
    const fuel = Math.round(distance * 0.12);
    const sub = (base + distance + weightFee + urgency + insurance + fuel) * mult;
    const vat = Math.round(sub * 0.075);
    const total = Math.round(sub + vat);
    return {
      id: `tier_${name.toLowerCase()}`,
      name,
      perks,
      recommended,
      pricing: {
        base, distance, weight: weightFee, vehicle: Math.round(800 * vehicleMult),
        urgency, insurance, fuel, vat, total, currency: "NGN" as const,
        distanceKm, etaMinutes: Math.round(18 + distanceKm * (urgency ? 2.2 : 2.8)),
      },
    };
  };

  return {
    id: "qt_" + Math.random().toString(36).slice(2, 9),
    createdAt: new Date().toISOString(),
    input,
    validUntil: new Date(Date.now() + 30 * 60_000).toISOString(),
    tiers: [
      mk(0.85, "Saver", ["Next-day delivery", "Email tracking", "Up to ₦20k cover"]),
      mk(1.0, "Standard", ["Same-day window", "Live tracking", "SMS updates"], true),
      mk(1.3, "Express", ["2–4 hour delivery", "Priority routing", "Premium handling"]),
      mk(1.65, "Priority", ["Dedicated rider", "Photo POD", "₦500k cover included"]),
    ],
  };
}

function getShipmentByCode(code: string): Shipment | undefined {
  return mockShipments.find((s) => s.trackingCode.toLowerCase() === code.toLowerCase());
}

export async function mockDispatch<T>(path: string, opts: RequestOptions): Promise<T> {
  const [route] = path.split("?");
  const seg = route.split("/").filter(Boolean);

  // AUTH
  if (route === "/auth/login" && opts.method === "POST") return sessionFor(mockUser) as T;
  if (route === "/auth/signup" && opts.method === "POST") return sessionFor(mockUser) as T;
  if (route === "/auth/me") return mockUser as T;
  if (route === "/auth/logout" && opts.method === "POST") return ({ ok: true } as unknown) as T;
  if (route === "/auth/otp/request" && opts.method === "POST") return ({ ok: true, channel: "sms" } as unknown) as T;
  if (route === "/auth/otp/verify" && opts.method === "POST") return sessionFor(mockUser) as T;
  if (route === "/auth/forgot-password" && opts.method === "POST") return ({ ok: true } as unknown) as T;

  // QUOTE
  if (route === "/quote" && opts.method === "POST") {
    return buildQuote(opts.body as QuoteInput) as T;
  }

  // SHIPMENTS / TRACKING
  if (route === "/shipments") return mockShipments as T;
  if (seg[0] === "shipments" && seg[1]) {
    const id = seg[1];
    const shp = mockShipments.find((s) => s.id === id) ?? mockShipments[0];
    return shp as T;
  }
  if (route === "/tracking" && opts.query?.code) {
    const shp = getShipmentByCode(String(opts.query.code));
    if (!shp) throw new ApiClientError("NOT_FOUND", "Tracking code not found", 404);
    return shp as T;
  }

  // BOOKINGS
  if (route === "/bookings" && opts.method === "POST") {
    const body = opts.body as Partial<Shipment>;
    const newShp: Shipment = {
      ...mockShipments[0],
      ...body,
      id: "shp_" + Math.random().toString(36).slice(2, 8),
      trackingCode: "SDR" + String(Math.floor(1000000 + Math.random() * 8999999)).slice(0, 7),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    } as Shipment;
    return newShp as T;
  }

  // PAYMENTS
  if (route === "/payments/intent" && opts.method === "POST") {
    const { amount, provider, shipmentId } = (opts.body ?? {}) as { amount: number; provider: PaymentProvider; shipmentId?: string };
    const intent: PaymentIntent = {
      id: "pi_" + Math.random().toString(36).slice(2, 9),
      amount, provider, shipmentId,
      currency: "NGN", status: "succeeded",
      createdAt: new Date().toISOString(),
      reference: "REF-" + Date.now(),
    };
    return intent as T;
  }
  if (route === "/payments/invoices") return mockInvoices as T;

  // NOTIFICATIONS
  if (route === "/notifications") return mockNotifications as T;

  // SUPPORT
  if (route === "/support/tickets") return mockTickets as T;

  // ADMIN
  if (route === "/admin/metrics") return mockAdminMetrics as T;
  if (route === "/admin/revenue") return mockRevenueSeries as T;
  if (route === "/admin/zones") return mockZoneBreakdown as T;
  if (route === "/admin/orders") return mockShipments as T;
  if (route === "/admin/drivers") return mockDrivers as T;
  if (route === "/admin/fleet") return mockFleet as T;
  if (route === "/admin/users") return [mockUser, mockAdmin, mockRiderUser] as T;

  // RIDER
  if (route === "/rider/me") return mockRiderUser as T;
  if (route === "/rider/deliveries") return mockShipments.slice(0, 8) as T;
  if (route === "/rider/earnings") {
    return ({
      week: Array.from({ length: 7 }).map((_, i) => ({
        day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
        amount: 12000 + Math.round(Math.random() * 18000),
        trips: 4 + Math.round(Math.random() * 8),
      })),
      total: 142_500,
      pending: 38_000,
    } as unknown) as T;
  }

  // areaCoords helper exposure (used by quote form for autocomplete)
  if (route === "/geo/areas") {
    return Object.entries({
      "Lekki Phase 1": areaCoords("Lekki Phase 1"),
      "Victoria Island": areaCoords("Victoria Island"),
    }) as unknown as T;
  }

  throw new ApiClientError("NOT_FOUND", `No mock handler for ${opts.method ?? "GET"} ${path}`, 404);
}
