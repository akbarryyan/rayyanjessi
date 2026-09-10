---
description: "Task list for Relationship Foundation implementation"
---

# Tasks: Relationship Foundation

**Input**: Dokumen desain dari `/specs/001-relationship-foundation/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Task pengujian DISERTAKAN. Bukan karena diminta pemilih, melainkan karena Prinsip X
konstitusi v2.0.0 mewajibkannya untuk perhitungan tanggal, constraint integritas data, dan
validasi unggahan media — ketiganya ada pada fitur ini. Rencana pembagiannya ada di
[research.md](./research.md) R-008.

**Organization**: Task dikelompokkan per user story agar tiap story dapat dikerjakan dan diuji
secara mandiri.

## Format: `[ID] [P?] [Story] Deskripsi`

- **[P]**: Dapat dikerjakan paralel (berkas berbeda, tidak bergantung task yang belum selesai)
- **[Story]**: User story yang dilayani task ini (US1, US2, US3, US4)
- Setiap deskripsi menyertakan path berkas yang tepat

## Path Conventions

Satu proyek Next.js App Router di root repository, sesuai bagian Project Structure pada
[plan.md](./plan.md): `app/`, `actions/`, `lib/`, `components/`, `prisma/`, `tests/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Menyiapkan dependensi, konfigurasi, dan kerangka direktori.

- [ ] T001 Pasang dependensi runtime `prisma`, `@prisma/client`, dan `zod` di `package.json`, lalu jalankan `npx prisma init` sehingga `prisma/schema.prisma` memakai provider `mysql`
- [ ] T002 [P] Pasang dependensi pengujian `vitest` dan `@playwright/test` di `package.json` sebagai devDependencies
- [ ] T003 [P] Buat `vitest.config.ts` dengan environment `node`, alias path mengikuti `tsconfig.json`, dan pemisahan proyek untuk `tests/unit` dan `tests/integration`
- [ ] T004 [P] Buat `playwright.config.ts` dengan `webServer` yang menjalankan `npm run dev` dan `baseURL` ke server lokal
- [ ] T005 [P] Tambahkan script `test`, `test:e2e`, `typecheck`, `db:migrate`, dan `db:seed` pada `package.json`
- [ ] T006 [P] Buat `.env.example` berisi `DATABASE_URL`, `APP_TIMEZONE`, `STORAGE_DRIVER`, `STORAGE_LOCAL_PATH`, `SEED_RELATIONSHIP_NAME`, `SEED_STARTED_AT`, `SEED_MEMBER_1_NAME`, `SEED_MEMBER_2_NAME` sesuai [quickstart.md](./quickstart.md), dan pastikan `.env` serta `storage/` tercantum di `.gitignore`
- [ ] T007 [P] Buat kerangka direktori kosong `actions/`, `lib/db/`, `lib/relationship/`, `lib/identity/`, `lib/storage/`, `lib/validations/`, `lib/date/`, `components/ui/`, `components/layout/`, `components/identity/`, `components/settings/`, `tests/unit/`, `tests/integration/`, `tests/e2e/` masing-masing dengan `.gitkeep`

**Checkpoint**: `npm install` bersih, `npx tsc --noEmit` lolos, MySQL lokal dapat dijangkau.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Skema database, akses data, relationship context, dan validasi bersama. Seluruh user
story bergantung pada fase ini.

**⚠️ CRITICAL**: Tidak ada pekerjaan user story yang boleh dimulai sebelum fase ini selesai.

- [ ] T008 Definisikan model `Relationship` pada `prisma/schema.prisma` dengan field `id` (cuid), `singleton Boolean @default(true) @unique`, `name String` (wajib), `startedAt DateTime @db.Date` (wajib), `description String? @db.Text` (opsional), `coverMediaId String? @unique` (opsional), `createdAt`, dan `updatedAt`, sesuai [data-model.md](./data-model.md)
- [ ] T009 Definisikan model `Member` pada `prisma/schema.prisma` dengan field `id` (cuid), `relationshipId String` (wajib), `slot Int` (bernilai 1 atau 2), `displayName String` (wajib), `photoMediaId String? @unique` (opsional), `createdAt`, `updatedAt`, ditambah `@@unique([relationshipId, slot])`
- [ ] T010 Definisikan model `Media` dan `enum MediaType { IMAGE }` pada `prisma/schema.prisma` dengan field `id` (cuid), `relationshipId String` (wajib), `type MediaType`, `path String`, `mimeType String`, `sizeBytes Int`, `createdAt` — tanpa `thumbnailPath`, `metadata`, `attachableType`, maupun `attachableId` yang sengaja ditunda
- [ ] T011 Jalankan `npx prisma migrate dev --name init` sehingga migration awal terbentuk di `prisma/migrations/`
- [ ] T012 Sunting file SQL migration awal di `prisma/migrations/` untuk menambahkan `ALTER TABLE \`Member\` ADD CONSTRAINT \`member_slot_range\` CHECK (\`slot\` IN (1, 2));` sesuai [data-model.md](./data-model.md), lalu terapkan ulang migration
- [ ] T013 [P] Buat Prisma client singleton di `lib/db/index.ts` yang aman terhadap hot reload pada mode development
- [ ] T014 [P] Buat schema Zod di `lib/validations/relationship.ts` dengan aturan `name` 1..100 karakter setelah trim, `startedAt` berformat `YYYY-MM-DD` dan bukan tanggal masa depan menurut `APP_TIMEZONE`, `description` maksimum 2000 karakter
- [ ] T015 [P] Buat schema Zod di `lib/validations/member.ts` dengan aturan `displayName` 1..50 karakter setelah trim
- [ ] T016 [P] Buat tipe `ActionResult` dan klasifikasi error `validation` / `not_found` / `business_rule` / `unexpected` di `lib/errors.ts` sesuai [contracts/server-actions.md](./contracts/server-actions.md), memastikan `message` selalu kalimat yang terbaca dan tidak pernah memuat detail internal
- [ ] T017 Buat `lib/date/duration.ts` berisi fungsi murni yang menentukan tanggal hari ini menurut `APP_TIMEZONE` dan menghitung durasi hubungan dari `startedAt` sebagai tahun, bulan, dan hari
- [ ] T018 Buat `getRelationshipContext()` di `lib/relationship/context.ts` yang mengambil satu `Relationship` beserta `Member`-nya lewat `findFirst` dan mengembalikan `{ status: 'ready', ... }` atau `{ status: 'not-ready' }` sesuai [contracts/relationship-context.md](./contracts/relationship-context.md)
- [ ] T019 [P] Buat pembaca dan penulis cookie `olu_member` di `lib/identity/cookie.ts` dengan atribut `httpOnly: true`, `sameSite: 'lax'`, `path: '/'`, `maxAge` 10 tahun, dan `secure` mengikuti lingkungan — perhatikan bahwa `cookies()` pada Next 16 bersifat async, dan `.set` hanya boleh dipanggil dari Server Action atau Route Handler
- [ ] T020 Buat `getCurrentMember()` di `lib/relationship/context.ts` yang membaca cookie `olu_member`, mencocokkannya dengan Member pada relationship context, dan mengembalikan `{ status: 'unselected' }` tanpa melempar error ketika cookie tidak ada, kosong, atau menunjuk Member yang tidak ada
- [ ] T021 Buat `prisma/seed.ts` yang menyiapkan satu `Relationship` dan dua `Member` dari environment variable `SEED_*`, melewati schema Zod yang sama dengan aplikasi, dan dapat dijalankan berulang tanpa menggandakan data
- [ ] T022 [P] Siapkan pembantu database uji di `tests/integration/helpers/db.ts` yang membersihkan tabel antar test dan menyediakan pembuatan Relationship beserta Member

**Checkpoint**: `npx prisma migrate dev` dan `npx prisma db seed` berjalan bersih; `getRelationshipContext()` mengembalikan `ready` setelah seed.

---

## Phase 3: User Story 1 — Membuka ruang kami tanpa gerbang (Priority: P1)

**Goal**: Aplikasi terbuka tanpa gerbang apa pun, tidak memiliki jalur masuk, dan menolak diindeks
mesin pencari.

**Independent Test**: Membuka setiap route dari peramban bersih tanpa kredensial apa pun dan
memastikan seluruhnya termuat; membuka jalur `/login`, `/register`, `/reset-password` dan
memastikan ketiganya menampilkan halaman tidak ditemukan.

### Implementation

- [ ] T023 [US1] Setel metadata pada `app/layout.tsx` dengan `robots: { index: false, follow: false }` dan judul aplikasi, memenuhi FR-004
- [ ] T024 [P] [US1] Buat `app/robots.ts` yang mengembalikan `disallow: '/'` untuk seluruh user agent, memenuhi FR-004
- [ ] T025 [US1] Buat `app/page.tsx` sementara yang memanggil `getRelationshipContext()`, menampilkan nama Relationship beserta durasi hubungan ketika `ready`, dan mengalihkan ke layar "ruang belum siap" ketika `not-ready`
- [ ] T026 [P] [US1] Pastikan tidak ada route `login`, `register`, maupun `reset-password` di `app/`, dan tidak ada dependensi authentication di `package.json`, memenuhi FR-003 dan FR-005

### Tests

- [ ] T027 [P] [US1] Buat E2E di `tests/e2e/open-access.spec.ts` yang membuka `/` dari konteks peramban bersih dan memastikan halaman termuat tanpa permintaan kredensial
- [ ] T028 [P] [US1] Buat E2E di `tests/e2e/no-auth-routes.spec.ts` yang membuka `/login`, `/register`, dan `/reset-password` lalu memastikan ketiganya menghasilkan status 404
- [ ] T029 [P] [US1] Buat E2E di `tests/e2e/noindex.spec.ts` yang memeriksa `/robots.txt` memuat `Disallow: /` dan sumber halaman memuat meta `noindex`

**Checkpoint**: Langkah 1, 2, dan 3 pada tabel validasi manual [quickstart.md](./quickstart.md) lolos.

---

## Phase 4: User Story 2 — Relationship kami ada dan bercerita (Priority: P1)

**Goal**: Satu Relationship dengan tanggal mulai dan metadata, di-resolve di server, dapat
disunting, dengan durasi hubungan yang dihitung dinamis dan constraint yang ditegakkan database.

**Independent Test**: Menyiapkan satu Relationship berisi dua anggota dan sebuah tanggal mulai,
lalu memastikan aplikasi menampilkan nama, deskripsi, tanggal mulai, kedua nama anggota, dan
durasi yang dihitung dari tanggal tersebut.

### Tests

- [ ] T030 [P] [US2] Buat unit test di `tests/unit/duration.test.ts` untuk perhitungan durasi lintas batas bulan, batas tahun, dan tahun kabisat
- [ ] T031 [P] [US2] Buat unit test di `tests/unit/date-format.test.ts` yang memastikan tanggal mulai tidak bergeser ketika diformat dari zona waktu berbeda, memenuhi FR-009 dan SC-005
- [ ] T032 [P] [US2] Buat unit test di `tests/unit/validations-relationship.test.ts` yang memastikan schema Zod menolak `name` kosong, `name` lebih dari 100 karakter, `description` lebih dari 2000 karakter, dan `startedAt` bertanggal besok
- [ ] T033 [P] [US2] Buat integration test di `tests/integration/relationship-constraints.test.ts` yang memastikan penyisipan `Relationship` kedua ditolak database lewat constraint `singleton`, memenuhi FR-029 dan SC-010
- [ ] T034 [P] [US2] Buat integration test di `tests/integration/member-constraints.test.ts` yang memastikan penyisipan `Member` ketiga ditolak database lewat `@@unique([relationshipId, slot])` dan `CHECK (slot IN (1,2))`, memenuhi FR-007 dan FR-029
- [ ] T035 [P] [US2] Buat integration test di `tests/integration/relationship-context.test.ts` yang memastikan `getRelationshipContext()` mengembalikan `not-ready` ketika tabel kosong dan `ready` beserta kedua Member setelah seed

### Implementation

- [ ] T036 [US2] Buat server action `updateRelationship` di `actions/relationship.ts` mengikuti urutan validasi input → ambil relationship context → business logic → simpan → hasil aman, tanpa menerima `relationshipId` dari client, sesuai [contracts/server-actions.md](./contracts/server-actions.md) dan FR-025
- [ ] T037 [P] [US2] Buat layar "ruang belum siap" di `app/not-ready/page.tsx` yang ditulis dengan suara produk, tanpa error mentah dan tanpa detail teknis, memenuhi FR-024 dan FR-035
- [ ] T038 [US2] Buat halaman pengaturan Relationship di `app/settings/page.tsx` yang menampilkan nama, deskripsi, tanggal mulai, dan kedua nama anggota, memenuhi FR-023
- [ ] T039 [US2] Buat formulir penyuntingan Relationship di `components/settings/RelationshipForm.tsx` untuk nama, deskripsi, dan tanggal mulai, menampilkan pesan kegagalan pada kolom yang bersangkutan, memenuhi FR-012 dan FR-031
- [ ] T040 [P] [US2] Tampilkan durasi hubungan yang dihitung dari `startedAt` pada `app/page.tsx` sebagai kalimat, bukan angka statistik, memenuhi FR-011 dan Prinsip VII

**Checkpoint**: Langkah 9, 10, 11, 12, dan 17 pada tabel validasi manual lolos; kedua query SQL pemeriksaan constraint di [quickstart.md](./quickstart.md) ditolak MySQL.

---

## Phase 5: User Story 3 — "Aku siapa?" (Priority: P1)

**Goal**: Pemakai menyatakan dirinya sebagai salah satu dari dua anggota, pilihannya diingat per
perangkat, dapat diganti kapan saja, dan menjadi dasar atribusi penulis di server.

**Independent Test**: Membuka aplikasi dari peramban bersih, memilih salah satu anggota, memuat
ulang untuk memastikan pilihannya diingat, lalu berganti ke anggota lain dan memastikan atribusi
ikut berubah.

### Tests

- [ ] T041 [P] [US3] Buat integration test di `tests/integration/current-member.test.ts` yang memastikan `getCurrentMember()` mengembalikan `unselected` untuk cookie yang tidak ada, kosong, atau menunjuk Member yang tidak ada, tanpa melempar error, memenuhi FR-014
- [ ] T042 [P] [US3] Buat integration test di `tests/integration/identity-actions.test.ts` yang memastikan `selectIdentity` menolak `memberId` yang bukan Member pada Relationship yang ada
- [ ] T043 [P] [US3] Buat E2E di `tests/e2e/identity.spec.ts` yang mencakup memilih identitas, memuat ulang tanpa ditanya lagi, menghapus cookie lalu diminta memilih kembali, dan berganti identitas
- [ ] T044 [P] [US3] Buat E2E di `tests/e2e/identity-per-device.spec.ts` memakai dua konteks peramban terpisah untuk memastikan pilihan pada satu perangkat tidak memengaruhi perangkat lain, memenuhi FR-015

### Implementation

- [ ] T045 [US3] Buat server action `selectIdentity` dan `clearIdentity` di `actions/identity.ts` sesuai [contracts/server-actions.md](./contracts/server-actions.md), memvalidasi bahwa `memberId` adalah Member pada Relationship yang ada sebelum menyetel cookie
- [ ] T046 [US3] Buat halaman pemilih identitas di `app/identity/page.tsx` yang menampilkan kedua nama anggota beserta fotonya bila ada, memenuhi FR-013
- [ ] T047 [P] [US3] Buat komponen pemilih di `components/identity/IdentityPicker.tsx` yang memanggil `selectIdentity`, ditulis dengan suara produk, dan nyaman dipakai pada layar smartphone
- [ ] T048 [US3] Buat pembantu `requireCurrentMember()` di `lib/relationship/context.ts` yang mengarahkan ke `app/identity/page.tsx` ketika `getCurrentMember()` mengembalikan `unselected`, lalu pakai pada setiap jalur pembuatan konten, memenuhi FR-018
- [ ] T049 [P] [US3] Tambahkan aksi ganti identitas pada `app/settings/page.tsx` yang memanggil `clearIdentity` lalu mengarahkan ke pemilih, memenuhi FR-013

**Checkpoint**: Langkah 4, 5, 6, 7, dan 8 pada tabel validasi manual lolos.

---

## Phase 6: User Story 4 — Menjadi diri kami di ruang ini (Priority: P2)

**Goal**: Kedua anggota memiliki nama panggilan dan foto opsional yang dapat diperbarui dari dalam
aplikasi, beserta gambar sampul Relationship.

**Independent Test**: Mengubah nama panggilan salah satu anggota lalu memastikan nama baru muncul
di seluruh tempat termasuk pemilih identitas; mengunggah foto profil dan memastikan tersimpan
serta tampil.

**Catatan**: Fase ini adalah bagian terbesar fitur 001 dan satu-satunya yang terasa melebihi
"fondasi", sesuai [research.md](./research.md) R-007. Ia dikerjakan karena FR-020 memintanya
secara eksplisit.

### Tests

- [ ] T050 [P] [US4] Buat unit test di `tests/unit/validations-member.test.ts` yang memastikan schema Zod menolak `displayName` kosong dan lebih dari 50 karakter
- [ ] T051 [P] [US4] Buat integration test di `tests/integration/upload-validation.test.ts` yang memastikan unggahan ditolak untuk MIME di luar `image/jpeg`, `image/png`, `image/webp`; untuk ekstensi yang tidak cocok dengan MIME-nya; dan untuk berkas melebihi 10 MB, sesuai [contracts/upload-route.md](./contracts/upload-route.md)
- [ ] T052 [P] [US4] Buat integration test di `tests/integration/media-ownership.test.ts` yang memastikan `relationshipId` pada `Media` diambil dari relationship context dan bukan dari input client, memenuhi FR-025 dan FR-030

### Implementation

- [ ] T053 [US4] Buat abstraksi storage di `lib/storage/index.ts` beserta driver lokal di `lib/storage/local.ts` yang menyimpan berkas ke `STORAGE_LOCAL_PATH`, sehingga domain logic tidak pernah memanggil filesystem secara langsung
- [ ] T054 [US4] Buat Route Handler `POST /api/upload` di `app/api/upload/route.ts` yang memvalidasi MIME, ekstensi, dan ukuran maksimum 10 MB, menyimpan berkas dengan nama acak buatan sistem, membuat baris `Media`, dan mengembalikan `{ mediaId, path }` sesuai [contracts/upload-route.md](./contracts/upload-route.md)
- [ ] T055 [US4] Tambahkan rate limiting 20 unggahan per 10 menit per alamat IP pada `app/api/upload/route.ts`
- [ ] T056 [US4] Buat server action `updateMemberProfile` di `actions/members.ts` yang memvalidasi `displayName` dan memastikan `photoMediaId` bila diisi merupakan `Media` bertipe `IMAGE` milik Relationship yang sama, sesuai [contracts/server-actions.md](./contracts/server-actions.md)
- [ ] T057 [US4] Buat halaman profil kedua anggota di `app/settings/members/page.tsx`, memenuhi FR-019 dan FR-020
- [ ] T058 [P] [US4] Buat komponen unggah gambar di `components/settings/ImageUpload.tsx` dengan keadaan memuat dan keadaan gagal, menampilkan pesan yang terbaca ketika unggahan ditolak
- [ ] T059 [US4] Tambahkan penyuntingan gambar sampul Relationship pada `components/settings/RelationshipForm.tsx`, memenuhi FR-010 dan FR-012
- [ ] T060 [P] [US4] Buat komponen avatar cadangan di `components/ui/Avatar.tsx` yang menampilkan inisial ketika foto belum diatur, lalu pakai pada `components/identity/IdentityPicker.tsx`, `app/settings/members/page.tsx`, dan `app/page.tsx`, memenuhi FR-014 dan FR-019

**Checkpoint**: Langkah 13, 14, 15, dan 16 pada tabel validasi manual lolos.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T061 [P] Telusuri `app/page.tsx`, `app/identity/page.tsx`, `app/settings/page.tsx`, `app/settings/members/page.tsx`, dan `app/not-ready/page.tsx` pada lebar 320 px, lalu perbaiki setiap scroll mendatar maupun kendali yang sulit disentuh, memenuhi FR-034 dan SC-008
- [ ] T062 [P] Tinjau seluruh kalimat pada `app/identity/page.tsx`, `app/settings/page.tsx`, `app/settings/members/page.tsx`, dan `app/not-ready/page.tsx` agar bernada hangat dan personal, bukan administratif, memenuhi FR-035
- [ ] T063 [P] Telusuri seluruh jalur kegagalan di `actions/relationship.ts`, `actions/members.ts`, `actions/identity.ts`, dan `app/api/upload/route.ts`, lalu pastikan hanya `message` dari `lib/errors.ts` yang sampai ke pengguna, memenuhi FR-032 dan SC-009
- [ ] T064 [P] Audit seluruh pemanggilan log pada `lib/` dan `actions/` serta `app/api/upload/route.ts` agar tidak memuat konten privat relationship, memenuhi FR-033
- [ ] T065 Jalankan `npm run lint`, `npx tsc --noEmit`, `npm run test`, dan `npm run test:e2e` hingga seluruhnya lolos
- [ ] T066 Jalankan seluruh 17 langkah tabel validasi manual pada [quickstart.md](./quickstart.md) dan catat hasilnya
- [ ] T067 Jalankan kedua query SQL pemeriksaan constraint pada [quickstart.md](./quickstart.md) dan pastikan keduanya ditolak MySQL

---

## Dependencies

```text
Phase 1 Setup
      ↓
Phase 2 Foundational  ← memblokir seluruh user story
      ↓
      ├─→ Phase 3 US1 (P1)  ── mandiri setelah Foundational
      ├─→ Phase 4 US2 (P1)  ── mandiri setelah Foundational
      ├─→ Phase 5 US3 (P1)  ── mandiri setelah Foundational
      └─→ Phase 6 US4 (P2)  ── T059 menyentuh berkas yang sama dengan T039 (US2)
                ↓
        Phase 7 Polish
```

**Ketergantungan antar story**: US1, US2, dan US3 saling bebas setelah Phase 2 selesai. US4
menyentuh `components/settings/RelationshipForm.tsx` yang dibuat US2 pada T039, sehingga T059
sebaiknya dikerjakan setelah T039 untuk menghindari benturan.

**Ketergantungan di dalam Phase 2**: T008–T012 berurutan (skema → migration → CHECK). T018 dan
T020 berada pada berkas yang sama (`lib/relationship/context.ts`), jadi keduanya berurutan. T017
harus selesai sebelum T014, karena schema Zod memakai penentuan tanggal hari ini.

---

## Parallel Execution Examples

**Phase 1** — T002 sampai T007 seluruhnya paralel setelah T001 selesai.

**Phase 2** — setelah T012 selesai: T013, T014, T015, T016, T019, dan T022 dapat dikerjakan
bersamaan. T014 menunggu T017.

**Phase 3 (US1)** — T024 dan T026 paralel; ketiga E2E T027, T028, dan T029 paralel.

**Phase 4 (US2)** — seluruh test T030 sampai T035 dapat ditulis bersamaan. Pada implementasi,
T037 dan T040 paralel terhadap T036.

**Phase 5 (US3)** — seluruh test T041 sampai T044 paralel; T047 dan T049 paralel terhadap T045.

**Phase 6 (US4)** — T050, T051, dan T052 paralel; T058 dan T060 paralel terhadap sisanya.

**Phase 7** — T061 sampai T064 seluruhnya paralel; T065 sampai T067 berurutan di akhir.

---

## Implementation Strategy

### MVP

**Phase 1 + Phase 2 + Phase 3 (US1)** sudah merupakan irisan yang berdiri sendiri: aplikasi
terbuka tanpa gerbang, menolak diindeks, dan membuktikan relationship context bekerja.

Namun MVP yang benar-benar berguna adalah **sampai Phase 5 (US3)**. Setelah itu Relationship ada,
dapat disunting, dan aplikasi tahu siapa yang sedang memakainya — inilah fondasi yang dibutuhkan
fitur berikutnya.

### Urutan yang disarankan

1. **Phase 1 → Phase 2** — tidak dapat dilewati. MySQL harus dapat dijangkau sebelum satu pun
   integration test berjalan.
2. **Phase 3 (US1)** — paling kecil, memberi kepercayaan bahwa kerangkanya berdiri.
3. **Phase 4 (US2)** — inti fitur ini.
4. **Phase 5 (US3)** — melengkapi fondasi yang dibutuhkan domain berikutnya.
5. **Phase 6 (US4)** — dapat ditunda tanpa memblokir fitur lain. Bila jadwal menekan, inilah
   kandidat pertama untuk digeser — tetapi penggeserannya adalah keputusan pemilik produk lewat
   perubahan spec, bukan keputusan tahap implementasi.
6. **Phase 7** — gerbang kualitas sebelum fitur dinyatakan selesai.

### Catatan konstitusi

Gerbang pada Prinsip X dan bagian Development Workflow konstitusi v2.0.0 dipenuhi T065 sampai
T067. Fitur ini belum boleh dinyatakan selesai sebelum ketiganya lolos.
