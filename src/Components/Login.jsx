import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const Login = () => {
  // State to store form data and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin/user login
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (email === storedEmail && password === storedPassword) {
      // Successful login
      navigate(isAdmin ? "/admin-dashboard" : "/user/user-appointment");
    } else {
      setError("Invalid email or password.");
    }
  };

  // Handle changes in email and password inputs
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle change in user/admin toggle
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setIsAdmin(selectedRole === "admin");

    if (selectedRole === "admin") {
      // Navigate to Admin Login page if "Admin Login" is selected
      navigate("/admin-login");
    }
  };

  return (
    <>
      <div className="text-center d-flex justify-content-center">
        <div className="login-form text-center mt-5">
          <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>

          {error && <div className="error-message">{error}</div>}

          {/* Role Selection */}
          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={!isAdmin}
                onChange={handleRoleChange}
              />
              User Login
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={isAdmin}
                onChange={handleRoleChange}
              />
              Admin Login
            </label>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link> <br />
            <Link className="mt-3" to="/signup">
              I don't have an Account 🤦‍♂️
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
