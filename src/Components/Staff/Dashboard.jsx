// ... existing imports remain the same
import { useState } from "react";
import "./css/Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Toggle the sidebar's visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/"); // Navigate to the home page
  };

  const [todos] = useState([
    {
      id: 1,
      date: "2024-12-01",
      customer: "John Wick",
      service: "Haircut",
      duration: "30 minutes",
      status: "Completed",
      payment: "Paid",
      createdDate: "2024-11-25",
    },
    {
      id: 2,
      date: "2024-12-02",
      customer: "James Bond",
      service: "Facial",
      duration: "1 hour",
      status: "Pending",
      payment: "Pending",
      createdDate: "2024-11-26",
    },
  ]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="welcome-section">
            <span className="welcome-text">Hi, Shrikant</span>
          </div>
          <div className="header-actions">
            <button className="logout-btn" onClick={handleLogout}>
              <span>Logout</span>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>

        <div className="dashboard-title-section">
          <h4 className="dashboard-title">Staff Dashboard</h4>
          <div className="date-picker">
            <input type="date" className="custom-date-input" />
          </div>
        </div>

        <div className="stats-container">
          {[
            { title: "Total Appointments", value: "0", color: "#6366f1" },
            { title: "Approved Appointments", value: "0", color: "#10b981" },
            { title: "Pending Appointments", value: "0", color: "#f59e0b" },
            { title: "Revenue", value: "15000/-", color: "#3b82f6" },
            { title: "Customers", value: "1", color: "#8b5cf6" },
            { title: "Completed Appointments", value: "1", color: "#ec4899" },
          ].map((stat, index) => (
            <div
              className="stat-card"
              key={index}
              style={{ "--delay": `${index * 0.1}s` }}
            >
              <h4 style={{ color: stat.color }}>{stat.value}</h4>
              <p>{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="appointments-section">
          <h4 className="section-title">Upcoming Appointments</h4>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.date}</td>
                    <td>{todo.customer}</td>
                    <td>{todo.service}</td>
                    <td>{todo.duration}</td>
                    <td>
                      <span
                        className={`status-badge ${todo.status.toLowerCase()}`}
                      >
                        {todo.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`payment-badge ${todo.payment.toLowerCase()}`}
                      >
                        {todo.payment}
                      </span>
                    </td>
                    <td>{todo.createdDate}</td>
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
