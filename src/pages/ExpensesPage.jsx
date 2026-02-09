import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverEndpoint } from "../config/appConfig";
import SettlementSummary from "../components/settlement/SettlementSummary";
import "./expensesPage.css";

function ExpensesPage() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`${serverEndpoint}/groups/${groupId}`, {
          withCredentials: true,
        });
        setGroup(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  if (loading) return <p className="page-center">Loading…</p>;
  if (!group) return <p className="page-center">Group not found</p>;

  return (
    <div className="expenses-glass-page">
      <div className="expenses-dashboard">
        <SettlementSummary groupId={groupId} members={group.members} />
      </div>
    </div>
  );
}

export default ExpensesPage;