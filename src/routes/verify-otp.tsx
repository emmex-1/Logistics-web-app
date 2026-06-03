import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";
import { ArrowLeft, ShieldCheck, RotateCcw, CheckCircle2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({
    meta: [{ title: "Verify your phone — Quick Reach Logistics" }],
  }),
  component: VerifyOtp,
});

const RESEND_SECONDS = 30;

function VerifyOtp() {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [resendCount, setResendCount] = useState(0);
  const [resending, setResending] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    if (countdown <= 0) return;
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [resendCount]);

  const verify = useMutation({
    mutationFn: () => authService.verifyOtp("+2348100000000", code),
    onSuccess: (s) => {
      setVerified(true);
      setSession(s);
      toast.success("Phone verified!");
      setTimeout(() => navigate({ to: "/dashboard" }), 1200);
    },
    onError: () => {
      toast.error("Invalid code. Please try again.");
      setCode("");
    },
  });

  const handleResend = async () => {
    setResending(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast.success("New code sent.");
      setCode("");
      setCountdown(RESEND_SECONDS);
      setResendCount((c) => c + 1);
    } catch {
      toast.error("Couldn't resend. Try again.");
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    if (code.length === 6 && !verify.isPending && !verified) {
      verify.mutate();
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Syne', sans-serif" }}>

      {/* ── Top bar ── */}
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
        <div className="w-16" />
      </div>

      {/* ── Body: split layout ── */}
      <div className="flex flex-1 gap-4 p-3 sm:p-5 min-h-0">

        {/* LEFT: image panel — identical style to login */}
        <div className="hidden lg:flex lg:w-[48%] relative rounded-2xl overflow-hidden flex-col shrink-0">
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
              background: "linear-gradient(145deg, rgba(200,0,0,0.78) 0%, rgba(110,0,0,0.62) 45%, rgba(8,8,8,0.88) 100%)",
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
                <span className="text-white/80 text-xs font-bold tracking-widest uppercase">Secure Verification</span>
              </div>
            </div>

            {/* Centered text */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                {/* Large shield icon */}
                <div
                  className="mx-auto mb-6 flex items-center justify-center rounded-full"
                  style={{
                    width: "72px",
                    height: "72px",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <ShieldCheck className="h-9 w-9 text-red-200" />
                </div>
                <h2
                  className="text-white font-black leading-[1.05] mb-4"
                  style={{ fontSize: "clamp(28px,3vw,46px)", letterSpacing: "-1.5px" }}
                >
                  One step<br />
                  <span style={{ color: "rgba(255,190,190,0.9)" }}>away.</span>
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-[260px] mx-auto">
                  We sent a 6-digit code to your phone number. Enter it to verify your account and get started.
                </p>

                {/* Decorative step pills */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {["Signed up", "Verifying", "Dashboard"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                        style={{
                          background: i === 1 ? "rgba(239,0,4,0.9)" : "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.18)",
                        }}
                      >
                        <span className="text-white text-xs font-black">{i + 1}</span>
                        <span className="text-white/80 text-xs font-semibold">{step}</span>
                      </div>
                      {i < 2 && <div className="w-3 h-px bg-white/25" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: form panel */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-8">
          <div className="w-full max-w-[400px]">

            {/* Animated icon */}
            <div className="flex justify-center mb-6">
              <AnimatePresence mode="wait">
                {verified ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="grid h-16 w-16 place-items-center rounded-full"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="shield"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="grid h-16 w-16 place-items-center rounded-full"
                    style={{ backgroundColor: "rgba(239,0,4,0.08)" }}
                  >
                    <ShieldCheck className="h-8 w-8" style={{ color: "#ef0004" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <h1 className="text-[#0f0f0f] font-black text-[28px] mb-1 text-center" style={{ letterSpacing: "-0.8px" }}>
              Verify your phone
            </h1>
            <p className="text-[#aaa] text-sm mb-8 text-center">
              We sent a 6-digit code to your number. Enter it below.
            </p>

            <AnimatePresence>
              {!verified ? (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="space-y-5"
                >
                  {/* OTP input */}
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={code}
                      onChange={setCode}
                      disabled={verify.isPending || verified}
                    >
                      <InputOTPGroup className="gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="h-12 w-11 rounded-xl border-2 text-center text-lg font-bold transition-all"
                            style={
                              code.length > i
                                ? { borderColor: "#ef0004", color: "#ef0004", backgroundColor: "rgba(239,0,4,0.04)" }
                                : undefined
                            }
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-1.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          backgroundColor: i < code.length ? "#ef0004" : "#e2e8f0",
                          scale: i < code.length ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.15 }}
                        className="h-1.5 w-1.5 rounded-full"
                      />
                    ))}
                  </div>

                  {/* Verify button */}
                  <button
                    disabled={code.length < 6 || verify.isPending}
                    onClick={() => verify.mutate()}
                    className="w-full rounded-lg py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #ef0004 0%, #b00000 100%)",
                      boxShadow: "0 4px 20px rgba(239,0,4,0.22)",
                    }}
                  >
                    {verify.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Verifying…
                      </span>
                    ) : (
                      "Verify code"
                    )}
                  </button>

                  {/* Resend */}
                  <div className="text-center text-sm text-[#aaa]">
                    {countdown > 0 ? (
                      <span>
                        Resend code in{" "}
                        <span className="font-semibold tabular-nums" style={{ color: "#ef0004" }}>
                          {countdown}s
                        </span>
                      </span>
                    ) : (
                      <button
                        onClick={handleResend}
                        disabled={resending}
                        className="inline-flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-75 disabled:opacity-50"
                        style={{ color: "#ef0004" }}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        {resending ? "Sending…" : "Resend code"}
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-1"
                >
                  <p className="font-semibold text-emerald-600">Phone verified!</p>
                  <p className="text-sm text-[#aaa]">Redirecting you to your dashboard…</p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-[#aaa] text-sm mt-8">
              Wrong number?{" "}
              <Link to="/signup" className="text-[#ef0004] font-bold hover:opacity-75 transition-opacity">
                Go back
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}