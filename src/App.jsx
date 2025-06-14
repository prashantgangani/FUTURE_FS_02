import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "8d911175c47a80b97851b5db0a081d1f";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = async (event) => {
    if (event.key === "Enter" && location.trim() !== "") {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLocation("");
      } catch (error) {
        setError(error.response?.data?.message || "City not found. Please try again.");
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="weather-container">
      <div className="search-container">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter city name..."
          onKeyDown={searchLocation}
          className="search-input"
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-white mb-4">
          Loading...
        </div>
      )}

      {data && (
        <>
          <div className="city-name">
            {data.name}, {data.sys.country}
          </div>

          {data.main && (
            <>
              <div className="temperature">
                {Math.round(data.main.temp)}°C
              </div>

              <div className="description">
                {data.weather[0].description}
              </div>

              <div className="weather-details">
                <div className="weather-card">
                  <p>{Math.round(data.main.feels_like)}°C</p>
                  <p>Feels Like</p>
                </div>

                <div className="weather-card">
                  <p>{data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>

                <div className="weather-card">
                  <p>{Math.round(data.wind.speed * 1.60934)} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
