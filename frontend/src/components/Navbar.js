import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <HeartIcon className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">NutriTrack</span>
            </Link>
          </div>

          {/* Primary Navigation (Centered) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <button onClick={() => smoothScroll('services')} className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</button>
            <button onClick={() => smoothScroll('how-it-works')} className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">How It Works</button>
            <button onClick={() => smoothScroll('testimonials')} className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Testimonials</button>
            <button onClick={() => smoothScroll('contact')} className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</button>
          </div>

          {/* Login/Signup Buttons (Increased spacing) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium text-sm transition-colors">Log In</Link>
            <Link to="/signup" className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;