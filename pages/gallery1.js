import { useEffect, useState } from 'react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(setGallery);
  }, []);

  return (
    <div className="container">
      <h1>Community Gallery</h1>
      <div className="grid">
        {gallery.map((g, i) => (
          <div key={i} className="card">
            <img src={g.imageUrl} alt={g.car} />
            <h3>{g.name}</h3>
            <p>{g.car}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
