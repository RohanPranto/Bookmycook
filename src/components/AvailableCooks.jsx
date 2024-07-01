import React, { useEffect, useState } from 'react';
import { firestore, collection, getDocs, doc, getDoc } from '../../firebase'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';

function AvailableCooks() {
  const [cooks, setCooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const cooksCollection = collection(firestore, 'cooks');
        const cooksSnapshot = await getDocs(cooksCollection);

        const cooksList = [];
        cooksSnapshot.forEach((doc) => {
          cooksList.push({ id: doc.id, ...doc.data() });
        });

        setCooks(cooksList);
      } catch (error) {
        console.error('Error fetching cooks: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCooks();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="spinner-border spinner-border-sm text-secondary" style={{marginRight:8 }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>

    {/* Spinner using spinner-grow class */}
    <div className="spinner-grow spinner-grow-sm text-secondary"  role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {cooks.map((cook) => (
          <div className="col-lg-4 mb-4" key={cook.id}>
            <div className="card h-100 border-2">
              <div className="card-body text-start">
                <h5 className="card-title">{cook.name}</h5>
                <p className="card-text">
                  Cuisine Specialties: {cook.cuisineSpecialties.join(', ')}
                  <br />
                  Experience Level: {cook.experienceLevel}
                </p>
                <p className="card-text">
                  <small className="text-muted">Location: {cook.address}</small>
                </p>
                <Link to={`/Cook/${cook.id}`} className="btn btn-danger btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableCooks;
