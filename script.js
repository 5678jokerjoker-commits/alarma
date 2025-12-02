document.addEventListener('DOMContentLoaded', () => {
    // Логика для "Обо мне"
    if (document.getElementById('toggle-details')) {
        const button = document.getElementById('toggle-details');
        const extraDetails = document.getElementById('extra-details');

        button.addEventListener('click', () => {
            extraDetails.classList.toggle('hidden');
            button.textContent = extraDetails.classList.contains('hidden') ? 'Подробнее' : 'Свернуть';
        });
    }

    // Остальная логика (портфолио и т.д.)
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

    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');

    if (modal && closeModal) {
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
    }
});

function renderProjects(projects, filter = 'all') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

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

