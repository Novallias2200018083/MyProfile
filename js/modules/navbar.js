// js/modules/navbar.js
import { getElement, getAllElements } from '../utils.js';

export function initNavbar() {
    const navbar = getElement('#navbar');
    const sections = getAllElements('section');
    const navLinks = getAllElements('.nav-links a');
    const hamburger = getElement('.hamburger-menu');
    const navOverlay = getElement('.nav-overlay');

    function updateNavbarAndActiveLink() {
        if (!navbar) return; // Exit if navbar is not found

        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSectionId = 'home';
        sections.forEach(section => {
            // Adjust offset to trigger active state a bit before section actually hits top
            const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });

        // Handle the mobile overlay links too
        const mobileNavLinks = getAllElements('.nav-overlay ul li a');
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNavbarAndActiveLink);
    window.addEventListener('load', updateNavbarAndActiveLink); // Initial check on load

    if (hamburger && navOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navOverlay.classList.toggle('active');
            if (navOverlay.classList.contains('active')) {
                document.body.style.overflowY = 'hidden'; // Disable scroll when menu is open
            } else {
                document.body.style.overflowY = 'auto'; // Re-enable scroll
            }
        });

        navOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflowY = 'auto';
            });
        });
    }
}