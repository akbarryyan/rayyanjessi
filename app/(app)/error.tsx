"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/ErrorState";

/**
 * Penanganan kegagalan untuk seluruh halaman bagian (FR-023, FR-024).
 *
 * Objek error-nya sengaja tidak ditampilkan: pesannya bisa memuat nama
 * teknis atau detail internal. Ia dicatat ke konsol untuk keperluan
 * pengembangan, dan yang sampai ke pasangan hanyalah kalimat yang terbaca.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-6 py-16">
      <ErrorState onRetry={reset} />
    </div>
  );
}
