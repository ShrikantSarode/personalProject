import React, { useState } from "react";
import "./css/AppointmentStaff.css";

export default function AppointmentStaff() {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2024-12-01",
      time: "10:00",
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
      time: "14:00",
      customer: "James Bond",
      service: "Facial",
      duration: "1 hour",
      status: "Pending",
      payment: "Pending",
      createdDate: "2024-11-26",
    },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    customer: "",
    service: "",
    duration: "",
    status: "",
    payment: "",
  });

  const handleEdit = (appointment) => {
    setIsEditing(true);
    setEditingId(appointment.id);
    setFormData({
      date: appointment.date,
      time: appointment.time,
      customer: appointment.customer,
      service: appointment.service,
      duration: appointment.duration,
      status: appointment.status,
      payment: appointment.payment,
    });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === editingId
            ? { ...appointment, ...formData }
            : appointment
        )
      );
    } else {
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
        createdDate: new Date().toISOString().split("T")[0],
      };
      setAppointments([...appointments, newAppointment]);
    }

    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      date: "",
      time: "",
      customer: "",
      service: "",
      duration: "",
      status: "",
      payment: "",
    });
  };

  return (
    <div className="container-fluid px-4">
      <div className="row">
        <div className="col-12 mt-3">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-dark">Hi, Shrikant</h2>
            <button className="btn btn-outline-warning">Logout</button>
          </div>

          {/* Title and Add Button */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Manage Appointments</h4>
            <button className="btn btn-success" onClick={() => setShowForm(true)}>
              + Add New
            </button>
          </div>

          {/* Appointment Cards */}
          <div className="row mt-4">
            {appointments.map((appointment) => (
              <div className="col-md-6 col-lg-4 mb-4" key={appointment.id}>
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="card-title">Appointment #{appointment.id}</h5>
                  </div>
                  <div className="card-body">
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Customer:</strong> {appointment.customer}</p>
                    <p><strong>Service:</strong> {appointment.service}</p>
                    <p><strong>Duration:</strong> {appointment.duration}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          appointment.status === "Completed"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      <span
                        className={`badge ${
                          appointment.payment === "Paid"
                            ? "bg-primary"
                            : "bg-danger"
                        }`}
                      >
                        {appointment.payment}
                      </span>
                    </p>
                  </div>
                  <div className="card-footer text-end">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(appointment)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="modal-overlay">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>{isEditing ? "Edit Appointment" : "New Appointment"}</h5>
                    <button
                      className="btn-close"
                      onClick={() => {
                        setShowForm(false);
                        setIsEditing(false);
                        setEditingId(null);
                      }}
                    ></button>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Customer Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="customer"
                          value={formData.customer}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Time</label>
                        <input
                          type="time"
                          className="form-control"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Service</label>
                        <select
                          className="form-select"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Service</option>
                          <option value="Haircut">Hair Cut</option>
                          <option value="Fade Haircut">Fade Haircut</option>
                          <option value="Curls">Curls</option>
                          <option value="Hair Color">Hair Color</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Duration</label>
                        <select
                          className="form-select"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Duration</option>
                          <option value="30 minutes">30 minutes</option>
                          <option value="1 hour">1 hour</option>
                          <option value="1.5 hours">1.5 hours</option>
                        </select>
                      </div>
                      {isEditing && (
                        <>
                          <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                              className="form-select"
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Payment</label>
                            <select
                              className="form-select"
                              name="payment"
                              value={formData.payment}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select Payment Status</option>
                              <option value="Paid">Paid</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowForm(false);
                          setIsEditing(false);
                          setEditingId(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {isEditing ? "Update" : "Save"} Appointment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
