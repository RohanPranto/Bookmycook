import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { auth, firestore, doc, setDoc, getDoc } from "../../firebase"; // Adjust the path if necessary
import chefimage2 from "../assets/chef4.jpg";
import { useNavigate } from "react-router-dom";
import cuisines from "../data/cuisine";
import dieteries from "../data/dietery";
import techniques from "../data/technique";

function ChefSkills() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    userType: "",
    userProfilePic: "",
    pincode: "",
    aadhaar: "",
    cuisineSpecialties: [],
    dietarySpecialties: [],
    cookingTechniques: [],
    experienceLevel: "",
    previousEmployment: "",
    availableLocations: "",
    workingHours: "",
    availabilityForSpecialOccasions: "",
    sampleMenus: "",
    pricing: "",
    formalEducation: "",
    certifications: "",
    additionalSkills: "",
    languageProficiency: "",
    preferredCookingEquipment: "",
    adaptability: "",
    hobbiesAndInterests: "",
    notes: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    const userRef = doc(firestore, "cooks", uid); // Changed collection name to "cook"
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      setFormData((prevData) => ({
        ...prevData,
        ...userData, // Merge existing profile data with new form fields
      }));
      setProfileExists(true);
    } else {
      setProfileExists(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (
      name === "cuisineSpecialties" ||
      name === "dietarySpecialties" ||
      name === "cookingTechniques"
    ) {
      // Clone the existing array to avoid mutating state directly
      let updatedArray = [...formData[name]];

      if (checked) {
        // Add the selected item to the array if checked
        updatedArray.push(value);
      } else {
        // Remove the item from the array if unchecked
        updatedArray = updatedArray.filter((item) => item !== value);
      }

      setFormData({
        ...formData,
        [name]: updatedArray,
      });
    } else {
      // For other input fields, update state normally
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const isProfileComplete = () => {
    // Check if all required fields are filled
    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "userType",
      "pincode",
      "aadhaar",
      "cuisineSpecialties",
      "dietarySpecialties",
      "cookingTechniques",
      "experienceLevel",
      "previousEmployment",
      "availableLocations",
      "workingHours"
    ];

    for (let field of requiredFields) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        setIsSaving(true);

        const collectionName = formData.userType === "cook" ? "cooks" : "customer";
        const userRef = doc(firestore, collectionName, user.uid); // Adjusted collection name dynamically
        await setDoc(userRef, formData);

        setIsSaving(false);
        alert("Profile saved successfully!");

        if (isProfileComplete()) {
          navigate("/findCustomer");
        } else {
          alert("Please complete profile");
        }
      } else {
        alert("User not logged in.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
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
      <div className="row g-0">
        <div
          className="col-lg-6 p-5 mt-4"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <h1 className="display-2">Complete Profile</h1>

          {profileExists ? (
            <div>
              <p className="text-secondary">
                <i className="bx bxs-info-circle"></i> Profile already exists
              </p>
              <h2>
                <i className="bx bxs-user-rectangle"></i>
                {formData.name}
              </h2>
              <h2>
                <i className="bx bxl-gmail"></i>
                {formData.email}
              </h2>
              <h2>
                <i className="bx bxs-phone-call"></i>
                {formData.phone}
              </h2>
              <h2>
                <i className="bx bxs-home"></i>
                {formData.address}
              </h2>
              <h2>
                <i className="bx bxs-category"></i>
                {formData.userType}
              </h2>
              <h2>
                <i className="bx bx-world"></i>
                {formData.pincode}
              </h2>
              <br />
              <br />
              <button
                className="btn btn-lg btn-danger"
                onClick={() => {
                  if (isProfileComplete()) {
                    navigate("/findCustomer");
                  } else {
                    alert("Please complete profile");
                  }
                }}
              >
                Continue to Dashboard<i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <br />
              {/* Additional questions */}
              <h2>Cuisine Specialities</h2>
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #dee2e6", backgroundColor:"#ffffff",
                  borderRadius: "10px",
                }}
              >
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {cuisines.map((cuisine, index) => (
                    <label key={index} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="cuisineSpecialties"
                        value={cuisine}
                        onChange={handleChange}
                        checked={formData.cuisineSpecialties.includes(cuisine)}
                      />
                      {cuisine}
                    </label>
                  ))}
                </div>
              </div>



              <div className="mt-5">
                <h2>Dietary Specialities</h2>
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #dee2e6",backgroundColor:"#ffffff",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {dieteries.map((dietary, index) => (
                      <label key={index} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="dietarySpecialties"
                          value={dietary}
                          onChange={handleChange}
                          checked={formData.dietarySpecialties.includes(
                            dietary
                          )}
                        />
                        {dietary}
                      </label>
                    ))}
                  </div>
                </div>
              </div>




              <div className="mt-5">
              <h2>Cooking Techniques</h2>
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #dee2e6",backgroundColor:"#ffffff",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {techniques.map((tech, index) => (
                      <label key={index} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="cookingTechniques"
                          value={tech}
                          onChange={handleChange}
                          checked={formData.cookingTechniques.includes(
                            tech
                          )}
                        />
                        {tech}
                      </label>
                    ))}
                  </div>
                </div>
              </div>



              <div className="mt-5">
                <h2>Aadhaar Card Number</h2>
                <input
                  type="text"
                  className="form-control"
                  id="aadhaar"
                  name="aadhaar"
                  placeholder="example: 7359 5973 3975"
                  value={formData.aadhaar}
                  onChange={handleChange}
                />
              </div>



              <div className="mt-5">
                <h2>Experience Level</h2>
                <input
                  type="text"
                  className="form-control"
                  id="experienceLevel"
                  name="experienceLevel"
                  placeholder="example: 5 years"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                />
              </div>


              <div className="mt-5">
                <h2 className="form-label">Previous Employment</h2>
                <input
                type="text"
                  className="form-control"
                  id="previousEmployment"
                  name="previousEmployment"
                  placeholder="example: Restaurant, Hotel, etc."
                  value={formData.previousEmployment}
                  onChange={handleChange}
                ></input>
              </div>
              

              <div className="mt-5">
                <h2 className="form-label">Locations you can work</h2>
                <textarea
                  className="form-control"
                  id="availableLocations"
                  name="availableLocations"
                  placeholder="Enter pincodes followed by a comma. example: 741235, 741236, 741237"
                  value={formData.availableLocations}
                  onChange={handleChange}
                ></textarea>
              </div>
              

              
              <div className="mt-5">
                <h2 className="form-label">Working Hours</h2>
                <textarea
                  className="form-control"
                  id="workingHours"
                  name="workingHours"
                  placeholder="example: Full-Time, Part-Time, etc."
                  value={formData.workingHours}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mt-5">
                <h2 className="form-label">
                  Availability for Special Occasions
                </h2>
                <textarea
                  className="form-control"
                  id="availabilityForSpecialOccasions"
                  name="availabilityForSpecialOccasions"
                  placeholder="example: Weddings, Birthdays, etc."
                  value={formData.availabilityForSpecialOccasions}
                  onChange={handleChange}
                ></textarea>
              </div>


              <div className="mt-5">
                <h2 className="form-label">Sample Menus</h2>
                <textarea
                  className="form-control"
                  id="sampleMenus"
                  name="sampleMenus"
                  placeholder="Your most skilled dishes"
                  value={formData.sampleMenus}
                  onChange={handleChange}
                ></textarea>
              </div>


              <div className="mt-5">
                <h2 className="form-label">Pricing</h2>
                <input
                type="number"
                  className="form-control"
                  id="pricing"
                  name="pricing"
                  placeholder="Per Hour Rate"
                  value={formData.pricing}
                  onChange={handleChange}
                ></input>
              </div>


              <div className="mt-5">
                <h2 className="form-label">
                  Formal Education and Certifications
                </h2>
                <textarea
                  className="form-control"
                  id="formalEducation"
                  name="formalEducation"
                  placeholder="example: Higher Secondary Exam, Certifications, etc."
                  value={formData.formalEducation}
                  onChange={handleChange}
                ></textarea>
              </div>


              <div className="mt-5">
                <h2 className="form-label">Additional Skills</h2>
                <textarea
                  className="form-control"
                  id="additionalSkills"
                  name="additionalSkills"
                  placeholder="example: Menu Planning, Inventory Management, etc."
                  value={formData.additionalSkills}
                  onChange={handleChange}
                ></textarea>
              </div>


              <div className="mt-5">
                <h2 className="form-label">Language Proficiency</h2>
                <textarea
                  className="form-control"
                  id="languageProficiency"
                  name="languageProficiency"
                  placeholder="example: English, Hindi, etc."
                  value={formData.languageProficiency}
                  onChange={handleChange}
                ></textarea>
              </div>


              <div className="mt-5">
                <h2 className="form-label">
                  Preferred Cooking Equipment
                </h2>
                <textarea
                  className="form-control"
                  id="preferredCookingEquipment"
                  name="preferredCookingEquipment"
                  placeholder="example: Owns Professional Equipment, Specific Tools Preferred, etc."
                  value={formData.preferredCookingEquipment}
                  onChange={handleChange}
                ></textarea>
              </div>


              <div className="mt-5">
                <h2 className="form-label">Adaptability</h2>
                <textarea
                  className="form-control"
                  id="adaptability"
                  name="adaptability"
                  placeholder="example: Ability to Cook with Limited Ingredients"
                  value={formData.adaptability}
                  onChange={handleChange}
                ></textarea>
              </div>


              <div className="mt-5">
                <h2 className="form-label">Hobbies and Interests</h2>
                <textarea
                  className="form-control"
                  id="hobbiesAndInterests"
                  name="hobbiesAndInterests"
                  placeholder="example: Any other interests related to cooking or culinary arts"
                  value={formData.hobbiesAndInterests}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mt-5 mb-5">
                <h2 className="form-label">Other Notes for customer</h2>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  placeholder="example: I'm afraid of dogs"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-danger">
                  {isSaving ? <Spinner /> : "Save Profile"}
                </button>
              </div>
              
            </form>
          )}
        </div>
        <div
          className="col-lg-6 wallpaper"
          style={{ height: "100vh", position: "fixed", right: 0 }}
        >
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
    <span
      className="spinner-border spinner-border-sm me-2"
      role="status"
      aria-hidden="true"
    ></span>
  );
}

export default ChefSkills;
