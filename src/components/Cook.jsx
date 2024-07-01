import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, doc, getDoc } from "../../firebase";
import { BiDish, BiBook, BiMap, BiTime, BiBadge, BiBriefcase, BiFoodMenu, BiMoney, BiBookContent, BiCertification, BiWrench, BiUser, BiComment, BiWorld } from 'react-icons/bi';

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
        <div className="container cook-container">
             <div style={{ height: "80px" }}></div>
        <div className="row">
            <div className="col-lg-8">
                <div className="card mb-4">
                    <div className="card-body">
                        <h2 className="card-title">{cook.name}</h2>
                        <hr />
                        <div className="mb-4">
                            <h5 className="text-primary"><BiDish /> Cuisine Specialties</h5>
                            <p>{cook.cuisineSpecialties.join(', ')}</p>
                        </div>
                        <div className="mb-4">
                            <h5 className="text-primary"><BiDish /> Dietary Specialties</h5>
                            <p>{cook.dietarySpecialties.join(', ')}</p>
                        </div>
                        <div className="mb-4">
                            <h5 className="text-primary"><BiWrench /> Cooking Techniques</h5>
                            <p>{cook.cookingTechniques.join(', ')}</p>
                        </div>
                        <div className="mb-4">
                            <h5 className="text-primary"><BiBadge /> Experience Level</h5>
                            <p>{cook.experienceLevel}</p>
                        </div>
                        <div className="mb-4">
                            <h5 className="text-primary"><BiBriefcase /> Previous Employment</h5>
                            <p>{cook.previousEmployment}</p>
                        </div>
                        <div className="mb-4">
                            <h5 className="text-primary"><BiMap /> Available Locations</h5>
                            <p>{cook.availableLocations}</p>
                        </div>
                        <div className="mb-4">
                            <h5 className="text-primary"><BiTime /> Working Hours</h5>
                            <p>{cook.workingHours}</p>
                        </div>
                        <div className="mb-4">
                            <h5 className="text-primary"><BiComment /> Notes</h5>
                            <p>{cook.notes}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card mb-4">
                    <img src={cook.userProfilePic || 'default-profile-pic.jpg'} className="card-img-top" alt="Profile" />
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4">{cook.name}</h5>
                        <div className="mb-3">
                            <p className="text-muted"><BiUser /> {cook.userType}</p>
                            <p><BiBook /> {cook.formalEducation}</p>
                            <p><BiCertification /> {cook.certifications}</p>
                            <p><BiMoney /> {cook.pricing}</p>
                            <p><BiFoodMenu /> {cook.sampleMenus}</p>
                            <p><BiWorld /> {cook.languageProficiency}</p>
                            <p><BiBookContent /> {cook.additionalSkills}</p>
                            <p><BiMap /> {cook.address}</p>
                            <p><BiUser /> Aadhaar Number: {cook.aadhaar}</p>
                            <p><BiUser /> Phone: {cook.phone}</p>
                            <p><BiUser /> Email: {cook.email}</p>
                            <p><BiUser /> Hobbies and Interests: {cook.hobbiesAndInterests}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Cook;
