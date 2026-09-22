import Sidebar from "./Sidebar"
import Header from "./Header"
import "./Layout.css"

function Layout({
  children,
  isDarkMode,
  onToggleTheme,
}) {
  return (
    <div className={`layout ${isDarkMode ? "dark" : ""}`}>
      <Sidebar />

      <main className="main-content">
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
        />

        {children}
      </main>
    </div>
  )
}

export default Layout