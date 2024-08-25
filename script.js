document.addEventListener('DOMContentLoaded', function() {
    loadMassageTypes();
    setupEventListeners();
});

const massageTypes = [
    {
        name: "Masaje en Pareja de Aromaterapia",
        description: "Sumérgete en un oasis de tranquilidad junto a tu pareja con un masaje relajante de aromaterapia.",
        benefits: "Alivio del estrés, mejora del estado de ánimo y reducción de tensiones musculares.",
        duration: "60 minutos",
        image: "https://via.placeholder.com/300x200?text=Aromaterapia"
    },
    {
        name: "Masaje de Piedras Calientes en Pareja",
        description: "Deja que el calor envolvente de las piedras lisas y calientes te lleve a un estado profundo de relajación.",
        benefits: "Alivio de dolores musculares, mejora de la circulación sanguínea y una relajación profunda.",
        duration: "60 minutos",
        image: "https://via.placeholder.com/300x200?text=Piedras+Calientes"
    },
    {
        name: "Masaje Relajante",
        description: "Ideal para aliviar el estrés y la tensión.",
        benefits: "Relajación profunda, mejora del sueño.",
        duration: "60 minutos",
        image: "path/to/relaxing-massage.jpg"
    },
    {
        name: "Masaje Deportivo",
        description: "Perfecto para aliviar la fatiga muscular.",
        benefits: "Alivio de la fatiga muscular, mejora del rendimiento.",
        duration: "60 minutos",
        image: "path/to/sports-massage.jpg"
    },
    {
        name: "Masaje Terapéutico",
        description: "Alivia dolores y molestias crónicas.",
        benefits: "Alivio de dolores crónicos, mejora del bienestar.",
        duration: "60 minutos",
        image: "path/to/therapeutic-massage.jpg"
    }
    // Puedes agregar más objetos de masaje aquí
];

function loadMassageTypes() {
    const massageGrid = document.getElementById('massage-grid');
    massageTypes.forEach(massage => {
        const massageElement = document.createElement('div');
        massageElement.className = 'massage-card';
        massageElement.innerHTML = `
            <img src="${massage.image}" alt="${massage.name}">
            <h3>${massage.name}</h3>
            <p>${massage.description}</p>
            <p><strong>Beneficios:</strong> ${massage.benefits}</p>
            <p><strong>Duración:</strong> ${massage.duration}</p>
            <button class="book-button">Reservar ahora</button>
        `;
        massageGrid.appendChild(massageElement);
    });

    document.querySelectorAll('.book-button').forEach(button => {
        button.addEventListener('click', function() {
            const massageName = this.parentElement.querySelector('h3').textContent;
            reserveNow(massageName);
        });
    });
}

function setupEventListeners() {
    document.querySelectorAll('.flag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.dataset.lang);
        });
    });

    document.getElementById('lightMode').addEventListener('click', () => setTheme('light'));
    document.getElementById('darkMode').addEventListener('click', () => setTheme('dark'));

    document.querySelectorAll('.massage-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectMassageType(this.dataset.type);
        });
    });
}

function changeLanguage(lang) {
    console.log(`Cambiando idioma a: ${lang}`);
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
}

function reserveNow(massageTitle) {
    const whatsappNumber = "5215640020305";
    const message = `Quiero reservar un ${massageTitle}`;
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
