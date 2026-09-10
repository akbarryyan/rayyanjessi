# Phase 1 — Data Model: UI Foundation

**Spec**: [spec.md](./spec.md) · **Research**: [research.md](./research.md)

Fitur ini **tidak menambah tabel database apa pun**. Yang didefinisikan di sini adalah token,
komponen, dan kontrak view model — bentuk data yang mengalir masuk ke komponen, bukan yang
tersimpan.

---

## Token Desain

Didefinisikan dalam blok `@theme` pada `app/globals.css` (R-003). Seluruh nilai visual pada
komponen berasal dari sini (FR-002).

| Kelompok | Isi |
|---|---|
| Warna | Latar, permukaan, teks utama, teks sekunder, aksen, garis, dan warna keadaan. Setiap pasangan teks-latar MUST memenuhi ambang R-007 |
| Tipografi | Satu muka huruf untuk isi dan satu untuk judul editorial; skala ukuran; tinggi baris; bobot |
| Jarak | Satu skala tunggal yang dipakai seluruh komponen dan tata letak |
| Sudut membulat | Skala kecil sampai besar, bernuansa lembut sesuai Prinsip VII |
| Bayangan | Terbatas dan lembut; bayangan berat dilarang oleh `docs/ui-sections.md` §3.2 |
| Durasi gerak | Nilai durasi dan pelambatan yang dipakai seluruh animasi, dipangkas ketika preferensi kurangi-gerak menyala |

**Aturan**: nilai visual yang sudah memiliki token MUST NOT ditulis sebagai angka lepas di
komponen (FR-002).

---

## Komponen Dasar

Berada di `components/ui/`. Setiap komponen memiliki tepat satu definisi (FR-004).

| Komponen | Keadaan yang wajib ada |
|---|---|
| `Button` | Utama, sekunder, halus, merusak; normal, tertunjuk, terfokus, memuat, nonaktif |
| `Input`, `Textarea`, `Select` | Normal, terfokus, gagal validasi, nonaktif, hanya-baca |
| `Card` | Lembut, membulat sedang, berfokus isi; bukan kartu metrik (FR-006) |
| `Modal` | Terbuka, tertutup; menahan fokus dan mengembalikannya (FR-039) |
| `Drawer` | Sama seperti Modal, untuk penyuntingan kontekstual |
| `Toast` | Berhasil, gagal; kalimat singkat dan ramah (FR-017) |
| `Badge` | Netral dan varian keadaan |
| `Skeleton` | Bentuk kerangka untuk teks, gambar, dan kartu (FR-021) |
| `Avatar` | Dengan foto dan tanpa foto |
| `ConfirmDialog` | Konfirmasi penghapusan yang menyebutkan dampaknya (FR-018) |
| `EmptyState` | Judul, kalimat personal, satu aksi (FR-014, FR-015) |
| `PageHeader` | Judul, kalimat pengantar, aksi utama opsional (FR-013) |
| `ErrorState` | Kalimat terbaca dan cara mencoba lagi (FR-023) |

---

## Kontrak View Model

Berada di `lib/view-models/`. Inilah bentuk data yang diterima komponen tiap bagian. Komponen
bagian MUST NOT mengambil data sendiri (R-002).

Ketiga belas bagian tanpa data model menerima bentuk berikut. Bentuknya diturunkan dari
`docs/ui-sections.md` §6–§21 dan dari model pada `docs/architecture.md`, bukan direka baru.

| View model | Isi ringkas | Requirement |
|---|---|---|
| `HomeViewModel` | Sapaan, nama kedua anggota, durasi hubungan, pertanyaan harian, perjalanan terdekat beserta hitung mundur, memori terbaru, surat terbaru, satu butir masa depan, aksi cepat | FR-047 |
| `StoryViewModel` | Daftar peristiwa berisi judul, tanggal, lokasi, deskripsi, gambar sampul, jenis; daftar penyaring | FR-048 |
| `MemoriesViewModel` | Daftar memori berisi gambar, judul, tanggal; detail berisi cerita dan kaitan ke perjalanan, peristiwa, lagu | FR-049 |
| `LettersViewModel` | Daftar surat beserta keadaannya; isi surat; bentuk penulis surat | FR-050 |
| `OpenWhenViewModel` | Daftar pemicu berisi lambang, judul, dan isi | FR-051 |
| `TripViewModel` | Judul, tujuan, gambar sampul, rentang tanggal, hitung mundur, status, kemajuan anggaran, kemajuan daftar tugas | FR-052 |
| `ItineraryViewModel` | Daftar hari; tiap hari berisi aktivitas dengan waktu, judul, lokasi, perkiraan biaya | FR-053 |
| `BudgetViewModel` | Batas anggaran, total perkiraan, total aktual, rincian per kategori, daftar pengeluaran | FR-054 |
| `ChecklistViewModel` | Daftar tugas berisi judul, status selesai, penerima tugas; ringkasan kemajuan | FR-055 |
| `PlacesViewModel` | Daftar tempat berisi gambar, nama, alamat, tanggal pertama dikunjungi | FR-056 |
| `SoundtrackViewModel` | Daftar lagu berisi sampul, judul, penyanyi, tautan, cerita | FR-057 |
| `FutureViewModel` | Daftar butir berisi judul, kategori, status, tanggal target | FR-058 |
| `JustForUsViewModel` | Pertanyaan harian, kuis, dan pertanyaan siapa-lebih-mungkin | FR-059 |
| `ImportantDatesViewModel` | Tanggal terdekat beserta hitung mundur; daftar tanggal berisi judul, tanggal, jenis, status berulang | FR-061 |

Dua bagian menerima data sungguhan dari fitur 001:

| View model | Sumber | Requirement |
|---|---|---|
| `OurTimeViewModel` | `Relationship.startedAt` melalui `lib/date/duration.ts` (fitur 001) | FR-060 |
| `SettingsViewModel` | `getRelationshipContext()` (fitur 001) | FR-062 |

---

## Data Contoh

Berada di `lib/fixtures/`, satu berkas per view model.

**Aturan**:
- Fixture MUST NOT memuat data hubungan yang sebenarnya (Prinsip I)
- Fixture MUST NOT ikut ter-bundle ke halaman produksi selain halaman peraga `/ui-kit`
- Setiap fixture MUST menyertakan varian ekstrem: teks sangat panjang, tanpa gambar, dan daftar
  kosong — agar Edge Cases pada spec benar-benar teruji

---

## Peta Navigasi

Berada di `lib/navigation.ts`. Satu daftar tunggal yang dipakai navigasi ponsel maupun layar
besar (FR-007, FR-009).

Setiap butir memuat: label, jenis tujuan (`section` atau `page`), tujuannya, dan penanda apakah
ia termasuk tujuan utama di ponsel atau berada di balik satu jalan menuju sisanya (FR-008).

Pembagian tujuan mengikuti [research.md](./research.md) R-001.
