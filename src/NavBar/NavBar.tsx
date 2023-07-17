import { useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../assets/favicon-32x32.png";

function NavBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <nav className={styles.navbar}>
      <img className={styles["navbar-logo"]} src={logo} alt="Logo" />
      <h1 className={styles["navbar-brand"]}>Ming Yuan</h1>
      <button
        className={styles.hamburger}
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
        className={
          isNavExpanded
            ? `${styles["nav-menu"]} ${styles["expanded"]}`
            : styles["nav-menu"]
        }
      >
        <ul>
          <li>About</li>
          <li>Projects</li>
          <li>Experiences</li>
          <li>Skill</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
