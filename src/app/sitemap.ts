import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

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
  try {
    const settings = await prisma.setting.findUnique({
      where: { id: 1 },
      select: { updatedAt: true },
    });
    if (settings?.updatedAt) siteLastMod = settings.updatedAt;
  } catch {
    // DB not reachable at build time — use audit date fallback.
  }

  const routes = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: siteLastMod,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  let services: { slug: string; updatedAt: Date }[] = [];
  try {
    services = await prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    // DB not reachable at build time — return static routes only.
  }

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
