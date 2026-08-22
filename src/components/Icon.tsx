import {
  Plane,
  Ship,
  FileCheck,
  Package,
  Building2,
  Gift,
  Globe,
  Truck,
  ShieldCheck,
  Clock,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Plane,
  Ship,
  FileCheck,
  Package,
  Building2,
  Gift,
  Globe,
  Truck,
  ShieldCheck,
  Clock,
};

/** Resolve a lucide icon by the name stored in the DB (falls back to Package). */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = MAP[name] ?? Package;
  return <Cmp className={className} />;
}
