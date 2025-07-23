let komentarList = [];

export default function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ GET semua komentar
  if (req.method === 'GET') {
    return res.status(200).json(komentarList);
  }

  // ✅ POST komentar baru
  if (req.method === 'POST') {
    const {email, komentar } = req.body;

    if (!email || !komentar) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }

    const newKomentar = {
      id: Date.now().toString(),
      email,
      komentar,
    };

    komentarList.push(newKomentar);
    return res.status(201).json(newKomentar);
  }

  // ✅ DELETE komentar berdasarkan ID
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const index = komentarList.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan.' });
    }

    const deleted = komentarList.splice(index, 1)[0];
    return res.status(200).json({ message: 'Komentar dihapus', deleted });
  }

  // ❌ Method tidak didukung
  return res.status(405).json({ message: 'Method tidak didukung' });
}
