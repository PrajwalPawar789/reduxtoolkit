import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import PrivateRoutes from './PrivateRoutes';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/search" element={<SearchPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
