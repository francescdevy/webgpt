/* ===== HEADER: Scroll + Hamburger ===== */
const header = document.querySelector('.header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const themeToggle = document.querySelector('.theme-toggle');

// Mobil menü toggle
toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    toggle.textContent = isOpen ? '✕' : '☰';
    toggle.setAttribute('aria-expanded', isOpen);
});

// Menü bezárása linkre kattintva
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.textContent = '☰';
        toggle.setAttribute('aria-expanded', false);
    });
});

// Escape gomb bezárás
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        nav.classList.remove('active');
        toggle.textContent = '☰';
        toggle.setAttribute('aria-expanded', false);
    }
});

// Header háttér váltás scrollnál
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

/* ===== DARK MODE with localStorage ===== */
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ===== ACCESSIBILITY: keyboard support ===== */
[themeToggle, toggle].forEach(el => {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
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
    if (!hero) return;
    const offset = window.scrollY * 0.3;
    hero.style.setProperty('--parallax', offset + 'px');
});

/* ===== LANGUAGE SWITCH: keep hash + aria-current ===== */
const huLink = document.querySelector('.lang-hu');
const enLink = document.querySelector('.lang-en');
const overlay = document.querySelector('.lang-fade-overlay');
const hash = window.location.hash || '';

if (huLink && enLink) {
    huLink.href = '/hu/' + hash;
    enLink.href = '/en/' + hash;
}

const path = window.location.pathname;

if (path.startsWith('/hu')) {
    huLink.classList.add('active');
    huLink.setAttribute('aria-current', 'true');
    enLink.setAttribute('aria-current', 'false');
}

if (path.startsWith('/en')) {
    enLink.classList.add('active');
    enLink.setAttribute('aria-current', 'true');
    huLink.setAttribute('aria-current', 'false');
}

/* ===== LANGUAGE SWITCH SOFT FADE ===== */
function fadeToLang(link) {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.href;
        overlay.style.opacity = '1';
        setTimeout(() => {
            window.location.href = href;
        }, 400);
    });
}
[huLink, enLink].forEach(fadeToLang);

/* ===== ACTIVE MENU ON SCROLL + Sliding Underline ===== */
const sections = document.querySelectorAll('section[id]');
const menu = document.querySelector('nav');
const menuLinks = document.querySelectorAll('nav a');
const underline = document.querySelector('nav .underline');

function updateUnderline(link) {
    const linkRect = link.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    underline.style.width = linkRect.width + 'px';
    underline.style.left = (linkRect.left - menuRect.left) + 'px';
}

function activateMenuOnScroll() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            menuLinks.forEach(link => link.classList.remove('active'));

            const activeLink = Array.from(menuLinks).find(
                link => link.getAttribute('href') === '#' + sectionId
            );

            if (activeLink) {
                activeLink.classList.add('active');
                updateUnderline(activeLink);
            }
        }
    });
}

window.addEventListener('scroll', activateMenuOnScroll);
window.addEventListener('resize', () => {
    const activeLink = document.querySelector('nav a.active');
    if (activeLink) updateUnderline(activeLink);
});
activateMenuOnScroll();

document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const nextSection = document.querySelector('#services');
    nextSection.scrollIntoView({ behavior: 'smooth' });
});


// Scroll indicator eltüntetése örökre
const scrollIndicator = document.querySelector('.scroll-indicator');

function hideScrollIndicator() {
    if (!scrollIndicator) return;

    scrollIndicator.style.opacity = '0';

    // 0.5s után eltávolítjuk a DOM-ból, hogy ne blokkoljon pointer-eventet
    setTimeout(() => {
        if (scrollIndicator.parentNode) {
            scrollIndicator.parentNode.removeChild(scrollIndicator);
        }
    }, 500);

    // Eltávolítjuk az eseményfigyelőt
    window.removeEventListener('scroll', hideScrollIndicator);
}

// Ha az oldal betöltésétől scrollolnak
window.addEventListener('scroll', hideScrollIndicator);