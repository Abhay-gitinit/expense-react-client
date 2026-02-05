import BalanceRow from "./BalanceRow";

function BalanceList({ balances, onSelect }) {
  const entries = Object.entries(balances);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Final Balances</h5>

        {entries.length === 0 && (
          <p className="text-muted">No balances available</p>
        )}

        {entries.map(([email, amount]) => (
          <BalanceRow
            key={email}
            email={email}
            amount={amount}
            onClick={() => onSelect({ email, amount })}
          />
        ))}
      </div>
    </div>
  );
}

export default BalanceList;