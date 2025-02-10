import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosConfig/axiosConfig"; // Import the Axios instance
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Signup.css";

export default function SignUp() {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [mobile, setMobile] = useState(""); // State for mobile
  const [roleId, setRoleId] = useState(3); // Default to "3" (customer role)
  const [error, setError] = useState(""); // State for error
  const navigate = useNavigate(); // Use navigate for routing

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email || !password || !name || !mobile) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // Make the API request to register the user
      const response = await fetch("https://localhost:7111/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          mobile,
          roleId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Sign up successful! Redirecting to login...");

        // Reset form fields and navigate to login page after a delay
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setName("");
          setMobile("");
          setError("");
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Something went wrong.");
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Mobile Input */}
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="roleId">Role</label>
            <select
              id="roleId"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
            >
              <option value="1">Admin</option>
              <option value="2">Staff</option>
              <option value="3">Customer</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
