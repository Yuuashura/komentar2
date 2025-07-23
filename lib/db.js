// lib/db.js
// Mock database menggunakan array dalam memory
// Dalam produksi, ganti dengan database real seperti MongoDB, Supabase, dll

let comments = [
  {
    id: 1733629200,
    email: "Yuuashura",
    komentar: "Jaga kesehatan yaa cantik, Jangan begadang terus sama jangan sering telat makan",
    tanggal: "2025-07-23T16:15:21.695Z",
    createdAt: 1
},
  {
    id: 1733629200,
    email: "Yuuashura",
    komentar: "DIVDIK BAIK HATI, DIVDIK GANTENG DAN CANTIK, DIVDIK NGASIH 101 ",
    tanggal: "2025-07-23T16:15:21.695Z",
    createdAt: 1
},

];
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



    if (komentar.length < 5) {
      throw new Error('Komentar minimal 5 karakter');
    }

    const newComment = {
      id: Date.now(),
      email: email.trim().toLowerCase(),
      komentar: komentar.trim(),
      tanggal: new Date().toISOString(),
      createdAt: nextId++
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
    const commentIndex = comments.findIndex(c => c.id == parseInt(id));
    
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