import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo2.png";
import { AuthContext } from "../context/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo_input">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="searchBox">
            <form>
              <input type="text" placeholder="Search..." aria-label="search" />
            </form>
          </div>
        </div>
        <div className="links">
          <span style={{ textTransform: 'capitalize' }}>{currentUser?.username}</span>
          <span className="profile-pic" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src="https://avatars.githubusercontent.com/u/105350534?s=400&u=c7ff6e1bce4f9113d125619eb28fa7520a8022e4&v=4" alt="Profile Picture" />
          </span>
          <div className={showMenu ? "dropdown-menu" : "dropdown-menu-close"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ul className="list">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              {currentUser ? (
                <li>
                  <Link to="/write">Write</Link>
                </li>
              ) : (
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              )}
              <li>
                <Link to="/list">Reading list</Link>
              </li>
              {currentUser ? (
                <li>
                  <button style={{ cursor: "pointer" }} onClick={logout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
