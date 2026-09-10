"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/motion/durations";

/**
 * Kemunculan yang lembut untuk kartu dan blok isi (FR-031).
 *
 * Geserannya sengaja kecil dan durasinya pendek: animasi di sini melayani
 * rasa, bukan menahan pasangan yang sedang ingin bertindak.
 *
 * Preferensi kurangi-gerak ditangani MotionProvider di root layout, sehingga
 * komponen ini tidak perlu memeriksanya sendiri (research.md R-005).
 */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: DURATION.gentle, ease: EASE.outSoft, delay }}
    >
      {children}
    </motion.div>
  );
}
