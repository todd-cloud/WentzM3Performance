import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [meets, setMeets] = useState([]);

  // Load data from APIs
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);

    fetch('/api/gallery')
      .then(res => res.json())
      .then(setGallery);

    fetch('/api/meets')
      .then(res => res.json())
      .then(setMeets);
  }, []);

  return (
    <div>
      <header className="hero">
        <h1>Wentz Designs M3 Division</h1>
        <p>BMW M3 Performance Parts, Gallery & Meets</p>
      </header>

      <main className="container">
        {/* Product Catalog */}
        <section>
          <h2>Catalog</h2>
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
        </section>

        {/* Gallery */}
        <section>
          <h2>Community Gallery</h2>
          <form className="form" onSubmit={async e => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const data = Object.fromEntries(fd.entries());

            await fetch('/api/gallery', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });

            e.currentTarget.reset();
            const updated = await fetch('/api/gallery').then(res => res.json());
            setGallery(updated);
          }}>
            <input className="input" name="name" placeholder="Your Name" required />
            <input className="input" name="car" placeholder="Your Car" required />
            <input className="input" name="imageUrl" placeholder="Image URL" required />
            <button className="btn" type="submit">Submit</button>
          </form>

          <div className="grid">
            {gallery.map((g, i) => (
              <div key={i} className="card">
                <img src={g.imageUrl} alt={g.car} />
                <h3>{g.name}</h3>
                <p>{g.car}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meets */}
        <section>
          <h2>Meet Sign-ups</h2>
          <form className="form" onSubmit={async e => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const data = Object.fromEntries(fd.entries());

            await fetch('/api/meets', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });

            e.currentTarget.reset();
            const updated = await fetch('/api/meets').then(res => res.json());
            setMeets(updated);
          }}>
            <input className="input" name="name" placeholder="Your Name" required />
            <input className="input" name="email" placeholder="Email" required />
            <input className="input" name="city" placeholder="City" required />
            <input className="input" name="variant" placeholder="M3 Variant" required />
            <button className="btn secondary" type="submit">Sign Up</button>
          </form>

          <ul>
            {meets.map((m, i) => (
              <li key={i}>
                {m.name} — {m.city} ({m.variant})
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
