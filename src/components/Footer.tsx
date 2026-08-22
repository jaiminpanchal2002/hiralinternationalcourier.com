import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { LogoCard } from "./Logo";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

type Settings = {
  companyName: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  addressLine: string;
  businessHours: string;
  facebook: string;
  instagram: string;
};

export function Footer({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-ink text-white/80">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <LogoCard height="h-16" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Ahmedabad&apos;s trusted partner for reliable, door-to-door
              international courier & cargo — connecting you to the world.
            </p>
            <div className="mt-5 flex gap-3">
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              )}
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white">Our Services</Link></li>
              <li><Link href="/destinations" className="hover:text-white">Destinations</Link></li>
              <li><Link href="/track" className="hover:text-white">Track & Trace</Link></li>
              <li><Link href="/contact" className="hover:text-white">Get a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/services/air-cargo" className="hover:text-white">Air Cargo</Link></li>
              <li><Link href="/services/sea-cargo" className="hover:text-white">Sea Cargo</Link></li>
              <li><Link href="/services/custom-clearance" className="hover:text-white">Custom Clearance</Link></li>
              <li><Link href="/services/packaging" className="hover:text-white">Packaging</Link></li>
              <li><Link href="/services/personal-parcels" className="hover:text-white">Personal Parcels</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{settings.addressLine}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span className="flex flex-col">
                  <a href={`tel:${settings.phonePrimary.replace(/\s/g, "")}`} className="hover:text-white">{settings.phonePrimary}</a>
                  <a href={`tel:${settings.phoneSecondary.replace(/\s/g, "")}`} className="hover:text-white">{settings.phoneSecondary}</a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <a href={`mailto:${settings.email}`} className="hover:text-white break-all">{settings.email}</a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{settings.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© {year} {settings.companyName}. All rights reserved.</p>
          <p>Door to Door Delivery · જૂના અને જાણીતા રાણીપવાળા</p>
        </div>
      </div>
    </footer>
  );
}
