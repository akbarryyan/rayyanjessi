# Contract — Komponen Dasar

**Spec**: [../spec.md](../spec.md) · **Data model**: [../data-model.md](../data-model.md)

Kontrak antarmuka komponen di `components/ui/`. Setiap komponen memiliki satu definisi, dipakai
seluruh bagian tanpa disalin (FR-004).

## Aturan yang berlaku untuk semua komponen

1. Seluruh nilai visual berasal dari token; tidak ada angka lepas untuk nilai yang sudah bertoken
   (FR-002).
2. Setiap komponen meneruskan atribut standar elemen aslinya, sehingga label aksesibilitas dapat
   ditambahkan dari luar tanpa mengubah komponennya (FR-041).
3. Setiap komponen interaktif memiliki keadaan fokus yang terlihat (FR-037).
4. Tidak ada komponen yang menyampaikan makna hanya lewat warna (FR-038).
5. Komponen tidak mengambil data sendiri dan tidak memanggil server action; keduanya diterima
   sebagai props (R-002).

## Perilaku yang wajib pada komponen berlapis

`Modal`, `Drawer`, dan `ConfirmDialog`:

- Menahan fokus selama terbuka dan mengembalikannya ke pemicu setelah ditutup (FR-039)
- Dapat ditutup dengan tombol Escape
- Menandai dirinya sebagai lapisan dialog bagi pembaca layar
- Mengunci gulir halaman di belakangnya selama terbuka
- Menghormati preferensi kurangi-gerak saat muncul dan menghilang (FR-030)

## Perilaku yang wajib pada komponen isian

`Input`, `Textarea`, `Select`:

- Setiap kolom memiliki label yang terkait, bukan sekadar teks bayangan
- Pesan kegagalan terkait dengan kolomnya dan diumumkan kepada pembaca layar (FR-040)
- Keadaan gagal ditandai lebih dari sekadar warna (FR-038)

## Perilaku yang wajib pada komponen keadaan

- `Skeleton` menyerupai bentuk isi yang akan menggantikannya, sehingga tata letak tidak melompat
  (FR-021)
- `EmptyState` selalu memuat satu aksi yang relevan, dan kalimatnya bernada personal (FR-014,
  FR-015)
- `ErrorState` memuat kalimat terbaca beserta cara mencoba lagi, tanpa nama teknis maupun jejak
  kesalahan (FR-023, FR-024)
- `Toast` memuat kalimat singkat dan ramah, serta menghilang sendiri tanpa menutupi kendali
  (FR-017)
