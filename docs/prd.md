# Product Requirements Document (PRD)

## Our Little Universe

> **Catatan revisi (2026-09-09)** — Authentication dihapus dari produk atas keputusan pemilik
> produk. Aplikasi berjalan tanpa login, akun berkredensial, maupun session. Identitas penulis
> ditentukan lewat penanda "aku siapa" yang diingat perangkat. Konsekuensinya tercatat pada
> `.specify/memory/constitution.md` v2.0.0 (Prinsip I dan bagian Accepted Risks). Bagian 7, 8, 9,
> 6.17, 18, dan 20 di bawah sudah menyesuaikan.
>
> Pada tanggal yang sama, bentuk situs ditetapkan sebagai **satu landing page panjang** di `/`
> yang menampilkan seluruh bagian hubungan, dengan halaman detail tiap domain tetap ada.
> Bagian 5, 6.1, 13, dan 17 sudah menyesuaikan.

---

# 1. Product Overview

**Our Little Universe** adalah aplikasi web privat yang dibuat khusus untuk dua orang yang sedang menjalani hubungan.

Aplikasi ini menjadi ruang digital bersama untuk menyimpan kenangan, mencatat perjalanan hubungan, menulis surat, merencanakan perjalanan, menyimpan tempat dan lagu yang memiliki arti khusus, serta mencatat berbagai hal yang ingin dilakukan bersama di masa depan.

Produk ini bukan ditujukan sebagai social media, dating platform, atau aplikasi komunitas.

Konsep utamanya adalah:

> **A private digital home for two people.**

Our Little Universe dirancang sebagai tempat yang dapat terus bertumbuh seiring perjalanan hubungan.

---

# 2. Product Vision

Our Little Universe bertujuan menjadi arsip digital kehidupan sebuah hubungan.

Produk membagi pengalaman hubungan ke dalam tiga dimensi utama:

### PAST

Hal-hal yang sudah dilalui bersama.

- Memories
- Our Story
- Our Places
- Our Soundtrack

### NOW

Hal-hal yang sedang dirasakan dan dilakukan saat ini.

- Home
- Letters
- Open When
- Daily Questions
- Couple Games
- Important Dates

### FUTURE

Hal-hal yang ingin dilakukan bersama.

- Next Trips
- Our Future
- Bucket List
- Dreams
- Goals
- Experiences

Sehingga secara keseluruhan:

> **PAST → NOW → FUTURE → OUR LIFE TOGETHER**

---

# 3. Target Users

## Primary Users

Pasangan yang ingin memiliki ruang digital privat untuk menyimpan dan menikmati perjalanan hubungan mereka.

Sistem dirancang untuk **tepat dua orang dalam satu relationship**.

Contoh:

```text
Relationship
├── User A
└── User B
```

Tidak terdapat konsep public follower, public profile, atau komunitas pada MVP.

---

# 4. Core User Experience

Pengguna harus merasa bahwa aplikasi ini:

- personal
- intimate
- warm
- private
- emotional
- nostalgic
- elegant
- easy to use

Aplikasi tidak boleh terasa seperti dashboard administrasi atau aplikasi SaaS biasa.

Pengguna harus dapat membuka aplikasi dan merasa seperti sedang memasuki:

> **“Dunia kecil milik kami berdua.”**

---

# 5. Main Navigation

Website utamanya adalah **satu landing page panjang** di `/` yang menampilkan seluruh bagian
hubungan sekaligus, disusun mengikuti alur PAST → NOW → FUTURE.

Landing page bukan dashboard berisi ringkasan card, melainkan halaman naratif yang dibaca sambil
di-scroll.

```text
/
├── Hero — nama berdua, relationship counter
├── NOW    — next trip, letter terbaru, tanggal penting, daily question
├── PAST   — our story, memories, places, soundtrack
└── FUTURE — bucket list, dreams, goals
```

Navigasi utama berupa anchor ke section pada landing page:

```text
Our Story
Memories
Letters
Open When
Next Trips
Places
Soundtrack
Our Future
Just For Us
Our Time
Important Dates
```

Setiap domain tetap memiliki halaman tersendiri untuk tampilan penuh dan detail:

```text
/memories
/memories/[id]
/trips/[id]
/letters/[id]
...
```

Landing page menampilkan sebagian isi tiap domain beserta tautan menuju halaman penuhnya.

Susunan section dapat disesuaikan pada implementasi frontend selama seluruh fitur utama tetap
mudah ditemukan dari landing page.

---

# 6. Feature Requirements

# 6.1 Home — Our World

Home adalah landing page di `/`, halaman utama yang langsung terbuka saat aplikasi diakses.

Home menampilkan seluruh bagian hubungan dalam satu halaman panjang, bukan ringkasan card ala
dashboard.

Bagian di bawah ini adalah isi minimum yang harus tampil; section lain menyusul sesuai urutan
PAST → NOW → FUTURE pada bagian 5.

### Informasi yang ditampilkan

- Greeting berdasarkan waktu
- Nama kedua pasangan
- Relationship counter
- Daily message
- Next Trip
- Countdown trip
- Recent Memory
- Upcoming Important Date
- Latest Letter
- One item dari Our Future
- Quick actions

### Relationship Counter

Sistem menghitung durasi hubungan secara dinamis berdasarkan:

```text
relationship.started_at
```

Contoh:

```text
2 Years
4 Months
17 Days
```

Counter harus berubah secara otomatis tanpa perlu menyimpan durasi sebagai data statis.

### Next Trip

Jika terdapat trip yang akan datang, Home menampilkan:

```text
Bali
42 DAYS TO GO
20 — 25 October 2026
```

Jika trip berlangsung hari ini:

```text
TODAY'S THE DAY!
```

Jika tidak ada trip:

```text
No upcoming trips.
Maybe it's time to plan one.
```

---

# 6.2 Our Story

Our Story merupakan timeline perjalanan hubungan.

Pengguna dapat membuat event yang menggambarkan momen penting dalam hubungan.

### Event Types

- First Met
- First Chat
- First Date
- Anniversary
- Birthday
- Trip
- Milestone
- Custom

### Data Event

Setiap event dapat memiliki:

- Title
- Description
- Date
- Location
- Cover photo/media
- Event type
- Created by

### Requirements

User dapat:

- melihat timeline
- membuat event
- mengedit event
- menghapus event
- membuka detail event

Timeline ditampilkan secara kronologis.

---

# 6.3 Memories

Memories merupakan tempat menyimpan foto, video, dan cerita dari berbagai momen.

### Memory Data

- Title
- Description/story
- Date
- Location
- Media
- Created by

### Requirements

User dapat:

- membuat memory
- upload foto/video
- melihat memory
- mengedit memory
- menghapus memory
- menghubungkan memory dengan konteks lain jika tersedia

Memory dapat dikaitkan dengan:

- Trip
- Place
- Song
- Timeline Event

### Gallery

Gallery harus mendukung:

- responsive grid
- thumbnail
- media preview
- detail view
- lazy loading jika diperlukan

---

# 6.4 Letters

Letters memungkinkan pasangan menulis surat digital untuk satu sama lain.

### Letter States

```text
Draft
Scheduled
Available
Opened
```

### Letter Data

- Sender
- Recipient
- Title
- Content
- Available at
- Opened at
- Status

### Requirements

User dapat:

- membuat draft
- menyimpan draft
- mengirim surat
- menjadwalkan surat
- melihat surat yang tersedia
- membuka surat
- melihat status surat

### Scheduled Letter

Surat yang dijadwalkan tidak boleh dibuka sebelum waktu:

```text
available_at
```

Contoh:

```text
Available:
14 February 2027
00:00
```

Sebelum waktunya:

```text
This letter is still sealed.

Open on February 14, 2027.
```

---

# 6.5 Open When

Open When adalah fitur surat khusus berdasarkan kondisi atau situasi tertentu.

Contoh:

- Open when you're sad
- Open when you miss me
- Open when you're angry
- Open when you can't sleep
- Open when you need motivation
- Open when you need a hug
- Open when it's your birthday
- Open when you're happy

### Data

- Title
- Trigger
- Content
- Sender
- Recipient

### UX

Surat ditampilkan seperti sebuah envelope.

Ketika dibuka, sistem dapat menggunakan animation untuk memberikan pengalaman emosional.

---

# 6.6 Next Trips

Next Trips digunakan untuk merencanakan perjalanan bersama.

Trip dapat memiliki dua fungsi:

1. Merencanakan perjalanan yang akan datang.
2. Menyimpan perjalanan yang sudah selesai.

### Trip Data

- Title
- Destination
- Description
- Start date
- End date
- Status
- Cover media
- Budget limit
- Created by

### Status

```text
Planned
Ongoing
Completed
Cancelled
```

### Countdown

Jika trip belum dimulai:

```text
42 DAYS TO GO
```

Jika trip berlangsung hari ini:

```text
TODAY'S THE DAY!
```

Jika trip telah selesai:

```text
TRIP COMPLETED
```

### Trip Detail

Trip detail terdiri dari:

```text
Overview
Itinerary
Budget
Checklist
Memories
```

---

# 6.7 Trip Itinerary

Setiap trip dapat memiliki itinerary berdasarkan hari.

### Trip Day

Contoh:

```text
Day 1
20 October 2026
Arrival & Exploring
```

### Trip Activity

Setiap aktivitas memiliki:

- Title
- Description
- Start time
- End time
- Location
- Estimated cost
- Order

Contoh:

```text
10:00
Breakfast

12:00
Visit Tanah Lot

15:00
Lunch

19:00
Dinner
```

User dapat:

- membuat hari perjalanan
- menambahkan aktivitas
- mengubah urutan aktivitas
- mengedit aktivitas
- menghapus aktivitas

---

# 6.8 Trip Budget

Trip Budget digunakan untuk mencatat estimasi dan pengeluaran perjalanan.

### Expense Categories

- Transportation
- Accommodation
- Food
- Activity
- Shopping
- Other

### Expense Data

- Title
- Category
- Estimated amount
- Actual amount
- Paid by
- Created at

### Requirements

User dapat:

- menambahkan expense
- mengedit expense
- menghapus expense
- melihat total estimasi
- melihat total aktual
- melihat selisih estimasi dan aktual

Jika trip memiliki budget limit:

```text
Budget Limit
Rp5.000.000

Estimated
Rp4.500.000

Actual
Rp4.200.000
```

---

# 6.9 Trip Checklist

Checklist membantu pasangan mempersiapkan perjalanan.

Contoh:

```text
☐ Book hotel
☐ Buy train tickets
☐ Prepare clothes
☐ Charge camera
☐ Bring passport
☐ Prepare medicine
```

Checklist dapat diberikan kepada salah satu pasangan.

### Data

- Title
- Completed status
- Assigned user
- Trip

### Requirements

User dapat:

- menambahkan item
- menandai selesai
- mengubah assignment
- mengedit
- menghapus

---

# 6.10 Trip → Memory

Setelah sebuah trip selesai, user dapat menghubungkan perjalanan dengan memories.

Contoh:

```text
Trip:
Bali Trip 2026

Memories:
- Sunset at Seminyak
- Dinner Together
- Tanah Lot
```

Trip dapat menjadi titik pusat yang menghubungkan:

```text
Trip
├── Itinerary
├── Budget
├── Checklist
├── Memories
├── Places
├── Songs
└── Story Event
```

Tujuannya agar sebuah perjalanan tidak hanya menjadi data trip, tetapi menjadi bagian dari sejarah hubungan.

---

# 6.11 Our Places

Our Places menyimpan tempat-tempat yang pernah dikunjungi bersama.

### Place Data

- Name
- Address
- Latitude
- Longitude
- Description
- First visited at

### Requirements

User dapat:

- menambahkan tempat
- melihat daftar tempat
- melihat detail tempat
- mengedit tempat
- menghapus tempat

Place dapat dikaitkan dengan:

- Memories
- Trips
- Timeline Events

### Future

Integrasi map dapat ditambahkan setelah MVP.

---

# 6.12 Our Soundtrack

Our Soundtrack adalah kumpulan lagu yang memiliki arti bagi hubungan.

### Song Data

- Title
- Artist
- URL
- Cover URL
- Story
- Added by

Sebuah lagu dapat dikaitkan dengan:

- Memory
- Trip
- Timeline Event

Contoh:

```text
Song:
Until I Found You

Story:
"The song we listened to during our first trip together."
```

### Future Integration

Integrasi Spotify atau YouTube dapat ditambahkan sebagai fitur post-MVP.

---

# 6.13 Our Future

Our Future adalah tempat menyimpan berbagai hal yang ingin dilakukan bersama.

Kategori:

- Bucket List
- Destination
- Dream
- Goal
- Experience

### Status

```text
Planned
In Progress
Completed
```

### Data

- Title
- Description
- Category
- Status
- Target date
- Created by
- Completed at

Contoh:

```text
☐ Visit Japan
☐ Watch sunrise together
☐ Learn to cook together
☐ Buy our first camera
☐ Go on a road trip
```

---

# 6.14 Just For Us

Fitur ringan untuk interaksi pasangan.

## Daily Question

Sistem memberikan pertanyaan harian.

Contoh:

> What's one thing you love about us?

User dapat memberikan jawaban.

## Couple Quiz

Quiz mengenai pasangan.

Contoh:

> Who said "I love you" first?

## Who Is More Likely?

Pertanyaan dengan pilihan:

```text
Who is more likely to fall asleep first?

Akbar
Partner
Both
```

Fitur permainan dapat dikembangkan lebih lanjut setelah MVP.

---

# 6.15 Our Time

Our Time menampilkan durasi hubungan secara lebih detail.

Contoh:

```text
OUR TIME TOGETHER

2 Years
4 Months
17 Days

Since
20 June 2024
```

Tanggal awal berasal dari:

```text
relationship.started_at
```

Perhitungan harus dinamis.

---

# 6.16 Important Dates

Important Dates menyimpan tanggal-tanggal penting.

Contoh:

- Anniversary
- Birthday
- First Met
- First Date
- Custom

### Data

- Title
- Date
- Type
- Description
- Recurring

### Requirements

User dapat:

- membuat tanggal
- mengedit tanggal
- menghapus tanggal
- melihat upcoming dates
- melihat countdown

Tanggal recurring dapat digunakan untuk anniversary dan birthday.

---

# 6.17 Identity

Sistem tidak memiliki authentication.

### Requirements

- Pemilih "aku siapa" berisi dua anggota relationship
- Pilihan diingat pada perangkat
- Pilihan dapat diganti kapan saja
- Profil anggota: nama panggilan dan foto opsional

### Relationship

Setiap anggota terkait dengan relationship yang ada pada deployment tersebut.

Satu relationship hanya memiliki dua anggota utama.

Anggota tidak memerlukan email maupun kredensial apa pun.

---

# 7. Relationship Data Model

Konsep utama aplikasi adalah:

```text
User
  ↓
Relationship
  ↓
Shared Resources
```

Shared resources:

```text
Timeline Events
Memories
Letters
Open When Letters
Trips
Places
Songs
Future Items
Important Dates
```

Semua resource relationship menyimpan kepemilikan melalui:

```text
relationship_id
```

Satu deployment hanya melayani satu relationship, sehingga isolasi antar-relationship bukan
persoalan runtime. `relationship_id` tetap disimpan agar kontrol akses dapat ditambahkan di
kemudian hari tanpa memigrasikan setiap tabel.

---

# 8. Access Model

Aplikasi tidak memiliki authentication dan tidak menegakkan kontrol akses.

### Rule

Siapa pun yang membuka alamat aplikasi memperoleh akses baca dan tulis penuh atas seluruh isinya.

Perlindungan yang tersisa hanya dua:

```text
alamat deployment tidak dipublikasikan
+
tidak ada permukaan berbagi publik di dalam produk
```

### Penanda Identitas

Pemakai menyatakan dirinya sebagai salah satu dari dua anggota melalui pemilih "aku siapa" yang
diingat pada perangkat.

Penanda ini menentukan atribusi penulis untuk Letters, Open When, `created_by`, dan penugasan
checklist.

Penanda ini bukan mekanisme security dan tidak menentukan data apa pun yang boleh dilihat atau
diubah.

### Risiko yang Diterima

Ketiadaan kontrol akses adalah keputusan sadar, bukan pekerjaan yang belum selesai.

Rinciannya tercatat pada bagian Accepted Risks di `.specify/memory/constitution.md`.

Menambahkan authentication di kemudian hari merupakan jalan keluarnya, dan skema data sudah
disiapkan untuk itu.

---

# 9. Privacy Requirements

Privacy merupakan requirement utama produk, dan kini bertumpu pada tidak adanya jalan keluar
data, bukan pada gerbang masuk.

### MVP

Semua data bersifat private dalam arti tidak dibagikan ke mana pun.

Tidak terdapat:

- public profile
- public memory
- public letters
- public trip
- public places
- public timeline
- public sharing

Aplikasi juga harus menolak diindeks mesin pencari, dan alamat deployment tidak boleh
dipublikasikan.

### Media

Media mengikuti ownership relationship pada model datanya.

Karena tidak ada kontrol akses, media tidak terlindungi dari siapa pun yang mengetahui alamat
aplikasi. Hal ini termasuk risiko yang diterima pada bagian 8.

### Data Keluar

Data relationship tidak boleh dikirim ke pihak ketiga mana pun kecuali diminta secara eksplisit
oleh fitur yang disetujui.

Konten privat tidak boleh muncul pada log, pesan error, maupun telemetri.

---

# 10. Media Requirements

Media yang digunakan:

- Images
- Videos

Upload harus memiliki validation:

- MIME type
- Extension
- File size
- Image dimensions jika applicable

Media harus disimpan menggunakan storage abstraction.

### Development

Local storage.

### Production

S3-compatible/object storage.

Sistem harus memungkinkan perubahan storage tanpa mengubah domain logic.

### Future

- Image compression
- Thumbnail generation
- WebP
- AVIF
- Responsive images
- Lazy loading
- Video optimization

---

# 11. Design Requirements

Visual identity harus terasa:

```text
Modern
Personal
Romantic
Minimal
Editorial
Scrapbook
Warm
```

### Hindari

- Generic SaaS dashboard
- Terlalu banyak card
- Terlalu banyak gradient
- Warna terlalu terang
- Gamification berlebihan
- UI yang terlalu corporate
- Icon yang berlebihan
- Statistik yang tidak memiliki makna emosional

### Design Philosophy

Interface harus terasa seperti:

> digital scrapbook + private journal + modern relationship space

bukan:

> admin dashboard.

---

# 12. UX Principles

## 12.1 Personal

Konten hubungan menjadi fokus utama.

## 12.2 Simple

User tidak membutuhkan banyak langkah untuk melakukan aksi sederhana.

## 12.3 Emotional

Beberapa fitur seperti Letters, Open When, Memories, dan Our Story harus memiliki emotional feedback.

## 12.4 Visual

Foto, timeline, typography, spacing, dan storytelling memiliki peran penting.

## 12.5 Private

User harus selalu merasa bahwa data mereka hanya milik mereka berdua.

## 12.6 Mobile First

Aplikasi harus nyaman digunakan melalui smartphone.

---

# 13. Landing Page Information Priority

Urutan informasi pada landing page harus memprioritaskan konten yang memiliki nilai emosional.

Prioritas:

```text
1. Couple / Greeting
2. Relationship Counter
3. Next Trip
4. Recent Memory
5. Important Date
6. Letter
7. Future
8. Quick Actions
```

Landing page tidak perlu dipenuhi dengan statistik.

---

# 14. Empty States

Empty state harus tetap terasa personal.

Contoh Memories:

```text
No memories yet.

Maybe your next favorite memory
is waiting to happen.
```

Empty Next Trips:

```text
No trips planned yet.

Where should we go next?
```

Empty Future:

```text
Nothing here yet.

Dream something together.
```

Empty Letters:

```text
No letters yet.

Maybe write something
your future self will treasure.
```

---

# 15. Notifications

### MVP

Notification dapat digunakan untuk:

- Scheduled letter available
- Upcoming important date
- Trip starting soon

### Future

- Push notification
- Email notification
- Web push
- Anniversary reminders
- Trip reminders

Notification bukan requirement utama untuk core functionality MVP.

---

# 16. Search

Search bukan fitur wajib MVP.

Future search dapat mencari:

- Memories
- Places
- Songs
- Trips
- Timeline Events
- Letters

Contoh:

```text
Search "Bali"

→ Bali Trip
→ Bali Memories
→ Bali Place
→ Bali Timeline Event
```

---

# 17. Landing Page Relationships

Landing page menggabungkan data dari beberapa domain.

Contoh:

```text
Relationship
│
├── Next Trip
│
├── Recent Memory
│
├── Important Date
│
├── Latest Letter
│
└── Future Item
```

Landing page harus mengambil data secara efisien dan tidak melakukan query yang tidak
diperlukan.

Karena satu halaman menampilkan banyak domain sekaligus, tiap section hanya mengambil sebagian
kecil data yang ditampilkannya, bukan seluruh isi domain tersebut.

---

# 18. MVP Scope

MVP harus mencakup:

### Foundation

- Relationship
- Dua anggota beserta profilnya
- Penanda identitas "aku siapa"
- Relationship context di server

### Core

- Home
- Our Story
- Memories
- Places
- Soundtrack

### Future Planning

- Next Trips
- Trip Itinerary
- Trip Budget
- Trip Checklist
- Our Future

### Emotional

- Letters
- Open When
- Important Dates
- Our Time

### Interaction

- Daily Question
- Basic Couple Quiz
- Who Is More Likely?

---

# 19. Post-MVP

Fitur yang dapat dikembangkan setelah MVP:

- PWA
- Push notifications
- Email notifications
- Map integration
- Spotify integration
- YouTube integration
- Shared calendar
- Voice notes
- Video notes
- Advanced couple games
- Memory recap
- Yearly relationship recap
- AI-generated memory captions
- AI-generated yearly recap
- Anniversary recap
- Public sharing with controlled access
- Offline support

---

# 20. Success Criteria

MVP dianggap berhasil apabila:

1. Dua user dapat berada dalam satu relationship.
2. Aplikasi terbuka tanpa login, dan tidak ada jalur sign in, sign up, atau reset password.
3. User dapat menyimpan perjalanan hubungan melalui Our Story.
4. User dapat menyimpan memories beserta media.
5. User dapat menulis dan menjadwalkan letters.
6. Scheduled letters tidak dapat dibuka sebelum waktunya.
7. User dapat membuat Open When letters.
8. User dapat membuat Next Trip.
9. Next Trip memiliki countdown.
10. User dapat membuat itinerary.
11. User dapat membuat checklist.
12. User dapat mencatat budget trip.
13. User dapat menyimpan places.
14. User dapat menyimpan soundtrack.
15. User dapat membuat future/bucket list.
16. User dapat menyimpan important dates.
17. Relationship counter bekerja secara dinamis.
18. Aplikasi nyaman digunakan pada mobile.
19. Media tersimpan dengan relationship ownership pada model datanya.
20. UI terasa personal dan bukan seperti generic SaaS dashboard.

---

# 21. Product Personality

Our Little Universe harus memiliki personality:

```text
Warm
Intimate
Playful
Romantic
Nostalgic
Personal
Calm
Elegant
```

Copywriting sebaiknya menggunakan bahasa yang terasa manusiawi dan emosional.

Contoh:

```text
Where our little story lives.

Another day, another memory.

Where should we go next?

Some things are worth writing down.

For the days when you need a little reminder.

Our story so far.
```

---

# 22. Long-Term Product Vision

Dalam jangka panjang, Our Little Universe bukan hanya aplikasi untuk menyimpan data hubungan.

Produk harus berkembang menjadi:

> **A living digital scrapbook of a relationship.**

Sistem harus mampu merepresentasikan perjalanan pasangan:

```text
WE MET
   ↓
OUR FIRST MOMENTS
   ↓
OUR STORY
   ↓
OUR MEMORIES
   ↓
OUR PLACES
   ↓
OUR SONGS
   ↓
OUR TRIPS
   ↓
OUR LETTERS
   ↓
OUR DREAMS
   ↓
OUR FUTURE
```

Semakin lama digunakan, semakin bernilai aplikasinya karena semakin banyak sejarah yang tersimpan.

Pada akhirnya, Our Little Universe harus terasa seperti:

> **sebuah tempat digital yang menceritakan kisah dua orang dari masa lalu, menemani mereka di masa sekarang, dan menyimpan hal-hal yang ingin mereka lakukan bersama di masa depan.**
