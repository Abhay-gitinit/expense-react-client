import { useEffect, useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../../config/appConfig";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ groupId }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `${serverEndpoint}/expenses/group/${groupId}`,
          { withCredentials: true },
        );
        setExpenses(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [groupId]);

  if (loading) return <p className="text-muted">Loading expenses…</p>;
  if (!expenses.length) return <p className="text-muted">No expenses yet</p>;

  return (
    <div className="mt-4">
      <h5 className="fw-bold mb-3">Expenses</h5>

      <div className="list-group">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense._id} // ✅ correct key
            expense={expense}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;