/** Static SEO copy for existing pages (no new URLs). */

export const HOME_FAQS = [
  {
    question: "Do you offer door-to-door international courier from Ahmedabad?",
    answer:
      "Yes. We collect from your address in Ahmedabad, Gandhinagar or nearby areas and deliver to your recipient's door abroad — including the USA, UK, Canada, Australia, Dubai and 200+ countries.",
  },
  {
    question: "How many days does courier to the USA take from Ahmedabad?",
    answer:
      "Express air courier to the USA typically takes about 5–8 working days after pickup, depending on customs and the final US city. We confirm transit time when you book.",
  },
  {
    question: "Can I send food or medicine abroad from Ahmedabad?",
    answer:
      "Many food parcels and medicines can be shipped with proper packing and documents. Medicines often need a prescription copy. Contact us before booking — rules vary by country.",
  },
  {
    question: "Do you serve Gandhinagar and Kalol as well as Ahmedabad?",
    answer:
      "Yes. Our office is in New Sahibaug, Ahmedabad. We arrange pickup across Ahmedabad, Gandhinagar, Kalol and surrounding Gujarat for international shipments.",
  },
  {
    question: "How is international courier price calculated?",
    answer:
      "Rates depend on destination, service (air or sea), and chargeable weight — the higher of actual weight or volumetric weight. Request a free quote on our contact page or WhatsApp.",
  },
  {
    question: "Is Hiral International Courier the same as Pardesh Parcel Seva?",
    answer:
      "Yes. Hiral International Courier Service is known locally as Pardesh Parcel Seva — trusted for personal parcels, food and gifts to family abroad.",
  },
];

export const DESTINATION_BLURBS: Record<string, string> = {
  us: "Documents, samples, gifts and personal effects — common USA routes from Gujarat.",
  gb: "UK deliveries for documents, clothes, medicines and care packages to family.",
  ca: "Popular for food parcels, gifts and student shipments to Toronto, Vancouver and more.",
  au: "Sydney, Melbourne and Perth — food-friendly options with proper packing.",
  ae: "Fast Gulf routes for documents, business samples and personal parcels to Dubai.",
  nz: "Auckland and Wellington — longer transit; ideal for non-urgent personal shipments.",
};

export type DestinationSeoSection = {
  slug: string;
  heading: string;
  transit: string;
  commonItems: string;
  notes: string;
};

export const DESTINATION_SEO_SECTIONS: DestinationSeoSection[] = [
  {
    slug: "usa",
    heading: "Courier to USA from Ahmedabad",
    transit: "Express air: typically 5–8 working days after pickup.",
    commonItems:
      "Documents, clothing, gifts, spices (where allowed), medicines with prescription, and personal effects.",
    notes:
      "US customs may inspect food and Ayurvedic products. We guide you on labels, invoices and restricted items before you ship.",
  },
  {
    slug: "uk",
    heading: "Courier to UK from Ahmedabad",
    transit: "Express air: typically 4–7 working days.",
    commonItems:
      "Documents, parcels to London and other cities, medicines, sweets and festival gifts.",
    notes:
      "Brexit-era rules still apply to certain goods. We help with commercial invoices and value declarations.",
  },
  {
    slug: "canada",
    heading: "Courier to Canada from Ahmedabad",
    transit: "Express air: typically 6–9 working days.",
    commonItems:
      "Food parcels (pickles, snacks where permitted), gifts, clothes and student care packages.",
    notes:
      "Canada has strict rules on some food items. Ask us before packing — we confirm what your province allows.",
  },
  {
    slug: "australia",
    heading: "Courier to Australia from Ahmedabad",
    transit: "Express air: typically 6–9 working days.",
    commonItems:
      "Personal parcels, documents, gifts and packaged food subject to biosecurity rules.",
    notes:
      "Australia enforces biosecurity on organic materials. We use compliant packing and documentation.",
  },
  {
    slug: "uae",
    heading: "Courier to Dubai & UAE from Ahmedabad",
    transit: "Express air: typically 3–5 working days.",
    commonItems:
      "Business documents, samples, personal effects and gifts within UAE customs limits.",
    notes:
      "One of our fastest lanes from Gujarat — popular for NRIs and small businesses.",
  },
  {
    slug: "new-zealand",
    heading: "Courier to New Zealand from Ahmedabad",
    transit: "Express air: typically 7–10 working days.",
    commonItems:
      "Gifts, clothing, documents and non-restricted personal items.",
    notes:
      "Similar biosecurity care as Australia; plan ahead for festivals and student intakes.",
  },
];

export const DESTINATIONS_FAQ = [
  {
    question: "How many days does courier to the USA take from Ahmedabad?",
    answer:
      "Most express air shipments reach the USA in about 5–8 working days after pickup from Ahmedabad, before last-mile delivery in the US. Sea cargo takes longer but costs less for heavy goods.",
  },
  {
    question: "Can I send food to Canada from Ahmedabad?",
    answer:
      "Many packaged, non-perishable food items can be sent with correct declaration and packing. Some items are restricted. Share your product list with us — we confirm Canada CFIA rules before booking.",
  },
  {
    question: "Do you offer door-to-door courier to the UK?",
    answer:
      "Yes. Door-to-door service from Ahmedabad to addresses across England, Scotland, Wales and Northern Ireland, with tracking on your AWB number.",
  },
];

export type ServiceSeoBlock = {
  sections: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const SERVICE_SEO: Record<string, ServiceSeoBlock> = {
  "air-cargo": {
    sections: [
      {
        title: "Who air cargo is for",
        body:
          "Businesses shipping samples and e-commerce orders, students sending documents, and families who need faster delivery than sea freight. We serve Ahmedabad, Gandhinagar, Kalol and nearby areas with pickup at your door.",
      },
      {
        title: "Our air cargo process",
        body:
          "Share destination and weight → receive a quote → we collect and professionally pack → export documentation and customs prep → flight dispatch → track with your AWB until door delivery abroad.",
      },
      {
        title: "Transit times from Ahmedabad",
        body:
          "USA and UK often 4–8 days express; Canada and Australia 6–9 days; UAE 3–5 days. Times are estimates after pickup and exclude customs delays beyond our control.",
      },
      {
        title: "Documents you may need",
        body:
          "KYC, commercial invoice, packing list, and country-specific forms. For medicines or commercial goods we advise on extra permits before shipping.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between express and economy air?",
        answer:
          "Express uses faster airline connections and priority handling; economy costs less with slightly longer transit. We recommend the best fit for your deadline and budget.",
      },
    ],
  },
  "sea-cargo": {
    sections: [
      {
        title: "When to choose sea cargo",
        body:
          "Ideal for heavy furniture, machinery parts, bulk commercial goods and large personal shipments where cost matters more than speed. Exporters from Ahmedabad and Gujarat use our FCL and LCL options regularly.",
      },
      {
        title: "Process and timelines",
        body:
          "We quote based on volume and destination port → collect and containerise → export clearance → ocean transit (often several weeks) → import clearance and delivery at destination.",
      },
      {
        title: "Packing for ocean transit",
        body:
          "Moisture, vibration and stacking require stronger crates and pallets. Our packaging team can prepare sea-worthy consignments at our New Sahibaug office.",
      },
    ],
    faqs: [
      {
        question: "Can I ship a heavy parcel abroad by sea from Ahmedabad?",
        answer:
          "Yes. Sea freight is the economical choice for heavy and bulky shipments. Share dimensions and weight for an accurate LCL or FCL quote.",
      },
    ],
  },
  "custom-clearance": {
    sections: [
      {
        title: "Export & import clearance support",
        body:
          "International shipments need correct HS codes, invoices and declarations. Our team handles export clearance from India and coordinates with partners abroad to reduce delays at borders.",
      },
      {
        title: "Who benefits",
        body:
          "First-time exporters, SMEs in Ahmedabad, and individuals sending high-value or regulated goods who want compliance handled by experienced staff.",
      },
    ],
    faqs: [
      {
        question: "Do you help with export documentation in Ahmedabad?",
        answer:
          "Yes. We assist with invoices, packing lists, and customs paperwork as part of your shipment booking.",
      },
    ],
  },
  packaging: {
    sections: [
      {
        title: "Professional packing for international courier",
        body:
          "Long flights and handling demand double-boxing, cushioning and moisture protection. We pack fragile items, electronics, and food parcels using materials suited to airline and customs inspection.",
      },
      {
        title: "Food parcel packing",
        body:
          "Vacuum sealing, leak-proof inner packs and clear labelling help food shipments pass inspection. Tell us what you are sending — we advise on shelf-stable packing from Ahmedabad.",
      },
    ],
    faqs: [
      {
        question: "Can you pack my parcel at your Ahmedabad office?",
        answer:
          "Yes. Bring items to New Sahibaug or schedule pickup — we pack on site before dispatch.",
      },
    ],
  },
  "commercial-logistics": {
    sections: [
      {
        title: "Export courier for businesses",
        body:
          "Recurring B2B shipments, bulk exports, and e-commerce fulfilment to the USA, UK, Canada, Australia and the Gulf. Volume pricing and scheduled pickups keep your supply chain predictable.",
      },
      {
        title: "E-commerce and bulk shipping",
        body:
          "We align with your dispatch calendar, provide tracking for every consignment, and support custom clearance for commercial invoices.",
      },
    ],
    faqs: [
      {
        question: "Do you offer export courier rates for Ahmedabad businesses?",
        answer:
          "Yes. Share monthly volume and destinations for tailored commercial rates.",
      },
    ],
  },
  "personal-parcels": {
    sections: [
      {
        title: "Food parcels abroad",
        body:
          "Homemade snacks, pickles, spices and festival sweets are popular from Gujarat to family overseas. We guide you on allowed items, shelf life, vacuum packing and customs labels for each country.",
      },
      {
        title: "Medicine courier",
        body:
          "Many customers send prescription medicines to the USA, UK, Canada and Australia. A valid prescription copy, patient details and original pharmacy labels are usually required. Contact us before shipping — quantities and brands are regulated.",
      },
      {
        title: "Documents & legal papers",
        body:
          "Fast document courier for visas, education papers and business contracts with tracking and secure handling from Ahmedabad.",
      },
      {
        title: "Gifts & festival parcels",
        body:
          "Rakhi, Diwali gifts, wedding parcels and care packages — Pardesh Parcel Seva is built for personal shipments with the same care as commercial cargo.",
      },
    ],
    faqs: [
      {
        question: "Can I send homemade food to the USA from Ahmedabad?",
        answer:
          "Some packaged, non-perishable items may be allowed; meat and fresh items are generally restricted. We review your list and recommend compliant packing before you pay.",
      },
      {
        question: "What documents are needed for medicine courier to the USA?",
        answer:
          "Typically a doctor's prescription, patient name matching the receiver, and commercial invoice declaring contents and value. Rules change — we confirm at booking.",
      },
    ],
  },
};

export const SERVICE_META: Record<
  string,
  { title: string; description: string }
> = {
  "air-cargo": {
    title: "Air Cargo & Express Courier from Ahmedabad | Hiral",
    description:
      "International air cargo and express courier from Ahmedabad to the USA, UK, Canada, Australia & Dubai. Door-to-door pickup, tracking & customs support.",
  },
  "sea-cargo": {
    title: "Sea Cargo from Ahmedabad: Heavy & Bulk Shipments | Hiral",
    description:
      "Affordable sea cargo from Ahmedabad for heavy parcels and bulk export. FCL & LCL, secure packing and export documentation for worldwide ports.",
  },
  "custom-clearance": {
    title: "Customs Clearance for International Shipments | Hiral Ahmedabad",
    description:
      "Custom clearance in Ahmedabad for export & import shipments. Invoices, compliance and border clearance so your cargo moves without delays.",
  },
  packaging: {
    title: "Professional Packing for International Courier | Hiral Ahmedabad",
    description:
      "Courier packing service in Ahmedabad — fragile goods, food parcels and export-grade crating for safe international transit.",
  },
  "commercial-logistics": {
    title: "Commercial Export & Bulk Shipping from Ahmedabad | Hiral",
    description:
      "Export courier and bulk shipping for Ahmedabad businesses. B2B logistics, e-commerce fulfilment and volume rates to global markets.",
  },
  "personal-parcels": {
    title: "Send Food, Medicine & Gifts Abroad from Ahmedabad | Hiral",
    description:
      "Personal parcels abroad: food, medicine, documents & gifts. Pardesh Parcel Seva — trusted door-to-door courier from New Sahibaug, Ahmedabad.",
  },
};

export const SERVICE_H1: Record<string, string> = {
  "air-cargo": "International Air Cargo from Ahmedabad",
  "sea-cargo": "Sea Cargo Service from Ahmedabad",
  "custom-clearance": "Customs Clearance Service",
  packaging: "Professional Packing for Courier Abroad",
  "commercial-logistics": "Commercial Logistics & Export Shipping",
  "personal-parcels": "Personal Parcels Abroad: Food, Medicine & Gifts",
};
