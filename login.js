import errorMessages from "./errors.js";

// Function to log in a user
export function loginUser(event) {
  event.preventDefault(); // Prevent form submission

  const emailInput = document.getElementById("email-input").value;
  const passwordInput = document.getElementById("password-input").value;

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

  // Retrieve users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user exists
  const user = users.find(
    (u) => u.email === emailInput && u.password === passwordInput
  );

  if (user) {
    // Store the user's mail in localStorage
    localStorage.setItem("loggedInUser", user.email);
    localStorage.setItem("username", user.fullName);

    // Redirect to the home page
    window.location.href = "loginSuccess.html";
  } else {
    alert(errorMessages.invalidCredentials);
  }
}

const validateEmail = (emailInput) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(emailInput);
};

document.getElementById("loginForm").addEventListener("submit", loginUser);
