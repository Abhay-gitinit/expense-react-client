function GroupCard({ group }) {
  if (!group) return null;

  const {
    name,
    description,
    adminEmail,
    membersEmail = [],
    thumbnail
  } = group;

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
          <p className="card-text text-muted">
            {description}
          </p>
        )}

        <p className="mb-1">
          <strong>Admin:</strong> {adminEmail}
        </p>

        <p className="mb-2">
          <strong>Members:</strong> {membersEmail.length}
        </p>

        {membersEmail.length > 0 && (
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
      </div>
    </div>
  );
}

export default GroupCard;