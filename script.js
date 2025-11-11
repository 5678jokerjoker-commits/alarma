// js/script.js
import { projects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
  // Генерация карточек проектов
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.category = project.category;

      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button class="open-modal" data-id="${project.id}">Подробнее</button>
      `;

      projectsGrid.appendChild(card);
    });
  }

  // Фильтрация проектов
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      // Стиль активной кнопки
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // Модальное окно
  const modal = document.getElementById('modal');
  const openModalBtns = document.querySelectorAll('.open-modal');
  const closeModal = document.querySelector('.close');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
      document.body.classList.add('no-scroll');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  });

  // Валидация формы
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });
      if (isValid) {
        alert('Форма успешно отправлена!');
        form.reset();
      }
    });
  }
});




