import { useDevTrack } from "../../context/useDevTrack"
import "./InterviewStats.css"

function InterviewStats() {
  const { interviews } = useDevTrack()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const totalInterviews = interviews.length

  const upcomingInterviews = interviews.filter(
    (interview) => {
      const interviewDate = new Date(interview.date)
      interviewDate.setHours(0, 0, 0, 0)

      return (
        interviewDate >= today &&
        interview.status === "Scheduled"
      )
    }
  ).length

  const completedInterviews = interviews.filter(
    (interview) =>
      interview.status === "Completed" ||
      interview.status === "Passed" ||
      interview.status === "Failed"
  ).length

  const passedInterviews = interviews.filter(
    (interview) => interview.status === "Passed"
  ).length

  return (
    <div className="interview-stats">
      <div className="interview-stat-card">
        <p>Total Interviews</p>
        <strong>{totalInterviews}</strong>
      </div>

      <div className="interview-stat-card">
        <p>Upcoming</p>
        <strong>{upcomingInterviews}</strong>
      </div>

      <div className="interview-stat-card">
        <p>Completed</p>
        <strong>{completedInterviews}</strong>
      </div>

      <div className="interview-stat-card">
        <p>Passed</p>
        <strong>{passedInterviews}</strong>
      </div>
    </div>
  )
}

export default InterviewStats