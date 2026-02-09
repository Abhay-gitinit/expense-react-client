import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { serverEndpoint } from "../../config/appConfig";

import BalanceRow from "./BalanceRow";
import UserBalanceCard from "./UserBalanceCard";
import PayList from "./PayList";
import PayModal from "./PayModal";
import RecentTransactions from "./RecentTransactions";
import AddExpenseModal from "../expenses/AddExpenseModal";

function SettlementSummary({ groupId }) {
  const [balances, setBalances] = useState({});
  const [settlements, setSettlements] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payTarget, setPayTarget] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const currentUser = useSelector(
    (state) =>
      state?.auth?.user?.email ||
      state?.userDetails?.email ||
      state?.user?.email,
  );

  const fetchAll = async () => {
    try {
      const [settlementRes, expensesRes, groupRes] = await Promise.all([
        axios.get(`${serverEndpoint}/expenses/settlement/${groupId}`, {
          withCredentials: true,
        }),
        axios.get(`${serverEndpoint}/expenses/group/${groupId}`, {
          withCredentials: true,
        }),
        axios.get(`${serverEndpoint}/groups/${groupId}`, {
          withCredentials: true,
        }),
      ]);

      setBalances(settlementRes.data.data?.balances || {});
      setSettlements(settlementRes.data.data?.settlements || []);
      setExpenses(expensesRes.data.data || []);
      setGroup(groupRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [groupId]);

  if (loading || !group) {
    return <p className="text-muted">Loading…</p>;
  }

  const isAdmin = currentUser === group.adminEmail;

  return (
    <div className="mt-4">
      {/* Balance */}
      <UserBalanceCard balances={balances} settlements={settlements} />

      {/* Settlement summary (admin only) */}
      {isAdmin && (
        <div className="card mb-4 glow-card">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Settlement Summary</h5>

            {Object.entries(balances).map(([email, amount]) => (
              <BalanceRow
                key={email}
                email={email}
                amount={amount}
                members={group.members}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pay list (non-admin users) */}
      {!isAdmin && (
        <PayList
          settlements={settlements}
          currentUser={currentUser}
          members={group.members}
          onPayClick={setPayTarget}
        />
      )}

      {/* Pay modal */}
      {payTarget && (
        <PayModal
          settlement={payTarget}
          groupId={groupId}
          onClose={() => setPayTarget(null)}
          onSuccess={fetchAll}
        />
      )}

      {/* Recent transactions */}
      <RecentTransactions
        expenses={
          isAdmin
            ? expenses
            : expenses.filter(
                (e) =>
                  e.paidBy === currentUser ||
                  e.participants?.includes(currentUser),
              )
        }
        members={group.members}
      />

      {/* Floating + button */}
      {!showAddExpense && (
        <button
          className="add-expense-btn"
          onClick={() => setShowAddExpense(true)}
        >
          <span className="plus-icon">+</span>
        </button>
      )}

      {/* Add Expense Modal */}
      {showAddExpense && (
        <AddExpenseModal
          groupId={group._id}
          members={group.members.map((m) => m.email)}
          onClose={() => setShowAddExpense(false)}
          onExpenseAdded={() => {
            setShowAddExpense(false);
            fetchAll();
          }}
        />
      )}
    </div>
  );
}

export default SettlementSummary;