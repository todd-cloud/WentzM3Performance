import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const file = path.join(process.cwd(), 'data/meets.json');

  if (req.method === 'POST') {
    try {
      // Load current meets list
      const meets = JSON.parse(fs.readFileSync(file, 'utf8'));

      // Validate incoming sign-up
      const signUp = req.body;
      if (!signUp?.name || !signUp?.email || !signUp?.city || !signUp?.variant) {
        return res.status(400).json({ error: 'Missing fields.' });
      }

      // Add new sign-up
      meets.push({ ...signUp, createdAt: new Date().toISOString() });

      // Save updated list
      fs.writeFileSync(file, JSON.stringify(meets, null, 2));

      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Error saving meet sign-up:', error);
      return res.status(500).json({ error: 'Failed to save sign-up.' });
    }
  } else {
    try {
      // Return all sign-ups
      const meets = JSON.parse(fs.readFileSync(file, 'utf8'));
      return res.status(200).json(meets);
    } catch (error) {
      console.error('Error loading meets:', error);
      return res.status(500).json({ error: 'Failed to load meets.' });
    }
  }
}

