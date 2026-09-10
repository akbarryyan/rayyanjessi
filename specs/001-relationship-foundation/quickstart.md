# Quickstart — Relationship Foundation

Panduan menjalankan dan memvalidasi fitur ini dari nol. Bukan panduan implementasi; kode ada di
tahap `/speckit-implement`.

## Prasyarat

- Node.js sesuai `package.json`
- MySQL 8 yang dapat dijangkau secara lokal
- `.env` berisi:

```text
DATABASE_URL="mysql://user:password@localhost:3306/our_little_universe"
APP_TIMEZONE="Asia/Jakarta"
STORAGE_DRIVER="local"
STORAGE_LOCAL_PATH="./storage/uploads"
SEED_RELATIONSHIP_NAME="..."
SEED_STARTED_AT="YYYY-MM-DD"
SEED_MEMBER_1_NAME="..."
SEED_MEMBER_2_NAME="..."
```

`.env` tidak boleh di-commit.

## Menyiapkan

```bash
npm install
npx prisma migrate dev      # membuat skema + constraint
npx prisma db seed          # menyiapkan Relationship dan dua Member (FR-027)
npm run dev
```

## Validasi manual

Urutan di bawah membuktikan fitur ini bekerja ujung ke ujung. Setiap langkah menyebut requirement
yang dibuktikannya.

| # | Langkah | Hasil yang diharapkan | Requirement |
|---|---|---|---|
| 1 | Buka `/` dari peramban bersih | Halaman termuat tanpa diminta kredensial apa pun | FR-001, FR-002 |
| 2 | Buka `/login`, `/register`, `/reset-password` | Ketiganya menampilkan halaman tidak ditemukan | FR-003 |
| 3 | Buka `/robots.txt` | Berisi `Disallow: /`; sumber halaman memuat meta `noindex` | FR-004 |
| 4 | Pada peramban bersih, sebelum memilih identitas | Muncul pemilih berisi dua nama anggota | FR-013, FR-018 |
| 5 | Pilih salah satu anggota, lalu muat ulang | Tidak ditanya lagi; nama yang dipilih tampil | FR-014 |
| 6 | Hapus cookie situs, lalu muat ulang | Diminta memilih lagi, tanpa error | FR-014 |
| 7 | Ganti identitas ke anggota lain | Berlaku seketika; atribusi berikutnya ikut berubah | FR-013, FR-016 |
| 8 | Buka aplikasi dari peramban kedua dan pilih anggota berbeda | Pilihan pada peramban pertama tidak berubah | FR-015 |
| 9 | Buka pengaturan Relationship | Nama, deskripsi, tanggal mulai, dan kedua nama anggota tampil | FR-023 |
| 10 | Ubah tanggal mulai ke tanggal besok, simpan | Ditolak dengan pesan yang terbaca pada field tanggal | FR-009 |
| 11 | Ubah tanggal mulai ke tanggal yang sah, simpan | Tersimpan; durasi hubungan ikut menyesuaikan | FR-008, FR-011 |
| 12 | Ubah zona waktu perangkat, muat ulang | Tanggal mulai yang tampil tidak bergeser | FR-009, SC-005 |
| 13 | Ubah nama panggilan salah satu anggota | Nama baru muncul di seluruh tempat, termasuk pemilih identitas | FR-020 |
| 14 | Unggah foto profil berformat JPG/PNG/WebP | Tersimpan dan tampil | FR-020, R-007 |
| 15 | Unggah berkas `.txt` yang dinamai `.jpg` | Ditolak dengan pesan yang terbaca | Contract upload |
| 16 | Unggah gambar lebih besar dari 10 MB | Ditolak dengan pesan yang terbaca | Contract upload |
| 17 | Kosongkan tabel Relationship, muat ulang | Muncul layar "ruang belum siap", bukan error mentah | FR-024 |

## Validasi otomatis

```bash
npm run lint
npx tsc --noEmit
npm run test           # Vitest: unit + integration
npm run test:e2e       # Playwright
```

Yang harus tercakup, sesuai Prinsip X konstitusi dan R-008:

**Unit** — perhitungan durasi hubungan lintas batas bulan dan tahun serta tahun kabisat;
pemformatan tanggal tanpa pergeseran zona waktu; seluruh schema Zod.

**Integration** — menolak `startedAt` masa depan; menolak Member ketiga (constraint database);
menolak Relationship kedua (constraint singleton); `relationshipId` diambil dari context dan
bukan dari input client; `getCurrentMember()` mengembalikan `unselected` untuk cookie rusak;
validasi unggahan menolak MIME dan ukuran yang tidak sah.

**E2E** — langkah 1, 2, 4, 5, 7, dan 17 dari tabel validasi manual di atas.

## Memeriksa constraint database secara langsung

Membuktikan FR-029 ditegakkan database, bukan hanya kode aplikasi:

```sql
-- harus gagal: batas dua anggota
INSERT INTO Member (id, relationshipId, slot, displayName, createdAt, updatedAt)
VALUES ('x', '<id relationship>', 3, 'Orang Ketiga', NOW(), NOW());

-- harus gagal: singleton
INSERT INTO Relationship (id, singleton, name, startedAt, createdAt, updatedAt)
VALUES ('y', 1, 'Ruang Kedua', '2020-01-01', NOW(), NOW());
```

Keduanya harus ditolak MySQL. Bila salah satu berhasil, FR-029 belum terpenuhi.
