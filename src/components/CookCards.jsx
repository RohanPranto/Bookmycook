import React from "react";
import { Link } from "react-router-dom";
import cookImage from "../assets/cook.jpg"; // Import the image using relative path
import cookImage2 from "../assets/customer.jpg"; // Import the image using relative path

const CookCards = () => {
  return (
    <div className="container mt-1 p-5">
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4 mb-4">
          {/* card 1 */}
          <Link to="/cook" style={{ textDecoration: "none" }}>
            <div className="card rounded border-2 rounded-4">
              <img
                src={cookImage2} // Use the imported image variable here
                className="card-img-top rounded-4 rounded-bottom-0"
                style={{
                  aspectRatio: "16/9",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
                alt="..."
              />
              <div className="card-body text-center" style={{ padding: 6 }}>
                <h5 className="card-title">
                  I am <span>cook</span>
                </h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-8 col-md-6 col-lg-4 mb-4">
          {/* card2 */}
          <Link to="/customer" style={{ textDecoration: "none" }}>
            <div className="card rounded border-2 rounded-4">
              <img
                src={cookImage} // Use the imported image variable here
                className="card-img-top rounded-4 rounded-bottom-0"
                style={{
                  aspectRatio: "16/9",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
                alt="..."
              />
              <div className="card-body text-center" style={{ padding: 6 }}>
                <h5 className="card-title">
                  I am <span>customer</span>
                </h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookCards;
