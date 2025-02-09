import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import axiosInstance from "../axiosConfig/axiosConfig";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalAppointments: 0,
    totalStaff: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Fetch appointments from the backend
    axiosInstance
      .get("/admin/appointments")
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container container-fluid p-0">
      {/* Sidebar */}
      <div className={`admin-sidebar ${isSidebarOpen ? "open" : ""} `} >
        <nav className="sidebar-nav">
          <Link to="/admin/admin-dashboard" className="nav-item active">
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/admin/staff-management" className="nav-item">
            <i className="fas fa-users"></i> Staff Management
          </Link>
          <Link to="/admin/services-management" className="nav-item">
            <i className="fas fa-concierge-bell"></i> Services
          </Link>
          <Link to="/admin/appointments-management" className="nav-item">
            <i className="fas fa-calendar-check"></i> Appointments
          </Link>
          <Link to="/admin/customers" className="nav-item">
            <i className="fas fa-user-friends"></i> Customers
          </Link>
          <Link to="/admin/reports" className="nav-item">
            <i className="fas fa-chart-bar"></i> Reports
          </Link>
          <Link to="/admin/settings" className="nav-item">
            <i className="fas fa-cog"></i> Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="admin-info">
            <span>Welcome, Admin</span>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="stats-container">
          <div className="stat-card">
            <i className="fas fa-calendar-check stat-icon"></i>
            <div className="stat-info">
              <h3>{dashboardData.totalAppointments}</h3>
              <p>Total Appointments</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-users stat-icon"></i>
            <div className="stat-info">
              <h3>{dashboardData.totalStaff}</h3>
              <p>Total Staff</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-user-friends stat-icon"></i>
            <div className="stat-info">
              <h3>{dashboardData.totalCustomers}</h3>
              <p>Total Customers</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-dollar-sign stat-icon"></i>
            <div className="stat-info">
              <h3>₹{dashboardData.totalRevenue}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="appointments-section">
          <div className="section-header">
            <h2>Recent Appointments</h2>
            <div className="date-filter">
              <input type="date" className="form-control" />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Staff</th>
                  <th>Service</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.customer}</td>
                    <td>{appointment.staff}</td>
                    <td>{appointment.service}</td>
                    <td>{appointment.duration}</td>
                    <td>
                      <span
                        className={`status-badge ${appointment.status ? appointment.status.toLowerCase() : ''}`}
                      >
                        {appointment.status || 'Unknown'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`payment-badge ${appointment.payment ? appointment.payment.toLowerCase() : ''}`}
                      >
                        {appointment.payment || 'Pending'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
