import React from "react";
import "./NavBar.css"
import logo from "../assets/favicon-32x32.png"

function NavBar() {
    return (
        <nav className="navbar">
            <img className="navbar-logo" src={logo} alt="Logo" />
            <h1 className="navbar-brand">Ming Yuan</h1>
            <div
                className="nav-menu">
                <ul>
                    <li>
                        Projects
                    </li>
                    <li>
                        Games
                    </li>
                    <li>
                        About
                    </li>
                    <li>
                        Contact
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar