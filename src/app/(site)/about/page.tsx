import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Eye,
  Award,
  GraduationCap,
  Globe2,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { StatCounter } from "@/components/StatCounter";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { getStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us — Trusted International Courier in Ahmedabad",
  description:
    "Hiral International Courier Service is Ahmedabad's premier logistics partner with 4+ years of experience and certified import/export expertise. Learn our story, mission and edge.",
};

const VALUES = [
  { icon: Award, title: "Proven Expertise", text: "4+ years dedicated to international courier & cargo, with a track record of safe, on-time delivery." },
  { icon: GraduationCap, title: "Certified Knowledge", text: "Formal training in import & export management — we understand global trade inside out." },
  { icon: Globe2, title: "Global Reach", text: "Door-to-door delivery to the USA, UK, Canada, Australia, the Gulf and 200+ destinations." },
  { icon: HeartHandshake, title: "Customer First", text: "Honest advice, transparent pricing and genuine care for every parcel we handle." },
];

export default async function AboutPage() {
  const stats = await getStats();
  return (
    <>
      <PageHero
        crumb="About"
        title="Your Trusted Global Shipping Partner"
        subtitle="Based in Ahmedabad, Hiral International Courier Service connects Gujarat to the world with reliable, expert-managed logistics."
      />

      {/* Who we are */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-brand/10" />
              <div className="relative overflow-hidden rounded-3xl bg-hero-mesh p-10 text-white shadow-brand">
                <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
                <Globe2 className="h-14 w-14 text-accent-2" />
                <h3 className="mt-5 font-display text-2xl font-bold">
                  Ahmedabad to the World
                </h3>
                <p className="mt-3 text-white/75">
                  From Shyam Elegance in New Sahibaug, we&apos;ve built a
                  reputation as the go-to name — <span className="text-accent-2 font-semibold">જૂના અને જાણીતા રાણીપવાળા</span> — for
                  dependable overseas parcel and cargo delivery.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {stats.slice(0, 2).map((s) => (
                    <StatCounter key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              center={false}
              eyebrow="Who we are"
              title="A logistics partner you can rely on"
            />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <Reveal><p>Hiral International Courier Service is a premier logistics company headquartered in Ahmedabad, Gujarat. We specialise in international courier and cargo — moving documents, parcels, personal effects and commercial consignments across borders with speed and security.</p></Reveal>
              <Reveal delay={0.05}><p>What sets us apart is a rare combination: hands-on industry experience paired with formal education in import and export management. That means your shipment is handled by people who genuinely understand customs, compliance and global trade routes.</p></Reveal>
              <Reveal delay={0.1}><p>Whether you&apos;re a business exporting in bulk or a family sending a care package to loved ones abroad, we treat every shipment with the same professionalism and care.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-surface p-8 shadow-soft">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-brand">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-brand-navy">Our Mission</h3>
                <p className="mt-3 text-muted-foreground">
                  To provide seamless, cost-effective and timely delivery
                  solutions across borders — making international shipping simple,
                  transparent and stress-free for every customer.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl border border-border bg-surface p-8 shadow-soft">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-brand">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-brand-navy">Our Vision</h3>
                <p className="mt-3 text-muted-foreground">
                  To be Gujarat&apos;s most trusted international courier — known
                  for reliability, expertise and a genuinely personal approach to
                  every parcel we carry.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our edge / values */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our edge"
            title="What makes Hiral different"
            subtitle="Deep expertise, global reach and a customer-first mindset — the foundation of every shipment."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <Reveal key={v.title} as="div">
                <div className="h-full rounded-2xl border border-border bg-surface p-7 text-center shadow-soft transition-transform hover:-translate-y-1">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-14 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Work with us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
