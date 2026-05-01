/* =========================================================
   Leonardo Moreira — Portfolio
   Canvas particles + scroll reveal + nav + counters
   ========================================================= */

(() => {
    'use strict';

    /* ---------- Year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Nav: shrink + mobile toggle ---------- */
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');

    const onScroll = () => {
        if (window.scrollY > 12) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute(
                'aria-label',
                isOpen ? 'Fechar menu' : 'Abrir menu'
            );
        });

        // close when clicking a link
        nav.querySelectorAll('.nav__links a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Reveal on scroll ---------- */
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, Number(delay));
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('is-visible'));
    }

    /* ---------- Counter animation ---------- */
    const counters = document.querySelectorAll('[data-count]');

    const animateCount = (el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();

        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const formatter = new Intl.NumberFormat('pt-BR');

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(target * easeOut(progress));
            el.textContent = formatter.format(value) + (progress === 1 ? suffix : '');
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = formatter.format(target) + suffix;
        };

        requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
        const cio = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        cio.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach((c) => cio.observe(c));
    } else {
        counters.forEach((c) => animateCount(c));
    }

    /* ---------- Background canvas: particle network ---------- */
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');

    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = null;
    let mouse = { x: -9999, y: -9999, active: false };

    const config = {
        density: 14000, // 1 particle per ~14000 px²
        maxSpeed: 0.35,
        linkDistance: 130,
        particleColor: 'rgba(180, 200, 240, 0.55)',
        linkColor: 'rgba(255, 77, 141, ',
        accentColor: 'rgba(54, 224, 255, ',
    };

    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        spawn();
    };

    const spawn = () => {
        const area = width * height;
        const count = Math.min(120, Math.max(28, Math.round(area / config.density)));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * config.maxSpeed,
            vy: (Math.random() - 0.5) * config.maxSpeed,
            r: Math.random() * 1.6 + 0.6,
            accent: Math.random() < 0.18,
        }));
    };

    const step = () => {
        ctx.clearRect(0, 0, width, height);

        // update + draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            // bounce edges with wrap-soft
            if (p.x < -10) p.x = width + 10;
            else if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            else if (p.y > height + 10) p.y = -10;

            // mouse repulsion
            if (mouse.active) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 14000) {
                    const d = Math.sqrt(d2) || 1;
                    const force = (14000 - d2) / 14000 / d;
                    p.x += dx * force * 0.6;
                    p.y += dy * force * 0.6;
                }
            }

            ctx.beginPath();
            ctx.fillStyle = p.accent ? 'rgba(255, 77, 141, 0.85)' : config.particleColor;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // links
        const ld = config.linkDistance;
        const ld2 = ld * ld;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i];
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < ld2) {
                    const opacity = (1 - d2 / ld2) * 0.45;
                    const isAccent = a.accent || b.accent;
                    ctx.beginPath();
                    ctx.strokeStyle = (isAccent ? config.accentColor : config.linkColor) + opacity + ')';
                    ctx.lineWidth = 0.7;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        rafId = requestAnimationFrame(step);
    };

    const onMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    };
    const onLeave = () => {
        mouse.active = false;
        mouse.x = -9999;
        mouse.y = -9999;
    };

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 120);
    });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    // pause when tab hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(rafId);
        } else {
            rafId = requestAnimationFrame(step);
        }
    });

    resize();
    rafId = requestAnimationFrame(step);
})();
