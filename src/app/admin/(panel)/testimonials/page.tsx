import { prisma } from "@/lib/prisma";
import { EntityManager } from "@/components/admin/EntityManager";
import type { Field, ManagerItem } from "@/components/admin/types";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "name", label: "Customer Name", type: "text", required: true, colSpan: 1 },
  { name: "role", label: "Role / Location", type: "text", colSpan: 1, help: "e.g. Exporter, Ahmedabad" },
  { name: "quote", label: "Review", type: "textarea", required: true, colSpan: 2, rows: 4 },
  {
    name: "rating",
    label: "Rating",
    type: "select",
    options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} stars` })),
    colSpan: 1,
  },
  { name: "order", label: "Order", type: "number", colSpan: 1 },
  { name: "published", label: "Published", type: "checkbox", colSpan: 2 },
];

export default async function AdminTestimonials() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  const items: ManagerItem[] = testimonials.map((t) => ({
    id: t.id,
    primary: t.name,
    secondary: t.quote,
    meta: [`${t.rating}★`, t.role].filter(Boolean),
    published: t.published,
    values: {
      name: t.name,
      role: t.role,
      quote: t.quote,
      rating: t.rating,
      order: t.order,
      published: t.published,
    },
  }));

  return (
    <EntityManager
      title="Testimonials"
      singular="Testimonial"
      description="Customer reviews displayed on your homepage."
      items={items}
      fields={fields}
      createAction={createTestimonial}
      updateAction={updateTestimonial}
      deleteAction={deleteTestimonial}
    />
  );
}
