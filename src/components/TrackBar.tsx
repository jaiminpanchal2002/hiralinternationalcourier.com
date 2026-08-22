"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PackageSearch, ArrowRight } from "lucide-react";

export function TrackBar({
  variant = "light",
  autoFocus = false,
}: {
  variant?: "light" | "onDark";
  autoFocus?: boolean;
}) {
  const [awb, setAwb] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = awb.trim();
    if (!v) return;
    router.push(`/track?awb=${encodeURIComponent(v)}`);
  };

  const onDark = variant === "onDark";

  return (
    <form
      onSubmit={submit}
      className={`flex w-full items-center gap-2 rounded-2xl p-2 ${
        onDark
          ? "glass"
          : "border border-border bg-white shadow-soft"
      }`}
    >
      <div className="flex flex-1 items-center gap-2 pl-3">
        <PackageSearch
          className={`h-5 w-5 shrink-0 ${onDark ? "text-white/80" : "text-brand"}`}
        />
        <input
          value={awb}
          onChange={(e) => setAwb(e.target.value)}
          autoFocus={autoFocus}
          placeholder="Enter your AWB / tracking number"
          aria-label="Tracking number"
          className={`w-full bg-transparent py-2.5 text-sm font-medium outline-none ${
            onDark
              ? "text-white placeholder:text-white/60"
              : "text-foreground placeholder:text-muted-foreground"
          }`}
        />
      </div>
      <button
        type="submit"
        className="group flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5"
      >
        Track
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
