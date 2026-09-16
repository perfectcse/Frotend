import "./Header.css"

function Header({ isDarkMode, onToggleTheme }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Personal Finance Dashboard</h1>
        <p>Here's your financial overview.</p>
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

        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
        >
          🔔
        </button>

        <div className="profile">
          <div className="profile-avatar">VM</div>

          <div>
            <strong>Vishal</strong>
            <span>Personal Account</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header