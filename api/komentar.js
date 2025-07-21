// api/komentar.js

let komentarList = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(komentarList);
  }

  if (req.method === 'POST') {
    const { nama, email, komentar } = req.body;

    if (!nama || !email || !komentar) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }

    const newKomentar = {
      id: komentarList.length + 1,
      nama,
      email,
      komentar,
    };

    komentarList.push(newKomentar);
    return res.status(201).json(newKomentar);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const index = komentarList.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan.' });
    }

    const deleted = komentarList.splice(index, 1)[0];
    return res.status(200).json({ message: 'Berhasil dihapus', deleted });
  }

  return res.status(405).json({ message: 'Method tidak didukung' });
}
