import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { getServices } from "@/lib/data";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "International Courier & Cargo Services in Ahmedabad | Hiral",
  description:
    "Courier services in Ahmedabad: air & sea cargo, custom clearance, packing, commercial export & personal parcels. Door-to-door to USA, UK, Canada & more.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHero
        crumb="Services"
        title="Courier & Cargo Services from Ahmedabad"
        subtitle="From urgent air freight to cost-effective sea cargo — plus customs, packaging and personal parcels — door-to-door international courier from our New Sahibaug office."
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard
                key={s.id}
                title={s.title}
                slug={s.slug}
                summary={s.summary}
                icon={s.icon}
                index={i}
              />
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 overflow-hidden rounded-3xl bg-brand-gradient px-8 py-12 text-center text-white shadow-brand">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Not sure which service you need?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">
                Tell us where you&apos;re shipping and what you&apos;re sending — we&apos;ll
                recommend the best, most affordable option.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-navy transition-transform hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
