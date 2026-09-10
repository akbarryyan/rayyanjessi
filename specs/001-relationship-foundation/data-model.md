# Phase 1 — Data Model: Relationship Foundation

**Spec**: [spec.md](./spec.md) · **Research**: [research.md](./research.md)

Skema didefinisikan pada `prisma/schema.prisma`, database MySQL, sesuai `docs/architecture.md`
§3.5–3.6.

---

## Relationship

Ownership root. Tepat satu baris per deployment (FR-006).

| Field | Tipe | Aturan |
|---|---|---|
| `id` | `String @id @default(cuid())` | |
| `singleton` | `Boolean @default(true) @unique` | Menjamin hanya satu baris dapat ada (R-005) |
| `name` | `String` | Wajib. Nama ruang bersama (FR-010) |
| `startedAt` | `DateTime @db.Date` | Wajib. Tanggal kalender, tidak boleh masa depan (FR-008, FR-009) |
| `description` | `String? @db.Text` | Opsional (FR-010) |
| `coverMediaId` | `String? @unique` | Opsional, relasi ke `Media` (FR-010) |
| `createdAt` | `DateTime @default(now())` | |
| `updatedAt` | `DateTime @updatedAt` | |

**Relasi**: `members Member[]`, `coverMedia Media?`

**Aturan validasi**:
- `name` — 1..100 karakter setelah trim
- `startedAt` — bukan tanggal masa depan menurut `APP_TIMEZONE`. Ditegakkan Zod, bukan `CHECK`
  database (batasan MySQL 8, lihat R-005)
- `description` — maksimum 2000 karakter

**Catatan**: `singleton` tidak pernah ditulis aplikasi secara eksplisit; nilainya selalu default.
Kolom ini murni pembawa constraint.

---

## Member

Salah satu dari dua orang. Tanpa email, tanpa kredensial (FR-021).

| Field | Tipe | Aturan |
|---|---|---|
| `id` | `String @id @default(cuid())` | |
| `relationshipId` | `String` | Wajib. Ownership eksplisit (FR-030) |
| `slot` | `Int` | 1 atau 2. Pembawa constraint batas dua anggota (R-005) |
| `displayName` | `String` | Wajib (FR-019) |
| `photoMediaId` | `String? @unique` | Opsional (FR-019) |
| `createdAt` | `DateTime @default(now())` | |
| `updatedAt` | `DateTime @updatedAt` | |

**Relasi**: `relationship Relationship @relation(...)`, `photo Media?`

**Constraint database**:
- `@@unique([relationshipId, slot])`
- `CHECK (slot IN (1, 2))` — disisipkan sebagai raw SQL pada file migration

Kedua constraint bersama-sama membatasi setiap Relationship pada maksimum dua Member (FR-007,
FR-029).

**Aturan validasi**:
- `displayName` — 1..50 karakter setelah trim

---

## Media

Minimal, sesuai R-007. Mengikuti bentuk pada `docs/architecture.md` §9 tanpa field yang belum
dipakai.

| Field | Tipe | Aturan |
|---|---|---|
| `id` | `String @id @default(cuid())` | |
| `relationshipId` | `String` | Wajib. Ownership eksplisit (FR-030) |
| `type` | `MediaType` | `IMAGE` untuk fitur ini |
| `path` | `String` | Path relatif di storage, bukan URL absolut |
| `mimeType` | `String` | Hasil validasi unggahan |
| `sizeBytes` | `Int` | |
| `createdAt` | `DateTime @default(now())` | |

**Relasi**: `relationship Relationship @relation(...)`

**Tidak termasuk fitur ini**: `thumbnailPath`, `metadata`, `attachableType`, `attachableId`.
Ketiganya menyusul bersama fitur yang benar-benar memakainya (Prinsip III).

**Enum**: `enum MediaType { IMAGE }` — nilai `VIDEO` ditambahkan saat Memories dikerjakan.

---

## Penanda Identitas Perangkat

**Bukan entity database.** Cookie `olu_member` berisi `Member.id` (R-003).

| Atribut | Nilai |
|---|---|
| Nama | `olu_member` |
| Isi | `Member.id` |
| `httpOnly` | `true` |
| `sameSite` | `'lax'` |
| `path` | `/` |
| `maxAge` | 10 tahun |
| `secure` | `true` di production |

**Perilaku**:
- Tidak ada cookie, isinya kosong, atau menunjuk Member yang tidak ada → diperlakukan sebagai
  belum memilih; pengguna diminta memilih ulang (FR-014)
- Hanya menentukan atribusi, tidak menentukan hak akses (FR-017)

---

## Diagram Relasi

```text
Relationship (tepat satu)
├── singleton (unique) ──── menjamin hanya satu baris
├── startedAt (DATE)
├── coverMedia ──────────── Media?
└── members ─────────────── Member[] (maksimum 2 lewat unique(relationshipId, slot) + CHECK)
                            └── photo ──── Media?

Media
└── relationshipId ──────── ownership eksplisit, dipertahankan untuk masa depan (FR-030)
```

---

## Migration

Satu migration awal, dibuat lewat `prisma migrate dev`, lalu disunting untuk menambahkan:

```sql
ALTER TABLE `Member` ADD CONSTRAINT `member_slot_range` CHECK (`slot` IN (1, 2));
```

Penyuntingan file migration adalah cara satu-satunya menyatakan `CHECK` melalui Prisma, dan tetap
tercatat pada sistem migration sesuai Prinsip IX.

---

## Seed

`prisma/seed.ts` menyiapkan satu Relationship dan dua Member dalam satu langkah yang dapat diulang
(FR-027). Seed MUST menempuh jalur validasi yang sama dengan aplikasi (FR-028), yaitu memakai
schema Zod yang sama, bukan menulis langsung ke database tanpa pemeriksaan.

Nilai diambil dari environment variable agar tidak ada nama pribadi yang ter-commit:

```text
SEED_RELATIONSHIP_NAME
SEED_STARTED_AT
SEED_MEMBER_1_NAME
SEED_MEMBER_2_NAME
```
