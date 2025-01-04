import React, { ReactNode, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";
import LogoImage from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar: React.FC = (): ReactNode => {
  const {
    isLoggedIn,
    userName,
    userEmail,
    logout,
    setIsLoggedIn,
    setUserName,
    setUserEmail,
  } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (): void => {
    navigate("/SignUp");
  };

  // Automatically load user info from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("loggedInUser");
    const storedUserEmail = localStorage.getItem("userEmail");

    if (token && storedUserName && storedUserEmail) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  }, [setIsLoggedIn, setUserName, setUserEmail]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      {/* Logo Section */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={LogoImage} alt="GulambiGoa Logo" height="90" width="auto" />
      </Link>

      {/* Menu Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/Goa">
              Goa
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/villa">
              Villa
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/things-to-do">
              Things to Do
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/restaurants">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="postExperience">
              Post your experience
            </Link>
          </li>
          <li className="nav-item">
            <SearchBar placeholder="Search..." />
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="d-flex align-items-center">
        {isLoggedIn ? (
          <>
            {/* Profile Dropdown */}
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="profileDropdown"
                className="profile-button"
                style={{
                  backgroundColor: "transparent",
                  color: "#6a0dad",
                  border: "none",
                  fontSize: "1.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="bi bi-person-circle"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu
                align="end"
                style={{
                  background: "linear-gradient(135deg, #f3e5f5, #d1c4e9)", // Gradient background
                  borderRadius: "12px",
                  padding: "15px",
                  border: "1px solid #6a0dad",
                  width: "250px", // Increased width for better text alignment
                }}
              >
                <Dropdown.ItemText
                  style={{
                    color: "black",
                    fontSize: "1rem",
                    padding: "10px 15px",
                    textAlign: "left",
                  }}
                >
                  Hello <b>{userName}</b>!
                </Dropdown.ItemText>
                <Dropdown.ItemText
                  style={{
                    color: "black",
                    fontSize: "1rem",
                    padding: "10px 15px",
                    textAlign: "left",
                  }}
                >
                  Welcome to Gulambi Goa!
                </Dropdown.ItemText>
                <Dropdown.ItemText
                  style={{
                    color: "black",
                    fontSize: "1rem",
                    padding: "10px 15px",
                    textAlign: "left",
                  }}
                >
                  Email: <small>{userEmail}</small>
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>

            {/* Logout Button */}
            <button
              className="btn btn-danger btn-sm ms-3"
              onClick={logout}
              style={{
                whiteSpace: "nowrap",
                backgroundColor: "#6a0dad",
                border: "none",
                color: "white",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn btn-dark btn-sm SignInButton"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
