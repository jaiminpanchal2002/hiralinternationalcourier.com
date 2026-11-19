import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hiralinternationalcourier.com";

export const BUSINESS_EMAIL = "info@hiralinternationalcourier.com";

/** Geo for New Sahibaug office (approximate). */
export const BUSINESS_GEO = {
  latitude: 23.0594,
  longitude: 72.6022,
};

export const BUSINESS_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Shyam+Elegance+Near+Royal+Arcade+New+Sahibaug+Ahmedabad+382330";

/** Default social preview (also generated via `app/opengraph-image.tsx`). */
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Hiral International Courier — Ahmedabad to worldwide door-to-door shipping",
} as const;

export function canonicalPath(path: string): Metadata["alternates"] {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return { canonical: normalized === "/" ? "/" : normalized };
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: canonicalPath(path),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceJsonLd(service: {
  title: string;
  slug: string;
  summary: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: {
      "@type": "City",
      name: "Ahmedabad",
      containedInPlace: { "@type": "State", name: "Gujarat" },
    },
    url: `${SITE_URL}/services/${service.slug}`,
  };
}
