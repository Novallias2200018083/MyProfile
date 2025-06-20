// js/modules/whatsappForm.js
import { getElement, createAndAppend } from '../utils.js';

export function initWhatsappForm() {
    const contactForm = getElement('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const whatsappNumber = this.dataset.whatsappNumber; // Ambil nomor WA dari data-attribute
        if (!whatsappNumber) {
            console.error('WhatsApp number not set on the form.');
            alert('Nomor WhatsApp belum dikonfigurasi. Mohon hubungi langsung.');
            return;
        }

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (name && email && subject && message) {
            // Format pesan untuk WhatsApp
            const waMessage = `Halo [Nama Anda],\n\nSaya ingin menghubungi Anda dari portfolio Anda.\n\nNama: ${name}\nEmail: ${email}\nSubjek: ${subject}\n\nPesan:\n${message}\n\nTerima kasih!`;
            
            // Encode URI component untuk spasi dan karakter khusus
            const encodedMessage = encodeURIComponent(waMessage);
            
            // Buat URL WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Buka di tab baru
            window.open(whatsappUrl, '_blank');

            // Tampilkan pesan sukses sementara di halaman
            displayTemporaryAlert(`Terima kasih, ${name}! Anda akan diarahkan ke WhatsApp.`);
            
            this.reset(); // Kosongkan formulir setelah dikirim
        } else {
            displayTemporaryAlert('Mohon lengkapi semua field yang diperlukan.', 'error');
        }
    });
}

function displayTemporaryAlert(message, type = 'success') {
    let alertBox = getElement('#form-alert');
    if (!alertBox) {
        alertBox = createAndAppend(document.body, 'div', { id: 'form-alert' });
    }

    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.3);
        z-index: 2000;
        font-weight: bold;
        text-align: center;
        animation: fadeInOut 3s forwards;
        font-family: var(--font-body);
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
    `;

    if (type === 'success') {
        alertBox.style.backgroundColor = 'var(--accent-blue)';
        alertBox.style.color = 'var(--primary-bg)';
        alertBox.innerHTML = `<i class="fas fa-check-circle" style="margin-right: 10px;"></i> ${message}`;
        alertBox.style.boxShadow = '0 5px 25px var(--shadow-light)';
    } else {
        alertBox.style.backgroundColor = '#e74c3c'; // Red for error
        alertBox.style.color = '#fff';
        alertBox.innerHTML = `<i class="fas fa-times-circle" style="margin-right: 10px;"></i> ${message}`;
        alertBox.style.boxShadow = '0 5px 25px rgba(231, 76, 60, 0.4)';
    }

    // Ensure animation CSS is present
    let styleSheet = getElement('#custom-animations-style');
    if (!styleSheet) {
        styleSheet = createAndAppend(document.head, 'style', { id: 'custom-animations-style' });
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -60%); }
                10% { opacity: 1; transform: translate(-50%, -50%); }
                90% { opacity: 1; transform: translate(-50%, -50%); }
                100% { opacity: 0; transform: translate(-50%, -40%); }
            }
        `;
    }
    
    // Trigger animation
    alertBox.style.opacity = '1';
    alertBox.style.transform = 'translate(-50%, -50%)';

    setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translate(-50%, -40%)';
        setTimeout(() => alertBox.remove(), 500); // Remove after fade out
    }, 3000);
}