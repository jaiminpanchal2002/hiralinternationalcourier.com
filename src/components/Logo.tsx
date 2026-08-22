import { cn } from "@/lib/utils";

/**
 * Hiral International Courier — brand logo mark, recreated as scalable SVG
 * (winged globe carrying an upward parcel). Swap for the raster logo by
 * dropping /public/logo.png and using next/image if preferred.
 */
export function LogoMark({
  className,
  variant = "color",
}: {
  className?: string;
  variant?: "color" | "white";
}) {
  const primary = variant === "white" ? "#ffffff" : "url(#hiralBlue)";
  const accent = variant === "white" ? "rgba(255,255,255,0.75)" : "#00a6e0";
  const box = variant === "white" ? "#ffffff" : "#0b57c4";
  const boxTop = variant === "white" ? "rgba(255,255,255,0.85)" : "#38bdf8";

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Hiral International Courier logo"
    >
      <defs>
        <linearGradient id="hiralBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b57c4" />
          <stop offset="1" stopColor="#062c63" />
        </linearGradient>
      </defs>
      {/* Globe */}
      <circle cx="24" cy="36" r="15" fill="none" stroke={primary} strokeWidth="2.4" />
      <ellipse cx="24" cy="36" rx="6.5" ry="15" fill="none" stroke={primary} strokeWidth="1.6" />
      <path d="M10 30 H38 M9.5 42 H38.5" stroke={primary} strokeWidth="1.6" fill="none" />
      <path d="M24 21 V51" stroke={primary} strokeWidth="1.6" fill="none" />
      {/* Upward wing / arrow swoosh */}
      <path
        d="M18 40 C26 20, 40 14, 56 10 C50 16, 46 24, 44 34"
        fill="none"
        stroke={accent}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M44 34 L41 25 L52 28 Z"
        fill={accent}
      />
      {/* Parcel box riding the arrow */}
      <g transform="translate(40 6) rotate(12)">
        <path d="M0 4 L8 0 L16 4 L8 8 Z" fill={boxTop} />
        <path d="M0 4 L8 8 L8 16 L0 12 Z" fill={box} />
        <path d="M16 4 L8 8 L8 16 L16 12 Z" fill={box} opacity="0.82" />
      </g>
    </svg>
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
      <LogoMark className="h-11 w-11" variant={variant} />
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
