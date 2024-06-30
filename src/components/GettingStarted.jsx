import React from 'react';
import { Link } from 'react-router-dom';
// import '../assets/GettingStarted.css'; 
import chefimage from '../assets/foods.jpg';

function GettingStarted() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-7">
          <div className="getting-started-content">
            <h2 className='display-2'>No more<br/><em>boring</em> meals!</h2>
            <Link to="/profile" className="btn btn-danger">Getting Started</Link>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="getting-started-image ">
            <img src={chefimage} alt="Getting Started" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GettingStarted;
