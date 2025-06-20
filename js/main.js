// js/main.js
import { initPreloader } from './modules/preloader.js';
import { initNavbar } from './modules/navbar.js';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initRevealElements } from './modules/revealElements.js';
import { initTypingEffect } from './modules/typingEffect.js';
import { initParticlesBackground } from './modules/particlesBackground.js';
import { initWhatsappForm } from './modules/whatsappForm.js'; // Modul WhatsApp baru

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavbar();
    initSmoothScroll();
    initRevealElements();
    initTypingEffect();
    initParticlesBackground();
    initWhatsappForm(); // Inisialisasi formulir WhatsApp

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

// Anda bisa menambahkan fungsi atau inisialisasi global lainnya di sini jika diperlukan.
// Misalnya, untuk men-trigger skill bar animation secara terpisah jika tidak terikat ke revealElements
window.addEventListener('load', () => {
    document.querySelectorAll('.skill-card.visible .skill-bar').forEach(skillBar => {
        skillBar.style.width = skillBar.dataset.initialWidth || skillBar.style.width;
    });
});