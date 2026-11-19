import { prisma } from "./prisma";
import { isDatabaseConfigured } from "./db-available";
import {
  FALLBACK_DESTINATIONS,
  FALLBACK_SERVICES,
  FALLBACK_SETTINGS,
  FALLBACK_STATS,
  FALLBACK_TESTIMONIALS,
} from "./fallback-data";

/** All reads used by the public site. Kept in one place so pages stay lean.
 *  Pages using these are dynamic (admin edits reflect immediately). */

export async function getSettings() {
  if (!isDatabaseConfigured()) return FALLBACK_SETTINGS;
  const s = await prisma.setting.findUnique({ where: { id: 1 } });
  // Fall back to a create if the singleton is missing (fresh DB safety).
  return s ?? (await prisma.setting.create({ data: { id: 1 } }));
}

export async function getServices() {
  if (!isDatabaseConfigured()) {
    return FALLBACK_SERVICES.filter((s) => s.published);
  }
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getService(slug: string) {
  if (!isDatabaseConfigured()) {
    return FALLBACK_SERVICES.find((s) => s.slug === slug && s.published) ?? null;
  }
  return prisma.service.findFirst({ where: { slug, published: true } });
}

export async function getDestinations() {
  if (!isDatabaseConfigured()) {
    return [...FALLBACK_DESTINATIONS]
      .filter((d) => d.published)
      .sort((a, b) => {
        if (a.popular !== b.popular) return a.popular ? -1 : 1;
        return a.order - b.order;
      });
  }
  return prisma.destination.findMany({
    where: { published: true },
    orderBy: [{ popular: "desc" }, { order: "asc" }],
  });
}

export async function getStats() {
  if (!isDatabaseConfigured()) return FALLBACK_STATS;
  return prisma.stat.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonials() {
  if (!isDatabaseConfigured()) {
    return FALLBACK_TESTIMONIALS.filter((t) => t.published);
  }
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getFaqs() {
  if (!isDatabaseConfigured()) return [];
  return prisma.faq.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getShipmentByAwb(awb: string) {
  if (!isDatabaseConfigured()) return null;
  return prisma.shipment.findUnique({
    where: { awb: awb.trim().toUpperCase() },
    include: { events: { orderBy: { timestamp: "desc" } } },
  });
}