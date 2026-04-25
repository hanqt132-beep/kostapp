# Panduan Penggunaan Database MySQL (KostApp)

Database KostApp telah berhasil dikonfigurasi menggunakan **MySQL** dan **Prisma ORM**.

## Prasyarat
1. Pastikan Anda telah menginstal server MySQL lokal seperti **XAMPP**, **WAMP**, atau **Laragon**.
2. Pastikan service **MySQL** dalam keadaan **berjalan (Start)** di control panel XAMPP Anda.
3. Anda **tidak perlu** membuat database secara manual di phpMyAdmin, karena Prisma akan membuatnya secara otomatis (berdasarkan nama `kostapp_db` di `.env`).

## Menjalankan Migrasi Database
Jika Anda memindahkan proyek ini ke komputer lain atau ingin mereset struktur tabel:

1. Buka terminal di folder `server`.
2. Jalankan perintah:
   ```bash
   npx prisma db push
   ```
   *Perintah ini akan membuat database `kostapp_db` dan semua tabel yang dibutuhkan sesuai struktur di `server/prisma/schema.prisma`.*

## Melihat dan Mengelola Data
Untuk melihat isi database (seperti melihat daftar pengguna, kost, transaksi) dengan mudah tanpa phpMyAdmin, Anda dapat menggunakan Prisma Studio:

1. Buka terminal di folder `server`.
2. Jalankan perintah:
   ```bash
   npx prisma studio
   ```
3. Browser akan otomatis terbuka di `http://localhost:5555` menampilkan antarmuka grafis untuk manajemen database.

## Koneksi Aplikasi
- Aplikasi backend otomatis terhubung ke MySQL menggunakan URL `mysql://root:@localhost:3306/kostapp_db` yang ada di `server/.env`.
- Semua _logic_ database diurus oleh Prisma Client di dalam folder `server`.
