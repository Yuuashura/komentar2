// routes/comments.js
const express = require('express');
const router = express.Router();
const db = require('../lib/db'); // Impor logika database


// GET /api/comments - Mendapatkan semua komentar
router.get('/', (req, res) => {
  const allComments = db.getAllComments();
  res.status(200).json(allComments);
});

// POST /api/comments - Menambah komentar baru
router.post('/', (req, res) => {
  try {
    const { email, komentar } = req.body;
    const newComment = db.addComment({ email, komentar });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/comments/:id - Menghapus komentar
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = db.deleteComment(id);

    if (!deletedComment) {
      // Jika fungsi db mengembalikan null, kirim 404
      return res.status(404).json({ error: 'Komentar dengan ID tersebut tidak ditemukan.' });
    }

    // Jika berhasil, kirim respons sukses
    res.status(200).json({ message: 'Komentar berhasil dihapus', comment: deletedComment });

  } catch (error) {
    // Jika terjadi error tak terduga lainnya, kirim 500
    console.error("Error di rute DELETE:", error);
    res.status(500).json({ error: 'Terjadi kesalahan internal pada server.' });
  }
});

module.exports = router;