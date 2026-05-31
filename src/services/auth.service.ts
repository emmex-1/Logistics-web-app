import { apiRequest } from "@/lib/api-client";
import type { Session, User } from "@/types";

export const authService = {
  login: (email: string, password: string) =>
    apiRequest<Session>("/auth/login", { method: "POST", body: { email, password } }),
  signup: (data: { fullName: string; email: string; phone: string; password: string }) =>
    apiRequest<Session>("/auth/signup", { method: "POST", body: data }),
  me: () => apiRequest<User>("/auth/me"),
  logout: () => apiRequest<{ ok: boolean }>("/auth/logout", { method: "POST" }),
  requestOtp: (phone: string) =>
    apiRequest<{ ok: boolean; channel: string }>("/auth/otp/request", { method: "POST", body: { phone } }),
  verifyOtp: (phone: string, code: string) =>
    apiRequest<Session>("/auth/otp/verify", { method: "POST", body: { phone, code } }),
  forgotPassword: (email: string) =>
    apiRequest<{ ok: boolean }>("/auth/forgot-password", { method: "POST", body: { email } }),
};
