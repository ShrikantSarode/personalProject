import React from "react";
import { Link } from "react-router-dom";
import "./UserCss/UserHeader.css";

export default function UserHeader() {
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
            {/* <li>
              <Link to="/services" className="nav-link">
                <i className="fas fa-cut"></i>
                Services
              </Link>
            </li> */}
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
            <span className="notification-badge">3</span>
          </div>

          <div className="user-profile">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="user-avatar"
            />
            <span className="user-name">Shrikant</span>
          </div>

          <button className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
