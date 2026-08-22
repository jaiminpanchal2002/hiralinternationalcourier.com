import { prisma } from "@/lib/prisma";
import { EntityManager } from "@/components/admin/EntityManager";
import type { Field, ManagerItem } from "@/components/admin/types";
import { parseFeatures } from "@/lib/utils";
import { createService, updateService, deleteService } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const ICONS = ["Package", "Plane", "Ship", "FileCheck", "Building2", "Gift", "Globe", "Truck", "ShieldCheck", "Clock"];

const fields: Field[] = [
  { name: "title", label: "Title", type: "text", required: true, colSpan: 1 },
  { name: "slug", label: "Slug (URL)", type: "text", required: true, colSpan: 1, help: "e.g. air-cargo" },
  { name: "summary", label: "Short Summary", type: "text", required: true, colSpan: 2, help: "Shown on cards" },
  { name: "description", label: "Full Description", type: "textarea", required: true, colSpan: 2, rows: 5 },
  { name: "features", label: "Features (one per line)", type: "textarea", colSpan: 2, rows: 4, help: "Each line becomes a bullet point" },
  { name: "icon", label: "Icon", type: "select", options: ICONS.map((i) => ({ value: i, label: i })), colSpan: 1 },
  { name: "order", label: "Order", type: "number", colSpan: 1 },
  { name: "published", label: "Published (visible on site)", type: "checkbox", colSpan: 2 },
];

export default async function AdminServices() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  const items: ManagerItem[] = services.map((s) => ({
    id: s.id,
    primary: s.title,
    secondary: s.summary,
    meta: [`/${s.slug}`, s.icon],
    published: s.published,
    values: {
      title: s.title,
      slug: s.slug,
      summary: s.summary,
      description: s.description,
      features: parseFeatures(s.features).join("\n"),
      icon: s.icon,
      order: s.order,
      published: s.published,
    },
  }));

  return (
    <EntityManager
      title="Services"
      singular="Service"
      description="Manage the shipping services shown across your website."
      items={items}
      fields={fields}
      createAction={createService}
      updateAction={updateService}
      deleteAction={deleteService}
    />
  );
}
