import "./MonthlyOverview.css"

function MonthlyOverview({
  monthlyIncome,
  monthlyExpenses,
  monthlyBalance,
  monthlySpentPercentage,
}) {
  const currentMonth = new Date().toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  })

  return (
    <section className="monthly-overview">
      <div className="monthly-header">
        <div>
          <h2>Monthly Overview</h2>
          <p>{currentMonth} financial performance.</p>
        </div>
      </div>

      <div className="monthly-grid">
        <div className="monthly-stat income">
          <span>Monthly Income</span>
          <strong>
            ₹{monthlyIncome.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="monthly-stat expense">
          <span>Monthly Expenses</span>
          <strong>
            ₹{monthlyExpenses.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="monthly-stat balance">
          <span>Monthly Net</span>
          <strong>
            ₹{monthlyBalance.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="monthly-stat spending">
          <span>Income Spent</span>
          <strong>
            {monthlySpentPercentage.toFixed(1)}%
          </strong>
        </div>
      </div>
    </section>
  )
}

export default MonthlyOverview