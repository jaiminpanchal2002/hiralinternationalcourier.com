import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
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
      <Navbar phone={settings.phonePrimary} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat number={settings.whatsapp} />
    </>
  );
}
