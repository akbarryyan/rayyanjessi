"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Penyedia gerak global (FR-030).
 *
 * `reducedMotion="user"` membuat Framer Motion mengikuti preferensi sistem.
 * Ini hanya menjangkau animasi Framer Motion; transisi CSS dan View Transitions
 * ditangani lapisan kedua berupa aturan @media pada app/globals.css
 * (research.md R-005).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
