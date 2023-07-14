import { useState } from "react"
import "./NavBar.css"
import logo from "../assets/favicon-32x32.png"

function NavBar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
        <nav className="navbar">
            <img className="navbar-logo" src={logo} alt="Logo" />
            <h1 className="navbar-brand">Ming Yuan</h1>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                }}
            >
                {/* icon from heroicons.com */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={isNavExpanded ? "nav-menu expanded" : "nav-menu"}>
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