import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/data";

const display = Lexend({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hiralinternationalcourier.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Hiral International Courier Service | Ahmedabad to USA, UK, Canada, Australia",
    template: "%s | Hiral International Courier",
  },
  description:
    "Best international courier & cargo service in Ahmedabad. Reliable door-to-door delivery to USA, UK, Canada, Australia & 200+ countries. Air & sea cargo, custom clearance & secure packaging.",
  keywords: [
    "international courier Ahmedabad",
    "courier service to USA",
    "courier to UK",
    "courier to Canada",
    "courier to Australia",
    "parcel service Ahmedabad",
    "air cargo Ahmedabad",
    "sea cargo",
    "door to door delivery",
    "Hiral International Courier",
    "Pardesh Parcel Seva",
  ],
  authors: [{ name: "Hiral International Courier Service" }],
  creator: "Hiral International Courier Service",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Hiral International Courier Service",
    title:
      "Hiral International Courier Service | Global Shipping from Ahmedabad",
    description:
      "Fast, secure door-to-door international courier & cargo from Ahmedabad to USA, UK, Canada, Australia & 200+ countries.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiral International Courier Service",
    description:
      "Reliable global shipping & logistics from Ahmedabad to the world.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: SITE_URL },
  applicationName: "Hiral International Courier",
  category: "Logistics & Courier Services",
  // Paste the token from Google Search Console (Settings → Ownership → HTML tag)
  // into NEXT_PUBLIC_GOOGLE_VERIFICATION to auto-verify the domain.
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Pull live contact/social info so structured data stays in sync with the
  // admin panel. Falls back to defaults if the DB is unreachable at build time.
  let settings: Awaited<ReturnType<typeof getSettings>> | null = null;
  try {
    settings = await getSettings();
  } catch {
    settings = null;
  }

  // Social profile URLs Google uses to confirm this is one real entity.
  const sameAs = [settings?.facebook, settings?.instagram].filter(
    (u): u is string => typeof u === "string" && u.startsWith("http"),
  );

  const localBusiness = {
    "@type": ["MovingCompany", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: "Hiral International Courier Service",
    // Every way people type the brand → all map to this one business.
    alternateName: [
      "Hiral",
      "Hiral Courier",
      "Hiral International",
      "Hiral International Courier",
      "Hiral Courier Ahmedabad",
      "Hiral International Courier & Cargo",
    ],
    image: `${SITE_URL}/logo-full.png`,
    logo: `${SITE_URL}/logo-full.png`,
    url: SITE_URL,
    telephone: settings?.phonePrimary ?? "+91-91570-45048",
    email: settings?.email ?? "info@hiralinternational02.com",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shyam Elegance, Near Royal Arcade, New Sahibaug",
      addressLocality: "Ahmedabad",
      postalCode: "382330",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    areaServed: ["United States", "United Kingdom", "Canada", "Australia", "Worldwide"],
    description:
      "International courier and cargo service in Ahmedabad offering door-to-door delivery worldwide.",
    ...(sameAs.length ? { sameAs } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Hiral International Courier",
    alternateName: ["Hiral", "Hiral International", "Hiral International Courier Service"],
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-IN",
  };

  const jsonLd = { "@context": "https://schema.org", "@graph": [localBusiness, website] };

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
