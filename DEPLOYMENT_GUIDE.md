# 🚀 Panduan Deployment: KostApp Full-Stack (MySQL + Node.js)

Karena aplikasi Anda kini telah menjadi aplikasi *Full-Stack* yang tangguh dengan **Node.js, Express, Prisma, dan MySQL**, proses *deployment* (meng-online-kan aplikasi) akan dilakukan dalam dua tahap: **Backend** (Server + Database) dan **Frontend** (Tampilan Web).

Pilihan layanan termudah dan gratis/murah untuk pemula adalah:
1. **Database & Backend Server:** [Railway.app](https://railway.app/) atau [Render.com](https://render.com/)
2. **Frontend (Tampilan Web):** [Vercel.com](https://vercel.com/) atau Netlify

---

## 🏗️ Tahap 1: Upload Source Code ke GitHub

Langkah pertama yang mutlak adalah meletakkan seluruh kode proyek Anda ke GitHub.

1. Buka terminal di VS Code.
2. Jalankan perintah berikut:
   ```bash
   git init
   git add .
   git commit -m "Siap deploy full-stack"
   # Ganti link di bawah dengan link repositori GitHub kosong milik Anda
   git remote add origin https://github.com/USERNAME_ANDA/kostapp.git
   git branch -M main
   git push -u origin main
   ```

---

## 🗄️ Tahap 2: Deploy Database & Backend (via Railway)

Railway sangat disarankan karena Anda bisa meng-hosting MySQL Database dan Node.js server di satu tempat yang sama dengan mudah.

### A. Membuat Database MySQL
1. Kunjungi [Railway.app](https://railway.app/) dan *Login* menggunakan GitHub.
2. Klik **New Project** > **Provision PostgreSQL / MySQL** (Pilih MySQL).
3. Tunggu 1 menit hingga database selesai dibuat.
4. Klik kotak MySQL tersebut, masuk ke tab **Variables** atau **Connect**.
5. Temukan dan salin format URL database Anda (biasanya berawalan `mysql://...`). **Simpan URL ini untuk nanti**.

### B. Deploy Server (Backend Express)
1. Di layar *Project* Railway yang sama, klik tombol **New** -> **GitHub Repo**.
2. Pilih repositori GitHub Anda (`kostapp`).
3. Saat diminta konfigurasi, buka layanan tersebut dan masuk ke tab **Variables**. Tambahkan:
   - `DATABASE_URL` = (Paste URL MySQL Anda dari langkah A)
   - `PORT` = `3001`
   - `JWT_SECRET` = `secret-panjang-bebas-apa-saja`
4. Masuk ke tab **Settings** -> **Build**. 
   - Ubah *Root Directory* menjadi `/server`.
   - Pastikan *Build Command* menjadi `npm run build` (ini akan menjalankan tsc otomatis sesuai package.json yang sudah saya sediakan).
   - Pada bagian *Start Command*, pastikan terisi `npm start` (ini otomatis menjalankan node dist/index.js).
5. Pada menu Railway, jalankan juga perintah `npx prisma db push` di tab *Command* (atau lewat Terminal Railway) jika tabel belum terbuat.
6. Railway akan otomatis menjalankan server Anda. Masuk ke halaman **Networking** dan klik **Generate Domain** untuk mendapatkan URL server Anda (Misal: `https://kostapp-backend-production.up.railway.app`).

*Catatan: Pastikan mengubah file koneksi CORS di `index.ts` jika nanti domain aplikasi frontend Anda sudah didapatkan.*

---

## 🎨 Tahap 3: Deploy Frontend (via Vercel)

Sekarang saatnya menghidupkan antarmuka pengguna (React) agar bisa diakses oleh dunia.

1. Buka file `src/lib/api.ts` di komputer Anda, lalu ubah URL ke server Railway yang baru saja Anda dapatkan:
   ```typescript
   // SEBELUMNYA: const API_URL = 'http://localhost:3001/api';
   const API_URL = 'https://kostapp-backend-production.up.railway.app/api'; 
   ```
2. Lakukan Push ke GitHub tentang perubahan URL ini:
   ```bash
   git add .
   git commit -m "Update API URL to production"
   git push
   ```
3. Kunjungi [Vercel.com](https://vercel.com/) dan *Login* memakai GitHub.
4. Klik **Add New...** > **Project**.
5. Impor repo GitHub Anda (`kostapp`).
6. Vercel biasanya mengenali proyek `Vite` secara otomatis.
   - *Framework Preset*: Vite
   - *Root Directory*: Biarkan kosong (atau `/` direktori utama).
   - *Build Command*: `npm run build`
   - *Output Directory*: `dist`
7. Klik **Deploy**.
8. Dalam waktu 1-2 menit, Vercel akan memberikan Anda URL Website yang langsung siap pakai!

---

## 🎉 Selesai!

Aplikasi KostApp Full-Stack Anda sekarang sudah 100% online di internet. 
- **Database** Anda dikelola dengan ketat di Railway.
- **Backend API** Anda merespons transaksi dari Railway.
- **Antarmuka Utama** memukau pengguna tanpa *lag* lewat jaringan server kilat milik Vercel.

### Checklist Pemeliharaan
Seiring bertambahnya pengguna, hal yang paling sering perlu Anda kerjakan adalah:
- **Tabel baru?** Buka `server/prisma/schema.prisma` di komputer lokal, tambahkan model tabel, jalankan `npx prisma db push`, lalu Git Commit. Railway akan mendeteksi dan langsung meneruskan kolom tersebut ke server Anda.
- **Error log?** Kunjungi log di dashboard Railway.
