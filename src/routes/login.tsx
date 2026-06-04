import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Quick Reach Logistics" },
      { name: "description", content: "Sign in to your Quick Reach Logistics account." },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
type FormData = z.infer<typeof schema>;

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

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.39.07 2.36.74 3.18.8 1.22-.24 2.39-.93 3.7-.84 1.57.12 2.75.72 3.51 1.84-3.22 1.93-2.45 6.18.61 7.38-.55 1.44-1.26 2.86-3 3.68zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const m = useMutation({
    mutationFn: (d: FormData) => authService.login(d.email, d.password),
    onSuccess: (s) => { setSession(s); toast.success("Welcome back!"); navigate({ to: "/dashboard" }); },
    onError: () => toast.error("Invalid credentials"),
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

      {/* ── Body: split layout ── */}
      <div className="flex flex-1 gap-4 p-3 sm:p-5 min-h-0">

        {/* LEFT: image panel */}
        <div className="hidden lg:flex lg:w-[48%] relative rounded-2xl overflow-hidden flex-col justify-between shrink-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=85')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(145deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.62) 45%, rgba(0, 0, 0, 0.88) 100%)",
            }}
          />
          <div className="relative z-10 flex flex-col h-full p-10">
            {/* Top badge */}
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-pulse" />
                <span className="text-white/80 text-xs font-bold tracking-widest uppercase">Live Network</span>
              </div>
            </div>

            {/* Vertically & horizontally centered text */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2
                  className="text-white font-black leading-[1.05] mb-4"
                  style={{ fontSize: "clamp(30px,3vw,48px)", letterSpacing: "-1.5px" }}
                >
                  Move anything. 
                  <span style={{ color: "rgba(255,190,190,0.9)" }}> Anywhere.</span><br />
                  Fast within Lagos State.
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs mx-auto">
                  Lagos's most trusted logistics platform powering businesses within Lagos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: white form */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-8">
          <div className="w-full max-w-[400px]">

            <h1 className="text-[#0f0f0f] font-black text-[28px] mb-1 text-center" style={{ letterSpacing: "-0.8px" }}>
              Login to your account
            </h1>
            <p className="text-[#aaa] text-sm mb-7 text-center">
              Welcome back! Enter your details to log in.
            </p>

            <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[#555] text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full rounded-lg px-4 py-3 text-sm text-[#0f0f0f] placeholder-[#ccc] outline-none transition-all"
                  style={{ border: "1px solid #e8e8e8", background: "#fff" }}
                  onFocus={(e) => { e.target.style.borderColor = "#ef0004"; e.target.style.boxShadow = "0 0 0 3px rgba(239,0,4,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; e.target.style.boxShadow = "none"; }}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[#555] text-xs font-semibold uppercase tracking-wide">Password</label>
                  <Link to="/forgot-password" className="text-xs text-[#ef0004] font-semibold hover:opacity-75">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter your Password"
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
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#ef0004] cursor-pointer"
                />
                <label htmlFor="remember" className="text-[#999] text-sm select-none cursor-pointer">
                  Remember login
                </label>
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
                {m.isPending ? "Signing in…" : "Login"}
              </button>

              {/* Divider */}
              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px bg-[#eee]" />
                <span className="text-[#ccc] text-xs shrink-0">Or continue with</span>
                <div className="flex-1 h-px bg-[#eee]" />
              </div>

              {/* Social — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-[#333] transition-all hover:bg-[#f8f8f8]"
                  style={{ border: "1px solid #e8e8e8" }}
                >
                  <AppleIcon />
                  Apple
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-[#333] transition-all hover:bg-[#f8f8f8]"
                  style={{ border: "1px solid #e8e8e8" }}
                >
                  <GoogleIcon />
                  Google
                </button>
              </div>
            </form>

            <p className="text-center text-[#aaa] text-sm mt-6">
              New here?{" "}
              <Link to="/signup" className="text-[#ef0004] font-bold hover:opacity-75 transition-opacity">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}