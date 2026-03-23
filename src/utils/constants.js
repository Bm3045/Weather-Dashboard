export const API_BASE_URL = 'https://api.open-meteo.com/v1';
export const AIR_QUALITY_API_URL = 'https://air-quality-api.open-meteo.com/v1';
export const HISTORICAL_API_URL = 'https://archive-api.open-meteo.com/v1';

export const AIR_QUALITY_LEVELS = {
  1: 'Good',
  2: 'Fair',
  3: 'Moderate',
  4: 'Poor',
  5: 'Very Poor'
};

export const CHART_COLORS = {
  temperature: '#FF6B6B',
  humidity: '#4ECDC4',
  precipitation: '#45B7D1',
  visibility: '#96CEB4',
  wind: '#FFEAA7',
  pm10: '#DDA0DD',
  pm25: '#98D8C8'
};

export const DATE_RANGE_LIMIT = 730; // 2 years in days