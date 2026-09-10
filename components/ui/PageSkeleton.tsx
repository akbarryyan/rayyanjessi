import { Skeleton, SkeletonParagraph } from "./Skeleton";

/**
 * Kerangka halaman bawaan untuk berkas loading.tsx (FR-021).
 *
 * Bentuknya sengaja meniru susunan PageHeader ditambah isinya, sehingga tata
 * letak tidak melompat ketika isi yang sebenarnya datang.
 */
export function PageSkeleton({
  variant = "list",
}: {
  variant?: "list" | "gallery" | "prose";
}) {
  return (
    <div className="px-6 py-12" aria-busy="true" aria-live="polite">
      {/* Kerangka PageHeader */}
      <Skeleton shape="title" />
      <div className="mt-3 max-w-prose">
        <Skeleton shape="text" className="w-3/4" />
      </div>

      <div className="mt-10">
        {variant === "gallery" ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} shape="image" />
            ))}
          </div>
        ) : variant === "prose" ? (
          <div className="max-w-prose">
            <SkeletonParagraph lines={5} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} shape="card" />
            ))}
          </div>
        )}
      </div>

      <span className="sr-only">Sedang memuat</span>
    </div>
  );
}
