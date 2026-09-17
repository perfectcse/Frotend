import { useState } from "react"
import TransactionForm from "./TransactionForm"
import "./TransactionList.css"

function TransactionList({ transactions, onSave }) {
  const [showForm, setShowForm] = useState(false)

  const [editingTransaction, setEditingTransaction] =
    useState(null)

  const [searchTerm, setSearchTerm] = useState("")

  const [filterType, setFilterType] = useState("all")

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchesType =
        filterType === "all" ||
        transaction.type === filterType

      return matchesSearch && matchesType
    }
  )

  function handleAddTransaction(newTransaction) {
    if (editingTransaction) {
      const updatedTransactions = transactions.map(
        (currentTransaction) =>
          currentTransaction.id === editingTransaction.id
            ? {
                ...currentTransaction,
                ...newTransaction,
              }
            : currentTransaction
      )

      onSave(updatedTransactions)

      setEditingTransaction(null)
      setShowForm(false)

      return
    }

    const transaction = {
      id: Date.now(),
      ...newTransaction,
    }

    const updatedTransactions = [
      transaction,
      ...transactions,
    ]

    onSave(updatedTransactions)

    setShowForm(false)
  }

  function handleEditClick(transaction) {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  function handleDeleteTransaction(transactionId) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    )

    onSave(updatedTransactions)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingTransaction(null)
  }

  function handleAddClick() {
    setEditingTransaction(null)
    setShowForm(true)
  }

  return (
    <section className="transaction-section">
      <div className="transaction-header">
        <div>
          <h2>Recent Transactions</h2>
          <p>Your latest financial activity.</p>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
        >
          + Add Transaction
        </button>
      </div>

      <div className="transaction-filters">
        <input
          type="search"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          aria-label="Search transactions"
        />

        <select
          value={filterType}
          onChange={(event) =>
            setFilterType(event.target.value)
          }
          aria-label="Filter transactions by type"
        >
          <option value="all">All Transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      {showForm && (
        <TransactionForm
          onCancel={handleCancel}
          onAdd={handleAddTransaction}
          transaction={editingTransaction}
        />
      )}

      <div className="transaction-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              className="transaction-item"
              key={transaction.id}
            >
              <div className="transaction-details">
                <h3>{transaction.description}</h3>
                <p>{transaction.category}</p>
              </div>

              <span
                className={`transaction-type ${transaction.type}`}
              >
                {transaction.type}
              </span>

              <strong
                className={`transaction-amount ${transaction.type}`}
              >
                {transaction.type === "income"
                  ? "+"
                  : "-"}
                ₹
                {transaction.amount.toLocaleString(
                  "en-IN"
                )}
              </strong>

              <span className="transaction-date">
                {new Date(
                  transaction.date
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <div className="transaction-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleEditClick(transaction)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteTransaction(
                      transaction.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="transaction-empty">
            <p>
              {transactions.length === 0
                ? "No transactions yet. Add your first transaction."
                : "No transactions match your search or filter."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default TransactionList