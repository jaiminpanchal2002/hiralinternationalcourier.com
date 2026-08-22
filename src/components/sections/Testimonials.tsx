"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

type T = { id: string; name: string; role: string; quote: string; rating: number };

export function Testimonials({ items }: { items: T[] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const count = items.length;

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setI((prev) => (prev + d + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go, count]);

  if (count === 0) return null;
  const t = items[i];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative min-h-[15rem] overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-soft sm:p-12">
        <Quote className="absolute right-6 top-6 h-16 w-16 text-brand/10" />
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={t.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Star key={k} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-5 text-lg leading-relaxed text-foreground/90">
              “{t.quote}”
            </p>
            <div className="mt-6">
              <div className="font-display font-bold text-brand-navy">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-brand transition-colors hover:bg-brand hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => { setDir(k > i ? 1 : -1); setI(k); }}
                aria-label={`Go to testimonial ${k + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  k === i ? "w-7 bg-brand" : "w-2.5 bg-border"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-brand transition-colors hover:bg-brand hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
