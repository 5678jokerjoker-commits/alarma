// script.js
import { projects } from './projects.js';

// === Главная: избранные (первые 3) ===
if (document.getElementById('featured')) {
  const featured = projects.slice(0, 3);
  document.getElementById('featured').innerHTML = featured.map(p => `
    <div class="project-card" data-id="${p.id}" data-category="${p.category}">
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
    </div>
  `).join('');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.id)));
  });
}

// === Портфолио: все проекты + фильтры ===
if (document.getElementById('projectsGrid')) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = projects.map(p => `
    <div class="project-card" data-id="${p.id}" data-category="${p.category}">
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
    </div>
  `).join('');

  // Фильтрация
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
      });
    });
  });

  // Модалка
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.id)));
  });
}

// === Модальное окно (только фото) ===
function openModal(id) {
  const p = projects.find(pr => pr.id === id);
  if (!p) return;

  const modal = document.getElementById('modal');
  const img = document.getElementById('modalImage');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDescription');

  img.src = p.image;
  title.textContent = p.title;
  desc.textContent = p.description;
  modal.style.display = 'block';
}

// Закрытие модалки
if (document.getElementById('modal')) {
  const modal = document.getElementById('modal');
  document.querySelector('.close').onclick = () => modal.style.display = 'none';
  window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
}

// === Форма ===
if (document.getElementById('contactForm')) {
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('formMessage');

    if (!name || !email || !message) {
      feedback.textContent = 'Все поля обязательны!';
      feedback.style.color = 'red';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.textContent = 'Неверный email!';
      feedback.style.color = 'red';
      return;
    }

    feedback.textContent = 'Сообщение отправлено!';
    feedback.style.color = 'green';
    this.reset();
  });
}



