import "./Analytics.css"

function Analytics({ categorySpending }) {
  const categories = Object.entries(categorySpending)

  const maxAmount =
    categories.length > 0
      ? Math.max(...categories.map(([, amount]) => amount))
      : 0

  return (
    <section className="analytics-section">
      <div className="analytics-header">
        <div>
          <h2>Spending Breakdown</h2>
          <p>See where your money is going.</p>
        </div>
      </div>

      <div className="category-list">
        {categories.length > 0 ? (
          categories.map(([category, amount]) => {
            const percentage =
              maxAmount > 0
                ? (amount / maxAmount) * 100
                : 0

            return (
              <div
                className="category-item"
                key={category}
              >
                <div className="category-info">
                  <span>{category}</span>

                  <strong>
                    ₹{amount.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="category-bar">
                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
            )
          })
        ) : (
          <p className="analytics-empty">
            No expense data available.
          </p>
        )}
      </div>
    </section>
  )
}

export default Analytics