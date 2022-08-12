import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header(props) {
    const isLoggedIn = !!props.token;
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container bg-light">
                <div className="navbar-header">
                    <p className="navbar-brand">DAILY JOURNAL</p>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    {isLoggedIn && (
                        <li id="home">
                            <Link to="/" className="nav-item nav-link">
                                HOME
                            </Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li id="compose">
                            <Link to="/compose" className="nav-item nav-link">
                                COMPOSE
                            </Link>
                        </li>
                    )}
                    <li id="about">
                        <Link to="/about" className="nav-item nav-link">
                            ABOUT
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        <li id="logout">
                            <Link
                                to="/logout"
                                className="nav-item nav-link"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </Link>
                        </li>
                    ) : (
                        <li id="login">
                            <Link to="/login" className="nav-item nav-link">
                                LOGIN
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Header;
