import { useState } from "react"
import SummaryCard from "./SummaryCard"
import Analytics from "./Analytics"
import MonthlyOverview from "./MonthlyOverview"
import TransactionList from "../transactions/TransactionList"
import "./Dashboard.css"

const defaultTransactions = [
  {
    id: 1,
    description: "Salary",
    category: "Income",
    type: "income",
    amount: 50000,
    date: "2026-09-16",
  },
  {
    id: 2,
    description: "Rent",
    category: "Housing",
    type: "expense",
    amount: 15000,
    date: "2026-09-15",
  },
  {
    id: 3,
    description: "Groceries",
    category: "Food",
    type: "expense",
    amount: 2500,
    date: "2026-09-14",
  },
]

function getInitialTransactions() {
  const savedTransactions = localStorage.getItem(
    "financeflow-transactions"
  )

  if (savedTransactions) {
    return JSON.parse(savedTransactions)
  }

  return defaultTransactions
}

function Dashboard() {
  const [transactions, setTransactions] = useState(
    getInitialTransactions
  )

  function saveTransactions(updatedTransactions) {
    setTransactions(updatedTransactions)

    localStorage.setItem(
      "financeflow-transactions",
      JSON.stringify(updatedTransactions)
    )
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    )

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    )

  const balance = totalIncome - totalExpenses

  const savings = balance

  const categorySpending = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((categories, transaction) => {
      const category = transaction.category

      categories[category] =
        (categories[category] || 0) + transaction.amount

      return categories
    }, {})

  const currentDate = new Date()

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthlyTransactions = transactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.date)

      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      )
    }
  )

  const monthlyIncome = monthlyTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    )

  const monthlyExpenses = monthlyTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    )

  const monthlyBalance = monthlyIncome - monthlyExpenses

  const monthlySpentPercentage =
    monthlyIncome > 0
      ? (monthlyExpenses / monthlyIncome) * 100
      : 0

  return (
    <section className="dashboard">
      <div className="summary-grid">
        <SummaryCard
          title="Total Balance"
          value={`₹${balance.toLocaleString("en-IN")}`}
          type="balance"
        />

        <SummaryCard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString("en-IN")}`}
          type="income"
        />

        <SummaryCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString("en-IN")}`}
          type="expense"
        />

        <SummaryCard
          title="Savings"
          value={`₹${savings.toLocaleString("en-IN")}`}
          type="savings"
        />
      </div>

      <Analytics
        categorySpending={categorySpending}
      />

      <MonthlyOverview
        monthlyIncome={monthlyIncome}
        monthlyExpenses={monthlyExpenses}
        monthlyBalance={monthlyBalance}
        monthlySpentPercentage={monthlySpentPercentage}
      />

      <TransactionList
        transactions={transactions}
        onSave={saveTransactions}
      />
    </section>
  )
}

export default Dashboard