"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Modal } from "@/components/ui/Modal";
import { DURATION, EASE } from "@/lib/motion/durations";
import type { SectionData } from "@/lib/view-models";
import type { OpenWhenTrigger } from "@/lib/view-models/open-when";

/**
 * Kartu pemicu bergaya amplop (FR-051).
 *
 * Membuka sebuah kartu memunculkan amplop yang harus dibuka sekali lagi —
 * jeda kecil yang disengaja, supaya membuka surat terasa seperti membuka
 * surat, bukan seperti membuka baris tabel.
 *
 * Preferensi kurangi-gerak ditangani MotionProvider, sehingga jedanya tetap
 * ada tetapi gerakannya tidak (research.md R-005).
 */
export function TriggerCards({
  data,
}: {
  data: SectionData<OpenWhenTrigger[]>;
}) {
  const [opening, setOpening] = useState<OpenWhenTrigger | null>(null);

  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada surat titipan."
        lede="Tulis satu untuk hari yang belum tentu datang."
        action={<Button variant="secondary">Tulis yang pertama</Button>}
      />
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((trigger) => (
          <li key={trigger.id}>
            <motion.button
              type="button"
              onClick={() => setOpening(trigger)}
              whileHover={{ y: -2 }}
              transition={{ duration: DURATION.quick, ease: EASE.outSoft }}
              className="flex min-h-36 w-full flex-col items-start gap-3 rounded-lg border border-line bg-surface p-6 text-left shadow-soft"
            >
              <span aria-hidden="true" className="text-3xl leading-none">
                {trigger.emblem}
              </span>
              <span className="font-display text-xl leading-snug text-ink">
                Buka saat {trigger.title.toLowerCase()}
              </span>
              {trigger.opened ? (
                <span className="text-sm text-ink-faint">Pernah dibuka</span>
              ) : null}
            </motion.button>
          </li>
        ))}
      </ul>

      <Modal
        open={opening !== null}
        onOpenChange={(open) => !open && setOpening(null)}
        title="Buka suratnya sekarang?"
        description={
          opening
            ? `Surat ini dititipkan untuk saat ${opening.title.toLowerCase()}.`
            : undefined
        }
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpening(null)}>
              Nanti saja
            </Button>
            <Button onClick={() => setOpening(null)}>Buka suratnya</Button>
          </>
        }
      >
        <p aria-hidden="true" className="py-6 text-center text-5xl">
          ✉️
        </p>
      </Modal>
    </>
  );
}
