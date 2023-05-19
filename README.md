# Validforms 🚩
Validforms is a cutting-edge project designed to revolutionize form validation in JavaScript. It offers real-time validation feedback, utilizing the expressive Tailwind CSS classes to mark input fields. With Validforms, users can effortlessly validate their forms and inputs, ensuring a seamless and error-free experience.

## Installation
Implement it via cdn at the bottom of your body.
```html
<script src="https://cdn.dcky.org/deliver/6-validforms"></script>
```

## Usage
If you want to validate your input, you easily have to at the new `validation` attribute to your `<input>` object.

Example:
```html
<input validation="required|email" class="ring ring-gray-300 bg-g(...)" id="email" name="email" type="email"></input>
```

The validation parameters will be seperated by a pipe (`|`).

You can also make a submit button - a form, depending on the validation states of your inputs, simply add the also new introduced `validate-form` attribute to the form.

Example:
```html
<form validate-form method="POST" action="login">
  <input validation="required|email" class="ring ring-gray-300 bg-g(...)" id="email" name="email" type="email"></input>
  <input validation="required|password" class="ring ring-gray-300 bg-g(...)" id="password" name="password" type="password"></input>

  <button type="submit" class="w-full text-center bg-indigo-600 hov(...)">Submit</button>
</form>
```

The button will automatically be disabled and marked as it (as long as you have tailwind installed).

## Requirements
- TailwindCSS (https://tailwindcss.com/)

## Validation Paramenters
- email
- phone
- number
- text
- password
- required
- nullable
