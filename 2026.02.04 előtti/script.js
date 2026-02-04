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
updateHeader();

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
        hero.style.setProperty('--parallax', offset + 'px');
        hero.querySelector('::before'); // már a CSS transform-on keresztül
        hero.style.setProperty('--parallax', offset + 'px');
        hero.querySelector('::before');
        hero.style.setProperty('--parallax', offset + 'px');
    }
});
