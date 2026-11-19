import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/db-available";
import { FALLBACK_SERVICES } from "@/lib/fallback-data";
import { SITE_URL } from "@/lib/seo";
import { DESTINATION_SEO_SECTIONS } from "@/lib/seo-content";

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/track",
  "/contact",
  "/destinations",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let siteLastMod = new Date("2026-10-25");

  const routes = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: siteLastMod,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  let serviceRoutes: MetadataRoute.Sitemap = [];

  if (isDatabaseConfigured()) {
    try {
      const settings = await prisma.setting.findUnique({
        where: { id: 1 },
        select: { updatedAt: true },
      });
      if (settings?.updatedAt) siteLastMod = settings.updatedAt;

      const services = await prisma.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      });
      serviceRoutes = services.map((s) => ({
        url: `${SITE_URL}/services/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    } catch {
      // DB unreachable — fall through to static service slugs below.
    }
  }

  if (serviceRoutes.length === 0) {
    serviceRoutes = FALLBACK_SERVICES.filter((s) => s.published).map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: siteLastMod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  }

  const destinationRoutes = DESTINATION_SEO_SECTIONS.map((d) => ({
    url: `${SITE_URL}/destinations/${d.slug}`,
    lastModified: siteLastMod,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...routes, ...destinationRoutes, ...serviceRoutes];
}