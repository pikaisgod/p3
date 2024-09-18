import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li> {/* Link to the Search page */}
        <li><Link to="/login">Login</Link></li> {/* Link to the Login page */}
        <li><Link to="/register">Register</Link></li> {/* Link to the Register page */}
      </ul>
    </nav>
  );
};

export default Navbar;
