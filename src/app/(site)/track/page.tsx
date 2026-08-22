import type { Metadata } from "next";
import {
  MapPin,
  Package,
  Calendar,
  PlaneTakeoff,
  PackageX,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TrackBar } from "@/components/TrackBar";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { getShipmentByAwb, getFaqs } from "@/lib/data";
import { formatDate, formatDateTime, statusStyle } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Track & Trace Your Shipment",
  description:
    "Track your Hiral International Courier shipment in real time. Enter your AWB number to see live status, location and delivery updates.",
};

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ awb?: string }>;
}) {
  const { awb } = await searchParams;
  const shipment = awb ? await getShipmentByAwb(awb) : null;
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        crumb="Track"
        title="Track & Trace"
        subtitle="Enter your AWB / tracking number to see exactly where your parcel is — from pickup to door delivery."
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <TrackBar autoFocus />

          {awb && !shipment && (
            <Reveal>
              <div className="mt-8 rounded-2xl border border-danger/30 bg-danger/5 p-8 text-center">
                <PackageX className="mx-auto h-12 w-12 text-danger" />
                <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">
                  No shipment found
                </h3>
                <p className="mt-2 text-muted-foreground">
                  We couldn&apos;t find a shipment for{" "}
                  <span className="font-semibold text-foreground">{awb}</span>.
                  Please check the number and try again, or contact us for help.
                </p>
              </div>
            </Reveal>
          )}

          {shipment && (
            <div className="mt-8">
              {/* Summary card */}
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
                  <div className="flex flex-col gap-3 bg-brand-gradient p-6 text-white sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/70">
                        Tracking Number
                      </div>
                      <div className="font-display text-2xl font-bold">
                        {shipment.awb}
                      </div>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
                      {shipment.status}
                    </span>
                  </div>

                  <div className="grid gap-6 p-6 sm:grid-cols-2">
                    <Info icon={<Package className="h-5 w-5" />} label="Service" value={shipment.service} />
                    <Info icon={<MapPin className="h-5 w-5" />} label="Current Location" value={shipment.currentLocation || "—"} />
                    <Info icon={<PlaneTakeoff className="h-5 w-5" />} label="Route" value={`${shipment.origin} → ${shipment.destination}`} />
                    <Info icon={<Calendar className="h-5 w-5" />} label="Est. Delivery" value={formatDate(shipment.estimatedDelivery)} />
                  </div>
                </div>
              </Reveal>

              {/* Timeline */}
              <Reveal delay={0.1}>
                <div className="mt-8 rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
                  <h3 className="font-display text-lg font-bold text-brand-navy">
                    Shipment Journey
                  </h3>
                  <ol className="mt-6 space-y-0">
                    {shipment.events.map((e, i) => {
                      const st = statusStyle(e.status);
                      const isLatest = i === 0;
                      const isLast = i === shipment.events.length - 1;
                      return (
                        <li key={e.id} className="relative flex gap-4 pb-8 last:pb-0">
                          {!isLast && (
                            <span className="absolute left-[13px] top-7 h-full w-0.5 bg-border" />
                          )}
                          <span
                            className={`relative z-10 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                              isLatest ? "bg-brand text-white" : `${st.bg} ${st.text}`
                            }`}
                          >
                            {isLatest ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <span className={`h-2.5 w-2.5 rounded-full ${st.dot}`} />
                            )}
                          </span>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-display font-bold text-brand-navy">
                                {e.status}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDateTime(e.timestamp)}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" /> {e.location}
                            </div>
                            {e.note && (
                              <p className="mt-1 text-sm text-foreground/70">{e.note}</p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </Reveal>
            </div>
          )}

          {!awb && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Try a demo number:{" "}
              <span className="font-mono font-semibold text-brand">HIRAL10001</span>{" "}
              or{" "}
              <span className="font-mono font-semibold text-brand">HIRAL10002</span>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Help"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about tracking, transit and shipping with Hiral."
          />
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="font-semibold text-brand-navy">{value}</div>
      </div>
    </div>
  );
}
