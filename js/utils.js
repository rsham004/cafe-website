export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validateInput(input) {
    const value = input.value.trim();
    const inputType = input.type;
    const inputName = input.name;

    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    let isValid = true;
    let errorMessage = '';

    // Validation rules
    if (!value) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (inputType === 'email' && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    } else if (inputName === 'name' && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long.';
    } else if (inputName === 'subject' && value.length < 3) {
        isValid = false;
        errorMessage = 'Subject must be at least 3 characters long.';
    } else if (inputName === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long.';
    }

    // Apply validation styling
    if (!isValid) {
        input.style.borderColor = '#e74c3c';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = errorMessage;
        if(input.parentNode) {
            input.parentNode.appendChild(errorDiv);
        }
    } else {
        input.style.borderColor = '#27ae60';
    }

    return isValid;
}
