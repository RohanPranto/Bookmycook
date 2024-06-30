import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { auth, firestore, doc, setDoc, getDoc } from '../../firebase'; // Adjust the path if necessary
import chefimage2 from '../assets/chef4.jpg';
import { Link } from 'react-router-dom';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    userType: '',
    userProfilePic: '',
    pincode: '',
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
      setFormData(userData);
      setProfileExists(true);
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

        // Add user to the specific collection based on userType
        const userTypeRef = doc(firestore, formData.userType === 'customer' ? 'customers' : 'cooks', user.uid);
        await setDoc(userTypeRef, formData);

        setIsSaving(false);

        window.location.reload();
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
      <div>
        <div className="row g-0">
          <div className="col-lg-6 p-5">
            <h1 className="display-2">Profile</h1>
            {profileExists ? (
              <div>
                <p className='text-secondary'><i className='bx bxs-info-circle' ></i>Profile already exists</p>
                <h2><i className='bx bxs-user-rectangle'></i>{formData.name}</h2>
                <h2><i className='bx bxl-gmail' ></i>{formData.email}</h2>
                <h2><i className='bx bxs-phone-call' ></i>{formData.phone}</h2>
                <h2><i className='bx bxs-home'></i>{formData.address}</h2>
                <h2><i className='bx bxs-category' ></i>{formData.userType}</h2>
                <h2><i className='bx bx-world' ></i>{formData.pincode}</h2>
                <br /><br />
                <Link className='btn btn-danger' to={formData.userType === 'cook' ? "/chefskills" : "/findcook"}>
                  Continue<i className='bx bx-right-arrow-alt'></i>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" id="name" name="name" placeholder='Name' value={formData.name} onChange={handleChange} required />
                </div>
                
                <div className="mb-3">
                  <input type="email" className="form-control" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control" id="phone" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" id="address" name="address" placeholder='Address' value={formData.address} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control" id="pincode" name="pincode" placeholder='Pincode' value={formData.pincode} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <select className="form-control" id="userType" name="userType" value={formData.userType} onChange={handleChange} required>
                    <option value="" disabled>Select user type</option>
                    <option value="cook">Cook</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="userProfilePic" className="form-label">Profile Picture URL</label>
                  <input type="url" className="form-control" id="userProfilePic" name="userProfilePic" value={formData.userProfilePic} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-danger" disabled={isSaving}>
                  {isSaving ? <Spinner /> : 'Save Profile'}
                </button>
              </form>
            )}
          </div>
          <div className="col-lg-6 wallpaper" style={{height:""}}>
            <div className="profile-image text-end">
              {/* <img src={chefimage2} alt="Profile" className="img-fluid" /> */}
            </div>
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

export default Profile;
