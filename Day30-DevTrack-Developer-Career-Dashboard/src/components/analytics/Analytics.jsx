import { useDevTrack } from "../../context/useDevTrack"
import "./Analytics.css"

function Analytics() {
  const {
    applications,
    interviews,
    learningItems,
  } = useDevTrack()

  const applicationStatuses = [
    "Applied",
    "Interview",
    "Selected",
    "Rejected",
  ]

  const applicationStatusData = applicationStatuses.map(
    (status) => {
      const count = applications.filter(
        (application) => application.status === status
      ).length

      return {
        status,
        count,
      }
    }
  )

  const totalApplications = applications.length

  const learningAverage =
    learningItems.length > 0
      ? Math.round(
          learningItems.reduce(
            (total, learningItem) =>
              total + Number(learningItem.progress),
            0
          ) / learningItems.length
        )
      : 0

  const completedLearning = learningItems.filter(
    (learningItem) => learningItem.status === "Completed"
  ).length

  const inProgressLearning = learningItems.filter(
    (learningItem) => learningItem.status === "In Progress"
  ).length

  const passedInterviews = interviews.filter(
    (interview) => interview.status === "Passed"
  ).length

  const completedInterviews = interviews.filter(
    (interview) =>
      interview.status === "Completed" ||
      interview.status === "Passed" ||
      interview.status === "Failed"
  ).length

  return (
    <section
      className="analytics-section"
      id="analytics"
    >
      <div className="analytics-header">
        <h2>Career Analytics</h2>

        <p>
          Understand your job search and learning progress.
        </p>
      </div>

      <div className="analytics-grid">
        <article className="analytics-card application-analytics">
          <div className="analytics-card-header">
            <div>
              <h3>Application Status</h3>

              <p>
                {totalApplications} total applications
              </p>
            </div>
          </div>

          <div className="status-list">
            {applicationStatusData.map((item) => {
              const percentage =
                totalApplications > 0
                  ? Math.round(
                      (item.count / totalApplications) * 100
                    )
                  : 0

              return (
                <div
                  className="status-row"
                  key={item.status}
                >
                  <div className="status-row-header">
                    <span>{item.status}</span>

                    <strong>
                      {item.count} ({percentage}%)
                    </strong>
                  </div>

                  <div className="analytics-progress-track">
                    <div
                      className="analytics-progress-bar"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </article>

        <article className="analytics-card learning-analytics">
          <div className="analytics-card-header">
            <div>
              <h3>Learning Progress</h3>

              <p>Current learning overview</p>
            </div>
          </div>

          <div className="learning-overview">
            <div className="learning-average">
              <strong>{learningAverage}%</strong>

              <span>Average Progress</span>
            </div>

            <div className="learning-stats">
              <div>
                <span>In Progress</span>

                <strong>{inProgressLearning}</strong>
              </div>

              <div>
                <span>Completed</span>

                <strong>{completedLearning}</strong>
              </div>
            </div>
          </div>
        </article>

        <article className="analytics-card interview-analytics">
          <div className="analytics-card-header">
            <div>
              <h3>Interview Results</h3>

              <p>Interview activity overview</p>
            </div>
          </div>

          <div className="interview-overview">
            <div>
              <span>Total Interviews</span>

              <strong>{interviews.length}</strong>
            </div>

            <div>
              <span>Completed</span>

              <strong>{completedInterviews}</strong>
            </div>

            <div>
              <span>Passed</span>

              <strong>{passedInterviews}</strong>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Analytics