import { PageHeader } from "@/components/ui/PageHeader";

/**
 * Permukaan uji untuk keadaan memuat dan gagal.
 *
 * Berada di area peraga, bukan di aplikasi. Tujuannya agar loading.tsx dan
 * error.tsx dapat dibuktikan bekerja sungguhan, bukan hanya terlihat benar
 * di halaman peraga statis.
 *
 * `?delay=1000` menunda render agar kerangka muat sempat terlihat.
 * `?fail=1` melempar error agar error.tsx yang menangani.
 */
export default async function StatesDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ delay?: string; fail?: string }>;
}) {
  const { delay, fail } = await searchParams;

  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)));
  }

  if (fail) {
    throw new Error("Kegagalan yang disengaja untuk menguji error.tsx.");
  }

  return (
    <div className="px-6 py-12">
      <PageHeader
        title="Keadaan halaman"
        lede="Permukaan untuk menguji kerangka muat dan penanganan kegagalan."
      />
      <p className="text-base leading-relaxed text-ink-soft">
        Halaman ini berhasil dimuat.
      </p>
    </div>
  );
}
