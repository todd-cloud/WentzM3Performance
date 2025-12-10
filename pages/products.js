import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const file = path.join(process.cwd(), 'data/products.json');

  if (req.method === 'GET') {
    try {
      const products = JSON.parse(fs.readFileSync(file, 'utf8'));
      return res.status(200).json(products);
    } catch (error) {
      console.error('Error loading products:', error);
      return res.status(500).json({ error: 'Failed to load products.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}

