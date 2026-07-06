const website = document.getElementById("website");
const username = document.getElementById("username");
const password = document.getElementById("password");
const saveBtn = document.getElementById("saveBtn");
const passwordList = document.getElementById("passwordList");
const search = document.getElementById("search");
const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const count = document.getElementById("count");

let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
let editIndex = -1;

// =======================
// Show / Hide Password
// =======================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.innerText = "🙈";
    } else {
        password.type = "password";
        togglePassword.innerText = "👁";
    }

});

// =======================
// Password Strength
// =======================

password.addEventListener("input", () => {

    const value = password.value;

    let strength = 0;

    if (value.length >= 6) strength++;

    if (/[A-Z]/.test(value)) strength++;

    if (/[0-9]/.test(value)) strength++;

    if (/[^A-Za-z0-9]/.test(value)) strength++;

    if (strength === 1) {
        strengthBar.style.width = "25%";
        strengthBar.style.background = "red";
    }

    else if (strength === 2) {
        strengthBar.style.width = "50%";
        strengthBar.style.background = "orange";
    }

    else if (strength === 3) {
        strengthBar.style.width = "75%";
        strengthBar.style.background = "#facc15";
    }

    else if (strength === 4) {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "#22c55e";
    }

    else {
        strengthBar.style.width = "0";
    }

});

// =======================
// Save Password
// =======================

saveBtn.addEventListener("click", () => {

    if (
        website.value.trim() === "" ||
        username.value.trim() === "" ||
        password.value.trim() === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    const data = {
        website: website.value,
        username: username.value,
        password: password.value
    };

    if (editIndex === -1) {

        passwords.push(data);

    } else {

        passwords[editIndex] = data;
        editIndex = -1;
        saveBtn.innerText = "Save Password";

    }

    saveData();

    clearForm();

});

// =======================
// Display Passwords
// =======================

function showPasswords(list = passwords) {

    passwordList.innerHTML = "";

    count.innerText = list.length;

    if (list.length === 0) {

        passwordList.innerHTML = `
            <div class="empty">
                No Passwords Saved
            </div>
        `;

        return;
    }

    list.forEach((item, index) => {

        passwordList.innerHTML += `

        <div class="password-card">

            <h3>${item.website}</h3>

            <p><strong>User:</strong> ${item.username}</p>

            <p><strong>Password:</strong> ********</p>

            <div class="card-buttons">

                <button class="copy-btn"
                    onclick="copyPassword('${item.password}')">
                    Copy
                </button>

                <button class="edit-btn"
                    onclick="editPassword(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deletePassword(${index})">
                    Delete
                </button>

            </div>

        </div>

        `;

    });

}

// =======================
// Delete
// =======================

function deletePassword(index) {

    if (!confirm("Delete this password?")) return;

    passwords.splice(index, 1);

    saveData();

}

// =======================
// Edit
// =======================

function editPassword(index) {

    website.value = passwords[index].website;
    username.value = passwords[index].username;
    password.value = passwords[index].password;

    editIndex = index;

    saveBtn.innerText = "Update Password";

}

// =======================
// Copy
// =======================

function copyPassword(text) {

    navigator.clipboard.writeText(text);

    alert("Password Copied!");

}

// =======================
// Search
// =======================

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = passwords.filter(item =>
        item.website.toLowerCase().includes(value)
    );

    showPasswords(filtered);

});

// =======================
// Save localStorage
// =======================

function saveData() {

    localStorage.setItem(
        "passwords",
        JSON.stringify(passwords)
    );

    showPasswords();

}

// =======================
// Clear Form
// =======================

function clearForm() {

    website.value = "";
    username.value = "";
    password.value = "";

    strengthBar.style.width = "0";

}

// =======================
// Initial Load
// =======================

showPasswords();