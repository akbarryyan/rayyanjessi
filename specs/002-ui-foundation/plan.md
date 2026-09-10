# Implementation Plan: UI Foundation

**Branch**: `002-ui-foundation` | **Date**: 2026-09-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-ui-foundation/spec.md`

## Summary

Sistem desain, kerangka aplikasi, dan pola bersama untuk seluruh produk — **ditambah** rancangan
antarmuka kelima belas bagian pada `docs/ui-sections.md` §6–§21, atas keputusan pemilik produk
pada 2026-09-10.

Token didefinisikan di CSS melalui `@theme`, bukan berkas konfigurasi, mengikuti bentuk Tailwind 4
yang sudah terpasang. Navigasi bersifat hibrida: bagian yang ringkas menjadi section pada landing
page `/`, bagian yang membutuhkan ruang penuh mendapat halaman tersendiri.

Dari 15 bagian, hanya Settings dan penghitung waktu yang memiliki data model — keduanya dari
fitur 001. Tiga belas sisanya dirancang di atas kontrak view model beserta data contoh, dan
dicatat sebagai utang pada Complexity Tracking.

## Technical Context

**Language/Version**: TypeScript 5, Node.js sesuai `package.json`

**Primary Dependencies**: Next.js 16.3.4 (App Router), React 19.2.8, Tailwind CSS 4 dengan
`@tailwindcss/postcss` — seluruhnya sudah terpasang. Perlu ditambahkan: `framer-motion`, satu
kumpulan primitif UI headless yang aksesibel, dan pemindai aksesibilitas untuk Playwright
([research.md](./research.md) R-009).

**Storage**: Tidak ada. Fitur ini tidak menambah tabel maupun migration.

**Testing**: Playwright untuk seluruh perilaku antarmuka; Vitest hanya untuk logika murni (R-008).
Keduanya sudah dikonfigurasi pada fitur 001.

**Target Platform**: Peramban modern, mobile-first mulai lebar 320 px.

**Project Type**: Aplikasi web full-stack satu proyek (Next.js App Router).

**Performance Goals**: Landing page `/` menggabungkan empat section sekaligus, sehingga jumlah
komponen client dan ukuran payload-nya harus dijaga. Section yang berat dimuat bertahap.

**Constraints**: Seluruh layar dapat dipakai pada lebar 320 px tanpa scroll mendatar. Seluruh
kendali terjangkau papan ketik. Kontras minimum 4.5:1 untuk teks normal dan 3:1 untuk teks besar
(R-007). Seluruh animasi menghormati preferensi kurangi-gerak. Komponen bagian tidak mengambil
data sendiri (R-002).

**Scale/Scope**: Sekitar 13 komponen dasar, satu kerangka aplikasi dengan dua bentuk navigasi,
satu halaman peraga, dan rancangan antarmuka untuk 15 bagian produk. Ini fitur besar — lihat
Complexity Tracking.

## Constitution Check

*GATE: dievaluasi terhadap `.specify/memory/constitution.md` v2.0.0.*

| Prinsip | Status | Bagaimana dipenuhi |
|---|---|---|
| **I. Private by Design** | LULUS | Tidak ada permukaan berbagi publik yang ditambahkan. Halaman peraga `/ui-kit` hanya menampilkan komponen dan data contoh, tidak pernah data hubungan sebenarnya (R-006). Fixture dilarang memuat data sungguhan. |
| **II. Relationship-Centric** | LULUS | Fitur ini tidak menyentuh kepemilikan data. View model menerima data yang sudah di-resolve; komponen tidak pernah menyusun query sendiri. |
| **III. Simplicity** | **DILANGGAR** | Rancangan antarmuka dibangun untuk 13 domain yang spec dan data modelnya belum ada. Lihat Complexity Tracking. |
| **IV. Type Safety** | LULUS | Setiap view model bertipe eksplisit di `lib/view-models/`. Fixture mengikuti tipe yang sama, sehingga perubahan bentuk data langsung terlihat sebagai kesalahan tipe. `tsc --noEmit` masuk gerbang kualitas. |
| **V. Server-Side Business Logic** | LULUS | Komponen dibatasi pada presentasi dan interaksi — ditegakkan aturan bahwa komponen bagian tidak boleh memanggil Prisma, `fetch`, maupun server action, dan diperiksa lewat perintah pada [quickstart.md](./quickstart.md). |
| **VI. Mobile-First UX** | LULUS | Inti fitur ini. Navigasi ponsel dirancang lebih dulu (FR-007), seluruh layar diuji pada 320 px (FR-033), dan permukaan padat media dimuat bertahap (FR-044). |
| **VII. Emotional Product Experience** | LULUS | FR-026 menetapkan watak tiap bagian; FR-028 melarang pola dasbor generik secara eksplisit; FR-029 mewajibkan isi bermuatan emosi mendapat penekanan lebih besar daripada data mentah. |
| **VIII. Maintainability** | LULUS | Komponen tiap domain berada di foldernya sendiri dan hanya berkomunikasi lewat view model, sehingga tidak ada domain yang mengimpor bagian internal domain lain. Navigasi memakai satu daftar tunggal, bukan tautan lepas. |
| **IX. Data Integrity** | LULUS | Fitur ini tidak menyentuh data persisten dan tidak menambah migration. R-002 secara khusus menolak membuat tabel sementara demi UI. |
| **X. Testing Critical Behavior** | LULUS | Tidak ada perilaku yang masuk daftar wajib Prinsip X pada fitur ini — tidak ada perhitungan tanggal baru, constraint data, maupun unggahan. Pengujian tetap dilakukan untuk aksesibilitas dan responsif karena requirement fitur ini menuntutnya, bukan karena diwajibkan Prinsip X. |
| **XI. Optional External Integrations** | LULUS | Tidak ada integrasi eksternal. Kepustakaan yang ditambahkan berjalan di dalam aplikasi dan tidak memanggil layanan pihak ketiga. |
| **XII. Long-Term Evolution** | LULUS BERSYARAT | Kontrak view model dirancang justru agar penyambungan ke data sungguhan kelak tidak menuntut perancangan ulang (FR-063). Namun rancangan yang dibuat sebelum data modelnya ada tetap berisiko meleset; lihat Complexity Tracking. |

**Hasil gerbang**: satu pelanggaran, terdokumentasi dan dijustifikasi di bawah.

## Project Structure

### Documentation (this feature)

```text
specs/002-ui-foundation/
├── plan.md              # Berkas ini
├── spec.md
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1
│   ├── component-api.md
│   ├── view-model.md
│   └── navigation.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Dibuat /speckit-tasks, bukan oleh perintah ini
```

### Source Code (repository root)

```text
app/
├── globals.css                  # token desain dalam blok @theme (R-003)
├── layout.tsx                   # kerangka aplikasi, penyedia gerak
├── page.tsx                     # landing page: hero + section
├── ui-kit/page.tsx              # halaman peraga komponen (R-006)
├── story/page.tsx
├── memories/page.tsx
├── memories/[id]/page.tsx
├── letters/page.tsx
├── letters/[id]/page.tsx
├── open-when/page.tsx
├── trips/page.tsx
├── trips/[id]/page.tsx
├── places/page.tsx
├── soundtrack/page.tsx
└── settings/                    # sudah ada dari fitur 001

components/
├── ui/                          # 13 komponen dasar (data-model.md)
├── layout/                      # AppShell, navigasi ponsel, navigasi desktop
├── landing/                     # section pada `/`
├── home/ story/ memories/ letters/ open-when/
├── trips/ places/ soundtrack/ future/
├── just-for-us/ time/ important-dates/
└── settings/                    # sudah ada dari fitur 001

lib/
├── navigation.ts                # satu daftar tujuan (contracts/navigation.md)
├── view-models/                 # satu berkas per domain
├── fixtures/                    # data contoh, termasuk varian ekstrem
└── motion/                      # penyedia gerak + preferensi kurangi-gerak

tests/
├── unit/                        # logika navigasi, pembentuk view model
└── e2e/                         # papan ketik, fokus, 320px, gerak, aksesibilitas
```

**Structure Decision**: Melanjutkan struktur fitur 001. Route group `(app)/` yang disebut
`docs/architecture.md` §35 diperkenalkan di sini, karena barulah sekarang ada kerangka bersama
yang membedakannya — seluruh halaman bagian berbagi satu app shell, sedangkan `/ui-kit` tidak.

## Complexity Tracking

| Pelanggaran | Mengapa dibutuhkan | Alternatif lebih sederhana yang ditolak |
|---|---|---|
| **Prinsip III** — antarmuka dibangun untuk 13 domain yang spec dan data modelnya belum ada (FR-047 sampai FR-061) | Keputusan pemilik produk pada 2026-09-10, dipilih secara sadar setelah konsekuensinya dinyatakan. Merancang seluruh permukaan sekaligus menjaga bahasa visual tetap satu dan mencegah tiap domain menemukan gayanya sendiri belakangan | Membatasi fitur ini pada fondasi bersama saja, lalu merancang antarmuka tiap bagian bersama spec domainnya masing-masing. Ditolak pemilik produk |

**Utang yang timbul dan cara membatasinya**:

1. Rancangan 13 bagian dibuat di atas asumsi bentuk data. Ketika spec domainnya mendarat,
   masing-masing MUST ditinjau ulang.
2. Pembatasnya adalah kontrak view model (FR-063, [contracts/view-model.md](./contracts/view-model.md)):
   komponen tidak mengambil data sendiri, sehingga yang berubah saat penyambungan hanyalah
   penyusun view model di halaman.
3. Perintah pemeriksaan pada [quickstart.md](./quickstart.md) menemukan setiap halaman yang masih
   memakai fixture, sehingga sisa utang selalu dapat dihitung, bukan diperkirakan.
4. Fixture wajib memuat varian ekstrem — teks sangat panjang, tanpa gambar, daftar kosong —
   agar rancangannya tidak hanya benar untuk data yang rapi.

## Catatan untuk `/speckit-tasks`

1. **Urutannya penting.** Token dan komponen dasar mendahului segalanya; kerangka aplikasi dan
   navigasi menyusul; barulah rancangan tiap bagian. Membalik urutan ini menghasilkan komponen
   yang harus ditulis ulang.
2. **Lima belas bagian sebaiknya menjadi lima belas kelompok task yang saling bebas**, sehingga
   dapat dikerjakan bertahap dan tiap bagian dapat dinyatakan selesai sendiri-sendiri.
3. **Settings dan penghitung waktu bergantung pada fitur 001.** Bila 001 belum selesai, keduanya
   dikerjakan memakai fixture lalu disambungkan — jangan diblokir.
4. **Pemeriksaan aksesibilitas dan 320 px berlaku untuk setiap bagian**, bukan sekali di akhir.
   Menundanya ke fase polish membuat perbaikannya jauh lebih mahal.
