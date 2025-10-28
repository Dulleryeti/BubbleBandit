// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
const SUCCESS_MESSAGE_DURATION = 5000; // 5 seconds

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Create and display success message
    const form = this;
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = `Thank you for your booking request, ${data.name}! We'll contact you at ${data.email} to confirm your ${data.service} service appointment.`;
    
    // Insert message at the beginning of the form parent
    form.parentNode.insertBefore(successMessage, form.parentNode.firstChild);
    
    // Reset form
    form.reset();
    
    // Remove success message after duration
    setTimeout(() => {
        successMessage.remove();
    }, SUCCESS_MESSAGE_DURATION);
    
    // In a real application, you would send this data to a server
    console.log('Booking request:', data);
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Set minimum date for booking to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}
