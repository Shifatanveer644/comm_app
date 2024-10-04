// Check if the user is logged in when the page loads
const checkLoggedIn = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "login.html"; // Redirect to your login page
  }
};

const loadUsers = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tableBody = document.getElementById("user-table-body");
  tableBody.innerHTML = ""; // Clear existing rows

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>
                <button style = "cursor: pointer" onclick="editUser(${index})">Edit</button> | 
                <button style = "cursor: pointer" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
};

// Show user management content when "Manage Users" is clicked
document
  .getElementById("manage-users-link")
  .addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("user-management-content").style.display = "block"; // Show user management
    loadUsers(); // Load existing users
  });

// Edit user function
const editUser = (index) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users[index];

  // Populate the input fields with user data
  document.getElementById("edit-fullname").value = user.fullName;

  document.getElementById("edit-email").value = user.email;

  // Show the edit modal
  document.getElementById("edit-user-modal").style.display = "block";

  // Save changes when the "Save" button is clicked
  document.getElementById("save-user").onclick = () => {
    const name = document.getElementById("edit-fullname").value;
    const e_mail = document.getElementById("edit-email").value;
    if (name === "") {
      alert("Enter the name");
      return;
    }
    if (e_mail === "") {
      alert("Enter the email");
      return;
    }
    if (!validateEmail(e_mail)) {
      alert("Please enter a valid email");
      return;
    }

    const updatedUser = {
      fullName: document.getElementById("edit-fullname").value,
      email: document.getElementById("edit-email").value,
      password: user.password, // Keep the same password
    };
    users[index] = updatedUser; // Update the user in the array
    localStorage.setItem("users", JSON.stringify(users)); // Save to localStorage
    loadUsers(); // Refresh the table
    document.getElementById("edit-user-modal").style.display = "none"; // Close modal
  };

  // Handle cancel deletion
  document.getElementById("cancel-edit").onclick = () => {
    document.getElementById("edit-user-modal").style.display = "none"; // Close modal
  };

  // Close modal
  document.getElementById("close-edit-modal").onclick = () => {
    document.getElementById("edit-user-modal").style.display = "none"; // Close modal
  };
};

// Function to delete user
const deleteUser = (index) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the selected user is the logged-in user
  if (users[index].email === loggedInUser) {
    return;
  }
  // Show the confirmation modal
  document.getElementById("delete-confirmation-modal").style.display = "block";

  // Handle delete confirmation
  document.getElementById("confirm-delete-user").onclick = () => {
    users.splice(index, 1); // Remove user from array
    localStorage.setItem("users", JSON.stringify(users)); // Save to localStorage
    loadUsers(); // Refresh the user table
    document.getElementById("delete-confirmation-modal").style.display = "none"; // Close modal
  };

  // Handle cancel deletion
  document.getElementById("cancel-delete-user").onclick = () => {
    document.getElementById("delete-confirmation-modal").style.display = "none"; // Close modal
  };

  // Close modal when 'X' is clicked
  document.getElementById("close-delete-modal").onclick = () => {
    document.getElementById("delete-confirmation-modal").style.display = "none"; // Close modal
  };
};

const validateEmail = (e_mail) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(e_mail);
};

window.onload = () => {
  checkLoggedIn(); // Check if the user is logged in
  loadUsers(); // Load existing chat messages
};
