/* ===== HEADER: Scroll + Hamburger + Dark Mode ===== */
const header = document.querySelector('.header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const themeToggle = document.querySelector('.theme-toggle');

// Menü toggle (mobil)
toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
});

// Menü linkek bezárása mobilon
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.textContent = '☰';
    });
});

// Escape gomb bezárás
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        nav.classList.remove('active');
        toggle.textContent = '☰';
    }
});

// Header háttér scrollkor
function updateHeader() {
    if (window.scrollY > 20) {
        header.classList.add('solid');
        header.classList.remove('transparent');
    } else {
        header.classList.add('transparent');
        header.classList.remove('solid');
    }
}
window.addEventListener('scroll', updateHeader);
header.classList.add('transparent');

/* ===== DARK MODE ===== */
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 120;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* ===== HERO PARALLAX ===== */
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.3; // lassú parallax
    if (hero) {
        hero.style.backgroundPosition = `center ${offset}px`;
    }
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
const error = document.getElementById('formError');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!name.value || !email.value || !message.value) {
            error.textContent = 'Minden mező kitöltése kötelező.';
            return;
        }

        if (!email.value.includes('@')) {
            error.textContent = 'Érvényes email címet adjon meg.';
            return;
        }

        error.textContent = 'Üzenet elküldve ✔';
        form.reset();
    });
}

/* ===== NAV LINK AKTÍV ===== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/* ===== OPTIMALIZÁLT REVEAL (requestAnimationFrame) ===== */
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});
