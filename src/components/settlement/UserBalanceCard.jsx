import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleGlow } from "../../pages/useGlow";

function UserBalanceCard({ balances = {}, settlements = [] }) {
  const state = useSelector((state) => state);

  const currentUser =
    state?.auth?.user?.email || state?.userDetails?.email || state?.user?.email;

  // 1️⃣ Net balance from backend
  const netBalance = balances[currentUser] || 0;

  // 2️⃣ Calculate owed amount from settlements
  const totalOwed = settlements
    .filter((s) => s.from === currentUser)
    .reduce((sum, s) => sum + s.amount, 0);

  // 3️⃣ Final balance logic
  const finalAmount = netBalance !== 0 ? netBalance : -totalOwed;

  const isSettled = finalAmount === 0;

  const [displayAmount, setDisplayAmount] = useState(0);

  // Animate number
  useEffect(() => {
    const duration = 600;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplayAmount(finalAmount * progress);

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [finalAmount]);

  let amountClass = "balance-neutral";
  if (finalAmount > 0) amountClass = "balance-positive";
  if (finalAmount < 0) amountClass = "balance-negative";

  return (
    <div className="balance-card glow-card" onMouseMove={handleGlow}>
      <div className="balance-header">
        <span className="balance-label">Balance</span>

        <span
          className={`balance-status-pill ${
            isSettled ? "settled" : "unsettled"
          }`}
        >
          {isSettled ? "Settled" : "Unsettled"}
        </span>
      </div>

      <div className={`balance-amount ${amountClass}`}>
        ₹{Math.abs(displayAmount).toFixed(2)}
      </div>
    </div>
  );
}

export default UserBalanceCard;