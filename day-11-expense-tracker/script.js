const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const addBtn = document.getElementById("addBtn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Format ₹
function formatMoney(num) {
  return "₹" + num.toLocaleString("en-IN");
}

// Format Date
function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN");
}

// Show UI
function updateUI() {
  list.innerHTML = "";

  if (transactions.length === 0) {
    list.innerHTML = `<p class="empty">No transactions yet</p>`;
  }

  let total = 0;
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
      <div>
        <strong>${t.text}</strong><br>
        <small>${formatDate(t.date)}</small>
      </div>

      <div class="amount" onclick="toggleDelete(this)">
        ${formatMoney(t.amount)}
      </div>

      <button class="delete-btn" onclick="deleteTransaction(${index})">🗑</button>
    `;

    list.appendChild(li);

    total += t.amount;

    if (t.amount > 0) incomeTotal += t.amount;
    else expenseTotal += t.amount;
  });

  balance.innerText = formatMoney(total);
  income.innerText = formatMoney(incomeTotal);
  expense.innerText = formatMoney(Math.abs(expenseTotal));

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add
addBtn.addEventListener("click", () => {
  if (!text.value || !amount.value || !date.value) return;

  transactions.push({
    text: text.value,
    amount: +amount.value,
    date: date.value
  });

  text.value = "";
  amount.value = "";
  date.value = "";

  updateUI();
});

// Toggle delete
function toggleDelete(el) {
  const li = el.closest("li");
  li.classList.toggle("show-delete");
}

// Delete
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

// Load
updateUI();