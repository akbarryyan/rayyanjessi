# Contract — Server Actions

**Spec**: [../spec.md](../spec.md) · **Data model**: [../data-model.md](../data-model.md)

Seluruh action berada di `actions/` sebagai file ber-`'use server'`. Setiap action mengikuti
urutan wajib pada `docs/architecture.md` §26 dan Prinsip V konstitusi:

```text
1. validasi input (Zod)
2. ambil relationship context dari server
3. jalankan business logic
4. ubah database
5. kembalikan result yang aman
```

Tidak ada langkah authentication maupun authorization — keduanya tidak ada pada sistem ini.

## Bentuk hasil bersama

```ts
type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: { kind: 'validation' | 'not_found' | 'business_rule' | 'unexpected';
                          message: string; fields?: Record<string, string> } }
```

`message` selalu berupa kalimat yang dapat dibaca pasangan. Error database, stack trace, dan
detail konfigurasi tidak pernah masuk ke `message` (FR-032).

---

## `selectIdentity(memberId: string)`

Menyetel penanda identitas pada perangkat.

- **Requirement**: FR-013, FR-014, FR-015, FR-016
- **Validasi**: `memberId` adalah cuid dan merupakan Member pada Relationship yang ada
- **Efek**: menyetel cookie `olu_member` sesuai spesifikasi pada data model
- **Hasil**: `ok: true`
- **Gagal**: `not_found` bila Member tidak ada

## `clearIdentity()`

Melepas penanda identitas pada perangkat, sehingga pengguna diminta memilih lagi.

- **Requirement**: FR-013
- **Efek**: menghapus cookie `olu_member`
- **Hasil**: `ok: true`

---

## `updateMemberProfile(input)`

```ts
input: { memberId: string; displayName: string; photoMediaId?: string | null }
```

- **Requirement**: FR-019, FR-020
- **Validasi**: `displayName` 1..50 karakter setelah trim; `photoMediaId` bila diisi harus Media
  bertipe `IMAGE` milik Relationship yang sama
- **Hasil**: `ok: true` dengan Member terbaru
- **Gagal**: `validation` untuk nama kosong atau terlalu panjang; `not_found` bila Member atau
  Media tidak ada

**Catatan**: `memberId` diterima sebagai argumen, bukan diambil dari penanda identitas. FR-020
memberi kedua anggota hak setara memperbarui profil, dan penanda identitas bukan kontrol akses
(FR-017), sehingga membatasinya ke "diri sendiri" akan menjadi pembatasan semu yang tidak diminta
requirement mana pun.

---

## `updateRelationship(input)`

```ts
input: { name: string; startedAt: string; description?: string | null; coverMediaId?: string | null }
```

`startedAt` dikirim sebagai `YYYY-MM-DD`.

- **Requirement**: FR-008, FR-009, FR-010, FR-012
- **Validasi**:
  - `name` 1..100 karakter setelah trim
  - `startedAt` cocok `YYYY-MM-DD` dan **bukan tanggal masa depan** menurut `APP_TIMEZONE`
  - `description` maksimum 2000 karakter
  - `coverMediaId` bila diisi harus Media bertipe `IMAGE` milik Relationship yang sama
- **Hasil**: `ok: true` dengan Relationship terbaru
- **Gagal**: `validation` dengan `fields.startedAt` terisi bila tanggalnya di masa depan

**Catatan**: Relationship yang disunting selalu yang berasal dari relationship context di server.
Action ini tidak menerima `relationshipId` dari client (FR-025).
