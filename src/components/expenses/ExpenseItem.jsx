function ExpenseItem({ expense }) {
  return (
    <div className="list-group-item">
      <div className="d-flex justify-content-between">
        <div>
          <div className="fw-semibold">{expense.paidBy} paid</div>
          <small className="text-muted">Split type: {expense.splitType}</small>
        </div>

        <div className="fw-bold">₹{expense.amount.toFixed(2)}</div>
      </div>

      <small className="text-muted">
        {new Date(expense.createdAt).toLocaleString()}
      </small>
    </div>
  );
}

export default ExpenseItem;