// js/modules/smoothScroll.js
import { getAllElements, getElement } from '../utils.js';

export function initSmoothScroll() {
    getAllElements('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = getElement(targetId);
            const navbar = getElement('#navbar');

            if (targetElement && navbar) {
                const navbarHeight = navbar.offsetHeight;
                let offsetTop = targetElement.offsetTop - navbarHeight - 30; // Adjusted offset for better spacing

                // For the 'home' section, scroll to top
                if (targetId === '#home') {
                    offsetTop = 0;
                }

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}