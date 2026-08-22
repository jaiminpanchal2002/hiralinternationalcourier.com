import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Star, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { getDestinations } from "@/lib/data";
import { codeToFlag } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Destinations — Countries We Ship To Worldwide",
  description:
    "Hiral International Courier delivers door-to-door to the USA, UK, Canada, Australia, Europe, the Gulf and 200+ countries. See transit times for popular destinations.",
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return (
    <>
      <PageHero
        crumb="Destinations"
        title="We Deliver Across the Globe"
        subtitle="Door-to-door delivery to 200+ countries. Here are the destinations our customers ship to most — with typical transit times."
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <Reveal key={d.id} as="div">
                <div className="group relative flex h-full items-center gap-5 overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand">
                  {d.popular && (
                    <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold">
                      <Star className="h-3 w-3 fill-gold" /> Popular
                    </span>
                  )}
                  <span className="text-5xl transition-transform group-hover:scale-110">
                    {codeToFlag(d.code)}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-navy">
                      {d.name}
                    </h3>
                    {d.transitDays && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-brand" /> {d.transitDays}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-14 rounded-3xl border border-border bg-muted/50 p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-brand-navy">
                Don&apos;t see your country?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                We ship to 200+ destinations worldwide. If it&apos;s not listed
                here, just ask — we most likely cover it.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Ask about your destination <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
