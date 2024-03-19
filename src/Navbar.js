import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogo = ()=> {
        navigate('/search');
    }

    const handleProfile = ()=> {
        navigate('/profile');
    }

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            // Remove cookie on successful logout
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            // Redirect to the login page
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-blue-600 via-blue-300 to-blue-500 text-white shadow-lg">
      {/* Left side: Company logo */}
      <div className="flex items-center">
        <img src="https://www.techresearchinfo.com/whitepaper/weblogomanify.png" alt="Company Logo" className="h-8 mr-2 cursor-pointer"onClick={handleLogo}/>
        <span className="font-bold text-lg">B2B Data Provider</span>
      </div>
      
      {/* Right side: Profile Icon with dropdown */}
      <div className="relative">
        <button className="flex items-center text-sm focus:outline-none" onClick={toggleDropdown}>
          <FaUserCircle className="h-8 w-6 mr-2" />
          <span className="hidden md:block"></span>
        </button>
        
        {/* Dropdown */}
        {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
    <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 focus:outline-none focus:bg-gray-200 focus:text-gray-900" onClick={handleProfile}>Profile</button>
    <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 focus:outline-none focus:bg-gray-200 focus:text-gray-900">Dashboard</button>
    <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 focus:outline-none focus:bg-gray-200 focus:text-gray-900" onClick={handleLogout}>Logout</button>
  </div>
)}

      </div>
    </nav>
  );
}

export default Navbar;
