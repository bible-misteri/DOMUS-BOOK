HOME SCREEN

Module: "app/home"
Status: 🟢 Build Ready

---

Tujuan

Home Screen merupakan halaman pertama yang ditampilkan ketika aplikasi DOMUS dibuka.

Halaman ini berfungsi sebagai pintu masuk menuju seluruh proses penulisan buku, mulai dari melanjutkan naskah yang sedang dikerjakan hingga melakukan review, preview, dan publish.

Prinsip desain Home adalah sederhana, tenang, dan fokus pada aktivitas menulis.

---

User Story

Sebagai seorang penulis, saya ingin ketika membuka DOMUS langsung melihat buku yang sedang saya kerjakan sehingga saya dapat melanjutkan menulis tanpa harus mencari file atau folder terlebih dahulu.

---

Layout

+--------------------------------------------------+

                    DOMUS

          Digital Manuscript Operating System

----------------------------------------------------

Selamat Datang,
<Nama Pengguna>

----------------------------------------------------

BUKU AKTIF

+----------------------------------------------+
| Cover Buku                                   |
|                                              |
| Judul Buku                                   |
| Status                                       |
| Progress                                     |
| Bab Aktif                                    |
+----------------------------------------------+

[ Lanjut Menulis ]

----------------------------------------------------

MENU

📚 Buku Saya

✍ Editor

🔍 Review

👁 Preview

📤 Publish

⚙ Pengaturan

----------------------------------------------------

---

Komponen

Header

Menampilkan:

- Logo DOMUS
- Nama aplikasi
- Nama pengguna

---

Active Book Card

Menampilkan:

- Cover
- Judul
- Subtitle
- Status
- Progress
- Bab aktif
- Tombol Lanjut Menulis

---

Navigation Menu

Menu utama menuju:

- My Books
- Editor
- Review
- Preview
- Publish
- Settings

---

Data Source

Home mengambil data dari tabel:

- Users
- Books

Data yang dibutuhkan:

user.name

book.title

book.subtitle

book.cover

book.progress

book.status

book.active_chapter

---

Flow

DOMUS Dibuka

↓

Load User

↓

Load Books

↓

Cari Buku Aktif

↓

Render Home Screen

---

Kondisi

Jika belum memiliki buku

Tampilkan:

Belum ada buku.

[ + Buat Buku Baru ]

---

Jika memiliki buku aktif

Tampilkan kartu buku beserta tombol Lanjut Menulis.

---

Navigasi

Tombol| Tujuan
Lanjut Menulis| Editor
Buku Saya| Library
Review| Review
Preview| Preview
Publish| Publish
Pengaturan| Settings

---

File Terkait

app/home/home.html

app/home/home.css

app/home/home.js

---

Target Implementasi

Versi pertama Home Screen harus mampu:

- Menampilkan pengguna yang sedang login.
- Menampilkan satu buku aktif.
- Menampilkan progress penulisan.
- Membuka Editor melalui tombol Lanjut Menulis.
- Berpindah ke halaman My Books, Review, Preview, dan Publish melalui menu navigasi.

---

Definition of Done

Implementasi Home dianggap selesai apabila:

- Halaman dapat dibuka tanpa error.
- Data pengguna berhasil dimuat.
- Buku aktif berhasil ditampilkan.
- Seluruh tombol navigasi berfungsi.
- Home menjadi halaman awal aplikasi DOMUS.

Status: 🟢 Ready for Coding
