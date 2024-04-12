import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherSearch from "./components/WeatherSearch";
import "./index.css";

const API_KEY = "a62d54c0bcce4b41711cff667c211021";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=12.9767936&lon=77.590082&appid=a62d54c0bcce4b41711cff667c211021`
      );

      const data = await response.json();
      setWeatherData(data);
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (lat, lon) => {
    setLocation({ lat, lon });
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <WeatherSearch onLocationChange={handleLocationChange} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default App;
