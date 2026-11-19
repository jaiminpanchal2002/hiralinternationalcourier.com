import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getDestinations, getSettings } from "@/lib/data";
import { codeToFlag } from "@/lib/utils";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  pageMetadata,
  serviceJsonLd,
  SITE_URL,
} from "@/lib/seo";
import {
  DESTINATION_LANDING_INTROS,
  DESTINATION_PAGE_FAQS,
  DESTINATION_SEO_SECTIONS,
  getDestinationSection,
} from "@/lib/seo-content";

export const dynamic = "force-dynamic";

const SLUG_TO_CODE: Record<string, string> = {
  usa: "us",
  uk: "gb",
  canada: "ca",
  australia: "au",
  uae: "ae",
  "new-zealand": "nz",
};

export function generateStaticParams() {
  return DESTINATION_SEO_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = getDestinationSection(slug);
  if (!section) return { title: "Destination Not Found" };

  const title =
    section.heading.length <= 60
      ? `${section.heading} | Hiral`
      : `${section.heading} — Hiral Courier`;

  const description = `${section.transit} ${section.notes}`.slice(0, 155);

  return {
    ...pageMetadata({
      title,
      description,
      path: `/destinations/${slug}`,
    }),
    title: { absolute: title },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getDestinationSection(slug);
  if (!section) notFound();

  const [destinations, settings] = await Promise.all([
    getDestinations(),
    getSettings(),
  ]);

  const code = SLUG_TO_CODE[slug];
  const dbDest = destinations.find((d) => d.code === code);
  const intro = DESTINATION_LANDING_INTROS[slug] ?? section.notes;
  const faqs = DESTINATION_PAGE_FAQS[slug] ?? [];
  const others = DESTINATION_SEO_SECTIONS.filter((s) => s.slug !== slug).slice(
    0,
    4,
  );

  const serviceSchema = {
    ...serviceJsonLd({
      title: section.heading,
      slug,
      summary: `${section.transit} ${section.commonItems}`,
    }),
    url: `${SITE_URL}/destinations/${slug}`,
    serviceType: "International courier",
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: section.heading, path: `/destinations/${slug}` },
        ])}
      />
      <JsonLd data={serviceSchema} />
      {faqs.length > 0 ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}

      <PageHero
        crumb={dbDest?.name ?? section.heading}
        title={section.heading}
        subtitle={`${section.transit} Door-to-door pickup in Ahmedabad, Gandhinagar & Kalol.`}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4">
              {code ? (
                <span className="text-5xl" aria-hidden>
                  {codeToFlag(code)}
                </span>
              ) : null}
              <p className="text-lg leading-relaxed text-muted-foreground">
                {intro}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <article className="mt-10 rounded-3xl border border-border bg-muted/40 p-8">
              <h2 className="font-display text-xl font-bold text-brand-navy">
                What customers send on this route
              </h2>
              <p className="mt-3 text-muted-foreground">{section.commonItems}</p>
              <h2 className="mt-8 font-display text-xl font-bold text-brand-navy">
                Customs & packing notes
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {section.notes}
              </p>
              <p className="mt-6 text-sm font-semibold text-brand">
                {section.transit}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Get a free quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services/air-cargo"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-7 py-3.5 font-semibold text-brand-navy transition-colors hover:border-brand/40"
              >
                Air cargo from Ahmedabad
              </Link>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-7 py-3.5 font-semibold text-brand transition-colors hover:bg-brand/5"
              >
                <PhoneCall className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </Reveal>

          {faqs.length > 0 ? (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-brand-navy">
                {dbDest?.name ?? "Route"} shipping FAQ
              </h2>
              <div className="mt-6">
                <FaqAccordion
                  items={faqs.map((f, i) => ({
                    id: `${slug}-faq-${i}`,
                    question: f.question,
                    answer: f.answer,
                  }))}
                />
              </div>
            </div>
          ) : null}

          <div className="mt-16 border-t border-border pt-10">
            <h2 className="font-display text-lg font-bold text-brand-navy">
              Other destinations from Ahmedabad
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/destinations/${o.slug}`}
                    className="text-sm font-semibold text-brand hover:underline"
                  >
                    {o.heading.replace(" from Ahmedabad", "")}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/destinations"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" /> All destinations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}