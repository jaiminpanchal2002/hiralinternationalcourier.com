import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Hiral International Courier — official logo (plane · ship · truck emblem +
 * navy/teal/gold wordmark). The artwork is designed for LIGHT backgrounds, so
 * on dark surfaces it is placed on a light card (see <LogoCard>).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-icon.png"
      alt="Hiral International Courier"
      width={1043}
      height={598}
      priority
      className={cn("w-auto object-contain", className)}
    />
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-full.png"
      alt="Hiral International Courier"
      width={1084}
      height={918}
      priority
      className={cn("w-auto object-contain", className)}
    />
  );
}

/** Emblem + wordmark for light backgrounds (navbar). */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 sm:h-11" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-extrabold tracking-tight text-brand-navy">
          HIRAL
        </span>
        <span className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-brand">
          International Courier
        </span>
      </span>
    </span>
  );
}

/** Full lockup on a light card — for dark surfaces (footer, login, admin). */
export function LogoCard({
  className,
  height = "h-14",
}: {
  className?: string;
  height?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-sm",
        className,
      )}
    >
      <LogoFull className={height} />
    </span>
  );
}
