import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — Sendaro Admin" }] }),
  component: Users,
});

function Users() {
  const { data = [] } = useQuery({ queryKey: ["admin.users"], queryFn: adminService.users });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Users</h1>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-6 py-3 text-left">Name</th><th className="px-6 py-3 text-left">Email</th><th className="px-6 py-3 text-left">Role</th><th className="px-6 py-3 text-left">2FA</th></tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id} className="border-t hover:bg-surface">
                <td className="px-6 py-4 font-medium">{u.fullName}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4"><Badge variant="secondary" className="rounded-full capitalize">{u.role}</Badge></td>
                <td className="px-6 py-4">{u.twoFactorEnabled ? "Enabled" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
