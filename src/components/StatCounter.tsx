"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

/** Animates a numeric value up from 0 when scrolled into view. */
export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  const target = parseFloat(value.replace(/[^\d.]/g, "")) || 0;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return controls.stop;
  }, [inView, target, mv]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {display}
        <span className="text-accent-2">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-white/70">{label}</div>
    </div>
  );
}
