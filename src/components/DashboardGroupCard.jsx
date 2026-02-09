import { useNavigate } from "react-router-dom";

function DashboardGroupCard({ group }) {
  const navigate = useNavigate();

  if (!group) return null;

  const { _id, name = "Unnamed Group", membersEmail = [], isSettled } = group;

  return (
    <div
      className="group-card"
      onClick={() => navigate(`/groups/${_id}/expenses`)}
    >
      <div className="group-card-header">
        <h6 className="group-title">{name}</h6>

        {isSettled ? (
          <span className="group-status settled">Settled</span>
        ) : (
          <span className="group-status owed">Unsettled</span>
        )}
      </div>

      <p className="group-members">
        {membersEmail.length} member
        {membersEmail.length !== 1 && "s"}
      </p>
    </div>
  );
}

export default DashboardGroupCard;