document.addEventListener('DOMContentLoaded', () => {
    const DOM = {
        form: document.getElementById('habitiqueBookingForm'),
        errorAlert: document.getElementById('errorAlert'),
        successAlert: document.getElementById('successAlert'),
        errorMessage: document.getElementById('errorMessage'),
        bookingConfirmation: document.getElementById('bookingConfirmation'),
        confirmationDetails: document.getElementById('confirmationDetails'),
        newBookingBtn: document.getElementById('newBookingBtn'),
        alerts: document.querySelectorAll('.alert'),
        validations: {
            fullName: {
                validator: value => value.trim() !== '',
                errorMessage: 'Full name is required'
            },
            bookingEmail: {
                validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                errorMessage: 'Please enter a valid email address'
            },
            bookingPhone: {
                validator: value => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value),
                errorMessage: 'Please enter a valid phone number'
            },
            preferredDate: {
                validator: value => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return value && selectedDate >= today;
                },
                errorMessage: 'Please select a valid future date'
            },
            preferredTime: {
                validator: value => value !== '',
                errorMessage: 'Please select a time'
            },
            consultationType: {
                validator: value => value !== '',
                errorMessage: 'Please select a consultation type'
            },
            termsAgree: {
                validator: value => value === 'on',
                errorMessage: 'You must agree to the terms'
            }
        }
    };

    // Initialize event listeners
    function initEventListeners() {
        document.getElementById('closeErrorAlert').addEventListener('click', () => hideAlert(DOM.errorAlert));
        document.getElementById('closeSuccessAlert').addEventListener('click', () => hideAlert(DOM.successAlert));
        
        DOM.newBookingBtn.addEventListener('click', () => {
            DOM.bookingConfirmation.style.display = 'none';
            DOM.form.style.display = 'flex';
            DOM.form.reset();
            // Clear all error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });
            // Reset input styles
            document.querySelectorAll('input, select').forEach(input => {
                input.style.borderColor = 'var(--gray-medium)';
            });
        });

        DOM.form.addEventListener('submit', handleSubmit);
        
        // Add event listeners for real-time validation
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', (e) => handleRealTimeValidation(e.target));
            input.addEventListener('change', (e) => handleRealTimeValidation(e.target));
        });
    }

    // Form submission handler
    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validateForm();

        if(isValid) {
            showConfirmation();
            showAlert(DOM.successAlert);
            DOM.form.style.display = 'none';
        } else {
            DOM.errorMessage.textContent = 'Please fix the errors in the form';
            showAlert(DOM.errorAlert);
            // Focus on the first field with an error
            const firstErrorField = document.querySelector('input:invalid, select:invalid') || 
                                    document.querySelector('.error-message[style*="block"]')?.parentElement?.querySelector('input, select');
            if (firstErrorField) firstErrorField.focus();
        }
    }

    // Real-time validation handler
    function handleRealTimeValidation(field) {
        const fieldId = field.id;
        if (DOM.validations[fieldId]) {
            validateField(fieldId);
        }
        
        // Special case for contact method
        if (fieldId.startsWith('contact')) {
            validateContactMethod();
        }
    }

    // Main form validation
    function validateForm() {
        let isValid = true;
        
        // Validate all fields with defined validators
        Object.keys(DOM.validations).forEach(fieldId => {
            isValid = validateField(fieldId) && isValid;
        });
        
        // Validate contact method separately
        isValid = validateContactMethod() && isValid;

        return isValid;
    }

    // Unified field validation
    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        const validation = DOM.validations[fieldId];
        
        if (!field || !validation) return true;
        
        const isValid = validation.validator(field.value);
        toggleErrorState(field, errorElement, isValid, validation.errorMessage);
        return isValid;
    }

    // Contact method validation
    function validateContactMethod() {
        const checked = document.querySelector('input[name="contactMethod"]:checked');
        const errorElement = document.getElementById('contactMethodError');
        const isValid = !!checked;

        errorElement.textContent = isValid ? '' : 'Please select a contact method';
        errorElement.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    // Error state management
    function toggleErrorState(field, errorElement, isValid, message = '') {
        if (!errorElement) return isValid;
        
        if(!isValid) {
            field.style.borderColor = 'var(--error)';
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            field.style.borderColor = 'var(--gray-medium)';
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        return isValid;
    }

    // Alert management
    function showAlert(alertElement) {
        alertElement.classList.remove('hidden');
        setTimeout(() => hideAlert(alertElement), 5000);
    }

    function hideAlert(alertElement) {
        alertElement.classList.add('hiding');
        setTimeout(() => {
            alertElement.classList.add('hidden');
            alertElement.classList.remove('hiding');
        }, 300);
    }

    // Confirmation display
    function showConfirmation() {
        const formData = new FormData(DOM.form);
        const detailsHtml = Array.from(formData.entries())
            .filter(([key]) => key !== 'termsAgree')
            .map(([key, value]) => {
                // Format the key with proper spacing and capitalization
                const formattedKey = key.replace(/([A-Z])/g, ' $1')
                                       .replace(/^./, str => str.toUpperCase())
                                       .trim();
                const sanitizedValue = value.toString().trim() || 'N/A';
                
                return `
                    <div class="detail-item">
                        <strong>${formattedKey}:</strong>
                        <span>${sanitizedValue}</span>
                    </div>
                `;
            }).join('');

        DOM.confirmationDetails.innerHTML = detailsHtml;
        DOM.bookingConfirmation.style.display = 'block'; // Use style.display instead of classList
    }

    // Initialize the application
    initEventListeners();
});