import React, { useState } from "react";

const WeatherSearch = ({ onLocationChange }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=12.9767936&lon=77.590082&appid=a62d54c0bcce4b41711cff667c211021`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.coord) {
          onLocationChange(data.coord.lat, data.coord.lon);
          setError(null);
        } else {
          setError("Location not found");
        }
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="weather-search">
      <input
        type="text"
        placeholder="Enter location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default WeatherSearch;
