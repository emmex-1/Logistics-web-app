import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { Eye, EyeOff, ArrowLeft, UserCircle2, Building2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Quick Reach Logistics" },
      { name: "description", content: "Create your Quick Reach Logistics account." },
    ],
  }),
  component: SignupPage,
});

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
});
type FormData = z.infer<typeof schema>;

const STEPS = [
  { icon: UserCircle2,  label: "Sign up your account",  num: 1 },
  { icon: Building2,    label: "Set up your workspace", num: 2 },
  { icon: CheckCircle2, label: "Set up your profile",   num: 3 },
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433"/>
          <stop offset="25%" stopColor="#e6683c"/>
          <stop offset="50%" stopColor="#dc2743"/>
          <stop offset="75%" stopColor="#cc2366"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [show, setShow] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const m = useMutation({
    mutationFn: (d: FormData) =>
      authService.signup({ fullName: `${d.firstName} ${d.lastName}`, email: d.email, phone: d.phone, password: d.password }),
    onSuccess: (s) => { setSession(s); toast.success("Account created!"); navigate({ to: "/verify-otp" }); },
  });

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Syne', sans-serif" }}>

      {/* ── Top bar — back to home + logo ── */}
      <div className="flex items-center justify-between px-6 py-4 sm:px-10 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[#555] text-sm font-semibold hover:text-[#0f0f0f] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <Link to="/">
          <span className="font-black text-lg text-[#0f0f0f]" style={{ letterSpacing: "-0.5px" }}>
            {/* <span style={{ color: "#ef0004" }}>QuickReach</span> Logistics */}
          </span>
        </Link>
        <div className="w-16" /> {/* spacer to keep logo centered */}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 gap-4 p-3 sm:p-5 min-h-0">

        {/* LEFT: image panel */}
        <div className="hidden lg:flex lg:w-[44%] relative rounded-2xl overflow-hidden flex-col justify-between shrink-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&q=85')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Red glass overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, rgba(190,0,0,0.80) 0%, rgba(100,0,0,0.65) 40%, rgba(8,8,8,0.90) 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col h-full p-10">
            {/* Top badge */}
            <div>
              <p className="text-red-300 text-xs font-bold uppercase tracking-widest">Get Started</p>
            </div>

            {/* Centered heading — takes up remaining space between top and cards */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2
                  className="text-white font-black leading-tight mb-3"
                  style={{ fontSize: "clamp(28px,3vw,44px)", letterSpacing: "-1.5px" }}
                >
                  Get Started with Us
                </h2>
                <p className="text-white/50 text-sm leading-relaxed max-w-[240px] mx-auto">
                  Complete these easy steps to register your account and start shipping.
                </p>
              </div>
            </div>

            {/* Step cards pinned to bottom */}
            <div className="grid grid-cols-3 gap-3">
              {STEPS.map(({ label, num }, i) => (
                <div
                  key={num}
                  className="rounded-2xl p-4 flex flex-col gap-3"
                  style={{
                    background: i === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full text-xs font-black"
                    style={{
                      width: "28px",
                      height: "28px",
                      background: i === 0 ? "#fff" : "rgba(255,255,255,0.15)",
                      color: i === 0 ? "#b00000" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {num}
                  </div>
                  <p
                    className="text-xs font-semibold leading-snug"
                    style={{ color: i === 0 ? "#fff" : "rgba(255,255,255,0.4)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: white form */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-8">
          <div className="w-full max-w-[440px]">

            <h1 className="text-[#0f0f0f] font-black text-[28px] mb-1 text-center" style={{ letterSpacing: "-0.8px" }}>
              Sign Up Account
            </h1>
            <p className="text-[#aaa] text-sm mb-6 text-center">
              Enter your personal data to create your account.
            </p>

            {/* Social buttons at top */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-[#333] transition-all hover:bg-[#f8f8f8]"
                style={{ border: "1px solid #e8e8e8" }}
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-[#333] transition-all hover:bg-[#f8f8f8]"
                style={{ border: "1px solid #e8e8e8" }}
              >
                <InstagramIcon />
                Instagram
              </button>
            </div>

            {/* OR divider */}
            <div className="relative flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-[#eee]" />
              <span className="text-[#ccc] text-xs shrink-0">Or</span>
              <div className="flex-1 h-px bg-[#eee]" />
            </div>

            <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">

              {/* First Name + Last Name side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#555] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    placeholder="eg. John"
                    className="w-full rounded-lg px-4 py-3 text-sm text-[#0f0f0f] placeholder-[#ccc] outline-none transition-all"
                    style={{ border: "1px solid #e8e8e8", background: "#fff" }}
                    onFocus={(e) => { e.target.style.borderColor = "#ef0004"; e.target.style.boxShadow = "0 0 0 3px rgba(239,0,4,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">Required</p>}
                </div>
                <div>
                  <label className="block text-[#555] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    placeholder="eg. Francisco"
                    className="w-full rounded-lg px-4 py-3 text-sm text-[#0f0f0f] placeholder-[#ccc] outline-none transition-all"
                    style={{ border: "1px solid #e8e8e8", background: "#fff" }}
                    onFocus={(e) => { e.target.style.borderColor = "#ef0004"; e.target.style.boxShadow = "0 0 0 3px rgba(239,0,4,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">Required</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#555] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="eg. johnfrans@gmail.com"
                  className="w-full rounded-lg px-4 py-3 text-sm text-[#0f0f0f] placeholder-[#ccc] outline-none transition-all"
                  style={{ border: "1px solid #e8e8e8", background: "#fff" }}
                  onFocus={(e) => { e.target.style.borderColor = "#ef0004"; e.target.style.boxShadow = "0 0 0 3px rgba(239,0,4,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; e.target.style.boxShadow = "none"; }}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">Invalid email</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[#555] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Phone
                </label>
                <input
                  {...register("phone")}
                  placeholder="+234 800 000 0000"
                  className="w-full rounded-lg px-4 py-3 text-sm text-[#0f0f0f] placeholder-[#ccc] outline-none transition-all"
                  style={{ border: "1px solid #e8e8e8", background: "#fff" }}
                  onFocus={(e) => { e.target.style.borderColor = "#ef0004"; e.target.style.boxShadow = "0 0 0 3px rgba(239,0,4,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; e.target.style.boxShadow = "none"; }}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">Required</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#555] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter your password"
                    className="w-full rounded-lg px-4 py-3 pr-11 text-sm text-[#0f0f0f] placeholder-[#ccc] outline-none transition-all"
                    style={{ border: "1px solid #e8e8e8", background: "#fff" }}
                    onFocus={(e) => { e.target.style.borderColor = "#ef0004"; e.target.style.boxShadow = "0 0 0 3px rgba(239,0,4,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; e.target.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ccc] hover:text-[#888] transition-colors"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-[#ccc] text-xs">Must be at least 8 characters.</p>
                {errors.password && <p className="text-xs text-red-500">Min 8 characters</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={m.isPending}
                className="w-full rounded-lg py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #ef0004 0%, #b00000 100%)",
                  boxShadow: "0 4px 20px rgba(239,0,4,0.22)",
                }}
              >
                {m.isPending ? "Creating…" : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-[#aaa] text-sm mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-[#ef0004] font-bold hover:opacity-75 transition-opacity">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}