import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if using React Router

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light">Home</Link></li>
              <li><Link to="/about" className="text-light">About Us</Link></li>
              <li><Link to="/services" className="text-light">Services</Link></li>
              <li><Link to="/contact" className="text-light">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-light me-3"><i className='bx bxl-facebook bx-md'></i></a>
              <a href="#" className="text-light me-3"><i className='bx bxl-twitter bx-md'></i></a>
              <a href="#" className="text-light me-3"><i className='bx bxl-instagram bx-md'></i></a>
              <a href="#" className="text-light"><i className='bx bxl-linkedin bx-md'></i></a>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Contact Info</h5>
            <p><i className='bx bx-map'></i> Address, City, Country</p>
            <p><i className='bx bx-phone'></i> +123 456 789</p>
            <p><i className='bx bx-mail-send'></i> example@example.com</p>
          </div>
        </div>
        <hr className="mt-3" />
        <div className="text-center">
          <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
