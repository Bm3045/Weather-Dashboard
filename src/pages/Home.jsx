import React from 'react';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useWeatherData } from '../hooks/useWeatherData';
import WeatherCard from '../components/CurrentWeather/WeatherCard';
import HourlyGraphs from '../components/HourlyGraphs/HourlyGraphs';
import Loader from '../components/Common/Loader';
import Error from '../components/Common/Error';
import './Page.css';

const Home = () => {
  const location = useGeoLocation();
  const { data, loading, error } = useWeatherData(
    location.coordinates.lat,
    location.coordinates.lon
  );

  if (!location.loaded) return <Loader />;
  if (location.error) return <Error message={location.error} />;
  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="page-container">
      <WeatherCard 
        data={data} 
        airQuality={data?.airQuality}
      />
      <HourlyGraphs 
        data={data} 
        date={new Date()}
      />
    </div>
  );
};

export default Home;