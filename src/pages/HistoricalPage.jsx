import React from 'react';
import { useGeoLocation } from '../hooks/useGeoLocation';
import Historical from '../components/Historical/Historical';
import Loader from '../components/Common/Loader';
import Error from '../components/Common/Error';
import './Page.css';

const HistoricalPage = () => {
  const location = useGeoLocation();

  if (!location.loaded) return <Loader />;
  if (location.error) return <Error message={location.error} />;

  return (
    <div className="page-container">
      <Historical 
        lat={location.coordinates.lat} 
        lon={location.coordinates.lon}
      />
    </div>
  );
};

export default HistoricalPage;