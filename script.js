// === ФИЛЬТРАЦИЯ ПОРТФОЛИО ===
document.addEventListener('DOMContentLoaded', () => {
  // Только если есть фильтры
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Обновляем активную кнопку
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

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
  }

  // === МОДАЛЬНОЕ ОКНО ===
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('modal');
  
  if (projectCards.length > 0 && modal) {
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        document.getElementById('modal-img').src = imgSrc;
        document.getElementById('modal-title').textContent = title;
        modal.style.display = 'flex';
      });
    });

    // Закрытие модалки
    document.querySelector('.close')?.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // === ФОРМА ОБРАТНОЙ СВЯЗИ ===
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      const status = document.getElementById('form-status');

      if (!name || !email || !message) {
        status.textContent = '⚠️ Заполните все поля';
        status.style.color = '#ef4444';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        status.textContent = '⚠️ Неверный формат email';
        status.style.color = '#ef4444';
        return;
      }

      status.textContent = '✅ Сообщение отправлено! Спасибо!';
      status.style.color = '#10b981';
      this.reset();
    });
  }
});


