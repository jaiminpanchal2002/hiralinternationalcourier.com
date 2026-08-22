import Link from "next/link";
import {
  PackageSearch,
  MessageSquare,
  Boxes,
  Target,
  Globe2,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  const [
    shipments,
    unread,
    totalLeads,
    newLeads,
    services,
    destinations,
    recentLeads,
    activeShipments,
  ] = await Promise.all([
    prisma.shipment.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "New" } }),
    prisma.service.count(),
    prisma.destination.count(),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.shipment.findMany({
      where: { NOT: { status: "Delivered" } },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const cards = [
    { label: "Total Leads", value: totalLeads, icon: Target, href: "/admin/leads", accent: newLeads > 0 },
    { label: "Shipments", value: shipments, icon: PackageSearch, href: "/admin/shipments" },
    { label: "Unread Messages", value: unread, icon: MessageSquare, href: "/admin/messages", accent: unread > 0 },
    { label: "Services", value: services, icon: Boxes, href: "/admin/services" },
    { label: "Destinations", value: destinations, icon: Globe2, href: "/admin/destinations" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
          Welcome back, {session?.name?.split(" ")[0] ?? "Admin"} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening with your courier business.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-brand"
          >
            <div className="flex items-center justify-between">
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl ${
                  c.accent ? "bg-accent text-white" : "bg-brand/10 text-brand"
                }`}
              >
                <c.icon className="h-6 w-6" />
              </span>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <div className="mt-4 font-display text-3xl font-extrabold text-brand-navy">
              {c.value}
            </div>
            <div className="text-sm font-medium text-muted-foreground">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent leads */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-brand-navy">
              Recent Leads
            </h2>
            <Link href="/admin/leads" className="text-sm font-semibold text-brand hover:underline">
              View all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-muted-foreground">
              <Inbox className="h-10 w-10" />
              <p className="mt-2 text-sm">No leads yet.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {recentLeads.map((l) => (
                <li key={l.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${l.status === "New" ? "bg-accent" : "bg-border"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-brand-navy">{l.name}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(l.createdAt)}</span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {l.source} · {l.message || l.destination || l.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Active shipments */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-brand-navy">
              Active Shipments
            </h2>
            <Link href="/admin/shipments" className="text-sm font-semibold text-brand hover:underline">
              Manage
            </Link>
          </div>
          {activeShipments.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-muted-foreground">
              <PackageSearch className="h-10 w-10" />
              <p className="mt-2 text-sm">No active shipments.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {activeShipments.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <Link href={`/admin/shipments/${s.id}`} className="font-mono font-semibold text-brand hover:underline">
                      {s.awb}
                    </Link>
                    <p className="truncate text-sm text-muted-foreground">
                      {s.origin} → {s.destination}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
