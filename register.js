import errorMessages from "./errors.js";

// Function to register a user
export function registerUser(event) {
  event.preventDefault(); // Prevent form submission
  console.log("Register User function called.");
  const firstnameInput = document.getElementById("name-input").value;
  const emailInput = document.getElementById("email-input").value;
  const passwordInput = document.getElementById("password-input").value;
  const confirmPasswordInput = document.getElementById(
    "Confirm-password-input"
  ).value;

  if (firstnameInput == "") {
    alert(errorMessages.emptyName);
    return;
  }
  if (emailInput == "") {
    alert(errorMessages.emptyEmail);
    return;
  }
  if (!validateEmail(emailInput)) {
    alert(errorMessages.validEmail);
    return;
  }
  if (passwordInput == "") {
    alert(errorMessages.emptyPassword);
    return;
  }
  if (confirmPasswordInput == "") {
    alert(errorMessages.confirmPassword);
    return;
  }
  if (passwordInput !== confirmPasswordInput) {
    alert(errorMessages.mismatchPassword);
    return;
  }

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  if (users.some((u) => u.email === emailInput)) {
    alert(errorMessages.alreadyExists);
    return;
  }

  // Create a user object
  const user = {
    fullName: firstnameInput,
    email: emailInput,
    password: passwordInput,
  };

  // Add the new user to the array
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users)); // Save updated users to localStorage

  alert(`User ${firstnameInput} registered successfully!`);

  // Redirect to registration success page
  window.location.href = "registerSuccess.html";
}

const validateEmail = (emailInput) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(emailInput);
};

document.getElementById("form").addEventListener("submit", registerUser);
