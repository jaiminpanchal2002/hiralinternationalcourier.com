"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus, Trash2, Loader2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { addTrackingEvent, deleteTrackingEvent } from "@/app/admin/actions";

type Ev = { id: string; status: string; location: string; note: string; timestamp: string };

const STATUS = ["Booked", "Departed Origin", "In Transit", "Customs Clearance", "Out for Delivery", "Delivered", "On Hold"];

export function TimelineManager({
  shipmentId,
  events,
}: {
  shipmentId: string;
  events: Ev[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    start(async () => {
      await addTrackingEvent(shipmentId, fd);
      form.reset();
      router.refresh();
    });
  }

  function remove(id: string) {
    if (!confirm("Delete this tracking event?")) return;
    setDeletingId(id);
    start(async () => {
      await deleteTrackingEvent(id);
      setDeletingId(null);
      router.refresh();
    });
  }

  const input =
    "w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Add form */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <h2 className="font-display text-lg font-bold text-brand-navy">
          Add Tracking Update
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The shipment&apos;s headline status & location update automatically to
          the latest entry.
        </p>
        <form onSubmit={add} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Status</label>
            <select name="status" required className={input} defaultValue="In Transit">
              {STATUS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Location</label>
            <input name="location" required placeholder="e.g. Dubai Transit Hub, UAE" className={input} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Note</label>
            <input name="note" placeholder="Optional note" className={input} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brand-navy">
              Date & Time
            </label>
            <input name="timestamp" type="datetime-local" className={input} />
            <p className="mt-1 text-xs text-muted-foreground">Leave blank to use now.</p>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-brand disabled:opacity-70"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add Update
          </button>
        </form>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <h2 className="font-display text-lg font-bold text-brand-navy">
          Journey ({events.length})
        </h2>
        {events.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">
            No tracking events yet. Add the first update.
          </p>
        ) : (
          <ol className="mt-5 space-y-0">
            {events.map((e, i) => (
              <li key={e.id} className="relative flex gap-4 pb-6 last:pb-0">
                {i !== events.length - 1 && (
                  <span className="absolute left-[9px] top-5 h-full w-0.5 bg-border" />
                )}
                <span className={`relative z-10 mt-1 h-5 w-5 shrink-0 rounded-full border-4 ${i === 0 ? "border-brand bg-brand" : "border-border bg-surface"}`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-brand-navy">{e.status}</span>
                    <button
                      onClick={() => remove(e.id)}
                      disabled={deletingId === e.id}
                      className="text-muted-foreground hover:text-danger"
                      aria-label="Delete event"
                    >
                      {deletingId === e.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {e.location}
                  </div>
                  {e.note && <p className="mt-0.5 text-sm text-foreground/70">{e.note}</p>}
                  <p className="mt-0.5 text-xs text-muted-foreground">{formatDateTime(e.timestamp)}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
