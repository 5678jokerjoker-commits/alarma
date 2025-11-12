document.addEventListener('DOMContentLoaded', () => {
    // Проверка, на какой странице мы
    if (document.querySelector('#projects-grid')) {
        renderProjects(projects);

        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                setActiveFilter(button);
                renderProjects(projects, filter);
            });
        });
    }

    // Модальное окно
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const project = projects.find(p => p.id == id);

            document.getElementById('modal-title').textContent = project.title;
            document.getElementById('modal-description').textContent = project.description;
            document.getElementById('modal-image').src = project.image;

            modal.showModal();
        });
    });

    closeModal.addEventListener('click', () => modal.close());

    // Форма
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Форма отправлена! Спасибо.');
            form.reset();
        });
    }
});

function renderProjects(projects, filter = 'all') {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter));

    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.id = project.id;
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        grid.appendChild(card);
    });
}

function setActiveFilter(button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}
