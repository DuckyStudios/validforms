/**
 *  ____  _____ _____ _____ __ __  (TM)
 * |    \|  |  |     |  |  |  |  |
 * |  |  |  |  |   --|    -|_   _|
 * |____/|_____|_____|__|__| |_|  
 * 
 * Validforms is a cutting-edge project designed to revolutionize form validation in JavaScript. 
 * It offers real-time validation feedback, utilizing the expressive Tailwind CSS classes to mark input fields.
 * With Validforms, users can effortlessly validate their forms and inputs, ensuring a seamless and error-free experience.
 */

const validationRequired = document.querySelectorAll('[validation]');
const validateFormRequired = document.querySelectorAll('[validate-form]');

const validationStrings = {
    'email':        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    'phone':        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'number':       '^[0-9]*$',
    'text':         '^[a-zA-Z ]*$',
    'password':     '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    'required':     '^.+$'
}

for (let index = 0; index < validationRequired.length; index++) {
    const element = validationRequired[index];

    element.onkeyup = function () {
        const validated = validateInputElementToRegexKeys(element.value, element.getAttribute('validation'));

        if (!validated) {
            element.classList.add('ring-red-300', 'focus:ring-red-500', 'text-red-900');
            element.classList.remove('ring-green-300', 'focus:ring-green-500', 'text-green-900');
        } else {
            element.classList.add('ring-green-300', 'focus:ring-green-500', 'text-green-900');
            element.classList.remove('ring-red-300', 'focus:ring-red-500', 'text-red-900');
        }

        const submitButton = getSubmitButtonFromForm(getFormFromInput(element));

        if (isFormCompletelyValid(getFormFromInput(element))) {
            toggleDisabledButtonElement(submitButton, true);
        } else {
            toggleDisabledButtonElement(submitButton, false);
        }
    }
}

for (let index = 0; index < validateFormRequired.length; index++) {
    const element = validateFormRequired[index];
    const submitButton = getSubmitButtonFromForm(element);

    if (!submitButton) {
        continue;
    }

    toggleDisabledButtonElement(submitButton, false);
}

function validateInputElementToRegexKeys(value, requirements) {
    const requirementsArray = requirements.split('|');
    let passed = true;

    for (let index = 0; index < requirementsArray.length; index++) {
        const requirement = requirementsArray[index];


        if (requirement === 'nullable' && value === '' || value === null) {
            passed = true;
            break;
        }

        const regex = new RegExp(validationStrings[requirement]);

        if(!regex.test(value)) {
            passed = false;
        }
    }

    return passed;
}

function isFormCompletelyValid(form) {
    const inputs = form.querySelectorAll('[validation]');
    let passed = true;

    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        const validated = validateInputElementToRegexKeys(input.value, input.getAttribute('validation'));

        if (!validated) {
            passed = false;
        }
    }

    return passed;
}

function getFormFromInput(input) {
    const form = input.closest('form');
    return form;
}

function getSubmitButtonFromForm(form) {
    const submitButton = form.querySelector('[type="submit"]');
    return submitButton;
}

function toggleDisabledButtonElement(button, state) {
    if (state) {
        button.disabled = false;
        button.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        button.disabled = true;
        button.classList.add('opacity-50', 'cursor-not-allowed');
    }

    button.classList.add('duration-150');
}
