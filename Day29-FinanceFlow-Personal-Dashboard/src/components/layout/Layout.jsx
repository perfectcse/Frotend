import Sidebar from "./Sidebar"
import Header from "./Header"
import Dashboard from "../dashboard/Dashboard"
import "./Layout.css"

function Layout({ isDarkMode, onToggleTheme }) {
  return (
    <div className={`layout ${isDarkMode ? "dark" : ""}`}>
      <Sidebar />

      <main className="main-content">
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
        />

        <Dashboard />
      </main>
    </div>
  )
}

export default Layout