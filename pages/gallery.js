import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const file = path.join(process.cwd(), 'data/gallery.json');

  if (req.method === 'POST') {
    try {
      // Load current gallery
      const gallery = JSON.parse(fs.readFileSync(file, 'utf8'));

      // Validate incoming submission
      const item = req.body;
      if (!item?.name || !item?.car || !item?.imageUrl) {
        return res.status(400).json({ error: 'Missing fields.' });
      }

      // Add new submission to the top
      gallery.unshift({ ...item, createdAt: new Date().toISOString() });

      // Save updated gallery
      fs.writeFileSync(file, JSON.stringify(gallery, null, 2));

      // ✅ Fixed line
      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Error saving gallery:', error);
      return res.status(500).json({ error: 'Failed to save submission.' });
    }
  } else {
    try {
      // Return gallery list
      const gallery = JSON.parse(fs.readFileSync(file, 'utf8'));
      return res.status(200).json(gallery);
    } catch (error) {
      console.error('Error loading gallery:', error);
      return res.status(500).json({ error: 'Failed to load gallery.' });
    }
  }
}
