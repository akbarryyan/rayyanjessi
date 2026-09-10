import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "positive" | "critical" | "accent";

const TONES: Record<Tone, string> = {
  neutral: "bg-surface-sunken text-ink-soft border-line",
  positive: "bg-positive-soft text-positive border-positive/25",
  critical: "bg-critical-soft text-critical border-critical/25",
  accent: "bg-accent-soft text-accent border-accent/25",
};

/**
 * Lencana keadaan. Maknanya selalu dibawa teksnya, tidak pernah warnanya
 * saja (FR-038).
 */
export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
