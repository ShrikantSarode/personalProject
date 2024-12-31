import React, { useState, useEffect } from "react";
import "./AssignServices.css";

export default function AssignServices() {
  const [services, setServices] = useState([
    { id: 1, name: "Haircut", duration: "30 min", price: "₹500" },
    { id: 2, name: "Facial", duration: "60 min", price: "₹1500" },
    { id: 3, name: "Manicure", duration: "45 min", price: "₹800" },
  ]);

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Rajesh",
      expertise: ["Hair Styling", "Hair Coloring"],
    },
    {
      id: 2,
      name: "Suresh",
      expertise: ["Facials", "Skin Treatments"],
    },
    {
      id: 3,
      name: "Priya",
      expertise: ["Manicure", "Pedicure"],
    },
    {
      id: 4,
      name: "Anjali",
      expertise: ["Makeup", "Bridal Makeup"],
    },
    {
      id: 5,
      name: "Vikram",
      expertise: ["Massage Therapy", "Aromatherapy"],
    },
    {
      id: 6,
      name: "Karan",
      expertise: ["Hair Cutting", "Beard Grooming"],
    },
    {
      id: 7,
      name: "Neha",
      expertise: ["Nail Art", "Waxing"],
    },
  ]);

  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message) => {
    setToast({ show: true, message });
  };

  const handleServiceAssignment = (e) => {
    e.preventDefault();

    if (!selectedStaff) {
      showToast("Please select a staff member!");
      return;
    }

    if (selectedServices.length === 0) {
      showToast("Please select at least one service to assign!");
      return;
    }

    setStaff((prevStaff) =>
      prevStaff.map((member) =>
        member.id === parseInt(selectedStaff)
          ? {
              ...member,
              expertise: [
                ...new Set([
                  ...member.expertise,
                  ...selectedServices.map(
                    (id) => services.find((s) => s.id === id).name
                  ),
                ]),
              ],
            }
          : member
      )
    );

    setSelectedStaff("");
    setSelectedServices([]);
    showToast("Services assigned successfully!");
  };

  const handleServiceRemoval = (staffId, serviceName) => {
    setStaff((prevStaff) =>
      prevStaff.map((member) =>
        member.id === staffId
          ? {
              ...member,
              expertise: member.expertise.filter(
                (service) => service !== serviceName
              ),
            }
          : member
      )
    );
    showToast(`Service "${serviceName}" removed from staff member.`);
  };

  return (
    <div className="assign-services-container">
      {toast.show && <div className="toast">{toast.message}</div>}
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
                <td>
                  {member.expertise.length > 0
                    ? member.expertise.map((service, index) => (
                        <div key={index} className="service-entry">
                          {service}{" "}
                          <button
                            onClick={() =>
                              handleServiceRemoval(member.id, service)
                            }
                            className="remove-service-button"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    : "No services assigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
