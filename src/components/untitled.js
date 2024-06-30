import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { auth, firestore, doc, setDoc, getDoc } from '../../firebase'; // Adjust the path if necessary
import chefimage2 from '../assets/chef4.jpg';
import { Link } from 'react-router-dom';

function ChefSkills() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    userType: '',
    userProfilePic: '',
    pincode: '',
    cuisineSpecialties: [],
    dietarySpecialties: [],
    cookingTechniques: [],
    experienceLevel: '',
    previousEmployment: '',
    references: '',
    availableLocations: '',
    willingToTravel: '',
    maxTravelDistance: '',
    workingHours: '',
    availabilityForSpecialOccasions: '',
    sampleMenus: '',
    pricing: '',
    formalEducation: '',
    certifications: '',
    additionalSkills: '',
    languageProficiency: '',
    preferredCookingEquipment: '',
    clientInteraction: '',
    adaptability: '',
    hobbiesAndInterests: '',
    futureGoals: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchProfileData(user.uid);
      } else {
        setProfileExists(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (uid) => {
    const userRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      // Check if all required fields exist in userData
      const requiredFields = [
        'name', 'email', 'phone', 'address', 'userType', 'pincode',
        'cuisineSpecialties', 'dietarySpecialties', 'cookingTechniques', 'experienceLevel',
        'previousEmployment', 'references', 'availableLocations', 'willingToTravel',
        'maxTravelDistance', 'workingHours', 'availabilityForSpecialOccasions', 'sampleMenus',
        'pricing', 'formalEducation', 'certifications', 'additionalSkills', 'languageProficiency',
        'preferredCookingEquipment', 'clientInteraction', 'adaptability', 'hobbiesAndInterests', 'futureGoals'
      ];

      const allFieldsExist = requiredFields.every(field => userData[field] !== undefined && userData[field] !== '');

      if (allFieldsExist) {
        setFormData(userData);
        setProfileExists(true);
      } else {
        setProfileExists(false);
      }
    } else {
      setProfileExists(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        setIsSaving(true);

        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, formData);

        setIsSaving(false);
        alert('Profile saved successfully!');
      } else {
        alert('User not logged in.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div>
        <div style={{ backgroundColor: "#dc3545" }}>
          <Navbar />
        </div>
        <div className="container mt-5 text-center">
          <h2>Please login to continue</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ backgroundColor: "#dc3545" }}>
        <Navbar />
      </div>
      <div className="row g-0">
        <div className="col-lg-6 p-5" style={{ height: '100vh', overflowY: 'auto' }}>
          <h1 className="display-2">Complete Profile</h1>
          {profileExists ? (
            <div>
              <p className='text-secondary'><i className='bx bxs-info-circle'></i> Profile already exists</p>
              <h2><i className='bx bxs-user-rectangle'></i>{formData.name}</h2>
              <h2><i className='bx bxl-gmail'></i>{formData.email}</h2>
              <h2><i className='bx bxs-phone-call'></i>{formData.phone}</h2>
              <h2><i className='bx bxs-home'></i>{formData.address}</h2>
              <h2><i className='bx bxs-category'></i>{formData.userType}</h2>
              <h2><i className='bx bx-world'></i>{formData.pincode}</h2>
              <br /><br />
              <Link className='btn btn-lg btn-danger' to={formData.userType === 'cook' ? "/chefskills" : "/findcook"}>
                Continue<i className='bx bx-right-arrow-alt'></i>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Additional questions */}
              <div className="mb-3">
                <label className="form-label">Cuisine Specialties</label>
                <textarea className="form-control" id="cuisineSpecialties" name="cuisineSpecialties" placeholder='e.g., North Indian, South Indian, etc.' value={formData.cuisineSpecialties} onChange={handleChange}></textarea>
              </div>

              

              <div className="mb-3">
                <label className="form-label">Dietary Specialties</label>
                <textarea className="form-control" id="dietarySpecialties" name="dietarySpecialties" placeholder='e.g., Vegetarian, Non-Vegetarian, etc.' value={formData.dietarySpecialties} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Cooking Techniques</label>
                <textarea className="form-control" id="cookingTechniques" name="cookingTechniques" placeholder='e.g., Baking, Grilling, etc.' value={formData.cookingTechniques} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Experience Level</label>
                <input type="text" className="form-control" id="experienceLevel" name="experienceLevel" placeholder='e.g., 5 years' value={formData.experienceLevel} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Previous Employment</label>
                <textarea className="form-control" id="previousEmployment" name="previousEmployment" placeholder='e.g., Restaurant, Hotel, etc.' value={formData.previousEmployment} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">References</label>
                <textarea className="form-control" id="references" name="references" placeholder='e.g., References from previous employers' value={formData.references} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Available Locations</label>
                <textarea className="form-control" id="availableLocations" name="availableLocations" placeholder='e.g., Cities/Towns' value={formData.availableLocations} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Willing to Travel</label>
                <select className="form-control" id="willingToTravel" name="willingToTravel" value={formData.willingToTravel} onChange={handleChange}>
                  <option value="" disabled>Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Maximum Distance Willing to Travel (in km)</label>
                <input type="number" className="form-control" id="maxTravelDistance" name="maxTravelDistance" value={formData.maxTravelDistance} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Working Hours</label>
                <textarea className="form-control" id="workingHours" name="workingHours" placeholder='e.g., Full-Time, Part-Time, etc.' value={formData.workingHours} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Availability for Special Occasions</label>
                <textarea className="form-control" id="availabilityForSpecialOccasions" name="availabilityForSpecialOccasions" placeholder='e.g., Weddings, Birthdays, etc.' value={formData.availabilityForSpecialOccasions} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Sample Menus</label>
                <textarea className="form-control" id="sampleMenus" name="sampleMenus" placeholder='e.g., Signature Dishes, Full Course Meal Options, etc.' value={formData.sampleMenus} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Pricing</label>
                <textarea className="form-control" id="pricing" name="pricing" placeholder='e.g., Per Hour Rate, Per Meal Rate, etc.' value={formData.pricing} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Formal Education and Certifications</label>
                <textarea className="form-control" id="formalEducation" name="formalEducation" placeholder='e.g., Culinary School Attended, Certifications, etc.' value={formData.formalEducation} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Additional Skills</label>
                <textarea className="form-control" id="additionalSkills" name="additionalSkills" placeholder='e.g., Menu Planning, Inventory Management, etc.' value={formData.additionalSkills} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Language Proficiency</label>
                <textarea className="form-control" id="languageProficiency" name="languageProficiency" placeholder='e.g., English, Hindi, etc.' value={formData.languageProficiency} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Preferred Cooking Equipment</label>
                <textarea className="form-control" id="preferredCookingEquipment" name="preferredCookingEquipment" placeholder='e.g., Owns Professional Equipment, Specific Tools Preferred, etc.' value={formData.preferredCookingEquipment} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Client Interaction</label>
                <textarea className="form-control" id="clientInteraction" name="clientInteraction" placeholder='e.g., Experience with Customer Service' value={formData.clientInteraction} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Adaptability</label>
                <textarea className="form-control" id="adaptability" name="adaptability" placeholder='e.g., Ability to Cook with Limited Ingredients' value={formData.adaptability} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Hobbies and Interests</label>
                <textarea className="form-control" id="hobbiesAndInterests" name="hobbiesAndInterests" placeholder='e.g., Any other interests related to cooking or culinary arts' value={formData.hobbiesAndInterests} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Future Goals</label>
                <textarea className="form-control" id="futureGoals" name="futureGoals" placeholder='e.g., Aspirations within the Culinary Field' value={formData.futureGoals} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn btn-danger btn-lg btn-block">
                {isSaving ? <Spinner /> : 'Save Profile'}
              </button>
            </form>
          )}
        </div>
        <div className="col-lg-6 wallpaper" style={{ height: "100vh", position: "fixed", right: 0 }}>
          <div className="profile-image text-end">
            {/* <img src={chefimage2} alt="Profile" className="img-fluid" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
  );
}

export default ChefSkills;
