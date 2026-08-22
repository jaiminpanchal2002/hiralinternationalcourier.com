import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---- Admin ----
  const email = process.env.ADMIN_EMAIL || "admin@hiralinternational02.com";
  const password = process.env.ADMIN_PASSWORD || "Hiral@2025";
  const name = process.env.ADMIN_NAME || "Hiral Admin";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { name, passwordHash },
    create: { email, name, passwordHash },
  });
  console.log(`✓ Admin ready: ${email}`);

  // ---- Settings (singleton row id=1) ----
  await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  console.log("✓ Settings initialised");

  // ---- Services ----
  const services = [
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
  ];
  await prisma.service.deleteMany();
  for (const s of services) await prisma.service.create({ data: s });
  console.log(`✓ ${services.length} services seeded`);

  // ---- Destinations ----
  const destinations = [
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
  ];
  await prisma.destination.deleteMany();
  await prisma.destination.createMany({ data: destinations });
  console.log(`✓ ${destinations.length} destinations seeded`);

  // ---- Stats ----
  const stats = [
    { label: "Years of Experience", value: "4", suffix: "+", order: 1 },
    { label: "Countries Served", value: "200", suffix: "+", order: 2 },
    { label: "Parcels Delivered", value: "50", suffix: "K+", order: 3 },
    { label: "Happy Customers", value: "12", suffix: "K+", order: 4 },
  ];
  await prisma.stat.deleteMany();
  await prisma.stat.createMany({ data: stats });
  console.log(`✓ ${stats.length} stats seeded`);

  // ---- Testimonials ----
  const testimonials = [
    {
      name: "Rajesh Patel",
      role: "Exporter, Ahmedabad",
      quote:
        "Hiral has handled my export shipments to the USA for two years. Always on time, fully documented, and their customs team is excellent. Highly recommended.",
      rating: 5,
      order: 1,
    },
    {
      name: "Priya Shah",
      role: "Sent parcel to UK",
      quote:
        "I sent a care package to my son in London. The door-to-door service was smooth and I could track it the whole way. Very trustworthy team.",
      rating: 5,
      order: 2,
    },
    {
      name: "Amit Desai",
      role: "Business Owner",
      quote:
        "Best rates for sea cargo I found in Ahmedabad. Professional packaging and honest advice on duties. My go-to courier for Canada shipments.",
      rating: 5,
      order: 3,
    },
    {
      name: "Neha Joshi",
      role: "Sent parcel to Australia",
      quote:
        "Reliable and friendly. They packed my fragile items carefully and everything arrived in perfect condition in Sydney. Thank you Hiral team!",
      rating: 5,
      order: 4,
    },
  ];
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonials });
  console.log(`✓ ${testimonials.length} testimonials seeded`);

  // ---- FAQs ----
  const faqs = [
    {
      question: "How long does international delivery take?",
      answer:
        "Transit times vary by destination and service. Air cargo to the USA/UK typically takes 4–8 days, while sea cargo takes longer but costs less. We give you an accurate estimate when you book.",
      category: "Shipping",
      order: 1,
    },
    {
      question: "How do I track my shipment?",
      answer:
        "Every shipment gets a unique AWB (Air Waybill) tracking number. Enter it in the Track & Trace box on our homepage or the tracking page to see live status updates.",
      category: "Tracking",
      order: 2,
    },
    {
      question: "What items are restricted or prohibited?",
      answer:
        "Restricted items include liquids, batteries, perishables and hazardous materials, and rules differ by country. Contact us before booking and our team will confirm what can be shipped to your destination.",
      category: "Shipping",
      order: 3,
    },
    {
      question: "How is shipping cost calculated?",
      answer:
        "Cost is based on the greater of actual weight or volumetric weight (L×W×H in cm ÷ 5000), the destination, and the service chosen. Request a free quote and we'll give you the best rate.",
      category: "Pricing",
      order: 4,
    },
    {
      question: "Do you offer door-to-door delivery?",
      answer:
        "Yes. We collect from your address in Ahmedabad and deliver right to your recipient's door abroad — a complete door-to-door service.",
      category: "Shipping",
      order: 5,
    },
    {
      question: "Which countries do you deliver to?",
      answer:
        "We ship to the USA, UK, Canada, Australia, Europe, the Gulf and 200+ destinations worldwide. If you don't see your country listed, just ask — we most likely cover it.",
      category: "General",
      order: 6,
    },
  ];
  await prisma.faq.deleteMany();
  await prisma.faq.createMany({ data: faqs });
  console.log(`✓ ${faqs.length} FAQs seeded`);

  // ---- Sample shipments (for tracking demo) ----
  await prisma.shipment.deleteMany();
  const s1 = await prisma.shipment.create({
    data: {
      awb: "HIRAL10001",
      status: "In Transit",
      senderName: "Rajesh Patel",
      receiverName: "John Miller",
      origin: "Ahmedabad, India",
      destination: "New York, USA",
      service: "Air Cargo — Express",
      weight: "12.5 kg",
      currentLocation: "Dubai Transit Hub, UAE",
      estimatedDelivery: new Date(Date.now() + 4 * 86400000),
      events: {
        create: [
          { status: "Booked", location: "Ahmedabad, India", note: "Shipment booked and picked up", timestamp: new Date(Date.now() - 3 * 86400000) },
          { status: "Departed Origin", location: "Ahmedabad, India", note: "Departed origin facility", timestamp: new Date(Date.now() - 2 * 86400000) },
          { status: "In Transit", location: "Dubai Transit Hub, UAE", note: "Arrived at international transit hub", timestamp: new Date(Date.now() - 1 * 86400000) },
        ],
      },
    },
  });
  const s2 = await prisma.shipment.create({
    data: {
      awb: "HIRAL10002",
      status: "Delivered",
      senderName: "Priya Shah",
      receiverName: "Aarav Shah",
      origin: "Ahmedabad, India",
      destination: "London, UK",
      service: "Air Cargo — Economy",
      weight: "8.0 kg",
      currentLocation: "London, UK",
      estimatedDelivery: new Date(Date.now() - 1 * 86400000),
      events: {
        create: [
          { status: "Booked", location: "Ahmedabad, India", note: "Shipment booked", timestamp: new Date(Date.now() - 8 * 86400000) },
          { status: "In Transit", location: "Dubai, UAE", note: "In international transit", timestamp: new Date(Date.now() - 6 * 86400000) },
          { status: "Customs Clearance", location: "London, UK", note: "Cleared UK customs", timestamp: new Date(Date.now() - 3 * 86400000) },
          { status: "Out for Delivery", location: "London, UK", note: "Out for final delivery", timestamp: new Date(Date.now() - 2 * 86400000) },
          { status: "Delivered", location: "London, UK", note: "Delivered and signed for", timestamp: new Date(Date.now() - 1 * 86400000) },
        ],
      },
    },
  });
  console.log(`✓ Sample shipments seeded: ${s1.awb}, ${s2.awb}`);

  // ---- Sample leads (CRM demo) ----
  await prisma.lead.deleteMany();
  await prisma.lead.createMany({
    data: [
      { name: "Meena Trivedi", phone: "+919824012345", email: "meena@example.com", source: "WhatsApp", status: "New", destination: "Canada", message: "Want to send 10kg parcel to Toronto", value: "₹6,500" },
      { name: "Sanjay Mehta", phone: "+919912345678", source: "Facebook", status: "Contacted", destination: "USA", message: "Enquiry from Facebook ad about sea cargo", value: "₹45,000" },
      { name: "Ravi Patel", phone: "+447700900123", email: "ravi@example.co.uk", source: "Website", status: "Quoted", destination: "UK", message: "Documents to London, urgent", value: "₹3,200" },
      { name: "Anita Shah", phone: "+61412345678", email: "anita@example.com", source: "Instagram", status: "Won", destination: "Australia", message: "Care package to Sydney", value: "₹8,900" },
    ],
  });
  console.log("✓ Sample leads seeded");

  console.log("\n🎉 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
