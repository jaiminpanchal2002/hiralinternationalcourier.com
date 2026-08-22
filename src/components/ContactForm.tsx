"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const fields = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+91 …", required: true },
  { name: "destination", label: "Destination Country", type: "text", placeholder: "e.g. USA, UK, Canada", required: false },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-7 shadow-soft sm:p-9">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-brand-navy">
              Message Sent!
            </h3>
            <p className="mt-2 text-muted-foreground">
              Thank you for reaching out. Our team will get back to you shortly
              with a quote.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-full bg-brand/10 px-6 py-2.5 font-semibold text-brand transition-colors hover:bg-brand/20"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="space-y-5"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.name === "destination" ? "sm:col-span-2" : ""}>
                  <label
                    htmlFor={f.name}
                    className="mb-1.5 block text-sm font-semibold text-brand-navy"
                  >
                    {f.label}
                    {f.required && <span className="text-danger"> *</span>}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
                  />
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-semibold text-brand-navy"
              >
                Package Details / Message <span className="text-danger">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us what you're shipping, approx. weight and any questions…"
                className="w-full resize-none rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
              />
            </div>

            {status === "error" && (
              <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
