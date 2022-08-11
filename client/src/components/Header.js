import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container bg-light">
                <div className="navbar-header">
                    <p className="navbar-brand">DAILY JOURNAL</p>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li id="home">
                        <Link
                            to="/"
                            className="nav-item nav-link"
                            onClick={(e) => {
                                props.tabClickHandler(e, "home");
                            }}
                        >
                            HOME
                        </Link>
                    </li>
                    <li id="compose">
                        <Link
                            to="/compose"
                            className="nav-item nav-link"
                            onClick={(e) => {
                                props.tabClickHandler(e, "compose");
                            }}
                        >
                            COMPOSE
                        </Link>
                    </li>
                    <li id="about">
                        <Link
                            to="/about"
                            className="nav-item nav-link"
                            onClick={(e) => {
                                props.tabClickHandler(e, "about");
                            }}
                        >
                            ABOUT
                        </Link>
                    </li>
                    <li id="login">
                        <Link
                            to="/login"
                            className="nav-item nav-link"
                            onClick={(e) => {
                                props.tabClickHandler(e, "login");
                            }}
                        >
                            LOGIN
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
