import './style.css';

const form = document.getElementById("adminForm");
const tableBody = document.querySelector("#dataTable tbody");

document.addEventListener("DOMContentLoaded", () => {
  const savedEntries = JSON.parse(localStorage.getItem("adminEntries")) || [];
  savedEntries.forEach((entry, index) => addEntryToTable(entry, index));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const position = document.getElementById("position");
  const department = document.getElementById("department");

  document.querySelectorAll(".text-red-600").forEach((el) => (el.textContent = ""));

  if (!name.value.trim()) {
    document.getElementById("errorName").textContent = "This field is required";
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    document.getElementById("errorEmail").textContent = "Invalid email address";
    valid = false;
  }

  if (!phone.value.trim()) {
    document.getElementById("errorPhone").textContent = "This field is required";
    valid = false;
  }

  if (!position.value.trim()) {
    document.getElementById("errorPosition").textContent = "This field is required";
    valid = false;
  }

  if (!department.value) {
    document.getElementById("errorDepartment").textContent = "Please select a department";
    valid = false;
  }

  if (valid) {
    const entry = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      position: position.value,
      department: department.value,
    };

    saveEntryToLocalStorage(entry);
    const entries = JSON.parse(localStorage.getItem("adminEntries"));
    addEntryToTable(entry, entries.length - 1);
    form.reset();
  }
});

function addEntryToTable(entry, index) {
  const newRow = document.createElement("tr");

  Object.values(entry).forEach((value) => {
    const cell = document.createElement("td");
    cell.className = "py-2 px-3 border-t border-gray-200";
    cell.textContent = value;
    newRow.appendChild(cell);
  });

  const actionCell = document.createElement("td");
  actionCell.className = "py-2 px-3 border-t border-gray-200";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "text-red-600 hover:text-red-800 text-lg";
  deleteBtn.title = "Delete entry";

  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this entry?")) {
      deleteEntry(index);
    }
  });

  actionCell.appendChild(deleteBtn);
  newRow.appendChild(actionCell);

  tableBody.appendChild(newRow);
}

function saveEntryToLocalStorage(entry) {
  const entries = JSON.parse(localStorage.getItem("adminEntries")) || [];
  entries.push(entry);
  localStorage.setItem("adminEntries", JSON.stringify(entries));
}

function deleteEntry(index) {
  let entries = JSON.parse(localStorage.getItem("adminEntries")) || [];
  entries.splice(index, 1);
  localStorage.setItem("adminEntries", JSON.stringify(entries));
  tableBody.innerHTML = "";
  entries.forEach((entry, i) => addEntryToTable(entry, i));
}
