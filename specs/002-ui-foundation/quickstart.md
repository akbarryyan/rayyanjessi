# Quickstart — UI Foundation

Panduan menjalankan dan memvalidasi fitur ini. Bukan panduan implementasi.

## Prasyarat

- Fondasi proyek dari fitur 001 sudah terpasang (`npm install` bersih, aplikasi dapat dijalankan)
- Untuk memvalidasi Settings dan penghitung waktu dengan data sungguhan, database fitur 001 sudah
  di-migrate dan di-seed. Bagian lain tidak membutuhkannya — semuanya berjalan di atas fixture

## Menjalankan

```bash
npm run dev
```

Halaman peraga komponen: `/ui-kit`

## Validasi manual

| # | Langkah | Hasil yang diharapkan | Requirement |
|---|---|---|---|
| 1 | Buka `/ui-kit` | Seluruh komponen dasar tampil beserta variasi keadaannya | FR-005, SC-001 |
| 2 | Bandingkan dua layar dari bagian berbeda | Jenis huruf, skala ukuran, jarak, dan sudut membulat identik | FR-001, SC-002 |
| 3 | Perkecil jendela ke lebar 320 px, telusuri seluruh halaman | Tidak ada scroll mendatar | FR-033, SC-003 |
| 4 | Perbesar ke lebar tablet lalu desktop | Tata letak menyesuaikan; tidak ada baris teks yang terlalu panjang | FR-034 |
| 5 | Di lebar ponsel, periksa navigasi | Berada di bagian bawah layar, memuat tujuan utama dan satu jalan menuju sisanya | FR-007, FR-008 |
| 6 | Di lebar desktop, periksa navigasi | Daftar tujuan di sisi kiri, bobot visual ringan | FR-009 |
| 7 | Pilih item navigasi bertipe section | Pandangan berpindah ke section itu dan alamat halaman ikut berubah | FR-012, FR-045 |
| 8 | Salin alamat hasil langkah 7, buka di tab baru | Halaman langsung terbuka pada section tersebut | FR-045 |
| 9 | Gulir landing page perlahan | Penanda posisi navigasi mengikuti section yang terlihat | FR-046 |
| 10 | Telusuri seluruh aplikasi hanya dengan Tab dan Enter | Setiap kendali tercapai, urutannya masuk akal, fokus selalu terlihat | FR-011, FR-036, FR-037 |
| 11 | Buka sebuah modal, tekan Tab berulang kali | Fokus tidak keluar dari modal | FR-039 |
| 12 | Tutup modal dengan Escape | Modal tertutup dan fokus kembali ke pemicunya | FR-039 |
| 13 | Nyalakan preferensi kurangi-gerak di sistem, ulangi interaksi beranimasi | Gerakan ditiadakan atau disederhanakan; tidak ada fungsi yang hilang | FR-030, SC-005 |
| 14 | Diamkan halaman mana pun | Tidak ada animasi yang berjalan terus-menerus | FR-032 |
| 15 | Perlambat jaringan, muat ulang | Kerangka halaman muncul lebih dulu; tidak ada layar kosong | FR-021, SC-007 |
| 16 | Paksa kegagalan pengambilan data | Muncul kalimat terbaca beserta cara mencoba lagi | FR-023, FR-025 |
| 17 | Baca seluruh empty state dan pesan kegagalan | Tidak ada kalimat bergaya sistem, nama teknis, kode internal, maupun jejak kesalahan | FR-015, FR-024, SC-006 |
| 18 | Picu sebuah aksi penghapusan | Muncul konfirmasi yang menyebutkan apa saja yang akan ikut terhapus | FR-018, SC-008 |
| 19 | Buka seluruh formulir | Tidak ada pengenal relationship, penanda pembuat, penanda waktu, pengenal basis data, maupun path penyimpanan | FR-020, SC-009 |
| 20 | Muat bagian dengan fixture bervarian ekstrem | Teks sangat panjang, tanpa gambar, dan daftar kosong tetap tampil rapi | Edge Cases |
| 21 | Bandingkan tiap bagian dengan tabel watak pada spec | Wataknya sesuai; tidak ada dua bagian yang tertukar | FR-026, FR-027 |
| 22 | Periksa seluruh layar terhadap daftar pola terlarang | Tidak satu pun dipakai tanpa alasan fungsional tercatat | FR-028 |

## Validasi otomatis

```bash
npm run lint
npx tsc --noEmit
npm run test           # Vitest: logika murni
npm run test:e2e       # Playwright: perilaku antarmuka
```

Yang harus tercakup, sesuai [research.md](./research.md) R-008:

**Vitest** — penentuan item navigasi aktif dari route maupun dari section yang terlihat;
pembentuk view model; pemformat teks.

**Playwright** — penelusuran papan ketik menyeluruh; jebakan fokus dan pengembalian fokus pada
modal dan drawer; lebar 320 px tanpa scroll mendatar pada setiap halaman; perilaku ketika
preferensi kurangi-gerak menyala; keadaan memuat, kosong, dan gagal pada setiap bagian;
pemindaian aksesibilitas otomatis pada `/ui-kit` dan pada setiap halaman bagian, mencakup kontras
dan penanda semantik.

## Memeriksa konsistensi token

Membuktikan FR-002 ditegakkan, bukan sekadar disepakati:

```bash
# tidak boleh ada nilai warna heksadesimal lepas di dalam komponen
grep -rn --include=*.tsx -E '#[0-9a-fA-F]{3,8}\b' components/ app/

# tidak boleh ada nilai piksel lepas untuk jarak di dalam komponen
grep -rn --include=*.tsx -E '\[[0-9]+px\]' components/ app/
```

Keduanya harus tidak menghasilkan apa pun. Bila ada hasil, nilai itu seharusnya menjadi token di
`app/globals.css`.

## Memeriksa pemisahan komponen dari data

Membuktikan aturan R-002 dan [contracts/view-model.md](./contracts/view-model.md):

```bash
# komponen bagian tidak boleh mengambil data sendiri
grep -rn --include=*.tsx -E "from '@/lib/db'|prisma\.|use server" components/

# fixture tidak boleh dipakai di luar halaman peraga
grep -rn --include=*.tsx "lib/fixtures" app/ components/ | grep -v 'ui-kit'
```

Perintah pertama harus kosong. Perintah kedua hanya boleh menghasilkan halaman yang memang masih
menunggu data model domainnya, dan setiap hasilnya harus tercatat sebagai utang pada
[plan.md](./plan.md).
