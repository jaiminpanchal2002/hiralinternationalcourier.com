"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Check,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { FieldRenderer } from "./FormFields";
import type { Field, ManagerItem } from "./types";

type Props = {
  title: string;
  singular: string;
  description?: string;
  items: ManagerItem[];
  fields: Field[];
  createAction: (fd: FormData) => Promise<void>;
  updateAction: (id: string, fd: FormData) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
};

export function EntityManager({
  title,
  singular,
  description,
  items,
  fields,
  createAction,
  updateAction,
  deleteAction,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ManagerItem | null>(null);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setError("");
    setOpen(true);
  }
  function openEdit(item: ManagerItem) {
    setEditing(item);
    setError("");
    setOpen(true);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError("");
    start(async () => {
      try {
        if (editing) await updateAction(editing.id, fd);
        else await createAction(fd);
        setOpen(false);
        setEditing(null);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  function remove(id: string) {
    if (!confirm(`Delete this ${singular.toLowerCase()}? This cannot be undone.`)) return;
    setDeletingId(id);
    start(async () => {
      try {
        await deleteAction(id);
        router.refresh();
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete");
      } finally {
        setDeletingId(null);
      }
    });
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" /> Add {singular}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-muted-foreground">
          No {title.toLowerCase()} yet. Click “Add {singular}” to create one.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-soft"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display font-bold text-brand-navy">
                    {item.primary}
                  </span>
                  {item.published === false && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                      <EyeOff className="h-3 w-3" /> Hidden
                    </span>
                  )}
                  {item.meta?.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                {item.secondary && (
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {item.secondary}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {item.href && (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
                  >
                    Timeline <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                <button
                  onClick={() => openEdit(item)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-brand transition-colors hover:bg-brand/10"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(item.id)}
                  disabled={deletingId === item.id}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-danger transition-colors hover:bg-danger/10"
                  aria-label="Delete"
                >
                  {deletingId === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm"
              onClick={() => !pending && setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative my-8 w-full max-w-2xl rounded-3xl border border-border bg-surface p-6 shadow-brand sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-brand-navy">
                  {editing ? `Edit ${singular}` : `Add ${singular}`}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                {fields.map((f) => (
                  <FieldRenderer
                    key={f.name}
                    field={f}
                    value={editing?.values[f.name]}
                  />
                ))}

                {error && (
                  <p className="sm:col-span-2 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
                    {error}
                  </p>
                )}

                <div className="sm:col-span-2 mt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={pending}
                    className="flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-brand disabled:opacity-70"
                  >
                    {pending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" /> Save
                      </>
                    )}
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
