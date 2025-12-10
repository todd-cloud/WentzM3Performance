import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Locate the products.json file in your /data folder
    const file = path.join(process.cwd(), 'data/products.json');

    // Read and parse the JSON
    const products = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Return the product list as JSON
    res.status(200).json(products);
  } catch (error) {
    console.error('Error loading products:', error);
    res.status(500).json({ error: 'Failed to load products.' });
  }
}
