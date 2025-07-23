// routes/comments.js
const express = require('express');
const cors = require('cors');
const router = express.Router();
const db = require('../lib/db'); // Impor logika database

app.use(cors());

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
  const { id } = req.params;
  const deletedComment = db.deleteComment(id);
  if (!deletedComment) {
    return res.status(404).json({ error: 'Komentar tidak ditemukan' });
  }
  res.status(200).json({ message: 'Komentar berhasil dihapus', comment: deletedComment });
});

module.exports = router;