// Details.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doc, setDoc } from '../../firebase'; // Adjust the path if necessary
import { Spinner } from './ChefSkills'; // Import Spinner if needed

const cuisineSpecialtiesOptions = [
  'North Indian',
  'South Indian',
  'Mughlai',
  'Punjabi',
  'Bengali',
  'Gujarati',
  'Maharashtrian',
  'Rajasthani',
  'Continental',
  'Chinese',
  'Italian',
  'Mexican',
  'Japanese',
  'Thai',
  'Other (specify)'
];

function Details({ formData, setFormData, isSaving, setIsSaving }) {
  const history = useHistory();

  const handleCheckboxChange = (option) => {
    const isChecked = formData.cuisineSpecialties.includes(option);
    if (isChecked) {
      setFormData({
        ...formData,
        cuisineSpecialties: formData.cuisineSpecialties.filter(item => item !== option)
      });
    } else {
      setFormData({
        ...formData,
        cuisineSpecialties: [...formData.cuisineSpecialties, option]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming user is always defined here since this component is rendered based on authentication state
      setIsSaving(true);

      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, formData);

      setIsSaving(false);
      alert('Profile saved successfully!');
      history.push(formData.userType === 'cook' ? "/chefskills" : "/findcook");
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
      setIsSaving(false);
    }
  };

  return (
    <div className="col-lg-6 p-5" style={{ height: '100vh', overflowY: 'auto' }}>
      <h1 className="display-2">Complete Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Additional questions */}
        <div className="mb-3">
          <label htmlFor="dropdownMenuButton" className="form-label">Cuisine Specialties</label>
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Checkbox dropdown
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {cuisineSpecialtiesOptions.map((specialty, index) => (
                <li key={index}>
                  <label className="dropdown-item">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={specialty}
                      checked={formData.cuisineSpecialties.includes(specialty)}
                      onChange={() => handleCheckboxChange(specialty)}
                    />
                    {specialty}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button type="submit" className="btn btn-danger btn-lg btn-block">
          {isSaving ? <Spinner /> : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

export default Details;
