import type { ReactNode } from "react";

/**
 * Pembungkus section pada landing page.
 *
 * `id`-nya adalah tujuan yang dirujuk peta navigasi, sehingga alamat
 * `/#<id>` dapat dibagikan dan dibuka langsung (FR-045). `scroll-mt`
 * menyisakan ruang agar judulnya tidak tertutup saat dituju.
 */
export function LandingSection({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-8 border-t border-line py-14 first:border-t-0"
    >
      <h2
        id={`${id}-title`}
        className="font-display text-3xl leading-tight text-ink"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-2 max-w-prose text-lg leading-relaxed text-ink-soft">
          {lede}
        </p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
