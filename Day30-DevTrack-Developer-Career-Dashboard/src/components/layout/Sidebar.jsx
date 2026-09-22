import { NavLink } from "react-router-dom"
import "./Sidebar.css"

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>DevTrack</h2>
        <p>Career Dashboard</p>
      </div>

      <nav
        className="sidebar-nav"
        aria-label="Main navigation"
      >
        <p className="nav-title">MAIN</p>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/applications"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Applications
        </NavLink>

        <NavLink
          to="/interviews"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Interviews
        </NavLink>

        <NavLink
          to="/learning"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Learning
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Analytics
        </NavLink>

        <p className="nav-title">SETTINGS</p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar