import React, { useState, useEffect } from 'react';
import AvailableCooks from './AvailableCooks';

function FindCook() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Fetch location name using reverse geocoding API
          try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            if (!response.ok) {
              throw new Error('Failed to fetch location data');
            }
            const data = await response.json();
            console.log('Location data:', data);
            setLocationName(data.locality);
          } catch (error) {
            console.error('Error fetching location data:', error);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <div className="findcook">
        {/* nothing here */}
      </div>

      <div className="container mt-5 text-center">
        <h2 className='display-5'>Available Cooks Nearby</h2>
        {locationName && (
          <p>Your current location: <p style={{display:"inline"}} className='text-danger fw-bold'>{locationName}</p></p>
        )}
        <AvailableCooks userLocation={userLocation} />
      </div>
    </div>
  );
}

export default FindCook;
