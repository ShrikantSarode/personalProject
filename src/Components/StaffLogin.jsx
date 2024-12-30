import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/StaffLogin.css";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === "" || password === "") {
      toast.error('Please fill in all fields.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-message'
      });
      return;
    }

    if (email === 'staff@example.com' && password === 'staff123') {
      localStorage.setItem('staffAuth', 'true');
      
      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-message'
      });

      setTimeout(() => {
        navigate("/staff/staff-dashboard");
      }, 2000);
    } else {
      toast.error('Invalid credentials. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-message'
      });
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <>
      <div className="text-center d-flex justify-content-center mb-5">
        <div className="login-form text-center mt-5">
          <h2 className="login-title">Staff Login</h2>

          <form onSubmit={handleLogin} className="login-form-container">
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="input-field"
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
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            <Link to="/signup" className="signup-link">
              I don't have an Account 🤦‍♂️
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default StaffLogin;
