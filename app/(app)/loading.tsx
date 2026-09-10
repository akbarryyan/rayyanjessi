import { PageSkeleton } from "@/components/ui/PageSkeleton";

/**
 * Kerangka bawaan untuk seluruh halaman bagian (FR-021).
 *
 * Halaman yang bentuknya berbeda — galeri, misalnya — menyediakan
 * loading.tsx sendiri dengan varian yang sesuai.
 */
export default function Loading() {
  return <PageSkeleton />;
}
