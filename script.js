// script.js
import { projects } from './projects.js';

if (document.getElementById('projectsGrid')) {
  const grid = document.getElementById('projectsGrid');
  const modal = document.getElementById('modal');
  const closeModal = () => {
    modal.style.display = 'none';
    // Останавливаем видео при закрытии!
    const video = document.getElementById('modalVideo');
    if (video) video.pause();
  };

  // Рендер карточек
  grid.innerHTML = projects.map(p => `
    <div class="project-card" data-id="${p.id}" data-category="${p.category}">
      <img src="${p.image}" alt="${p.title}">
      <div class="card-badge">${p.category === 'video' ? '📹' : p.category === 'reels' ? '📱' : '📷'}</div>
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

  // Модальное окно с фото или видео
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.id);
      const p = projects.find(pr => pr.id === id);
      if (!p) return;

      const mediaContainer = document.getElementById('modalMedia');
      const title = document.getElementById('modalTitle');
      const desc = document.getElementById('modalDescription');

      // Очищаем контейнер
      mediaContainer.innerHTML = '';

      if (p.video) {
        // Видео
        const video = document.createElement('video');
        video.id = 'modalVideo';
        video.src = p.video;
        video.controls = true;
        video.style.width = '100%';
        video.style.borderRadius = '8px';
        mediaContainer.appendChild(video);
      } else {
        // Фото
        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.title;
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        mediaContainer.appendChild(img);
      }

      title.textContent = p.title;
      desc.textContent = p.description;
      modal.style.display = 'block';
    });
  });

  document.querySelector('.close').onclick = closeModal;
  window.onclick = (e) => { if (e.target === modal) closeModal(); };
}

// ========= Форма =========
if (document.getElementById('contactForm')) {
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
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

    feedback.textContent = 'Спасибо! Свяжемся в ближайшее время.';
    feedback.style.color = 'green';
    this.reset();
  });
}



