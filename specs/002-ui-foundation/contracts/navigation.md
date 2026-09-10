# Contract — Navigasi

**Spec**: [../spec.md](../spec.md) · **Research**: [../research.md](../research.md) R-001

Satu daftar tujuan di `lib/navigation.ts`, dipakai navigasi ponsel maupun layar besar sehingga
keduanya tidak dapat menyimpang.

## Bentuk setiap butir

| Field | Arti |
|---|---|
| Label | Nama yang dibaca pasangan |
| Jenis tujuan | `section` (bagian pada landing page `/`) atau `page` (halaman tersendiri) |
| Tujuan | Fragment pada `/` untuk `section`; path untuk `page` |
| Utama di ponsel | Menentukan apakah butir ini tampil langsung di navigasi bawah atau berada di balik jalan menuju sisanya (FR-008) |

## Pembagian tujuan

| `section` pada `/` | `page` tersendiri |
|---|---|
| Our Time, Important Dates, Our Future, Just For Us | Our Story, Memories, Letters, Open When, Next Trips, Places, Soundtrack, Settings |

## Perilaku

- **Ponsel** (FR-007, FR-008): navigasi di bagian bawah layar memuat butir bertanda utama,
  ditambah satu jalan menuju seluruh butir lainnya.
- **Layar besar** (FR-009): seluruh butir tampil di sisi kiri dengan bobot visual ringan.
- **Penanda posisi** (FR-010): ditandai lebih dari sekadar warna. Untuk `page`, ditentukan route
  aktif. Untuk `section`, ditentukan section yang sedang terlihat saat menggulir landing page
  (FR-046).
- **Tautan ulang** (FR-045): berpindah ke sebuah `section` memperbarui alamat halaman sehingga
  dapat dibagikan dan dibuka langsung.
- **Papan ketik** (FR-011): seluruh tujuan terjangkau papan ketik dengan urutan yang masuk akal.

## Aturan

Menambah bagian baru MUST dilakukan dengan menambah butir pada daftar ini, bukan dengan menulis
tautan lepas di komponen navigasi.
