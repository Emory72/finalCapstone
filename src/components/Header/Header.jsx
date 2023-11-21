import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../../contexts/ShoppingCartContext/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import { Navbar } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
export default function Header() {
  const navigate = useNavigate();
  const { currentUser, handleSignout } = useUserContext();
  const { openCart, cartQuantity } = useShoppingCart();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(true);
  };
  const closeSidebar = () => {
    setMenuOpen(false);
  };
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky-header">
      <div className="container">
        <Navbar className="header-navigation">
          <div className="logo-box clearfix">
            <Link to="/" className="navbar-brand">
              <img
                src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                className="main-logo"
                width="128"
              />
            </Link>
            <div className="header__social">
              <a href="https://www.youtube.com/channel/UCWc3ASTJcb0FeO2oFfX8IDQ">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://www.facebook.com/lophocviet/">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </div>
          </div>

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
          <div className="right-side-box">
            {currentUser ? (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant="rgb(41, 159, 146)"
                  className="header__loginUser"
                >
                  {currentUser.hoTen}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/userInfo">Account</Dropdown.Item>
                  <Dropdown.Item href="/registedCourse">Lesson</Dropdown.Item>
                  <Dropdown.Item onClick={handleSignout}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <button
                onClick={() => navigate("/sign-in")}
                className="header__search-btn  border-0"
              >
                <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            )}

            <button
              className="header__search-btn cart-popup"
              onClick={openCart}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {cartQuantity > 0 && (
                <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    top: "-10px",
                    right: 0,
                    transform: "translate(25%,25%)",
                  }}
                >
                  {cartQuantity}
                </div>
              )}
            </button>

            {/* Ham Menu Btn  */}

            <button
              className="menu-toggler header__search-btn"
              onClick={toggleMenu}
            >
              <span className="icon-menu">
                <FontAwesomeIcon icon={faBars} />
              </span>
            </button>
          </div>

          {/* Sidebar */}
          <Sidebar isMenuOpen={isMenuOpen} closeSidebar={closeSidebar} />
        </Navbar>
      </div>
      <div className="site-header__decor">
        <div className="site-header__decor-row">
          <div className="site-header__decor-single">
            <div className="site-header__decor-inner-1"></div>
          </div>
          <div className="site-header__decor-single">
            <div className="site-header__decor-inner-2"></div>
          </div>
          <div className="site-header__decor-single">
            <div className="site-header__decor-inner-3"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
