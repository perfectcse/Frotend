function SummaryCard({ title, value, type }) {
  return (
    <article className={`summary-card ${type}`}>
      <p className="summary-card-title">{title}</p>
      <h2 className="summary-card-value">{value}</h2>
    </article>
  )
}

export default SummaryCard