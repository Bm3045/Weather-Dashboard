import React, { useState, useEffect, useCallback } from 'react';
import HistoricalChart from './HistoricalChart';
import DatePicker from '../Common/DatePicker';
import weatherService from '../../services/weatherService';
import { DATE_RANGE_LIMIT } from '../../utils/constants';
import { formatTime } from '../../utils/helpers';
import './Historical.css';

const Historical = ({ lat, lon }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistoricalData = useCallback(async () => {
    if (!startDate || !endDate || !lat || !lon) return;
    
    setLoading(true);
    try {
      const response = await weatherService.getHistoricalWeather(lat, lon, startDate, endDate);
      
      const processedData = response.daily.time.map((date, index) => ({
        date: new Date(date).toLocaleDateString(),
        maxTemp: response.daily.temperature_2m_max?.[index],
        minTemp: response.daily.temperature_2m_min?.[index],
        meanTemp: response.daily.temperature_2m_mean?.[index],
        sunrise: formatTime(response.daily.sunrise?.[index]),
        sunset: formatTime(response.daily.sunset?.[index]),
        precipitation: response.daily.precipitation_sum?.[index],
        maxWindSpeed: response.daily.wind_speed_10m_max?.[index],
        windDirection: response.daily.wind_direction_10m_dominant?.[index],
        pm10: response.daily.pm10?.[index],
        pm25: response.daily.pm2_5?.[index]
      }));
      
      setData(processedData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [lat, lon, startDate, endDate]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  const handleDateRangeChange = (start, end) => {
    const diffDays = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
    if (diffDays > DATE_RANGE_LIMIT) {
      alert(`Date range cannot exceed ${DATE_RANGE_LIMIT} days (2 years)`);
      return;
    }
    setStartDate(start);
    setEndDate(end);
  };

  const charts = [
    { type: 'temperature', title: 'Temperature Trends (Mean, Max, Min)' },
    { type: 'sunCycle', title: 'Sunrise & Sunset Times (IST)' },
    { type: 'precipitation', title: 'Precipitation History' },
    { type: 'wind', title: 'Wind Analysis (Speed & Direction)' },
    { type: 'airQuality', title: 'Air Quality Trends (PM10 & PM2.5)' }
  ];

  return (
    <div className="historical-container">
      <div className="date-range-selector">
        <h2>Select Date Range (Max 2 Years)</h2>
        <DatePicker onRangeChange={handleDateRangeChange} />
      </div>
      
      {loading && <div className="loader">Loading historical data...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      {data && !loading && data.length > 0 && (
        <div className="charts-container">
          {charts.map(chart => (
            <div key={chart.type} className="chart-wrapper">
              <HistoricalChart
                data={data}
                type={chart.type}
                title={chart.title}
              />
            </div>
          ))}
        </div>
      )}
      
      {data && data.length === 0 && !loading && (
        <div className="error">No data available for selected date range</div>
      )}
    </div>
  );
};

export default Historical;