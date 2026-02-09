function BalanceRow({ email, amount, members }) {
  const user = members.find((m) => m.email === email);

  const name = user?.name || email;

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-2">
      <span className="fw-medium">{name}</span>

      {amount === 0 && <span className="text-muted small">Settled</span>}

      {amount > 0 && (
        <span className="text-success fw-bold fs-5">+₹{amount.toFixed(2)}</span>
      )}

      {amount < 0 && (
        <span className="text-danger fw-bold fs-5">
          -₹{Math.abs(amount).toFixed(2)}
        </span>
      )}
    </div>
  );
}

export default BalanceRow;