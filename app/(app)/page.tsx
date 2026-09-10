import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-prose px-6 py-16">
      <h1 className="font-display text-4xl leading-tight text-ink">
        Dunia kecil kita
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        Tempat kita menyimpan yang sudah lewat, yang sedang berjalan, dan yang
        masih ingin kita lakukan berdua.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button>Tambah kenangan</Button>
        <Button variant="secondary">Tulis surat</Button>
        <Button variant="quiet">Nanti saja</Button>
      </div>
    </main>
  );
}
