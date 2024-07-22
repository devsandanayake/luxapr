import React, { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
	setIsOpen(!isOpen);
  };

  return (
	<nav
	className="luxury-navbar p-4 flex items-center justify-between bg-white fixed top-0 w-full z-50 opacity-80"
	style={{
		height: isOpen ? 'auto' : '60px',
	}}
	>
	  <div className="text-xl font-bold">
		<a href="#">LXApartment</a>
	  </div>
	  <div className="block lg:hidden">
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
	  <ul
		className={`text-black ${isOpen ? 'block' : 'hidden'} lg:flex lg:space-x-8 lg:block`}
	  >
		<li>
		  <a href="/" className="nav-link hover:font-bold">
			Home
		  </a>
		</li>
		<li>
		  <a href="#" className="nav-link hover:font-bold">
			About
		  </a>
		</li>
		<li>
		  <a href="/contactus" className="nav-link hover:font-bold">
			Contact US
		  </a>
		</li>
		<li>
		  <a href="/login" className="nav-link hover:font-bold">
			Login
		  </a>
		</li>
	  </ul>
	</nav>
  );
}