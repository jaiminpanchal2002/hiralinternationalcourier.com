import Link from "next/link";
import {
  ShieldCheck,
  GraduationCap,
  PackageCheck,
  Headset,
  ArrowRight,
  PhoneCall,
  ClipboardList,
  Boxes,
  PlaneTakeoff,
} from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { StatCounter } from "@/components/StatCounter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import {
  getServices,
  getStats,
  getTestimonials,
  getDestinations,
} from "@/lib/data";
import { codeToFlag } from "@/lib/utils";

const WHY = [
  {
    icon: ShieldCheck,
    title: "Proven Expertise",
    text: "4+ years of dedicated experience moving parcels & cargo across borders, safely and on time.",
  },
  {
    icon: GraduationCap,
    title: "Certified Knowledge",
    text: "Specialised training in import & export management — customs and compliance handled by experts.",
  },
  {
    icon: PackageCheck,
    title: "End-to-End Service",
    text: "From secure professional packaging to final door delivery, we manage every step for you.",
  },
  {
    icon: Headset,
    title: "Personal Support",
    text: "Friendly, responsive support on call and WhatsApp — real people who care about your shipment.",
  },
];

const STEPS = [
  { icon: PhoneCall, title: "Request a Quote", text: "Call, WhatsApp or fill our form with your destination and package details." },
  { icon: ClipboardList, title: "Book & Pack", text: "We collect, professionally pack and prepare all customs documentation." },
  { icon: Boxes, title: "Ship & Clear", text: "Your parcel travels by air or sea with full customs clearance handled." },
  { icon: PlaneTakeoff, title: "Track & Deliver", text: "Follow it live with your AWB number right up to door delivery abroad." },
];

export default async function HomePage() {
  const [services, stats, testimonials, destinations] = await Promise.all([
    getServices(),
    getStats(),
    getTestimonials(),
    getDestinations(),
  ]);

  const popular = destinations.filter((d) => d.popular).slice(0, 8);

  return (
    <>
      <Hero />

      {/* ---- Stats band ---- */}
      <section className="relative -mt-px bg-brand-navy py-14">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <StatCounter key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ---- Services ---- */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Complete Shipping Solutions"
            subtitle="Air and sea cargo, customs, packaging and personal parcels — everything you need to send anything, anywhere."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* ---- Why choose us ---- */}
      <section className="relative overflow-hidden bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                center={false}
                eyebrow="Why Hiral"
                title="Why customers trust us with every parcel"
                subtitle="We combine deep global-trade knowledge with genuine care — so your shipment is in expert, reliable hands from start to finish."
              />
              <Reveal delay={0.15}>
                <Link
                  href="/about"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5"
                >
                  More about us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-5 sm:grid-cols-2">
              {WHY.map((w) => (
                <Reveal key={w.title} as="div">
                  <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-soft transition-transform hover:-translate-y-1">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                      <w.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {w.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ---- Destinations ---- */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Where we ship"
            title="Popular Destinations"
            subtitle="Door-to-door delivery to the countries you care about most — and 200+ more worldwide."
          />
          <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {popular.map((d) => (
              <Reveal key={d.id} as="div">
                <div className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-brand/40">
                  <span className="text-3xl transition-transform group-hover:scale-110">
                    {codeToFlag(d.code)}
                  </span>
                  <div>
                    <div className="font-display font-bold text-brand-navy">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.transitDays}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <div className="mt-10 text-center">
              <Link href="/destinations" className="inline-flex items-center gap-2 font-semibold text-brand hover:gap-3 transition-all">
                View all destinations <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section className="relative overflow-hidden bg-hero-mesh py-20 text-white lg:py-28">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Simple process"
            title="How It Works"
            subtitle="Four easy steps from your door in Ahmedabad to your recipient anywhere in the world."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl glass">
                    <s.icon className="h-9 w-9 text-gold" />
                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-sm font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Reviews"
            title="Loved by Senders Across Ahmedabad"
            subtitle="Real words from customers who trust Hiral to deliver what matters."
          />
          <div className="mt-14">
            <Testimonials items={testimonials} />
          </div>
        </div>
      </section>

      {/* ---- CTA band ---- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-8 py-14 text-center text-white shadow-brand sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                Ready to ship worldwide?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                Get a free, no-obligation quote today. Fast, secure and reliable
                door-to-door delivery from Ahmedabad.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand-navy shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/track"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Track a Shipment
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
