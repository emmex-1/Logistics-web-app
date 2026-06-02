import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthLayout } from "@/features/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Sendaro" }, { name: "description", content: "Create your Sendaro account." }] }),
  component: SignupPage,
});

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
});
type FormData = z.infer<typeof schema>;

function SignupPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const m = useMutation({
    mutationFn: authService.signup,
    onSuccess: (s) => { setSession(s); toast.success("Account created!"); navigate({ to: "/verify-otp" }); },
  });
  return (
    <AuthLayout
      title="Start shipping in minutes."
      subtitle="Create your Sendaro account. Free forever for individuals."
      footer={<>Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
        <div className="space-y-1.5"><Label>Full name</Label><Input {...register("fullName")} placeholder="Tunde Adebayo" />{errors.fullName && <p className="text-xs text-destructive">Required</p>}</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5"><Label>Email</Label><Input type="email" {...register("email")} placeholder="you@company.com" />{errors.email && <p className="text-xs text-destructive">Invalid</p>}</div>
          <div className="space-y-1.5"><Label>Phone</Label><Input {...register("phone")} placeholder="+234..." />{errors.phone && <p className="text-xs text-destructive">Required</p>}</div>
        </div>
        <div className="space-y-1.5"><Label>Password</Label><Input type="password" {...register("password")} placeholder="At least 8 characters" />{errors.password && <p className="text-xs text-destructive">Min 8 chars</p>}</div>
        <Button className="w-full" disabled={m.isPending}>{m.isPending ? "Creating…" : "Create account"}</Button>
      </form>
    </AuthLayout>
  );
}
