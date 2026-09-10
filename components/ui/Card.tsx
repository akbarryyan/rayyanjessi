import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Kartu yang dapat ditekan mendapat penanda interaksi. */
  interactive?: boolean;
};

/**
 * Kartu yang lembut, membulat sedang, dan berfokus isi.
 * Bukan kartu metrik ala aplikasi bisnis (FR-006).
 */
export function Card({
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-lg border border-line bg-surface shadow-soft",
        interactive &&
          "transition-shadow duration-(--duration-quick) ease-out-soft hover:shadow-lifted",
        className,
      )}
    >
      {children}
    </div>
  );
}
