# Feature Specification: UI Foundation

**Feature Branch**: `002-ui-foundation`

**Created**: 2026-09-10

**Status**: Draft

**Input**: Deskripsi user: `@docs/ui-sections.md` — dokumen yang mendefinisikan struktur UI, karakter visual, hierarki konten, dan pola interaksi untuk seluruh bagian Our Little Universe.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Satu bahasa visual di seluruh ruang (Priority: P1)

Ke mana pun pasangan berpindah di dalam aplikasi, semuanya terasa berasal dari satu tempat yang
sama: jenis huruf yang sama, jarak yang sama, sudut membulat yang sama, tombol dan kolom isian
yang berperilaku sama. Tiap bagian boleh punya watak sendiri, tetapi tidak ada satu pun yang
terasa seperti tempelan dari aplikasi lain.

**Why this priority**: Tanpa fondasi ini, setiap fitur berikutnya akan menciptakan tombol,
kartu, dan jarak versinya sendiri. Semakin lama dibiarkan, semakin mahal menyatukannya kembali.

**Independent Test**: Dapat diuji sepenuhnya dengan menampilkan seluruh komponen dasar pada satu
halaman peraga, lalu memastikan tiap komponen hanya memiliki satu definisi dan seluruh nilai
visualnya berasal dari token yang sama.

**Acceptance Scenarios**:

1. **Given** kumpulan komponen dasar, **When** halaman peraga dibuka, **Then** terlihat tombol,
   kolom isian, kartu, modal, drawer, dan toast beserta seluruh variasi keadaannya.
2. **Given** dua layar berbeda dari domain berbeda, **When** keduanya dibandingkan, **Then**
   jenis huruf, skala ukuran, jarak, dan sudut membulatnya identik.
3. **Given** sebuah nilai visual seperti jarak atau warna, **When** ia dipakai sebuah komponen,
   **Then** nilai itu berasal dari token bersama, bukan angka yang ditulis lepas di komponen.
4. **Given** sebuah komponen dasar, **When** ia dibutuhkan dua bagian berbeda, **Then** keduanya
   memakai komponen yang sama, bukan salinan.

---

### User Story 2 - Berpindah tanpa tersesat (Priority: P1)

Pasangan dapat mencapai bagian mana pun dari aplikasi dengan cepat. Di ponsel, tujuan yang paling
sering dibuka berada dalam jangkauan ibu jari, sisanya berkumpul rapi di satu tempat. Di layar
besar, daftar tujuan tampak ringan di sisi kiri — bukan seperti panel admin.

**Why this priority**: Kerangka navigasi adalah wadah yang menampung seluruh fitur berikutnya.
Ia harus ada sebelum ada yang perlu diletakkan di dalamnya.

**Independent Test**: Dapat diuji sepenuhnya dengan menjelajahi seluruh tujuan dari ponsel dan
dari layar besar, memastikan tiap tujuan tercapai, dan posisi saat ini selalu terlihat.

**Acceptance Scenarios**:

1. **Given** layar seukuran ponsel, **When** aplikasi dibuka, **Then** navigasi utama berada di
   bagian bawah layar dan berisi tujuan yang paling sering dibuka beserta satu jalan menuju
   sisanya.
2. **Given** layar besar, **When** aplikasi dibuka, **Then** daftar tujuan tampil di sisi kiri
   dengan bobot visual ringan.
3. **Given** pasangan berada di suatu bagian, **When** ia melihat navigasi, **Then** posisi saat
   ini ditandai dengan jelas, dan penandanya tidak hanya berupa warna.
4. **Given** navigasi apa pun, **When** dijelajahi hanya dengan papan ketik, **Then** setiap
   tujuan dapat dicapai dan fokusnya selalu terlihat.
5. **Given** pengguna membuka bagian yang lebih jarang dipakai dari ponsel, **When** ia memilih
   jalan menuju sisanya, **Then** seluruh tujuan yang tersisa terdaftar di sana.

---

### User Story 3 - Setiap halaman tahu cara memperkenalkan diri (Priority: P1)

Setiap bagian dibuka dengan judul dan satu kalimat yang menjelaskan tempat itu dengan hangat,
bukan dengan label teknis. Ketika belum ada isinya, halaman tetap terasa mengundang, bukan
kosong dan dingin.

**Why this priority**: Pola halaman yang dipakai berulang menentukan apakah aplikasi terasa
sebagai satu produk atau sekumpulan halaman CRUD.

**Independent Test**: Dapat diuji sepenuhnya dengan menampilkan pola page header dan empty state
untuk beberapa bagian contoh, lalu memastikan tidak ada satu pun kalimat yang berbunyi seperti
pesan sistem.

**Acceptance Scenarios**:

1. **Given** sebuah bagian, **When** halamannya dibuka, **Then** tampil judul, satu kalimat
   pengantar yang bernada personal, dan aksi utama bila bagian itu memilikinya.
2. **Given** sebuah bagian yang belum memiliki isi, **When** halamannya dibuka, **Then** tampil
   empty state yang bernada personal beserta satu aksi yang relevan.
3. **Given** empty state mana pun, **When** kalimatnya dibaca, **Then** tidak ada frasa seperti
   "No data found" atau padanannya.
4. **Given** aksi yang menghapus sesuatu, **When** aksi itu dipicu, **Then** muncul konfirmasi
   yang menyebutkan secara jelas apa saja yang akan ikut terhapus.
5. **Given** sebuah aksi berhasil, **When** hasilnya diberitahukan, **Then** pesannya singkat dan
   ramah, bukan laporan teknis.

---

### User Story 4 - Halaman tidak pernah membiarkan menunggu dalam kekosongan (Priority: P2)

Ketika data sedang diambil, pasangan melihat bentuk halaman yang sedang disiapkan, bukan layar
kosong. Ketika sesuatu gagal, yang muncul adalah kalimat yang bisa dimengerti beserta jalan
keluarnya.

**Why this priority**: Menyempurnakan pengalaman, tetapi aplikasi tetap berfungsi tanpanya.
Karena itu satu tingkat di bawah pola halaman inti.

**Independent Test**: Dapat diuji sepenuhnya dengan memperlambat jaringan dan memaksa kegagalan,
lalu memastikan setiap bagian menampilkan keadaan yang sesuai.

**Acceptance Scenarios**:

1. **Given** bagian yang memuat data, **When** datanya belum siap, **Then** tampil kerangka
   halaman atau penanda muat, bukan layar kosong.
2. **Given** pengambilan data yang gagal, **When** kegagalan itu ditampilkan, **Then** pesannya
   dapat dibaca pasangan dan menyertakan cara mencoba lagi.
3. **Given** kegagalan apa pun, **When** pesannya dibaca, **Then** tidak ada nama teknis, kode
   internal, maupun jejak kesalahan di dalamnya.
4. **Given** sebuah bagian, **When** keadaannya ditelusuri satu per satu, **Then** ia menangani
   memuat, terisi, kosong, gagal, berhasil, menyunting, menyimpan, menghapus, dan nonaktif.

---

### User Story 5 - Gerak yang menambah rasa, bukan mengganggu (Priority: P2)

Animasi muncul di saat yang memang bermakna — surat yang terbuka, kartu yang muncul, perpindahan
halaman. Bagi yang memilih mengurangi gerak di perangkatnya, animasi berhenti tanpa merusak apa
pun.

**Why this priority**: Bagian dari janji emosional produk, tetapi tidak boleh mendahului
kegunaan.

**Independent Test**: Dapat diuji sepenuhnya dengan menyalakan preferensi kurangi-gerak pada
sistem, lalu menelusuri seluruh interaksi beranimasi dan memastikan semuanya tetap berfungsi.

**Acceptance Scenarios**:

1. **Given** interaksi yang beranimasi, **When** ia dijalankan, **Then** animasinya singkat dan
   tidak menunda pasangan yang ingin bertindak.
2. **Given** preferensi kurangi-gerak menyala di perangkat, **When** interaksi beranimasi
   dijalankan, **Then** gerakannya ditiadakan atau disederhanakan, dan seluruh fungsinya tetap
   utuh.
3. **Given** halaman mana pun dalam keadaan diam, **When** diamati, **Then** tidak ada animasi
   yang berjalan terus-menerus tanpa dipicu.

---

### User Story 6 - Dapat dipakai semua orang, di layar apa pun (Priority: P2)

Aplikasi nyaman dipakai dengan satu tangan di ponsel, tetap masuk akal di tablet, dan lapang di
layar besar. Ia juga dapat dijalankan sepenuhnya dengan papan ketik, dan terbaca oleh pembaca
layar.

**Why this priority**: Prinsip VI konstitusi mewajibkan mobile-first pada setiap fitur, dan
aksesibilitas jauh lebih murah dibangun sekarang daripada ditambal belakangan.

**Independent Test**: Dapat diuji sepenuhnya dengan menelusuri seluruh layar pada lebar 320 px,
lalu mengulanginya hanya dengan papan ketik.

**Acceptance Scenarios**:

1. **Given** lebar layar 320 px, **When** layar mana pun dibuka, **Then** tidak ada scroll
   mendatar dan seluruh kendali dapat disentuh dengan nyaman.
2. **Given** layar tablet dan layar besar, **When** layar yang sama dibuka, **Then** tata
   letaknya menyesuaikan tanpa menyisakan ruang kosong yang janggal atau baris teks yang terlalu
   panjang untuk dibaca.
3. **Given** layar mana pun, **When** dijelajahi hanya dengan papan ketik, **Then** setiap
   kendali dapat dicapai, urutannya masuk akal, dan fokusnya selalu terlihat.
4. **Given** kendali interaktif mana pun, **When** maknanya diperiksa, **Then** maknanya tidak
   bergantung pada warna semata.
5. **Given** kolom isian yang gagal divalidasi, **When** kegagalan itu ditampilkan, **Then**
   pesannya terkait dengan kolomnya dan terbaca oleh pembaca layar.
6. **Given** modal atau drawer yang terbuka, **When** dijelajahi dengan papan ketik, **Then**
   fokus tertahan di dalamnya dan kembali ke tempat semula setelah ditutup.

---

### User Story 7 - Setiap bagian punya wataknya sendiri (Priority: P3)

Memories terasa seperti album foto, Letters seperti surat, Trips seperti jurnal perjalanan, Our
Time seperti satu kalimat yang tenang. Semuanya masih satu keluarga, tetapi tidak seragam seperti
deretan halaman yang sama.

**Why this priority**: Inilah yang membedakan produk ini dari kumpulan halaman CRUD, tetapi ia
baru bisa dikerjakan setelah bahasa visual bersamanya ada.

**Independent Test**: Dapat diuji sepenuhnya dengan menempatkan watak visual tiap bagian pada
satu halaman rujukan, lalu memastikan tidak ada dua bagian yang tertukar wataknya.

**Acceptance Scenarios**:

1. **Given** daftar watak visual tiap bagian, **When** sebuah bagian dikerjakan, **Then**
   rancangannya mengikuti watak yang tercatat untuk bagian itu.
2. **Given** layar mana pun, **When** diperiksa terhadap daftar pola terlarang, **Then** ia tidak
   memakai satu pun di antaranya tanpa alasan fungsional yang tercatat.

---

### Edge Cases

- **Nama atau judul yang sangat panjang.** Dipotong dengan rapi atau dibungkus, tidak merusak tata
  letak maupun mendorong kendali keluar layar.
- **Bagian tanpa gambar sama sekali.** Kartu dan galeri tetap tampil utuh tanpa lubang kosong.
- **Jaringan sangat lambat.** Kerangka halaman muncul lebih dulu; tidak ada layar kosong tanpa
  penjelasan (FR-021).
- **Preferensi kurangi-gerak menyala.** Seluruh animasi ditiadakan atau disederhanakan, dan tidak
  satu pun fungsi hilang karenanya (FR-030).
- **Layar 320 px.** Seluruh layar tetap terpakai tanpa scroll mendatar (FR-033).
- **Hanya papan ketik, tanpa tetikus.** Seluruh kendali tercapai, termasuk di dalam modal dan
  drawer (FR-036, FR-039).
- **Teks diperbesar pengaturan sistem.** Tata letak tetap terbaca dan tidak saling menimpa.
- **Isi yang jauh lebih banyak dari perkiraan.** Daftar dan galeri tetap ringan; tidak ada
  halaman yang memuat seluruh isi sebuah domain sekaligus.
- **Aksi gagal setelah tombol ditekan.** Tombol kembali ke keadaan semula dan alasannya
  disampaikan; pasangan tidak dibiarkan menebak apakah aksinya jadi atau tidak.

## Requirements *(mandatory)*

### Functional Requirements

#### Sistem Desain

- **FR-001**: Sistem MUST memiliki satu kumpulan token bersama untuk tipografi, skala jarak,
  sudut membulat, warna, dan bayangan.
- **FR-002**: Nilai visual pada komponen MUST berasal dari token tersebut; angka lepas yang
  ditulis langsung di komponen MUST NOT dipakai untuk nilai yang sudah punya token.
- **FR-003**: Sistem MUST menyediakan komponen dasar yang dipakai ulang seluruh bagian: tombol,
  kolom isian, area teks, pilihan, kartu, modal, drawer, toast, lencana, dan penanda muat.
- **FR-004**: Setiap komponen dasar MUST memiliki satu definisi. Bagian yang membutuhkannya MUST
  memakai definisi itu, bukan salinannya.
- **FR-005**: Sistem MUST menyediakan halaman peraga berisi seluruh komponen dasar beserta
  variasi keadaannya, agar konsistensi dapat diperiksa tanpa menelusuri aplikasi.
- **FR-006**: Kartu MUST bersifat lembut, membulat sedang, dan berfokus pada isi. Kartu MUST NOT
  menyerupai kartu metrik aplikasi bisnis kecuali memang menampilkan angka.

#### Kerangka Aplikasi dan Navigasi

- **FR-007**: Pada layar seukuran ponsel, navigasi utama MUST berada di bagian bawah layar.
- **FR-008**: Navigasi ponsel MUST memuat tujuan yang paling sering dibuka beserta satu jalan
  menuju seluruh tujuan lainnya.
- **FR-009**: Pada layar besar, daftar tujuan MUST tampil di sisi kiri dengan bobot visual ringan,
  dan MUST NOT menyerupai panel navigasi aplikasi administratif.
- **FR-010**: Posisi saat ini MUST ditandai jelas pada navigasi, dan penandanya MUST NOT
  bergantung pada warna semata.
- **FR-011**: Seluruh tujuan MUST dapat dicapai hanya dengan papan ketik.
- **FR-012**: [NEEDS CLARIFICATION: Bagaimana navigasi pada dokumen ini diselaraskan dengan
  keputusan bahwa `/` adalah satu landing page panjang berisi semua bagian?]

#### Pola Halaman Bersama

- **FR-013**: Setiap bagian MUST memiliki page header berisi judul, satu kalimat pengantar
  bernada personal, dan aksi utama bila ada.
- **FR-014**: Setiap bagian yang menampilkan kumpulan isi MUST memiliki empty state bernada
  personal beserta satu aksi yang relevan.
- **FR-015**: Empty state MUST NOT memakai kalimat bergaya sistem seperti "No data found".
- **FR-016**: Modal MUST dipakai untuk formulir pendek dan konfirmasi; drawer untuk penyuntingan
  kontekstual; halaman penuh untuk pembuatan isi yang panjang.
- **FR-017**: Aksi yang berhasil MUST diberitahukan lewat toast dengan kalimat singkat dan ramah.
- **FR-018**: Aksi yang menghapus sesuatu MUST meminta konfirmasi lebih dulu, dan konfirmasinya
  MUST menyebutkan apa saja yang akan ikut terhapus.
- **FR-019**: Formulir MUST hanya menampilkan kolom yang memang diisi pasangan.
- **FR-020**: Formulir MUST NOT menampilkan nilai internal seperti pengenal relationship,
  penanda pembuat, penanda waktu perubahan, pengenal basis data, maupun path penyimpanan.
  Seluruh nilai itu ditentukan di server.

#### Keadaan Antarmuka

- **FR-021**: Setiap bagian yang mengambil data MUST menampilkan kerangka halaman atau penanda
  muat selama data belum siap, dan MUST NOT menampilkan layar kosong tanpa penjelasan.
- **FR-022**: Setiap bagian penting MUST menangani keadaan: memuat, terisi, kosong, gagal,
  berhasil, menyunting, menyimpan, menghapus, dan nonaktif.
- **FR-023**: Pesan kegagalan MUST dapat dibaca pasangan dan MUST menyertakan jalan keluar bila
  ada.
- **FR-024**: Pesan kegagalan MUST NOT memuat nama teknis, kode internal, maupun jejak kesalahan.
- **FR-025**: Ketika sebuah aksi gagal, kendali yang memicunya MUST kembali ke keadaan semula dan
  alasannya MUST disampaikan.

#### Watak Bagian

- **FR-026**: Setiap bagian MUST memiliki watak visual tercatat, dan rancangannya MUST mengikuti
  watak tersebut: Home sebagai gambaran hangat, Our Story sebagai lini masa editorial, Memories
  sebagai album foto, Letters sebagai surat pribadi, Open When sebagai amplop interaktif, Trips
  sebagai jurnal perjalanan, Itinerary sebagai lini masa, Budget sebagai catatan keuangan
  sederhana, Checklist sebagai daftar tugas ringkas, Places sebagai koleksi tempat, Soundtrack
  sebagai jurnal musik, Future sebagai papan impian, Just For Us sebagai interaksi bermain, Our
  Time sebagai tampilan tenang, Important Dates sebagai kalender hubungan, dan Settings sebagai
  antarmuka utilitas.
- **FR-027**: Meski wataknya berbeda, seluruh bagian MUST memakai sistem desain yang sama
  (FR-001 sampai FR-006).
- **FR-028**: Antarmuka MUST NOT memakai pola berikut tanpa alasan fungsional yang tercatat:
  dasbor bergaya aplikasi bisnis, tabel data padat, deretan kartu angka, grafik berlebihan,
  glassmorphism berlebihan, gradient berlebihan, warna neon berlebihan, tata letak generik,
  navigasi berlapis-lapis, umpan publik bergaya media sosial, sistem profil publik, dan
  gamifikasi yang membuat hubungan terasa seperti persaingan.
- **FR-029**: Isi bermuatan emosi MUST mendapat penekanan visual lebih besar daripada data mentah.

#### Gerak

- **FR-030**: Seluruh animasi MUST menghormati preferensi kurangi-gerak pada perangkat, dan
  seluruh fungsi MUST tetap utuh ketika preferensi itu menyala.
- **FR-031**: Animasi MUST singkat dan MUST NOT menunda pasangan yang sedang ingin bertindak.
- **FR-032**: Antarmuka MUST NOT memiliki animasi yang berjalan terus-menerus tanpa dipicu.

#### Responsif

- **FR-033**: Seluruh layar MUST dapat dipakai pada lebar 320 px tanpa scroll mendatar.
- **FR-034**: Tata letak MUST menyesuaikan untuk tablet dan layar besar tanpa menyisakan ruang
  kosong yang janggal atau baris teks yang terlalu panjang untuk dibaca nyaman.
- **FR-035**: Kendali sentuh MUST cukup besar untuk disentuh dengan nyaman di ponsel.

#### Aksesibilitas

- **FR-036**: Seluruh kendali interaktif MUST dapat dicapai dan dijalankan hanya dengan papan
  ketik, dengan urutan yang masuk akal.
- **FR-037**: Fokus papan ketik MUST selalu terlihat.
- **FR-038**: Makna sebuah kendali MUST NOT bergantung pada warna semata.
- **FR-039**: Modal dan drawer MUST menahan fokus selama terbuka dan MUST mengembalikannya ke
  tempat semula setelah ditutup.
- **FR-040**: Kegagalan validasi MUST terkait dengan kolomnya dan MUST terbaca oleh pembaca layar.
- **FR-041**: Antarmuka MUST memakai penanda semantik dan label yang dapat dibaca pembaca layar.
- **FR-042**: Kontras warna teks terhadap latarnya MUST memenuhi ambang keterbacaan yang lazim.

#### Media

- **FR-043**: Antarmuka MUST menyediakan pratinjau gambar, penampil layar penuh bila sesuai,
  keadaan muat, dan keadaan gagal untuk media.
- **FR-044**: Permukaan padat media MUST memuat isinya secara bertahap agar tetap ringan seiring
  bertambahnya data.

### Key Entities

Fitur ini tidak memperkenalkan data tersimpan. Ia mendefinisikan token, komponen, dan pola yang
dipakai fitur lain.

- **Token Desain**: Nilai bersama untuk tipografi, jarak, sudut membulat, warna, dan bayangan.
- **Komponen Dasar**: Tombol, kolom isian, area teks, pilihan, kartu, modal, drawer, toast,
  lencana, penanda muat.
- **Pola Halaman**: Page header, empty state, keadaan muat, keadaan gagal, konfirmasi
  penghapusan.
- **Watak Bagian**: Catatan karakter visual untuk tiap bagian produk (FR-026).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Seluruh komponen dasar tampil pada satu halaman peraga, dan tiap komponen hanya
  memiliki satu definisi di seluruh aplikasi.
- **SC-002**: Nilai tipografi, jarak, dan sudut membulat pada dua layar dari domain berbeda
  identik.
- **SC-003**: Seluruh layar dapat dipakai pada lebar 320 px tanpa scroll mendatar.
- **SC-004**: Seluruh kendali interaktif dapat dicapai dan dijalankan hanya dengan papan ketik.
- **SC-005**: Ketika preferensi kurangi-gerak menyala, tidak ada fungsi yang hilang dan tidak ada
  gerakan yang tersisa selain yang disederhanakan.
- **SC-006**: Tidak ada empty state maupun pesan kegagalan yang memuat kalimat bergaya sistem,
  nama teknis, kode internal, atau jejak kesalahan.
- **SC-007**: Setiap bagian yang mengambil data menampilkan kerangka halaman atau penanda muat
  sebelum isinya siap; tidak ada layar kosong tanpa penjelasan.
- **SC-008**: Setiap aksi penghapusan meminta konfirmasi yang menyebutkan apa saja yang akan ikut
  terhapus.
- **SC-009**: Tidak ada formulir yang menampilkan nilai internal sebagaimana dilarang FR-020.
- **SC-010**: Kontras teks terhadap latar memenuhi ambang keterbacaan pada seluruh layar.

## Assumptions

- **Cakupan fitur ini**: fondasi antarmuka yang dipakai bersama — sistem desain, kerangka
  aplikasi dan navigasi, pola halaman, keadaan antarmuka, gerak, responsif, dan aksesibilitas.
  Rancangan rinci tiap bagian pada `docs/ui-sections.md` §6–§21 menjadi bahan rujukan bagi spec
  domainnya masing-masing, bukan pekerjaan fitur ini. Lihat juga [NEEDS CLARIFICATION] pada
  FR-012.
- **Tumpang tindih dengan fitur 001**: `docs/ui-sections.md` §21.1 dan §21.2 menyebut layar
  pengaturan profil dan relationship. Keduanya sudah dispesifikasikan pada
  `specs/001-relationship-foundation/` (FR-012, FR-019, FR-020 di sana). Fitur ini menyediakan
  pola visualnya, bukan mengulang fungsinya.
- **Tema dan aksen**: §21.3 menyebut pengaturan Theme dan Accent. Keduanya ditunda; yang wajib
  sekarang hanyalah menghormati preferensi kurangi-gerak dari perangkat (FR-030), yang tidak
  memerlukan pengaturan di dalam aplikasi.
- **Kepustakaan animasi**: `docs/architecture.md` §3.3 dan `docs/ui-sections.md` §23 menyebut
  Framer Motion. Fitur inilah yang pertama kali membutuhkannya, sehingga pemasangannya masuk di
  sini.
- **Ambang kontras**: memakai ambang keterbacaan yang lazim dipakai pedoman aksesibilitas web
  untuk teks normal dan teks besar. Nilai pastinya merupakan detail implementasi.
- **Halaman peraga komponen**: bersifat internal untuk pemeriksaan konsistensi. Ia tetap tunduk
  pada Prinsip I — tidak memuat data hubungan yang sebenarnya.

## Konflik dengan Keputusan yang Berlaku

`docs/ui-sections.md` ditulis sebelum konstitusi v2.0.0 menghapus authentication. Bagian berikut
tidak dapat dijalankan apa adanya. Konstitusi yang berlaku.

| Bagian dokumen | Isi dokumen | Yang berlaku pada spec ini |
|---|---|---|
| §21.1 Profile | Kolom Email dan Password | Dihapus. Anggota tidak memiliki email maupun kredensial (001 FR-021). Profil hanya berisi nama panggilan dan foto. |
| §21.5 Account | Aksi Logout | Dihapus. Tidak ada session untuk diakhiri. Padanannya adalah mengganti penanda identitas (001 FR-013). |
| §21.4 Privacy | Pengaturan visibilitas relationship dan proteksi media | Dihapus. Tidak ada kontrol akses yang dapat diatur. Privasi bertumpu pada alamat deployment yang tidak dipublikasikan (Prinsip I). |
| §25 Media UI | "Media should not become publicly accessible simply because a URL is known" | Tidak dapat dipenuhi. Tanpa authentication, media memang terjangkau siapa pun yang mengetahui alamatnya. Tercatat pada Accepted Risks di konstitusi. |
| §27 Error States | Pesan "You don't have permission to access this content" | Dihapus. Tidak ada kegagalan izin pada sistem ini. Kategori error mengikuti 001 FR-031: validasi, tidak ditemukan, pelanggaran aturan, dan tak terduga. |
| §29 UI State | Keadaan "Permission denied" | Dihapus, dengan alasan yang sama. |

Selain yang tercantum di atas, seluruh isi `docs/ui-sections.md` diadopsi apa adanya.
