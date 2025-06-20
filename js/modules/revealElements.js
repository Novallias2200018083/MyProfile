// js/modules/revealElements.js
import { getAllElements } from '../utils.js';

export function initRevealElements() {
    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust for earlier/later trigger
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    // Special handling for skill bars
                    if (entry.target.classList.contains('skill-card')) {
                        const skillBar = entry.target.querySelector('.skill-bar');
                        if (skillBar) {
                            // Store original width for re-triggering animation on new visits
                            skillBar.dataset.initialWidth = skillBar.style.width;
                            skillBar.style.width = '0%'; // Reset to 0 to re-animate
                            requestAnimationFrame(() => {
                                skillBar.style.transition = 'width 1.5s ease-out';
                                skillBar.style.width = skillBar.dataset.initialWidth; // Animate to full width
                            });
                        }
                    }
                }, delay * 1000); // Convert delay to milliseconds
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, revealOptions);

    getAllElements('.reveal-element').forEach(el => {
        revealObserver.observe(el);
    });
}