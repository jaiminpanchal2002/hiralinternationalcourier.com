"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "./Icon";

export function ServiceCard({
  title,
  slug,
  summary,
  icon,
  index = 0,
}: {
  title: string;
  slug: string;
  summary: string;
  icon: string;
  index?: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <Link
        href={`/services/${slug}`}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-soft transition-shadow hover:shadow-brand"
      >
        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/5 transition-transform duration-500 group-hover:scale-150" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-brand">
            <Icon name={icon} className="h-7 w-7" />
          </div>
          <h3 className="relative mt-5 font-display text-xl font-bold text-brand-navy">
            {title}
          </h3>
          <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
          <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
            Learn more
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
