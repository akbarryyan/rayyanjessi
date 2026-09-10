# Phase 0 — Research: UI Foundation

**Tanggal**: 2026-09-10
**Spec**: [spec.md](./spec.md) · **Konstitusi**: v2.0.0

Diverifikasi terhadap dokumentasi Next.js terpasang di `node_modules/next/dist/docs/` dan
terhadap konfigurasi proyek yang sudah ada, bukan dari ingatan. Terpasang: Next.js 16.3.4,
React 19.2.8, Tailwind CSS 4, TypeScript 5.

---

## R-001 — Model navigasi hibrida

**Keputusan**: Item navigasi yang isinya ringkas mengantar ke section pada landing page `/`
melalui fragment; item yang membutuhkan ruang penuh mengantar ke halaman tersendiri.

Pembagiannya:

| Ke section pada `/` | Ke halaman tersendiri |
|---|---|
| Our Time, Important Dates, Our Future, Just For Us | Our Story, Memories, Letters, Open When, Next Trips, Places, Soundtrack, Settings |

**Rationale**: Empat bagian pertama isinya ringkas dan justru lebih bermakna dibaca berurutan
dalam satu alur PAST → NOW → FUTURE. Delapan sisanya memerlukan galeri, lini masa, atau
pengalaman baca tersendiri yang tidak muat sebagai section.

**Alternatif ditolak**: seluruhnya halaman terpisah — mencabut keputusan landing page pada
2026-09-09. Seluruhnya section pada `/` — membuat satu halaman menanggung galeri dan lini masa
sekaligus, bertentangan dengan Prinsip VI soal ringan di ponsel.

**Konsekuensi**: penanda posisi navigasi punya dua sumber — route aktif untuk halaman
tersendiri, dan section yang sedang terlihat untuk landing page (FR-046).

---

## R-002 — Bagian tanpa data model dirancang di atas kontrak view-model

**Keputusan**: Setiap bagian yang data modelnya belum ada menerima datanya sebagai props
bertipe eksplisit — sebuah *view model* — dan tidak pernah mengambil data sendiri. Data contoh
disimpan terpisah sebagai fixture di `lib/fixtures/`.

**Rationale**: Dari 15 bagian, hanya Settings dan penghitung waktu yang punya data model (dari
fitur 001). Tiga belas sisanya dirancang lebih dulu atas keputusan pemilik produk. Memisahkan
komponen dari sumber datanya membuat penyambungan kelak hanya mengganti pemanggil, bukan
merancang ulang komponennya.

**Aturan yang ditegakkan**:
- Komponen bagian MUST NOT memanggil Prisma, `fetch`, atau server action apa pun
- Setiap bagian mengekspor satu tipe view model di `lib/view-models/<domain>.ts`
- Fixture MUST NOT ikut ter-bundle ke halaman produksi selain halaman peraga

**Alternatif ditolak**: membuat tabel database sementara agar UI punya data sungguhan. Ditolak
karena melanggar Prinsip IX — skema yang belum dispesifikasikan akan menjadi migration yang harus
dibongkar lagi.

**Utang yang diakui**: ketiga belas bagian itu harus ditinjau ulang saat spec domainnya mendarat.
Tercatat pada Complexity Tracking di [plan.md](./plan.md).

---

## R-003 — Token desain didefinisikan di CSS, bukan berkas konfigurasi

**Keputusan**: Seluruh token — tipografi, jarak, sudut membulat, warna, bayangan — didefinisikan
di dalam blok `@theme` pada `app/globals.css`. Tidak ada `tailwind.config.js`.

**Temuan**: `01-getting-started/11-css.md` menunjukkan pemasangan Tailwind di Next 16 hanya
memerlukan `@tailwindcss/postcss` dan `@import "tailwindcss"`. Proyek ini sudah memakainya, dan
`app/globals.css` sudah memuat blok `@theme inline`. Tailwind 4 memang memindahkan definisi token
dari berkas konfigurasi JavaScript ke CSS. Panduan `02-guides/tailwind-v3-css.md` hanya relevan
untuk proyek yang masih di v3.

**Rationale**: Mengikuti bentuk yang sudah ada dan bentuk yang memang dianjurkan versi
terpasang. Token yang hidup di CSS otomatis tersedia sebagai custom property, sehingga nilai yang
sama dapat dipakai utilitas Tailwind maupun CSS lepas tanpa disalin (FR-002).

**Alternatif ditolak**: menambahkan `tailwind.config.js` agar terasa familier. Ditolak karena
bukan bentuk v4 dan menciptakan dua tempat kebenaran.

---

## R-004 — Primitif aksesibel dipakai, sisanya dibuat sendiri

**Keputusan**: Memakai primitif headless tanpa gaya untuk dialog, drawer, pilihan, tab, dan
toast. Komponen lain — tombol, kolom isian, area teks, kartu, lencana, penanda muat — dibuat
sendiri di atas token.

**Rationale**: FR-039 mewajibkan fokus tertahan di dalam modal dan kembali ke tempat semula
setelah ditutup; FR-036 dan FR-041 mewajibkan seluruhnya terjangkau papan ketik dan terbaca
pembaca layar. Perilaku itu — jebakan fokus, pengembalian fokus, `aria-modal`, penguncian
gulir, penutupan dengan Escape — mahal dan mudah salah bila dibuat sendiri, dan kesalahannya
tidak terlihat sampai ada yang benar-benar memakai pembaca layar.

Tombol dan kolom isian tidak punya perilaku tersembunyi semacam itu, sehingga membuatnya sendiri
lebih ringan daripada menyeret kepustakaan (Prinsip III).

**Alternatif ditolak**: kit komponen bergaya lengkap. Ditolak karena membawa bahasa visualnya
sendiri yang justru harus dilawan agar produk tidak terasa generik (Prinsip VII).

**Alternatif ditolak**: seluruhnya dibuat sendiri. Ditolak karena aksesibilitas dialog adalah
tempat paling umum orang gagal diam-diam.

---

## R-005 — Gerak dan preferensi kurangi-gerak

**Keputusan**: Memakai Framer Motion, dibungkus satu penyedia global yang menghormati preferensi
sistem. Untuk perpindahan antar halaman, memakai `<ViewTransition>` bawaan React bila memungkinkan.

**Temuan**: `02-guides/view-transitions.md` — React menyediakan komponen `<ViewTransition>` yang
terhubung ke View Transitions API peramban, dan dokumentasinya menyebut pendekatan ini
menggantikan kepustakaan animasi yang harus melacak posisi elemen antar route secara manual.

**Rationale**: Perpindahan antar halaman ditangani peramban, sehingga lebih ringan dan tidak
menahan navigasi (FR-031). Framer Motion tetap dipakai untuk interaksi di dalam halaman —
amplop Open When (FR-051), kartu yang muncul, penanda centang.

**Preferensi kurangi-gerak**: satu penyedia global menyetel mode kurangi-gerak mengikuti
preferensi sistem, dan aturan CSS global memangkas durasi animasi ketika preferensi itu menyala.
Dua lapis dipakai karena Framer Motion hanya mengurus animasinya sendiri, sedangkan transisi CSS
dan View Transitions perlu dipangkas terpisah (FR-030).

**Alternatif ditolak**: menyediakan tombol kurangi-gerak di dalam aplikasi. Ditunda — preferensi
sistem sudah cukup, dan §21.3 `ui-sections.md` menempatkannya sebagai pengaturan opsional.

---

## R-006 — Halaman peraga komponen berada di dalam aplikasi

**Keputusan**: Halaman peraga sebagai route `/ui-kit` di dalam aplikasi, bukan perkakas terpisah.

**Koreksi (2026-09-10, saat implementasi)**: rute ini semula direncanakan sebagai `/_ui`.
Itu keliru — `01-getting-started/02-project-structure.md` menyatakan folder berawalan garis bawah
adalah *private folder* yang sengaja dikecualikan dari routing, sehingga `/_ui` tidak akan pernah
ada. Ditemukan oleh E2E yang gagal, bukan oleh pembacaan ulang.

**Rationale**: FR-005 hanya menuntut satu tempat untuk memeriksa konsistensi seluruh komponen
beserta keadaannya. Route biasa sudah memenuhinya, memakai token dan komponen yang sama persis
dengan produksi, tanpa menambah perkakas, konfigurasi, dan proses build kedua (Prinsip III).

**Alternatif ditolak**: perkakas katalog komponen tersendiri. Ditolak karena membawa konfigurasi
dan build sendiri untuk keuntungan yang tidak diminta requirement mana pun.

**Catatan privasi**: halaman ini hanya menampilkan komponen dan data contoh, tidak pernah data
hubungan yang sebenarnya (Prinsip I).

---

## R-007 — Ambang kontras

**Keputusan**: Rasio kontras minimum **4.5:1** untuk teks normal dan **3:1** untuk teks besar
serta komponen antarmuka — ambang AA pada pedoman aksesibilitas web yang berlaku umum.

**Rationale**: FR-042 dan SC-010 menuntut ambang yang lazim. Angka ini diverifikasi otomatis
sehingga tidak bergantung penilaian mata.

**Konsekuensi**: palet hangat bernada rendah yang diminta Prinsip VII harus diperiksa terhadap
ambang ini sejak awal, bukan setelah seluruh layar jadi. Warna teks sekunder di atas latar hangat
adalah tempat paling rawan gagal.

---

## R-008 — Strategi pengujian

**Keputusan**: Playwright untuk seluruh pemeriksaan yang menyangkut tampilan dan interaksi;
Vitest hanya untuk logika murni.

**Rationale**: Requirement fitur ini hampir seluruhnya perilaku antarmuka — papan ketik, fokus,
lebar layar, preferensi gerak, kontras. Semuanya hanya dapat dibuktikan pada peramban sungguhan.
`02-guides/testing/vitest.md` juga menyatakan Vitest belum mendukung async Server Component.

**Pembagian**:
- **Playwright** — penelusuran papan ketik dan jebakan fokus pada modal (FR-036, FR-039);
  lebar 320 px tanpa scroll mendatar (FR-033); perilaku ketika preferensi kurangi-gerak menyala
  (FR-030); pemeriksaan kontras dan penanda semantik otomatis pada tiap halaman (FR-041, FR-042);
  keadaan muat dan gagal (FR-021, FR-023)
- **Vitest** — pembantu navigasi (menentukan item aktif dari route atau section), pembentuk
  view model, dan pemformat teks

**Pemeriksaan aksesibilitas otomatis**: memakai pemindai aksesibilitas yang berjalan di dalam
Playwright, dijalankan pada halaman peraga `/ui-kit` dan pada tiap halaman bagian.

---

## R-009 — Dependensi yang perlu ditambahkan

| Paket | Untuk | Requirement |
|---|---|---|
| `framer-motion` | Interaksi beranimasi di dalam halaman | FR-030, FR-031, FR-051 |
| Primitif UI headless | Dialog, drawer, pilihan, tab, toast yang aksesibel | FR-016, FR-039, FR-040 |
| Pemindai aksesibilitas untuk Playwright | Pemeriksaan kontras dan semantik otomatis | FR-041, FR-042 |

Sudah terpasang dan tidak perlu ditambah: Tailwind CSS 4, `@tailwindcss/postcss`, TypeScript.

Berasal dari fitur 001 dan diasumsikan sudah ada: Playwright, Vitest, Zod.

**Ketergantungan pada fitur 001**: Settings (FR-062) dan penghitung waktu (FR-060) menampilkan
data sungguhan dari `Relationship` dan `Member`. Bila fitur 001 belum selesai, keduanya dirancang
memakai fixture seperti bagian lain, lalu disambungkan.
