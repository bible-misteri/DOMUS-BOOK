# 06 — Preview Workspace

Status: Draft v1.0

---

# Tujuan

Preview Workspace memungkinkan penulis membaca naskah sebagaimana pembaca akan melihatnya.

Preview bukan editor.

Preview adalah simulasi buku yang sebenarnya.

Penulis dapat memeriksa kenyamanan membaca sebelum menerbitkan buku.

---

# Filosofi

Seorang penulis harus sesekali berhenti menulis.

Kemudian membaca.

Preview membantu penulis berpindah dari pola pikir "penulis" menjadi "pembaca".

Semakin sering berpindah perspektif, semakin baik kualitas buku.

---

# User Story

Sebagai penulis...

Saya ingin membaca buku saya seperti buku sungguhan.

Saya ingin mengetahui apakah alur bab terasa nyaman.

Saya ingin melihat hasil akhir tanpa harus melakukan Publish.

---

# Layout

+------------------------------------------------------------+

                DOMUS READER

--------------------------------------------------------------

Cover

↓

Daftar Isi

↓

Bab 1

↓

Bab 2

↓

Bab 3

↓

Lampiran

--------------------------------------------------------------

☀ Light Mode

🌙 Dark Mode

🔍 Zoom

🖨 Print Layout

+------------------------------------------------------------+

---

# Komponen

Preview menampilkan:

- Cover
- Judul
- Penulis
- Daftar Isi
- Nomor Halaman
- Heading
- Footnote
- Gambar
- Caption
- Kutipan
- Daftar Referensi

Semua ditampilkan seperti buku.

---

# Mode Preview

## Reading Mode

Tampilan menyerupai buku digital.

---

## Print Mode

Menampilkan tata letak cetak.

---

## Focus Mode

Menyembunyikan seluruh toolbar.

Hanya halaman buku yang terlihat.

---

# Navigasi

Pengguna dapat:

- pindah bab
- kembali ke editor
- mencari kata
- membuka daftar isi
- memperbesar tampilan

---

# Tombol

✍ Kembali ke Editor

🔍 Cari

📑 Daftar Isi

🖨 Print Layout

☀ / 🌙 Ganti Tema

---

# Alur Interaksi

Pengguna menekan:

📖 Preview

↓

Reader terbuka.

↓

Pengguna membaca.

↓

Menemukan bagian yang ingin diperbaiki.

↓

Menekan:

✍ Kembali ke Editor.

↓

Cursor kembali ke posisi terakhir.

---

# Aturan UI

- Preview tidak dapat mengubah isi naskah.
- Preview hanya untuk membaca.
- Perpindahan Editor ↔ Preview maksimal satu klik.
- Tampilan harus bersih seperti membaca buku.

---

# Definition of Done

Preview dinyatakan selesai apabila:

✓ Cover tampil.

✓ Daftar Isi otomatis.

✓ Seluruh bab dapat dibaca.

✓ Footnote tampil.

✓ Gambar tampil.

✓ Pergantian Light/Dark bekerja.

✓ Kembali ke Editor mempertahankan posisi terakhir.

---

# Future Enhancement

Versi berikutnya dapat menambahkan:

- Mode Kindle
- Mode Tablet
- Simulasi ukuran buku A5/B5
- Simulasi EPUB
- Preview dua halaman (book spread)

---

Status

🟡 Draft
