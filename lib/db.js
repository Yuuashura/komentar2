// lib/db.js
// Mock database menggunakan array dalam memory
// Dalam produksi, ganti dengan database real seperti MongoDB, Supabase, dll

let comments = [];
let nextId = 1;

// Utility function untuk validasi email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const db = {
  // Get all comments
  getAllComments() {
    return comments.sort((a, b) => b.createdAt - a.createdAt);
  },

  // Get comment by ID
  getCommentById(id) {
    return comments.find(comment => comment.id === parseInt(id));
  },

  // Add new comment
  addComment({email, komentar }) {
    // Validasi
    if (!email || !komentar) {
      throw new Error('Email, dan komentar harus diisi');
    }

    if (!isValidEmail(email)) {
      throw new Error('Format email tidak valid');
    }


    if (komentar.length < 5) {
      throw new Error('Komentar minimal 5 karakter');
    }

    const newComment = {
      id: nextId++,
      email: email.trim().toLowerCase(),
      komentar: komentar.trim(),
      tanggal: new Date().toISOString(),
      createdAt: Date.now()
    };

    comments.push(newComment);
    return newComment;
  },

  // Update comment
  updateComment(id, {email, komentar }) {
    const commentIndex = comments.findIndex(c => c.id === parseInt(id));
    
    if (commentIndex === -1) {
      return null;
    }

    // Validasi
    if (!email || !komentar) {
      throw new Error('Email, dan komentar harus diisi');
    }

    if (!isValidEmail(email)) {
      throw new Error('Format email tidak valid');
    }

    comments[commentIndex] = {
      ...comments[commentIndex],
      email: email.trim().toLowerCase(),
      komentar: komentar.trim(),
      updatedAt: Date.now()
    };

    return comments[commentIndex];
  },

  // Delete comment
  deleteComment(id) {
    const commentIndex = comments.findIndex(c => c.id === parseInt(id));
    
    if (commentIndex === -1) {
      return null;
    }

    return comments.splice(commentIndex, 1)[0];
  },

  // Get comments count
  getCommentsCount() {
    return comments.length;
  }
};

module.exports = db;