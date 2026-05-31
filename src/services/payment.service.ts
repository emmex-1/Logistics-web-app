import { apiRequest } from "@/lib/api-client";
import type { Invoice, PaymentIntent, PaymentProvider } from "@/types";

export const paymentService = {
  invoices: () => apiRequest<Invoice[]>("/payments/invoices"),
  createIntent: (data: { amount: number; provider: PaymentProvider; shipmentId?: string }) =>
    apiRequest<PaymentIntent>("/payments/intent", { method: "POST", body: data, latencyMs: 1100 }),
};
