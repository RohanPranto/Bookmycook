import React from 'react';

const CooksProfile = ({ cook, handleRequestBooking, bookingLoading, cardImages, imageMap }) => {
  return (
    <div className='pb-5' style={{backgroundColor: "#dc3545"}}>
      <div style={{
  height: "65px",
  boxShadow: "0px 5px 15px -5px rgba(0,0,0,0.3)", // Shadow effect with blur at the bottom
}}>
  {/* Content of your div */}
</div>

      <div className="container cook-container mb-5">
        <div className="row mt-4">
          <div className="col-lg-8">
            <div className="row">
              {Object.entries({
                "Cuisine Specialties": cook.cuisineSpecialties,
                "Dietary Specialties": cook.dietarySpecialties,
                "Cooking Techniques": cook.cookingTechniques,
                "Experience Level": cook.experienceLevel + ' years',
                "Previous Employment": cook.previousEmployment,
                "Available Locations": cook.availableLocations,
                "Working Hours": cook.workingHours,
                "Notes": cook.notes,
              }).map(([title, content], index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={cardImages[imageMap[title]]} className="img-fluid rounded-start" alt={title} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title text-primary">{title}</h5>
                          <p className="card-text">{Array.isArray(content) ? content.join(", ") : content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-4">
              <img
                src={cook.userProfilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"}
                className="card-img-top"
                alt="Profile"
              />
              <div className="card-body">
                <div className="mb-3">
                  <h2>
                  {cook.name}
                  </h2>
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
            <button className="btn w-100 bg-light" onClick={handleRequestBooking} disabled={bookingLoading}>
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
};

export default CooksProfile;
