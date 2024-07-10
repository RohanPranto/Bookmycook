import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import './App.css';
import Hero from './components/Hero';
import FindCustomer from './components/FindCustomer';
import Profile from './components/Profile';
import FindCook from './components/FindCook';
import ChefSkills from './components/ChefSkills';
import Navbar from './components/Navbar';
import Cook from './components/Cook';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/findcook" element={<FindCook />} />
          <Route path="/findcustomer" element={<FindCustomer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chefskills" element={<ChefSkills />} />
          <Route path="/Cook/:cookId" element={<Cook />} />

        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
