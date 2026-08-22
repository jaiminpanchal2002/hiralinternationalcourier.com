"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Boxes,
  PackageSearch,
  MessageSquare,
  Star,
  Globe2,
  HelpCircle,
  BarChart3,
  Target,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Target },
  { href: "/admin/shipments", label: "Shipments", icon: PackageSearch },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/services", label: "Services", icon: Boxes },
  { href: "/admin/destinations", label: "Destinations", icon: Globe2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/stats", label: "Statistics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  admin,
  unread,
  newLeads,
}: {
  children: React.ReactNode;
  admin: { name: string; email: string };
  unread: number;
  newLeads: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV.map((n) => {
        const active = n.exact
          ? pathname === n.href
          : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-brand text-white shadow-brand"
                : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            <n.icon className="h-5 w-5" />
            {n.label}
            {n.href === "/admin/messages" && unread > 0 && (
              <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-xs font-bold text-white">
                {unread}
              </span>
            )}
            {n.href === "/admin/leads" && newLeads > 0 && (
              <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-xs font-bold text-white">
                {newLeads}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-muted">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-brand-ink p-5 lg:flex">
        <Link href="/admin" className="mb-8 flex items-center gap-2.5">
          <LogoMark className="h-9" variant="white" />
          <span className="font-display text-lg font-bold text-white">
            Hiral Admin
          </span>
        </Link>
        {nav}
        <div className="mt-4 border-t border-white/10 pt-4">
          <Link
            href="/"
            target="_blank"
            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" /> View Website
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 hover:bg-danger/20 hover:text-white"
          >
            <LogOut className="h-5 w-5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-brand-ink px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <LogoMark className="h-8" variant="white" />
          <span className="font-display font-bold text-white">Hiral Admin</span>
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-brand-ink p-5">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-white">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            {nav}
            <div className="mt-4 border-t border-white/10 pt-4">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 hover:bg-danger/20 hover:text-white"
              >
                <LogOut className="h-5 w-5" /> Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Content */}
      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
