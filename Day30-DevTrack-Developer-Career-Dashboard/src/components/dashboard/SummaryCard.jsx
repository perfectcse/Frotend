import "./SummaryCard.css"

function SummaryCard({ title, value, description }) {
  return (
    <article className="summary-card">
      <div className="summary-card-top">
        <p className="summary-card-title">{title}</p>
        <span className="summary-card-icon">↗</span>
      </div>

      <h2 className="summary-card-value">{value}</h2>

      <p className="summary-card-description">
        {description}
      </p>
    </article>
  )
}

export default SummaryCard