import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { serverEndpoint } from "../config/appConfig";

function DashboardBalanceSummary({ groups }) {
  const user = useSelector((state) => state.userDetails);

  const [balance, setBalance] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch balance from all groups
  useEffect(() => {
    if (!groups || groups.length === 0) {
      setLoading(false);
      return;
    }

    const fetchAllSettlements = async () => {
      try {
        let total = 0;

        for (const group of groups) {
          const res = await axios.get(
            `${serverEndpoint}/expenses/settlement/${group._id}`,
            { withCredentials: true },
          );

          const balances = res.data.data.balances || {};
          total += balances[user.email] || 0;
        }

        setBalance(total);
      } catch (error) {
        console.error("Failed to fetch dashboard balance", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSettlements();
  }, [groups, user.email]);

  // ⌨️ Typing animation (SAFE VERSION)
  useEffect(() => {
    if (loading) return;

    const formatted =
      balance > 0
        ? `+₹${balance.toFixed(2)}`
        : balance < 0
          ? `-₹${Math.abs(balance).toFixed(2)}`
          : `₹0.00`;

    let index = 0;
    setDisplayText("");
    setTypingDone(false);

    const interval = setInterval(() => {
      index++;

      if (index <= formatted.length) {
        setDisplayText(formatted.slice(0, index));
      } else {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [balance, loading]);

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <p className="text-muted mb-0">Loading balance…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* Label */}
        <div className="dashboard-balance-label">Balance</div>

        {/* Typed Amount */}
        <div
          className={`dashboard-balance-amount ${
            balance > 0
              ? "balance-positive"
              : balance < 0
                ? "balance-negative"
                : "balance-settled"
          }`}
        >
          {displayText}
          {!typingDone && <span className="typing-caret">▌</span>}
        </div>
      </div>
    </div>
  );
}

export default DashboardBalanceSummary;