"use client";

import { Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Lapisan dialog.
 *
 * Perilaku yang wajib dan dipenuhi primitif Radix (FR-039):
 * menahan fokus selama terbuka, mengembalikan fokus ke pemicu setelah ditutup,
 * dapat ditutup dengan Escape, mengunci gulir halaman di belakangnya, dan
 * menandai dirinya sebagai dialog bagi pembaca layar.
 *
 * Animasinya memakai transisi CSS, sehingga otomatis dipangkas oleh aturan
 * kurangi-gerak global (FR-030).
 *
 * Pemicu sebaiknya diberikan lewat prop `trigger`. Dengan begitu Radix
 * memiliki hubungan pemicu-dialog dan menjamin fokus kembali ke pemicunya
 * setelah ditutup. Tanpa itu, fokus hanya kembali ke elemen yang kebetulan
 * aktif sebelum dialog terbuka — yang tidak selalu pemicunya.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** Elemen pemicu. Diberikan agar fokus dijamin kembali ke sini (FR-039). */
  trigger?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-40 bg-ink/25",
            "data-[state=open]:animate-in data-[state=open]:fade-in",
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-lg border border-line bg-surface p-6 shadow-lifted",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="font-display text-2xl leading-snug text-ink">
            {title}
          </Dialog.Title>
          {description ? (
            <Dialog.Description className="mt-2 text-base leading-relaxed text-ink-soft">
              {description}
            </Dialog.Description>
          ) : null}
          {children ? <div className="mt-5">{children}</div> : null}
          {footer ? (
            <div className="mt-6 flex flex-wrap justify-end gap-3">{footer}</div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
