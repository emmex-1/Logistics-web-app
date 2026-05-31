import { apiRequest } from "@/lib/api-client";
import type { QuoteInput, QuoteResult } from "@/types";

export const quoteService = {
  create: (input: QuoteInput) =>
    apiRequest<QuoteResult>("/quote", { method: "POST", body: input, latencyMs: 700 }),
};
