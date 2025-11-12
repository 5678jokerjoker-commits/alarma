// Код для страницы "Обо мне"
if (document.getElementById('toggle-details')) {
    const button = document.getElementById('toggle-details');
    const extraDetails = document.getElementById('extra-details');

    button.addEventListener('click', () => {
        extraDetails.classList.toggle('hidden');
        button.textContent = extraDetails.classList.contains('hidden') ? 'Подробнее' : 'Свернуть';
    });
}
