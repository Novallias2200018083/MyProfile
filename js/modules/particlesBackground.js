// js/modules/particlesBackground.js
import { getElement } from '../utils.js';

export function initParticlesBackground() {
    const canvas = getElement('#background-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 150; // More particles
    const maxRadius = 2.5;
    const minRadius = 0.5;
    const speedMultiplier = 0.4; // Slower, more subtle movement

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
            this.alpha = 0;
            this.fadeSpeed = Math.random() * 0.01 + 0.003; // Slower fade-in
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.radius * 6; // Stronger glow
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            if (this.alpha < 0.6) { // Max alpha for subtle effect
                this.alpha += this.fadeSpeed;
            }

            this.x += this.velocity.x * speedMultiplier;
            this.y += this.velocity.y * speedMultiplier;

            // Boundary detection: Reset particle if it goes off screen
            if (this.x - this.radius > canvas.width + 50 || this.x + this.radius < -50 ||
                this.y - this.radius > canvas.height + 50 || this.y + this.radius < -50) {
                this.reset();
            }
        }

        reset() {
            const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
            switch (edge) {
                case 0: // Top
                    this.x = Math.random() * canvas.width;
                    this.y = -this.radius;
                    break;
                case 1: // Right
                    this.x = canvas.width + this.radius;
                    this.y = Math.random() * canvas.height;
                    break;
                case 2: // Bottom
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height + this.radius;
                    break;
                case 3: // Left
                    this.x = -this.radius;
                    this.y = Math.random() * canvas.height;
                    break;
            }
            this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.6 + 0.1; // Slightly slower speed variation
            this.velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            const colors = ['#00C2FF', '#9A00FF', '#E0E0FF']; // Using CSS variables for consistency
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 0;
            this.fadeSpeed = Math.random() * 0.01 + 0.003;
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * (maxRadius - minRadius) + minRadius;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.6 + 0.1;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            const colors = ['#00C2FF', '#9A00FF', '#E0E0FF'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, radius, color, velocity));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear fully for crisp particles

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles(); // Re-initialize particles on resize for better distribution
    });
    resizeCanvas();
    initParticles();
    animateParticles();
}