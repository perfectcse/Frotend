import SummaryCard from "./SummaryCard"
import UpcomingInterviews from "./UpcomingInterviews"
import RecentApplications from "./RecentApplications"
import { useDevTrack } from "../../context/useDevTrack"
import "./Dashboard.css"

function Dashboard() {
  const {
    applications,
    interviews,
    learningItems,
  } = useDevTrack()

  const totalApplications = applications.length

  const totalInterviews = interviews.length

  const totalSelected = applications.filter(
    (application) => application.status === "Selected"
  ).length

  const learningProgress =
    learningItems.length > 0
      ? Math.round(
          learningItems.reduce(
            (total, learningItem) =>
              total + Number(learningItem.progress),
            0
          ) / learningItems.length
        )
      : 0

  return (
    <section className="dashboard">
      <div className="dashboard-intro">
        <h2>Overview</h2>

        <p>
          Here's a snapshot of your career progress.
        </p>
      </div>

      <div className="summary-grid">
        <SummaryCard
          title="Applications"
          value={totalApplications}
          description="Total jobs applied"
        />

        <SummaryCard
          title="Interviews"
          value={totalInterviews}
          description="Total interviews tracked"
        />

        <SummaryCard
          title="Selected"
          value={totalSelected}
          description="Selected opportunities"
        />

        <SummaryCard
          title="Learning"
          value={`${learningProgress}%`}
          description="Overall learning progress"
        />
      </div>

      <div className="dashboard-overview-grid">
        <RecentApplications />

        <UpcomingInterviews />
      </div>
    </section>
  )
}

export default Dashboard