// --- Портфолио: фильтрация и модалка ---
function renderProjects(filter = 'all') {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  container.innerHTML = filtered.map(p => `
    <div class="project-card" data-id="${p.id}">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <button class="view-btn" data-id="${p.id}">Подробнее</button>
    </div>
  `).join('');

  // Вешаем обработчики
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const project = projects.find(p => p.id === id);
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-description').textContent = project.description;
      document.getElementById('modal-category').textContent = project.category;
      document.getElementById('modal').style.display = 'flex';
    });
  });
}

// Закрытие модалки
document.querySelector('.close')?.addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

// Фильтрация
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// Инициализация портфолио
if (document.getElementById('projectsContainer')) {
  renderProjects('all');
}

// --- Форма обратной связи ---
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const msg = document.getElementById('formMessage');

  if (name.length < 2) {
    msg.textContent = 'Имя должно быть от 2 символов';
    msg.style.color = 'red';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = 'Неверный формат email';
    msg.style.color = 'red';
    return;
  }
  if (message.length < 10) {
    msg.textContent = 'Сообщение должно быть от 10 символов';
    msg.style.color = 'red';
    return;
  }

  msg.textContent = 'Спасибо! Я скоро отвечу.';
  msg.style.color = 'green';
  this.reset();
});