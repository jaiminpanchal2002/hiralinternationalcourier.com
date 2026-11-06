import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Gtm } from "@/components/Gtm";
import { GtmClickTracker } from "@/components/GtmClickTracker";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <>
      <Gtm />
      <GtmClickTracker />
      <Navbar phone={settings.phonePrimary} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat number={settings.whatsapp} />
    </>
  );
}
