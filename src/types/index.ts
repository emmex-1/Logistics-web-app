/**
 * Domain models for Quick Reach Logistics.
 * Mirrors what the future Express + PostgreSQL/Prisma backend will return.
 * Services consume and return these types; UI never touches raw fetch payloads.
 */

export type ID = string;
export type ISODate = string;

// ---------- Auth & Users ----------
export type Role = "customer" | "rider" | "admin" | "dispatcher";

export interface User {
  id: ID;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  avatarUrl?: string;
  createdAt: ISODate;
  twoFactorEnabled?: boolean;
}

export interface Session {
  token: string;
  refreshToken: string;
  expiresAt: ISODate;
  user: User;
}

// ---------- Geo ----------
export interface LatLng { lat: number; lng: number }
export interface Address {
  label: string;
  street: string;
  area: string;     // e.g. Lekki Phase 1
  city: string;     // Lagos
  state: string;    // Lagos
  lga?: string;     // Local Government Area
  coords: LatLng;
  contactName?: string;
  contactPhone?: string;
  instructions?: string;
}

// ---------- Quote / Booking / Shipment ----------
export type VehicleType = "bike" | "car" | "van" | "truck" | "trailer";
export type Urgency = "standard" | "same_day" | "express" | "scheduled";
export type CargoType =
  | "documents" | "parcel" | "electronics" | "food"
  | "fragile" | "furniture" | "pallet" | "container";

export interface QuoteInput {
  pickup: Pick<Address, "area" | "coords">;
  destination: Pick<Address, "area" | "coords">;
  cargo: CargoType;
  weightKg: number;
  vehicle: VehicleType;
  urgency: Urgency;
  insurance: boolean;
  declaredValue?: number;
}

export interface PricingBreakdown {
  base: number;
  distance: number;
  weight: number;
  vehicle: number;
  urgency: number;
  insurance: number;
  fuel: number;
  vat: number;
  total: number;
  currency: "NGN";
  distanceKm: number;
  etaMinutes: number;
}

export interface QuoteTier {
  id: ID;
  name: "Saver" | "Standard" | "Express" | "Priority";
  pricing: PricingBreakdown;
  perks: string[];
  recommended?: boolean;
}

export interface QuoteResult {
  id: ID;
  createdAt: ISODate;
  input: QuoteInput;
  tiers: QuoteTier[];
  validUntil: ISODate;
}

export type ShipmentStatus =
  | "draft" | "pending_payment" | "confirmed"
  | "rider_assigned" | "picked_up" | "in_transit"
  | "out_for_delivery" | "delivered" | "failed" | "cancelled" | "returned";

export interface ShipmentEvent {
  id: ID;
  at: ISODate;
  status: ShipmentStatus;
  title: string;
  description?: string;
  location?: string;
  coords?: LatLng;
}

export interface POD {
  signatureUrl?: string;
  photos: string[];
  receivedBy: string;
  receivedAt: ISODate;
  notes?: string;
}

export interface Driver {
  id: ID;
  name: string;
  phone: string;
  avatarUrl?: string;
  rating: number;
  trips: number;
  vehicle: { type: VehicleType; plate: string; model: string };
}

export interface Shipment {
  id: ID;
  trackingCode: string;
  status: ShipmentStatus;
  createdAt: ISODate;
  scheduledFor?: ISODate;
  pickup: Address;
  destination: Address;
  cargo: CargoType;
  weightKg: number;
  vehicle: VehicleType;
  urgency: Urgency;
  insurance: boolean;
  pricing: PricingBreakdown;
  driver?: Driver;
  currentLocation?: LatLng;
  etaMinutes?: number;
  events: ShipmentEvent[];
  pod?: POD;
  customerId: ID;
}

export interface BookingDraft extends Partial<Omit<Shipment, "id" | "events" | "status">> {
  step: number;
}

// ---------- Payments ----------
export type PaymentProvider = "paystack" | "flutterwave" | "wallet" | "transfer" | "ussd";
export type PaymentStatus = "pending" | "processing" | "succeeded" | "failed" | "refunded";

export interface PaymentIntent {
  id: ID;
  amount: number;
  currency: "NGN";
  provider: PaymentProvider;
  status: PaymentStatus;
  shipmentId?: ID;
  createdAt: ISODate;
  reference: string;
}

export interface Invoice {
  id: ID;
  number: string;
  amount: number;
  status: "paid" | "unpaid" | "overdue";
  issuedAt: ISODate;
  dueAt: ISODate;
  shipmentId?: ID;
}

// ---------- Notifications / Support ----------
export interface Notification {
  id: ID;
  title: string;
  body: string;
  at: ISODate;
  read: boolean;
  type: "shipment" | "payment" | "system" | "promo";
}

export interface SupportTicket {
  id: ID;
  subject: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: ISODate;
  lastMessageAt: ISODate;
  shipmentId?: ID;
}

// ---------- Admin / Fleet ----------
export interface FleetVehicle {
  id: ID;
  plate: string;
  type: VehicleType;
  model: string;
  status: "active" | "maintenance" | "idle" | "retired";
  driverId?: ID;
  lastService: ISODate;
  odometerKm: number;
  fuelLevel: number; // 0-100
}

export interface AdminMetric {
  label: string;
  value: number;
  delta: number;     // % vs prior period
  spark?: number[];
  format?: "currency" | "number" | "percent";
}

// ---------- API envelope ----------
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
export type AsyncResult<T> = Promise<T>;
