# Architecture — Our Little Universe

> **Catatan revisi (2026-09-09)** — Authentication dihapus dari sistem atas keputusan pemilik
> produk. Tidak ada Auth.js, login, session, protected route, maupun authorization. Identitas
> penulis ditentukan lewat penanda "aku siapa" yang diingat perangkat. Lihat
> `.specify/memory/constitution.md` v2.0.0 (Prinsip I dan Accepted Risks). Bagian 3.7, 4, 5.2,
> 5.3, 5.4, 7.1, 10, 24, 25, 26, 27, 29, 30, 35, 36, 38, 40, 41, 42, 45, 53, 54, 56, 57, dan 58
> sudah menyesuaikan.
>
> Pada tanggal yang sama, bentuk situs ditetapkan sebagai **satu landing page panjang** di `/`
> yang menampilkan seluruh bagian hubungan, dengan halaman detail tiap domain tetap ada.
> Bagian 22, 33, 35, dan 36 sudah menyesuaikan.

## 1. Project Overview

**Our Little Universe** adalah aplikasi web privat yang dirancang khusus untuk dua orang dalam sebuah hubungan.

Aplikasi berfungsi sebagai ruang digital bersama untuk:

- menyimpan kenangan
- mencatat perjalanan hubungan
- menulis surat
- merencanakan perjalanan
- menyimpan tempat penting
- menyimpan lagu yang memiliki arti khusus
- membuat bucket list dan future plans
- memainkan aktivitas kecil bersama
- mencatat tanggal-tanggal penting
- melihat durasi hubungan

Konsep utama:

> **A private digital home for two people.**

Sistem harus dirancang agar dapat digunakan dalam jangka panjang dan menjadi arsip digital perjalanan sebuah hubungan.

---

# 2. Architecture Goals

Arsitektur sistem memiliki tujuan:

- Private by default
- Relationship-centric
- Mobile-first
- Personal rather than administrative
- Simple to maintain
- Easy to extend
- Secure
- Media-friendly
- Suitable for long-term development
- Clear separation between UI, business logic, and data access

Arsitektur tidak boleh over-engineered untuk kebutuhan MVP, tetapi harus memiliki fondasi yang cukup untuk pengembangan fitur di masa depan.

---

# 3. Technology Stack

## 3.1 Application Framework

**Next.js**

Next.js digunakan sebagai application framework yang menangani:

- frontend rendering
- routing
- server components
- client components
- server actions
- API route handlers
- authentication integration
- backend application logic

Menggunakan **Next.js App Router**.

---

## 3.2 Programming Language

**TypeScript**

TypeScript digunakan pada seluruh application code untuk meningkatkan:

- type safety
- maintainability
- developer experience
- consistency antara frontend dan backend

---

## 3.3 Frontend

Frontend menggunakan:

- React
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

React digunakan untuk membangun UI component.

Tailwind CSS digunakan untuk styling.

Framer Motion digunakan untuk animation dan interaction terutama pada fitur yang memiliki emotional experience seperti:

- Letters
- Open When
- Memories
- Timeline
- page transitions
- modal interactions

---

## 3.4 Backend

Backend menggunakan kemampuan server-side Next.js:

- Server Components
- Server Actions
- Route Handlers
- Middleware jika diperlukan

Business logic tidak boleh ditempatkan langsung di UI component.

Logic yang digunakan oleh beberapa bagian sistem harus dipisahkan ke dalam service atau server-side modules.

---

## 3.5 Database

**MySQL**

MySQL digunakan sebagai relational database utama.

Database menyimpan:

- users
- relationships
- memories
- timeline events
- letters
- trips
- places
- songs
- future items
- important dates
- game data
- media metadata

---

## 3.6 ORM

**Prisma ORM**

Prisma digunakan sebagai database access layer.

Tanggung jawab Prisma:

- database queries
- relations
- migrations
- schema definition
- type-safe database access

Database schema didefinisikan melalui:

```text
prisma/schema.prisma
```

---

## 3.7 Identity

Sistem tidak menggunakan authentication provider. **Auth.js tidak dipakai.**

Identitas ditentukan oleh penanda "aku siapa" di sisi perangkat:

- pemakai memilih dirinya di antara dua anggota relationship
- pilihan diingat pada perangkat tersebut
- pilihan dapat diganti kapan saja
- pilihan bersifat per perangkat

Penanda ini menentukan atribusi penulis, bukan hak akses, dan tidak boleh diperlakukan sebagai
mekanisme security.

---

## 3.8 Storage

Media menggunakan storage abstraction.

### Development

Local filesystem atau local storage.

### Production

S3-compatible object storage.

Contoh:

- Amazon S3
- Cloudflare R2
- Supabase Storage
- provider S3-compatible lainnya

Application tidak boleh bergantung langsung pada provider tertentu.

---

## 3.9 Build and Development

Project menggunakan:

- Next.js
- npm/pnpm
- ESLint
- TypeScript
- Prisma
- Git

---

# 4. High-Level Architecture

Arsitektur aplikasi:

```text
┌──────────────────────────────┐
│           Browser            │
│      Mobile / Desktop        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│           Next.js            │
│                              │
│  App Router                  │
│  Server Components           │
│  Client Components           │
│  Server Actions              │
│  Route Handlers              │
│  Middleware                  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Application Layer       │
│                              │
│  Services                    │
│  Validation                  │
│  Relationship Context        │
│  Domain Logic                │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Prisma ORM           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│           MySQL              │
└──────────────────────────────┘

               │
               ▼
┌──────────────────────────────┐
│       Media Storage          │
│ Local / S3-compatible        │
└──────────────────────────────┘
```

---

# 5. Architectural Principles

## 5.1 Relationship-Centric

Relationship merupakan root ownership utama sistem.

Hampir seluruh data pengguna berasal dari relationship.

```text
User
  ↓
Relationship
  ↓
Shared Resources
```

---

## 5.2 Private by Design

Produk tidak memiliki permukaan berbagi publik.

Privasi bertumpu pada alamat deployment yang tidak dipublikasikan, penolakan pengindeksan mesin
pencari, dan tidak keluarnya data ke pihak ketiga.

Tidak ada kontrol akses: siapa pun yang mengetahui alamatnya memperoleh akses penuh. Ini risiko
yang diterima, tercatat pada Accepted Risks di konstitusi.

---

## 5.3 Server-Side Business Logic

Validasi dan business rule wajib dilakukan pada server.

Frontend hanya bertanggung jawab terhadap UI.

Validasi di frontend hanya untuk UX dan tidak menggantikan validasi server.

---

## 5.4 Separation of Concerns

UI, business logic, validation, relationship context, dan database access harus memiliki tanggung jawab yang jelas.

---

## 5.5 Avoid Premature Overengineering

MVP harus menggunakan solusi sederhana terlebih dahulu.

External services hanya digunakan jika benar-benar diperlukan.

---

# 6. Domain Architecture

Domain utama aplikasi berpusat pada:

```text
Relationship
```

Relationship memiliki dua anggota utama:

```text
Relationship
├── User A
└── User B
```

Relationship memiliki resource bersama:

```text
Relationship
├── Timeline Events
├── Memories
├── Letters
├── Open When Letters
├── Trips
├── Places
├── Songs
├── Future Items
├── Important Dates
└── Couple Activities
```

---

# 7. Core Domain Modules

## 7.1 Identity

Tanggung jawab:

- menyediakan dua anggota relationship untuk dipilih
- mengingat pilihan pada perangkat
- mengganti pilihan
- profil anggota (nama panggilan, foto opsional)

---

## 7.2 Relationship

Contoh model:

```text
Relationship
- id
- name
- started_at
- description
- cover_media_id
- created_at
- updated_at
```

Relationship menjadi ownership root untuk data bersama.

---

# 8. Timeline Architecture

Model:

```text
TimelineEvent
- id
- relationship_id
- title
- description
- event_date
- location
- type
- cover_media_id
- created_by
- created_at
- updated_at
```

Event types:

```text
first_met
first_chat
first_date
anniversary
birthday
trip
milestone
custom
```

Timeline event dapat dikaitkan dengan:

- Memory
- Trip
- Place
- Song

Relasi tersebut digunakan jika memiliki kebutuhan bisnis yang jelas.

---

# 9. Memories Architecture

Model utama:

```text
Memory
- id
- relationship_id
- title
- description
- memory_date
- location
- created_by
- created_at
- updated_at
```

Media dipisahkan dari Memory agar dapat digunakan oleh berbagai domain.

```text
Media
- id
- relationship_id
- attachable_type
- attachable_id
- type
- path
- thumbnail_path
- metadata
- created_by
- created_at
- updated_at
```

Media dapat digunakan oleh:

- Memories
- Trips
- Timeline Events
- Places

---

# 10. Letters Architecture

Model:

```text
Letter
- id
- relationship_id
- sender_id
- recipient_id
- title
- content
- available_at
- opened_at
- created_at
- updated_at
```

Letter memiliki lifecycle:

```text
Draft
   ↓
Scheduled
   ↓
Available
   ↓
Opened
```

Status dapat ditentukan berdasarkan data seperti:

```text
available_at
opened_at
```

Scheduled letter tidak boleh dibuka sebelum `available_at`.

Letter yang belum tersedia harus ditampilkan sebagai tersegel, dan isinya tidak boleh dikirim ke
client sebelum waktunya. Aturan ini merupakan business rule di server, bukan authorization.

---

# 11. Open When Architecture

Model:

```text
OpenWhenLetter
- id
- relationship_id
- sender_id
- recipient_id
- title
- trigger
- content
- created_at
- updated_at
```

Contoh trigger:

```text
sad
miss_me
angry
cant_sleep
need_motivation
need_a_hug
birthday
happy
custom
```

Open When Letter bersifat private dalam relationship.

---

# 12. Places Architecture

Model:

```text
Place
- id
- relationship_id
- name
- address
- latitude
- longitude
- description
- first_visited_at
- created_at
- updated_at
```

Place dapat dikaitkan dengan:

- Memories
- Trips
- Timeline Events

Map integration bukan requirement MVP.

---

# 13. Next Trips Architecture

Trip merupakan salah satu domain utama.

Model:

```text
Trip
- id
- relationship_id
- title
- destination
- description
- start_date
- end_date
- status
- cover_media_id
- budget_limit
- created_by
- created_at
- updated_at
```

Status:

```text
planned
ongoing
completed
cancelled
```

`budget_limit` digunakan untuk menyimpan batas anggaran perjalanan.

Pengeluaran aktual disimpan melalui `TripExpense`.

---

# 14. Trip Itinerary Architecture

Trip memiliki beberapa TripDay.

```text
Trip
└── TripDay
```

Model:

```text
TripDay
- id
- trip_id
- date
- title
- order
```

Setiap TripDay memiliki aktivitas:

```text
TripDay
└── TripActivity
```

Model:

```text
TripActivity
- id
- trip_day_id
- title
- description
- start_time
- end_time
- location
- estimated_cost
- order
```

---

# 15. Trip Budget Architecture

Model:

```text
TripExpense
- id
- trip_id
- title
- category
- estimated_amount
- actual_amount
- paid_by
- created_by
- created_at
- updated_at
```

Kategori:

```text
transportation
accommodation
food
activity
shopping
other
```

Trip Budget dapat menghitung:

```text
Total Estimated
Total Actual
Remaining Budget
Budget Difference
```

`Remaining Budget` dihitung berdasarkan:

```text
budget_limit - actual_total
```

Jika `budget_limit` tidak tersedia, sistem tetap dapat menampilkan total expense tanpa budget comparison.

---

# 16. Trip Checklist Architecture

Model:

```text
TripChecklistItem
- id
- trip_id
- title
- is_completed
- assigned_to
- created_by
- created_at
- updated_at
```

Checklist dapat diberikan kepada salah satu pasangan.

Contoh:

```text
Trip
├── Book hotel
├── Buy tickets
├── Prepare clothes
├── Charge camera
└── Prepare documents
```

---

# 17. Trip Relationships

Trip dapat menjadi pusat hubungan beberapa domain.

Secara konseptual:

```text
Trip
├── Trip Days
│   └── Activities
├── Expenses
├── Checklist
├── Memories
├── Places
├── Songs
└── Timeline Event
```

Tidak semua relasi harus diwajibkan.

Relasi hanya dibuat apabila memiliki nilai bisnis dan UX yang jelas.

---

# 18. Soundtrack Architecture

Model:

```text
Song
- id
- relationship_id
- title
- artist
- url
- cover_url
- story
- added_by
- created_at
- updated_at
```

Song dapat dikaitkan dengan:

- Memory
- Trip
- Timeline Event

Integrasi Spotify/YouTube bukan requirement MVP.

---

# 19. Our Future Architecture

Model:

```text
FutureItem
- id
- relationship_id
- title
- description
- category
- status
- target_date
- created_by
- completed_at
- created_at
- updated_at
```

Categories:

```text
bucket_list
destination
dream
goal
experience
```

Statuses:

```text
planned
in_progress
completed
```

---

# 20. Important Dates Architecture

Model:

```text
ImportantDate
- id
- relationship_id
- title
- date
- type
- description
- recurring
- created_at
- updated_at
```

Types:

```text
anniversary
birthday
first_met
first_date
custom
```

Recurring digunakan untuk event seperti:

- anniversary
- birthday

Countdown dihitung secara dinamis.

---

# 21. Couple Games Architecture

Couple Games merupakan domain yang dapat berkembang secara independen.

MVP dapat mencakup:

```text
Just For Us
├── Daily Question
├── Couple Quiz
└── Who Is More Likely?
```

Struktur data dapat dikembangkan sesuai kebutuhan masing-masing game.

Game logic tidak boleh mencampur logic dengan UI component.

---

# 22. Landing Page Architecture

Website utamanya adalah satu landing page panjang di `/` yang menampilkan seluruh bagian
hubungan sekaligus, disusun mengikuti alur PAST → NOW → FUTURE.

Landing page merupakan aggregation layer.

```text
/
├── Hero          — Relationship, counter
├── NOW           — Next Trip, Latest Letter, Important Date, Daily Question
├── PAST          — Timeline Event, Memory, Place, Song
└── FUTURE        — Future Item
```

Landing page tidak memiliki ownership terhadap data tersebut. Ia hanya membaca dari service tiap
domain.

Tiap section mengambil hanya sebagian kecil data yang ditampilkannya beserta tautan menuju
halaman penuh domain tersebut, bukan seluruh isi domain.

Karena satu halaman menggabungkan banyak domain, jumlah query dan ukuran payload landing page
harus dijaga; section yang berat dimuat secara bertahap.

---

# 23. Our Time Architecture

Our Time tidak perlu memiliki tabel khusus.

Durasi hubungan dihitung secara dinamis berdasarkan:

```text
Relationship.started_at
```

Contoh:

```text
2 Years
4 Months
17 Days
```

Tidak menyimpan:

```text
years
months
days
```

sebagai data statis karena nilainya selalu berubah.

---

# 24. Database Ownership

Seluruh resource relationship harus memiliki relationship ownership secara eksplisit.

Meskipun satu deployment hanya melayani satu relationship, `relationship_id` tetap disimpan agar
kontrol akses dapat ditambahkan di kemudian hari tanpa memigrasikan setiap tabel.

Contoh:

```text
Memory.relationship_id
Trip.relationship_id
Place.relationship_id
Song.relationship_id
FutureItem.relationship_id
ImportantDate.relationship_id
```

Resource yang ownership-nya dapat diturunkan secara aman dari parent dapat menggunakan parent relation.

Contoh:

```text
TripActivity
    ↓
TripDay
    ↓
Trip
    ↓
Relationship
```

Namun, `relationship_id` dapat ditambahkan jika diperlukan untuk performa query atau kejelasan
kepemilikan.

---

# 25. Access Model

Tidak ada authorization. Yang ada hanya relationship context.

## Relationship Context

Setiap request me-resolve relationship beserta kedua anggotanya di server.

```text
Request
   ↓
Resolve Relationship (satu-satunya pada deployment)
   ↓
Sediakan ke server-side logic
```

Relationship context dipakai untuk menentukan `relationship_id` saat membuat resource, bukan
untuk memutuskan boleh atau tidaknya sebuah akses.

## Atribusi

Penulis sebuah resource ditentukan oleh penanda identitas pada perangkat.

```text
Penanda perangkat → Member → created_by
```

Atribusi ini tidak terverifikasi dan tidak boleh dijadikan dasar aturan yang menuntut identitas
tepercaya.

---

# 26. Server Actions

Server Actions digunakan untuk operasi yang bersifat mutation dan cocok dilakukan langsung melalui Next.js.

Contoh:

```text
createMemory()
updateMemory()
deleteMemory()

createTrip()
updateTrip()
deleteTrip()

createLetter()
scheduleLetter()

createFutureItem()
updateFutureItem()
```

Server Action harus:

1. memvalidasi input
2. mengambil `relationship_id` dari relationship context di server, bukan dari input client
3. menjalankan business logic
4. mengubah database
5. mengembalikan result yang aman

---

# 27. Route Handlers

Route Handlers digunakan ketika membutuhkan HTTP endpoint.

Contoh penggunaan:

```text
/api/upload
/api/health
```

Route Handlers dapat digunakan untuk:

- external integrations
- webhooks
- upload endpoints
- machine-to-machine communication
- endpoints yang membutuhkan HTTP API

Tidak semua CRUD harus dibuat sebagai REST API.

---

# 28. Validation Architecture

Input validation harus dilakukan di server.

Schema validation dapat menggunakan library seperti:

```text
Zod
```

Contoh:

```text
createTripSchema
createMemorySchema
createLetterSchema
createExpenseSchema
```

Frontend validation digunakan untuk UX.

Server validation tetap wajib dilakukan untuk security dan data integrity.

---

# 29. Error Handling

Error harus dibedakan menjadi:

```text
Validation Error
Not Found
Business Logic Error
Unexpected Server Error
```

User tidak boleh menerima raw database error atau internal stack trace.

Error response harus aman dan mudah dipahami.

---

# 30. Media Architecture

Flow upload:

```text
User
 ↓
Upload Media
 ↓
Validate File
 ↓
Store File
 ↓
Create Media Record (relationship_id dari context)
 ↓
Associate With Resource
```

Validation mencakup:

- MIME type
- file extension
- file size
- image dimensions jika diperlukan

Media disimpan dengan relationship ownership pada metadata-nya. Karena tidak ada kontrol akses,
media tidak terlindungi dari siapa pun yang mengetahui alamat aplikasi — termasuk risiko yang
diterima.

---

# 31. Scheduled Operations

Beberapa fitur membutuhkan waktu sebagai bagian dari business logic.

Contoh:

- scheduled letters
- upcoming important dates
- trip reminders

Scheduled letter tidak harus memiliki database status yang diperbarui setiap menit.

Status dapat dihitung dari:

```text
available_at
opened_at
```

Background jobs hanya digunakan jika memang diperlukan untuk:

- notification
- email
- push notification
- media processing
- periodic recap

---

# 32. Notification Architecture

Notification bukan core dependency MVP.

Future architecture dapat mendukung:

```text
Application
   ↓
Notification Service
   ├── Email
   ├── Web Push
   └── Push Notification
```

Contoh event:

```text
LetterAvailable
ImportantDateUpcoming
TripStartingSoon
```

Notification system harus dapat ditambahkan tanpa mengubah domain logic utama.

---

# 33. Frontend Architecture

Frontend menggunakan component-based architecture.

Struktur:

```text
components/
├── ui/
├── layout/
├── landing/
├── home/
├── story/
├── memories/
├── letters/
├── open-when/
├── trips/
├── places/
├── soundtrack/
├── future/
├── just-for-us/
├── time/
└── important-dates/
```

---

# 34. UI Components

Reusable UI component ditempatkan di:

```text
components/ui/
```

Contoh:

```text
Button
Dialog
Input
Textarea
Select
Card
Modal
Badge
Calendar
Dropdown
Tabs
```

Domain-specific component ditempatkan pada folder masing-masing.

Contoh:

```text
components/trips/
├── TripCard.tsx
├── TripCountdown.tsx
├── TripOverview.tsx
├── TripItinerary.tsx
├── TripBudget.tsx
└── TripChecklist.tsx
```

---

# 35. Application Structure

Struktur utama:

```text
our-little-universe/
│
├── app/
│   ├── (app)/
│   │   ├── page.tsx
│   │   ├── story/
│   │   ├── memories/
│   │   ├── letters/
│   │   ├── open-when/
│   │   ├── trips/
│   │   ├── places/
│   │   ├── soundtrack/
│   │   ├── future/
│   │   ├── just-for-us/
│   │   ├── time/
│   │   ├── important-dates/
│   │   └── settings/
│   │
│   ├── api/
│   │   └── ...
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── actions/
│   ├── memories.ts
│   ├── letters.ts
│   ├── trips.ts
│   ├── places.ts
│   ├── soundtrack.ts
│   ├── future.ts
│   └── important-dates.ts
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── home/
│   ├── story/
│   ├── memories/
│   ├── letters/
│   ├── open-when/
│   ├── trips/
│   ├── places/
│   ├── soundtrack/
│   ├── future/
│   └── just-for-us/
│
├── lib/
│   ├── identity/
│   ├── db/
│   ├── storage/
│   ├── validations/
│   ├── services/
│   └── utils/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── hooks/
├── types/
├── public/
│
├── middleware.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── ...
```

---

# 36. Routing Architecture

Menggunakan Next.js App Router.

`/` adalah landing page panjang yang menampilkan seluruh section. Navigasi utama berupa anchor ke
section pada halaman tersebut.

Halaman detail dan tampilan penuh tiap domain tetap memiliki route tersendiri.

Routes:

```text
/
/story
/memories
/memories/[memoryId]

/letters
/letters/[letterId]

/open-when

/trips
/trips/[tripId]
/trips/[tripId]/itinerary
/trips/[tripId]/budget
/trips/[tripId]/checklist

/places
/places/[placeId]

/soundtrack

/future

/just-for-us
/just-for-us/questions
/just-for-us/quiz
/just-for-us/who-is-more-likely

/time

/important-dates

/settings
```

Tidak ada protected route. Seluruh route dapat diakses tanpa authentication.

Route yang membutuhkan atribusi penulis meminta pemilihan identitas lebih dulu bila belum ada
penanda pada perangkat.

---

# 37. Server and Client Components

Default menggunakan **Server Components** jika interactivity tidak diperlukan.

Gunakan **Client Components** ketika membutuhkan:

- browser APIs
- local state
- event handlers
- animations
- interactive forms
- drag and drop
- media interaction

Jangan menjadikan seluruh application sebagai Client Component tanpa alasan.

---

# 38. Data Fetching Architecture

Data yang bersifat read-heavy dan tidak membutuhkan browser interactivity dapat diambil melalui Server Components.

Mutation dapat menggunakan:

- Server Actions
- Route Handlers jika membutuhkan HTTP API

Data fetching harus mempertimbangkan:

- caching
- revalidation
- query efficiency

Jangan mengambil seluruh relationship data jika halaman hanya membutuhkan sebagian data.

---

# 39. Caching and Performance

Performance strategy:

- Server Components by default
- selective Client Components
- optimized database queries
- pagination untuk collection besar
- lazy loading media
- responsive images
- Next.js Image optimization
- caching untuk data yang aman di-cache
- revalidation jika diperlukan

Memory gallery dan media-heavy pages harus dirancang untuk tetap ringan ketika jumlah data bertambah.

---

# 40. Security Architecture

Sistem tidak memiliki kontrol akses. Security requirement yang tetap berlaku:

- pencegahan pengindeksan mesin pencari
- alamat deployment tidak dipublikasikan
- input validation di server
- CSRF protection sesuai mekanisme framework, agar situs lain tidak dapat memicu mutation dari
  peramban pasangan
- rate limiting pada endpoint upload dan endpoint mahal lainnya
- secure file upload; berkas yang diunggah tidak boleh dapat dieksekusi server
- environment variable protection
- tidak ada konten privat pada log, pesan error, maupun telemetri

Secret dan credential tidak boleh disimpan di source code.

---

# 41. Environment Configuration

Configuration menggunakan environment variables.

Contoh:

```text
DATABASE_URL=
STORAGE_ENDPOINT=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_BUCKET=
```

Environment-specific configuration harus dipisahkan antara:

```text
Development
Production
```

`.env` tidak boleh di-commit ke repository.

---

# 42. Testing Architecture

Testing minimal mencakup:

## Unit Testing

Untuk:

- utility functions
- date calculations
- countdown logic
- business rules

## Integration Testing

Untuk:

- database operations
- constraint integritas data
- server actions
- domain workflows

## End-to-End Testing

Untuk critical flows:

```text
Pilih Identitas
→ Home
→ Create Memory
→ Create Trip
→ Create Letter
→ Open Letter
```

Flow yang menyangkut integritas data dan perhitungan harus mendapatkan prioritas testing.

---

# 43. Database Migration

Prisma migrations digunakan untuk perubahan database.

Flow:

```text
Modify schema.prisma
        ↓
Create migration
        ↓
Review migration
        ↓
Apply migration
```

Migration tidak boleh dilakukan dengan perubahan manual yang tidak tercatat pada schema/migration system.

---

# 44. Seed Data

Development environment dapat memiliki seed data untuk:

- users
- relationship
- memories
- timeline events
- trips
- letters
- places
- songs
- future items
- important dates

Seed data membantu development dan testing.

---

# 45. Logging and Observability

Application harus memiliki logging untuk error penting.

Minimal:

- database errors
- upload errors
- unexpected server errors

Sensitive information tidak boleh dimasukkan ke log.

Future dapat menambahkan error monitoring seperti Sentry atau service sejenis.

---

# 46. Backup Strategy

Database production harus memiliki backup secara berkala.

Minimal backup:

```text
MySQL Database
+
Object Storage Media
```

Database backup dan media backup harus dipertimbangkan sebagai dua jenis data berbeda.

Backup harus dapat dipulihkan, bukan hanya dibuat.

---

# 47. Deployment Architecture

Production deployment secara umum:

```text
User
 ↓
Domain
 ↓
Next.js Application
 ↓
MySQL Database
 ↓
Object Storage
```

Next.js dapat di-deploy menggunakan platform seperti:

- Vercel
- VPS
- containerized environment
- platform Node.js lainnya

Database dan object storage dapat berada pada infrastructure yang berbeda dari application server.

---

# 48. CI/CD

Future CI/CD pipeline dapat mencakup:

```text
Git Push
   ↓
Install Dependencies
   ↓
Lint
   ↓
Type Check
   ↓
Test
   ↓
Build
   ↓
Deploy
```

Production deployment hanya dilakukan apabila required checks berhasil.

---

# 49. Design Architecture

Design language:

```text
Modern
Personal
Romantic
Minimal
Editorial
Scrapbook
Warm
Elegant
```

UI harus menghindari tampilan generic SaaS.

Hindari:

- excessive cards
- excessive gradients
- excessive icons
- overly bright colors
- unnecessary statistics
- corporate dashboard aesthetic
- excessive gamification

---

# 50. Responsive Architecture

Design harus menggunakan pendekatan:

```text
Mobile First
      ↓
Tablet
      ↓
Desktop
```

Fitur utama harus dapat digunakan dengan nyaman pada smartphone.

Prioritas mobile:

- Memories
- Letters
- Open When
- Trips
- Story
- Important Dates

---

# 51. Future Architecture

Fitur yang dapat ditambahkan tanpa mengubah fondasi utama:

- PWA
- push notifications
- email notifications
- map integration
- Spotify integration
- YouTube integration
- shared calendar
- voice notes
- video notes
- yearly recap
- memory recap
- AI-generated captions
- AI-generated relationship recap
- advanced couple games
- offline support

External integrations harus bersifat modular.

---

# 52. External Integration Principle

External service tidak boleh menjadi dependency wajib untuk core functionality.

Contoh:

Jika Spotify integration tidak tersedia, Soundtrack tetap harus berfungsi.

Jika map provider tidak tersedia, Places tetap dapat menyimpan:

```text
name
address
description
```

Jika notification provider tidak tersedia, scheduled letter tetap harus dapat digunakan melalui application.

---

# 53. Data Flow Example — Creating a Memory

```text
User
 ↓
Memory Form
 ↓
Client Validation
 ↓
Server Action
 ↓
Server Validation
 ↓
Relationship Context
 ↓
Media Upload
 ↓
Prisma
 ↓
MySQL
 ↓
Revalidate Page
 ↓
Updated Memory UI
```

---

# 54. Data Flow Example — Opening a Scheduled Letter

```text
User
 ↓
Letter Detail
 ↓
Recipient Check
 ↓
Check available_at
 ↓
Is available?
 ├── No → Show locked state
 │
 └── Yes
      ↓
   Open Letter
      ↓
   Set opened_at
      ↓
   Save to MySQL
      ↓
   Show Letter Content
```

---

# 55. Data Flow Example — Next Trip

```text
User
 ↓
Trips
 ↓
Select Trip
 ↓
Trip Detail
 ├── Overview
 ├── Countdown
 ├── Itinerary
 ├── Budget
 ├── Checklist
 └── Memories
```

Trip menjadi aggregation point untuk pengalaman perjalanan.

---

# 56. Architectural Constraints

Beberapa constraint utama:

1. Hanya dua anggota utama dalam relationship, dan satu relationship per deployment.
2. Tidak ada authentication, session, maupun authorization.
3. Business logic dan validasi dilakukan server-side.
4. Core functionality tidak boleh bergantung pada external API.
5. Media harus memiliki ownership relationship.
6. Relationship duration dihitung secara dinamis.
7. Scheduled letter tidak dapat dibuka sebelum waktunya.
8. Database merupakan source of truth untuk persistent data.
9. Frontend tidak boleh menjadi tempat utama business logic.
10. Application harus tetap nyaman digunakan pada mobile.

---

# 57. Architectural Decisions

## Decision 1 — Next.js

Next.js dipilih untuk menggabungkan frontend dan server-side application dalam satu project.

## Decision 2 — Prisma

Prisma digunakan sebagai type-safe ORM untuk MySQL.

## Decision 3 — Relationship-Centric Data

Relationship menjadi ownership boundary untuk seluruh shared resources.

## Decision 4 — Tanpa Authentication

Aplikasi berjalan tanpa gerbang masuk atas keputusan pemilik produk. Privasi bertumpu pada alamat
deployment yang tidak dipublikasikan dan tidak adanya permukaan berbagi publik. `relationship_id`
tetap disimpan agar authentication dapat ditambahkan kelak tanpa merombak skema.

## Decision 5 — Storage Abstraction

Media storage dibuat provider-independent agar deployment dapat berpindah tanpa mengubah domain logic.

## Decision 6 — Server Components by Default

Server Components digunakan sebagai default untuk mengurangi client-side JavaScript dan menjaga performa.

## Decision 7 — Minimal External Dependencies

External integrations bersifat optional dan tidak boleh menjadi dependency core application.

---

# 58. Recommended Project Development Order

Pengembangan dilakukan secara bertahap:

```text
1. Project Setup
        ↓
2. Relationship
        ↓
3. Identity Marker
        ↓
4. Database Foundation
        ↓
5. Home
        ↓
6. Our Story
        ↓
7. Memories
        ↓
8. Places
        ↓
9. Soundtrack
        ↓
10. Next Trips
        ↓
11. Trip Itinerary
        ↓
12. Trip Budget
        ↓
13. Trip Checklist
        ↓
14. Our Future
        ↓
15. Letters
        ↓
16. Open When
        ↓
17. Important Dates
        ↓
18. Our Time
        ↓
19. Just For Us
        ↓
20. Testing
        ↓
21. Performance
        ↓
22. Deployment
```

---

# 59. Architectural Principle

Our Little Universe harus tetap sederhana untuk digunakan, tetapi memiliki struktur yang cukup kuat untuk menyimpan perjalanan hubungan selama bertahun-tahun.

Arsitektur harus mendukung konsep:

> **A private digital home that grows with the relationship.**

Sistem bukan sekadar kumpulan CRUD.

Setiap domain harus saling melengkapi untuk membentuk satu pengalaman:

```text
PAST
├── Our Story
├── Memories
├── Places
└── Soundtrack

NOW
├── Home
├── Letters
├── Open When
├── Just For Us
└── Important Dates

FUTURE
├── Next Trips
├── Our Future
├── Dreams
└── Goals
```

Pada akhirnya:

```text
Our Little Universe
        ↓
Our Past
        ↓
Our Present
        ↓
Our Future
        ↓
Our Life Together
```

Architecture harus selalu mengutamakan:

**privacy, simplicity, emotional experience, maintainability, dan long-term extensibility.**
