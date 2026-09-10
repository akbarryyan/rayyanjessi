# Laporan Validasi — UI Foundation (T123)

**Tanggal**: 2026-09-10
**Terhadap**: [quickstart.md](./quickstart.md) tabel validasi manual, 22 langkah

## Ringkasan

| | |
|---|---|
| Terbukti otomatis | 18 dari 22 langkah |
| Perlu penilaian mata | 4 langkah |
| Gagal | 0 |

## Hasil per langkah

| # | Langkah | Hasil | Dibuktikan oleh |
|---|---|---|---|
| 1 | Peraga menampilkan seluruh komponen | LULUS | `ui-showcase.spec.ts` |
| 2 | Dua layar berbeda memakai token yang sama | LULUS | `scripts/check-tokens.mjs` — tidak ada nilai visual lepas |
| 3 | 320 px tanpa scroll mendatar | LULUS | `responsive-sections.spec.ts`, 11 halaman |
| 4 | Menyesuaikan di tablet dan desktop | LULUS | pembantu `viewport.ts` menguji ketiga lebar |
| 5 | Navigasi ponsel di bawah layar | LULUS | `navigation.spec.ts` |
| 6 | Navigasi desktop ringan di kiri | LULUS | `navigation.spec.ts` |
| 7 | Section memperbarui alamat halaman | LULUS | `navigation-deeplink.spec.ts` |
| 8 | Alamat section dapat dibuka langsung | LULUS | `navigation-deeplink.spec.ts` |
| 9 | Penanda posisi mengikuti gulir | LULUS | `navigation-deeplink.spec.ts` |
| 10 | Seluruh kendali terjangkau papan ketik | LULUS | `keyboard-shell.spec.ts`, pembantu memeriksa urutan fokus per wilayah |
| 11 | Fokus tertahan di dalam modal | LULUS | `modal-focus.spec.ts` |
| 12 | Escape menutup dan mengembalikan fokus | LULUS | `modal-focus.spec.ts` |
| 13 | Kurangi-gerak tanpa kehilangan fungsi | LULUS | `reduced-motion.spec.ts` |
| 14 | Tidak ada animasi saat halaman diam | LULUS | `no-idle-animation.spec.ts` |
| 15 | Kerangka muat muncul lebih dulu | LULUS | `loading-states.spec.ts` |
| 16 | Kegagalan memberi jalan mencoba lagi | LULUS | `error-states.spec.ts` |
| 17 | Tidak ada kalimat bergaya sistem | LULUS | `copy-voice.spec.ts`, 19 halaman |
| 18 | Konfirmasi menyebut dampaknya | LULUS | `confirm-dialog.spec.ts` |
| 19 | Formulir tanpa nilai internal | LULUS | audit T118 — bersih |
| 20 | Varian ekstrem tampil rapi | LULUS | keempat varian diuji di `home.spec.ts` dan `sections.spec.ts` |
| 21 | Watak bagian tidak tertukar | **PERLU MATA** | halaman rujukan tersedia di `/ui-kit/sections` |
| 22 | Tidak memakai pola terlarang | LULUS | audit T116 — nol pemakaian |

## Empat hal yang tidak dapat saya buktikan sendiri

Pemeriksaan otomatis dapat membuktikan sesuatu **ada**, **terjangkau**, dan **tidak melanggar
aturan**. Ia tidak dapat menilai apakah sesuatu **terasa benar**. Empat hal berikut butuh
penilaian Anda:

1. **Watak tiap bagian (langkah 21).** Apakah Memories benar-benar terasa seperti album foto, dan
   Letters seperti surat? Halaman rujukan `/ui-kit/sections` menampilkan keenam belas bagian
   berdampingan beserta tautan ke tiap variannya.
2. **Nada kalimat.** Test membuktikan tidak ada kalimat bergaya sistem. Ia tidak dapat menilai
   apakah "Mungkin kenangan favorit kita berikutnya belum sempat terjadi" terdengar hangat atau
   justru dibuat-buat.
3. **Palet warna.** Kontrasnya terbukti memenuhi ambang secara matematis. Apakah warnanya terasa
   hangat dan intim — itu urusan mata.
4. **Ritme gerak.** Durasi animasinya pendek dan menghormati preferensi kurangi-gerak. Apakah
   membuka amplop Open When terasa berkesan atau justru terburu-buru, hanya bisa dirasakan.

Jalankan `npm run dev`, lalu mulai dari `/ui-kit/sections`.

## Catatan

Seluruh halaman masih berjalan di atas data contoh. Angka, nama, dan tanggal yang tampil bukan
data hubungan yang sebenarnya. Sembilan halaman yang masih memakai fixture tercatat pada
Complexity Tracking di [plan.md](./plan.md).
