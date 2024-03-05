import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
    const navigate = useNavigate();

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

    return (
        <div>
            <h1>SearchPage</h1>
            <p>Welcome to the SearchPage!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default SearchPage;
