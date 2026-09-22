import { useState } from "react"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom"
import { DevTrackProvider } from "./context/DevTrackContext"
import Layout from "./components/layout/Layout"

import DashboardPage from "./pages/DashboardPage"
import ApplicationsPage from "./pages/ApplicationsPage"
import InterviewsPage from "./pages/InterviewsPage"
import LearningPage from "./pages/LearningPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import SettingsPage from "./pages/SettingsPage"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(
      "devtrack-theme"
    )

    return savedTheme === "dark"
  })

  function toggleTheme() {
    setIsDarkMode((currentMode) => {
      const newMode = !currentMode

      localStorage.setItem(
        "devtrack-theme",
        newMode ? "dark" : "light"
      )

      return newMode
    })
  }

  return (
    <DevTrackProvider>
      <BrowserRouter>
        <Layout
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            <Route
              path="/applications"
              element={<ApplicationsPage />}
            />

            <Route
              path="/interviews"
              element={<InterviewsPage />}
            />

            <Route
              path="/learning"
              element={<LearningPage />}
            />

            <Route
              path="/analytics"
              element={<AnalyticsPage />}
            />

            <Route
              path="/settings"
              element={<SettingsPage />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DevTrackProvider>
  )
}

export default App