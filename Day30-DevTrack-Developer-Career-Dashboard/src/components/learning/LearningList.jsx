import { useState } from "react"
import LearningForm from "./LearningForm"
import { useDevTrack } from "../../context/useDevTrack"
import "./LearningList.css"

function LearningList() {
  const {
    learningItems,
    addLearningItem,
    updateLearningItem,
    deleteLearningItem,
  } = useDevTrack()

  const [showForm, setShowForm] = useState(false)

  const [editingLearningItem, setEditingLearningItem] =
    useState(null)

  const [searchTerm, setSearchTerm] = useState("")

  const [filterStatus, setFilterStatus] = useState("all")

  const filteredLearningItems = learningItems.filter(
    (learningItem) => {
      const searchValue = searchTerm.toLowerCase()

      const matchesSearch =
        learningItem.skill
          .toLowerCase()
          .includes(searchValue) ||
        learningItem.category
          .toLowerCase()
          .includes(searchValue)

      const matchesStatus =
        filterStatus === "all" ||
        learningItem.status === filterStatus

      return matchesSearch && matchesStatus
    }
  )

  function handleAddLearningItem(newLearningItem) {
    addLearningItem(newLearningItem)
    setShowForm(false)
  }

  function handleEditClick(learningItem) {
    setEditingLearningItem(learningItem)
    setShowForm(true)
  }

  function handleUpdateLearningItem(updatedLearningItem) {
    updateLearningItem(
      editingLearningItem.id,
      updatedLearningItem
    )

    setEditingLearningItem(null)
    setShowForm(false)
  }

  function handleAddClick() {
    setEditingLearningItem(null)
    setShowForm(true)
  }

  function handleCancelForm() {
    setEditingLearningItem(null)
    setShowForm(false)
  }

  return (
    <section
      className="learning-section"
      id="learning"
    >
      <div className="learning-header">
        <div>
          <h2>Learning Tracker</h2>

          <p>
            Track your skills, study progress, and learning goals.
          </p>
        </div>

        <button
          type="button"
          className="add-learning-button"
          onClick={handleAddClick}
        >
          + Add Learning Goal
        </button>
      </div>

      {showForm && (
        <LearningForm
          key={editingLearningItem?.id || "new"}
          learningItem={editingLearningItem}
          onAdd={handleAddLearningItem}
          onUpdate={handleUpdateLearningItem}
          onCancel={handleCancelForm}
        />
      )}

      <div className="learning-filters">
        <input
          type="search"
          placeholder="Search skill or category..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          aria-label="Search learning goals"
        />

        <select
          value={filterStatus}
          onChange={(event) =>
            setFilterStatus(event.target.value)
          }
          aria-label="Filter learning goals by status"
        >
          <option value="all">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="learning-list">
        {filteredLearningItems.length > 0 ? (
          filteredLearningItems.map((learningItem) => (
            <article
              className="learning-item"
              key={learningItem.id}
            >
              <div className="learning-main">
                <div>
                  <h3>{learningItem.skill}</h3>

                  <p className="learning-category">
                    {learningItem.category}
                  </p>
                </div>

                <span
                  className={`learning-status ${learningItem.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {learningItem.status}
                </span>
              </div>

              <div className="learning-progress-info">
                <div className="learning-progress-header">
                  <span>Progress</span>

                  <strong>
                    {learningItem.progress}%
                  </strong>
                </div>

                <div className="learning-progress-track">
                  <div
                    className="learning-progress-bar"
                    style={{
                      width: `${learningItem.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="learning-meta">
                <span>
                  Target:{" "}
                  {new Date(
                    learningItem.targetDate
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {learningItem.notes && (
                <p className="learning-notes">
                  {learningItem.notes}
                </p>
              )}

              <div className="learning-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleEditClick(learningItem)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteLearningItem(learningItem.id)
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="learning-empty">
            <p>
              {learningItems.length === 0
                ? "No learning goals yet. Add your first goal."
                : "No learning goals match your search or filter."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default LearningList