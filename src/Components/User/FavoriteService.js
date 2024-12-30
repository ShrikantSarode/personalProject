import React, { useState } from "react";
import "../User/UserCss/FavoriteService.css";

export default function FavoriteService() {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const allServices = [
    {
      id: 1,
      name: "Hair Styling",
      // image: "/images/hair-styling.jpg",
      price: "$50",
      duration: "45 mins",
    },
    {
      id: 2,
      name: "Facial Treatment",
      // image: "/images/facial.jpg",
      price: "$75",
      duration: "60 mins",
    },
    {
      id: 3,
      name: "Manicure",
      // image: "/images/manicure.jpg",
      price: "$35",
      duration: "30 mins",
    },
    {
      id: 4,
      name: "Pedicure",
      // image: "/images/pedicure.jpg",
      price: "$40",
      duration: "45 mins",
    },
    {
      id: 5,
      name: "Massage",
      // image: "/images/massage.jpg",
      price: "$90",
      duration: "60 mins",
    },
  ];

  const toggleFavorite = (service) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (fav) => fav.id === service.id
      );
      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== service.id);
      }
      return [...prevFavorites, service];
    });
  };

  const filteredServices = allServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="favorite-services-container text-center ">
      <div className="services-header ">
        <h2>Salon Services</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="services-grid d-flex justify-content-around">
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-image">
              {/* <img src={service.image} alt={service.name} /> */}
              <button
                className={`favorite-button ${
                  favorites.some((fav) => fav.id === service.id) ? "active" : ""
                }`}
                onClick={() => toggleFavorite(service)}
              >
                ♥
              </button>
            </div>
            <div className="service-info">
              <h3>{service.name}</h3>
              <p className="price">{service.price}</p>
              <p className="duration">{service.duration}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="favorites-section">
        <h3>Your Favorite Services</h3>
        <div className="favorites-grid">
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <div key={favorite.id} className="favorite-item">
                {/* <img src={favorite.image} alt={favorite.name} /> */}
                <div className="favorite-info">
                  <h4>{favorite.name}</h4>
                  <p>{favorite.price}</p>
                </div>
                <button
                  className="remove-favorite"
                  onClick={() => toggleFavorite(favorite)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No favorites added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
