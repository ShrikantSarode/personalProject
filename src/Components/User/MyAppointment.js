import React, { useState, useEffect } from "react";
import "./UserCss/MyAppointment.css";

export default function MyAppointment() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [availableStylists, setAvailableStylists] = useState([]);

  const [appointment, setAppointment] = useState({
    services: [],
    stylist: "",
    date: "",
    time: "",
    notes: "",
  });

  const services = [
    { id: 1, name: "Haircut", price: 100, duration: 30 },
    { id: 2, name: "Hair Coloring", price: 180, duration: 120 },
    { id: 3, name: "Facial", price: 250, duration: 45 },
    { id: 4, name: "Manicure", price: 250, duration: 30 },
    { id: 5, name: "Pedicure", price: 350, duration: 45 },
    { id: 6, name: "Bridal Makeup", price: 1220, duration: 180 },
    { id: 7, name: "Nail Art", price: 1160, duration: 60 },
  ];

  const stylists = [
    {
      id: 1,
      name: "Suresh",
      speciality: "Hair Styling",
      services: [1, 2],
      availability: {
        "2024-12-31": ["09:00 AM", "10:00 AM", "11:00 AM"],
        "2025-01-01": ["02:00 PM", "03:00 PM", "04:00 PM"],
        "2025-01-02": ["09:00 AM", "01:00 PM", "05:00 PM"],
        "2025-01-03": ["10:00 AM", "12:00 PM", "02:00 PM"],
        "2025-01-04": ["08:00 AM", "11:00 AM", "03:00 PM"],
      },
    },
    {
      id: 2,
      name: "Rajesh",
      speciality: "Color Expert",
      services: [1, 2, 3],
      availability: {
        "2024-12-31": ["09:00 AM", "02:00 PM", "03:00 PM"],
        "2025-01-01": ["10:00 AM", "11:00 AM", "04:00 PM"],
        "2025-02-02": ["08:00 AM", "12:00 PM", "02:00 PM"],
        "2025-03-03": ["09:00 AM", "11:00 AM", "01:00 PM"],
        "2025-04-04": ["10:00 AM", "01:00 PM", "03:00 PM"],
      },
    },
    {
      id: 3,
      name: "Sara",
      speciality: "Skincare",
      services: [3, 4, 5],
      availability: {
        "2024-12-31": ["11:00 AM", "02:00 PM", "05:00 PM"],
        "2025-01-01": ["09:00 AM", "03:00 PM", "04:00 PM"],
        "2025-01-02": ["10:00 AM", "01:00 PM", "03:00 PM"],
        "2025-01-03": ["08:00 AM", "12:00 PM", "04:00 PM"],
        "2025-01-04": ["09:00 AM", "11:00 AM", "02:00 PM"],
      },
    },
    {
      id: 4,
      name: "Aisha",
      speciality: "Makeup Artist",
      services: [4, 5, 6],
      availability: {
        "2024-12-31": ["08:00 AM", "11:00 AM", "01:00 PM"],
        "2025-01-01": ["10:00 AM", "12:00 PM", "03:00 PM"],
        "2025-01-02": ["09:00 AM", "02:00 PM", "04:00 PM"],
        "2025-01-03": ["07:00 AM", "10:00 AM", "01:00 PM"],
        "2025-01-04": ["08:00 AM", "12:00 PM", "03:00 PM"],
      },
    },
    {
      id: 5,
      name: "Vikram",
      speciality: "Nail Artist",
      services: [5, 6, 7],
      availability: {
        "2024-12-31": ["07:00 AM", "09:00 AM", "11:00 AM"],
        "2025-01-01": ["01:00 PM", "03:00 PM", "05:00 PM"],
        "2025-01-02": ["08:00 AM", "12:00 PM", "03:00 PM"],
        "2025-01-03": ["06:00 AM", "10:00 AM", "02:00 PM"],
        "2025-01-04": ["07:00 AM", "09:00 AM", "04:00 PM"],
      },
    },
    {
      id: 6,
      name: "Anjali",
      speciality: "Bridal Specialist",
      services: [2, 4, 6],
      availability: {
        "2024-12-31": ["10:00 AM", "01:00 PM", "03:00 PM"],
        "2025-01-01": ["09:00 AM", "11:00 AM", "02:00 PM"],
        "2025-01-02": ["11:00 AM", "02:00 PM", "05:00 PM"],
        "2025-01-03": ["08:00 AM", "12:00 PM", "03:00 PM"],
        "2025-01-04": ["09:00 AM", "01:00 PM", "04:00 PM"],
      },
    },
    {
      id: 6,
      name: "Anjali",
      speciality: "All Specialist",
      services: [1, 2, 3, 4, 5, 6, 7],
      availability: {
        "2024-12-31": ["10:00 AM", "01:00 PM", "03:00 PM"],
        "2025-01-01": ["09:00 AM", "11:00 AM", "02:00 PM"],
        "2025-01-02": ["11:00 AM", "02:00 PM", "05:00 PM"],
        "2025-01-03": ["08:00 AM", "12:00 PM", "03:00 PM"],
        "2025-01-04": ["09:00 AM", "01:00 PM", "04:00 PM"],
      },
    },
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

  useEffect(() => {
    // Calculate total amount and duration whenever selected services change
    const amount = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );
    const duration = selectedServices.reduce(
      (sum, service) => sum + service.duration,
      0
    );
    setTotalAmount(amount);
    setTotalDuration(duration);
  }, [selectedServices]);

  const handleServiceSelect = (service) => {
    const isSelected = selectedServices.find((s) => s.id === service.id);
    if (isSelected) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const proceedToStylistSelection = () => {
    if (selectedServices.length > 0) {
      // Filter stylists who can perform all selected services
      const selectedServiceIds = selectedServices.map((service) => service.id);
      const eligible = stylists.filter((stylist) =>
        selectedServiceIds.every((serviceId) =>
          stylist.services.includes(serviceId)
        )
      );
      setAvailableStylists(eligible);
      setAppointment((prev) => ({ ...prev, services: selectedServices }));
      setStep(2);
    }
  };

  const handleStylistSelect = (stylist) => {
    setAppointment((prev) => ({ ...prev, stylist }));
    setStep(3);
  };

  const handleDateTimeSelect = (date, time) => {
    setAppointment((prev) => ({ ...prev, date, time }));
    setStep(4);
  };

  const isTimeSlotAvailable = (time) => {
    if (!appointment.stylist || !appointment.date) return false;
    return appointment.stylist.availability[appointment.date]?.includes(time);
  };

  return (
    <div className="appointment-container ">
      {/* Progress Bar - Same as before */}

      {step === 1 && (
        <div className="service-selection text-center">
          <h2>Select Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-card ${
                  selectedServices.find((s) => s.id === service.id)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                <h5>{service.name}</h5>
                <p className="price">₹{service.price}</p>
                <p className="duration">{service.duration} min</p>
              </div>
            ))}
          </div>
          <div className="service-summary ">
            <p>Total Amount: ₹{totalAmount}</p>
            <p>Total Duration: {totalDuration} min</p>
            <button
              className="proceed-button"
              disabled={selectedServices.length === 0}
              onClick={proceedToStylistSelection}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="stylist-selection">
          <h2>Available Stylists</h2>
          <div className="stylists-grid">
            {availableStylists.map((stylist) => (
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

          {/* Date Selection */}
          <div className="calendar-container">
            <input
              type="date"
              onChange={(e) =>
                setAppointment((prev) => ({
                  ...prev,
                  date: e.target.value,
                  time: "", // Reset time when date is changed
                }))
              }
              min={new Date().toISOString().split("T")[0]}
              value={appointment.date} // Make sure the date input is controlled
            />
          </div>

          {/* Time Slot Buttons */}
          <div className="time-slots">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`time-slot ${
                  appointment.time === time ? "selected" : ""
                } ${!isTimeSlotAvailable(time) ? "unavailable" : ""}`}
                disabled={!isTimeSlotAvailable(time)}
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
                <strong>Services:</strong>
              </p>
              {appointment.services.map((service) => (
                <p key={service.id}>
                  - {service.name} (₹{service.price})
                </p>
              ))}
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
                <strong>Total Amount:</strong> ₹{totalAmount}
              </p>
              <p>
                <strong>Total Duration:</strong> {totalDuration} min
              </p>
            </div>
            <button className="pay-button">Pay Now ₹{totalAmount}</button>
          </div>
        </div>
      )}
    </div>
  );
}
