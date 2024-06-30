import React from 'react';

const Cook = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header text-center">
              <h2>Cook Profile</h2>
            </div>
            <div className="card-body text-center">
              
              <h3>John Doe</h3>
              <p>Experienced Chef with a passion for creating delicious and healthy meals.</p>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3>Services Offered</h3>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">Personal Chef Services</li>
                <li className="list-group-item">Catering for Events</li>
                <li className="list-group-item">Meal Prep for Special Diets</li>
                <li className="list-group-item">Cooking Classes</li>
              </ul>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3>Reviews and Ratings</h3>
            </div>
            <div className="card-body">
              <div className="review">
                <p><strong>Customer A:</strong> John is an amazing cook! The meals were delicious and beautifully presented.</p>
              </div>
              <div className="review">
                <p><strong>Customer B:</strong> Highly recommend John for any catering needs. Professional and talented chef.</p>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3>Contact/Book</h3>
            </div>
            <div className="card-body">
              <p>For bookings or inquiries, please contact:</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <p><strong>Phone:</strong> +123 456 7890</p>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3>Photo Gallery</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Dish 1" />
                </div>
                <div className="col-md-4 mb-3">
                  <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Dish 2" />
                </div>
                <div className="col-md-4 mb-3">
                  <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Dish 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cook;
