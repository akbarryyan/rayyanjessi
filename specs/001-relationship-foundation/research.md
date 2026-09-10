# Phase 0 — Research: Relationship Foundation

**Tanggal**: 2026-09-09
**Spec**: [spec.md](./spec.md)
**Konstitusi**: v2.0.0

Seluruh keputusan di bawah diverifikasi terhadap dokumentasi Next.js yang terpasang di
`node_modules/next/dist/docs/`, bukan dari ingatan. Versi terpasang: **Next.js 16.3.4**,
React 19.2.8, Tailwind CSS 4, TypeScript 5.

---

## R-001 — Middleware sudah berganti nama menjadi Proxy

**Keputusan**: Fitur ini tidak menggunakan `middleware.ts` maupun `proxy.ts` sama sekali.

**Temuan**: `01-app/01-getting-started/16-proxy.md` menyatakan: *"Starting with Next.js 16,
Middleware is now called Proxy to better reflect its purpose."* Konvensinya kini `proxy.ts` di
root proyek. `docs/architecture.md` §35 masih mencantumkan `middleware.ts` — usang.

**Rationale**: Kegunaan utama middleware pada rancangan lama adalah proteksi route. Proteksi
route sudah tidak ada (FR-001). Tidak ada kebutuhan tersisa yang menuntutnya.

**Alternatif ditolak**: memakai `proxy.ts` untuk menyisipkan header `X-Robots-Tag`. Ditolak
karena `app/robots.ts` dan metadata route sudah cukup untuk FR-004, tanpa menambah lapisan yang
dijalankan pada setiap request.

**Tindak lanjut**: `docs/architecture.md` §35 sebaiknya mengganti `middleware.ts` menjadi
`proxy.ts` agar tidak menyesatkan fitur berikutnya.

---

## R-002 — Cache Components dibiarkan nonaktif

**Keputusan**: `cacheComponents` TIDAK diaktifkan pada fitur ini. `next.config.ts` tetap kosong.

**Temuan**: `01-getting-started/08-caching.md` — Cache Components adalah opt-in melalui
`cacheComponents: true`. Bila aktif, route segment config `dynamic`, `revalidate`, dan
`fetchCache` menjadi error, dan Next memvalidasi bahwa setiap route dapat dirender instan.
`04-functions/cookies.md` mencatat bahwa dengan Cache Components aktif, memanggil `cookies()` di
luar boundary `<Suspense>` mencegah route di-prerender.

**Rationale**: Fitur ini membaca cookie penanda identitas pada hampir setiap halaman, sehingga
seluruh route-nya memang bersifat request-time. Mengaktifkan Cache Components sekarang hanya
menambah kewajiban validasi tanpa manfaat. Prinsip III.

**Alternatif ditolak**: mengaktifkannya sejak awal agar tidak perlu migrasi. Ditolak karena
migrasinya bersifat inkremental per route (`instant = false` tersedia sebagai opt-out), jadi
menundanya tidak menciptakan utang yang mahal.

**Kapan ditinjau ulang**: saat fitur landing page dikerjakan. Landing page menggabungkan banyak
domain dalam satu halaman dan merupakan kandidat kuat untuk `use cache` + `cacheLife`.

---

## R-003 — Penanda identitas disimpan sebagai cookie, bukan localStorage

**Keputusan**: Penanda identitas disimpan pada cookie `olu_member` berisi id Member.
Atribut: `httpOnly: true`, `sameSite: 'lax'`, `path: '/'`, `maxAge` 10 tahun, `secure` mengikuti
lingkungan.

**Temuan**: `04-functions/cookies.md` — `cookies()` adalah fungsi **async** (berbeda dari v14 ke
bawah). Dapat dibaca di Server Component; `.set` dan `.delete` hanya dapat dipanggil di Server
Function atau Route Handler, karena HTTP tidak mengizinkan menyetel cookie setelah streaming
dimulai.

**Rationale**: FR-016 mewajibkan penulis dicatat **di server** berdasarkan anggota yang sedang
dipilih. Cookie terbaca server, jadi server action tidak perlu menerima `memberId` dari client.
Cookie juga bertahan melewati penutupan peramban (FR-014) dan bersifat per perangkat (FR-015).

`httpOnly: true` dipilih bukan sebagai kontrol keamanan — FR-017 menegaskan penanda ini bukan
kontrol keamanan — melainkan agar hanya ada satu sumber kebenaran. Bila client dapat menulisnya
sendiri, nilai di client dan di server bisa berbeda.

**Alternatif ditolak**:
- `localStorage`: tidak terbaca server, sehingga setiap mutation harus membawa `memberId` dari
  client. Ini membuat atribusi ditentukan input client, bertentangan dengan bunyi FR-016.
- Cookie tanpa `httpOnly`: tidak ada manfaat yang menuntutnya, dan membuka peluang nilai di
  client menyimpang dari yang dipakai server.

**Konsekuensi**: mengganti identitas harus lewat Server Action, bukan tulis-langsung di client.

---

## R-004 — Relationship tunggal di-resolve lewat query, bukan environment variable

**Keputusan**: `getRelationshipContext()` memanggil `prisma.relationship.findFirst()` beserta
kedua Member-nya. Bila tidak ada baris, ia mengembalikan status `not-ready` yang memicu layar
"ruang belum siap" (FR-024).

**Rationale**: Tidak ada konfigurasi tambahan yang perlu dijaga tetap sinkron dengan isi
database. Ketiadaan baris adalah keadaan yang memang harus ditangani (FR-024), sehingga jalur
`not-ready` bukan biaya tambahan.

**Alternatif ditolak**: `RELATIONSHIP_ID` sebagai environment variable. Ditolak karena
menciptakan dua sumber kebenaran yang bisa menyimpang, dan tidak memberi manfaat apa pun selama
hanya ada satu baris.

---

## R-005 — Constraint database untuk singleton dan batas dua anggota

**Keputusan**:
- **Satu Relationship per deployment**: kolom `singleton Boolean @default(true) @unique`. Karena
  seluruh baris bernilai `true` dan kolomnya unik, hanya satu baris yang dapat ada.
- **Maksimum dua anggota**: kolom `slot Int` dengan `@@unique([relationshipId, slot])`, ditambah
  `CHECK (slot IN (1, 2))` yang disisipkan manual ke file migration sebagai raw SQL.

**Rationale**: FR-029 mewajibkan kedua aturan ditegakkan constraint database, bukan hanya
pemeriksaan di kode. Prisma tidak memiliki sintaks untuk `CHECK`, sehingga menyunting file
migration adalah cara yang tersedia — dan tetap tercatat pada sistem migration, sesuai Prinsip IX.

**Alternatif ditolak**: trigger database untuk menghitung jumlah anggota. Ditolak karena jauh
lebih rumit daripada pasangan unique + check, untuk hasil yang sama (Prinsip III).

**Batasan yang diakui**: aturan `started_at` tidak boleh di masa depan (FR-009) **tidak dapat**
dinyatakan sebagai `CHECK` di MySQL 8, karena `CHECK` melarang fungsi non-deterministik seperti
`CURRENT_DATE`. Aturan ini ditegakkan pada validasi server (Zod) dan diuji lewat integration
test. FR-029 hanya menyebut batas dua anggota dan kepemilikan `relationship_id`, jadi tidak ada
requirement yang dilanggar.

---

## R-006 — `started_at` sebagai tanggal kalender

**Keputusan**: `startedAt` bertipe `DateTime @db.Date` di Prisma, diperlakukan sebagai tanggal
kalender tanpa komponen waktu dan tanpa konversi zona waktu saat ditampilkan.

**Temuan/Rationale**: FR-009 dan SC-005 menuntut tanggal yang tampil sama persis dengan yang
tersimpan bagi pembaca di time zone mana pun. Menyimpan sebagai `DATE` menghilangkan komponen
waktu yang menjadi penyebab pergeseran tanggal.

**Perhitungan durasi**: dilakukan di server pada saat render, membandingkan `startedAt` dengan
tanggal hari ini menurut zona waktu aplikasi. Zona waktu aplikasi ditetapkan lewat environment
variable `APP_TIMEZONE`, default `Asia/Jakarta`.

**Alternatif ditolak**: menghitung durasi di client dari jam perangkat. Ditolak karena hasilnya
berbeda antar perangkat dan menimbulkan hydration mismatch.

**Catatan**: `docs/architecture.md` §23 mewajibkan durasi dihitung dinamis dan tidak disimpan.
Keputusan ini mematuhinya.

---

## R-007 — Unggahan gambar: minimal, bukan pipeline penuh

**Keputusan**: Fitur ini menyertakan unggahan gambar minimal — Route Handler `POST /api/upload`,
validasi MIME/ekstensi/ukuran, storage abstraction dengan driver lokal, dan tabel `Media`.
Thumbnail, kompresi, WebP/AVIF, dan responsive image TIDAK termasuk.

**Rationale**: FR-020 mewajibkan foto anggota "dapat diperbarui dari dalam aplikasi", yang berarti
harus ada jalan mengunggah. Bagian Assumptions pada spec menyatakan pipeline media lengkap
dispesifikasikan bersama fitur yang membutuhkannya, sehingga yang masuk sekarang hanyalah jalur
unggah paling sederhana yang membuat FR-020 benar-benar terpenuhi.

**Temuan**: `01-getting-started/15-route-handlers.md` — Route Handler adalah tempat yang tepat
untuk endpoint unggah. `docs/architecture.md` §27 juga sudah mencantumkan `/api/upload`.

**Alternatif ditolak**: menempelkan URL gambar dari luar. Ditolak karena membuat foto pasangan
bergantung pada hosting pihak ketiga, bertentangan dengan Prinsip I (data tidak keluar) dan
Prinsip XI.

**Catatan jujur**: ini bagian terbesar dari fitur 001 dan satu-satunya yang terasa melebihi
"fondasi". Ia tetap dikerjakan karena FR-020 memintanya secara eksplisit.

---

## R-008 — Strategi pengujian

**Keputusan**: Vitest untuk unit dan integration test, Playwright untuk E2E.

**Temuan**: `02-guides/testing/vitest.md` — *"Since `async` Server Components are new to the React
ecosystem, Vitest currently does not support them."* Dokumentasi menyarankan E2E untuk komponen
async.

**Pembagian**:
- **Unit (Vitest)** — perhitungan durasi hubungan, validasi Zod, pemformatan tanggal. Fungsi
  murni, tanpa database.
- **Integration (Vitest, database uji)** — server action, `getRelationshipContext()`, constraint
  singleton dan batas dua anggota, penolakan `startedAt` masa depan, `relationshipId` diambil dari
  context dan bukan input client.
- **E2E (Playwright)** — memilih identitas, cookie diingat, berganti identitas, layar "ruang belum
  siap", ketiadaan jalur `/login` dan `/register`.

**Yang diwajibkan Prinsip X untuk fitur ini**: perhitungan tanggal/durasi, constraint integritas
data, dan validasi unggahan media. Kewajiban menguji authentication dan authorization sudah
dihapus pada konstitusi v2.0.0 karena perilakunya tidak ada.

---

## R-009 — Penolakan pengindeksan mesin pencari

**Keputusan**: `app/robots.ts` mengembalikan `disallow: '/'` untuk seluruh user agent, ditambah
`robots: { index: false, follow: false }` pada metadata root layout.

**Rationale**: FR-004 dan SC-007. Dua lapis dipakai karena `robots.txt` hanya permintaan,
sedangkan meta tag `noindex` lebih tegas bagi perayap yang tetap mengambil halaman.

**Temuan**: `03-api-reference/03-file-conventions/` menyediakan konvensi `robots.ts`, dan
`01-getting-started/14-metadata-and-og-images.md` menyediakan field `robots` pada objek metadata.

---

## R-010 — Dependensi yang perlu ditambahkan

Belum terpasang di `package.json` saat ini:

| Paket | Untuk | Requirement |
|---|---|---|
| `prisma`, `@prisma/client` | ORM dan migration | FR-029, FR-030, Prinsip IX |
| `zod` | Validasi input di server | FR-031, Prinsip V |
| `vitest` + pendukungnya | Unit dan integration test | Prinsip X |
| `@playwright/test` | E2E test | Prinsip X |

`framer-motion` disebut `docs/architecture.md` §3.3 untuk animasi emosional. **Tidak dipasang
pada fitur ini** — tidak ada requirement 001 yang membutuhkannya, dan Prinsip III melarang
memasang sesuatu sebelum spec memintanya. Ia menyusul bersama Letters atau Open When.

MySQL diperlukan sebagai database lokal untuk development dan integration test.
