"use client";

import { Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Laci penyuntingan kontekstual.
 *
 * Perilaku fokus, Escape, dan penguncian gulirnya sama persis dengan Modal —
 * keduanya dibangun di atas primitif dialog yang sama, sehingga tidak mungkin
 * menyimpang (FR-039).
 *
 * Di ponsel ia muncul dari bawah; di layar besar dari sisi kanan.
 */
export function Drawer({
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
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/25" />
        <Dialog.Content
          className={cn(
            "fixed z-50 flex flex-col gap-4 border-line bg-surface shadow-lifted focus:outline-none",
            "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t p-6",
            "sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-96 sm:rounded-none sm:rounded-l-xl sm:border-l sm:border-t-0",
          )}
        >
          <Dialog.Title className="font-display text-2xl leading-snug text-ink">
            {title}
          </Dialog.Title>
          {description ? (
            <Dialog.Description className="text-base leading-relaxed text-ink-soft">
              {description}
            </Dialog.Description>
          ) : null}
          <div className="flex-1 overflow-y-auto">{children}</div>
          {footer ? (
            <div className="flex flex-wrap justify-end gap-3">{footer}</div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
