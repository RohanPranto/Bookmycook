import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore, doc, getDoc, auth } from "../../firebase";
import emailjs from "emailjs-com";
import CooksProfile from "./CooksProfile";

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

  const cardImages = {
    "cuisineSpecialties": "https://img.freepik.com/free-vector/hand-drawn-iftar-meal-illustration_52683-57357.jpg?t=st=1720279287~exp=1720282887~hmac=7f066eb84cc9812650bb4e0301423f88cace948b9edd8af007574fec0d624ca8&w=740",
    "dietarySpecialties": "https://img.freepik.com/free-vector/buddha-bowl-recipe-concept_23-2148596543.jpg?t=st=1720279433~exp=1720283033~hmac=2b400d1ea63576c0ebb8bb737e0fd66819028811da586254879afd35c0bcd29b&w=740",
    "cookingTechniques": "https://img.freepik.com/free-vector/female-chef-concept-illustration_114360-12051.jpg?t=st=1720279461~exp=1720283061~hmac=8bf0b04ea8bc1e1960fa7e8810a3422dc5997418f5a80d6094d7aa978562f71d&w=740",
    "experienceLevel": "https://img.freepik.com/free-vector/beautiful-housewife-is-cooking-kitchen-illustration-vector-cartoon-animation-design_40876-2541.jpg?t=st=1720279481~exp=1720283081~hmac=a1b76d171934ae5ee1787d43137f6778943d35f4eb60655d4609396bdc88b2bd&w=740",
    "previousEmployment": "https://img.freepik.com/free-vector/hotel-tower-concept-illustration_114360-17162.jpg?t=st=1720279529~exp=1720283129~hmac=55dd52ae1440a9fba5ba63dc82ef05fc95141a6e4dfed2bc55b399d6b14a9981&w=740",
    "availableLocations": "https://img.freepik.com/free-vector/grey-circle-map-with-red-location-pin_78370-4985.jpg?t=st=1720279608~exp=1720283208~hmac=8c28b5dc590e3c994748e64999adcce4edc0c3c6578c62c009b596de877a7f53&w=740",
    "workingHours": "https://img.freepik.com/free-vector/clock-with-sync-arrows_78370-6148.jpg?t=st=1720279571~exp=1720283171~hmac=af7c85f62ba8472dcb00bb5b3fc7e5e5597541b6fd121b8718c06160121ab501&w=740",
    "notes": "https://img.freepik.com/free-vector/yellow-note-paper-with-red-pin_1284-42430.jpg?t=st=1720279643~exp=1720283243~hmac=e2dcb93be02a6ff5b67d6161be0086c105a5664442260f972b979b9b2bdc70d4&w=740",
  };

  const imageMap = {
    "Cuisine Specialties": "cuisineSpecialties",
    "Dietary Specialties": "dietarySpecialties",
    "Cooking Techniques": "cookingTechniques",
    "Experience Level": "experienceLevel",
    "Previous Employment": "previousEmployment",
    "Available Locations": "availableLocations",
    "Working Hours": "workingHours",
    "Notes": "notes",
  };

  return (
    <CooksProfile 
      cook={cook} 
      handleRequestBooking={handleRequestBooking} 
      bookingLoading={bookingLoading} 
      cardImages={cardImages} 
      imageMap={imageMap} 
    />
  );
}

export default Cook;
