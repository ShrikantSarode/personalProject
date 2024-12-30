import React, { useState } from "react";
import "./AppointmentManagement.css";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customerName: "Om Shirudkar",
      service: "Haircut",
      date: "2024-02-15",
      time: "10:00",
      status: "confirmed",
      stylist: "Rajesh Kadam",
    },
    {
      id: 2,
      customerName: "Kiran Kalas",
      service: "Facial",
      date: "2024-02-16",
      time: "14:30",
      status: "pending",
      stylist: "Santosh Yadhav",
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    customerName: "",
    service: "",
    date: "",
    time: "",
    stylist: "",
  });

  const services = [
    "Haircut",
    "Facial",
    "Manicure",
    "Pedicure",
    "Hair Coloring",
  ];
  const stylists = [
    "Sara Rajput",
    "Suresh Jadhav",
    "Rajesh Kadam",
    "Santosh Yadav",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointments((prev) => [
      ...prev,
      {
        ...newAppointment,
        id: Date.now(),
        status: "pending",
      },
    ]);
    setNewAppointment({
      customerName: "",
      service: "",
      date: "",
      time: "",
      stylist: "",
    });
  };

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  return (
    <div className="appointment-management">
      <h2 className="main-title">Appointment Management</h2>

      <div className="appointment-grid">
        <div className="appointments-list">
          <h3 className="section-title">Current Appointments</h3>
          <div className="appointment-cards">
            {appointments.map((apt) => (
              <div key={apt.id} className={`appointment-card ${apt.status}`}>
                <div className="appointment-header">
                  <h4>{apt.customerName}</h4>
                  <span className={`status-badge ${apt.status}`}>
                    {apt.status}
                  </span>
                </div>
                <div className="appointment-details">
                  <p>
                    <i className="fas fa-cut"></i> {apt.service}
                  </p>
                  <p>
                    <i className="fas fa-calendar"></i> {apt.date}
                  </p>
                  <p>
                    <i className="fas fa-clock"></i> {apt.time}
                  </p>
                  <p>
                    <i className="fas fa-user"></i> {apt.stylist}
                  </p>
                </div>
                <div className="appointment-actions">
                  <button
                    onClick={() => updateStatus(apt.id, "confirmed")}
                    className="confirm-btn"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(apt.id, "cancelled")}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="new-appointment">
          <h3 className="section-title">Schedule New Appointment</h3>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={newAppointment.customerName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <select
                name="service"
                value={newAppointment.service}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <select
                name="stylist"
                value={newAppointment.stylist}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Stylist</option>
                {stylists.map((stylist) => (
                  <option key={stylist} value={stylist}>
                    {stylist}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              <i className="fas fa-calendar-plus"></i> Schedule Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
