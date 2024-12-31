import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserCss/UserHeader.css";

export default function UserHeader() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem("authToken");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <header className="user-header">
      <div className="header-container">
        <div className="logo-section">
          <h1>Groom Easy</h1>
          <span className="user-tag">Customer Portal</span>
        </div>

        <nav className="user-nav">
          <ul className="nav-links">
            <li>
              <Link to="/user/user-fav" className="nav-link">
                <i className="fas fa-home"></i>
                Favorite Service
              </Link>
            </li>
            <li>
              <Link to="/user/user-appointment" className="nav-link">
                <i className="fas fa-calendar-alt"></i>
                My Appointments
              </Link>
            </li>
            <li>
              <Link to="/user/user-profile" className="nav-link">
                <i className="fas fa-user"></i>
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        <div className="user-actions">
          <div className="notification-bell">
            <i className="fas fa-bell"></i>
          
              {/* <span className="notification-badge"></span> */}
          
          </div>

          <div className="user-profile1">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="user-avatar me-3"
            />
            <span className="user-name">Shrikant</span>
          </div>

          <button className=" btn btn-danger" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>Logout
          </button>
        </div>
      </div>
    </header>
  );
}
