import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo2.png";
import { AuthContext } from "../context/authContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const profilePicRef = useRef(null);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLinkClick = () => {
    setShowMenu(false);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      profilePicRef.current &&
      !profilePicRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo_input">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="links">
          <span style={{ textTransform: 'capitalize' }}><em>Welcome </em>: {currentUser?.username}</span>
          <span ref={profilePicRef} className="profile-pic" onClick={handleClick}>
            <img src="https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png" alt="Profile Picture" />
          </span>
          {showMenu && (
            <div ref={dropdownRef} className="dropdown-menu">
              <ul className="list">
                <li>
                  <Link to="/" onClick={handleLinkClick}>
                    Dashboard
                  </Link>
                </li>
                {currentUser ? (
                  <li>
                    <Link to="/write" onClick={handleLinkClick}>
                      Write
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/register" onClick={handleLinkClick}>
                      Sign Up
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/" onClick={handleLinkClick}>
                    Reading list
                  </Link>
                </li>
                {currentUser ? (
                  <li>
                    <button style={{ cursor: "pointer" }} onClick={logout}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link to="/login" onClick={handleLinkClick}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
