import React from 'react'
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

const Navbar = () => {
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')  
        history('/login')
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">OnChatter</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/jj">Pricing</Link>
                        </li>

                    </ul>
                </div>


                <Link className="btn btn-primary mx-1" to="/joinchat" role="button">Join Chat</Link>

                {!localStorage.getItem('token') ? <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
                </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}


            </div>
        </nav>
    )
}

export default Navbar