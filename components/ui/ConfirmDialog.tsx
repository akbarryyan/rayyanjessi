"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

/**
 * Konfirmasi untuk aksi yang menghapus sesuatu (FR-018).
 *
 * `consequences` wajib diisi: konfirmasi yang hanya bertanya "yakin?" tidak
 * memberi tahu apa yang akan hilang. Untuk penghapusan yang menyentuh lebih
 * dari satu hal, sebutkan semuanya.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  consequences,
  confirmLabel,
  onConfirm,
  trigger,
  pending = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Apa saja yang akan ikut terhapus. Ditulis dengan bahasa pasangan. */
  consequences: string;
  confirmLabel: string;
  onConfirm: () => void;
  trigger?: ReactNode;
  pending?: boolean;
}) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      title={title}
      description={consequences}
      footer={
        <>
          <Button variant="quiet" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button variant="destructive" loading={pending} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}
