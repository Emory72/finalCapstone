import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
export default function Sidebar({ isMenuOpen, closeSidebar }) {
  return (
    <div className={`sidebar ${isMenuOpen && "open"}`}>
      <span className="closeIcon" onClick={closeSidebar}>
        <FontAwesomeIcon icon={faClose} />
      </span>

      <div className="main-navigation">
        <ul className=" navigation-box">
          <li className="current">
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#none">Pages</a>
            <ul className="sub-menu">
              <li>
                <Link to="/about">About Page</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="/courses">Courses</a>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
