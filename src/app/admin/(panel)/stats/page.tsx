import { prisma } from "@/lib/prisma";
import { EntityManager } from "@/components/admin/EntityManager";
import type { Field, ManagerItem } from "@/components/admin/types";
import { createStat, updateStat, deleteStat } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "value", label: "Number", type: "text", required: true, colSpan: 1, help: "e.g. 4, 200, 50" },
  { name: "suffix", label: "Suffix", type: "text", colSpan: 1, help: "e.g. +, K+" },
  { name: "label", label: "Label", type: "text", required: true, colSpan: 2, help: "e.g. Years of Experience" },
  { name: "order", label: "Order", type: "number", colSpan: 2 },
];

export default async function AdminStats() {
  const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  const items: ManagerItem[] = stats.map((s) => ({
    id: s.id,
    primary: `${s.value}${s.suffix}`,
    secondary: s.label,
    values: { value: s.value, suffix: s.suffix, label: s.label, order: s.order },
  }));

  return (
    <EntityManager
      title="Statistics"
      singular="Stat"
      description="The animated counters shown on your homepage and about page."
      items={items}
      fields={fields}
      createAction={createStat}
      updateAction={updateStat}
      deleteAction={deleteStat}
    />
  );
}
