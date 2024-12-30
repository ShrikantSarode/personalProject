import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/StaffLogin.css"

const StaffLogin = () => {
  // State to store the form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields.");
      return;
    }

    // Navigate to the staff dashboard or home page after successful login (placeholder)
    navigate("/staff/staff-dashboard");
  };

  // Handle the change in email and password inputs
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <>
      <div className="text-center d-flex justify-content-center">
        <div className="login-form text-center mt-5">
          <h2>Staff Login</h2>

          {error && <div className="error-message">{error}</div>}

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

export default StaffLogin;
