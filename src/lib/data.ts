import { prisma } from "./prisma";

/** All reads used by the public site. Kept in one place so pages stay lean.
 *  Pages using these are dynamic (admin edits reflect immediately). */

export async function getSettings() {
  const s = await prisma.setting.findUnique({ where: { id: 1 } });
  // Fall back to a create if the singleton is missing (fresh DB safety).
  return s ?? (await prisma.setting.create({ data: { id: 1 } }));
}

export async function getServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getService(slug: string) {
  return prisma.service.findFirst({ where: { slug, published: true } });
}

export async function getDestinations() {
  return prisma.destination.findMany({
    where: { published: true },
    orderBy: [{ popular: "desc" }, { order: "asc" }],
  });
}

export async function getStats() {
  return prisma.stat.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getFaqs() {
  return prisma.faq.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getShipmentByAwb(awb: string) {
  return prisma.shipment.findUnique({
    where: { awb: awb.trim().toUpperCase() },
    include: { events: { orderBy: { timestamp: "desc" } } },
  });
}
