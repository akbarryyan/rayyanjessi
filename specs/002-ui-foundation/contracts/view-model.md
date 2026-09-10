# Contract — View Model Tiap Bagian

**Spec**: [../spec.md](../spec.md) · **Research**: [../research.md](../research.md) R-002

Kontrak antara komponen tiap bagian dan sumber datanya. Inilah yang membuat penyambungan ke data
sungguhan kelak tidak menuntut perancangan ulang (FR-063).

## Aturan

1. Setiap bagian mengekspor satu tipe view model di `lib/view-models/<domain>.ts`.
2. Komponen bagian menerima view model itu sebagai props. Ia MUST NOT memanggil Prisma, `fetch`,
   maupun server action.
3. Satu-satunya tempat yang menyusun view model adalah halaman yang merender bagian tersebut.
4. Selama data model domainnya belum ada, halaman menyusun view model dari fixture di
   `lib/fixtures/`.
5. Ketika data model domainnya mendarat, yang berubah hanya penyusun view model di halaman —
   komponennya tidak.

## Bentuk yang wajib ditangani setiap view model

Setiap view model MUST dapat menyatakan tiga keadaan, dan komponennya MUST menangani ketiganya:

| Keadaan | Arti | Yang ditampilkan |
|---|---|---|
| Kosong | Belum ada isi sama sekali | `EmptyState` dengan kalimat personal dan satu aksi (FR-014) |
| Terisi | Ada isi | Isinya |
| Gagal | Pengambilan data gagal | `ErrorState` dengan cara mencoba lagi (FR-023) |

Keadaan memuat ditangani di tingkat halaman melalui `Skeleton`, bukan di dalam view model
(FR-021).

## Aturan penamaan

Field pada view model memakai istilah yang dipahami pasangan, bukan istilah database. Nilai
internal seperti pengenal relationship, penanda pembuat, penanda waktu perubahan, pengenal basis
data, dan path penyimpanan MUST NOT masuk ke view model yang dipakai formulir (FR-020).

Pengenal tetap boleh ada bila memang dibutuhkan untuk menyusun tautan, tetapi MUST NOT
ditampilkan kepada pengguna.
