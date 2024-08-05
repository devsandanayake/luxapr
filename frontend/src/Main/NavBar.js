import React, { useState } from 'react';
import './NavBar.css';
import Logo from '../Images/Logo.png';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="luxury-navbar fixed top-0 w-full z-50 bg-white shadow-lg opacity-85">
      <div className="navbar-container flex items-center justify-between">
        <img src={Logo} alt="Luxury Living Logo" className="h-12" />
        <button onClick={toggleMenu} className="menu-toggle lg:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <ul className={`nav-links ${isOpen ? 'block' : 'hidden'} lg:flex lg:space-x-8 lg:items-center`}>
          <li>
            <a href="/" className="nav-link font-archivo-thin">Home</a>
          </li>
          <li>
            <a href="#" className="nav-link font-archivo-thin">About</a>
          </li>
          <li>
            <a href="/contactus" className="nav-link font-archivo-thin">Contact Us</a>
          </li>
          <li>
            <a href="/login" className="nav-link font-archivo-thin">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
