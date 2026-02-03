import { Link } from "react-router-dom";

function UserHeader({ user }) {
    return (
        <nav 
        className="navbar navbar-expand-lg bg-dark border-bottom border-body" 
        data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                Dashboard
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
                            {/*Add other nav links here if needed */ }
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Link className="nav-link fropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-exapanded="false">
                                    {user ? user.name : <>Account</>}
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/logout">
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