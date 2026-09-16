import { useState } from "react"
import "./TransactionForm.css"

function TransactionForm({ onCancel, onAdd, transaction }) {
  const [formData, setFormData] = useState(() => ({
    description: transaction?.description || "",
    amount: transaction?.amount || "",
    category: transaction?.category || "",
    type: transaction?.type || "expense",
    date: transaction?.date || "",
  }))

  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setError("")
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.description.trim()) {
      setError("Please enter a description.")
      return
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Please enter an amount greater than 0.")
      return
    }

    if (!formData.category) {
      setError("Please select a category.")
      return
    }

    if (!formData.date) {
      setError("Please select a date.")
      return
    }

    setError("")

    onAdd({
      description: formData.description.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    })
  }

  return (
    <form
      className="transaction-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="description">Description</label>

        <input
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          placeholder="e.g. Groceries"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>

        <input
          id="amount"
          name="amount"
          type="number"
          min="1"
          value={formData.amount}
          onChange={handleChange}
          placeholder="e.g. 500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="type">Type</label>

        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>

        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button type="submit">
          {transaction ? "Save Changes" : "Add Transaction"}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm