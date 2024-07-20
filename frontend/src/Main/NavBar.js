import React, { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
	setIsOpen(!isOpen);
  };

  return (
	<nav
	  className="luxury-navbar p-4 flex items-center justify-between bg-dark-blue"
	  style={{
		height: isOpen ? 'auto' : '60px',
		borderBottom: '4px solid gold',
	  }}
	>
	  <div className="text-white text-xl font-bold">
		<a href="#">LXApartment</a>
	  </div>
	  <div className="block lg:hidden">
		<button
		  onClick={toggleMenu}
		  className="menu-toggle text-white focus:outline-none"
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
	  <ul
		className={`text-white ${isOpen ? 'block' : 'hidden'} lg:flex lg:space-x-6 lg:block`}
	  >
		<li>
		  <a href="/" className="nav-link hover:text-gold">
			Home
		  </a>
		</li>
		<li>
		  <a href="#" className="nav-link hover:text-gold">
			About
		  </a>
		</li>
		<li>
		  <a href="/contactus" className="nav-link hover:text-gold">
			Contact US
		  </a>
		</li>
		<li>
		  <a href="/login" className="nav-link hover:text-gold">
			Login
		  </a>
		</li>
	  </ul>
	</nav>
  );
}