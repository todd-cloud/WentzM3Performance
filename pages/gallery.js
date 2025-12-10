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

