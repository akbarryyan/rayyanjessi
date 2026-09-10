# Contract — `POST /api/upload`

**Spec**: [../spec.md](../spec.md) · **Research**: [../research.md](../research.md) R-007

Route Handler pada `app/api/upload/route.ts`. Satu-satunya HTTP endpoint pada fitur ini.

## Request

`multipart/form-data` dengan satu field:

| Field | Tipe | Keterangan |
|---|---|---|
| `file` | File | Gambar yang diunggah |

## Validasi

Dilakukan seluruhnya di server sebelum berkas disimpan (`docs/architecture.md` §30):

| Aturan | Nilai |
|---|---|
| MIME type | `image/jpeg`, `image/png`, `image/webp` |
| Ekstensi | `.jpg`, `.jpeg`, `.png`, `.webp` — harus cocok dengan MIME type |
| Ukuran maksimum | 10 MB |
| Nama berkas | Diabaikan; nama simpan dibuat sistem, tidak pernah memakai nama dari client |

Berkas disimpan dengan nama acak dan ekstensi hasil validasi, sehingga berkas yang diunggah tidak
dapat dieksekusi server (Technology & Security Constraints, konstitusi v2.0.0).

## Response

**201** — berhasil

```json
{ "ok": true, "data": { "mediaId": "...", "path": "..." } }
```

**400** — gagal validasi

```json
{ "ok": false, "error": { "kind": "validation", "message": "Format gambarnya belum didukung." } }
```

**413** — berkas melebihi batas ukuran

**500** — kegagalan tak terduga; `message` tetap berupa kalimat yang dapat dibaca, tanpa detail
internal (FR-032)

## Efek

Membuat baris `Media` dengan `relationshipId` diambil dari relationship context di server, bukan
dari input client (FR-025, FR-030).

## Storage

Melalui abstraksi `lib/storage/` dengan satu driver pada fitur ini:

| Lingkungan | Driver |
|---|---|
| Development | Filesystem lokal |
| Production | Driver S3-compatible, ditambahkan saat deployment dikerjakan |

Domain logic tidak boleh memanggil filesystem atau SDK penyedia secara langsung
(`docs/architecture.md` §3.8, Prinsip XI).

## Rate limiting

Endpoint ini dibatasi lajunya sesuai Technology & Security Constraints. Batas awal: 20 unggahan
per 10 menit per alamat IP.
