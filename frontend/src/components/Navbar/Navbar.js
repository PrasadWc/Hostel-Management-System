// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // Only render the Navbar on the home page
  if (currentPath !== '/') {
    return null;
  }

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* Add other links if needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
