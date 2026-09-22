import { useState } from "react"
import "./InterviewForm.css"

function InterviewForm({
  interview,
  onAdd,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => ({
    company: interview?.company || "",
    role: interview?.role || "",
    round: interview?.round || "",
    date: interview?.date || "",
    status: interview?.status || "Scheduled",
    notes: interview?.notes || "",
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

    if (!formData.company.trim()) {
      setError("Please enter the company name.")
      return
    }

    if (!formData.role.trim()) {
      setError("Please enter the job role.")
      return
    }

    if (!formData.round.trim()) {
      setError("Please enter the interview round.")
      return
    }

    if (!formData.date) {
      setError("Please select the interview date.")
      return
    }

    const interviewData = {
      company: formData.company.trim(),
      role: formData.role.trim(),
      round: formData.round.trim(),
      date: formData.date,
      status: formData.status,
      notes: formData.notes.trim(),
    }

    if (interview) {
      onUpdate(interviewData)
    } else {
      onAdd(interviewData)
    }

    setError("")
  }

  return (
    <form
      className="interview-form"
      onSubmit={handleSubmit}
    >
      <div className="interview-form-grid">
        <div className="form-group">
          <label htmlFor="company">Company</label>

          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. TCS"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Job Role</label>

          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. React Developer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="round">Interview Round</label>

          <input
            id="round"
            name="round"
            type="text"
            value={formData.round}
            onChange={handleChange}
            placeholder="e.g. Technical Interview"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Interview Date</label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>

        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add preparation notes, feedback, or reminders..."
          rows="4"
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
          {interview
            ? "Save Changes"
            : "Add Interview"}
        </button>
      </div>
    </form>
  )
}

export default InterviewForm