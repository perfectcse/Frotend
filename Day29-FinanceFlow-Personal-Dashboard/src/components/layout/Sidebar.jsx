import "./Sidebar.css"

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>FinanceFlow</h2>
        <p>Personal Finance</p>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-title">OVERVIEW</p>

        <a href="#dashboard">Dashboard</a>
        <a href="#transactions">Transactions</a>
        <a href="#analytics">Analytics</a>

        <p className="nav-title">SETTINGS</p>

        <a href="#settings">Settings</a>
      </nav>
    </aside>
  )
}

export default Sidebar