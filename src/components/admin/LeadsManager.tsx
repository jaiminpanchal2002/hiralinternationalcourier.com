"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Check,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Search,
  Globe,
  User,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/BrandIcons";
import {
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
} from "@/app/admin/actions";
import { formatDate } from "@/lib/utils";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: string;
  destination: string;
  message: string;
  notes: string;
  value: string;
  createdAt: string;
};

const STATUSES = ["New", "Contacted", "Quoted", "Won", "Lost"];
const SOURCES = ["Website", "WhatsApp", "Facebook", "Instagram", "Phone", "Referral", "Manual"];

const statusColor: Record<string, string> = {
  New: "bg-brand/10 text-brand",
  Contacted: "bg-warning/10 text-warning",
  Quoted: "bg-gold/15 text-[#8a6d1f]",
  Won: "bg-success/10 text-success",
  Lost: "bg-danger/10 text-danger",
};

function SourceBadge({ source }: { source: string }) {
  const map: Record<string, { icon: React.ComponentType<{ className?: string }>; cls: string }> = {
    WhatsApp: { icon: MessageCircle, cls: "bg-[#25D366]/15 text-[#128C4A]" },
    Facebook: { icon: FacebookIcon, cls: "bg-[#1877F2]/15 text-[#1877F2]" },
    Instagram: { icon: InstagramIcon, cls: "bg-[#E1306C]/15 text-[#C13584]" },
    Website: { icon: Globe, cls: "bg-brand/10 text-brand" },
    Phone: { icon: Phone, cls: "bg-brand-navy/10 text-brand-navy" },
  };
  const m = map[source] ?? { icon: User, cls: "bg-muted text-muted-foreground" };
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${m.cls}`}>
      <Icon className="h-3.5 w-3.5" /> {source}
    </span>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white";

export function LeadsManager({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [fSource, setFSource] = useState("All");
  const [fStatus, setFStatus] = useState("All");
  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { New: 0, Contacted: 0, Quoted: 0, Won: 0, Lost: 0 };
    leads.forEach((l) => (c[l.status] = (c[l.status] ?? 0) + 1));
    return c;
  }, [leads]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (fSource !== "All" && l.source !== fSource) return false;
      if (fStatus !== "All" && l.status !== fStatus) return false;
      if (q) {
        const hay = `${l.name} ${l.phone} ${l.email} ${l.destination} ${l.message}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [leads, q, fSource, fStatus]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError("");
    start(async () => {
      try {
        if (editing) await updateLead(editing.id, fd);
        else await createLead(fd);
        setOpen(false);
        setEditing(null);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  function changeStatus(id: string, status: string) {
    setBusyId(id);
    start(async () => {
      await updateLeadStatus(id, status);
      setBusyId(null);
      router.refresh();
    });
  }

  function remove(id: string) {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setBusyId(id);
    start(async () => {
      await deleteLead(id);
      setBusyId(null);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
            Lead Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All leads from your website, WhatsApp, Facebook & Instagram in one pipeline.
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setError(""); setOpen(true); }}
          className="flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" /> Add Lead
        </button>
      </div>

      {/* Pipeline summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFStatus(fStatus === s ? "All" : s)}
            className={`rounded-2xl border p-4 text-left transition-all ${
              fStatus === s ? "border-brand bg-brand/5" : "border-border bg-surface hover:border-brand/40"
            }`}
          >
            <div className="font-display text-2xl font-extrabold text-brand-navy">{counts[s] ?? 0}</div>
            <div className="text-xs font-semibold text-muted-foreground">{s}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, phone, email…"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-4 text-sm outline-none focus:border-brand"
          />
        </div>
        <select value={fSource} onChange={(e) => setFSource(e.target.value)} className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-brand-navy outline-none">
          <option value="All">All sources</option>
          {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {(fStatus !== "All" || fSource !== "All" || q) && (
          <button onClick={() => { setFStatus("All"); setFSource("All"); setQ(""); }} className="text-sm font-semibold text-brand hover:underline">
            Clear
          </button>
        )}
      </div>

      {/* Lead list */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-muted-foreground">
          No leads match. New website/WhatsApp/Facebook leads will appear here automatically.
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((l) => (
            <li key={l.id} className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display font-bold text-brand-navy">{l.name}</span>
                    <SourceBadge source={l.source} />
                    {l.value && (
                      <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-[#8a6d1f]">
                        {l.value}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                    {l.phone && (
                      <a href={`tel:${l.phone}`} className="flex items-center gap-1.5 hover:text-brand">
                        <Phone className="h-4 w-4" /> {l.phone}
                      </a>
                    )}
                    {l.phone && (
                      <a href={`https://wa.me/${l.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#128C4A]">
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    )}
                    {l.email && (
                      <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 hover:text-brand">
                        <Mail className="h-4 w-4" /> {l.email}
                      </a>
                    )}
                    {l.destination && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" /> {l.destination}
                      </span>
                    )}
                  </div>
                  {l.message && <p className="mt-2 text-sm text-foreground/80">{l.message}</p>}
                  {l.notes && <p className="mt-1 text-sm italic text-muted-foreground">Note: {l.notes}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">{formatDate(l.createdAt)}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="relative">
                    <select
                      value={l.status}
                      onChange={(e) => changeStatus(l.id, e.target.value)}
                      disabled={busyId === l.id}
                      className={`cursor-pointer appearance-none rounded-full px-3 py-1.5 pr-7 text-xs font-bold outline-none ${statusColor[l.status] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {busyId === l.id && <Loader2 className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 animate-spin" />}
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => { setEditing(l); setError(""); setOpen(true); }} className="grid h-8 w-8 place-items-center rounded-lg border border-border text-brand hover:bg-brand/10" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => remove(l.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-border text-danger hover:bg-danger/10" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm" onClick={() => !pending && setOpen(false)} />
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.2 }} className="relative my-8 w-full max-w-2xl rounded-3xl border border-border bg-surface p-6 shadow-brand sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-brand-navy">{editing ? "Edit Lead" : "Add Lead"}</h2>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted" aria-label="Close"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" def={editing?.name} required />
                <Field label="Phone" name="phone" def={editing?.phone} />
                <Field label="Email" name="email" def={editing?.email} />
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Source</label>
                  <select name="source" defaultValue={editing?.source ?? "Manual"} className={inputCls}>
                    {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Status</label>
                  <select name="status" defaultValue={editing?.status ?? "New"} className={inputCls}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <Field label="Destination" name="destination" def={editing?.destination} />
                <Field label="Estimated Value" name="value" def={editing?.value} />
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Message / Enquiry</label>
                  <textarea name="message" rows={2} defaultValue={editing?.message} className={inputCls + " resize-none"} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Internal Notes</label>
                  <textarea name="notes" rows={2} defaultValue={editing?.notes} className={inputCls + " resize-none"} />
                </div>
                {error && <p className="sm:col-span-2 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">{error}</p>}
                <div className="sm:col-span-2 mt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted">Cancel</button>
                  <button type="submit" disabled={pending} className="flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-brand disabled:opacity-70">
                    {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : <><Check className="h-4 w-4" /> Save</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, name, def, required }: { label: string; name: string; def?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brand-navy">
        {label}{required && <span className="text-danger"> *</span>}
      </label>
      <input name={name} defaultValue={def ?? ""} required={required} className={inputCls} />
    </div>
  );
}
