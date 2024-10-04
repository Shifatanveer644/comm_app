// Get the logged-in user's name from localStorage
const loggedInUserEmail = localStorage.getItem("loggedInUser");

if (loggedInUserEmail) {
  document.getElementById(
    "welcome-name"
  ).innerHTML = `Welcome,  ${loggedInUserEmail}`;
} else {
  window.location.href = "login.html";
}
