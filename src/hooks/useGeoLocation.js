import { useState, useEffect } from 'react';

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: null, lon: null },
    error: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        loaded: true,
        coordinates: { lat: null, lon: null },
        error: 'Geolocation not supported'
      });
      return;
    }

    const onSuccess = (position) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        },
        error: null
      });
    };

    const onError = (error) => {
      setLocation({
        loaded: true,
        coordinates: { lat: null, lon: null },
        error: error.message
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};