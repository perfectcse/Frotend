const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const addBtn = document.getElementById("addBtn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  list.innerHTML = "";

  let total = 0;
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
      <div>
        <strong>${t.text}</strong><br>
        <small>${t.date}</small>
      </div>
      <div>
        ₹${t.amount}
        <button onclick="deleteTransaction(${index})">X</button>
      </div>
    `;

    list.appendChild(li);

    total += t.amount;

    if (t.amount > 0) {
      incomeTotal += t.amount;
    } else {
      expenseTotal += t.amount;
    }
  });

  balance.innerText = `₹${total}`;
  income.innerText = `₹${incomeTotal}`;
  expense.innerText = `₹${Math.abs(expenseTotal)}`;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

addBtn.addEventListener("click", addTransaction);

function addTransaction() {
  if (text.value === "" || amount.value === "" || date.value === "") return;

  const transaction = {
    text: text.value,
    amount: +amount.value,
    date: date.value
  };

  transactions.push(transaction);

  text.value = "";
  amount.value = "";
  date.value = "";

  updateUI();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

updateUI();