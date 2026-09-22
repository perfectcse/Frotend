import { useDevTrack } from "../../context/useDevTrack"
import "./UpcomingInterviews.css"

function UpcomingInterviews() {
  const { interviews } = useDevTrack()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingInterviews = interviews
    .filter((interview) => {
      const interviewDate = new Date(interview.date)
      interviewDate.setHours(0, 0, 0, 0)

      return (
        interviewDate >= today &&
        interview.status === "Scheduled"
      )
    })
    .sort(
      (firstInterview, secondInterview) =>
        new Date(firstInterview.date) -
        new Date(secondInterview.date)
    )
    .slice(0, 3)

  return (
    <section className="upcoming-interviews">
      <div className="upcoming-interviews-header">
        <div>
          <h2>Upcoming Interviews</h2>
          <p>Your next scheduled interviews.</p>
        </div>
      </div>

      {upcomingInterviews.length > 0 ? (
        <div className="upcoming-interview-list">
          {upcomingInterviews.map((interview) => (
            <article
              className="upcoming-interview-item"
              key={interview.id}
            >
              <div>
                <h3>{interview.role}</h3>

                <p>{interview.company}</p>
              </div>

              <div className="upcoming-interview-details">
                <span>{interview.round}</span>

                <strong>
                  {new Date(
                    interview.date
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="upcoming-interviews-empty">
          <p>No upcoming interviews scheduled.</p>
        </div>
      )}
    </section>
  )
}

export default UpcomingInterviews