# ZeroTask — UI Starter

Starter tampilan website pengelolaan tugas, mengikuti referensi visual yang diberikan:
- Dashboard user dengan kartu saldo, menu cepat, statistik, dan navigasi bawah.
- Halaman daftar tugas, riwayat, saldo, profil, dan ketentuan.
- Dashboard admin untuk menambah tugas, melihat pengiriman, memproses, menyetujui, atau menolak.
- Saat admin menyetujui tugas, saldo bertambah pada state demo.

## Jalankan lokal
1. Install Node.js 18 atau lebih baru.
2. Ekstrak project.
3. Jalankan `npm install`.
4. Jalankan `npm run dev`.
5. Buka `http://localhost:3000`.

## Deploy ke GitHub + Vercel
1. Buat repository baru di GitHub.
2. Upload seluruh isi folder project ini ke repository.
3. Login ke Vercel, pilih **Add New → Project**, lalu import repository GitHub.
4. Framework akan terdeteksi sebagai Next.js. Klik Deploy.

## Catatan penting sebelum produksi
Project ini adalah **prototype UI / demo frontend**. Data tugas, pengiriman, status, dan saldo masih berada di state browser sehingga belum tersimpan permanen dan belum aman untuk transaksi nyata. Tombol User/Admin adalah pengalih pratinjau, bukan sistem autentikasi/otorisasi.

Sebelum digunakan publik, hubungkan Supabase (Auth + PostgreSQL), buat role admin yang hanya dapat diberikan melalui server/SQL tepercaya, aktifkan Row Level Security (RLS), dan pindahkan seluruh perubahan status serta perhitungan saldo ke fungsi server/database transaction. Jangan pernah mempercayai nominal saldo dari browser.

Platform ini ditujukan untuk tugas yang sah dan diotorisasi. Jangan meminta atau menyimpan password email, OTP, recovery code, atau kredensial akun pihak ketiga. Instruksi tugas dapat berisi nama/label email organisasi yang memang dikelola dan diizinkan pemiliknya.
