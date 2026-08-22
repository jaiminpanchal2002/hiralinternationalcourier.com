import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Hiral International Courier — official logo mark (extracted from the brand
 * artwork). `color` for light backgrounds, `white` (reversed) for dark ones.
 * Sizing is controlled by height via className; width scales automatically.
 */
export function LogoMark({
  className,
  variant = "color",
}: {
  className?: string;
  variant?: "color" | "white";
}) {
  const src = variant === "white" ? "/logo-white.png" : "/logo.png";
  return (
    <Image
      src={src}
      alt="Hiral International Courier logo"
      width={420}
      height={301}
      priority
      className={cn("w-auto object-contain", className)}
    />
  );
}

export function Logo({
  variant = "color",
  className,
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  const text = variant === "white" ? "text-white" : "text-brand-navy";
  const sub = variant === "white" ? "text-white/70" : "text-brand";
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-11" variant={variant} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-2xl font-extrabold tracking-tight",
            text,
          )}
        >
          HIRAL
        </span>
        <span
          className={cn(
            "text-[0.58rem] font-semibold uppercase tracking-[0.18em]",
            sub,
          )}
        >
          International Courier
        </span>
      </span>
    </span>
  );
}
