import Image from "next/image";
import { cn } from "@/lib/cn";

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Avatar dengan cadangan inisial ketika foto belum diatur (FR-014, FR-019).
 */
export function Avatar({
  name,
  src,
  size = 40,
  className,
}: {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
}) {
  const shared = cn(
    "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
    className,
  );

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn(shared, "object-cover")}
      />
    );
  }

  return (
    <span
      className={cn(shared, "bg-accent-soft font-medium text-accent")}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      // Namanya sudah muncul di sebelah avatar, jadi inisialnya dekoratif saja.
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
