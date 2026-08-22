import { prisma } from "@/lib/prisma";
import { EntityManager } from "@/components/admin/EntityManager";
import type { Field, ManagerItem } from "@/components/admin/types";
import { createShipment, updateShipment, deleteShipment } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const STATUS = ["Booked", "In Transit", "Customs Clearance", "Out for Delivery", "Delivered", "On Hold"];
const SERVICE = [
  "Air Cargo — Express",
  "Air Cargo — Economy",
  "Sea Cargo — FCL",
  "Sea Cargo — LCL",
];

const fields: Field[] = [
  { name: "awb", label: "AWB / Tracking No.", type: "text", required: true, colSpan: 1, help: "Unique, e.g. HIRAL10003" },
  { name: "status", label: "Status", type: "select", options: STATUS.map((s) => ({ value: s, label: s })), colSpan: 1 },
  { name: "senderName", label: "Sender Name", type: "text", required: true, colSpan: 1 },
  { name: "receiverName", label: "Receiver Name", type: "text", required: true, colSpan: 1 },
  { name: "origin", label: "Origin", type: "text", required: true, colSpan: 1, help: "e.g. Ahmedabad, India" },
  { name: "destination", label: "Destination", type: "text", required: true, colSpan: 1, help: "e.g. New York, USA" },
  { name: "service", label: "Service", type: "select", options: SERVICE.map((s) => ({ value: s, label: s })), colSpan: 1 },
  { name: "weight", label: "Weight", type: "text", colSpan: 1, help: "e.g. 12.5 kg" },
  { name: "currentLocation", label: "Current Location", type: "text", colSpan: 1 },
  { name: "estimatedDelivery", label: "Est. Delivery", type: "datetime", colSpan: 1 },
];

export default async function AdminShipments() {
  const shipments = await prisma.shipment.findMany({ orderBy: { updatedAt: "desc" } });
  const items: ManagerItem[] = shipments.map((s) => ({
    id: s.id,
    primary: s.awb,
    secondary: `${s.senderName} → ${s.receiverName}  ·  ${s.origin} → ${s.destination}`,
    meta: [s.status, s.service],
    href: `/admin/shipments/${s.id}`,
    values: {
      awb: s.awb,
      status: s.status,
      senderName: s.senderName,
      receiverName: s.receiverName,
      origin: s.origin,
      destination: s.destination,
      service: s.service,
      weight: s.weight,
      currentLocation: s.currentLocation,
      estimatedDelivery: s.estimatedDelivery
        ? s.estimatedDelivery.toISOString()
        : "",
    },
  }));

  return (
    <EntityManager
      title="Shipments"
      singular="Shipment"
      description="Create shipments customers can track by AWB. Use “Timeline” to add tracking updates."
      items={items}
      fields={fields}
      createAction={createShipment}
      updateAction={updateShipment}
      deleteAction={deleteShipment}
    />
  );
}
