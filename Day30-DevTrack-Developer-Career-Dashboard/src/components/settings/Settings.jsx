import { useDevTrack } from "../../context/useDevTrack"
import "./Settings.css"

function Settings() {
  const {
    applications,
    interviews,
    learningItems,
  } = useDevTrack()

  return (
    <section className="settings-section">
      <div className="settings-header">
        <h2>Settings</h2>

        <p>
          Manage your DevTrack workspace and view your data.
        </p>
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          <div className="settings-card-header">
            <h3>Appearance</h3>

            <p>
              Theme preferences are available from the header.
            </p>
          </div>

          <div className="settings-info">
            <span>Theme Control</span>
            <strong>Header Toggle</strong>
          </div>
        </article>

        <article className="settings-card">
          <div className="settings-card-header">
            <h3>Workspace Data</h3>

            <p>
              Current records stored in your DevTrack workspace.
            </p>
          </div>

          <div className="settings-stats">
            <div>
              <span>Applications</span>
              <strong>{applications.length}</strong>
            </div>

            <div>
              <span>Interviews</span>
              <strong>{interviews.length}</strong>
            </div>

            <div>
              <span>Learning Goals</span>
              <strong>{learningItems.length}</strong>
            </div>
          </div>
        </article>

        <article className="settings-card">
          <div className="settings-card-header">
            <h3>About DevTrack</h3>

            <p>
              A personal career management workspace built with
              React.
            </p>
          </div>

          <div className="settings-info">
            <span>Data Storage</span>
            <strong>Browser Local Storage</strong>
          </div>

          <div className="settings-info">
            <span>Application Type</span>
            <strong>React SPA</strong>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Settings