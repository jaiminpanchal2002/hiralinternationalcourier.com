import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Star, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getDestinations } from "@/lib/data";
import { codeToFlag } from "@/lib/utils";
import {
  pageMetadata,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";
import {
  DESTINATION_SEO_SECTIONS,
  DESTINATIONS_FAQ,
} from "@/lib/seo-content";

export const metadata: Metadata = pageMetadata({
  title:
    "Courier to USA, UK, Canada, Australia & Dubai from Ahmedabad | Hiral",
  description:
    "Courier to USA, UK, Canada, Australia, Dubai & New Zealand from Ahmedabad. Transit times, food & medicine tips, door-to-door international parcel service.",
  path: "/destinations",
});

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(DESTINATIONS_FAQ)} />

      <PageHero
        crumb="Destinations"
        title="Countries We Ship to from Ahmedabad"
        subtitle="Door-to-door international courier to 200+ countries. Popular lanes from New Sahibaug, Ahmedabad — with typical air transit times."
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

          <div className="mt-20 space-y-12">
            {DESTINATION_SEO_SECTIONS.map((section) => (
              <Reveal key={section.slug}>
                <article className="rounded-3xl border border-border bg-muted/40 p-8 lg:p-10">
                  <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
                    {section.heading}
                  </h2>
                  <p className="mt-3 font-semibold text-brand">{section.transit}</p>
                  <p className="mt-4 text-muted-foreground">
                    <span className="font-semibold text-foreground">Commonly sent: </span>
                    {section.commonItems}
                  </p>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {section.notes}
                  </p>
                  <p className="mt-5 text-sm text-muted-foreground">
                    Need a quote for this route?{" "}
                    <Link
                      href="/contact"
                      className="font-semibold text-brand hover:underline"
                    >
                      Contact us for a free courier quote in Ahmedabad
                    </Link>{" "}
                    or explore{" "}
                    <Link
                      href="/services/air-cargo"
                      className="font-semibold text-brand hover:underline"
                    >
                      air cargo from Ahmedabad
                    </Link>
                    .
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="FAQ"
              title="Destination shipping questions"
              subtitle="Transit times and food rules vary by country — we confirm before you ship."
            />
            <div className="mt-10 max-w-3xl">
              <FaqAccordion
                items={DESTINATIONS_FAQ.map((f, i) => ({
                  id: `dest-faq-${i}`,
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </div>
          </div>

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
