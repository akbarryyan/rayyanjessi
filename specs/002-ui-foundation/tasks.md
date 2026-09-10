---
description: "Task list for UI Foundation implementation"
---

# Tasks: UI Foundation

**Input**: Dokumen desain dari `/specs/002-ui-foundation/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Task pengujian DISERTAKAN. Prinsip X konstitusi tidak mewajibkannya untuk fitur ini —
tidak ada perhitungan tanggal baru, constraint data, maupun unggahan. Namun hampir seluruh
requirement fitur ini berupa perilaku antarmuka (papan ketik, fokus, lebar layar, preferensi
gerak, kontras) yang hanya dapat dibuktikan pada peramban sungguhan. Pembagiannya ada di
[research.md](./research.md) R-008.

**Organization**: Task dikelompokkan per user story.

## Format: `[ID] [P?] [Story] Deskripsi`

- **[P]**: Dapat dikerjakan paralel (berkas berbeda, tidak bergantung task yang belum selesai)
- **[Story]**: User story yang dilayani (US1–US7)
- Setiap deskripsi menyertakan path berkas yang tepat

## Catatan penting sebelum mulai

**US7 jauh lebih besar dari prioritasnya.** Pada [spec.md](./spec.md), US7 bertanda P3, tetapi
setelah cakupan diperluas pada 2026-09-10 ia memuat rancangan 16 bagian — sekitar 60% pekerjaan
fitur ini. Prioritas P3-nya tidak lagi mencerminkan bobotnya. Karena itu US7 dipecah menjadi
kelompok-kelompok yang saling bebas per bagian, sehingga dapat dikerjakan bertahap dan tiap
bagian dinyatakan selesai sendiri-sendiri, tanpa harus menunggu keseluruhannya.

**Pemeriksaan aksesibilitas dan lebar 320 px melekat pada tiap bagian**, bukan ditumpuk di fase
akhir. Menundanya berarti menemukan 16 masalah sekaligus di atas pola yang terlanjur sama.

---

## Status Implementasi (2026-09-10)

**Selesai dan terverifikasi**: 60 dari 123 task — Phase 1, 2 (fondasi), US1 (sistem desain),
US2 (navigasi), US3 (pola halaman), dan US6 (perkakas aksesibilitas serta responsif).

**Belum dikerjakan**: 63 task — US4 (6), US5 (7), US6 sisa (0), US7 (43), Polish (7).

### Gerbang kualitas saat ini

`npm run lint`, `npx tsc --noEmit`, `npx vitest run` (32 lolos), `npx playwright test`
(27 lolos), `npm run check:tokens`, dan `npm run build` seluruhnya bersih.

Cakupan E2E yang sudah berjalan: penelusuran papan ketik dengan pemeriksaan urutan fokus,
jebakan fokus pada dialog, lebar 320 px tanpa scroll mendatar, ukuran sasaran sentuh,
pemindaian aksesibilitas pada tiap halaman, dan penanda posisi navigasi.

### Koreksi terhadap rencana, ditemukan saat implementasi

1. **Rute `/_ui` mustahil ada.** Folder berawalan garis bawah adalah *private folder* yang
   dikecualikan dari routing. Rutenya menjadi `/ui-kit`. `research.md` R-006 sudah dikoreksi.
2. **Tailwind 4 tidak punya namespace `--duration-*`.** Token durasi ikut terbuang. Kini
   didefinisikan di `:root` dan dirujuk lewat `duration-(--nama)`.
3. **`Modal` dan `Drawer` perlu prop `trigger`.** Tanpa Radix memiliki hubungan pemicu-dialog,
   fokus tidak kembali ke pemicunya — melanggar FR-039.
4. **Kontras `lineStrong` hanya 1.72:1** terhadap ambang 3:1 untuk garis kolom isian.
   Digelapkan menjadi 3.55:1, bukan ambangnya yang diturunkan.
5. **`@types/node` masih `^20` padahal Node 24**, memblokir Vitest 5.
6. **Playwright harus memakai `localhost`, bukan `127.0.0.1`** — Next dev server memblokir aset
   client dari origin yang dianggap asing, sehingga React tidak pernah ter-hydrate.
7. **Penanda section aktif menandai section pertama di puncak halaman**, padahal pengguna masih
   melihat pembuka. Kini puncak halaman menandai Beranda.
8. **"Section terakhir" diambil dari urutan peta navigasi, bukan urutan dokumen.** Keduanya
   berbeda; kini diurutkan menurut posisinya di halaman.
9. **Pemeriksa urutan fokus tidak memperhitungkan perputaran siklus Tab**, sehingga menuduh
   perilaku normal peramban sebagai kesalahan.

### Penghalang yang masih berdiri

**Fitur 001 belum diimplementasikan.** Tidak ada `prisma/`, `lib/db/`, maupun halaman
`settings`. Akibatnya:

- **T112** (menerapkan sistem desain pada halaman Settings milik 001) **tidak dapat dikerjakan**.
- **T108–T109** (Our Time) dikerjakan memakai fixture lebih dulu.
- Tautan navigasi ke `/story`, `/memories`, `/letters`, `/open-when`, `/trips`, `/places`,
  `/soundtrack`, dan `/settings` masih menghasilkan 404 sampai US7 membuat halamannya.
- Vitest, Playwright, dan konfigurasinya seharusnya berasal dari 001; ketiganya dipasang lebih
  awal di sini agar test 002 dapat berjalan.

---

## Phase 1: Setup

- [X] T001 Pasang `framer-motion` sebagai dependency di `package.json` untuk interaksi beranimasi di dalam halaman
- [X] T002 [P] Pasang kumpulan primitif UI headless yang aksesibel di `package.json` untuk dialog, drawer, pilihan, tab, dan toast, sesuai [research.md](./research.md) R-004
- [X] T003 [P] Pasang pemindai aksesibilitas untuk Playwright di `package.json` sebagai devDependency
- [X] T004 [P] Verifikasi `app/globals.css` sudah memuat `@import "tailwindcss"` dan blok `@theme`, dan pastikan tidak ada `tailwind.config.js` yang menciptakan sumber kebenaran kedua, sesuai [research.md](./research.md) R-003
- [X] T005 [P] Tambahkan script `test:a11y` pada `package.json` yang menjalankan berkas Playwright bertanda aksesibilitas

**Checkpoint**: `npm install` bersih, `npx tsc --noEmit` lolos.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Token, kerangka route, penyedia gerak, peta navigasi, dan tipe view model. Seluruh
user story bergantung pada fase ini.

**⚠️ CRITICAL**: Tidak ada pekerjaan user story yang boleh dimulai sebelum fase ini selesai.

- [X] T006 Definisikan token warna pada blok `@theme` di `app/globals.css` — latar, permukaan, teks utama, teks sekunder, aksen, garis, dan warna keadaan — dengan palet hangat bernada rendah sesuai Prinsip VII
- [X] T007 Verifikasi setiap pasangan teks-latar pada token warna di `app/globals.css` memenuhi rasio kontras minimum 4.5:1 untuk teks normal dan 3:1 untuk teks besar serta komponen antarmuka, sesuai [research.md](./research.md) R-007
- [X] T008 [P] Definisikan token tipografi pada `app/globals.css` — satu muka huruf untuk isi dan satu untuk judul editorial, skala ukuran, tinggi baris, dan bobot — dimuat lewat `next/font` di `app/layout.tsx`
- [X] T009 [P] Definisikan token jarak, sudut membulat, dan bayangan pada `app/globals.css`, dengan bayangan terbatas dan lembut sesuai larangan bayangan berat pada `docs/ui-sections.md` §3.2
- [X] T010 [P] Definisikan token durasi dan pelambatan gerak pada `app/globals.css`, dipakai seluruh animasi
- [X] T011 Tambahkan aturan CSS global pada `app/globals.css` yang memangkas durasi transisi dan animasi ketika preferensi kurangi-gerak menyala, sebagai lapisan yang menjangkau transisi CSS dan View Transitions, sesuai [research.md](./research.md) R-005
- [X] T012 Buat penyedia gerak di `lib/motion/MotionProvider.tsx` yang menyetel mode kurangi-gerak mengikuti preferensi sistem, lalu pasang pada `app/layout.tsx`
- [X] T013 Buat route group `app/(app)/` beserta `app/(app)/layout.tsx` sebagai kerangka bersama seluruh halaman bagian, dan pindahkan halaman fitur 001 yang relevan ke dalamnya
- [X] T014 Buat peta navigasi di `lib/navigation.ts` berisi label, jenis tujuan (`section` atau `page`), tujuan, dan penanda utama-di-ponsel untuk tiap butir, dengan pembagian mengikuti [contracts/navigation.md](./contracts/navigation.md)
- [X] T015 [P] Buat penentu item navigasi aktif di `lib/navigation.ts` yang menerima route aktif untuk tujuan bertipe `page` dan section yang terlihat untuk tujuan bertipe `section`
- [X] T016 [P] Buat berkas tipe view model kosong beserta konvensinya di `lib/view-models/index.ts`, mendokumentasikan bahwa tiap view model wajib dapat menyatakan keadaan kosong, terisi, dan gagal sesuai [contracts/view-model.md](./contracts/view-model.md)
- [X] T017 [P] Buat konvensi fixture di `lib/fixtures/index.ts` yang mewajibkan tiap fixture menyertakan varian ekstrem berupa teks sangat panjang, tanpa gambar, dan daftar kosong
- [X] T018 [P] Buat unit test di `tests/unit/navigation.test.ts` untuk penentu item aktif pada kedua jenis tujuan

**Checkpoint**: token terdefinisi dan lolos pemeriksaan kontras; `app/(app)/layout.tsx` merender halaman kosong tanpa error.

---

## Phase 3: User Story 1 — Satu bahasa visual di seluruh ruang (Priority: P1)

**Goal**: Kumpulan komponen dasar yang seluruh nilai visualnya berasal dari token, tiap komponen
punya satu definisi, dan semuanya dapat diperiksa pada satu halaman peraga.

**Independent Test**: Membuka halaman peraga dan memastikan seluruh komponen dasar tampil beserta
variasi keadaannya, lalu memastikan tidak ada nilai visual lepas di dalam komponen.

**Catatan pembagian**: US1 membangun komponen primitif. Pola halaman yang tersusun dari
primitif — `PageHeader`, `EmptyState`, `ErrorState`, `ConfirmDialog` — dibangun pada US3.

- [X] T019 [P] [US1] Buat `components/ui/Button.tsx` dengan varian utama, sekunder, halus, dan merusak, serta keadaan normal, tertunjuk, terfokus, memuat, dan nonaktif
- [X] T020 [P] [US1] Buat `components/ui/Input.tsx` dengan keadaan normal, terfokus, gagal validasi, nonaktif, dan hanya-baca, dengan label terkait dan pesan kegagalan yang diumumkan ke pembaca layar
- [X] T021 [P] [US1] Buat `components/ui/Textarea.tsx` dengan keadaan yang sama seperti `Input.tsx`
- [X] T022 [P] [US1] Buat `components/ui/Select.tsx` di atas primitif headless, dengan keadaan yang sama seperti `Input.tsx`
- [X] T023 [P] [US1] Buat `components/ui/Card.tsx` yang lembut, membulat sedang, dan berfokus isi — bukan kartu metrik, sesuai FR-006
- [X] T024 [US1] Buat `components/ui/Modal.tsx` di atas primitif headless yang menahan fokus selama terbuka, mengembalikan fokus ke pemicu setelah ditutup, dapat ditutup dengan Escape, mengunci gulir halaman di belakangnya, dan menghormati preferensi kurangi-gerak
- [X] T025 [US1] Buat `components/ui/Drawer.tsx` dengan perilaku yang sama seperti `Modal.tsx`, untuk penyuntingan kontekstual
- [X] T026 [P] [US1] Buat `components/ui/Toast.tsx` dengan varian berhasil dan gagal, kalimat singkat dan ramah, menghilang sendiri tanpa menutupi kendali
- [X] T027 [P] [US1] Buat `components/ui/Badge.tsx` dengan varian netral dan varian keadaan, tidak menyampaikan makna lewat warna semata
- [X] T028 [P] [US1] Buat `components/ui/Skeleton.tsx` dengan bentuk untuk teks, gambar, dan kartu, yang menyerupai isi penggantinya sehingga tata letak tidak melompat
- [X] T029 [P] [US1] Buat `components/ui/Avatar.tsx` dengan varian berfoto dan tanpa foto
- [X] T030 [P] [US1] Buat `components/ui/Tabs.tsx` di atas primitif headless, dapat digulir mendatar pada layar ponsel
- [X] T031 [US1] Buat halaman peraga di `app/ui-kit/page.tsx` yang menampilkan seluruh komponen dasar beserta variasi keadaannya, memakai data contoh dan tidak pernah data hubungan sebenarnya
- [X] T032 [P] [US1] Buat E2E di `tests/e2e/ui-showcase.spec.ts` yang memastikan `/ui-kit` memuat seluruh komponen dasar
- [X] T033 [P] [US1] Buat E2E di `tests/e2e/ui-focus.spec.ts` yang memastikan setiap komponen interaktif pada `/ui-kit` memiliki keadaan fokus yang terlihat
- [X] T034 [P] [US1] Buat E2E di `tests/e2e/modal-focus.spec.ts` yang memastikan `Modal` dan `Drawer` menahan fokus, tertutup dengan Escape, dan mengembalikan fokus ke pemicu
- [X] T035 [P] [US1] Buat E2E pemindaian aksesibilitas di `tests/e2e/a11y-showcase.spec.ts` untuk `/ui-kit`, mencakup kontras dan penanda semantik
- [X] T036 [P] [US1] Tambahkan pemeriksaan konsistensi token ke `tests/e2e/` atau skrip terpisah yang menjalankan kedua perintah `grep` pada bagian "Memeriksa konsistensi token" di [quickstart.md](./quickstart.md) dan gagal bila menemukan hasil

**Checkpoint**: Langkah 1 dan 2 pada tabel validasi manual lolos; SC-001 dan SC-002 terpenuhi.

---

## Phase 4: User Story 2 — Berpindah tanpa tersesat (Priority: P1)

**Goal**: Kerangka aplikasi dengan navigasi bawah di ponsel dan daftar tujuan ringan di layar
besar, keduanya bersumber dari satu peta navigasi.

**Independent Test**: Menjelajahi seluruh tujuan dari ponsel dan dari layar besar, memastikan tiap
tujuan tercapai dan posisi saat ini selalu terlihat.

- [X] T037 [US2] Buat `components/layout/AppShell.tsx` yang memuat kedua bentuk navigasi dan area isi, lalu pasang pada `app/(app)/layout.tsx`
- [X] T038 [US2] Buat `components/layout/MobileNav.tsx` yang menampilkan butir bertanda utama di bagian bawah layar, ditambah satu jalan menuju seluruh butir lainnya
- [X] T039 [US2] Buat `components/layout/MobileNavMore.tsx` sebagai lembar yang menampilkan seluruh tujuan yang tidak muat di navigasi bawah
- [X] T040 [US2] Buat `components/layout/DesktopNav.tsx` yang menampilkan seluruh tujuan di sisi kiri dengan bobot visual ringan, tidak menyerupai panel navigasi aplikasi administratif
- [X] T041 [US2] Terapkan penanda posisi pada kedua komponen navigasi menggunakan penentu dari `lib/navigation.ts`, dengan penanda yang tidak bergantung pada warna semata
- [X] T042 [US2] Buat pengamat section pada `components/layout/useVisibleSection.ts` yang melaporkan section landing page yang sedang terlihat, lalu sambungkan ke penanda posisi navigasi
- [X] T043 [US2] Terapkan pembaruan alamat halaman ketika berpindah ke sebuah section pada `app/(app)/page.tsx`, sehingga alamatnya dapat dibagikan dan dibuka langsung
- [X] T044 [P] [US2] Buat E2E di `tests/e2e/navigation.spec.ts` yang menelusuri seluruh tujuan dari lebar ponsel dan lebar desktop, memastikan tiap tujuan tercapai dan penanda posisi benar
- [X] T045 [P] [US2] Buat E2E di `tests/e2e/navigation-deeplink.spec.ts` yang memastikan alamat hasil perpindahan ke section dapat dibuka langsung pada tab baru

**Checkpoint**: Langkah 5, 6, 7, 8, dan 9 pada tabel validasi manual lolos.

---

## Phase 5: User Story 3 — Setiap halaman tahu cara memperkenalkan diri (Priority: P1)

**Goal**: Pola halaman bersama — pengantar, keadaan kosong, konfirmasi penghapusan, dan
pemberitahuan keberhasilan — yang membuat seluruh bagian terasa satu produk.

**Independent Test**: Menampilkan pola page header dan empty state untuk beberapa bagian contoh
pada halaman peraga, lalu memastikan tidak ada kalimat yang berbunyi seperti pesan sistem.

- [X] T046 [P] [US3] Buat `components/ui/PageHeader.tsx` berisi judul, satu kalimat pengantar bernada personal, dan aksi utama opsional
- [X] T047 [P] [US3] Buat `components/ui/EmptyState.tsx` berisi judul, kalimat personal, dan satu aksi yang relevan
- [X] T048 [P] [US3] Buat `components/ui/ErrorState.tsx` berisi kalimat terbaca beserta cara mencoba lagi, tanpa nama teknis maupun jejak kesalahan
- [X] T049 [US3] Buat `components/ui/ConfirmDialog.tsx` di atas `Modal.tsx` yang menyebutkan secara jelas apa saja yang akan ikut terhapus
- [X] T050 [US3] Tambahkan seluruh pola halaman dari T046 sampai T049 ke halaman peraga `app/ui-kit/page.tsx`
- [X] T051 [P] [US3] Buat E2E di `tests/e2e/page-patterns.spec.ts` yang memastikan tidak ada empty state maupun pesan kegagalan pada `/ui-kit` yang memuat kalimat bergaya sistem, nama teknis, kode internal, atau jejak kesalahan
- [X] T052 [P] [US3] Buat E2E di `tests/e2e/confirm-dialog.spec.ts` yang memastikan konfirmasi penghapusan menyebutkan dampaknya sebelum aksi dijalankan

**Checkpoint**: SC-006 dan SC-008 terpenuhi pada halaman peraga.

---

## Phase 6: User Story 4 — Halaman tidak pernah membiarkan menunggu dalam kekosongan (Priority: P2)

**Goal**: Setiap bagian menangani seluruh keadaan antarmuka, dan tidak pernah menampilkan layar
kosong tanpa penjelasan.

**Independent Test**: Memperlambat jaringan dan memaksa kegagalan, lalu memastikan setiap bagian
menampilkan keadaan yang sesuai.

- [ ] T053 [US4] Buat konvensi `loading.tsx` bagi tiap route bagian di `app/(app)/` yang merender kerangka halaman memakai `components/ui/Skeleton.tsx`
- [ ] T054 [US4] Buat `app/(app)/error.tsx` yang merender `components/ui/ErrorState.tsx` dengan cara mencoba lagi, tanpa memaparkan detail internal
- [ ] T055 [US4] Dokumentasikan dan terapkan daftar keadaan wajib — memuat, terisi, kosong, gagal, berhasil, menyunting, menyimpan, menghapus, nonaktif — sebagai kontrak komponen di `lib/view-models/index.ts`
- [ ] T056 [US4] Terapkan pengembalian kendali ke keadaan semula beserta penyampaian alasan ketika sebuah aksi gagal, pada `components/ui/Button.tsx` dan `components/ui/Toast.tsx`
- [ ] T057 [P] [US4] Buat E2E di `tests/e2e/loading-states.spec.ts` yang memperlambat jaringan dan memastikan kerangka halaman muncul lebih dulu di setiap route bagian
- [ ] T058 [P] [US4] Buat E2E di `tests/e2e/error-states.spec.ts` yang memaksa kegagalan dan memastikan pesan terbaca beserta cara mencoba lagi muncul

**Checkpoint**: Langkah 15 dan 16 pada tabel validasi manual lolos.

---

## Phase 7: User Story 5 — Gerak yang menambah rasa, bukan mengganggu (Priority: P2)

**Goal**: Animasi yang melayani momen emosionalnya, singkat, dan sepenuhnya menghormati
preferensi kurangi-gerak.

**Independent Test**: Menyalakan preferensi kurangi-gerak pada sistem, lalu menelusuri seluruh
interaksi beranimasi dan memastikan semuanya tetap berfungsi.

- [ ] T059 [US5] Terapkan perpindahan antar halaman memakai `<ViewTransition>` React pada `app/(app)/layout.tsx`, sesuai [research.md](./research.md) R-005
- [ ] T060 [P] [US5] Terapkan animasi kemunculan kartu di `components/ui/Card.tsx` memakai token durasi, singkat dan tidak menunda interaksi
- [ ] T061 [P] [US5] Terapkan animasi kemunculan dan hilangnya lapisan pada `components/ui/Modal.tsx` dan `components/ui/Drawer.tsx`
- [ ] T062 [P] [US5] Terapkan animasi penanda centang pada komponen daftar tugas di `components/trips/checklist/`
- [ ] T063 [US5] Audit seluruh animasi pada `components/` dan pastikan tidak ada yang berjalan terus-menerus tanpa dipicu
- [ ] T064 [P] [US5] Buat E2E di `tests/e2e/reduced-motion.spec.ts` yang menjalankan seluruh interaksi beranimasi dengan preferensi kurangi-gerak menyala dan memastikan tidak ada fungsi yang hilang
- [ ] T065 [P] [US5] Buat E2E di `tests/e2e/no-idle-animation.spec.ts` yang memastikan halaman dalam keadaan diam tidak menjalankan animasi

**Checkpoint**: Langkah 13 dan 14 pada tabel validasi manual lolos; SC-005 terpenuhi.

---

## Phase 8: User Story 6 — Dapat dipakai semua orang, di layar apa pun (Priority: P2)

**Goal**: Perkakas dan pemeriksaan yang membuat responsif dan aksesibilitas dapat dibuktikan pada
setiap bagian, bukan hanya dijanjikan.

**Independent Test**: Menelusuri seluruh layar yang sudah ada pada lebar 320 px, lalu
mengulanginya hanya dengan papan ketik.

**Catatan**: Fase ini membangun perkakasnya. Penerapannya melekat pada tiap bagian di US7.

- [X] T066 [US6] Buat pembantu pengujian responsif di `tests/e2e/helpers/viewport.ts` yang menjalankan sebuah halaman pada lebar 320 px, tablet, dan desktop, lalu melaporkan scroll mendatar
- [X] T067 [US6] Buat pembantu pemindaian aksesibilitas di `tests/e2e/helpers/a11y.ts` yang menjalankan pemindai pada sebuah halaman dan gagal pada pelanggaran kontras maupun penanda semantik
- [X] T068 [US6] Buat pembantu penelusuran papan ketik di `tests/e2e/helpers/keyboard.ts` yang menelusuri seluruh kendali sebuah halaman dan memastikan urutannya masuk akal serta fokusnya terlihat
- [X] T069 [P] [US6] Terapkan ukuran sentuh yang nyaman pada seluruh kendali interaktif di `components/ui/`
- [X] T070 [P] [US6] Terapkan batas lebar baris teks pada `app/(app)/layout.tsx` agar tidak ada baris yang terlalu panjang untuk dibaca pada layar besar
- [X] T071 [P] [US6] Buat E2E di `tests/e2e/responsive-shell.spec.ts` memakai pembantu T066 untuk kerangka aplikasi dan landing page
- [X] T072 [P] [US6] Buat E2E di `tests/e2e/keyboard-shell.spec.ts` memakai pembantu T068 untuk kerangka aplikasi dan navigasi
- [X] T073 [P] [US6] Buat E2E di `tests/e2e/a11y-shell.spec.ts` memakai pembantu T067 untuk kerangka aplikasi dan landing page

**Checkpoint**: Langkah 3, 4, 10, 11, dan 12 pada tabel validasi manual lolos.

---

## Phase 9: User Story 7 — Setiap bagian punya wataknya sendiri (Priority: P3, bobot terbesar)

**Goal**: Rancangan antarmuka untuk 16 bagian pada `docs/ui-sections.md` §6–§21, masing-masing
dengan wataknya sendiri namun memakai sistem desain yang sama.

**Independent Test**: Membandingkan tiap bagian dengan tabel watak pada spec dan memastikan tidak
ada dua bagian yang tertukar wataknya.

**Pola per bagian**: tiap kelompok di bawah mengikuti bentuk yang sama — tipe view model beserta
fixture-nya, lalu komponennya, lalu halamannya beserta pemeriksaan responsif dan aksesibilitas.
Kelompok-kelompok ini saling bebas dan dapat dikerjakan dalam urutan apa pun.

### Home — gambaran hangat (FR-047)

- [ ] T074 [P] [US7] Buat tipe `HomeViewModel` di `lib/view-models/home.ts` berisi sapaan, nama kedua anggota, durasi hubungan, pertanyaan harian, perjalanan terdekat beserta hitung mundur, memori terbaru, surat terbaru, satu butir masa depan, dan aksi cepat; beserta fixture di `lib/fixtures/home.ts` termasuk varian ekstrem
- [ ] T075 [US7] Buat komponen hero dan section Home di `components/home/`, dengan urutan informasi mengikuti prioritas pada `docs/prd.md` §13
- [ ] T076 [US7] Rakit landing page di `app/(app)/page.tsx` yang merender hero, section NOW, PAST, dan FUTURE, lalu jalankan pembantu responsif dan aksesibilitas dari T066 dan T067

### Our Story — lini masa editorial (FR-048)

- [ ] T077 [P] [US7] Buat tipe `StoryViewModel` di `lib/view-models/story.ts` berisi daftar peristiwa dengan judul, tanggal, lokasi, deskripsi, gambar sampul, dan jenis, ditambah daftar penyaring; beserta fixture di `lib/fixtures/story.ts` termasuk varian ekstrem
- [ ] T078 [US7] Buat komponen lini masa dan kartu peristiwa di `components/story/`
- [ ] T079 [US7] Buat halaman di `app/(app)/story/page.tsx`, lalu jalankan pembantu responsif dan aksesibilitas

### Memories — album foto (FR-049)

- [ ] T080 [P] [US7] Buat tipe `MemoriesViewModel` di `lib/view-models/memories.ts` beserta fixture di `lib/fixtures/memories.ts` termasuk varian tanpa gambar dan daftar kosong
- [ ] T081 [US7] Buat galeri responsif dan kartu memori di `components/memories/`, dengan pemuatan bertahap agar tetap ringan seiring bertambahnya data
- [ ] T082 [US7] Buat halaman daftar di `app/(app)/memories/page.tsx` dan halaman detail di `app/(app)/memories/[id]/page.tsx`, lalu jalankan pembantu responsif dan aksesibilitas

### Letters — surat pribadi (FR-050)

- [ ] T083 [P] [US7] Buat tipe `LettersViewModel` di `lib/view-models/letters.ts` beserta fixture di `lib/fixtures/letters.ts` mencakup keadaan draft, terjadwal, tersedia, dan sudah dibuka
- [ ] T084 [US7] Buat daftar surat, tampilan baca, dan penulis surat bergaya kertas di `components/letters/`
- [ ] T085 [US7] Buat halaman daftar di `app/(app)/letters/page.tsx` dan halaman baca di `app/(app)/letters/[id]/page.tsx`, lalu jalankan pembantu responsif dan aksesibilitas

### Open When — amplop interaktif (FR-051)

- [ ] T086 [P] [US7] Buat tipe `OpenWhenViewModel` di `lib/view-models/open-when.ts` beserta fixture di `lib/fixtures/open-when.ts`
- [ ] T087 [US7] Buat kartu pemicu dan interaksi amplop di `components/open-when/` memakai Framer Motion, menghormati preferensi kurangi-gerak
- [ ] T088 [US7] Buat halaman di `app/(app)/open-when/page.tsx`, lalu jalankan pembantu responsif dan aksesibilitas

### Next Trips — jurnal perjalanan (FR-052)

- [ ] T089 [P] [US7] Buat tipe `TripViewModel` di `lib/view-models/trips.ts` beserta fixture di `lib/fixtures/trips.ts` mencakup status direncanakan, berlangsung, selesai, dan dibatalkan
- [ ] T090 [US7] Buat hero perjalanan dan ringkasan di `components/trips/`, memakai gambar sampul sebagai fokus visual
- [ ] T091 [US7] Buat halaman daftar di `app/(app)/trips/page.tsx` dan halaman detail di `app/(app)/trips/[id]/page.tsx` dengan navigasi tab yang dapat digulir mendatar di ponsel, lalu jalankan pembantu responsif dan aksesibilitas

### Trip Itinerary — lini masa (FR-053)

- [ ] T092 [P] [US7] Buat tipe `ItineraryViewModel` di `lib/view-models/itinerary.ts` beserta fixture di `lib/fixtures/itinerary.ts`
- [ ] T093 [US7] Buat pemilih hari dan lini masa aktivitas di `components/trips/itinerary/`, lalu sambungkan ke tab pada `app/(app)/trips/[id]/page.tsx` dan jalankan pembantu responsif dan aksesibilitas

### Trip Budget — catatan keuangan sederhana (FR-054)

- [ ] T094 [P] [US7] Buat tipe `BudgetViewModel` di `lib/view-models/budget.ts` beserta fixture di `lib/fixtures/budget.ts` mencakup kasus tanpa batas anggaran
- [ ] T095 [US7] Buat ringkasan anggaran, penanda kemajuan, dan rincian kategori di `components/trips/budget/` tanpa gaya dasbor keuangan, lalu sambungkan ke tab dan jalankan pembantu responsif dan aksesibilitas

### Trip Checklist — daftar tugas ringkas (FR-055)

- [ ] T096 [P] [US7] Buat tipe `ChecklistViewModel` di `lib/view-models/checklist.ts` beserta fixture di `lib/fixtures/checklist.ts`
- [ ] T097 [US7] Buat daftar tugas, penanda kemajuan, dan penugasan ke salah satu anggota atau keduanya di `components/trips/checklist/`, lalu sambungkan ke tab dan jalankan pembantu responsif dan aksesibilitas

### Our Places — koleksi tempat (FR-056)

- [ ] T098 [P] [US7] Buat tipe `PlacesViewModel` di `lib/view-models/places.ts` beserta fixture di `lib/fixtures/places.ts` termasuk varian tanpa gambar
- [ ] T099 [US7] Buat tampilan galeri dan daftar beserta kartu tempat di `components/places/`
- [ ] T100 [US7] Buat halaman di `app/(app)/places/page.tsx` dan detail di `app/(app)/places/[id]/page.tsx`, lalu jalankan pembantu responsif dan aksesibilitas

### Our Soundtrack — jurnal musik (FR-057)

- [ ] T101 [P] [US7] Buat tipe `SoundtrackViewModel` di `lib/view-models/soundtrack.ts` beserta fixture di `lib/fixtures/soundtrack.ts`
- [ ] T102 [US7] Buat kartu lagu di `components/soundtrack/` berisi sampul, judul, penyanyi, aksi memutar, dan cerita singkat — terasa sebagai jurnal, bukan pemutar musik
- [ ] T103 [US7] Buat halaman di `app/(app)/soundtrack/page.tsx`, lalu jalankan pembantu responsif dan aksesibilitas

### Our Future — papan impian, section pada `/` (FR-058)

- [ ] T104 [P] [US7] Buat tipe `FutureViewModel` di `lib/view-models/future.ts` beserta fixture di `lib/fixtures/future.ts` mencakup status direncanakan, berjalan, dan tercapai
- [ ] T105 [US7] Buat section Our Future di `components/future/` beserta perayaan untuk butir yang tercapai, lalu pasang sebagai section pada `app/(app)/page.tsx` dan jalankan pembantu responsif dan aksesibilitas

### Just For Us — interaksi bermain, section pada `/` (FR-059)

- [ ] T106 [P] [US7] Buat tipe `JustForUsViewModel` di `lib/view-models/just-for-us.ts` beserta fixture di `lib/fixtures/just-for-us.ts`
- [ ] T107 [US7] Buat Daily Question, Couple Quiz, dan Who Is More Likely? di `components/just-for-us/` dengan nada bermain dan bukan bersaing, lalu pasang sebagai section pada `app/(app)/page.tsx` dan jalankan pembantu responsif dan aksesibilitas

### Our Time — tampilan tenang, section pada `/` (FR-060)

- [ ] T108 [P] [US7] Buat tipe `OurTimeViewModel` di `lib/view-models/our-time.ts` yang menerima durasi dari `lib/date/duration.ts` milik fitur 001, beserta fixture di `lib/fixtures/our-time.ts` untuk dipakai bila fitur 001 belum tersedia
- [ ] T109 [US7] Buat section Our Time di `components/time/` yang menampilkan durasi sebagai kalimat tenang beserta tanggal mulai, lalu pasang sebagai section pada `app/(app)/page.tsx` dan jalankan pembantu responsif dan aksesibilitas

### Important Dates — kalender hubungan, section pada `/` (FR-061)

- [ ] T110 [P] [US7] Buat tipe `ImportantDatesViewModel` di `lib/view-models/important-dates.ts` beserta fixture di `lib/fixtures/important-dates.ts`
- [ ] T111 [US7] Buat penonjolan tanggal terdekat beserta hitung mundur dan kartu tanggal di `components/important-dates/`, lalu pasang sebagai section pada `app/(app)/page.tsx` dan jalankan pembantu responsif dan aksesibilitas

### Settings — antarmuka utilitas (FR-062)

- [ ] T112 [US7] Terapkan sistem desain pada halaman `app/(app)/settings/page.tsx` dan `app/(app)/settings/members/page.tsx` milik fitur 001 tanpa mengubah fungsinya, lalu jalankan pembantu responsif dan aksesibilitas

### Pemeriksaan menyeluruh US7

- [ ] T113 [P] [US7] Buat halaman rujukan watak bagian di `app/ui-kit/sections/page.tsx` yang menampilkan watak visual tiap bagian berdampingan untuk memastikan tidak ada dua bagian yang tertukar
- [ ] T114 [P] [US7] Buat E2E di `tests/e2e/a11y-sections.spec.ts` yang menjalankan pemindai aksesibilitas pada seluruh halaman bagian
- [ ] T115 [P] [US7] Buat E2E di `tests/e2e/responsive-sections.spec.ts` yang menjalankan pemeriksaan lebar 320 px pada seluruh halaman bagian
- [ ] T116 [US7] Audit seluruh layar terhadap daftar pola terlarang pada FR-028 dan catat setiap pemakaian yang memiliki alasan fungsional di `specs/002-ui-foundation/plan.md`

**Checkpoint**: Langkah 20, 21, dan 22 pada tabel validasi manual lolos.

---

## Phase 10: Polish & Cross-Cutting Concerns

- [ ] T117 [P] Tinjau seluruh kalimat pengantar dan empty state pada `components/` agar bernada hangat dan personal, bukan administratif
- [ ] T118 [P] Verifikasi tidak ada formulir pada `components/` maupun `app/` yang menampilkan pengenal relationship, penanda pembuat, penanda waktu perubahan, pengenal basis data, atau path penyimpanan
- [ ] T119 [P] Jalankan perintah pemeriksaan pemisahan komponen dari data pada [quickstart.md](./quickstart.md) dan pastikan tidak ada komponen bagian yang mengambil data sendiri
- [ ] T120 Jalankan perintah penghitung sisa utang fixture pada [quickstart.md](./quickstart.md) dan catat daftar halaman yang masih memakai fixture pada bagian Complexity Tracking di `specs/002-ui-foundation/plan.md`
- [ ] T121 [P] Ukur jumlah komponen client dan ukuran payload landing page `app/(app)/page.tsx`, lalu pindahkan section yang berat ke pemuatan bertahap bila perlu
- [ ] T122 Jalankan `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run test:e2e`, dan `npm run test:a11y` hingga seluruhnya lolos
- [ ] T123 Jalankan seluruh 22 langkah tabel validasi manual pada [quickstart.md](./quickstart.md) dan catat hasilnya

---

## Dependencies

```text
Phase 1 Setup
      ↓
Phase 2 Foundational  ← memblokir seluruh user story
      ↓
      ├─→ Phase 3 US1 (P1) komponen dasar
      │         ↓
      │   ┌─────┴──────────────────────┐
      │   ↓                            ↓
      ├─→ Phase 4 US2 (P1) navigasi    Phase 5 US3 (P1) pola halaman
      │   ↓                            ↓
      │   └─────┬──────────────────────┘
      │         ↓
      ├─→ Phase 6 US4 (P2) keadaan  ── butuh Skeleton & ErrorState
      ├─→ Phase 7 US5 (P2) gerak    ── butuh komponen dari US1
      ├─→ Phase 8 US6 (P2) perkakas a11y & responsif
      │         ↓
      └─→ Phase 9 US7 (P3) 16 bagian ── butuh US1, US2, US3, dan perkakas US6
                ↓
        Phase 10 Polish
```

**Ketergantungan antar story**:

- **US1 mendahului semuanya.** Komponen dasar adalah bahan bagi seluruh story lain.
- **US3 bergantung pada US1** — `ConfirmDialog` dibangun di atas `Modal` (T024).
- **US4 bergantung pada US1 dan US3** — memakai `Skeleton` (T028) dan `ErrorState` (T048).
- **US5 bergantung pada US1** — menganimasikan komponen yang sudah ada. Pengecualian: T062
  menyentuh `components/trips/checklist/` yang baru dibuat T097 di US7, sehingga T062 dikerjakan
  setelah T097.
- **US6 tidak bergantung pada story lain** untuk membangun perkakasnya, tetapi penerapannya di
  T071–T073 memerlukan kerangka aplikasi dari US2.
- **US7 bergantung pada US1, US2, US3, dan perkakas US6.** Enam belas kelompok di dalamnya saling
  bebas.

**Ketergantungan di dalam Phase 2**: T006 mendahului T007 (token warna harus ada sebelum
diperiksa). T014 mendahului T015. Sisanya paralel.

---

## Parallel Execution Examples

**Phase 1** — T002 sampai T005 paralel setelah T001.

**Phase 2** — setelah T007: T008, T009, T010, T015, T016, T017, dan T018 dapat dikerjakan
bersamaan. T011 menunggu T010; T012 menunggu T011; T013 dan T014 bebas.

**Phase 3 (US1)** — sebelas komponen T019–T023 dan T026–T030 seluruhnya paralel. T024 dan T025
berbagi perilaku lapisan sehingga sebaiknya berurutan. Seluruh test T032–T036 paralel setelah
T031.

**Phase 4 (US2)** — T038, T039, dan T040 paralel setelah T037. Test T044 dan T045 paralel.

**Phase 5 (US3)** — T046, T047, dan T048 paralel; T049 menunggu T024.

**Phase 9 (US7)** — enam belas kelompok saling bebas dan dapat dikerjakan paralel penuh. Di dalam
tiap kelompok, task view model bertanda [P] dapat dikerjakan lebih dulu untuk seluruh bagian
sekaligus, karena masing-masing menyentuh berkas berbeda.

**Phase 10** — T117 sampai T121 paralel; T122 dan T123 berurutan di akhir.

---

## Implementation Strategy

### MVP

**Phase 1 + Phase 2 + Phase 3 (US1)** adalah irisan terkecil yang sudah bernilai: sistem token
dan komponen dasar yang dapat diperiksa pada satu halaman peraga. Setelah ini, fitur mana pun
yang dibangun berikutnya sudah punya bahasa visual yang sama.

MVP yang benar-benar terasa sebagai aplikasi adalah **sampai Phase 5 (US3)** — kerangka,
navigasi, dan pola halaman lengkap. Bagian-bagiannya masih kosong, tetapi bentuk produknya sudah
berdiri.

### Urutan yang disarankan

1. **Phase 1 → Phase 2** — tidak dapat dilewati. Token yang salah di awal akan menular ke seluruh
   komponen.
2. **Phase 3 (US1)** — bahan bagi semuanya.
3. **Phase 4 (US2) dan Phase 5 (US3)** — dapat dikerjakan berdampingan.
4. **Phase 8 (US6)** — dikerjakan **sebelum** US7 meski prioritasnya P2, karena perkakasnya
   dipakai setiap kelompok di US7. Ini penyimpangan sadar dari urutan prioritas.
5. **Phase 6 (US4) dan Phase 7 (US5)** — dapat menyusul kapan saja setelah US1.
6. **Phase 9 (US7)** — enam belas kelompok, dikerjakan bertahap. Tiap kelompok dapat dinyatakan
   selesai sendiri.
7. **Phase 10** — gerbang kualitas.

### Catatan tentang utang yang disengaja

T120 bukan task administratif. Ia menghitung berapa banyak halaman yang masih berjalan di atas
fixture, dan mencatatnya kembali ke Complexity Tracking pada [plan.md](./plan.md). Selama angka
itu belum nol, fitur ini masih membawa utang yang diterima secara sadar pada 2026-09-10 — dan
angkanya harus dapat dilihat, bukan diperkirakan.

### Catatan konstitusi

Gerbang pada bagian Development Workflow konstitusi v2.0.0 dipenuhi T122 dan T123. Fitur ini
belum boleh dinyatakan selesai sebelum keduanya lolos.
