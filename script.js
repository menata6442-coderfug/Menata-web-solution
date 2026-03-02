// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Simple Captcha
const captchaQuestions = [
    { q: 'What is 2 + 3?', a: 5 },
    { q: 'What is 5 + 7?', a: 12 },
    { q: 'What is 10 - 4?', a: 6 },
    { q: 'What is 6 * 2?', a: 12 },
    { q: 'What is 15 / 3?', a: 5 },
    { q: 'What is 8 + 9?', a: 17 },
    { q: 'What is 20 - 5?', a: 15 },
    { q: 'What is 3 * 4?', a: 12 }
];

let currentCaptcha = {};

function generateCaptcha() {
    currentCaptcha = captchaQuestions[Math.floor(Math.random() * captchaQuestions.length)];
    document.getElementById('captchaQ').textContent = currentCaptcha.q;
    document.getElementById('captcha').value = '';
}

// Generate captcha on page load
window.addEventListener('load', generateCaptcha);

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const captchaInput = parseInt(document.getElementById('captcha').value);
    const statusDiv = document.getElementById('status');

    // Validate captcha
    if (captchaInput !== currentCaptcha.a) {
        statusDiv.textContent = '❌ Captcha answer is incorrect. Please try again.';
        statusDiv.className = 'error';
        generateCaptcha();
        return;
    }

    // Validate form
    if (!name || !email || !message) {
        statusDiv.textContent = '❌ Please fill in all required fields.';
        statusDiv.className = 'error';
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        statusDiv.textContent = '❌ Please enter a valid email address.';
        statusDiv.className = 'error';
        return;
    }

    // Prepare data to send
    const formData = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        timestamp: new Date().toISOString()
    };

    // Simulate sending (In a real scenario, this would be sent to a server)
    statusDiv.textContent = '✓ Message sent successfully! We will get back to you soon.';
    statusDiv.className = 'success';

    // Log the data (for demonstration)
    console.log('Form Data:', formData);

    // Reset form
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        generateCaptcha();
        statusDiv.textContent = '';
    }, 3000);
});

// Smooth scroll for navigation links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            // Browser handles smooth scroll, but we can add a subtle delay
        }
    });
});
