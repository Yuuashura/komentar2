const express = require('express');
const cors = require('cors'); // <-- 1. Impor library cors
const path = require('path');
const app = express();

// --- 2. Konfigurasi CORS yang Andal ---
// Tentukan domain frontend mana yang diizinkan untuk mengakses API ini
const allowedOrigins = ['https://projekan-html.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // Izinkan jika origin ada di dalam daftar, atau jika request tidak memiliki origin (seperti dari Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Akses ditolak oleh kebijakan CORS'));
    }
  },
  methods: "GET,POST,DELETE,OPTIONS", // Izinkan metode yang diperlukan
  allowedHeaders: "Content-Type,Authorization" // Izinkan header yang diperlukan
};

// --- 3. Terapkan Middleware ---
app.use(cors(corsOptions)); // Terapkan konfigurasi CORS
app.use(express.json());   // Middleware untuk membaca body JSON

// --- Rute Anda ---
// Menyajikan file statis dari folder 'public' (jika ada)
app.use(express.static(path.join(__dirname, 'public')));

// Impor dan gunakan rute API komentar Anda
const commentsRouter = require('./routes/comments');
app.use('/api/komentar', commentsRouter);

// Catch-all untuk frontend (jika Anda menggunakan single-page application)
app.get('*', (req, res) => {
    // Pastikan ini bukan permintaan API sebelum mengirim index.html
    if (!req.originalUrl.startsWith('/api')) {
        // Cek apakah file index.html ada
        const indexPath = path.join(__dirname, 'public', 'index.html');
        // Kirim file jika ada
        res.sendFile(indexPath, (err) => {
            if (err) {
                // Jika file tidak ada atau ada error lain, kirim pesan sederhana
                res.status(404).send('Halaman tidak ditemukan.');
            }
        });
    }
});

// --- 4. Ekspor Aplikasi untuk Vercel ---
// JANGAN PERNAH memanggil app.listen() di sini saat mendeploy ke Vercel.
module.exports = app;
