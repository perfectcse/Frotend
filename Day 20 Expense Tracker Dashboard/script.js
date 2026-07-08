// ============================
// DOM Elements
// ============================

const form = document.getElementById("transactionForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const searchInput = document.getElementById("search");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");

// ============================
// Data
// ============================

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;

// ============================
// Save to Local Storage
// ============================

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ============================
// Update Dashboard
// ============================

function updateDashboard() {

    const income = transactions
        .filter(item => item.type === "Income")
        .reduce((total, item) => total + item.amount, 0);

    const expense = transactions
        .filter(item => item.type === "Expense")
        .reduce((total, item) => total + item.amount, 0);

    const balance = income - expense;

    incomeEl.textContent = `₹${income}`;
    expenseEl.textContent = `₹${expense}`;
    balanceEl.textContent = `₹${balance}`;
}

// ============================
// Display Transactions
// ============================

function displayTransactions(data = transactions) {

    transactionList.innerHTML = "";

    if (data.length === 0) {
        transactionList.innerHTML =
            `<p class="empty">No Transactions Yet</p>`;
        return;
    }

    data.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("transaction");

        div.innerHTML = `
            <div class="info">
                <h4>${item.title}</h4>
                <small>${item.type}</small>
            </div>

            <div>
                <p class="${item.type === "Income" ? "income-text" : "expense-text"}">
                    ₹${item.amount}
                </p>
            </div>

            <div class="actions">

                <button class="edit"
                    onclick="editTransaction(${item.id})">
                    Edit
                </button>

                <button class="delete"
                    onclick="deleteTransaction(${item.id})">
                    Delete
                </button>

            </div>
        `;

        transactionList.appendChild(div);

    });

}

// ============================
// Add / Update Transaction
// ============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (title === "" || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    if (editId) {

        const transaction = transactions.find(
            item => item.id === editId
        );

        transaction.title = title;
        transaction.amount = amount;
        transaction.type = type;

        editId = null;

    } else {

        transactions.push({
            id: Date.now(),
            title,
            amount,
            type
        });

    }

    saveTransactions();
    updateDashboard();
    displayTransactions();

    form.reset();

});

// ============================
// Edit Transaction
// ============================

function editTransaction(id) {

    const transaction = transactions.find(
        item => item.id === id
    );

    titleInput.value = transaction.title;
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;

    editId = id;

}

// ============================
// Delete Transaction
// ============================

function deleteTransaction(id) {

    if (!confirm("Delete this transaction?")) return;

    transactions = transactions.filter(
        item => item.id !== id
    );

    saveTransactions();
    updateDashboard();
    displayTransactions();

}

// ============================
// Search Transaction
// ============================

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const filtered = transactions.filter(item =>
        item.title.toLowerCase().includes(keyword)
    );

    displayTransactions(filtered);

});

// ============================
// Initial Load
// ============================

updateDashboard();
displayTransactions();