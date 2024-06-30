import React from 'react';

const Customer = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header text-center">
              <h2>Customer Dashboard</h2>
            </div>
            <div className="card-body">
              <p>Welcome to the Customer Dashboard! Here you can find and book the best cooks near you.</p>
              {/* Additional features for customers can be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
