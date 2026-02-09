import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserHeader() {
  const user = useSelector((state) => state.userDetails);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Dashboard
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/groups">
                My Groups
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.name || "Account"}
              </Link>

              <ul className="dropdown-menu dropdown-menu-end user-dropdown">
                {/* User email (info only) */}
                <li>
                  <span className="dropdown-item-text user-email">
                    {user?.email}
                  </span>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Logout */}
                <li>
                  <Link
                    className="dropdown-item terminal-dropdown"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;