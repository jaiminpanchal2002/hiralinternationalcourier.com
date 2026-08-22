import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { getService, getServices, getSettings } from "@/lib/data";
import { parseFeatures } from "@/lib/utils";

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
  return {
    title: `${service.title} — International Courier Service`,
    description: service.summary,
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

  return (
    <>
      <PageHero crumb={service.title} title={service.title} subtitle={service.summary} />

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
