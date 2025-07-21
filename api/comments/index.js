// api/comments/index.js
const db = require('../../lib/db');

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // GET - Mendapatkan semua komentar
      const comments = db.getAllComments();
      
      return res.status(200).json({
        success: true,
        message: 'Berhasil mendapatkan semua komentar',
        data: comments,
        total: comments.length
      });

    } else if (req.method === 'POST') {
      // POST - Menambahkan komentar baru
      const { nama, email, komentar } = req.body;
      
      try {
        const newComment = db.addComment({ nama, email, komentar });
        
        return res.status(201).json({
          success: true,
          message: 'Komentar berhasil ditambahkan',
          data: newComment
        });
        
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

    } else {
      // Method not allowed
      return res.status(405).json({
        success: false,
        message: 'Method tidak diizinkan'
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
}