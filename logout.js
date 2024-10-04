document.getElementById("logout-button").addEventListener("click", function () {
  // Remove the loggedInUser from localStorage
  localStorage.removeItem("loggedInUser");

  // Optionally, you can redirect the user to the welcome page or another page
  window.location.href = "logout.html";
});
