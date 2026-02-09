function CreateGroupCard({ onClick }) {
  return (
    <div className="group-card create-group-card" onClick={onClick}>
      <div className="create-group-content">
        <div className="create-icon">+</div>
        <p className="create-text">Create Group</p>
      </div>
    </div>
  );
}

export default CreateGroupCard;