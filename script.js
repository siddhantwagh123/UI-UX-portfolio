// Initialize Lucide Icons
lucide.createIcons();

// --- Smooth Scrolling & Navbar Effect ---
const navbar = document.querySelector('.navbar');
const colorModeToggle = document.getElementById('color_mode');

// --- Theme Mode Setup ---
function applyTheme(mode) {
    const dark = mode === 'dark';
    document.body.classList.toggle('dark-mode', dark);
    if (colorModeToggle) {
        colorModeToggle.checked = dark;
    }
}

if (colorModeToggle) {
    const storedMode = localStorage.getItem('theme-mode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(storedMode || (prefersDark ? 'dark' : 'light'));

    colorModeToggle.addEventListener('change', (event) => {
        const mode = event.target.checked ? 'dark' : 'light';
        applyTheme(mode);
        localStorage.setItem('theme-mode', mode);
    });
}

window.addEventListener('scroll', () => {
    // Add glassmorphism/blurry effect to navbar on scroll
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('neo-nav');
        navbar.classList.add('neo-flat');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('neo-flat');
        navbar.classList.add('neo-nav');
    }
});

// --- Scroll Reveal Animation ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();

// Note: All button hover/active effects are handled purely via CSS.
// No JS listeners on .neo-button — this ensures native <a> tag navigation
// (mailto:, external links) works without any interference.

// === Spotlight Mouse-Follow Effect for Hero (User Requested) ===
window.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.querySelector('.spotlight');
    const heroSection = document.querySelector('#hero');
    if (!spotlight || !heroSection) return;

    let spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.4) 220px)';

    const updateSpotlight = (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        spotlight.style.backgroundImage = `radial-gradient(circle at ${xPercent}% ${yPercent}%, ${spotlightSize}`;
    };

    heroSection.addEventListener('mousemove', updateSpotlight);

    heroSection.addEventListener('mousedown', (e) => {
        spotlightSize = 'transparent 130px, rgba(0, 0, 0, 0.6) 170px)';
        updateSpotlight(e);
    });

    heroSection.addEventListener('mouseup', (e) => {
        spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.4) 220px)';
        updateSpotlight(e);
    });

    // Smooth transition on mouseleave
    heroSection.addEventListener('mouseleave', () => {
        spotlight.style.backgroundImage = 'radial-gradient(circle at 50% 50%, transparent 160px, rgba(0, 0, 0, 0.4) 220px)';
    });
});



