"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, CheckCircle2, KeyRound } from "lucide-react";
import { updateSettings, changePassword } from "@/app/admin/actions";

type Settings = Record<string, string>;

const input =
  "w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none focus:border-brand focus:bg-white";

function Text({
  name,
  label,
  value,
  full,
  textarea,
  help,
}: {
  name: string;
  label: string;
  value: string;
  full?: boolean;
  textarea?: boolean;
  help?: string;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-brand-navy">
        {label}
      </label>
      {textarea ? (
        <textarea id={name} name={name} rows={3} defaultValue={value} className={input + " resize-none"} />
      ) : (
        <input id={name} name={name} defaultValue={value} className={input} />
      )}
      {help && <p className="mt-1 text-xs text-muted-foreground">{help}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
      <h2 className="font-display text-lg font-bold text-brand-navy">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSaved(false);
    start(async () => {
      await updateSettings(fd);
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <Section title="Company & Brand">
        <Text name="companyName" label="Company Name" value={settings.companyName} full />
        <Text name="tagline" label="Tagline" value={settings.tagline} full />
        <Text name="description" label="Short Description" value={settings.description} full textarea />
      </Section>

      <Section title="Contact Details">
        <Text name="phonePrimary" label="Primary Phone" value={settings.phonePrimary} />
        <Text name="phoneSecondary" label="Secondary Phone" value={settings.phoneSecondary} />
        <Text name="email" label="Email" value={settings.email} />
        <Text name="businessHours" label="Business Hours" value={settings.businessHours} />
        <Text name="addressLine" label="Office Address" value={settings.addressLine} full textarea />
        <Text name="mapEmbedUrl" label="Google Maps Embed URL" value={settings.mapEmbedUrl} full help="The src URL from a Google Maps embed iframe" />
      </Section>

      <Section title="Social & WhatsApp">
        <Text name="whatsapp" label="WhatsApp Number" value={settings.whatsapp} help="With country code, e.g. +919157045048" />
        <div className="hidden sm:block" />
        <Text name="facebook" label="Facebook URL" value={settings.facebook} />
        <Text name="instagram" label="Instagram URL" value={settings.instagram} />
      </Section>

      <Section title="SEO">
        <Text name="metaTitle" label="Meta Title" value={settings.metaTitle} full />
        <Text name="metaDescription" label="Meta Description" value={settings.metaDescription} full textarea />
        <Text name="metaKeywords" label="Meta Keywords" value={settings.metaKeywords} full help="Comma-separated" />
      </Section>

      <div className="sticky bottom-4 flex items-center justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 rounded-xl bg-brand-gradient px-7 py-3 font-semibold text-white shadow-brand disabled:opacity-70"
        >
          {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          Save Changes
        </button>
      </div>
    </form>
  );
}

export function PasswordForm() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setMsg(null);
    start(async () => {
      try {
        await changePassword(fd);
        setMsg({ ok: true, text: "Password updated successfully." });
        form.reset();
      } catch (err) {
        setMsg({ ok: false, text: err instanceof Error ? err.message : "Failed" });
      }
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brand-navy">
        <KeyRound className="h-5 w-5 text-brand" /> Change Password
      </h2>
      <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 sm:max-w-sm">
          <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Current Password</label>
          <input name="current" type="password" required className={input} />
        </div>
        <div className="sm:col-span-2 sm:max-w-sm">
          <label className="mb-1.5 block text-sm font-semibold text-brand-navy">New Password</label>
          <input name="next" type="password" required minLength={6} className={input} />
        </div>
        {msg && (
          <p className={`sm:col-span-2 text-sm font-medium ${msg.ok ? "text-success" : "text-danger"}`}>
            {msg.text}
          </p>
        )}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="flex items-center gap-2 rounded-xl border border-brand px-6 py-2.5 text-sm font-semibold text-brand hover:bg-brand/10 disabled:opacity-70"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
