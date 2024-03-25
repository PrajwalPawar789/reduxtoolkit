import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const NavbarButton = ({ onClick, children }) => (
  <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-100 transition duration-300 focus:outline-none focus:bg-blue-100 focus:text-blue-800" onClick={onClick}>
    {children}
  </button>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/logout', {}, { withCredentials: true });
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-blue-500 text-white shadow-md">
      <div className="flex items-center">
        <Link to="/search">
          <img src="https://www.techresearchinfo.com/whitepaper/weblogomanify.png" alt="Company Logo" className="h-8 mr-2 cursor-pointer"/>
        </Link>
        <span className="font-bold text-lg">B2B Data Provider</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button className="flex items-center text-sm focus:outline-none" onClick={toggleDropdown} aria-expanded={dropdownOpen} aria-label="User Menu">
          <FaUserCircle className="h-8 w-6 mr-2" />
          <span className="hidden md:block"></span>
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
            <NavbarButton onClick={() => navigate('/profile')}>Profile</NavbarButton>
            <NavbarButton onClick={() => navigate('/dashboard')}>Dashboard</NavbarButton>
            <NavbarButton onClick={handleLogout}>Logout</NavbarButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
