"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Drawer } from "@/components/ui/Drawer";
import { FadeIn } from "@/components/ui/FadeIn";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Skeleton, SkeletonParagraph } from "@/components/ui/Skeleton";
import { Tabs } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { LONG_TITLE } from "@/lib/fixtures";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-start gap-3">{children}</div>;
}

export function ShowcaseClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [failing, setFailing] = useState(false);

  /**
   * Aksi yang gagal: tombolnya kembali ke keadaan semula dan alasannya
   * disampaikan, sehingga pasangan tidak dibiarkan menebak apakah aksinya
   * jadi atau tidak (FR-025).
   */
  async function runFailingAction() {
    setFailing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      throw new Error("gagal");
    } catch {
      toast.error("Belum tersimpan. Coba sebentar lagi ya.");
    } finally {
      setFailing(false);
    }
  }
  const [selected, setSelected] = useState<string>();
  const toast = useToast();

  return (
    <>
      <Section title="Tombol">
        <Row>
          <Button>Utama</Button>
          <Button variant="secondary">Sekunder</Button>
          <Button variant="quiet">Halus</Button>
          <Button variant="destructive">Merusak</Button>
        </Row>
        <Row>
          <Button size="sm">Kecil</Button>
          <Button loading>Memuat</Button>
          <Button disabled>Nonaktif</Button>
        </Row>
      </Section>

      <Section title="Kolom isian">
        <Field label="Judul" hint="Sebutkan sesuatu yang mudah diingat.">
          <Input placeholder="Sore yang panjang" />
        </Field>
        <Field label="Judul" error="Judulnya belum diisi.">
          <Input defaultValue="" />
        </Field>
        <Field label="Judul (nonaktif)">
          <Input disabled defaultValue="Tidak bisa diubah" />
        </Field>
        <Field label="Judul (hanya baca)">
          <Input readOnly defaultValue="Hanya untuk dibaca" />
        </Field>
        <Field label="Cerita" hint="Sepanjang yang kamu mau.">
          <Textarea placeholder="Ceritakan harinya…" />
        </Field>
        <Field label="Jenis peristiwa">
          <Select
            value={selected}
            onValueChange={setSelected}
            options={[
              { value: "first-met", label: "Pertama bertemu" },
              { value: "anniversary", label: "Hari jadi" },
              { value: "trip", label: "Perjalanan" },
            ]}
          />
        </Field>
      </Section>

      <Section title="Kartu">
        <Row>
          <FadeIn>
            <Card className="w-64 p-5">
            <h3 className="font-display text-xl text-ink">Sore yang panjang</h3>
              <p className="mt-1 text-sm text-ink-faint">12 Agustus 2026</p>
            </Card>
          </FadeIn>
          <Card interactive className="w-64 p-5">
            <h3 className="font-display text-xl text-ink">Kartu yang bisa ditekan</h3>
            <p className="mt-1 text-sm text-ink-faint">Bayangannya menebal saat disentuh</p>
          </Card>
          <Card className="w-64 p-5">
            <h3 className="font-display text-xl leading-snug text-ink">{LONG_TITLE}</h3>
          </Card>
        </Row>
      </Section>

      <Section title="Lencana">
        <Row>
          <Badge>Draf</Badge>
          <Badge tone="accent">Terjadwal</Badge>
          <Badge tone="positive">Selesai</Badge>
          <Badge tone="critical">Dibatalkan</Badge>
        </Row>
      </Section>

      <Section title="Avatar">
        <Row>
          <Avatar name="Rayyan Akbar" />
          <Avatar name="Jessi" size={56} />
          <Avatar name="Rayyan Akbar" size={72} />
        </Row>
      </Section>

      <Section title="Kerangka muat">
        <div className="flex flex-col gap-4">
          <Skeleton shape="title" />
          <SkeletonParagraph />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Skeleton shape="image" />
            <Skeleton shape="image" />
            <Skeleton shape="image" />
          </div>
        </div>
      </Section>

      <Section title="Tab">
        <Tabs
          ariaLabel="Contoh tab"
          items={[
            { value: "a", label: "Ringkasan", content: <p className="text-ink-soft">Isi ringkasan.</p> },
            { value: "b", label: "Rencana", content: <p className="text-ink-soft">Isi rencana.</p> },
            { value: "c", label: "Anggaran", content: <p className="text-ink-soft">Isi anggaran.</p> },
            { value: "d", label: "Daftar bawaan", content: <p className="text-ink-soft">Isi daftar bawaan.</p> },
          ]}
        />
      </Section>

      <Section title="Pola halaman">
        <PageHeader
          title="Kenangan kita"
          lede="Hal-hal kecil yang sayang kalau sampai lupa."
          action={<Button>Tambah kenangan</Button>}
        />
        <EmptyState
          title="Belum ada apa-apa di sini."
          lede="Mungkin kenangan favorit kita berikutnya belum sempat terjadi."
          action={<Button variant="secondary">Tambah yang pertama</Button>}
        />
        <ErrorState onRetry={() => toast.success("Dicoba lagi.")} />
      </Section>

      <Section title="Aksi yang gagal">
        <Row>
          <Button loading={failing} onClick={runFailingAction}>
            Simpan kenangan
          </Button>
        </Row>
      </Section>

      <Section title="Konfirmasi menghapus">
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          trigger={<Button variant="destructive">Hapus kenangan</Button>}
          title="Hapus kenangan ini?"
          consequences="Kenangan ini beserta semua fotonya akan hilang, dan tidak bisa dikembalikan."
          confirmLabel="Ya, hapus"
          onConfirm={() => {
            setConfirmOpen(false);
            toast.success("Kenangannya sudah dihapus.");
          }}
        />
      </Section>

      <Section title="Lapisan">
        <Row>
          <Button variant="secondary" onClick={() => toast.success("Kenangannya tersimpan.")}>
            Toast berhasil
          </Button>
          <Button variant="secondary" onClick={() => toast.error("Belum tersimpan. Coba lagi sebentar lagi.")}>
            Toast gagal
          </Button>
        </Row>

        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          trigger={<Button variant="secondary">Buka modal</Button>}
          title="Sebuah modal"
          description="Fokus tertahan di dalam sini, dan kembali ke tombolnya setelah ditutup."
          footer={
            <>
              <Button variant="quiet" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setModalOpen(false)}>Mengerti</Button>
            </>
          }
        />

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          trigger={<Button variant="secondary">Buka laci</Button>}
          title="Sebuah laci"
          description="Muncul dari bawah di ponsel, dari samping di layar besar."
          footer={
            <Button variant="quiet" onClick={() => setDrawerOpen(false)}>
              Tutup
            </Button>
          }
        >
          <Field label="Catatan">
            <Textarea placeholder="Tulis sesuatu…" />
          </Field>
        </Drawer>
      </Section>
    </>
  );
}
