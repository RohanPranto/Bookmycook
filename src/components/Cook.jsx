import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, doc, getDoc } from "../../firebase";

function Cook() {
    const [cook, setCook] = useState(null);
    const { cookId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCook = async () => {
            try {
                const cookDoc = await getDoc(doc(firestore, 'cooks', cookId));
                if (cookDoc.exists()) {
                    setCook(cookDoc.data());
                } else {
                    console.error('Cook not found');
                }
            } catch (error) {
                console.error('Error fetching cook:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCook();
    }, [cookId]);

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

    if (!cook) {
        return <div>Cook not found</div>;
    }

    return (
        <div>
            <h1>{cook.name}</h1>
            <p>Cuisine Specialties: {cook.cuisineSpecialties.join(', ')}</p>
            <p>Experience Level: {cook.experienceLevel}</p>
            <p>Location: {cook.address}</p>
        </div>
    );
}

export default Cook;
