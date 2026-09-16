import { useState } from "react"
import Layout from "./components/layout/Layout"
import "./App.css"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(
      "financeflow-theme"
    )

    return savedTheme === "dark"
  })

  function toggleTheme() {
    setIsDarkMode((currentMode) => {
      const newMode = !currentMode

      localStorage.setItem(
        "financeflow-theme",
        newMode ? "dark" : "light"
      )

      return newMode
    })
  }

  return (
    <Layout
      isDarkMode={isDarkMode}
      onToggleTheme={toggleTheme}
    />
  )
}

export default App