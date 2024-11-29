// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Flashcard Platform</div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/flashcard-sets" className="nav-link">Flashcard Sets List</Link>
        </li>
        <li>
          <Link to="/collections/create" className="nav-link">Create Collection</Link>
        </li>
        <li>
          <Link to="/collections" className="nav-link">Collections List</Link>
        </li>
        <li>
          <Link to="/flashcard-sets/create" className="nav-link">Create Flashcard Set</Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">Log Out</Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
