import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";

const Nav = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showSidebar = () => {
    setIsVisible((prev) => !prev);
  };
  const hideSidebar = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <nav>
      <ul>
        <li className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#DF2430"
          >
            <path d="m380-340 280-180-280-180v360Zm-60 220v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z" />
          </svg>
          EZTechMovie
        </li>
        <li className="hide">
          <Link to="/">StreamList</Link>
        </li>
        <li className="hide">
          <Link to="/movies">Movies</Link>
        </li>
        <li className="menu" onClick={showSidebar}>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 -960 960 960"
              width="26px"
              fill="#000"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </a>
        </li>
      </ul>

      <ul className="side" style={{ display: isVisible ? "flex" : "none" }}>
        <li onClick={hideSidebar}>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 -960 960 960"
              width="26px"
              fill="#000"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </a>
        </li>
        <li>
          <Link to="/">StreamList</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
