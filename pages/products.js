import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="container">
      <h1>Product Catalog</h1>
      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <img src={p.img} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.brand} — ${p.price}</p>
            <ul>
              {p.specs.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <a href={p.link} className="btn">View Product</a>
          </div>
        ))}
      </div>
    </div>
  );
}
