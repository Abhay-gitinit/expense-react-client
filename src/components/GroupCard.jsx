import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serverEndpoint } from "../config/appConfig";

function GroupCard({ group, onUpdate }) {
  if (!group) return null;

  
  const  user  = useSelector((state) => state.userDetails);

  const {
    _id,
    name,
    description,
    adminEmail,
    membersEmail = [],
    thumbnail
  } = group;
console.log("Redux user:", user);
console.log("Group admin:", adminEmail);
  const isAdmin = user?.email === adminEmail;

  const [showMembers, setShowMembers] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleMembers = () => {
    setShowMembers((prev) => !prev);
  };

  const handleAddMember = async () => {
    if (!memberEmail) return;

    setLoading(true);
    setErrors({});
    
    try {
      const response = await axios.patch(
        `${serverEndpoint}/groups/${_id}/members/add`,
        { emails: [memberEmail] },
        { withCredentials: true }
      );

      onUpdate(response.data.data); // updated group from backend
      setMemberEmail("");
      setShowMembers(true);
    } catch (error) {
      console.error(error);
      setErrors({ message: "Unable to add member" });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="card h-100 shadow-sm">
      {thumbnail && (
        <img
          src={thumbnail}
          className="card-img-top"
          alt={name}
          style={{ height: "160px", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        {description && (
          <p className="card-text text-muted">{description}</p>
        )}

        <p className="mb-1">
          <strong>Admin:</strong> {adminEmail}
        </p>

        <p className="mb-2">
          <strong>Members:</strong> {membersEmail.length}
        </p>

        <button
          className="btn btn-sm btn-outline-secondary mb-2"
          onClick={toggleMembers}
        >
          {showMembers ? "Hide Members" : "Show Members"}
        </button>

        {showMembers && membersEmail.length > 0 && (
          <ul className="list-group list-group-flush mb-3">
            {membersEmail.map((email, index) => (
              <li
                key={index}
                className="list-group-item px-0 py-1 border-0"
              >
                {email}
              </li>
            ))}
          </ul>
        )}

        {showMembers && membersEmail.length === 0 && (
          <p className="text-muted small">No members yet</p>
        )}

        {isAdmin && (
          <div className="mt-3">
            <label className="form-label small fw-bold text-secondary">
              Add Member
            </label>

            <div className="input-group input-group-sm">
              <input
                type="email"
                className="form-control"
                placeholder="user@email.com"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleAddMember}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>

            {errors.message && (
              <div className="text-danger small mt-1">
                {errors.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupCard;