import { getSettings } from "@/lib/data";
import { SettingsForm, PasswordForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const s = await getSettings();
  const settings = {
    companyName: s.companyName,
    tagline: s.tagline,
    description: s.description,
    phonePrimary: s.phonePrimary,
    phoneSecondary: s.phoneSecondary,
    email: s.email,
    addressLine: s.addressLine,
    mapEmbedUrl: s.mapEmbedUrl,
    businessHours: s.businessHours,
    whatsapp: s.whatsapp,
    facebook: s.facebook,
    instagram: s.instagram,
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    metaKeywords: s.metaKeywords,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your company details, contact info and SEO — changes reflect on
          the website immediately.
        </p>
      </div>
      <SettingsForm settings={settings} />
      <div className="mt-6">
        <PasswordForm />
      </div>
    </div>
  );
}
