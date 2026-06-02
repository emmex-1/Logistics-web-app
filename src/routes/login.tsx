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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Quick Reach Logistics" }, { name: "description", content: "Sign in to your Quick Reach Logistics account." }] }),
  component: LoginPage,
});

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
type FormData = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: "tunde@quickreachlogistics.ng", password: "password123" } });
  const m = useMutation({
    mutationFn: (d: FormData) => authService.login(d.email, d.password),
    onSuccess: (s) => { setSession(s); toast.success("Welcome back!"); navigate({ to: "/dashboard" }); },
    onError: () => toast.error("Invalid credentials"),
  });
  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to continue managing your deliveries."
      footer={<>Don't have an account? <Link to="/signup" className="font-medium text-primary hover:underline">Create one</Link></>}
    >
      <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <div className="relative">
            <Input id="password" type={show ? "text" : "password"} {...register("password")} />
            <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button className="w-full" disabled={m.isPending}>{m.isPending ? "Signing in…" : "Sign in"}</Button>
        <div className="relative my-4 text-center text-xs text-muted-foreground">
          <span className="bg-background px-2 relative z-10">OR</span>
          <span className="absolute inset-x-0 top-1/2 -z-0 border-t" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline">Google</Button>
          <Button type="button" variant="outline">Apple</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
