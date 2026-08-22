"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Trash2,
  Loader2,
  MailOpen,
  Inbox,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { toggleMessageRead, deleteMessage } from "@/app/admin/actions";

type Msg = {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function MessagesList({ messages }: { messages: Msg[] }) {
  const router = useRouter();
  const [, start] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);

  function toggle(m: Msg) {
    start(async () => {
      await toggleMessageRead(m.id, !m.read);
      router.refresh();
    });
  }
  function remove(id: string) {
    if (!confirm("Delete this message permanently?")) return;
    setBusy(id);
    start(async () => {
      await deleteMessage(id);
      setBusy(null);
      router.refresh();
    });
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface py-16 text-muted-foreground">
        <Inbox className="h-12 w-12" />
        <p className="mt-3">No enquiries yet.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li
          key={m.id}
          className={`rounded-2xl border p-5 shadow-soft transition-colors ${
            m.read ? "border-border bg-surface" : "border-brand/30 bg-brand/[0.03]"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {!m.read && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
              <div>
                <div className="font-display font-bold text-brand-navy">{m.name}</div>
                <div className="text-xs text-muted-foreground">{formatDateTime(m.createdAt)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggle(m)}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand/10"
              >
                <MailOpen className="h-3.5 w-3.5" />
                Mark {m.read ? "unread" : "read"}
              </button>
              <button
                onClick={() => remove(m.id)}
                disabled={busy === m.id}
                className="grid h-8 w-8 place-items-center rounded-lg border border-border text-danger hover:bg-danger/10"
                aria-label="Delete"
              >
                {busy === m.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-muted-foreground">
            <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 hover:text-brand">
              <Mail className="h-4 w-4" /> {m.email}
            </a>
            <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 hover:text-brand">
              <Phone className="h-4 w-4" /> {m.phone}
            </a>
            {m.destination && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {m.destination}
              </span>
            )}
          </div>

          <p className="mt-3 rounded-xl bg-muted/50 p-4 text-sm text-foreground/90">
            {m.message}
          </p>
        </li>
      ))}
    </ul>
  );
}
