import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { TimelineManager } from "@/components/admin/TimelineManager";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ShipmentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { events: { orderBy: { timestamp: "desc" } } },
  });
  if (!shipment) notFound();

  return (
    <div>
      <Link
        href="/admin/shipments"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all"
      >
        <ArrowLeft className="h-4 w-4" /> All shipments
      </Link>

      <div className="mb-8 rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-brand">
              <Package className="h-7 w-7" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold text-brand-navy">
                {shipment.awb}
              </h1>
              <p className="text-sm text-muted-foreground">
                {shipment.origin} → {shipment.destination}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
            {shipment.status}
          </span>
        </div>
        <div className="mt-5 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-4">
          <Detail label="Sender" value={shipment.senderName} />
          <Detail label="Receiver" value={shipment.receiverName} />
          <Detail label="Weight" value={shipment.weight || "—"} />
          <Detail label="Est. Delivery" value={formatDate(shipment.estimatedDelivery)} />
        </div>
      </div>

      <TimelineManager
        shipmentId={shipment.id}
        events={shipment.events.map((e) => ({
          id: e.id,
          status: e.status,
          location: e.location,
          note: e.note,
          timestamp: e.timestamp.toISOString(),
        }))}
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-semibold text-brand-navy">{value}</div>
    </div>
  );
}
