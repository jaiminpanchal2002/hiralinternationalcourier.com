import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { getSettings } from "@/lib/data";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Contact Hiral International Courier: Free Quote, Ahmedabad",
  description:
    "International courier near me — New Sahibaug, Ahmedabad. Call, WhatsApp or request a free door-to-door quote to USA, UK, Canada, Dubai & worldwide.",
  path: "/contact",
});

export default async function ContactPage() {
  const s = await getSettings();
  const wa = s.whatsapp.replace(/[^\d]/g, "");

  const cards = [
    {
      icon: Phone,
      label: "Call Us",
      lines: [s.phonePrimary, s.phoneSecondary],
      href: `tel:${s.phonePrimary.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email Us",
      lines: [s.email],
      href: `mailto:${s.email}`,
    },
    {
      icon: MapPin,
      label: "Visit Us",
      lines: [s.addressLine],
    },
    {
      icon: Clock,
      label: "Business Hours",
      lines: [s.businessHours],
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        crumb="Contact"
        title="Contact Us for a Free Courier Quote"
        subtitle="International courier in New Sahibaug, Ahmedabad — call, WhatsApp or send your shipment details for a fast, honest quote."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Info */}
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-brand-navy">
                  Get in touch
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Prefer to talk? Call or WhatsApp us directly — we respond fast.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                {cards.map((c) => {
                  const inner = (
                    <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all hover:border-brand/40">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-brand">
                        <c.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <div className="font-display font-bold text-brand-navy">
                          {c.label}
                        </div>
                        {c.lines.map((l) => (
                          <div key={l} className="text-sm text-muted-foreground">
                            {l}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                  return (
                    <Reveal key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="block">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </Reveal>
                  );
                })}

                <Reveal>
                  <a
                    href={`https://wa.me/${wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-5 w-5" fill="white" /> Chat on WhatsApp
                  </a>
                </Reveal>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14">
              <h2 className="font-display text-xl font-bold text-brand-navy">
                Office address
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
                {s.addressLine}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Hours: </span>
                {s.businessHours}
              </p>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                src={s.mapEmbedUrl}
                title="Hiral International Courier — New Sahibaug, Ahmedabad map"
                className="h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
