import { requireAdmin } from "@/lib/admin-auth";
import { unreadLeadCount } from "@/lib/leads";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <AdminShell unread={unreadLeadCount()}>{children}</AdminShell>;
}
