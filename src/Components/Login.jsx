import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const loginData = { email, password };

      const response = await axios.post(
        "https://localhost:7111/api/User/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { message, userName, roleId } = response.data;

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", userName);
        localStorage.setItem("roleId", roleId);

        setError(""); // Clear any previous errors

        // Show toast notification
        toast.success("Login successful! Redirecting...", {
          position: "top-center",
          autoClose: 2000, // Toast will disappear in 2 seconds
        });

        // Delay navigation by 2 seconds
        setTimeout(() => {
          if (roleId === 1) {
            navigate("/admin/admin-dashboard");
          } else if (roleId === 3) {
            navigate("/user/user-appointment");
          } else if (roleId === 2) {
            navigate("/staff/staff-dashboard");
          } else {
            navigate("/user/user-appointment");
          }
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data || "Invalid email or password.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="text-center d-flex justify-content-center">
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <div className="login-form text-center mt-5 mb-5">
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">
            I don't have an Account 🤦‍♂️
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
