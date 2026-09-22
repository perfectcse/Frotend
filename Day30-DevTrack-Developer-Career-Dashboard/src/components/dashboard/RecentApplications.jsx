import { useDevTrack } from "../../context/useDevTrack"
import "./RecentApplications.css"

function RecentApplications() {
  const { applications } = useDevTrack()

  const recentApplications = [...applications]
    .sort(
      (firstApplication, secondApplication) =>
        new Date(secondApplication.date) -
        new Date(firstApplication.date)
    )
    .slice(0, 3)

  return (
    <section className="recent-applications">
      <div className="recent-applications-header">
        <div>
          <h2>Recent Applications</h2>
          <p>Your latest job applications.</p>
        </div>
      </div>

      {recentApplications.length > 0 ? (
        <div className="recent-application-list">
          {recentApplications.map((application) => (
            <article
              className="recent-application-item"
              key={application.id}
            >
              <div className="recent-application-main">
                <h3>{application.role}</h3>
                <p>{application.company}</p>
              </div>

              <div className="recent-application-details">
                <span
                  className={`recent-application-status ${application.status.toLowerCase()}`}
                >
                  {application.status}
                </span>

                <span className="recent-application-date">
                  {new Date(
                    application.date
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="recent-applications-empty">
          <p>No applications yet.</p>
        </div>
      )}
    </section>
  )
}

export default RecentApplications