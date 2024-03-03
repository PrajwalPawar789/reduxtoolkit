import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import PrivateRoutes from './PrivateRoutes';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
