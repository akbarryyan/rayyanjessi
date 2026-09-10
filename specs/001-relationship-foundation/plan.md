# Implementation Plan: Relationship Foundation

**Branch**: `001-relationship-foundation` | **Date**: 2026-09-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-relationship-foundation/spec.md`

## Summary

Fondasi aplikasi tanpa authentication: satu `Relationship` beserta dua `Member`, penanda identitas
"aku siapa" berupa cookie, dan satu mekanisme relationship context di server yang dipakai ulang
seluruh fitur berikutnya. Ditambah unggahan gambar minimal, karena FR-020 mewajibkan foto anggota
dapat diperbarui dari dalam aplikasi.

Pendekatan teknis mengikuti [research.md](./research.md), yang diverifikasi terhadap dokumentasi
Next.js 16.3.4 yang terpasang di `node_modules/next/dist/docs/`. Tiga temuan mengubah rencana
dibanding yang tertulis pada `docs/architecture.md`: Middleware kini bernama **Proxy** dan tidak
dipakai sama sekali di sini, `cookies()` menjadi **async**, dan **Cache Components** bersifat
opt-in serta sengaja dibiarkan nonaktif.

Fitur ini belum membangun landing page. Landing page adalah fitur Home tersendiri; 001 hanya
menyediakan fondasi yang dipakainya.

## Technical Context

**Language/Version**: TypeScript 5, Node.js (versi sesuai `package.json`)

**Primary Dependencies**: Next.js 16.3.4 (App Router), React 19.2.8, Tailwind CSS 4. Perlu
ditambahkan: `prisma` + `@prisma/client`, `zod`, `vitest`, `@playwright/test`. **Tidak**
ditambahkan: `framer-motion` (belum ada requirement 001 yang membutuhkannya, Prinsip III);
tidak ada authentication provider — Auth.js tidak dipakai.

**Storage**: MySQL 8 melalui Prisma ORM. Media melalui storage abstraction, driver lokal pada
fitur ini.

**Testing**: Vitest untuk unit dan integration; Playwright untuk E2E. Vitest tidak mendukung async
Server Component, sehingga komponen semacam itu diuji lewat E2E (R-008).

**Target Platform**: Peramban modern, mobile-first. Server Node.js.

**Project Type**: Aplikasi web full-stack satu proyek (Next.js App Router).

**Performance Goals**: Tidak ada target khusus pada fitur ini. Layar-layarnya ringan dan
request-time. Anggaran query dan payload menjadi persoalan nyata pada fitur landing page, bukan di
sini.

**Constraints**: Tanpa authentication (konstitusi v2.0.0). Tepat satu Relationship dan maksimum
dua Member per deployment, ditegakkan constraint database. `startedAt` tidak boleh masa depan dan
tidak boleh bergeser antar zona waktu. Seluruh layar harus nyaman pada viewport smartphone.

**Scale/Scope**: Dua pengguna, satu relationship, satu deployment. Fitur ini mencakup sekitar lima
layar: pemilih identitas, pengaturan profil, pengaturan relationship, layar "ruang belum siap",
dan halaman `/` sementara yang membuktikan relationship context bekerja.

## Constitution Check

*GATE: dievaluasi terhadap `.specify/memory/constitution.md` v2.0.0.*

| Prinsip | Status | Bagaimana dipenuhi |
|---|---|---|
| **I. Private by Design** | LULUS | FR-004 dipenuhi dua lapis: `app/robots.ts` dan meta `noindex` (R-009). Tidak ada permukaan berbagi publik. Tidak ada data yang keluar ke pihak ketiga — foto disimpan sendiri, bukan di-hosting pihak lain (R-007). Tidak ada konten privat pada log. |
| **II. Relationship-Centric** | LULUS | `Relationship` adalah ownership root. `Member` dan `Media` menyimpan `relationshipId` eksplisit meski hanya ada satu Relationship (FR-030). Batas dua anggota ditegakkan `@@unique([relationshipId, slot])` + `CHECK`. |
| **III. Simplicity** | LULUS | Cache Components tidak diaktifkan (R-002). Tidak ada proxy layer (R-001). `framer-motion` tidak dipasang. Tabel `Media` hanya berisi field yang benar-benar dipakai. Relationship di-resolve lewat query, bukan konfigurasi tambahan (R-004). |
| **IV. Type Safety** | LULUS | Tipe database mengalir dari `schema.prisma`. Input server action dan Route Handler di-parse Zod di batas server, bukan di-cast. `tsc --noEmit` masuk gerbang kualitas. |
| **V. Server-Side Business Logic** | LULUS | Urutan server action mengikuti kontrak: validasi → context → business logic → simpan → hasil aman. Validasi client hanya untuk UX. Komponen UI tidak memuat business logic; seluruhnya di `lib/`. Error diklasifikasikan tanpa memaparkan detail internal. |
| **VI. Mobile-First UX** | LULUS | Kelima layar dirancang untuk viewport smartphone lebih dulu; dibuktikan langkah validasi manual dan SC-008. |
| **VII. Emotional Product Experience** | LULUS | Layar "ruang belum siap" dan pemilih identitas ditulis dengan suara produk (FR-035). Tidak ada card, gradient, atau statistik tanpa makna. Durasi hubungan disajikan sebagai kalimat, bukan angka statistik. |
| **VIII. Maintainability** | LULUS | Batas domain jelas: `lib/relationship/`, `lib/identity/`, `lib/storage/`, `lib/validations/`. Relationship context adalah satu-satunya jalan memperoleh Relationship (FR-023), sehingga fitur berikutnya tidak menyusun caranya sendiri. |
| **IX. Data Integrity** | LULUS | Seluruh perubahan skema lewat Prisma migration. Constraint singleton dan batas dua anggota berada di database (FR-029). Durasi hubungan dihitung, tidak disimpan (FR-011). Unggahan divalidasi sebelum disimpan. Satu batasan diakui terbuka: `startedAt` masa depan tidak dapat dinyatakan sebagai `CHECK` di MySQL 8, sehingga ditegakkan validasi server dan diuji integration test (R-005). |
| **X. Testing Critical Behavior** | LULUS | Yang diwajibkan untuk fitur ini: perhitungan tanggal dan durasi, constraint integritas data, dan validasi unggahan media. Ketiganya tercakup pada rencana pengujian di R-008 dan tabel validasi otomatis di quickstart. |
| **XI. Optional External Integrations** | LULUS | Tidak ada integrasi eksternal. Media melewati storage abstraction sehingga driver lokal dan S3-compatible dapat saling menggantikan tanpa mengubah domain logic. |
| **XII. Long-Term Evolution** | LULUS | `relationshipId` dipertahankan pada shared resource justru agar authentication dapat ditambahkan kelak tanpa memigrasikan setiap tabel. Struktur `lib/` dan `components/` mengikuti bentuk yang dipakai domain berikutnya. |

**Hasil gerbang**: lulus tanpa pengecualian. Bagian Complexity Tracking kosong.

**Catatan tentang Accepted Risks**: fitur ini berjalan di bawah risiko yang sudah diterima pada
konstitusi — tidak ada kontrol akses, identitas tidak terverifikasi, tidak ada jejak audit.
Rencana ini tidak mengklaim perlindungan apa pun terhadap ketiganya, dan tidak boleh mulai
mengklaimnya.

## Project Structure

### Documentation (this feature)

```text
specs/001-relationship-foundation/
├── plan.md              # Berkas ini
├── spec.md
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1
│   ├── server-actions.md
│   ├── upload-route.md
│   └── relationship-context.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Dibuat /speckit-tasks, bukan oleh perintah ini
```

### Source Code (repository root)

```text
app/
├── layout.tsx                   # metadata noindex
├── page.tsx                     # sementara: membuktikan relationship context
├── robots.ts                    # FR-004
├── not-ready/page.tsx           # FR-024
├── identity/page.tsx            # FR-013, pemilih "aku siapa"
├── settings/
│   ├── page.tsx                 # metadata Relationship, FR-012
│   └── members/page.tsx         # profil kedua anggota, FR-020
├── api/upload/route.ts          # contract upload-route.md
└── globals.css

actions/
├── identity.ts                  # selectIdentity, clearIdentity
├── members.ts                   # updateMemberProfile
└── relationship.ts              # updateRelationship

lib/
├── db/index.ts                  # Prisma client
├── relationship/context.ts      # getRelationshipContext, getCurrentMember
├── identity/cookie.ts           # baca/tulis cookie olu_member
├── storage/                     # abstraksi + driver lokal
├── validations/                 # schema Zod
└── date/duration.ts             # perhitungan durasi hubungan

components/
├── ui/                          # komponen dasar yang dipakai ulang
├── layout/
├── identity/                    # pemilih identitas
└── settings/

prisma/
├── schema.prisma
├── migrations/
└── seed.ts

tests/
├── unit/
├── integration/
└── e2e/
```

**Structure Decision**: Satu proyek Next.js App Router, mengikuti `docs/architecture.md` §35
dengan tiga penyesuaian yang timbul dari keputusan tanpa authentication dan dari Next 16:

1. Route group `(auth)/` dihapus — tidak ada halaman masuk.
2. `lib/auth/` menjadi `lib/identity/`.
3. Tidak ada `middleware.ts` maupun `proxy.ts` (R-001).

Route group `(app)/` pada `docs/architecture.md` belum dipakai di fitur ini karena belum ada
layout bersama yang membedakannya; ia diperkenalkan saat landing page dan halaman domain
dikerjakan.

## Complexity Tracking

Tidak ada pelanggaran Constitution Check, sehingga bagian ini kosong.

## Catatan untuk `/speckit-tasks`

Tiga hal yang perlu diperhatikan saat memecah pekerjaan:

1. **Penyiapan lingkungan mendahului segalanya.** MySQL harus dapat dijangkau sebelum satu pun
   integration test dapat berjalan.
2. **Unggahan gambar adalah bagian terbesar** dan satu-satunya yang terasa melebihi "fondasi"
   (R-007). Ia tetap masuk karena FR-020 memintanya. Bila perlu dipangkas, itu keputusan pemilik
   produk lewat perubahan spec, bukan keputusan tahap implementasi.
3. **`docs/architecture.md` §35 masih menulis `middleware.ts`.** Sebaiknya diperbaiki menjadi
   `proxy.ts` agar tidak menyesatkan fitur berikutnya, walau fitur ini tidak memakai keduanya.
