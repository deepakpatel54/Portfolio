async function renderProjects() {
  const grid = document.getElementById('projects-grid');

  try {
    const response = await fetch('data/projects.json');
    const projects = await response.json();

    projects.forEach(p => {
      const card = document.createElement('article');
      card.className = 'project-card';

      const img = document.createElement('img');
      img.src = p.image;
      img.alt = p.title;

      const h3 = document.createElement('h3');
      h3.textContent = p.title;

      const pdesc = document.createElement('p');
      pdesc.textContent = p.description;

      const btn = document.createElement('a');
      btn.className = 'btn';
      btn.href = p.link;
      btn.textContent = 'Explore Project';

      card.appendChild(img);
      card.appendChild(h3);
      card.appendChild(pdesc);
      card.appendChild(btn);

      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load projects.json:', err);
    grid.innerHTML = '<p style="color:red">Error loading projects. Check console.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();


  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const entry = {
      name: fd.get('name'),
      email: fd.get('email'),
      message: fd.get('message'),
      ts: new Date().toISOString()
    };
    const saved = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    saved.push(entry);
    localStorage.setItem('contact_messages', JSON.stringify(saved));
    status.textContent = 'Message saved locally. Replace this with real email/backend integration.';
    form.reset();
    setTimeout(() => status.textContent = '', 4000);
  });


  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menuBtn.addEventListener('click', () => nav.style.display = (nav.style.display === 'flex' ? 'none' : 'flex'));
});
