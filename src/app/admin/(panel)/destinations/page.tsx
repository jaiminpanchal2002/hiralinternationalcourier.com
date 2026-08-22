import { prisma } from "@/lib/prisma";
import { EntityManager } from "@/components/admin/EntityManager";
import type { Field, ManagerItem } from "@/components/admin/types";
import { codeToFlag } from "@/lib/utils";
import { createDestination, updateDestination, deleteDestination } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "name", label: "Country Name", type: "text", required: true, colSpan: 1 },
  { name: "code", label: "ISO Code (2 letters)", type: "text", colSpan: 1, help: "e.g. us, gb, ca — for the flag" },
  { name: "transitDays", label: "Transit Time", type: "text", colSpan: 1, help: "e.g. 5–8 days" },
  { name: "order", label: "Order", type: "number", colSpan: 1 },
  { name: "popular", label: "Popular (feature on homepage)", type: "checkbox", colSpan: 1 },
  { name: "published", label: "Published", type: "checkbox", colSpan: 1 },
];

export default async function AdminDestinations() {
  const destinations = await prisma.destination.findMany({
    orderBy: [{ popular: "desc" }, { order: "asc" }],
  });
  const items: ManagerItem[] = destinations.map((d) => ({
    id: d.id,
    primary: `${codeToFlag(d.code)}  ${d.name}`,
    secondary: d.transitDays,
    meta: d.popular ? ["Popular"] : [],
    published: d.published,
    values: {
      name: d.name,
      code: d.code,
      transitDays: d.transitDays,
      order: d.order,
      popular: d.popular,
      published: d.published,
    },
  }));

  return (
    <EntityManager
      title="Destinations"
      singular="Destination"
      description="Countries you deliver to, shown on the homepage and destinations page."
      items={items}
      fields={fields}
      createAction={createDestination}
      updateAction={updateDestination}
      deleteAction={deleteDestination}
    />
  );
}
