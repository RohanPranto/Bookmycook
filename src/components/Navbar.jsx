import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, provider, signInWithPopup, signOut } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import '../assets/Navbar.css'; // Import the CSS file

function Navbar() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      closeModal();
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

  const closeModal = () => {
    document.getElementById('loginModal').classList.remove('show');
    document.getElementById('loginModal').style.display = 'none';
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop').remove();
  };

  return (
    <>
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
                    <span className="nav-link">Hello, {user.displayName || user.email}</span>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                  </div>
                ) : (
                  <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">{isRegistering ? 'Register' : 'Login'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={isRegistering ? handleRegister : handleEmailLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  {isRegistering ? 'Register' : 'Login'}
                </button>
                <p style={{textDecoration:"none"}} type="button" className="text-center w-100 mt-2 text-primary" onClick={() => setIsRegistering(!isRegistering)}>
                  {isRegistering ? 'Already have an account?' : 'Register a new account'}
                </p>
                <p className='text-center'>Or</p>
              </form>
              <button className="btn border border-secondary border-2 w-100" onClick={handleGoogleLogin}><i className='bx bxl-google'></i> Login with Google</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
