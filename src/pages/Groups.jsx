import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${serverEndpoint}/groups/my-groups`,
        { withCredentials: true }
      );
      setGroups(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // 🔁 update group after add/remove member
  const handleGroupUpdate = (updatedGroup) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) =>
        g._id === updatedGroup._id ? updatedGroup : g
      )
    );
  };

  // ➕ add newly created group
  const handleCreateGroupSuccess = (newGroup) => {
    setGroups((prev) => [...prev, newGroup]);
  };

  if (loading) {
    return (
      <div className="container p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading....</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Your Groups</h2>
          <p className="text-muted">
            Manage your shared expenses and split costs
          </p>
        </div>
        <button
          className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
          onClick={() => setShow(true)}
        >
          Create Group
        </button>
      </div>

      {groups.length === 0 && (
        <p>No Groups Found, Start By Creating One!</p>
      )}

      {groups.length > 0 && (
        <div className="row g-4">
          {groups.map((group) => (
            <div className="col-md-6 col-lg-4" key={group._id}>
              <GroupCard
                group={group}
                onUpdate={handleGroupUpdate}
              />
            </div>
          ))}
        </div>
      )}

      <CreateGroupModal
        show={show}
        onHide={() => setShow(false)}
        onSuccess={handleCreateGroupSuccess}
      />
    </div>
  );
}

export default Groups;