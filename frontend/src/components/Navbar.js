import React from 'react';
import { Link } from 'react-router-dom';
import { BeakerIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <BeakerIcon className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-800">NutriTrack</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-600 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <a href="/#services" className="text-gray-600 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-2">
              <Link to="/login" className="text-gray-800 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">Log In</Link>
              <Link to="/signup" className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;