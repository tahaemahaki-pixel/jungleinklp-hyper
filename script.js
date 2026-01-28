document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Form submission handling
    const form = document.getElementById('enquiry-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // Show loading state
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(form);
            const action = form.getAttribute('action');

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    formStatus.innerText = "Thank you! Your enquiry has been sent. We'll be in touch soon.";
                    formStatus.style.color = "#4CAF50";
                    formStatus.style.marginTop = "1rem";
                    form.reset();
                    btn.innerText = 'Sent!';

                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }, 3000);
                } else {
                    formStatus.innerText = data.message || "Oops! There was a problem submitting your form";
                    formStatus.style.color = "#ff4d4d";
                    formStatus.style.marginTop = "1rem";
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            } catch (error) {
                formStatus.innerText = "Oops! There was a problem connecting to the server.";
                formStatus.style.color = "#ff4d4d";
                formStatus.style.marginTop = "1rem";
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // Dynamic header background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });
});
