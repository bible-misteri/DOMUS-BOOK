# 07 — Publish Workspace

Status: Draft v1.0

---

# Tujuan

Publish Workspace mengubah naskah menjadi buku yang siap dibaca atau diterbitkan.

Publish bukan sekadar proses ekspor.

Publish adalah tahap akhir perjalanan penulis.

---

# Filosofi

DOMUS mendampingi penulis dari halaman kosong hingga buku selesai.

Tombol Publish adalah simbol bahwa sebuah karya siap dibagikan kepada dunia.

---

# User Story

Sebagai penulis...

Saya ingin menghasilkan buku profesional tanpa memahami proses teknis seperti Pandoc, LaTeX, EPUB, atau PDF.

Saya hanya ingin memilih format dan menekan satu tombol.

---

# Layout

+------------------------------------------------------------+

                PUBLISH BOOK

--------------------------------------------------------------

Buku

DOMUS ISAACI

--------------------------------------------------------------

Format

○ PDF

○ EPUB

○ DOCX

○ HTML

--------------------------------------------------------------

Output

Nama File

_________________________

Lokasi Penyimpanan

_________________________

--------------------------------------------------------------

☑ Sertakan Cover

☑ Sertakan Daftar Isi

☑ Sertakan Nomor Halaman

☑ Sertakan Footnote

--------------------------------------------------------------

[ GENERATE BOOK ]

+------------------------------------------------------------+

---

# Format Output

## PDF

Untuk cetak dan distribusi.

---

## EPUB

Untuk Kindle dan eBook.

---

## DOCX

Untuk revisi lanjutan.

---

## HTML

Untuk publikasi web.

---

# Alur Interaksi

Pengguna memilih:

Format

↓

Generate Book

↓

DOMUS memproses naskah.

↓

Progress ditampilkan.

↓

Jika berhasil:

"Buku berhasil dibuat."

↓

Tombol:

📂 Buka Folder

📖 Buka Buku

🔁 Publish Lagi

---

# Progress

Selama proses Publish, tampilkan status:

✓ Menyiapkan Naskah

✓ Membuat Daftar Isi

✓ Memproses Gambar

✓ Membuat PDF / EPUB

✓ Selesai

---

# Error Handling

Jika terjadi kesalahan:

DOMUS menampilkan:

- penyebab
- solusi yang disarankan
- tombol Coba Lagi

Tidak menampilkan log teknis kepada pengguna umum.

---

# Aturan UI

- Satu tombol utama: Generate Book.
- Proses Publish harus dapat dibatalkan.
- Progress harus terlihat jelas.
- Setelah selesai, pengguna langsung dapat membuka hasil.

---

# Definition of Done

Publish dinyatakan selesai apabila:

✓ PDF berhasil dibuat.

✓ EPUB berhasil dibuat.

✓ DOCX berhasil dibuat.

✓ HTML berhasil dibuat.

✓ Cover muncul.

✓ Daftar Isi otomatis.

✓ Nomor halaman benar.

✓ Footnote benar.

✓ Metadata buku benar.

✓ Hasil dapat langsung dibuka.

---

# Future Enhancement

Versi berikutnya dapat menambahkan:

- Publish ke Amazon KDP.
- Publish ke Google Play Books.
- Publish ke Apple Books.
- Sinkronisasi ke GitHub.
- Publikasi langsung ke website DOMUS.

---

Status

🟡 Draft
