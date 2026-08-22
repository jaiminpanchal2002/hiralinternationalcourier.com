import { prisma } from "@/lib/prisma";
import { EntityManager } from "@/components/admin/EntityManager";
import type { Field, ManagerItem } from "@/components/admin/types";
import { createFaq, updateFaq, deleteFaq } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "question", label: "Question", type: "text", required: true, colSpan: 2 },
  { name: "answer", label: "Answer", type: "textarea", required: true, colSpan: 2, rows: 4 },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["General", "Shipping", "Tracking", "Pricing"].map((c) => ({ value: c, label: c })),
    colSpan: 1,
  },
  { name: "order", label: "Order", type: "number", colSpan: 1 },
  { name: "published", label: "Published", type: "checkbox", colSpan: 2 },
];

export default async function AdminFaqs() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });
  const items: ManagerItem[] = faqs.map((f) => ({
    id: f.id,
    primary: f.question,
    secondary: f.answer,
    meta: [f.category],
    published: f.published,
    values: {
      question: f.question,
      answer: f.answer,
      category: f.category,
      order: f.order,
      published: f.published,
    },
  }));

  return (
    <EntityManager
      title="FAQs"
      singular="FAQ"
      description="Questions & answers shown on the Track page."
      items={items}
      fields={fields}
      createAction={createFaq}
      updateAction={updateFaq}
      deleteAction={deleteFaq}
    />
  );
}
