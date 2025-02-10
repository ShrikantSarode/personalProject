import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig/axiosConfig"; // Import the Axios instance
import "./StaffManagement.css";

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    // Fetch the existing staff list from the backend
    axiosInstance.get("/admin/staff")
      .then(response => {
        setStaffList(response.data);
        console.log(response.data);
        
      })
      .catch(error => {
        console.error("There was an error fetching the staff list!", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  // add staff
  const handleAddStaff = (e) => {
    e.preventDefault();
    if (newStaff.name && newStaff.email && newStaff.role) {
      axiosInstance.post("/admin/staff", newStaff)
        .then(response => {
          setStaffList((prev) => [...prev, response.data]);
          setNewStaff({ name: "", email: "", role: "" });
        })
        .catch(error => {
          console.error("There was an error adding the staff member!", error);
        });
    }
  };

  const handleRemoveStaff = (id) => {
    axiosInstance.delete(`/admin/staff/${id}`)
      .then(() => {
        setStaffList((prev) => prev.filter((staff) => staff.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the staff member!", error);
      });
  };

  return (
    <div className="staff-management-container">
      <h2 className="main-title">Staff Management</h2>

      <div className="staff-grid">
        <div className="staff-list-section">
          <h3 className="section-title">Staff List</h3>
          {staffList.length > 0 ? (
            <div className="staff-cards">
              {staffList.map((staff) => (
                <div key={staff.id} className="staff-card">
                  <div className="staff-avatar">
                    {staff.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="staff-info">
                    <h4>{staff.name}</h4>
                    <p className="staff-role">{staff.position}</p>
                    <p className="staff-email">{staff.email}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveStaff(staff.id)}
                  >
                    <i className="fas fa-trash">X</i>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-users"></i>
              <p>No staff members added yet</p>
            </div>
          )}
        </div>

        <div className="add-staff-section">
          <h3 className="section-title">Add New Staff</h3>
          <form onSubmit={handleAddStaff} className="add-staff-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={newStaff.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={newStaff.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Mobile Number"
                value={newStaff.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <select
                name="role"
                value={newStaff.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Designation</option>
                <option value="Manager">Manager</option>
                <option value="Stylist">Stylist</option>
                <option value="Assistant">Assistant</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>
            <button type="submit" className="add-btn">
              <i className="fas fa-plus"></i> Add Staff Member
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
