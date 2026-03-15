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

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');
        const defaultButtonText = submitBtn ? submitBtn.textContent : 'Send Message';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('is-sending');
            submitBtn.textContent = 'Sending...';
        }

        if (formStatus) {
            formStatus.textContent = 'Sending your message...';
            formStatus.classList.remove('is-error', 'is-success');
        }

        const action = contactForm.getAttribute('action');
        const ajaxAction = action ? action.replace('formsubmit.co/', 'formsubmit.co/ajax/') : action;

        try {
            const response = await fetch(ajaxAction, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const result = await response.json();
            if (result.success) {
                if (formStatus) {
                    formStatus.textContent = 'Message sent successfully.';
                    formStatus.classList.add('is-success');
                }
                contactForm.reset();
                const messageSent = document.getElementById('message-sent');
                if (messageSent) {
                    messageSent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            if (formStatus) {
                formStatus.textContent = 'Sorry, the message could not be sent. Please try again.';
                formStatus.classList.add('is-error');
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('is-sending');
                submitBtn.textContent = defaultButtonText;
            }
        }
    });
}

// Smooth scroll for navigation links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            // Browser handles smooth scroll, but we can add a subtle delay
        }
    });
});
