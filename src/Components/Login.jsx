import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const Login = () => {
  // State to store the form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track if it's admin or user login
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Please fill in all fields.');
      return;
    }
     navigate('/user/user-appointment')
  };

  // Handle the change in email and password inputs
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle change in user/admin toggle
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setIsAdmin(selectedRole === 'admin');
    
    if (selectedRole === 'admin') {
      // Navigate to the Admin Login page if "Admin Login" is selected
      navigate('/admin-login');
    }
  };

  return (
    <>
      <div className="text-center d-flex justify-content-center">
        <div className="login-form text-center mt-5">
          <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>

          {error && <div className="error-message">{error}</div>}

          {/* Role Selection Radio Buttons */}
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
