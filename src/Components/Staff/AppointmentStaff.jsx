import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is included

export default function AppointmentStaff() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar's visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    // Add more items as needed
  ]);

  return (
    <>
      <div className="container-fluid ms-5">
        {/* Menu Button to toggle Sidebar */}
        <div className="row">
          

          {/* Main Content Area */}
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
                <button className="btn btn-outline-warning ms-3">Logout</button>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="row mt-4">
              <div className="col-xl-6">
                <h4>Manage Appointments</h4>
              </div>
              <div className="col-xl-6 text-end pe-5">
                <button className="btn btn-success">+ Add New</button>
              </div>
            </div>

            {/* Upcoming Appointments Table */}
            <div className="row">
              <div className="col-xl-3 p-2 me-5 mt-5">
                <label className="mb-3">Appointment Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                />
              </div>
              <div className="col-xl-3 mt-5 p-2 me-5">
                <label className="mb-3">Customer Name:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-xl-3 mt-5">
                <label htmlFor="">Services:</label>
                <div class="input-group mb-3">
                  <select className="form-select mt-4" id="inputGroupSelect01">
                    <option selected>Select Services</option>
                    <option value="1">Hair Cut</option>
                    <option value="2">Fade Haircut</option>
                    <option value="3">Curls</option>
                    <option value="4">Hair Color</option>
                    <option value="5">Espresso</option>
                    <option value="6">Sunflower Blonde</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-3 mt-3 p-2 me-5">
                <label htmlFor="">Status:</label>
                <div class="input-group mb-3">
                  <select className="form-select mt-4" id="inputGroupSelect01">
                    <option selected>Select Status</option>
                    <option value="1">All</option>
                    <option value="2">Approved</option>
                    <option value="3">Pending</option>
                    <option value="4">Cancelled</option>
                    <option value="5">Rejected</option>
                    <option value="6">Completed</option>
                  </select>
                </div>
              </div>
              {/* search */}
              <div className="row">
                <div className="col-xl-6">
                  <form class="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-success" type="submit">
                      Apply
                    </button>
                  </form>
                </div>
                <div className="col-xl-2">
                  <button className="btn btn-outline-dark" type="submit">
                    Reset
                  </button>
                </div>
                <div className="col-xl-2 text-end">
                  <button className="btn btn-warning" type="submit">
                    Export
                  </button>
                </div>
              </div>
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
    </>
  );
}


// <div className="col-xl-2">
//             <button
//               className="btn btn-warning mt-2"
//               type="button"
//               onClick={toggleSidebar}
//             >
//               Menu
//             </button>

           
//             <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//               <div className="sidebar-header">
//                 <h5>Dashboard</h5>
//                 <button className="close-btn" onClick={toggleSidebar}>
//                   &times;
//                 </button>
//               </div>
//               <div className="sidebar-body">
//                 <ul className="nav n">
//                   <li className="nav-item n-t">
//                     <Link className="nav-link n-l" to="/staff/staff-dashboard">
//                       Dashboard
//                     </Link>
//                   </li>
//                   <li className="nav-item n-t">
//                     <Link className="nav-link n-l" to="/staff/staff-appointments">
//                       Appointments
//                     </Link>
//                   </li>
//                   <li className="nav-item n-t">
//                     <Link className="nav-link n-l" to="/staff/staff-customer">
//                       Customer
//                     </Link>
//                   </li>
//                   <li className="nav-item n-t">
//                     <Link className="nav-link n-l" to="/staff/staff-payment">
//                       Payment
//                     </Link>
//                   </li>
//                   <li className="nav-item n-t">
//                     <Link className="nav-link n-l" to="/staff/staff-profile">
//                       My Profile
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>