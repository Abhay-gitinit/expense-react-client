import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GroupCard from "../components/GroupCard";
import CreateGroupCard from "../components/CreateGroupCard";
import CreateGroupModal from "../components/CreateGroupModal";

function Groups() {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${serverEndpoint}/groups/my-groups`, {
        withCredentials: true,
      });
      setGroups(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Update group after add/remove member
  const handleGroupUpdate = (updatedGroup) => {
    if (updatedGroup.deleted) {
      setGroups((prev) => prev.filter((g) => g._id !== updatedGroup._id));
    } else {
      setGroups((prev) =>
        prev.map((g) => (g._id === updatedGroup._id ? updatedGroup : g)),
      );
    }
  };

  // Add newly created group
  const handleCreateSuccess = (newGroup) => {
    setGroups((prev) => [newGroup, ...prev]);
  };

  // Search filter
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="container p-5 text-center">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div className="container p-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          {/* Back Arrow button */}
          <button
            className="back-arrow-btn"
            onClick={() => navigate("/dashboard")}
            aria-label="Back to dashboard"
          >
            ←
          </button>

          <h2 className="fw-bold mb-0">
            My <span className="laptop-purple">Groups</span>
          </h2>
        </div>
        {/* Filter Search option*/}
        <input
          type="text"
          className="search-input"
          placeholder="Search groups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="row g-4">
        {/* Create Group Card */}
        <div className="col-md-6 col-lg-4">
          <CreateGroupCard onClick={() => setShowCreate(true)} />
        </div>

        {/* Groups */}
        {filteredGroups.map((group) => (
          <div className="col-md-6 col-lg-4" key={group._id}>
            <GroupCard group={group} onUpdate={handleGroupUpdate} />
          </div>
        ))}
      </div>

      {/* Create Group Modal */}
      {showCreate && (
        <div className="modal-backdrop-blur">
          <CreateGroupModal
            show={showCreate}
            onHide={() => setShowCreate(false)}
            onSuccess={handleCreateSuccess}
          />
        </div>
      )}
    </div>
  );
}

export default Groups;