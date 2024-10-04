import errorMessages from "./errors.js";

// Check if the user is logged in when the page loads
const checkLoggedIn = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "login.html"; // Redirect to your login page
  }
};

// Function to load chat messages from localStorage and display them
function loadChatMessages() {
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  const chatBody = document.getElementById("chat-body");
  chatBody.innerHTML = ""; // Clear existing messages

  messages.forEach((msg) => {
    const messageElement = document.createElement("div");
    messageElement.className = "chat-message";
    messageElement.innerHTML = `<strong>[${msg.timestamp}] ${msg.user} : </strong> ${msg.text}`;
    chatBody.appendChild(messageElement);
  });

  // Scroll to the bottom of the chat
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Function to send a message
const sendMessage = () => {
  const messageInput = document.getElementById("message-input");
  const user = localStorage.getItem("username") || "Guest";

  if (messageInput.value.trim() === "") {
    alert(errorMessages.emptyMessage);
    return;
  }

  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  const newMessage = {
    user: user,
    text: messageInput.value,
    timestamp: new Date().toLocaleString(),
  };

  messages.push(newMessage);
  localStorage.setItem("chatMessages", JSON.stringify(messages)); // Save to localStorage
  messageInput.value = ""; // Clear input field
  loadChatMessages(); // Refresh the chat
};

// Function to refresh the chat
const refreshChat = () => loadChatMessages();

// Show chat when "Group Chat" is clicked
document
  .getElementById("group-chat-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("chat-container").style.display = "block"; // Show the chat
    loadChatMessages(); // Load existing chat messages
  });

// Event listeners for chat functionality
document.getElementById("send-button").addEventListener("click", sendMessage);
document
  .getElementById("refresh-button")
  .addEventListener("click", refreshChat);

const x = localStorage.getItem("username");
document.getElementById("logged-in-user").innerHTML = x;

window.onload = () => {
  checkLoggedIn(); // Check if the user is logged in
  loadChatMessages(); // Load existing chat messages
};
