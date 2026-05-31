import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthLayout } from "@/features/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Sendaro" }] }),
  component: Forgot,
});

function Forgot() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const m = useMutation({
    mutationFn: (d: { email: string }) => authService.forgotPassword(d.email),
    onSuccess: () => toast.success("Reset link sent. Check your email."),
  });
  return (
    <AuthLayout title="Reset your password." subtitle="We'll email you a link to set a new one."
      footer={<><Link to="/login" className="text-primary hover:underline">Back to sign in</Link></>}>
      <form className="space-y-4" onSubmit={handleSubmit((d) => m.mutate(d))}>
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" required {...register("email")} /></div>
        <Button className="w-full" disabled={m.isPending}>{m.isPending ? "Sending…" : "Send reset link"}</Button>
      </form>
    </AuthLayout>
  );
}
