import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-mesh pt-32 pb-16 text-white lg:pt-40 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-sm text-white/60">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">{crumb}</span>
        </nav>
        <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/75">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
