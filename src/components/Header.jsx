import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-body">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Expense App
                </Link> 
                <button 
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    data-bs-target="#navbarSupportedContent" 
                    data-bs-toggle="collapse" 
                    > 
                    <span className="navbar-toggler-icon" /> 
                </button> 
                <div className="collapse navbar-collapse" id="navbarSupportedContent" > 
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
                        <li className="nav-item"> 
                            <Link aria-current="page" className="nav-link active" to="/" >   
                                Home 
                            </Link> 
                        </li> 
                        <li className="nav-item"> 
                            <Link className="nav-link" to="/login"> 
                                Login 
                            </Link> 
                        </li> 
                    </ul> 
                </div> 
            </div> 
        </nav> 
    )
}

export default Header;