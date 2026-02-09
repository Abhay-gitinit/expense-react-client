import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchMyGroups } from "../services/groupService";

import DashboardGroupCard from "../components/DashboardGroupCard";
import CreateGroupCard from "../components/CreateGroupCard";
import CreateGroupModal from "../components/CreateGroupModal";
import DashboardBalanceSummary from "../components/DashboardBalanceSummary";

import "./dashboard.css";

function Dashboard() {
  const user = useSelector((state) => state.userDetails);

  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await fetchMyGroups();
        setGroups(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingGroups(false);
      }
    };

    loadGroups();
  }, []);

  const handleGroupCreated = (newGroup) => {
    setGroups((prev) => [...prev, newGroup]);
  };

  return (
    <>
      <div
        className={`dashboard-container ${
          showCreateGroup ? "dashboard-blurred" : ""
        }`}
      >
        <h4 className="dashboard-title">Welcome, {user?.name}!</h4>

        {/* FINAL BALANCES (REAL DATA) */}
        <section className="dashboard-section">
          <DashboardBalanceSummary groups={groups} />
        </section>

        {/* MY GROUPS */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <h5 className="mb-0 fw-semibold">My Groups</h5>
              <small className="text-muted">
                Manage and track your shared expenses
              </small>
            </div>

            <Link to="/groups" className="terminal-btn">
              Manage Groups
            </Link>
          </div>

          <div className="group-grid">
            <CreateGroupCard onClick={() => setShowCreateGroup(true)} />

            {loadingGroups && (
              <p className="text-muted small">Loading groups…</p>
            )}

            {!loadingGroups &&
              groups.map((group) => (
                <DashboardGroupCard key={group._id} group={group} />
              ))}
          </div>
        </section>
      </div>

      {/* ORIGINAL MODAL (UNCHANGED) */}
      {showCreateGroup && (
        <CreateGroupModal
          show={showCreateGroup}
          onHide={() => setShowCreateGroup(false)}
          onSuccess={handleGroupCreated}
        />
      )}
    </>
  );
}

export default Dashboard;