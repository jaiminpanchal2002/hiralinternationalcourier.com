"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Plane, ShieldCheck, Clock, Globe2, ArrowRight, Sparkles } from "lucide-react";
import { TrackBar } from "@/components/TrackBar";

const flags = [
  { c: "USA", e: "🇺🇸" },
  { c: "UK", e: "🇬🇧" },
  { c: "Canada", e: "🇨🇦" },
  { c: "Australia", e: "🇦🇺" },
  { c: "UAE", e: "🇦🇪" },
];

export function Hero() {
  // Mouse-parallax for the floating visual (3D feel).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      className="relative overflow-hidden bg-hero-mesh pt-28 pb-20 text-white sm:pt-32 lg:pt-36 lg:pb-28"
      onMouseMove={onMove}
    >
      {/* Decorative layers */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />
      <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-accent/25 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-brand/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* ---- Copy ---- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-2" />
            Pardesh Parcel Seva · Door to Door
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Reliable Global
            <br />
            Shipping &{" "}
            <span className="bg-gradient-to-r from-accent-2 via-accent to-white bg-clip-text text-transparent">
              Logistics
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-5 max-w-lg text-lg leading-relaxed text-white/75"
          >
            Connecting Ahmedabad to the world. Fast, secure and hassle-free
            international courier & cargo to the USA, UK, Canada, Australia and
            200+ countries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-navy shadow-brand transition-transform hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Track bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-6 max-w-xl"
          >
            <TrackBar variant="onDark" />
          </motion.div>

          {/* Trust chips */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75"
          >
            <li className="flex items-center gap-2"><ShieldCheck className="h-4.5 w-4.5 text-accent-2" /> Secure & Insured</li>
            <li className="flex items-center gap-2"><Clock className="h-4.5 w-4.5 text-accent-2" /> On-Time Delivery</li>
            <li className="flex items-center gap-2"><Globe2 className="h-4.5 w-4.5 text-accent-2" /> 200+ Countries</li>
          </motion.ul>
        </div>

        {/* ---- 3D Visual ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ perspective: 1000 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative h-full w-full"
          >
            {/* Orbit rings */}
            <div className="absolute inset-4 rounded-full border border-white/15 animate-spin-slow" />
            <div className="absolute inset-12 rounded-full border border-dashed border-white/10" />

            {/* Globe */}
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand to-brand-navy shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.4),0_30px_60px_-15px_rgba(0,166,224,0.5)]">
              <div className="absolute inset-0 grid-lines rounded-full opacity-40" />
              <Globe2 className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-white/20" strokeWidth={0.7} />
            </div>

            {/* Flight path */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" style={{ transform: "translateZ(40px)" }}>
              <path
                d="M40 300 Q200 40 360 180"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-dash"
              />
              <circle cx="40" cy="300" r="6" fill="#38bdf8" />
              <circle cx="360" cy="180" r="6" fill="#fff" />
            </svg>

            {/* Floating plane */}
            <motion.div
              className="absolute right-8 top-16 animate-float"
              style={{ transform: "translateZ(70px)" }}
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/90 shadow-brand">
                <Plane className="h-7 w-7 text-brand" />
              </div>
            </motion.div>

            {/* Floating parcel cards */}
            <motion.div
              className="absolute -left-2 top-24 animate-float-slow"
              style={{ transform: "translateZ(90px)" }}
            >
              <div className="glass rounded-2xl px-4 py-3 text-left">
                <div className="text-[0.65rem] uppercase tracking-wider text-white/60">Status</div>
                <div className="text-sm font-bold text-white">In Transit ✈</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-0 animate-float"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="glass rounded-2xl px-4 py-3 text-left">
                <div className="text-[0.65rem] uppercase tracking-wider text-white/60">Delivered</div>
                <div className="text-sm font-bold text-white">London 🇬🇧</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Flag strip */}
      <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-white/70">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50">We deliver to</span>
          {flags.map((f) => (
            <span key={f.c} className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-lg">{f.e}</span> {f.c}
            </span>
          ))}
          <span className="text-sm font-semibold text-accent-2">& many more…</span>
        </div>
      </div>
    </section>
  );
}
