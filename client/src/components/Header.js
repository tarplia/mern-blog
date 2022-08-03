import React from "react";

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container bg-light">
                <div className="navbar-header">
                    <p className="navbar-brand">DAILY JOURNAL</p>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li id="home">
                        <a
                            href="#"
                            className="nav-item nav-link"
                            onClick={(e) => {
                                props.tabClickHandler(e, "home");
                            }}
                        >
                            HOME
                        </a>
                    </li>
                    <li id="compose">
                        <a
                            href="#compose"
                            className="nav-item nav-link"
                            onClick={(e) => {
                                props.tabClickHandler(e, "compose");
                            }}
                        >
                            COMPOSE
                        </a>
                    </li>
                    <li id="about">
                        <a
                            href="#about"
                            className="nav-item nav-link"
                            onClick={(e) => {
                                props.tabClickHandler(e, "about");
                            }}
                        >
                            ABOUT
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
