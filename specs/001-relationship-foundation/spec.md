# Feature Specification: Relationship Foundation

**Feature Branch**: `001-relationship-foundation`

**Created**: 2026-09-09

**Status**: Draft

**Input**: Deskripsi user: "Fondasi aplikasi yang dibutuhkan sebelum fitur relationship utama dibangun. Pemilik produk memutuskan aplikasi berjalan tanpa authentication sama sekali — tidak ada login, akun berkredensial, maupun session. Identitas penulis ditentukan lewat pemilih 'aku siapa' yang diingat perangkat. Scope: Relationship beserta metadata dan tanggal mulai, dua anggota, penanda identitas, relationship context di server, serta postur privasi tanpa kontrol akses. Fitur tingkat lanjut (Memories, Trips, Letters, Places, Soundtrack, Our Future, Games) berada di luar scope."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Membuka ruang kami tanpa gerbang (Priority: P1)

Seorang pasangan membuka alamat aplikasi dan langsung berada di dalam ruang bersama mereka.
Tidak ada halaman sign in, tidak ada kata sandi, tidak ada apa pun yang harus dilewati. Membuka
aplikasi terasa seperti membuka pintu rumah sendiri yang memang tidak dikunci.

**Why this priority**: Ini adalah keputusan bentuk yang menentukan seluruh fitur berikutnya.
Semua yang lain dibangun di atas asumsi bahwa tidak ada gerbang masuk.

**Independent Test**: Dapat diuji sepenuhnya dengan membuka setiap route aplikasi dari peramban
yang belum pernah dipakai, tanpa kredensial apa pun, dan memastikan seluruhnya termuat.

**Acceptance Scenarios**:

1. **Given** peramban yang belum pernah membuka aplikasi ini, **When** alamat aplikasi dibuka,
   **Then** halaman home termuat tanpa meminta kredensial apa pun.
2. **Given** aplikasi yang sudah berjalan, **When** route mana pun diminta secara langsung,
   **Then** halaman tersebut termuat tanpa redirect ke halaman masuk.
3. **Given** aplikasi yang sudah berjalan, **When** dicari halaman sign in, sign up, atau
   pemulihan kata sandi, **Then** tidak satu pun tersedia dan permintaan ke jalur semacam itu
   diperlakukan seperti halaman yang tidak ada.
4. **Given** aplikasi yang sudah ter-deploy, **When** perayap mesin pencari mengunjunginya,
   **Then** aplikasi menolak diindeks.

---

### User Story 2 - Relationship kami ada dan bercerita (Priority: P1)

Ruang ini memiliki satu Relationship yang menyimpan nama ruang, kapan kisahnya dimulai, sebuah
deskripsi singkat, dan gambar sampul. Dari tanggal mulai itulah durasi hubungan dihitung, dan
seluruh data yang ditambahkan fitur berikutnya menempel pada Relationship ini.

**Why this priority**: Relationship adalah ownership root pada model data. Tidak ada data bersama
yang dapat disimpan sebelum ia ada, dan `started_at` adalah sumber bagi relationship counter yang
muncul di Home dan Our Time.

**Independent Test**: Dapat diuji sepenuhnya dengan menyiapkan satu Relationship berisi dua
anggota dan sebuah tanggal mulai, lalu memastikan aplikasi menampilkan nama, deskripsi, tanggal
mulai, serta kedua nama anggotanya, dan menghitung durasi dari tanggal mulai tersebut.

**Acceptance Scenarios**:

1. **Given** satu Relationship dengan nama, tanggal mulai, dan dua anggota, **When** aplikasi
   dibuka, **Then** Relationship tersebut di-resolve di server sebagai relationship context untuk
   request itu.
2. **Given** relationship context yang sudah di-resolve, **When** ia dipakai sebuah halaman,
   **Then** ia memuat identifier Relationship, nama, tanggal mulai, deskripsi opsional, gambar
   sampul opsional, dan identitas kedua anggotanya.
3. **Given** sebuah tanggal mulai, **When** durasi hubungan ditampilkan, **Then** durasi tersebut
   dihitung dari tanggal itu pada saat ditampilkan, bukan dibaca dari nilai tersimpan.
4. **Given** Relationship yang sudah memiliki dua anggota, **When** ada upaya menambahkan anggota
   ketiga, **Then** upaya tersebut ditolak dan Relationship tetap berisi tepat dua anggota.
5. **Given** sebuah tanggal mulai, **When** tanggal tersebut disimpan, **Then** tanggal itu MUST
   berupa tanggal kalender dan ditolak bila berada di masa depan.
6. **Given** pasangan yang membuka aplikasi dari time zone berbeda, **When** tanggal mulai
   ditampilkan, **Then** tanggal yang tampil sama persis dengan yang tersimpan.
7. **Given** sebuah deployment, **When** isinya diperiksa, **Then** hanya terdapat satu
   Relationship.

---

### User Story 3 - "Aku siapa?" (Priority: P1)

Saat pertama kali membuka aplikasi di sebuah perangkat, seseorang memilih dirinya sendiri dari
dua nama yang ada. Pilihan itu diingat pada perangkat tersebut, sehingga kunjungan berikutnya
langsung masuk tanpa ditanya lagi. Pilihan dapat diganti kapan saja — misalnya ketika ponsel
dipinjam pasangan.

**Why this priority**: Letters, Open When, `created_by`, dan penugasan checklist semuanya perlu
tahu siapa yang menulis. Tanpa penanda ini, sebagian fitur inti pada PRD kehilangan maknanya.

**Independent Test**: Dapat diuji sepenuhnya dengan membuka aplikasi dari peramban bersih,
memilih salah satu anggota, memuat ulang untuk memastikan pilihannya diingat, lalu berganti ke
anggota lain dan memastikan atribusi ikut berubah.

**Acceptance Scenarios**:

1. **Given** perangkat yang belum pernah memilih, **When** aplikasi dibuka, **Then** pengguna
   diminta memilih dirinya di antara kedua anggota Relationship sebelum menulis konten apa pun.
2. **Given** seseorang yang sudah memilih dirinya, **When** ia memuat ulang atau kembali membuka
   aplikasi di perangkat yang sama, **Then** pilihan itu diingat dan ia tidak ditanya lagi.
3. **Given** seseorang yang sudah memilih dirinya, **When** ia mengganti pilihan ke anggota lain,
   **Then** perubahan berlaku seketika dan konten yang dibuat sesudahnya diatribusikan kepada
   anggota yang baru.
4. **Given** penanda identitas pada perangkat, **When** konten dibuat, **Then** penulisnya dicatat
   pada server berdasarkan anggota yang sedang dipilih.
5. **Given** penanda identitas yang hilang, rusak, atau menunjuk anggota yang tidak ada, **When**
   aplikasi dibuka, **Then** pengguna diminta memilih ulang alih-alih menemui error.
6. **Given** penanda identitas, **When** ia diperiksa perannya, **Then** ia MUST NOT menentukan
   data apa pun yang boleh dilihat atau diubah — ia hanya menentukan atribusi penulis.
7. **Given** dua perangkat berbeda, **When** masing-masing memilih anggota yang berbeda, **Then**
   kedua pilihan berdiri sendiri dan tidak saling menimpa.

---

### User Story 4 - Menjadi diri kami di ruang ini (Priority: P2)

Kedua anggota memiliki profil sederhana — nama panggilan dan, opsional, sebuah foto — sehingga
sapaan di Home, atribusi penulis, dan pemilih "aku siapa" menyebut nama orang sungguhan, bukan
label kosong.

**Why this priority**: Nama dibutuhkan hampir di setiap layar yang menyebut orang, tetapi
mengubahnya bukan hal yang mendesak dan dapat menyusul.

**Independent Test**: Dapat diuji sepenuhnya dengan mengubah nama panggilan salah satu anggota
lalu memastikan nama baru muncul pada sapaan, atribusi, dan pemilih identitas.

**Acceptance Scenarios**:

1. **Given** kedua anggota, **When** profil mereka dibuka, **Then** terlihat nama panggilan dan
   foto masing-masing bila ada.
2. **Given** seorang anggota, **When** nama panggilannya diperbarui, **Then** nama baru muncul di
   seluruh tempat ia disebut, termasuk pemilih "aku siapa".
3. **Given** seorang anggota tanpa foto, **When** ia ditampilkan, **Then** aplikasi tetap tampil
   benar tanpa ruang kosong yang rusak.
4. **Given** metadata Relationship, **When** nama, deskripsi, tanggal mulai, atau gambar sampulnya
   diperbarui, **Then** perubahan tersimpan dan langsung terlihat.

---

### Edge Cases

- **Aplikasi dibuka sebelum Relationship disiapkan.** Ditampilkan satu layar "ruang belum siap"
  yang hangat, tanpa error mentah, dan tanpa memaparkan detail teknis (FR-024).
- **Relationship baru memiliki satu anggota.** Ruang tetap dapat dipakai; pemilih "aku siapa"
  menampilkan satu nama, dan bagian yang menyebut "anggota lain" menampilkan bahwa ruang ini
  masih menunggu pasangan kedua.
- **Penanda identitas hilang karena riwayat peramban dibersihkan.** Pengguna diminta memilih
  ulang; tidak ada data yang hilang (FR-014).
- **Ponsel dipinjam pasangan.** Pilihan identitas dapat diganti kapan saja tanpa membuang data
  apa pun (FR-013).
- **Alamat aplikasi tersebar ke orang lain.** Orang tersebut memperoleh akses penuh. Ini risiko
  yang diterima dan dicatat pada bagian Risks, bukan cacat yang perlu ditambal di dalam produk.
- **Perayap mesin pencari menemukan deployment.** Aplikasi menolak diindeks (FR-004).
- **Situs lain mencoba memicu perubahan data dari peramban pasangan.** Mutation ditolak karena
  proteksi cross-site request forgery (FR-026).
- **Jam dan time zone memengaruhi tanggal mulai.** Tanggal mulai adalah tanggal kalender dan tidak
  bergeser bagi pembaca di time zone berbeda (FR-009).
- **Seseorang membuka jalur sign in, sign up, atau reset password.** Jalur semacam itu tidak ada;
  permintaannya diperlakukan seperti halaman yang tidak ada (FR-003).

## Requirements *(mandatory)*

### Functional Requirements

#### Akses Aplikasi

- **FR-001**: Aplikasi MUST dapat diakses tanpa authentication apa pun. Tidak ada login, akun
  berkredensial, maupun session.
- **FR-002**: Aplikasi MUST NOT meminta kredensial, kata sandi, kode, atau verifikasi apa pun
  sebelum menampilkan isinya.
- **FR-003**: Aplikasi MUST NOT memaparkan halaman atau endpoint sign in, sign up, maupun
  pemulihan kata sandi. Permintaan ke jalur semacam itu MUST diperlakukan seperti halaman yang
  tidak ada.
- **FR-004**: Deployment MUST mencegah pengindeksan mesin pencari.
- **FR-005**: Antarmuka dan dokumentasi MUST NOT menyatakan atau menyiratkan adanya perlindungan
  akses yang sebenarnya tidak ada.

#### Relationship

- **FR-006**: Sistem MUST memiliki satu Relationship per deployment, yang menjadi ownership root
  bagi seluruh data bersama yang ditambahkan fitur berikutnya.
- **FR-007**: Sebuah Relationship MUST memiliki tepat dua anggota, dan sistem MUST menolak setiap
  upaya menambahkan anggota ketiga.
- **FR-008**: Sebuah Relationship MUST menyimpan tanggal mulai (`started_at`) yang menyatakan
  kapan kisah pasangan itu dimulai.
- **FR-009**: `started_at` MUST berupa tanggal kalender, MUST NOT berada di masa depan, dan MUST
  ditampilkan sama persis terlepas dari time zone pembacanya.
- **FR-010**: Sebuah Relationship MUST membawa metadata dasar: nama untuk ruang bersama,
  deskripsi opsional, dan gambar sampul opsional.
- **FR-011**: Durasi hubungan MUST dihitung dari `started_at` pada saat ditampilkan, dan MUST NOT
  disimpan sebagai nilai statis.
- **FR-012**: Anggota MUST dapat memperbarui nama, deskripsi, tanggal mulai, dan gambar sampul
  Relationship; keduanya memiliki hak yang setara atas metadata tersebut.

#### Penanda Identitas

- **FR-013**: Aplikasi MUST menyediakan cara bagi pemakainya untuk menyatakan dirinya sebagai
  salah satu dari dua anggota Relationship, dan MUST memungkinkan pilihan itu diganti kapan saja
  tanpa kehilangan data.
- **FR-014**: Pilihan identitas MUST diingat pada perangkat yang bersangkutan sehingga tidak
  ditanyakan berulang, dan MUST menanyakan ulang secara wajar ketika penandanya hilang, rusak,
  atau menunjuk anggota yang tidak ada.
- **FR-015**: Pilihan identitas MUST bersifat per perangkat dan MUST NOT memengaruhi perangkat
  lain.
- **FR-016**: Ketika konten dibuat, penulisnya MUST dicatat di server berdasarkan anggota yang
  sedang dipilih pada perangkat tersebut.
- **FR-017**: Penanda identitas MUST NOT menentukan data apa pun yang boleh dilihat atau diubah.
  Ia menentukan atribusi, bukan hak akses, dan MUST NOT diperlakukan sebagai kontrol keamanan.
- **FR-018**: Aplikasi MUST tetap berfungsi ketika belum ada identitas yang dipilih, dengan
  meminta pemilihan sebelum konten yang membutuhkan atribusi dibuat.

#### Anggota

- **FR-019**: Setiap anggota MUST memiliki nama panggilan yang ditampilkan, dan MAY memiliki
  sebuah foto; aplikasi MUST tetap berperilaku benar ketika foto tidak diatur.
- **FR-020**: Nama panggilan dan foto anggota MUST dapat diperbarui dari dalam aplikasi.
- **FR-021**: Anggota MUST NOT memerlukan alamat email maupun kredensial apa pun.

#### Relationship Context di Server

- **FR-022**: Untuk setiap request, sistem MUST me-resolve Relationship beserta kedua anggotanya
  di server, dan MUST menyediakannya bagi seluruh logic server-side yang menangani request itu.
- **FR-023**: Sistem MUST menyediakan satu mekanisme server-side yang dapat dipakai ulang untuk
  memperoleh relationship context, sehingga setiap fitur berikutnya memperolehnya dengan cara
  yang sama.
- **FR-024**: Ketika Relationship belum disiapkan, aplikasi MUST menampilkan satu layar "ruang
  belum siap" yang ditulis dengan suara produk, tanpa error mentah dan tanpa detail teknis.
- **FR-025**: Ketika sebuah resource milik relationship dibuat, `relationship_id`-nya MUST diambil
  dari relationship context di server, dan MUST NOT diambil dari input client.

#### Penyiapan dan Integritas Data

- **FR-026**: Mutation MUST dilindungi dari cross-site request forgery, agar situs lain tidak
  dapat memicu perubahan data dari peramban pasangan.
- **FR-027**: Relationship beserta kedua anggotanya MUST dapat disiapkan melalui satu langkah
  yang dapat diulang dan dijalankan pemilik aplikasi.
- **FR-028**: Proses penyiapan MUST menegakkan aturan yang sama dengan aplikasi — ia MUST NOT
  dapat menghasilkan lebih dari satu Relationship, lebih dari dua anggota (FR-007), atau
  `started_at` di masa depan (FR-009).
- **FR-029**: Batas dua anggota dan kepemilikan `relationship_id` MUST ditegakkan melalui
  constraint database, bukan hanya melalui pemeriksaan di kode aplikasi.
- **FR-030**: Skema data MUST menyimpan `relationship_id` pada shared resource meskipun hanya ada
  satu Relationship, agar kontrol akses dapat ditambahkan di kemudian hari tanpa memigrasikan
  setiap tabel.

#### Error Handling dan Penyajian

- **FR-031**: Sistem MUST membedakan kegagalan validasi, not found, pelanggaran business rule, dan
  error tak terduga, serta MUST menyajikan masing-masing dalam bahasa yang dapat dipahami
  pasangan.
- **FR-032**: Response error MUST NOT memaparkan error database, stack trace, atau detail
  konfigurasi.
- **FR-033**: Log MUST NOT memuat konten privat relationship.
- **FR-034**: Setiap layar pada fitur ini — pemilih identitas, profil, pengaturan Relationship,
  dan layar "ruang belum siap" — MUST nyaman digunakan pada ukuran layar smartphone.
- **FR-035**: Kalimat pada setiap layar fitur ini MUST mengikuti suara produk yang hangat dan
  personal, bukan gaya administratif atau korporat.

### Key Entities

- **Relationship**: Ruang bersama milik dua orang, sekaligus ownership root bagi seluruh data
  bersama yang ditambahkan fitur-fitur berikutnya. Menyimpan nama, deskripsi opsional, tanggal
  mulai, gambar sampul opsional, dan timestamp. Memiliki tepat dua anggota, dan hanya ada satu
  per deployment.
- **Member**: Satu dari dua orang dalam Relationship. Menyimpan nama panggilan, foto opsional,
  dan timestamp. Tidak memiliki email maupun kredensial. Menjadi acuan atribusi penulis bagi
  fitur berikutnya.
- **Penanda Identitas Perangkat**: Catatan di sisi perangkat mengenai Member mana yang sedang
  dipilih. Bukan entity yang tersimpan di server, tidak memberi hak akses, dan hanya menentukan
  atribusi penulis.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Seorang pasangan berpindah dari membuka alamat aplikasi ke berada di dalam ruang
  bersama tanpa memasukkan apa pun.
- **SC-002**: Pada perangkat yang sudah pernah dipakai, aplikasi terbuka langsung ke isinya tanpa
  menanyakan identitas lagi.
- **SC-003**: 100% konten yang dibuat teratribusi kepada anggota yang sedang dipilih pada
  perangkat tersebut — dibuktikan automated test yang membuat konten sebagai masing-masing
  anggota lalu memeriksa penulis yang tercatat.
- **SC-004**: Durasi hubungan yang ditampilkan sama dengan selisih antara `started_at` dan hari
  ini, dan berubah sendiri seiring hari berganti tanpa perubahan data.
- **SC-005**: Tanggal mulai yang ditampilkan sama dengan yang tersimpan, bagi pembaca di time
  zone mana pun.
- **SC-006**: Tidak ada jalur sign in, sign up, atau reset password yang dapat ditemukan pada
  aplikasi.
- **SC-007**: Deployment tidak muncul pada hasil mesin pencari.
- **SC-008**: Seorang pasangan dapat mengganti identitas, memperbarui profilnya, dan memperbarui
  metadata Relationship pada layar seukuran smartphone tanpa scroll horizontal maupun zoom.
- **SC-009**: Setiap kegagalan yang terlihat pengguna menghasilkan pesan yang terbaca; tidak ada
  error database mentah atau stack trace yang sampai ke pasangan.
- **SC-010**: Upaya menambahkan anggota ketiga atau Relationship kedua ditolak, termasuk ketika
  dicoba langsung pada database melalui constraint yang berlaku.

## Assumptions

- **Tanpa authentication (keputusan pemilik produk)**: `prd.md` §17 mensyaratkan Authentication
  dan `architecture.md` §3.7 menetapkan Auth.js, namun pemilik produk memutuskan aplikasi berjalan
  tanpa gerbang masuk sama sekali. Konstitusi diamandemen ke v2.0.0 untuk mencerminkan keputusan
  ini, dan konstitusi yang berlaku bila terjadi pertentangan. Bagian PRD dan architecture yang
  membahas authentication, authorization, dan protected route menjadi usang.
- **Identitas deklaratif**: Pemilih "aku siapa" dipilih sebagai ganti login. Ia tidak memverifikasi
  apa pun dan tidak memberi hak akses; keberadaannya semata-mata agar Letters, Open When,
  `created_by`, dan penugasan checklist tetap memiliki makna sesuai PRD.
- **Satu deployment satu pasangan**: Aplikasi tidak melayani banyak pasangan. Isolasi
  antar-relationship tidak lagi menjadi persoalan runtime, tetapi `relationship_id` tetap
  disimpan agar penambahan authentication di kemudian hari tidak menuntut perombakan skema.
- **Penyiapan awal**: Relationship dan kedua anggotanya disiapkan pemilik aplikasi melalui satu
  langkah yang dapat diulang, bukan melalui pendaftaran mandiri.
- **Metadata relationship**: Terbatas pada atribut yang disebut `architecture.md` §7.2 — nama,
  tanggal mulai, deskripsi, dan cover media. Tidak ada metadata tambahan yang direka di sini.
- **Field anggota**: Hanya nama panggilan dan foto opsional. Tanggal lahir dan tanggal jadian
  termasuk fitur Important Dates dan sengaja bukan bagian dari profil anggota.
- **Foto anggota dan gambar sampul**: Keduanya merujuk pada kapabilitas media bersama. Fitur ini
  mengasumsikan gambar dapat disimpan dan disajikan; pipeline media lengkap (validasi, thumbnail,
  optimisasi) dispesifikasikan bersama fitur yang membutuhkannya.
- **Belum ada konten bersama**: Fitur ini menetapkan Relationship, anggota, penanda identitas, dan
  relationship context, tetapi tidak mendefinisikan Memories, Trips, Letters, Places, Soundtrack,
  Our Future, Important Dates, maupun Games.

## Risks

Risiko berikut adalah konsekuensi langsung dari keputusan tanpa authentication. Semuanya
diketahui dan diterima; tercatat pada bagian Accepted Risks di konstitusi.

- **Siapa pun yang tahu alamatnya memiliki akses penuh.** Tidak ada kontrol akses baca maupun
  tulis. Perlindungan satu-satunya adalah alamat deployment yang tidak dipublikasikan dan tidak
  terindeks.
- **Kehilangan atau kerusakan data tidak dapat dicegah oleh izin akses.** Karena itu constraint
  database, validasi server, dan cadangan berkala menjadi jaring pengaman yang tersisa.
- **Atribusi tidak dapat dipercaya.** Penulis yang tercatat mencerminkan penanda pada perangkat,
  bukan identitas yang terverifikasi. Fitur berikutnya MUST NOT membangun aturan yang menuntut
  atribusi tepercaya.
- **Menambahkan authentication di kemudian hari adalah jalan keluarnya.** FR-030 menjaga agar
  penambahan itu tidak menuntut perombakan skema.
