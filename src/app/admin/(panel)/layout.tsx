import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [unread, newLeads] = await Promise.all([
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.lead.count({ where: { status: "New" } }),
  ]);

  return (
    <AdminShell
      admin={{ name: session.name, email: session.email }}
      unread={unread}
      newLeads={newLeads}
    >
      {children}
    </AdminShell>
  );
}
