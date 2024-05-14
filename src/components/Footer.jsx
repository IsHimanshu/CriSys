import React from 'react';
import AboutUs from './AboutUs';

const Footer = () => {
    return (
        <footer className="bg-[#4D869C] py-8 w-full"> {/* Added w-full to make it take full width */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">About CriSys</h2>
                        <p className="text-sm text-gray-700 mb-2">
                            CriSys is a dedicated initiative, passionately committed to safeguarding precious lives across our great nation.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <ul className="text-sm text-gray-700">
                            <li className="mb-2"><a href="/aboutUs" className="text-white hover:underline">About Us</a></li>
                            <li className="mb-2"><a href="#" className="text-white hover:underline">FAQs</a></li>
                            <li className="mb-2"><a href="#" className="text-white hover:underline">Testimonials</a></li>
                            <li className="mb-2"><a href="#" className="text-white hover:underline">Terms of Service</a></li>
                            <li><a href="#" className="text-white hover:underline">Privacy Policy</a></li>
                            {/* Add additional links as needed */}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Services</h3>
                        <ul className="text-sm text-gray-700">
                            <li className="mb-2">Emergency Rescue</li>
                            <li className="mb-2">Medical Assistance</li>
                            <li className="mb-2">Disaster Relief</li>
                            <li>Humanitarian Aid</li>
                            {/* Add more services if needed */}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
                        <ul className="text-sm text-gray-700">
                            <li className="mb-2">Support: crisys.support@gmail.com</li>
                            <li className="mb-2">Helpdesk: crisys.helpdesk@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright notice */}
            <div className="bg-[#7AB2B2]">
                <div className="container mx-auto px-6 py-4">
                    <p className="text-sm text-gray-600 text-center">
                        © Copyright 2024 CriSys. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
