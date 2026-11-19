import type {
  Destination,
  Service,
  Setting,
  Stat,
  Testimonial,
} from "@prisma/client";

const STAMP = new Date("2026-01-01T00:00:00.000Z");

/** Mirrors `Setting` schema defaults — used when `DATABASE_URL` is unset (e.g. CI build). */
export const FALLBACK_SETTINGS: Setting = {
  id: 1,
  companyName: "Hiral International Courier Service",
  tagline: "Reliable Global Shipping & Logistics Solutions",
  description:
    "Connecting Ahmedabad to the world. Fast, secure and hassle-free international courier and cargo services.",
  phonePrimary: "+91 91570 45048",
  phoneSecondary: "+91 91571 52701",
  email: "info@hiralinternationalcourier.com",
  addressLine:
    "Shyam Elegance, Near Royal Arcade, New Sahibaug, Ahmedabad 382330, Gujarat, India",
  mapEmbedUrl: "https://www.google.com/maps?q=Sahibaug+Ahmedabad&output=embed",
  businessHours: "Mon–Sat: 9:00 AM – 8:00 PM | Sun: Closed",
  whatsapp: "+919157045048",
  facebook: "",
  instagram: "",
  metaTitle:
    "Hiral International Courier Service | Ahmedabad to USA, UK, Canada, Australia",
  metaDescription:
    "Best international courier & cargo service in Ahmedabad. Door-to-door delivery to USA, UK, Canada, Australia & more. Air & sea cargo, custom clearance, secure packaging.",
  metaKeywords:
    "international courier Ahmedabad, courier to USA, courier to UK, cargo service, parcel service Ahmedabad, sea cargo, air cargo, door to door delivery",
  updatedAt: STAMP,
};

const serviceRows = [
  {
    title: "International Air Cargo",
    slug: "air-cargo",
    icon: "Plane",
    summary: "Fast, time-critical air freight to 200+ destinations worldwide.",
    description:
      "When speed matters, our international air cargo service delivers. We handle everything from small parcels to bulk commercial consignments with priority handling, real-time tracking and express customs clearance. Ideal for documents, samples, e-commerce orders and urgent shipments to the USA, UK, Canada, Australia and Europe.",
    features: JSON.stringify([
      "Priority express & economy air options",
      "Door-to-door pickup and delivery",
      "Real-time shipment tracking",
      "Fast customs clearance",
    ]),
    order: 1,
  },
  {
    title: "Ocean & Sea Cargo",
    slug: "sea-cargo",
    icon: "Ship",
    summary: "Cost-effective sea freight for large and heavy shipments.",
    description:
      "Our sea cargo service is the smart choice for bulky, heavy or non-urgent consignments. We offer both FCL (Full Container Load) and LCL (Less than Container Load) options with competitive rates, secure containerisation and complete documentation support for a smooth international transit.",
    features: JSON.stringify([
      "FCL & LCL container options",
      "Best rates for heavy cargo",
      "Secure, weatherproof packing",
      "Complete export documentation",
    ]),
    order: 2,
  },
  {
    title: "Custom Clearance",
    slug: "custom-clearance",
    icon: "FileCheck",
    summary: "Expert handling of all customs paperwork & compliance.",
    description:
      "Cross-border shipping means complex regulations. Our licensed experts manage the entire customs clearance process — duty calculation, documentation, regulatory compliance and liaison with authorities — so your shipment moves without costly delays or surprises.",
    features: JSON.stringify([
      "Import & export documentation",
      "Duty & tax advisory",
      "Regulatory compliance",
      "Zero-hassle border clearance",
    ]),
    order: 3,
  },
  {
    title: "Professional Packaging",
    slug: "packaging",
    icon: "Package",
    summary: "Secure, transit-grade packing that protects every parcel.",
    description:
      "Long international journeys demand robust protection. Our professional packaging service uses transit-grade materials and proven techniques to safeguard fragile, valuable and perishable goods from origin to final destination.",
    features: JSON.stringify([
      "Fragile & valuable item specialists",
      "Transit-grade materials",
      "Custom crating available",
      "Tamper-evident sealing",
    ]),
    order: 4,
  },
  {
    title: "Commercial Logistics",
    slug: "commercial-logistics",
    icon: "Building2",
    summary: "Bulk export solutions for businesses and exporters.",
    description:
      "From corporate bulk exports to recurring B2B shipments, we provide end-to-end commercial logistics with dedicated account management, volume pricing and reliable scheduled dispatch to keep your supply chain moving.",
    features: JSON.stringify([
      "Bulk & B2B export handling",
      "Dedicated account manager",
      "Volume-based pricing",
      "Scheduled recurring dispatch",
    ]),
    order: 5,
  },
  {
    title: "Personal Parcels",
    slug: "personal-parcels",
    icon: "Gift",
    summary: "Send love home — care packages, gifts & personal effects.",
    description:
      "Sending gifts, food, medicines or personal effects to loved ones abroad? Our personal parcel (Pardesh Parcel Seva) service offers affordable, reliable door-to-door delivery with the care your packages deserve.",
    features: JSON.stringify([
      "Affordable personal shipping",
      "Food & medicine friendly",
      "Door-to-door delivery",
      "Gift & care package specialists",
    ]),
    order: 6,
  },
] as const;

export const FALLBACK_SERVICES: Service[] = serviceRows.map((s, i) => ({
  ...s,
  id: `fallback-service-${i}`,
  published: true,
  createdAt: STAMP,
  updatedAt: STAMP,
}));

const destinationRows = [
  { name: "United States", code: "us", transitDays: "5–8 days", popular: true, order: 1 },
  { name: "United Kingdom", code: "gb", transitDays: "4–7 days", popular: true, order: 2 },
  { name: "Canada", code: "ca", transitDays: "6–9 days", popular: true, order: 3 },
  { name: "Australia", code: "au", transitDays: "6–9 days", popular: true, order: 4 },
  { name: "New Zealand", code: "nz", transitDays: "7–10 days", popular: false, order: 5 },
  { name: "Germany", code: "de", transitDays: "5–8 days", popular: false, order: 6 },
  { name: "UAE / Dubai", code: "ae", transitDays: "3–5 days", popular: true, order: 7 },
  { name: "Singapore", code: "sg", transitDays: "4–6 days", popular: false, order: 8 },
  { name: "Italy", code: "it", transitDays: "5–8 days", popular: false, order: 9 },
  { name: "France", code: "fr", transitDays: "5–8 days", popular: false, order: 10 },
  { name: "Saudi Arabia", code: "sa", transitDays: "4–6 days", popular: false, order: 11 },
  { name: "South Africa", code: "za", transitDays: "7–10 days", popular: false, order: 12 },
] as const;

export const FALLBACK_DESTINATIONS: Destination[] = destinationRows.map((d, i) => ({
  ...d,
  id: `fallback-destination-${i}`,
  published: true,
}));

export const FALLBACK_STATS: Stat[] = [
  { id: "fallback-stat-0", label: "Years of Experience", value: "4", suffix: "+", order: 1 },
  { id: "fallback-stat-1", label: "Countries Served", value: "200", suffix: "+", order: 2 },
  { id: "fallback-stat-2", label: "Parcels Delivered", value: "50", suffix: "K+", order: 3 },
  { id: "fallback-stat-3", label: "Happy Customers", value: "12", suffix: "K+", order: 4 },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "fallback-testimonial-0",
    name: "Rajesh Patel",
    role: "Exporter, Ahmedabad",
    quote:
      "Hiral has handled my export shipments to the USA for two years. Always on time, fully documented, and their customs team is excellent. Highly recommended.",
    rating: 5,
    order: 1,
    published: true,
    createdAt: STAMP,
  },
  {
    id: "fallback-testimonial-1",
    name: "Priya Shah",
    role: "Sent parcel to UK",
    quote:
      "I sent a care package to my son in London. The door-to-door service was smooth and I could track it the whole way. Very trustworthy team.",
    rating: 5,
    order: 2,
    published: true,
    createdAt: STAMP,
  },
  {
    id: "fallback-testimonial-2",
    name: "Amit Desai",
    role: "Business Owner",
    quote:
      "Best rates for sea cargo I found in Ahmedabad. Professional packaging and honest advice on duties. My go-to courier for Canada shipments.",
    rating: 5,
    order: 3,
    published: true,
    createdAt: STAMP,
  },
  {
    id: "fallback-testimonial-3",
    name: "Neha Joshi",
    role: "Sent parcel to Australia",
    quote:
      "Reliable and friendly. They packed my fragile items carefully and everything arrived in perfect condition in Sydney. Thank you Hiral team!",
    rating: 5,
    order: 4,
    published: true,
    createdAt: STAMP,
  },
];