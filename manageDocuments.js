// Check if the user is logged in when the page loads
const checkLoggedIn = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "login.html"; // Redirect to your login page
  }
};

const loadMyUploads = () => {
  const uploads = JSON.parse(localStorage.getItem("myUploads")) || [];
  const myUploadsBody = document.getElementById("my-uploads-body");
  myUploadsBody.innerHTML = ""; // Clear existing rows

  uploads.forEach((upload) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${upload.label}</td>
            <td>${upload.fileName}</td>
            <td>
                <button style="cursor: pointer" onclick="editUpload('${upload.fileName}')">Edit</button> | 
                <button style="cursor: pointer" onclick="confirmDelete('${upload.fileName}')">Delete</button>
            </td>
        `;
    myUploadsBody.appendChild(row);
  });
};

// Function to edit an upload
let currentUploadFileName = ""; // Variable to store the file name of the upload being edited

const editUpload = (fileName) => {
  const uploads = JSON.parse(localStorage.getItem("myUploads")) || [];
  const upload = uploads.find((u) => u.fileName === fileName);

  if (upload) {
    currentUploadFileName = fileName; // Store the file name for later use
    document.getElementById("edit-file-description").value = upload.label; // Populate the input field
    document.getElementById("edit-upload-modal").style.display = "block"; // Show the edit modal
  }

  // Save changes when the "Save" button is clicked
  document.getElementById("save-edit").onclick = () => {
    const newDescription = document.getElementById(
      "edit-file-description"
    ).value;
    if (!newDescription) {
      alert("Please provide a file description.");
      return;
    }

    let uploads = JSON.parse(localStorage.getItem("myUploads")) || [];
    const uploadIndex = uploads.findIndex(
      (u) => u.fileName === currentUploadFileName
    );
    if (uploadIndex !== -1) {
      uploads[uploadIndex].label = newDescription; // Update the label
      localStorage.setItem("myUploads", JSON.stringify(uploads)); // Save to localStorage
      loadMyUploads(); // Refresh the table
      document.getElementById("edit-upload-modal").style.display = "none"; // Close modal
      alert("Upload updated successfully!"); // Optional alert
    }
  };

  // Handle cancel
  document.getElementById("cancel-edit").onclick = () => {
    document.getElementById("edit-upload-modal").style.display = "none"; // Close modal
  };
  // Close modal
  document.getElementById("close-edit-upload-modal").onclick = () => {
    document.getElementById("edit-upload-modal").style.display = "none"; // Close modal
  };
};

// Function to confirm upload deletion
const confirmDelete = (fileName) => {
  document.getElementById("confirmation-modal").style.display = "block"; // Show confirmation modal

  // Handle delete confirmation
  document.getElementById("confirm-delete").onclick = () => {
    let uploads = JSON.parse(localStorage.getItem("myUploads")) || [];
    const filteredUploads = uploads.filter((u) => u.fileName !== fileName); // Remove the upload
    localStorage.setItem("myUploads", JSON.stringify(filteredUploads)); // Save to localStorage
    loadMyUploads(); // Refresh the uploads table
    document.getElementById("confirmation-modal").style.display = "none"; // Close modal
  };

  // Close modal
  document.getElementById("close-modal").onclick = () => {
    document.getElementById("confirmation-modal").style.display = "none"; // Close modal
  };

  // Handle cancel deletion
  document.getElementById("cancel-delete").onclick = () => {
    document.getElementById("confirmation-modal").style.display = "none"; // Close modal
  };
};

// Show document management content when "Manage Documents" is clicked
document
  .getElementById("manage-documents-link")
  .addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("manage-document-content").style.display = "block"; // Show document management
    loadMyUploads(); // Load existing uploads
  });

// Add upload button functionality
document.getElementById("add-upload-button").onclick = () => {
  document.getElementById("upload-modal").style.display = "block"; // Show the upload modal
};

// Close upload modal
document.getElementById("close-upload-modal").onclick = () => {
  document.getElementById("upload-modal").style.display = "none"; // Close modal
};

const clearUploadInputs = () => {
  document.getElementById("file-description").value = ""; // Clear file description input
  document.getElementById("file-upload").value = ""; // Clear file upload input
  document.getElementById("file-name").textContent = ""; // Clear file name display (if you have any)
};

// Upload now functionality
document.getElementById("upload-now").onclick = () => {
  const description = document.getElementById("file-description").value;
  const fileInput = document.getElementById("file-upload");
  const fileName = fileInput.files[0] ? fileInput.files[0].name : ""; // Get file name

  if (!description || !fileName) {
    alert("Please provide both a description and a file.");
    return;
  }

  // Check if file with the same name already exists
  let uploads = JSON.parse(localStorage.getItem("myUploads")) || [];
  const existingFile = uploads.find((u) => u.fileName === fileName);
  if (existingFile) {
    alert("A file with the same name already exists. Please rename your file.");
    return; // Prevent uploading
  }

  // Create an upload object
  const upload = {
    label: description,
    fileName: fileName,
  };

  // Store the upload in localStorage
  uploads.push(upload);
  localStorage.setItem("myUploads", JSON.stringify(uploads)); // Save uploads

  loadMyUploads(); // Refresh the uploads table
  document.getElementById("upload-modal").style.display = "none"; // Close modal
  clearUploadInputs();
};

// Cancel upload functionality
document.getElementById("cancel-upload").onclick = () => {
  document.getElementById("upload-modal").style.display = "none"; // Close modal
};

window.onload = () => {
  checkLoggedIn(); // Check if the user is logged in
  loadMyUploads();
};
