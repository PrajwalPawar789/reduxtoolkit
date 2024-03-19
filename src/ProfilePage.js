import React, { useState } from 'react';
import Navbar from './Navbar';


const ProfilePage = () => {
    const [activeView, setActiveView] = useState(null);

    const userData = {
        full_name: "Prajwal Pawar",
        email: "prajwal@techonesolutionslab.com"
    };

    const paymentData = {
        invoices: [],
        subscription: {
            plan: "Free Monthly",
            credits_per_month: 5,
            users: 1,
            renewal_date: "Mar 28th, 2024"
        }
    };

    const handleViewSwitch = (view) => {
        setActiveView(view);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 ">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-10">
                    <h1 className="text-3xl font-semibold text-center mb-8">Account Details</h1>
                        <ul className="list-none flex justify-between mb-8">
                            <li className="cursor-pointer" onClick={() => handleViewSwitch('profile')}>My Profile</li>
                            <li className="cursor-pointer" onClick={() => handleViewSwitch('payment')}>Payments & Subscription</li>
                            <li>Account settings</li>
                            <li>Tags management</li>
                            <li>Intent</li>
                            <li>Privacy</li>
                        </ul>
                        {activeView === 'profile' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">My Profile</h2>
                                <p><strong>Full name:</strong> {userData.full_name}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><strong>Joined since:</strong> {userData.email}</p>
                                <p><strong>Credits:</strong> {userData.email}</p>
                                <p><strong>Credits Used:</strong> {userData.email}</p>

                                <p><a href="#">Want to reset your password? Send me reset instructions</a></p>
                            </div>
                        )}
                        {activeView === 'payment' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Payments & Subscription</h2>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Invoice History</h3>
                                    <p>No Invoices</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Subscription</h3>
                                    <p><strong>Plan:</strong> {paymentData.subscription.plan}</p>
                                    <p><strong>Credits per Month:</strong> {paymentData.subscription.credits_per_month}</p>
                                    <p><strong>Users:</strong> {paymentData.subscription.users}</p>
                                    <p>Your credits will be renewed on {paymentData.subscription.renewal_date}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
