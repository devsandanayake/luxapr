import React, { useState } from 'react';
import LoginPopup from '../Login/LoginPopup';
import './NavBar.css';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);


  const toggleMenu = () => {
	setIsOpen(!isOpen);
  };

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
	<nav
	  className="luxury-navbar p-4 flex items-center justify-between bg-white fixed top-0 w-full z-50 opacity-90"
	  style={{
		height: isOpen ? 'auto' : '60px',
	  }}
	>
	  <div className='flex flex-row w-full items-center flex-nowrap'>
		<div className="text-xl font-bold">
		  <a href="#">Effective Solutions</a>
		</div>
		<div className="block lg:hidden ml-auto">
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
		className={`text-black ${isOpen ? 'block' : 'hidden'} lg:flex lg:space-x-8 lg:block flex-col lg:flex-row`}
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
			Contact US
		  </a>
		</li>
    <li>
                    <button onClick={toggleLoginPopup} className="nav-link font-archivo-thin login-button">
                        Login
                    </button>
                </li>
            </ul>
            <LoginPopup isOpen={isLoginOpen} onClose={toggleLoginPopup} />

        </nav>
  );
}
