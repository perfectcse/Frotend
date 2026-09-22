import { useState } from "react"
import ApplicationForm from "./ApplicationForm"
import { useDevTrack } from "../../context/useDevTrack"
import "./ApplicationList.css"

function ApplicationList() {
  const {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
  } = useDevTrack()

  const [showForm, setShowForm] = useState(false)

  const [editingApplication, setEditingApplication] =
    useState(null)

  const [searchTerm, setSearchTerm] = useState("")

  const [filterStatus, setFilterStatus] = useState("all")

  const filteredApplications = applications.filter(
    (application) => {
      const searchValue = searchTerm.toLowerCase()

      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(searchValue) ||
        application.role
          .toLowerCase()
          .includes(searchValue) ||
        application.location
          .toLowerCase()
          .includes(searchValue)

      const matchesStatus =
        filterStatus === "all" ||
        application.status === filterStatus

      return matchesSearch && matchesStatus
    }
  )

  function handleAddApplication(newApplication) {
    addApplication(newApplication)

    setShowForm(false)
  }

  function handleEditClick(application) {
    setEditingApplication(application)
    setShowForm(true)
  }

  function handleUpdateApplication(updatedApplication) {
    updateApplication(
      editingApplication.id,
      updatedApplication
    )

    setEditingApplication(null)
    setShowForm(false)
  }

  function handleDeleteApplication(applicationId) {
    deleteApplication(applicationId)
  }

  function handleAddClick() {
    setEditingApplication(null)
    setShowForm(true)
  }

  function handleCancelForm() {
    setEditingApplication(null)
    setShowForm(false)
  }

  return (
    <section
      className="application-section"
      id="applications"
    >
      <div className="application-header">
        <div>
          <h2>Job Applications</h2>

          <p>
            Manage and track your job applications.
          </p>
        </div>

        <button
          type="button"
          className="add-application-button"
          onClick={handleAddClick}
        >
          + Add Application
        </button>
      </div>

      {showForm && (
        <ApplicationForm
          key={editingApplication?.id || "new"}
          application={editingApplication}
          onAdd={handleAddApplication}
          onUpdate={handleUpdateApplication}
          onCancel={handleCancelForm}
        />
      )}

      <div className="application-filters">
        <input
          type="search"
          placeholder="Search company, role, location..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          aria-label="Search applications"
        />

        <select
          value={filterStatus}
          onChange={(event) =>
            setFilterStatus(event.target.value)
          }
          aria-label="Filter applications by status"
        >
          <option value="all">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="application-list">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <article
              className="application-item"
              key={application.id}
            >
              <div className="application-main">
                <div>
                  <h3>{application.role}</h3>

                  <p className="company-name">
                    {application.company}
                  </p>
                </div>

                <span
                  className={`application-status ${application.status.toLowerCase()}`}
                >
                  {application.status}
                </span>
              </div>

              <div className="application-meta">
                <span>{application.location}</span>

                <span>
                  {new Date(
                    application.date
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {application.notes && (
                <p className="application-notes">
                  {application.notes}
                </p>
              )}

              <div className="application-actions">
                {application.jobLink && (
                  <a
                    href={application.jobLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Job
                  </a>
                )}

                <button
                  type="button"
                  onClick={() =>
                    handleEditClick(application)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteApplication(
                      application.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="application-empty">
            <p>
              {applications.length === 0
                ? "No applications yet. Add your first application."
                : "No applications match your search or filter."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ApplicationList