import { Reveal } from "./motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest",
              dark ? "bg-white/10 text-accent-2" : "bg-brand/10 text-brand",
            )}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-4 font-display text-3xl font-extrabold sm:text-4xl",
            dark ? "text-white" : "text-brand-navy",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed",
              dark ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
