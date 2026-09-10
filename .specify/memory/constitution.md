<!--
SYNC IMPACT REPORT
Version change: 1.0.1 → 2.0.0
Rationale: MAJOR. Pemilik produk memutuskan aplikasi berjalan tanpa authentication sama sekali:
tidak ada login, tidak ada akun berkredensial, tidak ada session. Keputusan ini mendefinisikan
ulang dua prinsip secara tidak kompatibel, sehingga tidak dapat diperlakukan sebagai MINOR atau
PATCH.

Prinsip yang didefinisikan ulang:
- I. Privacy First → I. Private by Design. Sebelumnya mewajibkan setiap pembacaan dan mutation
  memverifikasi relationship user yang authenticated. Kini tidak ada identitas yang dapat
  diverifikasi; privasi bertumpu pada alamat deployment yang tidak dipublikasikan, tidak adanya
  permukaan berbagi publik, dan tidak keluarnya data ke pihak ketiga. Batasan yang diketahui
  dicatat eksplisit sebagai risiko yang diterima.
- X. Testing Critical Behavior. Kewajiban menguji authentication, authorization, dan isolasi
  antar-relationship dihapus karena perilaku itu tidak lagi ada. Digantikan pengujian scheduled
  letter, perhitungan trip dan tanggal, integritas data, serta validasi media.

Prinsip yang disesuaikan tanpa perubahan makna inti:
- II. Relationship-Centric Architecture — Relationship tetap ownership root pada model data,
  namun satu deployment melayani tepat satu Relationship.
- V. Server-Side Business Logic — langkah authorization dihapus dari urutan wajib server action;
  validasi dan business rule di server tetap berlaku penuh.

Bagian yang disesuaikan:
- Technology & Security Constraints — Auth.js, password hashing, dan keamanan session dihapus;
  proteksi mutation, rate limiting upload, dan pengamanan secret tetap ada; ditambah kewajiban
  mencegah pengindeksan mesin pencari.

Bagian yang ditambahkan: Accepted Risks
Bagian yang dihapus: tidak ada

Riwayat sebelumnya:
- 1.0.1 (2026-09-09) — alih bahasa ke Bahasa Indonesia, tanpa perubahan makna.
- 1.0.0 (2026-09-09) — ratifikasi awal.

Template yang tidak perlu diubah (membaca konstitusi ini saat dijalankan):
- .specify/templates/plan-template.md
- .specify/templates/spec-template.md
- .specify/templates/tasks-template.md
- .specify/templates/checklist-template.md

TODO lanjutan: tidak ada yang tersisa.

Diselesaikan pada 2026-09-09, setelah amandemen ini:
- docs/prd.md dan docs/architecture.md telah dirapikan agar selaras dengan konstitusi ini.
  Seluruh bagian yang membahas authentication, session, protected route, dan authorization sudah
  ditulis ulang; keduanya membawa catatan revisi di bagian atas.
- Penyebutan "Laravel Policies" pada docs/prd.md §8 ikut hilang bersama penulisan ulang bagian
  tersebut menjadi Access Model. Ketidakkonsistenan yang tercatat sejak 1.0.0 kini tertutup.
-->

# Konstitusi Our Little Universe

## Core Principles

### I. Private by Design

Aplikasi ini adalah ruang privat bagi dua orang, meskipun tidak menegakkan kontrol akses apa pun.

- Produk MUST NOT memiliki permukaan berbagi publik: tidak ada public profile, public memory,
  public letter, public trip, public place, maupun public timeline.
- Aplikasi MUST mencegah pengindeksan mesin pencari dan MUST NOT menerbitkan tautan yang dapat
  ditemukan publik ke deployment-nya.
- Data relationship MUST NOT dikirim ke pihak ketiga mana pun kecuali diminta secara eksplisit
  oleh sebuah fitur yang disetujui, dan integrasi semacam itu tetap tunduk pada Prinsip XI.
- Konten privat MUST NOT muncul pada log, pesan error, maupun telemetri.

**Batasan yang diketahui dan diterima**: tidak ada authentication. Siapa pun yang mengetahui
alamat deployment memperoleh akses baca dan tulis penuh atas seluruh isi aplikasi. Ini keputusan
sadar pemilik produk, dicatat pada bagian Accepted Risks, bukan celah yang belum tergarap.
Pekerjaan berikutnya MUST NOT mengklaim adanya perlindungan yang sebenarnya tidak ada — baik
dalam kode, dokumentasi, maupun antarmuka.

**Alasan**: Privasi produk ini kini bertumpu pada alamat deployment yang tidak dipublikasikan dan
pada tidak adanya jalan keluar data, bukan pada gerbang masuk. Karena itu setiap jalan keluar
data harus ditutup rapat, justru karena pintu depannya terbuka.

### II. Relationship-Centric Architecture

`Relationship` adalah root ownership utama sistem.

- Shared resource (timeline event, memory, letter, open-when letter, trip, place, song, future
  item, important date, couple activity, media) dimiliki tepat oleh satu relationship.
- Ownership MUST dinyatakan eksplisit melalui `relationship_id` di tempat yang membutuhkannya
  untuk authorization atau isolasi query. Ownership MAY diturunkan dari induk (misalnya
  `TripActivity → TripDay → Trip → Relationship`) hanya bila penurunan itu ditegakkan pada
  seluruh jalur query.
- Sebuah relationship memiliki tepat dua anggota. Fitur MUST NOT mengasumsikan jumlah anggota
  yang berubah-ubah, dan MUST NOT memperkenalkan follower, komunitas, atau berbagi
  antar-pasangan.
- Satu deployment melayani tepat satu Relationship. Meski demikian, `relationship_id` MUST tetap
  disimpan pada shared resource: strukturnya adalah yang membuat kontrol akses dapat ditambahkan
  di kemudian hari tanpa memigrasikan setiap tabel.

**Alasan**: Satu root ownership yang tunggal dan eksplisit membuat isolasi dapat diperiksa, dan
menjaga setiap domain tetap dapat di-query tanpa keraguan tentang siapa pemilik apa.

### III. Simplicity Over Overengineering

Bangun apa yang dibutuhkan spesifikasi saat ini — tidak lebih.

- Pilih solusi paling sederhana yang memenuhi spec; perkenalkan abstraksi hanya setelah ada
  pemanggil kedua yang nyata atau ketika spec memang menuntutnya.
- External service, queue, cache, atau infrastruktur baru MUST NOT ditambahkan tanpa kebutuhan
  terdokumentasi yang terikat pada requirement tertentu.
- Background job hanya dipakai bila benar-benar diperlukan (notification, pemrosesan media,
  recap berkala). State turunan seperti status letter atau durasi relationship MUST dihitung,
  bukan disimpan lalu disinkronkan.

**Alasan**: Ini aplikasi berpengguna dua orang yang dirawat tim yang sangat kecil. Setiap bagian
bergerak yang ditambahkan adalah biaya perawatan permanen yang dibayar dari jatah perhatian yang
tetap.

### IV. Type Safety

TypeScript digunakan pada seluruh aplikasi.

- `any` MUST NOT dipakai di tempat yang tipenya masih dapat dinyatakan secara konkret atau
  generik. Penggunaan yang tak terhindarkan MUST dipersempit di batas masuknya dan disertai
  komentar yang menjelaskan alasannya.
- Tipe database mengalir dari `prisma/schema.prisma` melalui client yang di-generate Prisma;
  duplikat bentuk model yang ditulis tangan MUST NOT menyimpang dari schema.
- Input server action dan payload route handler MUST di-parse menjadi nilai bertipe (Zod atau
  setara) di batas server, bukan sekadar di-cast.
- Pemeriksaan tipe `tsc` MUST lolos tanpa error sebelum pekerjaan dianggap selesai.

**Alasan**: Tipe adalah penjaga termurah yang tersedia terhadap kesalahan ownership dan lifecycle
yang justru ingin dicegah oleh Prinsip I, II, dan IX.

### V. Server-Side Business Logic

Aturan bisnis berada di server.

- Setiap server action MUST, secara berurutan: memvalidasi input, menjalankan business logic,
  menyimpan, lalu mengembalikan hanya data yang aman.
- Validasi di sisi client hanya untuk UX; server MUST memvalidasi ulang semuanya.
- Komponen UI MUST dibatasi pada presentasi dan interaksi. Logic yang dipakai bersama MUST
  ditempatkan di `lib/services/`, `lib/validations/`, atau modul server-side setara — bukan di
  dalam komponen.
- Error yang dikembalikan kepada user MUST diklasifikasikan (validation, not found, business
  rule, unexpected) dan MUST NOT memaparkan error database mentah atau stack trace.

**Alasan**: Apa pun yang hanya ditegakkan di client sama saja dengan tidak ditegakkan.

### VI. Mobile-First UX

Aplikasi dirancang untuk ponsel lebih dahulu, baru tablet, baru desktop.

- Setiap fitur MUST dapat digunakan dengan nyaman pada viewport smartphone sebelum dianggap
  selesai.
- Rencana setiap fitur MUST menyatakan perilaku responsifnya; "desktop-only" bukan hasil yang
  dapat diterima untuk fitur utama.
- Permukaan yang padat media (galeri memory, cover trip, timeline) MUST menggunakan pagination
  atau lazy loading dan responsive image agar tetap ringan seiring bertambahnya data.

**Alasan**: Ini aplikasi yang dibuka sambil berbaring, saat bepergian, di sela waktu luang —
hampir selalu dari ponsel.

### VII. Emotional Product Experience

Antarmuka harus terasa personal, intimate, warm, romantic, minimal, editorial, dan
scrapbook-like.

- Estetika dashboard SaaS generik dilarang: tanpa card berlebihan, gradient berlebihan, icon
  berlebihan, warna terlalu terang, ornamen korporat, atau gamification.
- Statistik MUST NOT ditampilkan kecuali membawa makna emosional. Home mengikuti prioritas
  informasi pada PRD: sapaan, relationship counter, next trip, recent memory, important date,
  letter, future item, quick action.
- Empty state MUST ditulis dengan suara produk — manusiawi dan hangat, bukan "No records found."
- Animasi MUST melayani momen emosionalnya (membuka letter, menampilkan memory, transisi halaman
  dan modal) dan MUST NOT memperlambat atau menghalangi user yang sedang ingin bertindak.

**Alasan**: Rasanya adalah produknya. Fitur yang benar namun terasa seperti panel admin sudah
gagal memenuhi requirement-nya.

### VIII. Maintainability

Domain tetap dapat dipisahkan.

- Setiap domain (story, memories, letters, open-when, trips, places, soundtrack, future,
  just-for-us, important dates) memiliki action, service, dan komponennya sendiri.
- Domain yang tidak berkaitan MUST NOT saling mengimpor bagian internalnya. Permukaan agregasi
  seperti Home membaca dari service domain dan tidak memiliki data apa pun.
- Komponen yang dipakai ulang ditempatkan di `components/ui/`; komponen khas domain tetap di
  folder domainnya. Abstraksi bersama diekstrak hanya ketika pemakaian ulangnya nyata, sesuai
  Prinsip III.

**Alasan**: Basis kode ini dimaksudkan untuk dipegang kembali setelah berbulan-bulan
ditinggalkan. Batas domain yang jelas adalah yang membuat hal itu mungkin.

### IX. Data Integrity

Database adalah sumber kebenaran bagi data persisten.

- Perubahan schema MUST melalui Prisma migration. Perubahan database manual yang tidak tercatat
  pada `schema.prisma` dan sebuah migration dilarang.
- Ownership, field wajib, foreign key, dan keunikan MUST dinyatakan sebagai constraint database
  sejauh database mampu menyatakannya, sebagai tambahan atas validasi di server.
- Nilai turunan (durasi relationship, countdown trip, status letter, total budget) MUST dihitung
  dari fakta yang tersimpan (`started_at`, `start_date`, `available_at`/`opened_at`, baris
  expense), tidak pernah disimpan sebagai duplikat yang bisa basi.
- Media yang diunggah MUST divalidasi (MIME type, ekstensi, ukuran, dan dimensi bila relevan)
  dan dicatat dengan ownership relationship yang eksplisit.

**Alasan**: Data ini tak tergantikan bagi kedua penggunanya. Constraint adalah cara integritas
bertahan menghadapi kode masa depan yang belum ditulis siapa pun.

### X. Testing Critical Behavior

Upaya pengujian diarahkan ke tempat yang kegagalannya parah, bukan disebar rata ke seluruh basis
kode.

Automated test WAJIB untuk:

- scheduled letter — tidak dapat dibuka sebelum `available_at`, dan hanya terbuka bagi anggota
  yang dituju sesuai aturan produknya;
- perhitungan trip — countdown, urutan hari, serta total estimated/actual/remaining pada budget;
- durasi relationship dan perhitungan tanggal lainnya, termasuk perilakunya lintas time zone;
- constraint integritas data — batas dua anggota, ownership `relationship_id`, dan aturan yang
  ditegakkan database;
- validasi unggahan media (MIME type, ekstensi, ukuran, dimensi);
- aturan lain yang pelanggarannya akan merusak data persisten atau mengeluarkan data privat dari
  aplikasi.

Cakupan luas untuk komponen presentasional TIDAK diwajibkan. Perubahan pada perilaku yang
tercantum di atas MUST NOT di-merge tanpa test yang menguji perilaku tersebut.

**Alasan**: Proyek kecil tidak mungkin menguji segalanya, maka ia harus menguji hal-hal yang
tidak boleh rusak. Karena tidak ada kontrol akses yang menahan kesalahan, integritas data dan
perhitungan menjadi satu-satunya jaring pengaman yang tersisa.

### XI. Optional External Integrations

External service selalu bersifat opsional.

- Map, Spotify, YouTube, notification, email, push, dan fitur AI MUST bersifat tambahan.
  Fungsionalitas inti MUST tetap bekerja ketika semuanya tidak tersedia atau sedang gagal.
- Secara konkret: Soundtrack tetap bekerja tanpa Spotify maupun YouTube; Places tetap menyimpan
  nama, alamat, dan description tanpa penyedia map; scheduled letter tetap dapat digunakan di
  dalam aplikasi tanpa penyedia notification apa pun.
- Integrasi MUST diisolasi di balik batas modul agar dapat ditambah atau dilepas tanpa mengubah
  domain logic. Penyimpanan media MUST melewati storage abstraction sehingga penyedia lokal dan
  S3-compatible dapat saling menggantikan.

**Alasan**: Arsip privat yang dimaksudkan bertahan lama tidak boleh menggantungkan fungsi
intinya pada uptime, harga, atau keberlangsungan pihak ketiga.

### XII. Long-Term Evolution

Sistem ini adalah scrapbook digital yang hidup dan bertumbuh selama bertahun-tahun.

- Domain baru MUST menempel pada root relationship dan pada struktur PAST / NOW / FUTURE,
  alih-alih membentuk silo fitur yang terputus.
- Pertumbuhan volume data MUST diantisipasi pada permukaan daftar dan galeri (pagination, lazy
  loading, query terindeks), bukan ditambal setelah aplikasi terasa lambat.
- Kapabilitas post-MVP yang disebut dokumen produk (PWA, notification, map, Spotify, YouTube,
  shared calendar, voice dan video note, recap, AI caption, offline support) MUST tetap dapat
  ditambahkan tanpa mengubah fondasi — dan MUST NOT dibangun sebelum spec memintanya.

**Alasan**: Nilai produk ini berlipat seiring tahun-tahun sejarah yang tersimpan. Arsitekturnya
harus melampaui umur fitur mana pun tanpa membayar masa depan itu hari ini.

## Technology & Security Constraints

Stack ditetapkan oleh `docs/architecture.md` dan MUST NOT diganti tanpa amandemen:

- Next.js (App Router) dengan React, TypeScript, Tailwind CSS, dan Framer Motion.
- Server Component sebagai default; Client Component hanya untuk browser API, local state, event
  handler, animasi, formulir interaktif, drag and drop, atau interaksi media.
- Server Action untuk mutation; Route Handler hanya bila HTTP endpoint memang dibutuhkan
  (upload, health, webhook, integrasi eksternal).
- Prisma ORM di atas MySQL, dengan schema pada `prisma/schema.prisma`.
- Media melalui storage abstraction: filesystem lokal saat development, object storage
  S3-compatible saat production.
- Tidak ada authentication provider. Auth.js pada `docs/architecture.md` §3.7 TIDAK dipakai.

Kebutuhan keamanan yang tetap berlaku meski tanpa authentication:

- Deployment MUST mencegah pengindeksan mesin pencari, dan alamatnya MUST NOT dipublikasikan.
- Mutation MUST dilindungi dari cross-site request forgery sesuai mekanisme framework, agar situs
  lain tidak dapat memicu perubahan data dari browser pasangan.
- Rate limiting MUST diterapkan pada endpoint upload dan endpoint lain yang mahal.
- Unggahan MUST divalidasi sebelum disimpan, dan berkas yang diunggah MUST NOT dapat dieksekusi
  oleh server.
- Secret dan credential MUST berasal dari environment variable. `.env` MUST NOT di-commit, dan
  secret MUST NOT muncul di source code, log, maupun pesan error.
- Kejadian yang layak dicatat (error database, error upload, error server tak terduga) MUST
  dicatat tanpa memuat konten privat.
- Query MUST mengambil hanya yang dibutuhkan permukaan yang bersangkutan; memuat seluruh data
  sebuah relationship untuk tampilan sebagian dilarang.

## Accepted Risks

Risiko berikut diketahui, diterima secara sadar oleh pemilik produk, dan MUST NOT diperlakukan
sebagai cacat yang perlu diperbaiki diam-diam:

- **Tidak ada kontrol akses.** Siapa pun yang mengetahui alamat deployment dapat membaca,
  mengubah, dan menghapus seluruh isi aplikasi. Tidak ada login, akun berkredensial, maupun
  session.
- **Identitas tidak dapat diverifikasi.** Penanda "aku siapa" bersifat deklaratif dan disimpan di
  perangkat; ia menentukan atribusi penulis, bukan hak akses, dan MUST NOT diperlakukan sebagai
  kontrol keamanan.
- **Tidak ada jejak audit.** Perubahan tidak dapat dikaitkan secara tepercaya kepada orang
  tertentu.

Menambahkan authentication di kemudian hari adalah jalan keluar dari ketiga risiko ini. Prinsip
II mewajibkan `relationship_id` tetap tersimpan justru agar penambahan itu tidak menuntut
perombakan skema. Perubahan keputusan ini MUST melalui amandemen konstitusi.

## Development Workflow & Quality Gates

Pekerjaan fitur mengikuti alur Spec Kit: `/specify` → `/plan` → `/tasks` → implementasi.

- Setiap `/plan` MUST memuat Constitution Check yang menyebutkan, untuk fitur bersangkutan:
  model ownership relationship-nya (Prinsip II), jalan keluar data apa pun yang ia buka beserta
  cara menutupnya (Prinsip I), perilaku responsifnya (Prinsip VI), dan perilaku mana yang
  membutuhkan test (Prinsip X).
- Setiap penyimpangan dari sebuah prinsip MUST dicatat pada Complexity Tracking di dalam plan,
  beserta alternatif lebih sederhana yang ditolak dan alasannya. Penyimpangan yang tidak
  terdokumentasi dihitung sebagai cacat.
- Sebelum pekerjaan dinyatakan selesai: lint lolos, `tsc` tanpa error, test yang diwajibkan
  Prinsip X lolos, dan setiap perubahan schema memiliki Prisma migration yang sudah ditinjau.
- Fitur dibangun mengikuti urutan pada `docs/architecture.md` §58 kecuali user mengarahkan lain,
  dengan langkah authentication dan authorization dihapus dari urutan tersebut; pekerjaan fondasi
  (relationship, penanda identitas, schema) tetap mendahului domain yang bergantung padanya.
- Seed data SHOULD dipelihara untuk keperluan development dan testing tiap domain.

## Governance

Konstitusi ini mengungguli praktik pengembangan lain pada proyek ini. Bila `docs/prd.md` dan
`docs/architecture.md` bertentangan dalam hal teknis, `docs/architecture.md` yang berlaku; bila
bertentangan dalam hal perilaku produk, `docs/prd.md` yang berlaku.

**Prosedur amandemen**: Amandemen MUST dilakukan dengan menyunting berkas ini, MUST menyatakan
kenaikan versi beserta alasannya pada Sync Impact Report di bagian atas, dan MUST di-commit
sebagai perubahan dokumentasi tersendiri. Prinsip MUST NOT dilemahkan diam-diam demi mengakomodasi
fitur yang sedang dikerjakan.

**Kebijakan versi**: Berlaku semantic versioning.

- MAJOR — sebuah prinsip dihapus atau didefinisikan ulang dengan cara yang tidak kompatibel.
- MINOR — sebuah prinsip atau bagian ditambahkan, atau panduannya diperluas secara substansial.
- PATCH — klarifikasi, perbaikan kalimat, atau penyempurnaan yang tidak mengubah makna.

**Tinjauan kepatuhan**: Setiap plan membawa Constitution Check, dan setiap review memverifikasi
kepatuhan terhadap prinsip-prinsip ini. Kompleksitas MUST dijustifikasi terhadap Prinsip III.
Panduan pengembangan runtime untuk agent berada di `AGENTS.md`; panduan tersebut menjabarkan
konstitusi ini dan MUST NOT bertentangan dengannya.

**Version**: 2.0.0 | **Ratified**: 2026-09-09 | **Last Amended**: 2026-09-09
