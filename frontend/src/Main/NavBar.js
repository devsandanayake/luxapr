import React, { useState } from 'react';
import './NavBar.css';
import Logo from '../Images/Logo.png';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="luxury-navbar flex items-center justify-between bg-white shadow-lg fixed top-0 w-full z-50 opacity-85"
    >
      <div className='flex items-center w-full'>
        <img src={Logo} alt="Luxury Living Logo" className="h-12" />
        <div className="ml-auto lg:hidden">
          <button
            onClick={toggleMenu}
            className="menu-toggle text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <ul
        className={`nav-links ${isOpen ? 'block' : 'hidden'} lg:flex lg:space-x-8 lg:items-center lg:block`}
      >
        <li>
          <a href="/" className="nav-link font-archivo-thin">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link font-archivo-thin">
            About
          </a>
        </li>
        <li>
          <a href="/contactus" className="nav-link font-archivo-thin">
            Contact Us
          </a>
        </li>
        <li>
          <a href="/login" className="nav-link font-archivo-thin">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}
