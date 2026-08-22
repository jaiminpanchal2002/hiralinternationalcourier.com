import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";

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
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Hiral International Courier Service",
    image: `${SITE_URL}/logo.png`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: "+91-91570-45048",
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
  };

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
