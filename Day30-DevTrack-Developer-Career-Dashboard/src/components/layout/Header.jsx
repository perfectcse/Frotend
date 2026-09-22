import "./Header.css"

function Header({ isDarkMode, onToggleTheme }) {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>Developer Career Dashboard</h1>

        <p>
          Track your job search, interviews, and learning
          progress.
        </p>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={
            isDarkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        <div className="header-profile">
          <div className="profile-avatar">VM</div>

          <div className="profile-info">
            <strong>Vishal</strong>
            <span>Developer</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header