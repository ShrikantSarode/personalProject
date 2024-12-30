import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is included

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the sidebar's visibility
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
    <div className="container-fluid ms-5">
      {/* Menu Button to toggle Sidebar */}
      <div className="row">
        {/* Main Content */}
        <div className="col-xl-10 mt-1">
          <div className="row align-items-center">
            {/* "Hi, Shrikant" Span */}
            <div className="col-xl-6">
              <span
                style={{
                  fontSize: "30px",
                  color: "#343a40",
                  padding: "10px",
                }}
              >
                Hi, Shrikant
              </span>
            </div>
            <div className="col-xl-6 text-end pe-5">
              {/* Logout Button */}
              <button
                className="btn btn-outline-warning ms-3"
                onClick={handleLogout()}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="row mt-4">
            <div className="col-xl-6">
              <h4 style={{ fontSize: "30px" }}>Staff Dashboard</h4>
            </div>
            <div className="col-xl-6 text-end pe-5">
              <input type="date" name="" id="" className="p-2" />
            </div>
          </div>

          {/* Stats Boxes */}
          <div className="row">
            <div
              className="col-xl-3 ms-5 mt-5 p-2 text-center"
              style={{ border: "1px solid lightgrey", borderRadius: "7px" }}
            >
              <h4>0</h4>
              <p>Total Appointments</p>
            </div>
            <div
              className="col-xl-3 ms-5 mt-5 p-2 text-center"
              style={{ border: "1px solid lightgrey", borderRadius: "7px" }}
            >
              <h4 style={{ color: "lightgreen" }}>0</h4>
              <p>Approved Appointments</p>
            </div>
            <div
              className="col-xl-3 ms-5 mt-5 p-2 text-center"
              style={{ border: "1px solid lightgrey", borderRadius: "7px" }}
            >
              <h4 style={{ color: "orange" }}>0</h4>
              <p>Pending Appointments</p>
            </div>
            <div
              className="col-xl-3 ms-5 mt-5 mb-5 p-2 text-center"
              style={{ border: "1px solid lightgrey", borderRadius: "7px" }}
            >
              <h4 style={{ color: "blue" }}>15000/-</h4>
              <p>Revenue</p>
            </div>
            <div
              className="col-xl-3 ms-5 mt-5 mb-5 p-2 text-center"
              style={{ border: "1px solid lightgrey", borderRadius: "7px" }}
            >
              <h4 style={{ color: "violet" }}>1</h4>
              <p>Customers</p>
            </div>
            <div
              className="col-xl-3 ms-5 mt-5 mb-5 p-2 text-center"
              style={{ border: "1px solid lightgrey", borderRadius: "7px" }}
            >
              <h4 style={{ color: "violet" }}>1</h4>
              <p>Completed Appointments</p>
            </div>
          </div>

          {/* Upcoming Appointments Table */}
          <div className="row">
            <h4>Upcoming Appointments</h4>

            {/* Table to display the To-Do List */}
            <table className="table table-striped mt-4">
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
                    <td>{todo.status}</td>
                    <td>{todo.payment}</td>
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

{
  /* <div className="col-xl-2">
          <button
            className="btn btn-warning mt-2"
            type="button"
            onClick={toggleSidebar}
          >
            Menu
          </button>

         
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="sidebar-header">
              <h5>Dashboard</h5>
              <button className="close-btn" onClick={toggleSidebar}>
                &times;
              </button>
            </div>
            <div className="sidebar-body">
              <ul className="nav n">
                <li className="nav-item n-t">
                  <Link className="nav-link n-l" to="/staff/staff-dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item n-t">
                  <Link className="nav-link n-l" to="/staff/staff-appointments">
                    Appointments
                  </Link>
                </li>
                <li className="nav-item n-t">
                  <Link className="nav-link n-l" to="/staff/staff-customer">
                    Customer
                  </Link>
                </li>
                <li className="nav-item n-t">
                  <Link className="nav-link n-l" to="/staff/staff-payment">
                    Payment
                  </Link>
                </li>
                <li className="nav-item n-t">
                  <Link className="nav-link n-l" to="/staff/staff-profile">
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div> */
}
