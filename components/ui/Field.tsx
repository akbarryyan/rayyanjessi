"use client";

import { createContext, useContext, useId } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldContext = {
  inputId: string;
  errorId: string;
  hintId: string;
  hasError: boolean;
  hasHint: boolean;
};

const Ctx = createContext<FieldContext | null>(null);

export function useField(): FieldContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Komponen isian harus berada di dalam <Field>.");
  return ctx;
}

/**
 * Pembungkus kolom isian: label terkait, petunjuk, dan pesan kegagalan.
 *
 * Pesan kegagalan diumumkan ke pembaca layar dan terkait dengan kolomnya
 * lewat aria-describedby (FR-040). Keadaan gagal ditandai lebih dari sekadar
 * warna — ada ikon dan teks (FR-038).
 */
export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  const base = useId();
  const value: FieldContext = {
    inputId: `${base}-input`,
    errorId: `${base}-error`,
    hintId: `${base}-hint`,
    hasError: Boolean(error),
    hasHint: Boolean(hint),
  };

  return (
    <Ctx.Provider value={value}>
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label htmlFor={value.inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
        {hint ? (
          <p id={value.hintId} className="text-sm text-ink-faint">
            {hint}
          </p>
        ) : null}
        {children}
        {error ? (
          <p
            id={value.errorId}
            role="alert"
            className="flex items-start gap-1.5 text-sm text-critical"
          >
            <span aria-hidden="true">!</span>
            <span>{error}</span>
          </p>
        ) : null}
      </div>
    </Ctx.Provider>
  );
}

/** Kelas bersama seluruh kendali isian, agar ketiganya tidak menyimpang. */
export const controlClassName = cn(
  "w-full rounded-md border bg-surface px-3 py-2.5 text-base text-ink",
  "placeholder:text-ink-faint",
  "transition-colors duration-(--duration-quick) ease-out-soft",
  "disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:opacity-70",
  "read-only:bg-surface-sunken",
);

export function describedBy(ctx: FieldContext): string | undefined {
  const ids = [ctx.hasHint && ctx.hintId, ctx.hasError && ctx.errorId].filter(
    Boolean,
  ) as string[];
  return ids.length ? ids.join(" ") : undefined;
}
