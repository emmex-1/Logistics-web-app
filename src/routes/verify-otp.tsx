import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/features/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { useAuthStore } from "@/store";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({ meta: [{ title: "Verify your phone — Quick Reach Logistics" }] }),
  component: VerifyOtp,
});

function VerifyOtp() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const m = useMutation({
    mutationFn: () => authService.verifyOtp("+2348100000000", code),
    onSuccess: (s) => { setSession(s); toast.success("Verified."); navigate({ to: "/dashboard" }); },
    onError: () => toast.error("Invalid code"),
  });
  return (
    <AuthLayout title="Verify your phone." subtitle="We sent a 6-digit code to your number. Enter it below.">
      <div className="space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="w-full" disabled={code.length < 6 || m.isPending} onClick={() => m.mutate()}>
          {m.isPending ? "Verifying…" : "Verify"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">Didn't get it? <button className="text-primary hover:underline">Resend</button></p>
      </div>
    </AuthLayout>
  );
}
