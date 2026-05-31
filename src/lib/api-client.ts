/**
 * Central API client. UI never imports fetch directly — only services use this.
 * Today: dispatches to mock handlers. Tomorrow: swap `mockDispatch` for `httpRequest`
 * pointing at the Node.js + Express backend. No UI code changes required.
 */
import { mockDispatch } from "@/mock/dispatch";

export interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
  /** ms of simulated latency in mock mode */
  latencyMs?: number;
  /** if > 0, force a failure with that probability (0..1) in mock mode */
  failureRate?: number;
}

const MOCK_MODE = true; // flip to false when wiring real backend
const BASE_URL = ""; // e.g. process.env.NEXT_PUBLIC_API_URL or import.meta.env.VITE_API_URL

function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

export class ApiClientError extends Error {
  code: string;
  status?: number;
  constructor(code: string, message: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

async function realRequest<T>(path: string, opts: RequestOptions): Promise<T> {
  const url = new URL(path, BASE_URL || window.location.origin);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    method: opts.method ?? "GET",
    headers: { "Content-Type": "application/json" },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiClientError("HTTP_ERROR", text || res.statusText, res.status);
  }
  return (await res.json()) as T;
}

export async function apiRequest<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const latency = opts.latencyMs ?? 400 + Math.random() * 500;
  if (MOCK_MODE) {
    await delay(latency);
    if (opts.failureRate && Math.random() < opts.failureRate) {
      throw new ApiClientError("MOCK_FAILURE", "Simulated network failure", 500);
    }
    return mockDispatch<T>(path, opts);
  }
  return realRequest<T>(path, opts);
}
