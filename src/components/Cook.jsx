import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore, doc, getDoc, auth } from "../../firebase";
import emailjs from "emailjs-com";

function Cook() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    userType: '',
    userProfilePic: '',
    pincode: '',
    age: '',
  });
  const [cook, setCook] = useState(null);
  const { cookId } = useParams();
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [user, setUser] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  useEffect(() => {
    const fetchCook = async () => {
      try {
        const cookDoc = await getDoc(doc(firestore, "cooks", cookId));
        if (cookDoc.exists()) {
          setCook(cookDoc.data());
        } else {
          console.error("Cook not found");
        }
      } catch (error) {
        console.error("Error fetching cook:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCook();
  }, [cookId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchProfileData(user.uid);
        console.log("User is signed in:", formData);
      } else {
        setProfileExists(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (uid) => {
    try {
      const userRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFormData(userData);
        setProfileExists(true);
      } else {
        setProfileExists(false);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleRequestBooking = () => {
    if (!cook) {
      console.error("No cook data available to send email.");
      return;
    }
    setBookingLoading(true);
    const templateParams = {
      to_email: cook.email, // Cook's email address
      cook_name: cook.name, // Cook's name
      user_name: formData.name,
      user_address:formData.address,
      user_phone: formData.phone,
      user_pincode: formData.pincode,
      message: `Booking request from ${formData.name}. Customer address is ${formData.address} and pincode is ${formData.pincode}. Please contact them at ${formData.phone} or ${formData.email}. `,
    };

    emailjs.send('service_sabzhu2', 'template_dvxaa3v', templateParams, 'aFEb088m1p4wXNETC')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Booking request sent successfully! Wait for the cook to contact you.');
      }, (error) => {
        console.error('Failed to send email.', error);
        alert('Failed to send booking request.');
      })
      .finally(() => {
        setBookingLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border spinner-border-lg text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!cook) {
    return <div className="text-center">Cook not found</div>;
  }

  return (
    <div>
      <div style={{ height: "65px", backgroundColor: "#dc3545" }}></div>
      <div className="container cook-container mb-5">
        <div className="row mt-4">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">{cook.name}</h2>
                <hr />
                <div className="mb-4">
                  <h4 className="text-primary">
                    <i className="bx bx-dish"></i> Cuisine Specialties
                  </h4>
                  <p>{cook.cuisineSpecialties.join(", ")}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-primary">
                    <i className="bx bxs-capsule"></i> Dietary Specialties
                  </h4>
                  <p>{cook.dietarySpecialties.join(", ")}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-primary">
                    <i className="bx bxs-bowl-hot"></i> Cooking Techniques
                  </h4>
                  <p>{cook.cookingTechniques.join(", ")}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-primary">
                    <i className="bx bxs-objects-vertical-bottom"></i> Experience Level
                  </h4>
                  <p>{cook.experienceLevel} years</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-primary">
                    <i className="bx bx-briefcase-alt-2"></i> Previous Employment
                  </h4>
                  <p>{cook.previousEmployment}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-primary">
                    <i className="bx bxs-location-plus"></i> Available Locations
                  </h4>
                  <p>{cook.availableLocations}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-primary">
                    <i className="bx bxs-hourglass-bottom"></i> Working Hours
                  </h4>
                  <p>{cook.workingHours}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-primary">
                    <i className="bx bxs-note"></i> Notes
                  </h4>
                  <p>{cook.notes}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-4">
              <img
                src={cook.userProfilePic || "default-profile-pic.jpg"}
                className="card-img-top"
                alt="Profile"
              />
              <div className="card-body">
                <div className="mb-3">
                  <p className="text-muted">
                    <i className="bx bxs-user"></i> {cook.userType}
                  </p>
                  <p>
                    <i className="bx bxs-graduation"></i> Education: {cook.formalEducation}
                  </p>
                  <p>
                    <i className="bx bxs-certification"></i> Certification: {cook.certifications}
                  </p>
                  <p>
                    <i className="bx bxs-dollar-circle"></i> Rate: {cook.pricing}
                  </p>
                  <p>
                    <i className="bx bxs-food-menu"></i> Best menu: {cook.sampleMenus}
                  </p>
                  <p>
                    <i className="bx bx-globe"></i> Language Proficiency: {cook.languageProficiency}
                  </p>
                  <p>
                    <i className="bx bxs-wrench"></i> Additional Skill: {cook.additionalSkills}
                  </p>
                  <p>
                    <i className="bx bxs-home"></i> Address: {cook.address}
                  </p>
                  <p>
                    <i className="bx bxs-phone"></i> Phone: <a style={{ textDecoration: "none" }} href={`tel:${cook.phone}`}>{cook.phone}</a>
                  </p>

                  <p>
                    <i className="bx bxs-envelope"></i> Email: {cook.email}
                  </p>
                  <p>
                    <i className="bx bxs-heart"></i> Hobbies and Interests: {cook.hobbiesAndInterests}
                  </p>
                </div>
              </div>
            </div>
            <button className="btn w-100 btn-danger" onClick={handleRequestBooking} disabled={bookingLoading}>
  {bookingLoading ? (
    <>
      <div className="spinner-border spinner-border-sm text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> 
      Requesting...
    </>
  ) : (
    <>
      <i className="bx bx-navigation"></i> Request a Booking
    </>
  )}
</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cook;
