
import path from 'path';

export default function handler(req, res) {
  const file = path.join(process.cwd(), 'data/gallery.json');

  if (req.method === 'POST') {
    try {
      const gallery = JSON.parse(fs.readFileSync(file, 'utf8'));
      const item = req.body;

      if (!item?.name || !item?.car || !item?.imageUrl) {
        return res.status(400).json({ error: 'Missing fields.' });
      }

      gallery.unshift({ ...item, createdAt: new Date().toISOString() });
      fs.writeFileSync(file, JSON.stringify(gallery, null, 2));

      // ✅ Fixed line
      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Error saving gallery:', error);
      return res.status(500).json({ error: 'Failed to save submission.' });
    }
  } else if (req.method === 'GET') {
    try {
      const gallery = JSON.parse(fs.readFileSync(file, 'utf8'));
      return res.status(200).json(gallery);
    } catch (error) {
      console.error('Error loading gallery:', error);
      return res.status(500).json({ error: 'Failed to load gallery.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
