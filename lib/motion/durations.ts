/**
 * Nilai gerak, dicerminkan dari token pada app/globals.css.
 * Dipakai komponen Framer Motion yang tidak dapat membaca custom property CSS
 * secara langsung.
 */
export const DURATION = {
  instant: 0.09,
  quick: 0.16,
  gentle: 0.26,
  slow: 0.42,
} as const;

export const EASE = {
  outSoft: [0.22, 1, 0.36, 1],
  inOutSoft: [0.65, 0, 0.35, 1],
} as const;
