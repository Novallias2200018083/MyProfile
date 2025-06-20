// js/modules/preloader.js
import { getElement } from '../utils.js';

export function initPreloader() {
    const preloader = getElement('#preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scroll after preloader
        }, 800); // Adjust delay as needed
    } else {
        document.body.style.overflow = 'auto';
    }
}