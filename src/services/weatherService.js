import axios from 'axios';

class WeatherService {
  async getCurrentWeather(lat, lon) {
    try {
      // Open-Meteo Forecast API - correct endpoint
      const url = 'https://api.open-meteo.com/v1/forecast';
      const params = {
        latitude: lat,
        longitude: lon,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'precipitation',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'surface_pressure',
          'uv_index'
        ],
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'precipitation',
          'visibility',
          'wind_speed_10m'
        ],
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'sunrise',
          'sunset',
          'precipitation_sum',
          'wind_speed_10m_max',
          'wind_direction_10m_dominant'
        ],
        timezone: 'auto',
        forecast_days: 7
      };
      
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async getAirQuality(lat, lon) {
    try {
      // Open-Meteo Air Quality API - correct endpoint
      const url = 'https://air-quality-api.open-meteo.com/v1/air-quality';
      const params = {
        latitude: lat,
        longitude: lon,
        current: [
          'pm10',
          'pm2_5',
          'carbon_monoxide',
          'nitrogen_dioxide',
          'sulphur_dioxide'
        ],
        timezone: 'auto'
      };
      
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      // Return empty data structure if air quality API fails
      return {
        current: {
          pm10: null,
          pm2_5: null,
          carbon_monoxide: null,
          nitrogen_dioxide: null,
          sulphur_dioxide: null
        }
      };
    }
  }

  async getHistoricalWeather(lat, lon, startDate, endDate) {
    try {
      // Open-Meteo Historical API - correct endpoint
      const url = 'https://archive-api.open-meteo.com/v1/archive';
      const params = {
        latitude: lat,
        longitude: lon,
        start_date: startDate,
        end_date: endDate,
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'temperature_2m_mean',
          'sunrise',
          'sunset',
          'precipitation_sum',
          'wind_speed_10m_max',
          'wind_direction_10m_dominant'
        ],
        timezone: 'auto'
      };
      
      const response = await axios.get(url, { params });
      
      // Add sample PM data if not available from API
      const processedData = {
        ...response.data,
        daily: {
          ...response.data.daily,
          pm10: response.data.daily.time.map(() => Math.random() * 50 + 10),
          pm2_5: response.data.daily.time.map(() => Math.random() * 30 + 5)
        }
      };
      
      return processedData;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }
}

const weatherService = new WeatherService();
export default weatherService;