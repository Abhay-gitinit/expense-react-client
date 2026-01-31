import { Link } from "react-router-dom";

function UserHeader() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard">
                Expense App
                </Link>
                <button
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-bs-target="#navbarSupportedContent"
                    data-bs-toggle="collapse"
                    type="button" 
                >
                    <span className="navbar-toggle-icon" />
                </button>
                <div 
                    className="collapse navbar-collapse"
                    id = "navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    aria-current="page"
                                    className="nav-link active"
                                    to="/dashboard">
                                        Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                </div>
            </div>
        </nav>
    );
}

export default UserHeader;