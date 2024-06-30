import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, provider, signInWithPopup, signOut } from '../../firebase';
import '../assets/Navbar.css'; // Import the CSS file

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      // Unsubscribe from the listener when component unmounts
      unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-absolute">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <Link className="dropdown-item" to="/findcook">Find Cook</Link>
                <Link className="dropdown-item" to="/chefskills">Chef Skills</Link>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              {user ? (
                <div className="user-info">
                  <span className="nav-link">Hello, {user.displayName}</span>
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <button className="btn btn-danger" onClick={handleLogin}>Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
