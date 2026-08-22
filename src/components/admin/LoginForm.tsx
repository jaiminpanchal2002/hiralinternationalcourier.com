"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          password: fd.get("password"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Login failed");
      router.push(params.get("from") || "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-brand-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue="admin@hiralinternational02.com"
          className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-brand-navy">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:bg-white"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" /> Sign In
          </>
        )}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Default password: <span className="font-mono">Hiral@2025</span> — change it after first login.
      </p>
    </form>
  );
}
