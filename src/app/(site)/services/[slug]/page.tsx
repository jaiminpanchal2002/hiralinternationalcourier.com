import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, PhoneCall, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { getService, getServices, getSettings } from "@/lib/data";
import { parseFeatures } from "@/lib/utils";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  canonicalPath,
  serviceJsonLd,
} from "@/lib/seo";
import {
  SERVICE_SEO,
  SERVICE_META,
  SERVICE_H1,
} from "@/lib/seo-content";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service Not Found" };
  const seo = SERVICE_META[slug];
  const title =
    seo?.title ?? `${service.title} | Hiral International Courier`;
  const description = seo?.description ?? service.summary;
  return {
    title: { absolute: title },
    description,
    alternates: canonicalPath(`/services/${slug}`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, all, settings] = await Promise.all([
    getService(slug),
    getServices(),
    getSettings(),
  ]);
  if (!service) notFound();

  const features = parseFeatures(service.features);
  const others = all.filter((s) => s.slug !== slug).slice(0, 3);
  const seoBlock = SERVICE_SEO[slug];
  const h1 = SERVICE_H1[slug] ?? service.title;
  const wa = settings.whatsapp.replace(/[^\d]/g, "");

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd
        data={serviceJsonLd({
          title: service.title,
          slug: service.slug,
          summary: service.summary,
        })}
      />
      {seoBlock?.faqs.length ? (
        <JsonLd data={faqPageJsonLd(seoBlock.faqs)} />
      ) : null}

      <PageHero crumb={service.title} title={h1} subtitle={service.summary} />

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {/* Main */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-brand">
                  <Icon name={service.icon} className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
                  About this service
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </Reveal>

            {seoBlock?.sections.map((sec, i) => (
              <Reveal key={sec.title} delay={0.06 + i * 0.04}>
                <h2 className="mt-10 font-display text-xl font-bold text-brand-navy sm:text-2xl">
                  {sec.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {sec.body}
                  {slug === "personal-parcels" && i === 0 ? (
                    <>
                      {" "}
                      See also our{" "}
                      <Link
                        href="/destinations"
                        className="font-semibold text-brand hover:underline"
                      >
                        courier destinations from Ahmedabad
                      </Link>
                      .
                    </>
                  ) : null}
                  {slug === "air-cargo" && i === 0 ? (
                    <>
                      {" "}
                      Compare{" "}
                      <Link
                        href="/services/sea-cargo"
                        className="font-semibold text-brand hover:underline"
                      >
                        sea cargo from Ahmedabad
                      </Link>{" "}
                      for heavier, non-urgent loads.
                    </>
                  ) : null}
                </p>
              </Reveal>
            ))}

            {features.length > 0 && (
              <Reveal delay={0.1}>
                <div className="mt-10 rounded-3xl border border-border bg-muted/50 p-8">
                  <h3 className="font-display text-xl font-bold text-brand-navy">
                    What&apos;s included
                  </h3>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                          <Check className="h-4 w-4" />
                        </span>
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {seoBlock?.faqs.length ? (
              <Reveal delay={0.12}>
                <div className="mt-12">
                  <h2 className="font-display text-xl font-bold text-brand-navy">
                    Frequently asked questions
                  </h2>
                  <div className="mt-6">
                    <FaqAccordion
                      items={seoBlock.faqs.map((f, i) => ({
                        id: `${slug}-faq-${i}`,
                        question: f.question,
                        answer: f.answer,
                      }))}
                    />
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.15}>
              <Link
                href="/services"
                className="mt-10 inline-flex items-center gap-2 font-semibold text-brand hover:gap-3 transition-all"
              >
                <ArrowLeft className="h-4 w-4" /> All services
              </Link>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-hero-mesh p-8 text-white shadow-brand">
                <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
                <h3 className="font-display text-xl font-bold">Get a free quote</h3>
                <p className="mt-2 text-sm text-white/75">
                  Fast, honest pricing for your shipment. No obligation.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand-navy transition-transform hover:-translate-y-0.5"
                >
                  Request Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${settings.phonePrimary.replace(/\s/g, "")}`}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4" /> {settings.phonePrimary}
                </a>
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" fill="white" /> WhatsApp
                </a>
              </div>
            </Reveal>

            <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
              <h3 className="font-display font-bold text-brand-navy">Other services</h3>
              <ul className="mt-4 space-y-2">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link
                      href={`/services/${o.slug}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-brand/10 hover:text-brand"
                    >
                      <Icon name={o.icon} className="h-5 w-5 text-brand" />
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
