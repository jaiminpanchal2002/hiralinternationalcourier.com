import { prisma } from "@/lib/prisma";
import { LeadsManager, type Lead } from "@/components/admin/LeadsManager";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const data: Lead[] = leads.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    source: l.source,
    status: l.status,
    destination: l.destination,
    message: l.message,
    notes: l.notes,
    value: l.value,
    createdAt: l.createdAt.toISOString(),
  }));
  return <LeadsManager leads={data} />;
}
