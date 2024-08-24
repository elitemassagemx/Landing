document.addEventListener('DOMContentLoaded', function() {
    // Cargar tipos de masajes
    loadMassageTypes();

    // Manejar cambio de idioma
    document.querySelectorAll('.flag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.dataset.lang);
        });
    });

    // Manejar cambio de modo (claro/oscuro)
    document.getElementById('lightMode').addEventListener('click', () => setTheme('light'));
    document.getElementById('darkMode').addEventListener('click', () => setTheme('dark'));

    // Manejar selección de tipo de masaje
    document.querySelectorAll('.massage-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectMassageType(this.dataset.type);
        });
    });
});

function loadMassageTypes() {
    const massageTypes = [
        {
            name: "Masaje de Aromaterapia",
            description: "Sumérgete en un oasis de tranquilidad con un masaje relajante de aromaterapia.",
            duration: "60 minutos",
            image: "aromatherapy-massage.jpg"
        },
        {
            name: "Masaje de Piedras Calientes",
            description: "Deja que el calor envolvente de las piedras lisas y calientes te lleve a un estado profundo de relajación.",
            duration: "60 minutos",
            image: "hot-stone-massage.jpg"
        },
        // Agregar más tipos de masajes aquí
    ];

    const massageGrid = document.getElementById('massage-grid');
    massageTypes.forEach(massage => {
        const massageElement = document.createElement('div');
        massageElement.className = 'massage-card';
        massageElement.innerHTML = `
            <img src="${massage.image}" alt="${massage.name}">
            <h3>${massage.name}</h3>
            <p>${massage.description}</p>
            <p>Duración: ${massage.duration}</p>
            <button class="book-button">Reservar ahora</button>
        `;
        massageGrid.appendChild(massageElement);
    });

    // Agregar evento de reserva a los botones
    document.querySelectorAll('.book-button').forEach(button => {
        button.addEventListener('click', function() {
            const massageName = this.parentElement.querySelector('h3').textContent;
            bookMassage(massageName);
        });
    });
}

function changeLanguage(lang) {
    console.log(`Cambiando idioma a: ${lang}`);
    // Aquí implementaremos la lógica para cambiar el idioma usando Deep Translate
    // Por ahora, solo actualizamos la clase activa en los botones
    document.querySelectorAll('.flag-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.getElementById('lightMode').classList.toggle('active', theme === 'light');
    document.getElementById('darkMode').classList.toggle('active', theme === 'dark');
}

function selectMassageType(type) {
    console.log(`Tipo de masaje seleccionado: ${type}`);
    document.querySelectorAll('.massage-type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });
    // Aquí actualizaríamos la descripción de los masajes según el tipo seleccionado
}

function bookMassage(massageName) {
    const message = encodeURIComponent(`Hola, me gustaría reservar un ${massageName}`);
    window.open(`https://wa.me/525640020305?text=${message}`, '_blank');
}
