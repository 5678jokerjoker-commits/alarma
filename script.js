// Фильтрация портфолио
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    // Обновляем активную кнопку
    document.querySelectorAll('.filters button').forEach(b => {
      b.classList.toggle('active', b === button);
    });

    // Фильтруем проекты
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Модальное окно (при клике на проект)
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal').style.display = 'flex';
  });
});

// Закрытие модалки
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});

// Валидация формы
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
      status.textContent = 'Заполните все поля';
      status.style.color = '#dc2626';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.textContent = 'Неверный формат email';
      status.style.color = '#dc2626';
      return;
    }

    status.textContent = 'Сообщение отправлено! Свяжусь в ближайшее время.';
    status.style.color = '#059669';
    this.reset();
  });
}

