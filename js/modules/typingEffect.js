// js/modules/typingEffect.js
import { getElement } from '../utils.js';

export function initTypingEffect() {
    const heroTypingTextElement = getElement('#hero-typing-text');
    if (!heroTypingTextElement) return;

    const heroSubtitles = ["I,m a Web Developer", "I,m a Data Scientist", "I,m a Software Engineer", "I,m a System Analyst"];
    let subtitleIndex = 0;
    let charIndex = 0;
    const typingSpeed = 90; // milliseconds per character
    const erasingSpeed = 60; // milliseconds per character
    const delayBetweenSubtitles = 2000; // milliseconds

    function typeSubtitle() {
        if (charIndex < heroSubtitles[subtitleIndex].length) {
            heroTypingTextElement.textContent += heroSubtitles[subtitleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeSubtitle, typingSpeed);
        } else {
            setTimeout(eraseSubtitle, delayBetweenSubtitles);
        }
    }

    function eraseSubtitle() {
        if (charIndex > 0) {
            heroTypingTextElement.textContent = heroSubtitles[subtitleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseSubtitle, erasingSpeed);
        } else {
            subtitleIndex = (subtitleIndex + 1) % heroSubtitles.length;
            setTimeout(typeSubtitle, 500); // Small delay before typing next
        }
    }
    
    // Start typing after initial hero animations (adjust delay if needed after preloader)
    setTimeout(() => {
        typeSubtitle();
    }, 1500);
}