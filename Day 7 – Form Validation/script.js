const form = document.getElementById("form");
const success = document.getElementById("success");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const showPass = document.getElementById("showPass");

// Show / Hide Password
showPass.addEventListener("change", () => {
  const type = showPass.checked ? "text" : "password";
  passwordInput.type = type;
  confirmPasswordInput.type = type;
});

// Submit form
form.addEventListener("submit", function(e) {
  e.preventDefault();

  clearMessages();

  let isValid = true;

  if (!validateRequired(nameInput, "Name is required")) isValid = false;
  if (!validateEmail(emailInput)) isValid = false;
  if (!validatePassword(passwordInput)) isValid = false;
  if (!validateConfirmPassword(passwordInput, confirmPasswordInput)) isValid = false;

  if (isValid) {
    success.innerText = "Registration Successful!";

    const userData = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    localStorage.setItem("user", JSON.stringify(userData));

    form.reset();

    document.querySelectorAll("input").forEach(input => {
      input.classList.remove("success-border");
    });
  }
});

// Clear messages
function clearMessages() {
  document.querySelectorAll(".error").forEach(el => el.innerText = "");
  success.innerText = "";
}

// Required validation
function validateRequired(input, message) {
  if (input.value.trim() === "") {
    showError(input, message);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Email validation
function validateEmail(input) {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!input.value.match(emailPattern)) {
    showError(input, "Enter valid email");
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Password validation
function validatePassword(input) {
  if (input.value.length < 6) {
    showError(input, "Password must be at least 6 characters");
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Confirm password
function validateConfirmPassword(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    return false;
  } else {
    showSuccess(confirmPassword);
    return true;
  }
}

// Show error
function showError(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector(".error");
  small.innerText = message;
  input.classList.add("error-border");
  input.classList.remove("success-border");
}

// Show success
function showSuccess(input) {
  input.classList.add("success-border");
  input.classList.remove("error-border");
}