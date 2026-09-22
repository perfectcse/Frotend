import { useState } from "react"
import InterviewForm from "./InterviewForm"
import { useDevTrack } from "../../context/useDevTrack"
import "./InterviewList.css"

function InterviewList() {
  const {
    interviews,
    addInterview,
    updateInterview,
    deleteInterview,
  } = useDevTrack()

  const [showForm, setShowForm] = useState(false)

  const [editingInterview, setEditingInterview] =
    useState(null)

  const [searchTerm, setSearchTerm] = useState("")

  const [filterStatus, setFilterStatus] = useState("all")

  const filteredInterviews = interviews.filter(
    (interview) => {
      const searchValue = searchTerm.toLowerCase()

      const matchesSearch =
        interview.company
          .toLowerCase()
          .includes(searchValue) ||
        interview.role
          .toLowerCase()
          .includes(searchValue) ||
        interview.round
          .toLowerCase()
          .includes(searchValue)

      const matchesStatus =
        filterStatus === "all" ||
        interview.status === filterStatus

      return matchesSearch && matchesStatus
    }
  )

  function handleAddInterview(newInterview) {
    addInterview(newInterview)

    setShowForm(false)
  }

  function handleEditClick(interview) {
    setEditingInterview(interview)
    setShowForm(true)
  }

  function handleUpdateInterview(updatedInterview) {
    updateInterview(
      editingInterview.id,
      updatedInterview
    )

    setEditingInterview(null)
    setShowForm(false)
  }

  function handleDeleteInterview(interviewId) {
    deleteInterview(interviewId)
  }

  function handleAddClick() {
    setEditingInterview(null)
    setShowForm(true)
  }

  function handleCancelForm() {
    setEditingInterview(null)
    setShowForm(false)
  }

  return (
    <section
      className="interview-section"
      id="interviews"
    >
      <div className="interview-header">
        <div>
          <h2>Interview Tracker</h2>

          <p>
            Track your interviews and preparation progress.
          </p>
        </div>

        <button
          type="button"
          className="add-interview-button"
          onClick={handleAddClick}
        >
          + Add Interview
        </button>
      </div>

      {showForm && (
        <InterviewForm
          key={editingInterview?.id || "new"}
          interview={editingInterview}
          onAdd={handleAddInterview}
          onUpdate={handleUpdateInterview}
          onCancel={handleCancelForm}
        />
      )}

      <div className="interview-filters">
        <input
          type="search"
          placeholder="Search company, role, round..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          aria-label="Search interviews"
        />

        <select
          value={filterStatus}
          onChange={(event) =>
            setFilterStatus(event.target.value)
          }
          aria-label="Filter interviews by status"
        >
          <option value="all">All Statuses</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <div className="interview-list">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map((interview) => (
            <article
              className="interview-item"
              key={interview.id}
            >
              <div className="interview-main">
                <div>
                  <h3>{interview.role}</h3>

                  <p className="interview-company">
                    {interview.company}
                  </p>
                </div>

                <span
                  className={`interview-status ${interview.status.toLowerCase()}`}
                >
                  {interview.status}
                </span>
              </div>

              <div className="interview-meta">
                <span>{interview.round}</span>

                <span>
                  {new Date(
                    interview.date
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {interview.notes && (
                <p className="interview-notes">
                  {interview.notes}
                </p>
              )}

              <div className="interview-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleEditClick(interview)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteInterview(interview.id)
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="interview-empty">
            <p>
              {interviews.length === 0
                ? "No interviews yet. Add your first interview."
                : "No interviews match your search or filter."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default InterviewList