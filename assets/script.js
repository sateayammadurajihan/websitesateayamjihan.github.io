// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Load Testimonials
function loadTestimonials() {
    const testimoniContainer = document.getElementById('testimoni-list');
    if (!testimoniContainer) return;

    // In production, fetch from API
    const testimonials = JSON.parse(localStorage.getItem('testimoni') || '[]');
    
    if (testimonials.length > 0) {
        testimoniContainer.innerHTML = '';
        testimonials.forEach(testi => {
            const stars = '⭐️'.repeat(testi.rating);
            testimoniContainer.innerHTML += `
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold mr-4">
                            ${testi.nama.charAt(0)}
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800">${testi.nama}</h4>
                            <p class="text-orange-500">${testi.pekerjaan || 'Pelanggan'}</p>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-2">"${testi.testimoni}"</p>
                    <div class="text-yellow-400">${stars}</div>
                </div>
            `;
        });
    }
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const successMessage = document.getElementById('successMessage');
        
        // In production, send data to backend
        const formData = {
            name: this.name.value,
            email: this.email.value,
            phone: this.phone.value,
            message: this.message.value
        };
        
        console.log('Form submitted:', formData); // Replace with actual submission
        
        this.reset();
        if (successMessage) {
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        }
    });
}

// Testimonial Form Submission
const testimoniForm = document.getElementById('testimoniForm');
if (testimoniForm) {
    testimoniForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!this.checkValidity()) {
            alert('Harap isi semua field yang wajib diisi!');
            return;
        }

        const testimoniData = {
            nama: this.nama.value,
            email: this.email.value,
            pekerjaan: this.pekerjaan.value,
            testimoni: this.testimoni.value,
            rating: this.querySelector('input[name="rating"]:checked').value
        };
        
        let testimoniList = JSON.parse(localStorage.getItem('testimoni') || '[]');
        testimoniList.push(testimoniData);
        localStorage.setItem('testimoni', JSON.stringify(testimoniList));
        
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.remove('hidden');
            this.reset();
        }
        
        loadTestimonials();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadTestimonials();
});


