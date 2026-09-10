import { cn } from "@/lib/cn";

type Shape = "text" | "title" | "image" | "card";

const SHAPES: Record<Shape, string> = {
  text: "h-4 w-full rounded-sm",
  title: "h-8 w-2/3 rounded-sm",
  image: "aspect-[4/3] w-full rounded-lg",
  card: "h-40 w-full rounded-lg",
};

/**
 * Kerangka isi yang menyerupai bentuk penggantinya, sehingga tata letak
 * tidak melompat ketika isinya datang (FR-021).
 *
 * Denyutnya memakai animate-pulse, yang otomatis dipangkas oleh aturan
 * kurangi-gerak global pada app/globals.css.
 */
export function Skeleton({
  shape = "text",
  className,
}: {
  shape?: Shape;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse bg-surface-sunken", SHAPES[shape], className)}
    />
  );
}

/** Kerangka satu paragraf. */
export function SkeletonParagraph({ lines = 3 }: { lines?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          shape="text"
          className={i === lines - 1 ? "w-4/5" : undefined}
        />
      ))}
    </div>
  );
}
