import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Weather Dashboard</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Current Weather
        </Link>
        <Link to="/historical" className={location.pathname === '/historical' ? 'active' : ''}>
          Historical Data
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;