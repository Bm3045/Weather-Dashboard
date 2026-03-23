import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';

const HistoricalChart = ({ data, type, title }) => {
  const getChartComponent = () => {
    switch(type) {
      case 'temperature':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="maxTemp" stroke="#FF6B6B" name="Max Temperature (°C)" strokeWidth={2} />
            <Line type="monotone" dataKey="meanTemp" stroke="#4ECDC4" name="Mean Temperature (°C)" strokeWidth={2} />
            <Line type="monotone" dataKey="minTemp" stroke="#45B7D1" name="Min Temperature (°C)" strokeWidth={2} />
          </LineChart>
        );
      case 'sunCycle':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Time (IST)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sunrise" stroke="#FFEAA7" name="Sunrise (IST)" strokeWidth={2} />
            <Line type="monotone" dataKey="sunset" stroke="#FFA07A" name="Sunset (IST)" strokeWidth={2} />
          </LineChart>
        );
      case 'precipitation':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Precipitation (mm)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="precipitation" fill="#45B7D1" name="Precipitation (mm)" />
          </BarChart>
        );
      case 'wind':
        return (
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" label={{ value: 'Wind Speed (km/h)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Wind Direction (°)', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="maxWindSpeed" fill="#FFEAA7" name="Max Wind Speed (km/h)" />
            <Line yAxisId="right" type="monotone" dataKey="windDirection" stroke="#FF6B6B" name="Wind Direction (°)" strokeWidth={2} />
          </ComposedChart>
        );
      case 'airQuality':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Concentration (µg/m³)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pm10" stroke="#DDA0DD" name="PM10" strokeWidth={2} />
            <Line type="monotone" dataKey="pm25" stroke="#98D8C8" name="PM2.5" strokeWidth={2} />
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ marginBottom: '30px', backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '15px', color: '#333' }}>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        {getChartComponent()}
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;