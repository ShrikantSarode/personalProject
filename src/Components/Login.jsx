import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const Login = () => {
  // State to store form data and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Prepare the login request payload
      const loginData = { email, password };

      // Make the POST request to your backend API
      const response = await axios.post(
        "https://localhost:7111/api/User/login", // Ensure this is the correct API URL
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If login is successful
      if (response.status === 200) {
        // Destructure with the correct property names
        const { message, userName, roleId } = response.data;

        // Store the user info in localStorage (or use your preferred state management)
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", userName);
        localStorage.setItem("roleId", roleId); // Store roleId to decide the navigation

        console.log(response.data);

        console.log(roleId);

        // Clear previous error and navigate based on roleId
        setError(""); // Clear any previous errors

        // Navigate based on roleId
        if (roleId === 1) {
          // Admin
          navigate("/admin/admin-dashboard");
        } else if (roleId === 3) {
          // User
          navigate("/user/user-appointment");
        } else if (roleId === 2) {
          // Staff
          navigate("/staff/staff-dashboard");
        } else {
          // In case of any undefined role, redirect to user appointment by default
          navigate("/user/user-appointment");
        }

        // if (RoleId === 1) {
        //   // Admin
        //   navigate("/admin/admin-dashboard");
        // } else if (RoleId === 3) {
        //   // User
        //   navigate("/user/user-appointment");
        // } else {
        //   // In case you have other roles, you can manage them here
        //   navigate("/staff/staff-dashboard");
        // }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Show error response from backend
        setError(error.response.data || "Invalid email or password.");
      } else {
        // Fallback error message
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Handle changes in email and password inputs
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="text-center d-flex justify-content-center">
      <div className="login-form text-center mt-5">
        <h2>Login</h2>

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
  );
};

export default Login;
