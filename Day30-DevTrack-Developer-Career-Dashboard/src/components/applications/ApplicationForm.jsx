import { useState } from "react"
import "./ApplicationForm.css"

function ApplicationForm({
  application,
  onAdd,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => ({
    company: application?.company || "",
    role: application?.role || "",
    location: application?.location || "",
    status: application?.status || "Applied",
    date: application?.date || "",
    jobLink: application?.jobLink || "",
    notes: application?.notes || "",
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

    if (!formData.location.trim()) {
      setError("Please enter the location.")
      return
    }

    if (!formData.date) {
      setError("Please select the application date.")
      return
    }

    const applicationData = {
      company: formData.company.trim(),
      role: formData.role.trim(),
      location: formData.location.trim(),
      status: formData.status,
      date: formData.date,
      jobLink: formData.jobLink.trim(),
      notes: formData.notes.trim(),
    }

    if (application) {
      onUpdate(applicationData)
    } else {
      onAdd(applicationData)
    }

    setError("")
  }

  return (
    <form
      className="application-form"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="company">Company</label>

          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Infosys"
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
            placeholder="e.g. Frontend Developer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>

          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Bengaluru / Remote"
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
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Application Date</label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobLink">Job Link</label>

          <input
            id="jobLink"
            name="jobLink"
            type="url"
            value={formData.jobLink}
            onChange={handleChange}
            placeholder="https://..."
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
          placeholder="Add any useful notes..."
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
          {application
            ? "Save Changes"
            : "Add Application"}
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm