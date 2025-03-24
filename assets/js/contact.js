document.addEventListener('DOMContentLoaded', function() {
    // Get form and alert elements
    const contactForm = document.querySelector('.contact-form');
    const errorAlert = document.getElementById('errorAlert');
    const successAlert = document.getElementById('successAlert');
    const closeErrorBtn = document.getElementById('closeErrorAlert');
    const closeSuccessBtn = document.getElementById('closeSuccessAlert');

    // Form fields
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('contact-email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Function to show alert
    function showAlert(alertElement, message = null) {
        if (message && alertElement.querySelector('span')) {
            // Use innerHTML so HTML lists render properly
            alertElement.querySelector('span').innerHTML = message;
        }
        alertElement.classList.remove('hidden');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideAlert(alertElement);
        }, 5000);
    }

    // Function to hide alert
    function hideAlert(alertElement) {
        alertElement.classList.add('hiding');
        setTimeout(() => {
            alertElement.classList.add('hidden');
            alertElement.classList.remove('hiding');
        }, 300);
    }

    // Close alert buttons
    closeErrorBtn.addEventListener('click', () => hideAlert(errorAlert));
    closeSuccessBtn.addEventListener('click', () => hideAlert(successAlert));

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form submission handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let hasErrors = false;
        let errorMessages = [];

        // Validate Name
        if (!fullName.value.trim()) {
            hasErrors = true;
            errorMessages.push('Please enter your name');
            fullName.style.borderColor = 'red';
        } else {
            fullName.style.borderColor = '';
        }

        // Validate Email
        const emailValue = email.value.trim();
        if (!emailValue) {
            hasErrors = true;
            errorMessages.push('Please enter your email');
            email.style.borderColor = 'red';
        } else if (!isValidEmail(emailValue)) {
            hasErrors = true;
            errorMessages.push('Please enter a valid email address');
            email.style.borderColor = 'red';
        } else {
            email.style.borderColor = '';
        }

        // Validate Subject
        if (!subject.value.trim()) {
            hasErrors = true;
            errorMessages.push('Please enter a subject');
            subject.style.borderColor = 'red';
        } else {
            subject.style.borderColor = '';
        }

        // Validate Message
        if (!message.value.trim()) {
            hasErrors = true;
            errorMessages.push('Please enter your message');
            message.style.borderColor = 'red';
        } else if (message.value.trim().length < 10) {
            hasErrors = true;
            errorMessages.push('Your message is too short');
            message.style.borderColor = 'red';
        } else {
            message.style.borderColor = '';
        }

        // Show errors or success
        if (hasErrors) {
            // Build an HTML list of errors
            let errorList = '<ul>';
            errorMessages.forEach(err => {
                errorList += `<li>${err}</li>`;
            });
            errorList += '</ul>';

            showAlert(errorAlert, errorList);
        } else {
            // Form is valid - show success
            showAlert(successAlert, 'Your message has been sent successfully!');
            contactForm.reset();
        }
    });

    // Reset field validation on input
    [fullName, email, subject, message].forEach(field => {
        field.addEventListener('input', function() {
            this.style.borderColor = '';
            if (!errorAlert.classList.contains('hidden')) {
                hideAlert(errorAlert);
            }
        });
    });
});
