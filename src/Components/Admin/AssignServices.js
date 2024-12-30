import React, { useState } from "react";
import "./AssignServices.css";

export default function AssignServices() {
  const [services, setServices] = useState([
    { id: 1, name: "Haircut", duration: "30 min", price: "₹500" },
    { id: 2, name: "Facial", duration: "60 min", price: "₹1500" },
    { id: 3, name: "Manicure", duration: "45 min", price: "₹800" },
  ]);

  const [staff] = useState([
    { id: 1, name: "Rajesh", expertise: ["Haircut", "Facial"] },
    { id: 2, name: "Suresh", expertise: ["Manicure", "Facial"] },
  ]);

  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceAssignment = (e) => {
    e.preventDefault();
    // Add your API call here to save the assignments
    console.log({
      staffId: selectedStaff,
      assignedServices: selectedServices,
    });
  };

  return (
    <div className="assign-services-container">
      <h2>Assign Services to Staff</h2>

      <form onSubmit={handleServiceAssignment} className="assignment-form">
        <div className="form-group">
          <label>Select Staff Member:</label>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="form-select"
          >
            <option value="">Choose staff member...</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <input
                type="checkbox"
                id={`service-${service.id}`}
                value={service.id}
                checked={selectedServices.includes(service.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedServices([...selectedServices, service.id]);
                  } else {
                    setSelectedServices(
                      selectedServices.filter((id) => id !== service.id)
                    );
                  }
                }}
              />
              <label
                htmlFor={`service-${service.id}`}
                className="service-label"
              >
                <h3>{service.name}</h3>
                <p>Duration: {service.duration}</p>
                <p>Price: {service.price}</p>
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="assign-button">
          Assign Services
        </button>
      </form>

      <div className="current-assignments">
        <h3>Current Assignments</h3>
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Staff Member</th>
              <th>Assigned Services</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.expertise.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
