import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serverEndpoint } from "../config/appConfig";
import { Link } from "react-router-dom";
import "./GroupCard.css";
import { Trash2 } from "lucide-react";

function GroupCard({ group, onUpdate }) {
  if (!group) return null;

  const user = useSelector((state) => state.userDetails);

  const {
    _id,
    name,
    description,
    adminEmail,
    membersEmail = [],
    thumbnail,
    isSettled,
  } = group;

  const isAdmin = user?.email === adminEmail;

  const [showAdd, setShowAdd] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddMember = async () => {
    if (!memberEmail) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.patch(
        `${serverEndpoint}/groups/${_id}/members/add`,
        { emails: [memberEmail] },
        { withCredentials: true },
      );

      onUpdate(res.data.data);
      setMemberEmail("");
      setShowAdd(false);
    } catch {
      setError("Unable to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== Group Card ===== */}
      <div className="card splitwise-card h-100 position-relative">
        {isAdmin && (
  <button
    className="delete-btn"
    title="Delete group"
    onClick={async () => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this group? This cannot be undone.",
      );
      if (!confirmDelete) return;

      try {
        await axios.delete(`${serverEndpoint}/groups/${_id}`, {
          withCredentials: true,
        });

        onUpdate({ _id, deleted: true });
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete group");
      }
    }}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  </button>
)}


        <div className="card-body d-flex flex-column">
          {/* Header */}
          <div className="d-flex align-items-start gap-3 mb-3">
            <div className="group-avatar">
              {thumbnail ? <img src={thumbnail} alt={name} /> : "🌴"}
            </div>

            <div>
              <h5 className="mb-1">{name}</h5>
              <p className="text-muted mb-1">{description}</p>
              <p className="text-muted mb-0">
                Admin: <strong>{adminEmail}</strong>
              </p>
            </div>
          </div>

          {/* Members preview */}
          <div className="mb-3">
            <p className="fw-bold mb-2">Members</p>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div className="member-avatars">
                {membersEmail.slice(0, 3).map((email, i) => (
                  <div key={i} className="member-avatar">
                    {email[0].toUpperCase()}
                  </div>
                ))}

                {membersEmail.length > 3 && (
                  <div className="member-avatar more-members">
                    +{membersEmail.length - 3}
                  </div>
                )}
              </div>

              {isAdmin && !showAdd && (
                <button className="invite-btn" onClick={() => setShowAdd(true)}>
                  + Invite
                </button>
              )}
            </div>

            {/* Add member */}
            {isAdmin && showAdd && (
              <div className="mt-2">
                <input
                  type="email"
                  className="form-control form-control-sm mb-2"
                  placeholder="user@email.com"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                />

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      setShowAdd(false);
                      setMemberEmail("");
                      setError("");
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handleAddMember}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                </div>

                {error && <div className="text-danger small mt-1">{error}</div>}
              </div>
            )}
          </div>

          {/* ✅ SETTLED / UNSETTLED — BACKEND DRIVEN */}
          <div className="settle-bar mb-3">
            {isSettled ? (
              <span className="group-status settled">Settled</span>
            ) : (
              <span className="group-status owed">Unsettled</span>
            )}
          </div>

          {/* Actions */}
          <div className="d-flex gap-3 mt-auto pt-1">
            <button
              className="terminal-btn"
              onClick={() => setShowMembersModal(true)}
            >
              View Members
            </button>

            <Link to={`/groups/${_id}/expenses`} className="terminal-btn">
              Manage Expenses
            </Link>
          </div>
        </div>
      </div>

      {/* Members Modal */}
      {showMembersModal && (
        <div
          className="members-modal-overlay"
          onClick={() => setShowMembersModal(false)}
        >
          <div className="members-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="mb-0">Group Members</h5>
              <button
                className="close-btn"
                onClick={() => setShowMembersModal(false)}
              >
                ✕
              </button>
            </div>

            <ul className="list-group list-group-flush">
              {membersEmail.map((email, i) => (
                <li key={i} className="list-group-item">
                  {email}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupCard;