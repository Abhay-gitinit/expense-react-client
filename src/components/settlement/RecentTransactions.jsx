import { useState } from "react";
import { handleGlow } from "../../pages/useGlow";

function RecentTransactions({ expenses = [], members = [] }) {
  const [expanded, setExpanded] = useState(false);

  if (!expenses.length) {
    return <p className="text-muted mt-4">No recent transactions</p>;
  }

  const sorted = [...expenses].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const getName = (email) =>
    members.find((m) => m.email === email)?.name || email;

  const visibleTx = expanded ? sorted : sorted.slice(0, 2);

  return (
    <div className="card-section glow-card" onMouseMove={handleGlow}>
      <div className="section-header">
        <h5 className="section-title">Recent transactions</h5>

        <button className="toggle-btn" onClick={() => setExpanded((p) => !p)}>
          {expanded ? "Hide" : "Show"}
        </button>
      </div>

      {visibleTx.map((tx) => {
        const payerName = getName(tx.paidBy);

        const label =
          tx.participants?.length > 1
            ? `${payerName} paid for the group`
            : `${payerName} paid ${getName(tx.participants?.[0])}`;

        return (
          <div key={tx._id} className="tx-row">
            <span>{label}</span>
            <span className="tx-amount">₹{tx.amount}</span>
          </div>
        );
      })}
    </div>
  );
}

export default RecentTransactions;