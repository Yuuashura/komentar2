const express = require('express');
const path = require('path'); // <-- Modul 'path' diperlukan
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware untuk mengizinkan server menerima body JSON
app.use(express.json());
app.use(cors());


// --- PERUBAHAN UTAMA DIMULAI DI SINI ---

// 1. Menyajikan file statis (CSS, JS, gambar) dari folder 'public'
// Perintah ini membuat semua file di dalam folder 'public' bisa diakses dari browser.
app.use(express.static(path.join(__dirname, 'public')));

// 2. Mengarahkan halaman utama ('/') ke file index.html
// Ini menggantikan app.get('/') Anda yang lama.
// Catatan: express.static di atas sebenarnya sudah melakukan ini secara implisit,
// tetapi menuliskannya secara eksplisit seperti ini lebih jelas.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- AKHIR PERUBAHAN UTAMA ---


// Impor rute komentar dari file terpisah (ini tetap sama)
const commentsRouter = require('./routes/comments');

// Gunakan rute tersebut untuk path '/api/comments'
app.use('/api/komentar', commentsRouter);


// Menyalakan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  console.log("Halaman utama sekarang menyajikan index.html dari folder 'public'.");
});
