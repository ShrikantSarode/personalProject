import React, { useState } from "react";
import "../User/UserCss/UserProfile.css";

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    photo: null,
    favoriteServices: [],
  });

  const salonServices = [
    "Haircut",
    "Hair Coloring",
    "Manicure",
    "Pedicure",
    "Facial",
    "Massage",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setUserDetails((prev) => ({
      ...prev,
      photo: URL.createObjectURL(file),
    }));
  };

  const handleServiceToggle = (service) => {
    setUserDetails((prev) => {
      const services = prev.favoriteServices.includes(service)
        ? prev.favoriteServices.filter((s) => s !== service)
        : [...prev.favoriteServices, service];
      return { ...prev, favoriteServices: services };
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Add delete account logic here
      console.log("Account deleted");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Details:", userDetails);
  };

  return (
    <div className="user-profile mt-5 d-flex justify-content-center">
      {/* <h2>User Profile</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="profile-photo">
          {userDetails.photo && (
            <img src={userDetails.photo} alt="Profile Preview" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            id="photo"
          />
          <label htmlFor="photo">Upload Photo</label>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={userDetails.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group ">
          <label>Favorite Salon Services:</label>
          <div className="services-grid text-center">
            {salonServices.map((service) => (
              <label key={service} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={userDetails.favoriteServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="save-button">
            Save Profile
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}
