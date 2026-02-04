document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const footerLinks = document.getElementById('footer-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const langSwitch = document.querySelector('.lang-switch');

    // Linkek struktúrája (mind a navigáció, mind a footer számára)
    const links = [
        { href: '#home', text: 'Kezdőlap' },
        { href: '#services', text: 'Szolgáltatások' },
        { href: '#features', text: 'Funkciók' },
        { href: '#news', text: 'Hírek' }, 
        { href: '#contact', text: 'Kapcsolat' }
    ];

    // Nyelvi linkek
    const langLinks = [
        { href: '/hu/', text: 'HU', lang: 'hu', flag: '🇭🇺', svg: `
            <svg class="flag" viewBox="0 0 3 2" role="img" aria-hidden="true">
                <rect width="3" height="2" fill="#ffffff" />
                <rect width="3" height="0.6667" y="0" fill="#ce2939" />
                <rect width="3" height="0.6667" y="1.3333" fill="#477050" />
            </svg>` },
        { href: '/en/', text: 'EN', lang: 'en', flag: '🇬🇧', svg: `
            <svg class="flag" viewBox="0 0 7410 3900" role="img" aria-hidden="true">
                <rect width="7410" height="3900" fill="#b22234" />
                <g fill="#ffffff">
                    <rect y="300" width="7410" height="300" />
                    <rect y="900" width="7410" height="300" />
                    <rect y="1500" width="7410" height="300" />
                    <rect y="2100" width="7410" height="300" />
                    <rect y="2700" width="7410" height="300" />
                    <rect y="3300" width="7410" height="300" />
                </g>
                <rect width="2964" height="2100" fill="#3c3b6e" />
            </svg>` }
    ];

    // Navigációs linkek hozzáadása a navbar-hoz
    links.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.text;
        navbar.appendChild(anchor);
    });

    // Footer linkek hozzáadása
    links.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.text;
        footerLinks.appendChild(anchor);
    });

    // Nyelvválasztó linkek hozzáadása
    langLinks.forEach(lang => {
        const anchor = document.createElement('a');
        anchor.href = lang.href;
        anchor.classList.add('lang-link', `lang-${lang.lang}`);
        anchor.setAttribute('lang', lang.lang);
        
        // SVG zászló hozzáadása a nyelvi linkhez
        const flagSvg = document.createElement('span');
        flagSvg.innerHTML = lang.svg;
        anchor.appendChild(flagSvg);
        
        // Nyelv szöveg
        const langText = document.createElement('span');
        langText.textContent = lang.text;
        anchor.appendChild(langText);

        langSwitch.appendChild(anchor);
    });

    // Nyelvválasztó aktív linkek kezelése
    const path = window.location.pathname;

    // HU nyelv beállítása
    if (path.startsWith('/hu')) {
        const huLink = document.querySelector('.lang-hu');
        if (huLink) {
            huLink.setAttribute('aria-current', 'true');
        }
    }

    // EN nyelv beállítása
    if (path.startsWith('/en')) {
        const enLink = document.querySelector('.lang-en');
        if (enLink) {
            enLink.setAttribute('aria-current', 'true');
        }
    }

    // Sötét mód kezelés
    const currentTheme = localStorage.getItem('theme') || 'light'; // alapértelmezett téma 'light'
    
    // Kezdeti téma beállítása
    document.body.classList.add(currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';

    // A gomb kattintására változtatjuk a témát
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(newTheme);

        // Elmentjük a felhasználó választását a localStorage-ban
        localStorage.setItem('theme', newTheme);

        // Változtatjuk a gomb ikonját is
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️'; // Világos mód - sötét mód
    });
});
