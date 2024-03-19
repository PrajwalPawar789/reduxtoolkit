import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import PrivateRoutes from './PrivateRoutes';
import PricingPage from './PricingPage';
import SignUpForm from './SignUpForm';
import Navbar from './Navbar';
import MainLayout from './MainLayout';
import ProfilePage from './ProfilePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                {/* Wrap all other routes with MainLayout */}
                {/* <Route element={<MainLayout />}> */}
                    <Route path="/pricingpage" element={<PricingPage />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route element={<PrivateRoutes />}>
                        {/* Include SearchPage within MainLayout */}
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/profile" element={<ProfilePage/>} />
                    </Route>
                {/* </Route> */}
            </Routes>
        </Router>
    );
}

export default App;
