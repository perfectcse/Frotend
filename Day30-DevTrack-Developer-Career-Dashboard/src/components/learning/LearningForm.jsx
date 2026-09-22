import { useState } from "react"
import "./LearningForm.css"

function LearningForm({
  learningItem,
  onAdd,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => ({
    skill: learningItem?.skill || "",
    category: learningItem?.category || "",
    progress: learningItem?.progress ?? 0,
    status: learningItem?.status || "Not Started",
    targetDate: learningItem?.targetDate || "",
    notes: learningItem?.notes || "",
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

    if (!formData.skill.trim()) {
      setError("Please enter the skill or topic.")
      return
    }

    if (!formData.category.trim()) {
      setError("Please enter the category.")
      return
    }

    if (
      formData.progress === "" ||
      Number(formData.progress) < 0 ||
      Number(formData.progress) > 100
    ) {
      setError("Progress must be between 0 and 100.")
      return
    }

    if (!formData.targetDate) {
      setError("Please select a target date.")
      return
    }

    const learningData = {
      skill: formData.skill.trim(),
      category: formData.category.trim(),
      progress: Number(formData.progress),
      status: formData.status,
      targetDate: formData.targetDate,
      notes: formData.notes.trim(),
    }

    if (learningItem) {
      onUpdate(learningData)
    } else {
      onAdd(learningData)
    }

    setError("")
  }

  return (
    <form
      className="learning-form"
      onSubmit={handleSubmit}
    >
      <div className="learning-form-grid">
        <div className="form-group">
          <label htmlFor="skill">Skill / Topic</label>

          <input
            id="skill"
            name="skill"
            type="text"
            value={formData.skill}
            onChange={handleChange}
            placeholder="e.g. React.js"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Frontend"
          />
        </div>

        <div className="form-group">
          <label htmlFor="progress">Progress (%)</label>

          <input
            id="progress"
            name="progress"
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
            placeholder="e.g. 75"
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
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="targetDate">Target Date</label>

          <input
            id="targetDate"
            name="targetDate"
            type="date"
            value={formData.targetDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>

        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add study notes or next steps..."
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
          {learningItem
            ? "Save Changes"
            : "Add Learning Goal"}
        </button>
      </div>
    </form>
  )
}

export default LearningForm