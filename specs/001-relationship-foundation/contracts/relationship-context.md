# Contract — Relationship Context

**Spec**: [../spec.md](../spec.md) · **Requirement**: FR-022, FR-023, FR-024, FR-025

Satu-satunya cara memperoleh Relationship dan identitas pada sisi server. Setiap fitur berikutnya
memakai fungsi yang sama, sehingga tidak ada domain yang menyusun caranya sendiri (FR-023).

Berada di `lib/relationship/context.ts`.

## `getRelationshipContext()`

```ts
type RelationshipContext =
  | { status: 'ready'; relationship: Relationship; members: [Member, Member] | [Member] }
  | { status: 'not-ready' }
```

- Membaca Relationship tunggal beserta Member-nya dari database (R-004)
- `status: 'not-ready'` ketika belum ada Relationship — pemanggil menampilkan layar "ruang belum
  siap" (FR-024)
- `members` dapat berisi satu anggota bila pasangan kedua belum disiapkan; ini keadaan sah dan
  bukan error (Edge Case pada spec)

## `getCurrentMember()`

```ts
type CurrentMember =
  | { status: 'selected'; member: Member }
  | { status: 'unselected' }
```

- Membaca cookie `olu_member`, lalu mencocokkannya dengan Member pada relationship context
- `status: 'unselected'` ketika cookie tidak ada, kosong, atau menunjuk Member yang tidak ada —
  pemanggil menampilkan pemilih identitas (FR-014)
- Tidak pernah melempar error karena cookie yang rusak

## Aturan pemakaian

- Setiap pembuatan resource milik relationship MUST mengambil `relationshipId` dari fungsi ini,
  tidak pernah dari input client (FR-025, FR-030)
- Fungsi ini MUST NOT dipakai untuk memutuskan boleh atau tidaknya sebuah akses — tidak ada
  keputusan semacam itu pada sistem ini (FR-017)
- Keduanya membaca data request-time, sehingga route yang memakainya bersifat dinamis (R-002)
