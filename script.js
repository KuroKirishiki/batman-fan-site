// Reconstructed for the supplied Batman HTML and CSS.
(() => {
    'use strict';
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (menu && hamburger) {
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('tabindex', '0');
        hamburger.setAttribute('aria-label', 'Открыть меню');
        hamburger.setAttribute('aria-expanded', 'false');
        const setMenu = (open) => {
            menu.classList.toggle('active', open);
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
        };
        hamburger.addEventListener('click', () => setMenu(!menu.classList.contains('active')));
        hamburger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMenu(!menu.classList.contains('active'));
            }
        });
        menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') setMenu(false);
        });
    }

    const track = document.getElementById('sliderTrack');
    const dots = document.getElementById('sliderDots');
    if (!track || !dots) return;
    const wrapper = track.parentElement;
    const cards = Array.from(track.querySelectorAll('.movie-card'));
    let current = 0;
    let max = 0;
    let step = 0;
    // Clip the moving cards inside the existing slider viewport.
    wrapper.style.overflow = 'hidden';
    const render = () => {
        track.style.transform = `translateX(-${current * step}px)`;
        Array.from(dots.children).forEach((dot, index) => {
            dot.classList.toggle('active', index === current);
            dot.setAttribute('aria-current', index === current ? 'true' : 'false');
        });
    };
    const layout = () => {
        if (!cards.length) return;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        step = cards[0].getBoundingClientRect().width + gap;
        const visible = Math.max(1, Math.round((wrapper.clientWidth + gap) / step));
        max = Math.max(0, cards.length - visible);
        current = Math.min(current, max);
        dots.replaceChildren();
        for (let index = 0; index <= max; index++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'dot';
            dot.style.padding = '0';
            dot.setAttribute('aria-label', `Показать слайд ${index + 1}`);
            dot.addEventListener('click', () => { current = index; render(); });
            dots.appendChild(dot);
        }
        render();
    };
    window.moveSlide = (direction) => {
        current = (current + direction + max + 1) % (max + 1);
        render();
    };
    window.addEventListener('resize', layout);
    layout();
})();
