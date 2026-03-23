import React, { useState } from 'react';
import { celsiusToFahrenheit } from '../../utils/helpers';
import './CurrentWeather.css';

const WeatherCard = ({ data, airQuality }) => {
  const [unit, setUnit] = useState('C');
  
  const getTemperature = (temp) => {
    if (!temp && temp !== 0) return 'N/A';
    const value = unit === 'C' ? temp : celsiusToFahrenheit(temp);
    return Math.round(value);
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>Current Weather</h2>
        <button onClick={toggleUnit} className="unit-toggle">
          °{unit}
        </button>
      </div>
      
      <div className="weather-grid">
        <div className="weather-item">
          <label>Temperature</label>
          <span>
            {getTemperature(data?.current?.temperature_2m)}°{unit}
          </span>
          <small>
            Min: {getTemperature(data?.daily?.temperature_2m_min?.[0])}°{unit} | 
            Max: {getTemperature(data?.daily?.temperature_2m_max?.[0])}°{unit}
          </small>
        </div>
        
        <div className="weather-item">
          <label>Precipitation</label>
          <span>{data?.current?.precipitation ?? 'N/A'} mm</span>
        </div>
        
        <div className="weather-item">
          <label>Sunrise / Sunset</label>
          <span>
            {formatTime(data?.daily?.sunrise?.[0])} / {formatTime(data?.daily?.sunset?.[0])}
          </span>
        </div>
        
        <div className="weather-item">
          <label>Max Wind Speed</label>
          <span>{data?.daily?.wind_speed_10m_max?.[0] ?? 'N/A'} km/h</span>
        </div>
        
        <div className="weather-item">
          <label>Relative Humidity</label>
          <span>{data?.current?.relative_humidity_2m ?? 'N/A'}%</span>
        </div>
        
        <div className="weather-item">
          <label>UV Index</label>
          <span>{data?.current?.uv_index ?? 'N/A'}</span>
        </div>
        
        <div className="weather-item">
          <label>Air Quality</label>
          <span>PM10: {airQuality?.current?.pm10 ?? 'N/A'} | PM2.5: {airQuality?.current?.pm2_5 ?? 'N/A'}</span>
          <small>
            CO: {airQuality?.current?.carbon_monoxide ?? 'N/A'} | 
            NO2: {airQuality?.current?.nitrogen_dioxide ?? 'N/A'} | 
            SO2: {airQuality?.current?.sulphur_dioxide ?? 'N/A'}
          </small>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;