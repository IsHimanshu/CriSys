import React from 'react';
import Footer from '../components/Footer'; // Import the footer component

const AboutUs = () => {
    return (
        <div className="w-full max-w-screen-lg mx-auto px-6">

            {/* How Setu Works */}
            <div className="my-10">
                <div className="text-center mb-5">
                    <h1 className='text-3xl font-semibold md:text-4xl my-5'>How Setu Works</h1>
                    <div className="w-20 h-1 bg-gray-600 mx-auto my-2"></div>
                </div>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet ipsum nunc, et placerat velit bibendum id. Nulla facilisi. Phasellus vel arcu ex. Nulla facilisi. Integer at eros pharetra, finibus lorem ut, varius felis.
                </p>
                {/* Add more content as needed */}
            </div>

            {/* COVID Updates */}
            <div className="my-10">
                <div className="text-center mb-5">
                    <h1 className='text-3xl font-semibold md:text-4xl my-5'>Disaster Updates</h1>
                    <div className="w-20 h-1 bg-gray-600 mx-auto my-2"></div>
                </div>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet ipsum nunc, et placerat velit bibendum id. Nulla facilisi. Phasellus vel arcu ex. Nulla facilisi. Integer at eros pharetra, finibus lorem ut, varius felis.
                </p>
                {/* Add more content as needed */}
            </div>

            {/* Why Setu */}
            <div className="my-10">
                <div className="text-center mb-5">
                    <h1 className='text-3xl font-semibold md:text-4xl my-5'>Why Setu</h1>
                    <div className="w-20 h-1 bg-gray-600 mx-auto my-2"></div>
                </div>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet ipsum nunc, et placerat velit bibendum id. Nulla facilisi. Phasellus vel arcu ex. Nulla facilisi. Integer at eros pharetra, finibus lorem ut, varius felis.
                </p>
                {/* Add more content as needed */}
            </div>

            {/* Media Gallery */}
            <div className="my-10">
                <div className="text-center mb-5">
                    <h1 className='text-3xl font-semibold md:text-4xl my-5'>Documents</h1>
                    <div className="w-20 h-1 bg-gray-600 mx-auto my-2"></div>
                </div>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet ipsum nunc, et placerat velit bibendum id. Nulla facilisi. Phasellus vel arcu ex. Nulla facilisi. Integer at eros pharetra, finibus lorem ut, varius felis.
                </p>
                {/* Add more content as needed */}
            </div>


            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutUs;
