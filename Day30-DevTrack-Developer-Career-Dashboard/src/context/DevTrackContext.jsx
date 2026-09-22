import {
  useEffect,
  useState,
} from "react"
import DevTrackContext from "./devTrackStore"

const defaultApplications = [
  {
    id: 1,
    company: "Infosys",
    role: "Frontend Developer",
    location: "Bengaluru",
    status: "Applied",
    date: "2026-09-20",
    jobLink: "https://example.com",
    notes: "Applied through company website",
  },
  {
    id: 2,
    company: "TCS",
    role: "React Developer",
    location: "Remote",
    status: "Interview",
    date: "2026-09-18",
    jobLink: "https://example.com",
    notes: "Technical interview scheduled",
  },
  {
    id: 3,
    company: "Wipro",
    role: "MERN Developer",
    location: "Bengaluru",
    status: "Rejected",
    date: "2026-09-15",
    jobLink: "https://example.com",
    notes: "Application closed",
  },
]

const defaultInterviews = [
  {
    id: 1,
    company: "TCS",
    role: "React Developer",
    round: "Technical Interview",
    date: "2026-09-25",
    status: "Scheduled",
    notes:
      "Prepare React hooks and JavaScript questions.",
  },
  {
    id: 2,
    company: "Infosys",
    role: "Frontend Developer",
    round: "HR Interview",
    date: "2026-09-20",
    status: "Completed",
    notes:
      "Discussed projects and previous internship experience.",
  },
  {
    id: 3,
    company: "Wipro",
    role: "MERN Developer",
    round: "Technical Round",
    date: "2026-09-18",
    status: "Failed",
    notes:
      "Need to improve backend and MongoDB concepts.",
  },
]

const defaultLearningItems = [
  {
    id: 1,
    skill: "React.js",
    category: "Frontend",
    progress: 75,
    status: "In Progress",
    targetDate: "2026-10-15",
    notes:
      "Practice hooks, context, and performance optimization.",
  },
  {
    id: 2,
    skill: "JavaScript",
    category: "Programming",
    progress: 90,
    status: "In Progress",
    targetDate: "2026-10-05",
    notes:
      "Continue advanced JavaScript interview preparation.",
  },
  {
    id: 3,
    skill: "SQL",
    category: "Database",
    progress: 60,
    status: "In Progress",
    targetDate: "2026-10-20",
    notes:
      "Practice joins, subqueries, and optimization.",
  },
]

function getStoredData(key, fallbackData) {
  const savedData = localStorage.getItem(key)

  if (savedData) {
    return JSON.parse(savedData)
  }

  return fallbackData
}

function DevTrackProvider({ children }) {
  const [applications, setApplications] = useState(() =>
    getStoredData(
      "devtrack-applications",
      defaultApplications
    )
  )

  const [interviews, setInterviews] = useState(() =>
    getStoredData(
      "devtrack-interviews",
      defaultInterviews
    )
  )

  const [learningItems, setLearningItems] = useState(() =>
    getStoredData(
      "devtrack-learning",
      defaultLearningItems
    )
  )

  useEffect(() => {
    localStorage.setItem(
      "devtrack-applications",
      JSON.stringify(applications)
    )
  }, [applications])

  useEffect(() => {
    localStorage.setItem(
      "devtrack-interviews",
      JSON.stringify(interviews)
    )
  }, [interviews])

  useEffect(() => {
    localStorage.setItem(
      "devtrack-learning",
      JSON.stringify(learningItems)
    )
  }, [learningItems])

  function addApplication(newApplication) {
    const application = {
      id: Date.now(),
      ...newApplication,
    }

    setApplications((currentApplications) => [
      application,
      ...currentApplications,
    ])
  }

  function updateApplication(
    applicationId,
    updatedApplication
  ) {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              ...updatedApplication,
            }
          : application
      )
    )
  }

  function deleteApplication(applicationId) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== applicationId
      )
    )
  }

  function addInterview(newInterview) {
    const interview = {
      id: Date.now(),
      ...newInterview,
    }

    setInterviews((currentInterviews) => [
      interview,
      ...currentInterviews,
    ])
  }

  function updateInterview(
    interviewId,
    updatedInterview
  ) {
    setInterviews((currentInterviews) =>
      currentInterviews.map((interview) =>
        interview.id === interviewId
          ? {
              ...interview,
              ...updatedInterview,
            }
          : interview
      )
    )
  }

  function deleteInterview(interviewId) {
    setInterviews((currentInterviews) =>
      currentInterviews.filter(
        (interview) => interview.id !== interviewId
      )
    )
  }

  function addLearningItem(newLearningItem) {
    const learningItem = {
      id: Date.now(),
      ...newLearningItem,
    }

    setLearningItems((currentLearningItems) => [
      learningItem,
      ...currentLearningItems,
    ])
  }

  function updateLearningItem(
    learningItemId,
    updatedLearningItem
  ) {
    setLearningItems((currentLearningItems) =>
      currentLearningItems.map((learningItem) =>
        learningItem.id === learningItemId
          ? {
              ...learningItem,
              ...updatedLearningItem,
            }
          : learningItem
      )
    )
  }

  function deleteLearningItem(learningItemId) {
    setLearningItems((currentLearningItems) =>
      currentLearningItems.filter(
        (learningItem) =>
          learningItem.id !== learningItemId
      )
    )
  }

  const value = {
    applications,
    interviews,
    learningItems,

    addApplication,
    updateApplication,
    deleteApplication,

    addInterview,
    updateInterview,
    deleteInterview,

    addLearningItem,
    updateLearningItem,
    deleteLearningItem,
  }

  return (
    <DevTrackContext.Provider value={value}>
      {children}
    </DevTrackContext.Provider>
  )
}

export { DevTrackProvider }