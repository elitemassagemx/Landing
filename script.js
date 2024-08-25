document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
});

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa las animaciones AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Navegación sticky
    const header = document.querySelector('header');
    const sticky = header.offsetTop;

    function makeNavSticky() {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', makeNavSticky);

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Toggle para el menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }

    // Validación del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Aquí iría el código para enviar el formulario
                alert('Formulario enviado con éxito!');
                contactForm.reset();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    // Inicialización del carrusel de testimonios
    if (typeof $.fn.slick !== 'undefined') {
        $('.testimonios-carrusel').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000
        });
    }

    // Lazy loading de imágenes
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        img.src = src;
    }

    // Cuenta regresiva para ofertas especiales
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const countDownDate = new Date(countdownElement.dataset.date).getTime();

        const countdownFunction = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(countdownFunction);
                countdownElement.innerHTML = "¡Oferta expirada!";
            }
        }, 1000);
    }
});

// Función para inicializar el mapa de Google (si lo estás usando)
function initMap() {
    const location = {lat: TU_LATITUD, lng: TU_LONGITUD};
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}