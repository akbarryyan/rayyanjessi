import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet" | "destructive";
type Size = "sm" | "md";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Menampilkan keadaan memuat dan menonaktifkan tombol selama berlangsung. */
  loading?: boolean;
  children: ReactNode;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink border border-transparent hover:brightness-110",
  secondary:
    "bg-surface text-ink border border-line-strong hover:bg-surface-sunken",
  quiet:
    "bg-transparent text-ink-soft border border-transparent hover:bg-surface-sunken hover:text-ink",
  destructive:
    "bg-critical text-accent-ink border border-transparent hover:brightness-110",
};

const SIZES: Record<Size, string> = {
  // Tinggi minimum menjaga sasaran sentuh tetap nyaman di ponsel (FR-035).
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      // Keadaan memuat diumumkan, tidak hanya ditandai secara visual (FR-038).
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md",
        "font-medium transition-[background-color,color,filter]",
        "duration-(--duration-quick) ease-out-soft",
        "disabled:cursor-not-allowed disabled:opacity-55",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          <span>Sebentar ya…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
