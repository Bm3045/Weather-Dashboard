import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Graph from './Graph';
import './HourlyGraphs.css';

const HourlyGraphs = ({ data, date }) => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    if (data && data.hourly) {
      const processedData = data.hourly.time.map((time, index) => ({
        time: new Date(time).toLocaleTimeString([], { hour: '2-digit' }),
        temperature: data.hourly.temperature_2m?.[index],
        humidity: data.hourly.relative_humidity_2m?.[index],
        precipitation: data.hourly.precipitation?.[index],
        visibility: data.hourly.visibility?.[index] / 1000, // Convert to km
        windSpeed: data.hourly.wind_speed_10m?.[index],
        pm10: data.hourly.pm10?.[index],
        pm25: data.hourly.pm2_5?.[index]
      }));
      setHourlyData(processedData);
    }
  }, [data]);

  const graphs = [
    { type: 'temperature', title: 'Temperature Throughout the Day', unit: '°C' },
    { type: 'humidity', title: 'Relative Humidity', unit: '%' },
    { type: 'precipitation', title: 'Precipitation', unit: 'mm' },
    { type: 'visibility', title: 'Visibility', unit: 'km' },
    { type: 'wind', title: 'Wind Speed', unit: 'km/h' }
  ];

  return (
    <div className="hourly-graphs">
      <h2>Hourly Data for {date ? new Date(date).toLocaleDateString() : 'Today'}</h2>
      <div className="graphs-container">
        {graphs.map(graph => (
          <Graph
            key={graph.type}
            data={hourlyData}
            type={graph.type}
            title={graph.title}
            unit={graph.unit}
          />
        ))}
        
        {/* PM10 & PM2.5 Combined Graph */}
        <div className="graph-container">
          <h3>PM10 & PM2.5 Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit="µg/m³" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pm10" stroke="#DDA0DD" name="PM10" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="pm25" stroke="#98D8C8" name="PM2.5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HourlyGraphs;