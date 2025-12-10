import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const file = path.join(process.cwd(), 'data/meets.json');

  if (req.method === 'POST') {
    try {
      const meets = JSON.parse(fs.readFileSync(file, 'utf8'));
      const item = req.body;

      if (!item?.name || !item?.email || !item?.city || !item?.variant) {
        return res.status(400).json({ error: 'Missing fields.' });
      }

      meets.unshift({ ...item, createdAt: new Date().toISOString() });
      fs.writeFileSync(file, JSON.stringify(meets, null, 2));

      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Error saving meet:', error);
      return res.status(500).json({ error: 'Failed to save submission.' });
    }
  } else if (req.method === 'GET') {
    try {
      const meets = JSON.parse(fs.readFileSync(file, 'utf8'));
      return res.status(200).json(meets);
    } catch (error) {
      console.error('Error loading meets:', error);
      return res.status(500).json({ error: 'Failed to load meets.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}

