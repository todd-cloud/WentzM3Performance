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

