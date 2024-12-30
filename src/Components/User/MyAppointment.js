import React, { useState } from "react";
import "./UserCss/MyAppointment.css";

export default function MyAppointment() {
  const [step, setStep] = useState(1);
  const [appointment, setAppointment] = useState({
    service: "",
    stylist: "",
    date: "",
    time: "",
    notes: "",
  });

  const services = [
    { id: 1, name: "Haircut", price: 30, duration: "30 min" },
    { id: 2, name: "Hair Coloring", price: 80, duration: "2 hrs" },
    { id: 3, name: "Facial", price: 50, duration: "45 min" },
    { id: 4, name: "Manicure", price: 25, duration: "30 min" },
    { id: 5, name: "Pedicure", price: 35, duration: "45 min" },
  ];

  const stylists = [
    { id: 1, name: "Suresh", speciality: "Hair Styling" },
    { id: 2, name: "Rajesh", speciality: "Color Expert" },
    { id: 3, name: "Sara", speciality: "Skincare" },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleServiceSelect = (service) => {
    setAppointment((prev) => ({ ...prev, service }));
    setStep(2);
  };

  const handleStylistSelect = (stylist) => {
    setAppointment((prev) => ({ ...prev, stylist }));
    setStep(3);
  };

  const handleDateTimeSelect = (date, time) => {
    setAppointment((prev) => ({ ...prev, date, time }));
    setStep(4);
  };

  const handlePayment = () => {
    // Integrate with payment gateway
    console.log("Processing payment for:", appointment);
  };

  return (
    <div className="appointment-container">
      <div className="booking-progress">
        <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
          1. Select Service
        </div>
        <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
          2. Choose Stylist
        </div>
        <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
          3. Pick Date & Time
        </div>
        <div className={`progress-step ${step >= 4 ? "active" : ""}`}>
          4. Payment
        </div>
      </div>

      {step === 1 && (
        <div className="service-selection">
          <h2>Select a Service</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card"
                onClick={() => handleServiceSelect(service)}
              >
                <h3>{service.name}</h3>
                <p className="price">${service.price}</p>
                <p className="duration">{service.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="stylist-selection">
          <h2>Choose Your Stylist</h2>
          <div className="stylists-grid">
            {stylists.map((stylist) => (
              <div
                key={stylist.id}
                className="stylist-card"
                onClick={() => handleStylistSelect(stylist)}
              >
                <div className="stylist-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <h3>{stylist.name}</h3>
                <p>{stylist.speciality}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="datetime-selection">
          <h2>Select Date & Time</h2>
          <div className="calendar-container">
            <input
              type="date"
              onChange={(e) =>
                setAppointment((prev) => ({ ...prev, date: e.target.value }))
              }
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="time-slots">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`time-slot ${
                  appointment.time === time ? "selected" : ""
                }`}
                onClick={() => handleDateTimeSelect(appointment.date, time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="payment-section">
          <h2>Confirm & Pay</h2>
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-details">
              <p>
                <strong>Service:</strong> {appointment.service.name}
              </p>
              <p>
                <strong>Stylist:</strong> {appointment.stylist.name}
              </p>
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Total Amount:</strong> ${appointment.service.price}
              </p>
            </div>
            <button className="pay-button" onClick={handlePayment}>
              Pay Now ${appointment.service.price}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
