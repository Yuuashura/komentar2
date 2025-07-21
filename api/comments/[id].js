// api/comments/[id].js
const db = require('../../lib/db');

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      // GET - Mendapatkan komentar berdasarkan ID
      const comment = db.getCommentById(id);
      
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: 'Komentar tidak ditemukan'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Berhasil mendapatkan komentar',
        data: comment
      });

    } else if (req.method === 'PUT') {
      // PUT - Update komentar
      const { nama, email, komentar } = req.body;
      
      try {
        const updatedComment = db.updateComment(id, { nama, email, komentar });
        
        if (!updatedComment) {
          return res.status(404).json({
            success: false,
            message: 'Komentar tidak ditemukan'
          });
        }
        
        return res.status(200).json({
          success: true,
          message: 'Komentar berhasil diupdate',
          data: updatedComment
        });
        
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

    } else if (req.method === 'DELETE') {
      // DELETE - Menghapus komentar
      const deletedComment = db.deleteComment(id);
      
      if (!deletedComment) {
        return res.status(404).json({
          success: false,
          message: 'Komentar tidak ditemukan'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Komentar berhasil dihapus',
        data: deletedComment
      });

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