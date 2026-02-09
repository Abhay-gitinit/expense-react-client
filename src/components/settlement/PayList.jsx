import { handleGlow } from "../../pages/useGlow";

function PayList({ settlements, currentUser, members, onPayClick }) {
  const toPay = settlements.filter((s) => s.from === currentUser);

  if (!toPay.length) {
    return null;
  }

  return (
    <div className="card-section glow-card" onMouseMove={handleGlow}>
      <h5 className="section-title">You need to pay</h5>

      {toPay.map((s) => {
        const user = members.find((m) => m.email === s.to);

        return (
          <div key={`${s.from}-${s.to}`} className="pay-row">
            <span className="pay-name">{user?.name || s.to}</span>

            <div className="pay-actions">
              <span className="pay-amount">₹{s.amount}</span>

              <button className="btn-pay" onClick={() => onPayClick(s)}>
                Pay
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PayList;