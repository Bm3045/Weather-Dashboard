import { useState, useEffect } from 'react';
import weatherService from '../services/weatherService';

export const useWeatherData = (lat, lon) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!lat || !lon) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch weather data
        const weather = await weatherService.getCurrentWeather(lat, lon);
        
        // Fetch air quality data separately (it might fail)
        let airQuality = null;
        try {
          airQuality = await weatherService.getAirQuality(lat, lon);
        } catch (airError) {
          console.warn('Air quality data not available:', airError);
          airQuality = {
            current: {
              pm10: 'N/A',
              pm2_5: 'N/A',
              carbon_monoxide: 'N/A',
              nitrogen_dioxide: 'N/A',
              sulphur_dioxide: 'N/A'
            }
          };
        }
        
        setData({ ...weather, airQuality });
        setError(null);
      } catch (err) {
        console.error('Error in useWeatherData:', err);
        setError(err.message || 'Failed to fetch weather data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon]);

  return { data, loading, error };
};